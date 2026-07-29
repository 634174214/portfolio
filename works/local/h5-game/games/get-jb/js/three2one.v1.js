/*
专门用于游戏321倒计时
使用图片替代数字
 */
function ThreeToOne(args) {
    function countDown() {
        this.imgPath = args.imgPath || 'img/';
        this.countDownImgs = args.countDownImgs || [];
        this.beginImg = args.beginImg || false;
        this.bgImg = args.bgImg || false;
        this.tipsImg = args.tipsImg || false;
        this.zIndex = parseInt(args.zIndex) || 99; 

        // 固定设定值
        this.warpId = 'w-count-down';
        // 倒计时开始的数字
        this.beginCountDownNum = 3;
        // 创建自定义加载完成事件
        this.completeEventName = 'countDownComplete';
        // 倒计时动画的样式名称
        this.countNumCls = 'count-num-active';
        this.init();
    }
    countDown.prototype = {
        init: function() {
            if (this.countDownImgs.length <= 0 ||
                !this.beginImg
            ) {
                return;
            }
            this.timeStamp = new Date().getTime();
            // 创建自定义加载完成事件
            this.completeEvent = null;

            this._createEvent();

            this._appendEl();

            this.lastNum = this.beginCountDownNum;

            // 获取倒计时的图片元素
            this.el_countnum = document.getElementById('count-num-' + this.timeStamp);

            this.timer = null;
            // 是否显示
            this.isWrapShow = false;
        },
        show: function() {
            if (!this.wrap) {
                return;
            }
            this.wrap.style.display = 'block';
            this.isWrapShow = true;
        },
        hide: function() {
            if (!this.wrap) {
                return;
            }
            this.wrap.style.display = 'none';
            this.isWrapShow = false;
            // 重置计数
            this.lastNum = this.beginCountDownNum;
        },
        fadeOut: function() {
            if (!this.wrap) {
                return;
            }
            var self = this;
            this.wrap.classList.add('fadeOut');
            this.wrap.addEventListener('animationend', function() {
                self.hide();
            });
        },
        // 开始倒计时
        beginDown: function() {
            if (!this.el_countnum ) { return; }

            if (!this.isWrapShow) {
                this.show();
            }
            
            var self = this;


            // 上来先执行一次 否则3处会停留1秒
            self.el_countnum.src = self.imgPath + self.countDownImgs[self.lastNum - 1];
            self.lastNum--;

            this._countNumAniEnded();

            this.timer = setInterval(function() {
                if (self.lastNum < 0) {
                    clearInterval(self.timer);
                    self._complete();
                    return;
                } else if (self.lastNum === 0) {
                    self._countNumAniAdd();
                    self.el_countnum.src = self.imgPath + self.beginImg;
                } else {
                    self._countNumAniAdd();
                    self.el_countnum.src = self.imgPath + self.countDownImgs[self.lastNum - 1];

                }
                self.lastNum--;
            }, 1000);
        },
        _createEvent: function() {
            this.completeEvent = document.createEvent('CustomEvent');
            this.completeEvent.initCustomEvent(this.completeEventName, true, false, 'count down complete');
        },
        // 倒计时数字添加动画样式
        _countNumAniAdd: function() {
            this.el_countnum.classList.add(this.countNumCls);
        },
        // 倒计时数字动画结束执行
        _countNumAniEnded: function() {
            var self = this;
            self.el_countnum.addEventListener('animationend', function() {
                self.el_countnum.classList.remove(self.countNumCls);
            });
        },
        // 完成后向外抛出事件
        _complete: function() {
            if(window.dispatchEvent) {
              window.dispatchEvent(this.completeEvent);
            } else {
              window.fireEvent(this.completeEvent);
            }
        },
        _appendEl: function() {
            this.wrap = document.createElement('div');
            this.wrap.className = 'count-down-' + this.timeStamp;
            this.wrap.id = this.warpId;
            this.wrap.innerHTML = this._html();

            this.style = document.createElement('style');
            this.style.innerHTML = this._style();
            
            document.head.appendChild(this.style);
            document.body.appendChild(this.wrap);
        },
        _html: function() {
            var last = this.countDownImgs[this.countDownImgs.length - 1];
            last = this.imgPath + last;

            var html = `
                <div class="count-num-wrap">
                    <img src="${last}" class="count-num ${this.countNumCls}" id="count-num-${this.timeStamp}">
                </div>
            `;
            if (this.bgImg) {
                var bg = this.imgPath + this.bgImg;
                html += `<img src="${bg}" class="bg">`;
            }
            if (this.tipsImg) {
                var tipsImg = this.imgPath + this.tipsImg;
                html += `<img src="${tipsImg}" class="tips-img">`;
            }
            return html;
        },
        _style: function() {
            var bgAlapha = this.bgImg ? '#000' : 'rgba(0, 0, 0, 0.6)';
            var css = `
                @keyframes fadeOut_${this.timeStamp} {
                    0% {
                      opacity: 1;
                    }
                    100% {
                       opacity: 0;
                    }
                }
                @keyframes count_${this.timeStamp} {
                    0% {
                      transform: scale(.1);
                      opacity: 1;
                    }
                    70% {
                      transform: scale(2.5);
                       opacity: 0;
                    }
                    100%{
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .count-down-${this.timeStamp}{
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: ${this.zIndex};
                    background: ${bgAlapha};
                    display: none;
                }
                .count-down-${this.timeStamp}.fadeOut{
                    animation: fadeOut_${this.timeStamp} 0.4s;
                }
                .count-down-${this.timeStamp} .bg{
                    display: block;
                    width: 100%;
                    min-height: 100%;
                    object-fit: cover;
                    opacity: 0.5;
                }
                .count-down-${this.timeStamp} .count-num-wrap{
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    transform: translate(0, -50%);
                }
                .count-down-${this.timeStamp} .count-num{
                    display: block;
                    width: 50%;
                    margin: 0 auto;
                }
                .count-down-${this.timeStamp} .${this.countNumCls}{
                    animation: count_${this.timeStamp} 0.7s;
                }
                .count-down-${this.timeStamp} .tips-img{
                    position:absolute;
                    left: 0;
                    right: 0;
                    bottom: 20px;
                    width: 90%;
                    margin: auto;
                }
            `;
            return css;
        }
    };
    return new countDown();
}


var GameCountDown = ThreeToOne({
    // 倒计时图片存放的路径
    imgPath: 'images/',
    // 倒计时图片的名称 严格按照由小到大排列
    countDownImgs: ['count-down-1.png', 'count-down-2.png', 'count-down-3.png'],
    // 开始的图片名称
    beginImg: 'count-down-begin.png',
    // 倒计时是否需要背景图片 不传图片就是个
    // bgImg: 'count-begin-bg.jpg',
    // 添加提示图片
    tipsImg: 'game-tips.png',
    // 层级
    zIndex: 10 
});
/*
// 监听倒计时是否结束
参考：https://blog.csdn.net/CodingNoob/article/details/102571273
window.addEventListener('countDownComplete', function() {
    GameCountDown.hide();
。。。
});
 */

 // GameCountDown.show();