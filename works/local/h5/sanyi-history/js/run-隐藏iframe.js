var iframeBase = 'iframe_';

var app = new Vue({
    el: '#app',
    data: {
        showLoading: true,
        showVR: false,
        pageTitle: document.title,
        // 记录上一个显示VR的数组下标
        vrActiveIndex: null,
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
        getIframeId: function(vrIndex) {
            return iframeBase + vrIndex;
        },
        afterLeave: function() {
            this.vrList[this.vrActiveIndex].show = false;
            this.setIframe(this.vrActiveIndex, 'close');
            this.vrActiveIndex = null;
        },
        openVR: function(index) {
            document.title = this.vrList[index].name;
            this.showVR = true;
            this.setIframe(index, 'open');
            this.vrList[index].show = true;
        },
        closeVR: function(vrIndex) {
            this.showVR = false;
            document.title = this.pageTitle;
            this.vrActiveIndex = vrIndex;

        },
        setIframe: function(index, status) {
            let iframe = document.getElementById(iframeBase + index);
            let prev = iframe.previousElementSibling;
            switch(status) {
                case 'open':
                    iframe.contentWindow.location.reload(true);
                    setTimeout(() => {
                        prev.style.display = 'none';
                    }, 900);
                    break;
                case 'close':
                    prev.style.display = 'block';
            } 
        }
    }
});