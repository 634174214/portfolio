if(typeof VConsole !== 'undefined') {
    const vConsole = new VConsole();
}

const Vm = {
    data() {
      return {
        // 投票专题的id
        tpid: 0,
        // 活动开始时间 
        startTime: false,
        // 活动结束时间
        endTime: '',
        // 活动信息
        infos: [],
        nowTimeStamp: new Date().getTime(),
        text_box_height: false,
        text_box_bgcolor: '',
        image_box_height: '',
        top_banner: '',
        // 当前排列的焦点
        currentSort: 1,
        showCountDown: false,
        showDetailClose: false,
        // 活动是否正在进行
        isHolding: false,
        touList: [],
        mode: '',
        // 倒计时输出
        leftTime: '',
        showLoading: true,
        // 能否继续执行
        canDo: false
      }
    },
    async created() {
        // 首先判断用户
        const userCheckRes = await checkUser();
        if(!userCheckRes) {
            return;
        }
        // 记录用户能否执行投票的状态
        this.canDo = userCheckRes.can_do;
        this.canNotMsg = userCheckRes.can_not_msg;
        if(!this.canDo) {
            myDialog({
                title: '重要提示',
                success: false,
                msg: this.canNotMsg
            });
        }

        const query = getQueryStringArgs();
        if(!query.id) {
            window.alert('抱歉，您的id不正确！');
            return;
        }
        this.tpid = parseInt(query.id);
        this.getHomeData();
    },
    mounted() {
        setTimeout(() => {
            this.showLoading = false;
        }, 500);
    },
    computed: {
        textBoxStyle() {
            if(this.text_box_height && this.text_box_bgcolor) {
                return `height: ${this.text_box_height}px;background-color: ${this.text_box_bgcolor}`;
            } else {
                return '';
            }
        },
        imageBoxStyle() {
            if(this.image_box_height && this.image_box_height > 0) {
                return `height: ${this.image_box_height}px;`;
            } else {
                return '';
            }
        }
    },
    methods: {
        countDownTime() {
            // ios手机下getTime为NaN,必须将-转化为/
            const startTime = this.startTime.replace(/\-/g, '/');
            const endTime = this.endTime.replace(/\-/g, '/');
            this.startTimeStamp = new Date(startTime).getTime();
            this.endTimeStamp = new Date(endTime).getTime();
            setInterval(() => {
                this.nowTimeStamp = new Date().getTime();
                if(!this.showCountDown) {
                    this.showCountDown = true;
                }
            }, 1000);
        },
        getHomeData() {
            const tpid = this.tpid;
            axios.get(HOME_URL, {
                    params: {
                        id: tpid
                    }
                })
                .then((res) => {
                    const response = res.data;
                    if(response.code === 0) {
                        const data = response.data;
                        this.startTime = data.start_time;
                        this.endTime = data.end_time;
                        this.touList = data.list;
                        this.mode = data.mode;
                        this.infos = data.infos;
                        this.text_box_height = data.text_box_height;
                        this.text_box_bgcolor = data.text_box_bgcolor || '#5C95FE';
                        Window.text_box_bgcolor = this.text_box_bgcolor;
                        this.top_banner = data.top_banner;
                        this.image_box_height = data.image_box_height;

                        
                        document.title = data.page_title;
                        document.getElementById('pageDescription').content = data.page_description;
                    } else {
                        window.alert(res.msg);
                    }
                    this.countDownTime();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sortList(type) {
            if(type === this.currentSort) {
                return;
            }
            // 按照编号顺序排序
            if(type === 1) {
                this.touList.sort((v1, v2) => {
                    if(v1.touid < v2.touid) {
                        return -1;
                    } else if(v1.touid > v2.touid) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            // 按照排行榜顺序排序
            if(type === 2) {
                this.touList.sort((v1, v2) => {
                    if(v1.tickets < v2.tickets) {
                        return 1;
                    } else if(v1.tickets > v2.tickets) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }
            this.currentSort = type;
        },
        openDetail(touId) {
            this.$router.push({
                path: `/detail/${touId}`
            });
        },
        closeDetail() {
            this.$router.push({
                path: '/home'
            });
            this.showDetailClose = false;
        },
        updateCanNot(can) {
            this.canDo = can;
        },
        // 投票 接收两个参数分别为投票专题ID与投票人id
        async selectTicket(obj) {
            if(!this.isHolding) {
                myDialog({
                    success: false,
                    msg: '请在活动进行的时间段进行投票'
                });
                return;
            }

            // 投票的时候 先进行验证
            const userCheckRes = await checkUser();
            // 用户不存在 会直接跳转
            if(!userCheckRes) {
                return;
            }
            // 用户不能操作
            if(!userCheckRes.can_do) {
                myDialog({
                    success: false,
                    msg: userCheckRes.can_not_msg
                });
                // 当不能操作的时候,更新信息
                this.updateCanNot(userCheckRes.can_do)
                return;
            }

            const postRes = await postTicket(obj);
            if(postRes.id !== this.tpid) {
                window.alert('您的投票专题与当前专题不对应！');
                return;
            }
            if(postRes && postRes.success) {
                this.addTicket(postRes.touid);
                myDialog({
                    success: true
                });
            } else {
                myDialog({
                    success: false,
                    msg: '抱歉，投票失败'
                });
            }
        },
        // 详情页点击投票在外部对应的票上加1
        detailTou(touid) {
            this.addTicket(touid);
        },
        // 只要详细页初始化了就显示关闭
        initDetail() {
            this.showDetailClose = true;
        },
        // 增加票数
        addTicket(touid) {
            this.touList.find((item) => {
                if(item.touid === touid) {
                    item.tickets++;
                }
            });
        }
    },
    watch: {
        nowTimeStamp(newVal) {
            if(!this.showCountDown) {
                return;
            }
            if(newVal < this.startTimeStamp) {
                this.leftTime = '<span class="over">抱歉，活动还未开始</span>';
            } else if(newVal > this.endTimeStamp) {
                this.leftTime = '<span class="over">抱歉，活动已结束</span>';
            } else {
                const diffStamp = this.endTimeStamp - newVal;
                let days = Math.floor(diffStamp / (24 * 3600 * 1000));
                //计算天数后剩余的毫秒数
                let leftTime = diffStamp % (24 * 3600 * 1000);
                //计算小时数后剩余的毫秒数
                let hours = Math.floor(leftTime / (3600 * 1000));
                //计算相差分钟数
                let leftTime2 = leftTime % (3600 * 1000);
                let minutes = Math.floor(leftTime2 / (60 * 1000));
                //计算相差秒数
                let leftTime3 = leftTime2 % (60*1000);
                //计算分钟数后剩余的毫秒数
                let seconds = Math.round(leftTime3 / 1000);

                const diffStr = `<em>${days}</em>天<em>${hours}</em>时<em>${minutes}</em>分<em>${seconds}</em>秒`;
                
                if(this.isHolding === false) {
                    this.isHolding = true;
                } 
                // console.log(this.isHolding)
                this.leftTime = `距离活动结束${diffStr}`;
            }
        }
    }
  }
  
Vue.createApp(Vm).use(router).use(VueScrollTo).mount('#app')