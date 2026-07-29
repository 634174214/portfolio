// 手机版菜单
var menuCl = document.getElementById("menuClose");
    var menuPop = document.getElementById("menuPid");
    var menuPId=$('#menuPid'),
          Cont=$('#menuNavC');
    var headmenu = document.getElementById("popGd");
    var fixhead = document.getElementById("fixMenu");
    var logoTi = document.getElementById("wordTi");
    

    var btnSwith = 'closed';
    function menuClickFn(){
    if(btnSwith == 'closed'){
        menuPop.style.display = 'block';
        logoTi.style.display = 'none';
        menuCl.setAttribute("class","nav-hamburger opened");
        btnSwith = 'opened';
        headmenu.setAttribute("class","popTopP45 headMenu headMenu_open");
        fixhead.setAttribute("class","guDig fixDiv");
        Cont.hide();
    }else{
        menuPop.style.display = 'none';
        btnSwith = 'closed';
        menuCl.setAttribute("class","nav-hamburger");
        headmenu.setAttribute("class","popTopP45 headMenu");
        fixhead.setAttribute("class","guDig");
                  logoTi.style.display = 'block';
                  Cont.show();
    }       
}
    function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture);//DOM2.0
    return true;
    }
    else if (elm.attachEvent) {
    var r = elm.attachEvent('on' + evType, fn);//IE5+
    return r;
    }
    else {
    elm['on' + evType] = fn;//DOM 0
    }
    }
    addEvent(menuCl,'click',menuClickFn,false);


function wowJS(){
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 10,
                mobile: true,
                live: true
            });
            new WOW().init();
        };

}
wowJS();

function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ['Android', 'iPhone',
            'SymbianOS', 'Windows Phone',
            'iPad', 'iPod'
        ];
        var flag = true;
        for (var i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) != -1) {
                flag = false;
                break;
            }
        }
        return flag;
}

var numtimer=null;
var Nindex=0,
    eleN=$('#xinNum dt'),
    numlen=eleN.length;
function TurnshowNum(){
    var eleN=$('#xinNum dt'),
    numlen=eleN.length;
    switch (Nindex){
    case 0://当记录值为0时
      eleN.eq(Nindex).removeClass('VisHide');
      eleN.eq(Nindex).addClass('animated flipInY');
      Numaddone(0,20,eleN.eq(Nindex).find('i'),100);
      Nindex++;
      break;
    case 1:
      eleN.eq(Nindex).removeClass('VisHide');
      eleN.eq(Nindex).addClass('animated flipInY');
      Nindex++;
      break;
    case 2:
      eleN.eq(Nindex).removeClass('VisHide');
      eleN.eq(Nindex).addClass('animated flipInY');
      Numaddone(0,10,eleN.eq(Nindex).find('i'),140);
      Nindex++;
      break;
    case 3:
      eleN.eq(Nindex).removeClass('VisHide');
      eleN.eq(Nindex).addClass('animated flipInY');
      Numaddrandom(0,1000,eleN.eq(Nindex).find('i'),30);
      clearInterval(numtimer);
      break;
    }
}

if (IsPC()) {
   numtimer=setInterval(function(){
       TurnshowNum();
   },300);
} else {
   var NumFH=$('#xinNum').offset().top;
   var screenH=$(window).height();
   $(window).on('scroll',function(){
       var scrollH=$(window).scrollTop();
       if (NumFH<(screenH+scrollH+20)) {
             numtimer=setInterval(function(){
                 TurnshowNum();
             },300);
             $(window).off('scroll');
       }
   });
}
function Numaddone(startN,endN,place,time){
    var Numtimer_one=setInterval(function(){
        if (startN<endN) {
            startN++;
             // console.log(startN);
             place.text(startN);
        }else{
            clearInterval(Numtimer_one);
        }
    },time);
}
function Numaddrandom(startR,endR,placeR,timeR){
    var Numtimer_random=setInterval(function(){
        var random=Math.floor(Math.random()*endR/20);
        // console.log(random);
        if (startR<endR) {
            startR=Math.floor(startR+random);
            placeR.text(startR);
            // console.log(startR);
        }else{
            clearInterval(Numtimer_random);
            placeR.text(endR);
        }
    },timeR);
}

