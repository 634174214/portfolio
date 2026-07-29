/**
 * [遮罩加载类]
 * @Author   wubin
 * @vision: 1.0
 * @tips: 
 * 注意：
 * 1、依赖于preload/create.js插件支持加载音频、图片 加载的音频需要用createjs播放
 * 2、需要在body中手动放置一个容器用于放置loading元素 且层级要最高
 * 3、建议背景为白色或者与loading层颜色相同
 * 4、使用方法见末尾
 * 5、不适用于PC端
 * @DateTime 2021-09-09T10:36:01+0800
 */
var Loading = function(args) {
    // 当手动控制加载层隐藏时用到
    var timer = null;
    function loading() {
        // 要加载的资源
        this.manifest = args.manifest || [];
        this.manifest.push(this.defaultLogo);
        // 加载logo
        this.logoImg = args.logoImg || this.defaultLogo;
        // 加载层背景色
        this.bgColor = args.bgColor || '#d0d4ff';
        // 加载层字颜色
        this.fontColor = args.fontColor || '#000';
        // 加载进度背景色
        this.progressBgColor = args.progressBgColor || '#E8C817';
        // 加载进度描边色
        this.progressBorderColor = args.progressBorderColor || '#fff';
        // 是否自动执行加载层的隐藏 不传值或者不是布尔值默认为true
        this.autoHide = (typeof args.autoHide == 'undefined' || typeof args.autoHide != 'boolean') ?  true : args.autoHide;
        // 层级不是针对外层的是wrapId元素内层元素的层级
        this.zIndex = args.zIndex || 9999;

        // 用于存放元素
        this.el = {
            // 获取外层插入到的元素
            wrapper: document.getElementById(args.wrapperId)
        };

        // 创建自定义加载完成事件的名字
        this.completeEvent = null;
        this.completeEventName = 'loadingComplete';
        try {
            this.queue = new createjs.LoadQueue(true);
        } catch(e) {
            throw new Error('请先引入preload.js');
            return;
        }
        // 进度条动画时间毫秒
        this.progressDuration = 200;
        // 是否加载完毕
        this.isLoaded = false;
        this.init();
    }
    loading.prototype = {
        init: function() {
            // 防止重名的后缀
            this.timeStramp = new Date().getTime();

            this._createEvent();

            this._appendEl();

            this.el.loadingNum = document.getElementById('loading-num');
            this.el.loadingProgress = document.getElementById('loading-progress');
                                                                                        
            this.startQueue();
        },
        // 创建自定义监听的事件
        _createEvent() {
            this.completeEvent = document.createEvent('CustomEvent');
            this.completeEvent.initCustomEvent(this.completeEventName, true, false, 'loading complete');
        },
        _appendEl: function() {
            var loadingEl = document.createElement('div');
            var loadingStyle = document.createElement('style');
            loadingEl.id = 'loading-' + this.timeStramp;
            loadingEl.innerHTML = this._html();
            loadingStyle.innerHTML = this._style();

            this.el.wrapper.appendChild(loadingEl);
            document.head.appendChild(loadingStyle);
        },
        _html: function() {
            var tpl = `
                <div class="loading-show">
                    <div class="logo">
                        <img src="${this.logoImg}">
                    </div>
                    <div class="load">
                        <i id="loading-num"></i>
                        <div id="loadgrowing"><cite id="loading-progress"></cite></div>
                        <p>加载中....</p>
                    </div>
                </div>
            `;
            return tpl;
        },
        _style: function() {
            var suffix = this.timeStramp;
            var style = `
                #${args.wrapperId}.out {
                    animation: fadeout_${suffix} 0.5s both;
                }
                @keyframes fadeout_${suffix} {
                    from {opacity: 1;}
                    to {opacity: 0;}
                }
                #loading-${suffix}{position: fixed;z-index: ${this.zIndex};left: 0;right: 0;top: 0;bottom: 0;background: ${this.bgColor};}
                #loading-${suffix} .loading-show{width: 40%;left: 50%;top: 50%;transform: translate(-50%,-50%);position: absolute;}
                #loading-${suffix} .loading-show img:nth-child(2){margin-left: 20px;}
                #loading-${suffix} .load{margin-top: 10px;}
                #loading-${suffix} .load i{display: block;text-align: center;color: ${this.fontColor};margin-bottom: 10px;}
                #loading-${suffix} .load p{text-align: center;margin-top: 10px;color: ${this.fontColor};font-size: 12px;}
                #loading-${suffix} #loadgrowing{overflow:hidden;border-radius: 20px;border: 1px solid ${this.progressBorderColor};height: 10px;width: 100%;}
                #loading-${suffix} #loadgrowing cite{background: ${this.progressBgColor};display: block;height: 10px;width: 0;transition: width ${this.progressDuration / 1000}s;}
                #loading-${suffix} embed{display: block;width: 30px;height: 30px;margin: 10px auto 0;}
                #loading-${suffix} .logo{display: block;width: 135px;height:66.5px;margin: 0 auto;}
                #loading-${suffix} .logo img{width: 100%;height: auto;}
            `;
            return style;
        },
        startQueue: function() {
            var self = this;
            // 加载进度 这里使用apply将作用域传进去
            this.queue.on("progress", function() {
                self.handleFileLoad();
            });
            // 加载完成
            this.queue.on("complete", function() {
                self.handleComplete();
            });
            // 加载的列表
            this.queue.loadManifest(this.manifest);
        },
        handleFileLoad: function(e) {
           // 这里的this指的就是这个loading实例
           var bnum = parseInt(this.queue.progress * 100);
           this.el.loadingNum.innerText = bnum + '%';
           this.el.loadingProgress.style.width = bnum + '%';
        },
        handleComplete: function() {
            var self = this;
            // 加载完成向外自定义事件
            if(window.dispatchEvent) {
              window.dispatchEvent(this.completeEvent);
            } else {
              window.fireEvent(this.completeEvent);
            }
            this.isLoaded = true;
            // 隐藏加载层
            if (this.autoHide) {
                self.hide();
            }
        },
        // 隐藏加载层 向外暴漏的方法, 调用可以直接隐藏
        // 支持传一个隐藏后触发的回调函数
        hide: function(callback) {
            clearTimeout(timer);
            var self = this;
            if (!self.isLoaded) {
                timer = setTimeout(function() {
                    self.hide(callback);
                }, 50);
                return;
            }
            setTimeout(function() {
               self.el.wrapper.classList.add('out');
               self.el.wrapper.addEventListener('animationend', function() {
                   var status = self.el.wrapper.dataset[self.completeEventName];
                   if (status == 'true') {
                        return;
                   }
                   self.el.wrapper.style.display = 'none';
                   // 标记一个记录，避免反复执行
                   self.el.wrapper.dataset[self.completeEventName] = self.isLoaded;

                   callback && callback();
               });
            }, self.progressDuration + 10);
        },
        defaultLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU4AAACWCAYAAACxSWGfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwRDM0MUM1MTEzMjExRUNBQjkwOUFEN0E4MjUxOTk3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwRDM0MUM2MTEzMjExRUNBQjkwOUFEN0E4MjUxOTk3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjBEMzQxQzMxMTMyMTFFQ0FCOTA5QUQ3QTgyNTE5OTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjBEMzQxQzQxMTMyMTFFQ0FCOTA5QUQ3QTgyNTE5OTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz691bfCAAAKdUlEQVR42uyd0XHiSBRF21MbABmstmr/F2eAA9hCEwE4Ao8jsB2BTQQWEQzUBjBsBuz/frAZkAFLl0XZg42R9F631E/nVKnmYwy0uuHoXXVLutjtdg4AAKrzhS4AAECcAACIEwAAcQIAIE4AAMQJAACIEwBAh19Cvvn29z/p4fpk5daUFV0I8Mrg37/SEic0It9vj4LXX+63Nd0IQFTvEwvh6yd0IUDCUR0asSkrxqGgYr2lGz9kVB5YMrrCNP73Myt/S0mK0/+IbyJ32ny/FYkP/Fwgzqx8LXH9Z6b77Zlu6M0BcloWEEFcEFqc63InYvK3kbguOc85QZzvfkhIs18Myt+Q/y1ttd889DnODT/gVvotpwvfHUign/KchnjjGJNDc8Yver9lgqhvkYwu6LU8kxTngrFrpd+oOgECEUOcxPV2+m1MFwKkK07iejv9NiSiAoQh1jpO6SxxSEYdHh/pbKBfCrbs8L6RRABxVoidXZyw+GF4fL+VWxdZ7bcrfoJAVCeuAwDiVKWguwEAcdbDn9NiaRIAIM6aLOlyAECc9aDiBADESVwHAMRJXAcA+JQ2bmRcuNMz7Pf77Y5hgQ7i7+3Igv24+LtaTREnQLp4aa7ohqiMiOoAAEZAnAAAiBMAAHECAHQKJoecu6ALAICKEwAAcQIAIE4AAMQJANAXmBwCkJE52UPxVg1e4x9BMwi4T220aZXSoCNOABn++fWSBxF+dfXvGPbdhX2C6aWrf13+D4E41+VnEtUTYsfWymblIXmF8PXjBpVdFnifJg0OHpJqc5baoCNOABnSe8zmgaUWo01j4ecld49exAkgR3KP2UFNUeUR9idz9R7lLWnTojz4IE6AnlEIf/xVK7YYMb1uZSuN6Uk+NhxxAugQI65PIu5P1TZJYnqyj9JBnAA6SCqnqnE9j7g/VeO6NKYnCeIE0GG13zYB43rMmF61wu3dbDriBEgrrk9a2J9zbZLEdH+QSfYZTogTQA9JBXUuruct7M+5uC5p0zzlgUacAHpIq6hxh2L6uUpXGtMLxAkAGpVUHiimbwK0SRLT18I2IU4AY0gqqVNxXTpz/SCM6yPlNs1SH2Ru8iH7UkE7VVCXOaxNbCqWsft5kikXxvRl+X7Pwri+Uozpi9QHGXE6d08XgDJLgTj9627d65VIGgvMt2UlPBW06Vrp1EGSl1gS1QHixPWmcjiO61rXgWtdTz9wPZ5NR5wAYZHE0bFSJJ4ftWej1CZpBYw4AUC9sjoIU7rAfKUo81zh1MHCyuAiToAwrJx8GZB2JJYu0J+6ns+mI06Absf1R6e/wNyLXLJA/05YAa+tDCziBAiHtMILUe1K2pQpV8DJwnIkO8++SQ1ffdwa38dDlTWM/LnzM1Xwcwt9USBOW4zoAggssZjiPDdzLV3T2fQgubE0qER1AFuVVpUF5svIbZpZG1TECdBuBRgzpteRq7bMEScA1CJWhefj8KpjlbCJSywRJ0A7cT2GPOaB/jZWmxAnAESPq3WqyLULv67SzCWWiBOgHUJXXk1mrkO3aWF1MBEnQBxWLuySnCYz10XgfZ5ZHUzECWAjrjd575BReuMMXWKJOAHaI1QFVrjmk0+h4vrc8kAiToB4hKrCJMudQi0XKiwPJOIEiIt2JbZRiNvakjN3iSXifM8FWyvbVU+/b9qS0jhHqS3zmfVBRJwAcdGekNGQlPaazoX1QUScAPHRugRTMxJrVZ0mL7FEnADdiOsacpkpt6lLAkacABAkzmpGYo1TCGYvsUScADbiulbVqtmmRV8GD3ECtMNA+PphB9s06Mvg8eiMV0aOx2jEiqhrukH0fPKDODOnu15yInz94Xnw5ieHEOcL/uFVU7ohCndlzLzuebWZK7yPf48npTZlSlVs7oxfNURUf+ERaUbH9/d9j/c/V3qfG+Ux6UIljTgT+hFDfG7Y985UiRox/e1BIUOcthm6Hp3Q7mBc7SOastMS3lBZdrn1QfzCjxcgyZiu+X7a1f/E+iAS1QHioi2VTEGe2jLXrmARJ0CPGbow6y8lEzJ5oORl+hw24gRIt9rUkN84YJsQJwB0ViZN14X6100DtSkLVF0jToCexfQs4Ps3qRxDV4VmJ4kQJ0AcQp/zaxLXQy9Wn1odTMQJkHZMbyqqLEKbBs7ouU7ECRBHmjHWDE9qtikGJi/BRJwAduRR5zxqrPOPJitO7o4ko3A9eVTACR6d4ZnTROOqj+v3FQQ7jLj/U2fsjkmIU8Z/+23V4/3f8hXoTEx/W0neV/ib2BW3KXES1QFsxPQDWYVqMnZ8jn3wQJwAxPTafLb0aeTauY7c1LlOxAlgTxZ5h2J625+LOAESQ7LoXfLEyM8qXYnMC8Fr26p0ESdAQnhJSGauH5zsoXbjE9IcCNu0Ia4jToAuxvRNKU3JUrfpB5KUxOV12S5JJWwmriNOgO7G9IWwDXnF+F6F+dG/TTBzg2PECaCPVBDzo8pTI65LY/LiqPJs44CCOAEMI4mkx7KUVHhvnzgpEdaxLBfCNiFOAFCVw+xEpSeVp2Sian6mjXWQtgVxAhhkJIzpiw8q0JWw+pVWecWZqjhmRY44AYjpn0Zijbjuq7s7oci3ym2aIk4A0Irp84pVaF0kazeXAdqU/A2OESeArjQlkjolo62CPLXbJI3rSd/gGHEC6CGRwbllPsuWpLltUCGHrswRJ4ARpI/aPSehNirOZcA2hXw0MeIESCimh4jEbcb1c5/X27iOOAG6H9PbiOvnYrpWXE/yBseIE0AnpoeYTW8zri8jtSnJc52IE0DONHAkbiOuV/0caVxP8tp1xAkgJ8Si9zbjetWYrhHXk7xjEk+5lPGre7nELjZr1/wJk5niF3XAV0D9OvAqUnvuSEx/26ZHYVx/Qpz9imjTFj7Xi/OqoTwfnbEHZ7VM6Nn0U3E95BjWbZOvmFeCImKSmjiJ6mniK5wfDSq+DGmq43/wF4Jt0+Azvwo/89zW5IB8Jfi8y9QGHXH2S543dBsA4kSe1eWZ9JUaAIgT2pBnsouNARAntCVPYjoA4oQa8hw5A48rAOgKLEeyKc/jpUoTugYisqPihNQrTyaFIDYL6zuIOO3L8xvdAZFZWt/Bvotza3jfDvIkpgMVJ+JUZW18/7p8A4UNfjFdkJiWJ1H9/TOjIQ4PdAFxHXGmy63xyN7FSvMrByziesqwHOlFmv4mA9OOt/MPF/4GHf7L/k/A91+VG/Qnrpu8qQzifK2C7hNop5f7c8Av+jXVNygytypOonpaFGXMDSG3GdKEAAnG5Heqa+L0VZ/0XoL3PfgyXil/IX3F/cTvHAJ9XxEndAK/jOo3p7ec6oFqEwJhcnYdcabLtqw8pUf0jWOGG4jriLNn8pQu7bmmG4G4jjj7yHVDAa4cy4OAuF4bliPZoSgrUL9cqeqd3vty9c6tk9/9fs1XTFRxXiBO6PIXdLPfvrvz16gXPao2kR4Q1eGsJC4ryIJrxQEQJ7zhMONenPj/J8fdiQAQJ3woz2v3fmH7lmoTAHHC59y6n2fcubQSAHFCBYoyum8cl1YCiLnY7Xb0AgBADf4XYACFpUwNw4qGBQAAAABJRU5ErkJggg=='
    };

    return new loading();
};

