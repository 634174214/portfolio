var app = new Vue({
    el: '#app',
    data: {
        showLoading: true,
        showVR: false,
        showVrCover: true,
        pageTitle: document.title,
        vrList: vrData
    },
    mounted: function() {
        setTimeout(() => {
            this.showLoading = false;
            this.wowInit();
        }, 500);
    },
    methods: {
        wowInit: function() {
            if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
                new WOW({
                    boxClass: 'wow',
                    animateClass: 'animated',
                    // 不设置这里首屏列表动画不触发 列表动画不触发主要因为元素触发动画的偏移量不够
                    offset: -window.screen.height,
                    mobile: true,
                    live: true
                }).init();
            };
        },
        getListDelay: function(index) {
            let base = 0.4;
            let delay = Math.floor((base + index * 0.2) * 10) / 10 ;
            return delay + 's';
        },
        setIframe: function(index) {
           // 父元素必须现插入现取 否则无法插入
           var vrX = document.getElementById('vr-iframe-x')
           let iframe = document.createElement('iframe');
           iframe.frameborder = 0;
           iframe.className = 'vr-iframe';
           iframe.src = this.vrList[index].src;
           iframe.id = 'vr-iframe';
           vrX.appendChild(iframe);
        },
        toggleVrCover: function(status) {
            var cover = document.getElementById('vr-cover');
            if(status === 'open') {
                setTimeout(() => {
                    this.showVrCover = false;
                }, 1000);
            }
            if(status === 'close') {
                this.showVrCover = true;
            }
        },
        afterLeave: function() {
            var vrX = document.getElementById('vr-iframe-x');
            var iframe = document.getElementById('vr-iframe');
            vrX.removeChild(iframe);
            this.toggleVrCover('close');
        },
        openVR: function(index) {
            document.title = this.vrList[index].name;
            this.showVR = true;
            this.setIframe(index);
            this.toggleVrCover('open');
        },
        closeVR: function() {
            this.showVR = false;
            document.title = this.pageTitle;
        }
    }
});