// logo墙添加动画效果
function logowall(){
    var j=0,
        walllens=$('#logowall li').length;
    for(var i=0;i<walllens;i++){
        $('#logowall li a').eq(i).addClass('wow flipInY');
        $('#logowall li a').eq(i).attr('data-wow-delay',j+'s');
        j=j+0.05;
    }
}
logowall();

// 所有a下的img鼠标移动有透明度效果
// $('#logowall a img').hover(function(){
//     $(this).stop().animate({opacity:0.5});
// },function(){
//    $(this).stop().animate({opacity:1});
// });
$('#piyao a img').hover(function(){
    $(this).stop().animate({opacity:0.5});
},function(){
   $(this).stop().animate({opacity:1});
});

// 阻止a.no-link跳转
$('#logowall a.no-link').on('click', function(e) {
    e.preventDefault();
    return false;
});

// 信网各种公众号二维码
var erImg=[
    // 青岛信网
    {
        "src":"img/xin-we.jpg",
        "text": '请扫描二维码<br>关注公众号'
    },
    // 有好信儿
    {
        "src":"img/youxin-we.jpg",
        "text": '请扫描二维码<br>关注公众号'
    },
    // 视频号
    {
        "src":"img/shipinhao-we.jpg",
        "text": '请扫描二维码'
    },
    // 青岛辟谣
    {
        "src":"img/piyao-we.png",
        "text": '请扫描二维码<br>关注公众号'
    }
];
$('.xin_we').on('click',function(){
    var ispc = IsPC();
    $('.xin_we').siblings('.xin_er').remove();
    if (!ispc){$('#go-top').hide();} 
    
    // var thisIndex = $('.xin_we').index($(this));
    var thisIndex = $(this).data('qrindex');
    var currentObj = erImg[thisIndex];
    var erwei=$('<div class="xin_er"><cite>close</cite>'+'<img src="'+currentObj.src+'"/>'+'<p class="er-PC">' + currentObj.text + '</p><p class="er-m">请长按识别图中二维码<br>关注公众号</p></div>');
    if(ispc) {
        $(this).parent().append(erwei);
    } else {
        $('body').append(erwei);
    }
    closethisEr($('.xin_er cite'));
    return false;
});
function closethisEr(that){
    that.on('click',function(){
        that.parent().remove();
        if (!IsPC()){$('#go-top').show();} 
        return false;
    });
}
/*
<div class="xin_er">
    <cite>close</cite>
    <img src="img/xin-we.jpg">
    <p class="er-PC">请扫描二维码<br>关注公众号</p>
    <p class="er-m">请长按识别二维码</p>
</div>
*/

// gotop
    /**
 * @update: 2012/11/05
 */

GoTop = function() {

    this.config = {
        pageWidth           :1000,      // 页面宽度
        nodeId              :'go-top',  // Go Top 节点的 ID
        nodeWidth           :40,        // Go Top 节点宽度
        distanceToBottom    :120,       // Go Top 节点上边到页面底部的距离
        distanceToPage      :20,        // Go Top 节点左边到页面右边的距离
        hideRegionHeight    :90,        // 隐藏节点区域的高度 (该区域从页面顶部开始)
        text                :''         // Go Top 的文本内容
    };

    this.cache = {
        topLinkThread       :null       // 显示 Go Top 节点的线程变量 (用于 IE6)
    }
};

