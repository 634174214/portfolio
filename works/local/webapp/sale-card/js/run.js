const DATA = window.data;
const BG_SELECT = window.cardBgSelect;
const NEWS_LIST_MAX = 6;
const FORM_VALIDATE = 'form-validate';
const FORM_POST_URL = 'server.php';
// 是否需要服务器请求
const NEED_SERVER = false;

const dialogH2Text = '图片合成成功!';

var dateFormat = function (timestamp, formats) {
    formats = formats || 'Y-m-d';
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    var myDate = timestamp? new Date(timestamp): new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
};

var vm = new Vue({
    el: '#app',
    data: {
        // 如果不存在取-1
        card_id: DATA.id || -1,
        card_name: DATA.card_name || '',
        card_day: DATA.card_day || '',
        card_title: DATA.card_title || '',
        qrcode_url: '',
        font_size_list: DATA.font_size_list || 16,
        font_size_title: DATA.font_size_title || 24,
        news_list: DATA.news_list || [],
        created_card: DATA.created_card || '',
        bgSelected: {},
        showBgSelectList: false,
        // 结果弹窗显示
        showDialog: false,
        showSkScreen: true,
        // 生成截图的base64
        screenShotsImg: '',
        screenCreating: true,
        // 最终保存的提示
        dialogH2Text: dialogH2Text
    },
    created() {
        this.initBgSelected();
        this.initQRcodeUrl();
    },
    mounted() {
        this.initSkLoading();
    },
    computed: {
        // 对选择框按照时间降序排序
        bg_select() {
            let arr = BG_SELECT;
            arr.sort((v1, v2) => {
                let time1 = new Date(v1.bg_created).getTime();
                let time2 = new Date(v2.bg_created).getTime();
                if(time1 < time2) {
                    return 1;
                } else if(time1 > time2) {
                    return -1;
                } else {
                    return 0;
                }
            });
            console.log(arr);
            return arr;
        },
        fontSizeTitle() {
            return `font-size: ${this.font_size_title}px`;
        },
        fontSizeList() {
            return `font-size: ${this.font_size_list}px`;
        },
        /* 当二维码截图出现空白问题时候，使用背景的方式 弃用目前img做背景的方法 */
        canvasBoxBg() {
            const timeStamp = new Date().getTime();
            return `${this.bgSelected.bgurl}?t=${timeStamp}`;
        },
        downLoadFileName() {
            let day = this.card_day.replace(/(\/)/g,'-');     
            return `${this.card_name}-${day}`;
        }
    },
    methods: {
        initSkLoading() {
            setTimeout(() => {
                this.showSkScreen = false;
                document.body.classList.remove('sk-loading');
                this.$refs.leftAndRight.classList.add('show');
            }, 1000);
        },
        // 实例化qrcode类
        initQrcodeClass() {
            const qrurl = this.qrcode_url;
            console.log(qrurl)
            this.qrcode = new QRCode("canvas-qr", {
                text: 'http://www.qdxin.cn',
                width: 75,
                height: 75,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        },
        // 初始化二维码，让其有个变化的过程，好让watch监听到
        initQRcodeUrl() {
            this.qrcode_url = DATA.qrcode_url || '';
        },
        // 初始化背景的选择
        initBgSelected() {
            if(DATA.card_bg_selected) {
                this.bgSelected = DATA.card_bg_selected;
            } else {
                this.bgSelected = this.bg_select[0];
            }
            // 点击空白处隐藏列表
            document.body.addEventListener('click', () => {
                this.showBgSelectList = false;
            });
        },
        getToday() {
            const timeStamp = new Date().getTime();
            let today = dateFormat(timeStamp, 'Y/m/d');
            console.log(today)
            this.card_day = today;
        },
        openSelect() {
            this.showBgSelectList = true;
        },
        selectBg(bgIndex) {
            this.bgSelected = this.bg_select[bgIndex];
            this.showBgSelectList = false;
        },
        addNews() {
            if(this.news_list.length >= NEWS_LIST_MAX) {
                window.alert('抱歉，新闻列表最多6条');
                return;
            }
            this.$refs.form.classList.remove(FORM_VALIDATE);
            let obj = {
                title: ''
            };
            this.news_list.push(obj);
        },
        deleteNews(newsIndex) {
            this.news_list.splice(newsIndex, 1);
        },
        submitForm(e) {
            const form = e.target;
            form.classList.add(FORM_VALIDATE);
            if(this.news_list.length <= 0) {
                window.alert('抱歉，新闻列表不能为空！');
                return;
            }
            if(form.checkValidity &&
               form.checkValidity() == true
            ) {
                console.log('表单通过验证！');
                this.composeFormData();
            }

            return false;
        },
        closeDialog() {
            this.showDialog = false;
            this.resetData();
        },
        resetData() {
            this.dialogH2Text = dialogH2Text;
            this.screenCreating = true;
            this.screenShotsImg = '';
        },
        // 组成表单数据
        async composeFormData() {
            this.showDialog = true;
            // 获取生成的base64
            this.screenShotsImg = await this.screenShots();
            if(!this.screenShotsImg) {
                window.alert('图片合成失败，请联系开发人员');
                this.showDialog = false;
                return;
            }

            // 当合成成功后，替换历史合成处字段
            this.created_card = this.screenShotsImg;
            // 向服务器发送请求
            if(NEED_SERVER) {
                let res = await this.ajaxForm();
                console.log(res)
                if(!res) {
                    this.dialogH2Text = '卡片保存失败，请尽快下载图片';
                } else {
                    this.dialogH2Text = '图片合成并保存成功！';
                }
            }
            this.screenCreating = false; 
        },
        ajaxForm() {
            const is_insert = (!this.card_id || this.card_id === -1) ? true : false;
            const options = {
                // is_insert不录入，仅作为判断insert或者update的依据
                is_insert: is_insert,
                id: this.card_id,
                card_name: this.card_name,
                card_day: this.card_day,
                card_title: this.card_title,
                card_bg_selected: this.bgSelected,
                // 提交时，此字段为前端生成的base64
                created_card: this.screenShotsImg,
                qrcode_url: this.qrcode_url,
                font_size_list: this.font_size_list,
                font_size_title:this.font_size_title,
                news_list: this.news_list
            };
            return new Promise((resolve, reject) => {
                axios.post(FORM_POST_URL, options)
                     .then((res) => {
                        resolve(res);
                     })
                     .catch((err) => {
                         console.log('数据保存失败', err);
                        reject(false);
                     })
            });
        },
        // 截图
        screenShots() {
            const boxEl = document.getElementById('canvas');
            let width = boxEl.offsetWidth;
	        let height = boxEl.offsetHeight;
            let scale = 2;
            let canvas = document.createElement("canvas"); 
            canvas.width = width * scale; 
	        canvas.height = height * scale;
            canvas.getContext("2d").scale(scale, scale);
            let opts = {
                useCORS: true,
                scale: scale, 
                // 如果使用1.4版本的html2canvas就不能添加下面这个配置 会导致截图扩大！
                canvas: canvas, 
                width: width,
                height: height,
            };
            let promise = new Promise((resolve, reject) => {
                html2canvas(boxEl, opts).then((htmlCanvas) => {
                    let context = htmlCanvas.getContext('2d');
                    context.mozImageSmoothingEnabled = false;
                    context.webkitImageSmoothingEnabled = false;
                    context.msImageSmoothingEnabled = false;
                    context.imageSmoothingEnabled = false;
                    // 使用canvas2image方法必须引入canvas2image.js插件
                    // let img = Canvas2Image.convertToImage(htmlCanvas, htmlCanvas.width, htmlCanvas.height);
                    // let img = Canvas2Image.convertToPNG(htmlCanvas, htmlCanvas.width, htmlCanvas.height);
                    // let img_data = img.getAttribute('src');
                    // 获取图片的base64
                    let imgBase64 = htmlCanvas.toDataURL();
                    if(imgBase64) {
                        resolve(imgBase64);
                    } else {
                        reject(false);
                    }
                    resolve(imgBase64);
                }).catch((err) => {
                    console.log('截图错误', err);
                    reject(false);
                });
            });
            return promise;
        }
    },
    watch: {
        qrcode_url(newval, oldval) {
            if(this.qrcode) {
                this.qrcode.clear();
                this.qrcode.makeCode(newval);
            } else {
                this.initQrcodeClass();
            }
        }
    }
})