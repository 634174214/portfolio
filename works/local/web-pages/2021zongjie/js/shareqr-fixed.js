/**
 * 引入后自动在浏览器上固定二维码 应用于信网
 * @Author   wubin
 * @DateTime 2022-01-07T15:49:05+0800
 * @return   null             
 */
(function ShareFixed(obj) {
    var QR_URL = 'http://api.tech.qdxin.cn/qrxin.php?data=';
    function shareQr() {
        obj = obj || {};
        // 生成二维码的url
        this.url = obj.url || window.location.href;
        // 二维码下方提示文字
        this.tips = obj.tips || '手机扫一扫·分享一下';
        // 距离顶部的位置
        this.top = obj.top || 20;
        // 距离浏览器右侧距离
        this.left = obj.left || 20;
        // 当滚动到哪个位置出现 默认不开启 默认直接显示
        this.offsetTop = obj.offsetTop || false;
        this.init();
    }
    shareQr.prototype = {
        init: function() {
            if (this.isMobile()) {
                return;
            }
            if (this.offsetTop && this.offsetTop > 0) {
                this.listenScroll();
            }
            this.appendEl();
        },
        isMobile: function() {
          if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
                return true;
          }
          return false;
        },
        getEl: function() {
            var el = document.createElement('div');
            el.className = 'erweiBox';
            var elInner = '<div id="erweiMa">';
                elInner += '<img src="' + QR_URL + this.url + '" width="120" height="120">';
                elInner += '</div>';
                elInner += '<em>' + this.tips + '</em>';
            el.innerHTML = elInner;
            return el;
        },
        getCss: function() {
            // 当设置了这个值的时候 开始默认是隐藏
            var showCss = this.offsetTop ? 'visibility: hidden;opacity: 0;' : '';
            var css = '.erweiBox{position: fixed;background: #fff;padding: 0 0 10px 0;top: ' + this.top + 'px;right: ' + this.left + 'px;z-index: 9999;box-shadow: 0px 3px 3px #ccc;' + showCss + '    transition: opacity 0.5s;}';
            css += '.erweiBox em{display: block;text-align: center;color: #777;font-size: 12px;}';
            css += '.erweiBox #erweiMa{width: 120px;overflow: hidden;text-align: center;}';
            css += '.erweiBox #erweiMa img{width: 100%;height: auto;}';
            css += '@media screen and (max-width: 480px) {.erweiBox{display:none;}}';
            var styleEl = document.createElement('style');
            styleEl.innerHTML = css;
            return styleEl;
        },
        appendEl: function() {
            this.el = this.getEl();
            this.style = this.getCss();
            document.head.appendChild(this.style);
            document.body.appendChild(this.el);
        },
        listenScroll: function() {
            var self = this;
            window.addEventListener('scroll', function() {
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (scrollTop > self.offsetTop) {
                    self.el.style.visibility = 'visible';
                    self.el.style.opacity = 1;
                } else {
                    self.el.style.opacity = 0;
                    self.el.style.visibility = 'hidden';
                }
            });
        }
    };

    return new shareQr();
})({
    top: 100,
    offsetTop: 600
});
// ShareFixed({
//     top: 100,
//     offsetTop: 600
// })