GoTop.prototype = {

    init: function(config) {
        this.config = config || this.config;
        var _self = this;

        // 滚动屏幕, 修改节点位置和显示状态
        jQuery(window).scroll(function() {
            _self._scrollScreen({_self:_self});
        });

        // 改变屏幕尺寸, 修改节点位置
        jQuery(window).resize(function() {
            _self._resizeWindow({_self:_self});
        });

        // 在页面中插入节点
        _self._insertNode({_self:_self});
    },

    /**
     * 在页面中插入节点
     */
    _insertNode: function(args) {
        var _self = args._self;

        // 插入节点并绑定节点事件, 当节点被点击, 用 0.4 秒的时间滚动到页面顶部
        var topLink = jQuery('<a id="' + _self.config.nodeId + '" href="#">' + _self.config.text + '</a>');
        topLink.click(function() {
            jQuery('html,body').animate({scrollTop: 0}, 400);
            return false;
        }).appendTo(jQuery('body'));

        // 节点到屏幕右边的距离
        var right = _self._getDistanceToBottom({_self:_self});

        // IE6 (不支持 position:fixed) 的样式
        if(/MSIE 6/i.test(navigator.userAgent)) {
            topLink.css({
                'display': 'none',
                'position': 'absolute',
                'right': right + 'px'
            });

        // 其他浏览器的样式
        } else {
            topLink.css({
                'display': 'none',
                'position': 'fixed',
                'right': right + 'px',
                'top': (jQuery(window).height() - _self.config.distanceToBottom) + 'px'
            });
        }
    },

    /**
     * 修改节点位置和显示状态
     */
    _scrollScreen: function(args) {
        var _self = args._self;

        // 当节点进入隐藏区域, 隐藏节点
        var topLink = jQuery('#' + _self.config.nodeId);
        if(jQuery(document).scrollTop() <= _self.config.hideRegionHeight) {
            clearTimeout(_self.cache.topLinkThread);
            topLink.hide();
            return;
        }

        // 在隐藏区域之外, IE6 中修改节点在页面中的位置, 并显示节点
        if(/MSIE 6/i.test(navigator.userAgent)) {
            clearTimeout(_self.cache.topLinkThread);
            topLink.hide();

            _self.cache.topLinkThread = setTimeout(function() {
                var top = jQuery(document).scrollTop() + jQuery(window).height() - _self.config.distanceToBottom;
                topLink.css({'top': top + 'px'}).fadeIn();
            }, 400);

        // 在隐藏区域之外, 其他浏览器显示节点
        } else {
            topLink.fadeIn();
        }
    },

    /**
     * 修改节点位置
     */
    _resizeWindow: function(args) {
        var _self = args._self;

        var topLink = jQuery('#' + _self.config.nodeId);

        // 节点到屏幕右边的距离
        var right = _self._getDistanceToBottom({_self:_self});

        // 节点到屏幕顶部的距离
        var top = jQuery(window).height() - _self.config.distanceToBottom;
        // IE6 中使用到页面顶部的距离取代
        if(/MSIE 6/i.test(navigator.userAgent)) {
            top += jQuery(document).scrollTop();
        }

        // 重定义节点位置
        topLink.css({
            'right': right + 'px',
            'top': top + 'px'
        });
    },

    /**
     * 获取节点到屏幕右边的距离
     */
    _getDistanceToBottom: function(args) {
        var _self = args._self;

        // 节点到屏幕右边的距离 = (屏幕宽度 - 页面宽度 + 1 "此处 1px 用于消除偏移" ) / 2 - 节点宽度 - 节点左边到页面右边的宽度 (20px), 如果到右边距离屏幕边界不小于 10px
        var right = parseInt((jQuery(window).width() - _self.config.pageWidth + 1)/2 - _self.config.nodeWidth - _self.config.distanceToPage, 10);
        if(right < 10) {
            right = 10;
        }

        return right;
    }
};
/* <![CDATA[ */
(new GoTop()).init({
pageWidth:'1000',
nodeId :'go-top',
nodeWidth :40,
distanceToBottom :100,
distanceToPage :20,
hideRegionHeight :10,
text :'Top'
});
/* ]]> */