var PreLoading = new Loading({
    // 除wrapperId外其他均为可选
    wrapperId: 'loading-wrapper',
    // 要加载的所有图片
    manifest: ['img/U11082P1534DT20141121145650.png','img/WXgift.png','img/bar1.png','img/bar2.png','img/bg.png','img/bg_btn.png','img/bg_navhill.png','img/bgx.png','img/box-lose.png','img/box-losing.png','img/box-win.png','img/box-winning.png','img/box.png','img/cattle1.png','img/changescreen2.png','img/cloud.png','img/confirm.png','img/continue.png','img/egg-lose.png','img/egg-losing.png','img/egg-win.png','img/egg-winning.png','img/egg.png','img/final.png','img/game-jieshao.png','img/go.png','img/home.jpg','img/icons_btn.png','img/icons_btn_arrow_left.png','img/icons_btn_arrow_right.png','img/levelup.png','img/loading.gif','img/loading2.gif','img/lou.png','img/process1.png','img/process2.png','img/prop1.png','img/prop2.png','img/prop3.png','img/prop4.png','img/propadd.png','img/propcut.png','img/ready.png','img/replaybtn-img.png','img/result.png','img/road.jpg','img/share.jpg','img/share.png','img/sharebtn-img.png','img/sight.png','img/sightfinal.png','img/speedup.png','img/start.png','img/timer.png','img/title-1.png','img/wechatshare.png','img/welcome.jpg','img/win.png'],
    autoHide: false,
    bgColor: '#0eaaf3',
    fontColor: '#fff',
    progressBgColor: '#383a49',
    progressBorderColor: '#0580b9',
    zindex: 99999,
    // 设定logo图
    logoImg: 'img/title-1.png'
});

/**
 * 当使用手动控制加载层隐藏时 可以使用如下两种方式
 * 方式一： 监听回调 手动执行
 * window.addEventListener('loadingComplete', function() {
        PreLoading.hide();
    });
    方式二： 直接执行 会开启定时器反复检测
    // 支持在隐藏后触发一个回调函数 可选
    PreLoading.hide(function() {
        alert('ok')
    });
 */