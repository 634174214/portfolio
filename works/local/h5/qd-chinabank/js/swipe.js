/*3.12 更新，解决微信加载bug*/
function iSlider(opts) {
    this.opts={
        wrap:'.wrap',
        item:'.item',
        playClass:'play',
        index:0,
        noslide:[],
        speed:400, //滑屏速度 单位:ms
        triggerDist:30,//触发滑动的手指移动最小位移 单位:像素
        isVertical:true,//垂直滑还是水平滑动
        useACC:true, //是否启用硬件加速 默认启用
        fullScr:true, //是否是全屏的 默认是. 如果是局部滑动,请设为false
        preventMove:false, //是否阻止系统默认的touchmove移动事件,  默认不阻止, 该参数仅在局部滚动时有效,   如果是局部滚动 如果为true 那么在这个区域滑动的时候 将不会滚动页面.  如果是全屏情况 则会阻止
        lastLocate:true, //后退后定位到上次浏览的位置 默认开启
        loadingImgs:[], //loading 预加载图片地址列表
        onslide:function (index) {},//滑动回调 参数是本对象
        onloading:function (loaded,total) {},
        loadingOverTime:15, //预加载超时时间 单位:秒
        load_delay_time:20  
    }

    for (var i in opts) {
        this.opts[i]=opts[i];
    }

    this.init();
}
/**  @lends iSlider */
iSlider.prototype={
    wrap:null,
    index : 0,
    length:0,
    _tpl:[],
    _delayTime:500,
    _sessionKey : location.host+location.pathname,
    _prev:null,
    _current:null,
    _next:null,
    num:0,
    $:function (o,p) {
        return (p||document).querySelector(o);
    },
    addClass:function (o,cls) {
        if (o.classList) {
            o.classList.add(cls)
        }else {
            o.className+=' '+cls;
        }
    },
    removeClass:function (o,cls) {
        if (o.classList) {
            o.classList.remove(cls)
        }else {
            o.className=o.className.replace(new RegExp('\\s*\\b'+cls+'\\b','g'),'')
        }
    },
    init:function () {
        var self = this;
        if (this.opts.loadingImgs && this.opts.loadingImgs.length) {
            this._loading();
        }else {
            this._pageInit();
        }
        this.wrap = typeof this.opts.wrap=='string' ? this.$(this.opts.wrap) : this.opts.wrap ;
        //使用sessionStorage来保存当前浏览到第几页了   后退回来的时候 定位到这一页
        this._sessionKey=btoa(encodeURIComponent(this._sessionKey+this.wrap.id+this.wrap.className));

        var lastLocateIndex=parseInt(sessionStorage[this._sessionKey]);
        this.index = ((this.opts.lastLocate && lastLocateIndex>=0) ? lastLocateIndex : 0) || this.opts.index || 0;

        if (!this.wrap) {
            throw Error('"wrap" param can not be empty!');
            return ;
        }
        this._setOthers();
        this._tpl = this.wrap.cloneNode(true);
        this._tpl = this.opts.item ? this._tpl.querySelectorAll(this.opts.item) : this._tpl.children;

        for (var i=0; i<this._tpl.length; i++) {
            this._tpl[i].style.cssText+='display:block;position:absolute;left:0;top:0;width:100%;height:100%'
        };

        this.length=this._tpl.length; //总页数数据
        this.touchInitPos = 0;//手指初始位置
        this.startPos = 0;//移动开始的位置
        this.totalDist = 0,//移动的总距离
        this.deltaX1 = 0;//每次移动的正负
        this.deltaX2 = 0;//每次移动的正负
        
        //全屏滑动 设置样式
        if (this.opts.fullScr) {
            var s = document.createElement('style');
            s.innerHTML = 'html,body{width:100%;height:100%;overflow:hidden}';
            document.head.appendChild(s);
            s = null;
        }

        this.wrap.style.cssText+="display:block;position:relative;"+(this.opts.fullScr ? 'width:100%;height:100%':'');
        
        //必须要在前面的布局都设置好后 再来获取尺寸
        this.displayWidth = this.wrap.clientWidth; //滑动区域最大宽度
        this.displayHeight = this.wrap.clientHeight; //滑动区域最大高度

        this.scrollDist=this.opts.isVertical ? this.displayHeight : this.displayWidth;//滚动的区域尺寸 

        this._setHTML();// 填充初始DOM



        if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {
            this._delayTime=50;
        }


        this._bindEvt();
    },
    _bindEvt:function () {
        var self = this;
        var handlrElm= this.opts.fullScr ? this.$('body') : this.wrap;
        handlrElm.addEventListener('touchstart',function (e) {
            self._touchstart(e);
        },false);
        handlrElm.addEventListener('touchmove',function (e) {
            self._touchmove(e);
        },false);
        handlrElm.addEventListener('touchend',function (e) {
            self._touchend(e);
        },false);
        handlrElm.addEventListener('touchcancel',function (e) {
            self._touchend(e);
        },false);

        if (this.opts.fullScr || this.opts.preventMove) {
            handlrElm.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }
         $(this.wrap).on('swipeLeft',function(){
            var len = $(self._current).children(".content-box").children(".content").length;
            if(self.num<len-1){
                self.num++;
                self._moveLR();
            }
        })
         $(this.wrap).on('swipeRight',function(){
            if(self.num>0){
                self.num--;
                self._moveLR();
            }
        })
    },
    _moveLR:function(){
        var self = this;
        $(this._current).children(".content-box").css("-webkit-transform"," translate3d("+ -(self.num*windowW)+"px, 0, 0)");
        $(".yuanD em").removeClass("dq");
        $(".yuanD").each(function(i){
            $(this).children("em").eq(self.num).addClass("dq");
        })
        setTimeout(function(){ 
            $(".content").removeClass(self.opts.playClass);
            $(self._current).children(".content-box").children(".content").eq(self.num).addClass(self.opts.playClass);
        },400) 
    },
    _setOthers:function(){
        $(".content-box").each(function(i){
            var st_l = $(this).children(".content").length;
           /* $(this).css("width",st_l*windowW+'px')*/
            if(st_l>1){
                var str = '<em class="dq"></em>';
                for(i=0;i<st_l-1;i++){
                    str += '<em></em>'
                }
                $(this).children(".content").append('<p class="yuanD">'+str+'</p>');
            }
        })
    },
    _setHTML:function (index) {
        if (index>=0) {
            this.index=parseInt(index);
        }
        this.wrap.innerHTML='';

        var initDom = document.createDocumentFragment();

        if (this.index>0) {
            this._prev=this._tpl[this.index-1].cloneNode(true);
            this._prev.style.cssText+=this._getTransform('-'+this.scrollDist+'px');
            initDom.appendChild(this._prev)
        }
        this._current =this._tpl[this.index].cloneNode(true);

        this._current.style.cssText+=this._getTransform(0);
        initDom.appendChild(this._current);
        
        if (this.index<this.length-1) {
            this._next=this._tpl[this.index+1].cloneNode(true);
            this._next.style.cssText+=this._getTransform(this.scrollDist+'px');
            initDom.appendChild(this._next)
        }
        this.wrap.appendChild(initDom);

    },
    _pageInit:function () {
        audio.play();
        var self = this;
        setTimeout(function () {
            $(self._current).children(".content-box").children(".content").eq(0).addClass(self.opts.playClass);
        },this._delayTime);
    },
    _touchstart : function (e) {
        var self=this;
        if(e.touches.length !== 1){return;}//如果大于1个手指，则不处理
        
        this.lockSlide=false;
        this._touchstartX=e.touches[0].pageX;
        this._touchstartY=e.touches[0].pageY;

        this.touchInitPos = this.opts.isVertical ? e.touches[0].pageY:e.touches[0].pageX; // 每次move的触点位置
        this.deltaX1 = this.touchInitPos;//touchstart的时候的原始位置

        this.startPos = 0;
        this.startPosPrev = -this.scrollDist;
        this.startPosNext = this.scrollDist;
        //手指滑动的时候禁用掉动画
        if (this._next) {
            self._next.style.cssText+='-webkit-transition-duration:0;'
        }

        self._current.style.cssText+='-webkit-transition-duration:0;'
        if (this._prev) {
            self._prev.style.cssText+='-webkit-transition-duration:0;'
        }
    },
    _touchmove : function (e) {
        var self = this;
        if(e.touches.length !== 1 || this.lockSlide){return;}

        var gx=Math.abs(e.touches[0].pageX - this._touchstartX);
        var gy=Math.abs(e.touches[0].pageY - this._touchstartY);
        
        //如果手指初始滑动的方向跟页面设置的方向不一致  就不会触发滑动  这个主要是避免误操作, 比如页面是垂直滑动, 在某一页加了横向滑动的局部动画, 那么左右滑动的时候要保证页面不能上下移动. 这里就是做这个的.
        if (gx>gy && this.opts.isVertical) { //水平滑动
            this.lockSlide=true;
            return ;
        }else if(gx<gy && !this.opts.isVertical){ //垂直滑动
            this.lockSlide=true;
            return ;
        }
        //如果是禁用了这一页的滑动, 那么往下是划不动了  但是可以往上滑
        if (this.opts.noslide && this.opts.noslide.indexOf(this.index)>=0 && e.touches[0].pageY - this._touchstartY<0) {
            return ;
        }

        var currentX = this.opts.isVertical ? e.touches[0].pageY:e.touches[0].pageX;
        this.deltaX2 = currentX - this.deltaX1;//记录当次移动的偏移量
        this.totalDist = this.startPos + currentX - this.touchInitPos;

        
        this.startPos = this.totalDist;
        
        //处理上一张和下一张
        if (this.totalDist<0) {//露出下一张
            if (this._next) {
                self._current.style.cssText+=this._getTransform(this.totalDist+'px');
                this.totalDist2 = this.startPosNext + currentX - this.touchInitPos;
                self._next.style.cssText += this._getTransform(this.totalDist2+'px');
                this.startPosNext = this.totalDist2;
            }
        }else {//露出上一张
            if (this._prev) {
                self._current.style.cssText+=this._getTransform(this.totalDist+'px');
                this.totalDist2 = this.startPosPrev + currentX - this.touchInitPos;
                self._prev.style.cssText += this._getTransform(this.totalDist2+'px');
                this.startPosPrev = this.totalDist2;
            }
        }

        this.touchInitPos = currentX;
    },
    _touchend : function (e) {
        if(this.deltaX2 < -this.opts.triggerDist){
            this.next();
        }else if(this.deltaX2 > this.opts.triggerDist){
            this.prev();
        }else{
            this._itemReset();
        }
        this.deltaX2 = 0;
    },
    _getTransform:function (dist) {
        var pos= this.opts.isVertical? '0,'+dist : dist+',0';
        return ';-webkit-transform:' + (this.opts.useACC ? 'translate3d('+pos+',0)' : 'translate('+pos+')');
    },

    _itemReset:function () {
        var self = this;
        self._current.style.cssText+='-webkit-transition-duration:'+this.opts.speed+'ms;'+this._getTransform(0);
        if (self._prev) {
            self._prev.style.cssText+='-webkit-transition-duration:'+this.opts.speed+'ms;'+this._getTransform('-'+this.scrollDist+'px');
        }
        if (self._next) {
           self._next.style.cssText+='-webkit-transition-duration:'+this.opts.speed+'ms;'+this._getTransform(this.scrollDist+'px');
        }
        this.deltaX2 = 0;
    },

    _loading:function () {
        var self = this;
        var imgurls=this.opts.loadingImgs;
        console.log(this.opts.loadingImgs)
        var fallback=setTimeout(function () {
            try {
                self.opts.onloading.call(self,total,total);
            } catch (e) { }
            
            self._pageInit();
        },this.opts.loadingOverTime*1000);//loading超时时间  万一进度条卡那了 15秒后直接显示

        var imgs=[], loaded=1;
        var total=imgurls.length+1;
        var i=0;
        var time = setInterval(function(){
            if(i==imgurls.length){
                clearTimeout(time);
                return;
            }
            imgs[i]=new Image();
            imgs[i].src=imgurls[i];
            imgs[i].onload=imgs[i].onerror=imgs[i].onabort=function (e) {
                loaded++;
                if (this.src === imgurls[0] && e.type === 'load') {
                    clearTimeout(fallback)
                }
                checkloaded();
                this.onload=this.onerror=this.onabort=null;
            }
            i++;           
        },self.opts.load_delay_time)

        try {
            self.opts.onloading.call(self,1,total);
        } catch (e) { }

        function checkloaded() {
            try {
                self.opts.onloading.call(self,loaded,total);
            } catch (e) { }
            if (loaded==total) {
                if (fallback) {
                    clearTimeout(fallback)
                }
                self._pageInit();
                imgs=null;
                if (self.opts.preLoadingImgs && self.opts.preLoadingImgs.length) {
                    self.preloading();
                }
            }
        }
    },
    /** 
     * 滑动到上一页
     * @example
        s1.prev();
     */
    prev:function () {
        var self = this;

        if (!this._current || !this._prev) {
            this._itemReset();
            return ;
        }
        if (this.index > 0) {
            this.index--;
        }else {
            this._itemReset();
            return false;
        }

        var nextIndex = this.index+1 > this.length-1 ? 0 : this.index+1;

        if (this._next) {
            this.wrap.removeChild(this._next);
        }

        this._next=this._current;
        this._current=this._prev;
        this._prev=null;

        this._next.style.cssText+='-webkit-transition-duration:'+this.opts.speed+'ms;'+this._getTransform(this.scrollDist+'px');
        this._current.style.cssText+='-webkit-transition-duration:'+this.opts.speed+'ms;'+this._getTransform(0);

        sessionStorage[this._sessionKey]=this.index;

        setTimeout(function () {
            /*
            if (self.$('.'+self.opts.playClass,self.wrap)) {
                self.removeClass(self.$('.'+self.opts.playClass,self.wrap),self.opts.playClass)
            }
            self.addClass(self._current,self.opts.playClass)

            try {
                self.opts.onslide.call(self,self.index);
            } catch (e) {

            }*/
             $(".content").removeClass(self.opts.playClass);
            $(self._current).children(".content-box").children(".content").eq(0).addClass(self.opts.playClass);

            var prevIndex = self.index-1;
            if (prevIndex < 0) {
                prevIndex =  self.length-1;
                return false;
            }

            self._prev = self._tpl[prevIndex].cloneNode(true);
            self._prev.style.cssText+='-webkit-transition-duration:0ms;'+self._getTransform('-'+self.scrollDist+'px');
            self.wrap.insertBefore(self._prev,self._current);

        },this._delayTime)

    },

    /** 
     * 滑动到下一页
     * @example
        s1.next();
     */
    next:function () {
        var self = this;

        if (!this._current || !this._next) {
            this._itemReset();
            return ;
        }

        if (this.index < this.length-1) {
            this.index++;
        }
        else {
            this._itemReset();
            return false;
        }
        
        var prevIndex = this.index===0 ? this.length-1 : this.index-1;
        if (this._prev) {

            this.wrap.removeChild(this._prev);
        }

        this._prev=this._current;
        this._current=this._next;
        this._next=null;

        this._prev.style.cssText+='-webkit-transition-duration:'+this.opts.speed+'ms;'+this._getTransform('-'+this.scrollDist+'px');
        this._current.style.cssText+='-webkit-transition-duration:'+this.opts.speed+'ms;'+this._getTransform(0);
        sessionStorage[this._sessionKey]=this.index;

        setTimeout(function () {
            /*
            if (self.$('.'+self.opts.playClass,self.wrap)) {
                self.removeClass(self.$('.'+self.opts.playClass,self.wrap),self.opts.playClass)
            }
            self.addClass(self._current,self.opts.playClass)

            try {
                self.opts.onslide.call(self,self.index);
            } catch (e) {
              
            }
    */
             $(".content").removeClass(self.opts.playClass);
            $(self._current).children(".content-box").children(".content").eq(self.num).addClass(self.opts.playClass);

            var nextIndex = self.index+1;
            if (nextIndex >= self.length) {
                return false;
            }

            self._next = self._tpl[nextIndex].cloneNode(true);
            self._next.style.cssText+='-webkit-transition-duration:0ms;'+self._getTransform(self.scrollDist+'px');
            self.wrap.appendChild(self._next);

        },this._delayTime)

    },
    /** 
     * 跳转到指定页码
     * @param {number} index 页码 从0开始的
     * @example
        s1.slideTo(3);
     */
    slideTo:function (index) {
        this._setHTML(index);
        this._pageInit();
    }

}

