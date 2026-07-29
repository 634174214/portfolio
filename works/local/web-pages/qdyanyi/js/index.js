// nav pc
Navpc=function(){
     $('#navpc li').hover(function(){
                $('span',this).addClass('active');
                // $(this).find('span').addClass('active');
                 $('.second-menu',this).slideDown(200);
                // $(this).find('.second-menu').slideDown(200);
     },
         function(){
                 $('span',this).removeClass('active');
                 $('.second-menu',this).slideUp(100);
     });
}
// nav m
function Navm(){//切换导航选项
        var lispan=document.getElementById('touch-menu').getElementsByTagName('span'),
              Lis=document.getElementById('show-menu').getElementsByTagName('div'),
              showclose=document.getElementById('showclose');
        for(var i= 0,len =lispan.length;i<len;i++){
            lispan[i].index = i;
            lispan[i].onclick=function(){
                for(var n= 0;n<len;n++){
                    lispan[n].className = "";
                    Lis[n].className = "hide";
                    showclose.style.display='none';
                }
                this.className = "active";
                Lis[this.index].className = "animated fadeInDown";
                setTimeout(function(){
                      $('#showclose').fadeIn();
                },1000);
            };
         }
         $('#showclose').click(function(){
              $('#show-menu div').addClass('hide');
              $('#showclose').hide();
              $('#touch-menu span').removeClass('active');
         });
}
ShowMnav=function(){//显示手机菜单
        var btnSwith = 'closed';
        $('#menuClose').click(function(){
            if (btnSwith == 'closed') {
                     $('#menuPid').fadeIn();
                     $('#menuClose').addClass('nav-hamburger opened');
                     $('body').addClass('fixed');
                     btnSwith = 'opened';
            }else{
                     $('#menuPid').fadeOut();
                     $('#menuClose').removeClass('opened');
                      $('body').removeClass('fixed');
                     $('#show-menu div').addClass('hide');
                     $('#showclose').hide();
                     $('#touch-menu span').removeClass('active');
                     btnSwith = 'closed';
            }
        });
}

// 轮播
bl=function(){
    $('#slides').slidesjs({
      width:640,
        height:310,
      play: {
        active: true,
        auto: true,
        interval: 4000,
        swap: true
      }
    });   
}
// bl.js 209- height

// 侧边栏固定
fixedBar=function(){
    var wxin=($('#main').offset().left)-110;
    var wbo=($('#main').offset().left)+1010;
    $('.weixin').css('left',wxin);
    $('.weibo').css('left',wbo);
    $('.fixed-close').click(function(){
        $(this).parent().css('display','none');
    });
}
// 惠民院线选项卡
hovtabs=function(){
  $("#theater ul li").mouseover(function(){
          now=$(this).index();
          tab();
      });
  function tab(){
      $("#theater ul li").eq(now).addClass('on').siblings().removeClass('on');
      $("#theater ol li").eq(now).addClass('block').siblings().removeClass('block');
  }
}


/**
 * @update: 2012/11/05
 */

GoTop = function() {

  this.config = {
    pageWidth     :1000,    // 页面宽度
    nodeId        :'go-top',  // Go Top 节点的 ID
    nodeWidth     :40,    // Go Top 节点宽度
    distanceToBottom  :120,   // Go Top 节点上边到页面底部的距离
    distanceToPage    :20,    // Go Top 节点左边到页面右边的距离
    hideRegionHeight  :90,    // 隐藏节点区域的高度 (该区域从页面顶部开始)
    text        :''     // Go Top 的文本内容
  };

  this.cache = {
    topLinkThread   :null   // 显示 Go Top 节点的线程变量 (用于 IE6)
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
pageWidth :1000,
nodeId :'go-top',
nodeWidth :40,
distanceToBottom :120,
distanceToPage :20,
hideRegionHeight :100,
text :'Top'
});
/* ]]> */

/*
image scroll
*/
scrollImg=function(){
    var timer,
    area=$('.star-img-warp')[0];
    con1=$('#stara')[0],
    con2=$('#starb')[0],
    speed=20,
    j=-10;
    // 创建并 复制一个#starb
    var ulb=$('<ul id="starb"></ul>');
    $('.star-img-warp').append(ulb);
    $('#starb').html($('#stara').html());
    // 开启定时器
    timer=setInterval(piclist,speed);
    $('.star-img-warp').mouseenter(function(event){
                  event.stopPropagation();
                  clearInterval(timer);
    });
    $('.star-img-warp').mouseleave(function(event){
                 event.stopPropagation();
                 clearInterval(timer);
                 timer=setInterval(piclist,speed);
    });
    // 按下鼠标向右
    $('.og_next').click(function(){
               clearInterval(timer);
               $('.star-img-warp').scrollLeft(scrollright);
               timer=setInterval(piclist,speed);
    });
     /*$('.og_next').mouseleave(function(){//当鼠标悬停按钮时 不滚动
              clearInterval(timer);
              timer=setInterval(piclist,speed);
    });*/
     // 按下鼠标向左
     $('.og_prev').click(function(){
                clearInterval(timer);
                $('.star-img-warp').scrollLeft(scrollleft);
                timer=setInterval(piclist,speed);
     });
      /*$('.og_prev').mouseleave(function(){
              clearInterval(timer);
               timer=setInterval(piclist,speed);
     });*/
    // 定义滚动函数
    function piclist(){
                if (area.scrollLeft>=con1.offsetWidth) {
                                   area.scrollLeft=0;
                } else {
                                   area.scrollLeft++;
                }
    }
    // 向右滚动函数
    function scrollright(){
               if (area.scrollLeft<=0) {
                               $('.star-img-warp').scrollLeft(0);
                } else {
                               $('.star-img-warp').scrollLeft($('.star-img-warp').scrollLeft()-60);
                 }
    }
    // 向左滚动函数
    function scrollleft(){
               if (area.scrollLeft>=2000) {
                               $('.star-img-warp').scrollLeft(0);
                } else {
                               $('.star-img-warp').scrollLeft($('.star-img-warp').scrollLeft()+60);
                 }
    }

}

// 轮播手机版span bottom
slidesjsSpan=function(){
             var winW=$(window).width();
                     if (winW<=640) {
                           var imgH=$('#slides img').height();//轮播图片高度
                           var  LH=$('#slides').height();//轮播高度
                           var  spanBo=LH-imgH;
                           $('.slidesjs-control span').css('bottom',spanBo);
                           $('.slidesjs-pagination').css('bottom',spanBo+15);
                     }
                     
}










$(document).ready(function(){
    Navpc();Navm();ShowMnav();bl();fixedBar();hovtabs();scrollImg();   /*slidesjsSpan();*/
})