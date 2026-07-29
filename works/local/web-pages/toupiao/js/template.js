const Home = { 
    template: `<div class="home"></div>`
}
const Detail = {
    name: 'detail',
    template: `
        <section class="detail" id="detail-wrapper">
            <aside class="detail-wrapper-in">
                <div class="detail-inner-waiting" v-show="!info.tickets">
                    <dl class="detail-inner-waiting-dl">
                        <dt>
                            <div class="text">
                                <img src="img/loading-pc.gif">
                                加载中，请稍候
                            </div> 
                        </dt>
                        <dd>
                            <p class="waiting-p-1"></p>
                            <p class="waiting-p-2"></p>
                            <p class="waiting-p-1"></p>
                            <p class="waiting-p-3"></p>
                        </dd>
                    </dl>
                </div>
                <div class="detail-inner" v-show="info.tickets">
                    <div class="detail-top-bar"></div>
                    <div class="detail-top-image"
                        v-if="mode === 'image'"
                    >
                        <img :src="info.image">
                    </div>
                    <div class="detail-top-text font-song"
                        v-if="mode === 'text'"
                        :style="detailTopTextBg"
                    >
                        <span>{{ info.text }}</span>    
                    </div>
                    <div class="detail-info">
                        <div class="inner">
                            <strong>{{ info.title }}</strong>
                            <span>{{ info.tickets }} 票</span>
                        </div>
                    </div>
                    <div class="detail-desc">
                        <p>{{ info.description }}</p>
                    </div>
                    <button type="button" 
                            class="detail-tou-btn"
                            @click="selectTicket"
                    >
                        投 票
                    </button>
                </div>
            </aside>
        </section>
    `,
    emits: ['init-detail', 'touok', 'update-cannot'],
    props: {
        // 当前活动是否结束
        isholding: {
            type: Boolean,
            default() {
                return false;
            }
        },
        // 外部传入的投票专题id
        tpid: {
            type: Number,
            default: 0
        },
        // 专题的模式
        mode: {
            type: String,
            default() {
                return '';
            }
        },
        // 能否投票
        cando: {
            type: Boolean,
            default() {
                return false;
            }
        },
        // 如果不能投票的提示
        cannotmsg: {
            type: String,
            default() {
                return '';
            }
        }
    },
    data() {
        return {
            info: {}
        }
    },
    computed: {
        detailTopTextBg() {
            return `background-color: ${Window.text_box_bgcolor}`;
        }
    },
    async created() {
        setTimeout(() => {
            // 投票人的id
            this.touid = this.$route.params.touid;
            this.touid = parseInt(this.touid);
            this.BScroll = null;
            this.getDetailData();
        }, 1000);
    },
    mounted() {
        console.log(this.mode)
    },
    methods: {
        getDetailData() {
            this.$emit('init-detail');
            axios.get(DETAIL_URL, {
                    params: {
                        id: this.tpid,
                        touid: this.touid
                    }
                })
                .then((res) => {
                    const response = res.data;
                    if(response.code === 0) {
                        this.info = response.data;
                        this.initBscroll();
                    } else {
                        window.alert(res.msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        initBscroll() {
            console.log(this.BScroll)
            if(this.BScroll) {
                this.BScroll.refresh();
            } else {
                const wrapper = document.getElementById('detail-wrapper');
                this.BScroll = new BScroll(wrapper, {
                    screenY: true,
                    click: true
                });
                console.log(this.BScroll)
            }
        },
        async selectTicket() {
            if(!this.isholding) {
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
                // 当不能操作的时候，发送事件，更新信息
                this.$emit('update-cannot', userCheckRes.can_do);
                return;
            }
            
            const postRes = await postTicket({
                tpid: this.tpid,
                touid: this.touid
            });
            if(postRes && postRes.success) {
                this.info.tickets++;
                myDialog({
                    success: true
                });
                // 同时向外部发送事件，给对应的投票人+1
                this.$emit('touok', this.touid);
            } else {
                myDialog({
                    success: false,
                    msg: '抱歉，投票失败，请稍后重试'
                });
            }
        }
    }
}

// 路由配置
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    { 
        name: 'home',
        path: '/home', 
        component: Home 
    },
    { 
        name: 'detail',
        path: '/detail/:touid', 
        component: Detail 
    }
];
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});