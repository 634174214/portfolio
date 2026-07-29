// 针对单页手机页面 添加动画效果
function OnePageAni() {
    function oneFuns() {
        // 依靠这个类名筛选元素
        this.aniClass = 'w-ani';
        // 要获取元素上的data-属性名称 
        this.aniDataName = 'wani-name';
        this.aniDataDelay = 'wani-delay';
        this.aniDataInfinite = 'wani-infinite';

        this.init();
    }
    oneFuns.prototype = {
        init: function() {
            this.allAniEl = document.querySelectorAll('.' + this.aniClass);
            if (this.allAniEl.length <= 0) {
                return;
            }
            this.setAni();
        },
        // 设置初步的动画
        setAni: function() {
            var self = this;
            this.allAniEl.forEach(function(item, index) {
                var delay = item.getAttribute('data-' + self.aniDataDelay);
                delay = delay ? delay : '0s';
                var aniName = item.getAttribute('data-' + self.aniDataName);
                var aniInfinite = item.getAttribute('data-' + self.aniDataInfinite);
                if (!aniName) {
                    return;
                }
                var oldClass = item.className;
                item.style['animation-delay'] = delay;
                item.className = oldClass + ' animated ' + aniName;

                if (aniInfinite) {
                    self.setNextInfinite(oldClass, aniInfinite, item);
                }
            });
        },
        // 如果元素设置了永远执行的动画，那么在初步动画结束时候添加
        setNextInfinite: function(oldClass, aniInfinite, aniEl) {
            aniEl.addEventListener('animationend', function() {
                aniEl.className = oldClass + ' animated infinite ' + aniInfinite;
            });
        }
    };
    return new oneFuns();
}

/*
对HTML结构有要求
w-ani是必须要有的 依靠这个样式获取元素
data-wani-name 指定 animate.css的动画样式
data-wani-delay 指定 延迟时间
data-wani-infinite 指定第一步动画执行完成后 添加的永远执行动画的名称

<img src="images/start-man.png"
     class="w-ani" 
     data-wani-name="bounceInRight"
     data-wani-delay="0.3s"
>
<img src="images/start-btn.png"
     class="w-ani"
     data-wani-name="bounceInDown"
     data-wani-delay="0.8s"
     data-wani-infinite="bounce"
>
<img src="images/start-shuoming.png"
     class="shuoming w-ani"
     data-wani-name="bounceInRight"
     data-wani-delay="1s"
>
 */