if (typeof module == 'object') {
    module.exports=iSlider;
}else {
    window.iSlider=iSlider;
}

//判断手机横竖屏状态：
function checkDirect(){
    var mask = document.getElementById("mask");
    if(window.orientation==180||window.orientation==0){
        mask.style.display = "none" ;
    }
    else if(window.orientation==90||window.orientation==-90){
        mask.style.display = "block" ;
    }
} checkDirect();
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", checkDirect, false);





    window.audio = document.createElement("audio");
    var source = document.createElement("source");
    audio.id = "audio" ;
    source.type = "audio/mpeg" ;
    source.src = url ;
    source.autoplay = "autoplay" ;
    audio.addEventListener("ended",function(){
        audio.play();
    },false);
    audio.appendChild(source);
    
    //    关闭音乐
    var musicBtn = $("#musicDiv");
    var musicStop = $("#musicDiv .xq-yinyuegb");
    var musicOn = $("#musicDiv .xq-yinyue");
    musicBtn.tap(function() {
        if (audio.paused) {
            musicOn.show();
            musicStop.hide();
            audio.play();
        } else {
            musicOn.hide();
            musicStop.show();
            audio.pause();
        }
    });
    var windowH = $(window).height();
    var windowW = $(window).width();
    $(".content-box").css({"height":"568px","width":"320px"});
    $(".stage").append('<p class="xq-souqi"></p>');
    $(".stage .xq-souqi").last().remove();
    $(".stage").last().append('<p class="xq-xiala"></p>');
    //模拟的图片数据，测试完毕后清除
    var loadingimgurls = [
        ];
    var imgL = $("img").length;
    for(i=0;i<imgL;i++){
        loadingimgurls.push($("img").eq(i).attr("src"));
    }
   var startIndex;
    new iSlider({
        index:startIndex-1,
        lastLocate:false,
        wrap:'.wrapper',
        item:'.stage',
        playClass:'z-current',
        loadingImgs: loadingimgurls.slice(),
        onloading:function (loaded,total) {
            this.$('#loading #num').innerHTML = parseInt((loaded/total)*100) + "%";
            document.getElementById('numKuai').style.height =  parseInt((loaded/total)*100)+"%";
            if (parseInt(this.$('#loading #num').innerHTML)>=100 ) {
                this.$('#loading').style.display="none"
            }
        }
    });

  