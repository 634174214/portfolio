// 判断手机/PC
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
if (IsPC()){
   $('body').css('overflow','hidden').prepend('<div id="isPC"><div class="ispc"><img src="img/ispc.png"><p>扫描二维码，在手机上观看</p></div></div>');
}


// wowJS
function wowJS(){
      var wow = new WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 100,
          mobile: true,
          live: true
      });
      wow.init();
}

function rem(doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            };

          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
 };
 // ip5下1rem=20px
 rem(document, window);

 function set_screen(wrap){
   var s_height = document.body.clientHeight; 
   var s_width = document.body.clientWidth;
   var proportion = s_height/s_width;
  // console.log(s_height+'/'+ s_width);
   if(proportion<1.55){
       var max_warp = document.getElementById(wrap);
       max_warp.style.height = s_height/20+"10" + "rem";
   }
 }
 set_screen('p1_screen');

function mapjump(){
   var maptimer,
   i=0,
   map_li=$('#mapBtn li');
   maptimer=setInterval(function(){
       map_li.eq(i).addClass('mapjump');
       if(i<map_li.length){
         i++;
       }else{
          map_li.attr('class','');
          i=0;
       }
   },1000);
}

// 初始化
var audio_state='playing';
var winW=$(window).width();

// 微信分享配置
function wx_share(){
    var aDis = document.getElementsByName("description");
    var t_summary = "";
    if(aDis.length>0) {
        t_summary = aDis[0].content;
        t_summary = t_summary.substr(0,120);
    }
    var u_url = document.location.href ;
    var a_url = u_url.split('#');
    var s_url = a_url[0];
    if(typeof(t_url)=='undefined'||t_url=='') t_url = s_url ;
    if(typeof(t_title)=='undefined'||t_title=='') t_title = document.title ;
    if(typeof(t_summ)=='undefined'||t_summ=='') t_summ = t_summary ;
    if(typeof(t_pic)=='undefined'||t_pic=='') t_pic = "http://m.qdxin.cn/img/logofen170309.png";
    var a_hn = document.location.host.split('.qdxin.cn');
    var hn = a_hn[0];
    var getUrl = '';
    if(hn=='house'||hn=='vip'||hn=='biz') {
        getUrl = 'http://mp.qdxin.cn/yhxr/jssdk_vars_p.php';
    }
    else if(hn=='www'||hn=='m'||hn=='club') {
        getUrl = 'http://mp.qdxin.cn/qdxw/jssdk_vars_p.php';
    }
    else {
        getUrl = 'http://mp.qdxin.cn/xwcm/jssdk_vars_p.php';
    }
    var ua = navigator.userAgent ;
    if(ua.indexOf('MicroMessenger',10)>0) {
        wxShareData = {
            "title": t_title,
            "desc": t_summ,
            "link": t_url,
            "imgUrl": t_pic,
        };
        $.ajax({
            type: 'get',
            url: getUrl,
            data: {u:s_url},
            async:true,
            error: function(e){
                return false;
            },
            success: function(json){
                if(typeof(json)!='object'){
                    var json1 = JSON.parse(json);
                }
                else{
                    var json1 = json;
                }
                var json2 = { jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','previewImage','chooseImage','openLocation','getLocation','scanQRCode','hideMenuItems','showMenuItems','closeWindow'] };
                var wxcfg = $.extend({
                    debug: false,
                    appId: '',
                    timestamp: 1,
                    nonceStr: '',
                    signature: '',
                }, json1, json2);
                wx.config(wxcfg);
            }
        });
        wx.ready(function(){
            wx.onMenuShareAppMessage(wxShareData);
            wx.onMenuShareTimeline(wxShareData);
            wx.onMenuShareQQ(wxShareData);
            wx.onMenuShareWeibo(wxShareData);
            playsound();
        });
    } // End of if MicroMessenger
}

var manifest = [
   "img/p1_beer.png",
   "img/p1_footer.png",
   "img/p1_shan.png",
   "img/p1_title4.png",
   "img/p2_v1.jpg",
   "img/p2_v2.jpg",
   "img/script.png",
   {id:"bgm", src:"media/bg.mp3"},
   "img/script@2x.png",
   "img/yun1.png",
   "img/shareimg.png",
   "images/buy-lion.jpg",
   "images/buy-lida.jpg",
   "images/buy-liqun.jpg",
   "images/eat-hanguo.jpg",
   "images/eat-luzi.jpg",
   "images/eat-mingjia.jpg",
   "images/eat-sushi.png",
   "images/eat-tieguo.jpg",
   "images/le-jianke.jpg",
   "images/le-magic.jpg",
   "images/le-piaofu.jpg",
   "images/le-yaji.jpg",
   "images/le-zhaishe.jpg",
   "images/wen-bowu.jpg",
   "images/wen-jinshi.jpg",
   "images/wen-juyuan.jpg",
   "images/wen-rushi.jpg",
   "images/wen-tushuguan.jpg",
   "images/wen-yishuguan.jpg",
   "images/xing-ditie2.jpg",
   "images/xing-ditie11.jpg",
   "images/xing-donghai1.jpg",
   "images/xing-donghai2.jpg",
   "images/xing-haikou.jpg",
   "images/xing-hongkang1.jpg",
   "images/xing-hongkang2.jpg",
   "images/xing-laoyang2.jpg",
   "images/xing-liaoyang1.jpg",
   "images/xing-maidao1.jpg",
   "images/xing-maidao2.jpg",
   "images/xing-maidao3.jpg",
   "images/xing-miaoling1.jpg",
   "images/xing-miaoling2.jpg",
   "images/xing-shendong1.jpg",
   "images/xing-shendong2.jpg",
   "images/xing-shenxian.jpg",
   "images/xing-shenxiang.jpg",
   "images/xing-shenzhen.png",
   "images/xing-tongan1.jpg",
   "images/xing-tongan2.jpg",
   "images/xing-xianxia.jpg",
   "images/xing-yinchuan.jpg",
   "images/yj-beer1.jpg",
   "images/yj-beer2.jpg",
   "images/yj-beer3.jpg",
   "images/yj-beer4.jpg",
   "images/yj-beer5.jpg",
   "images/yj-beer6.jpg",
   "images/yj-beer7.jpg",
   "images/yj-beer8.jpg",
   "images/yj-city1.jpg",
   "images/yj-city2.jpg",
   "images/yj-city3.jpg",
   "images/yj-city4.jpg",
   "images/yj-city5.jpg",
   "images/yj-city6.jpg",
   "images/yj-city7.jpg",
   "images/yj-city8.jpg",
   "images/yj-city9.jpg",
   "images/yj-city10.jpg",
   "images/yj-jidi.jpg",
   "images/yj-laoren.jpg",
   "images/yj-laoshan.jpg",
   "images/yj-lida.jpg",
   "images/yj-lion.jpg",
   "images/yj-liqun.jpg",
   "images/you-diaosu.jpg",
   "images/you-jidi.jpg",
   "images/you-laoren.jpg",
   "images/you-laoshan.jpg",
   "images/you-penquan.jpg",
   "images/zhu-jiari.jpg",
   "images/zhu-lanhai.jpg",
   "images/zhu-lushang.jpg",
   "images/zhu-meisu.jpg",
   "images/zhu-piaosu.jpg",
   "images/zhu-suofeiya.jpg"
];
var queue = new createjs.LoadQueue(true);
queue.installPlugin(createjs.Sound);
queue.on("progress", handleFileLoad);
queue.on("complete", handleComplete);
queue.loadManifest(manifest);
var soundIntance=createjs.Sound.play('bgm');
function handleFileLoad(e){
    var bnum=parseInt(queue.progress*100);
    $('#loading p').html('等待加载也是一种人生...' +'<span>'+bnum+'<i>%</i>'+ '</span>');
}
function handleComplete(){
         $("#loading").fadeOut(400);
         mapjump();
         wx_share();
}
function playsound(){
    soundIntance.play({loop:-1});
    soundIntance.volume=0.3;
}
function pasuesound(){
    soundIntance.paused=true;
}
function goonplaysound(){
    soundIntance.paused = false;
}

function bgmcontrol(that){
    if (audio_state=='playing') {
          that.attr('class','off');
          pasuesound();
          audio_state='pasue';
    } else {
         that.attr('class','on');
         soundIntance.paused = false;
         goonplaysound();
         audio_state='playing';
    }
}
$('#audiobtn').on('click',function(){
     bgmcontrol($(this));
     return false;
});

// 建立点击联系
$('#p2_screen').css('left',winW);
$('#mapBtn li').on('click',function(){
  $('body').addClass('bodyblack');
    var btn_index=$(this).index();
    // console.log(btn_index);
    $('#cover').css('display','block');
    $('#close').css('display','block');
    $('#p2_screen section').eq(btn_index).show().find('.vis img').attr('style','visibility: hidden;');
    $('#p2_screen').show().animate({
         left:0
    },100,function(){
      $('#cover').css('display','none');
     wowJS();
    });
    return false;
});
// 分页关闭
$('#close').on('click',function(){
  $('body').removeClass('bodyblack');
  $('#cover').css('display','block');
  $(this).fadeOut();
  $('#p2_screen').stop().animate({left:winW},100,function(){
       $('#cover').css('display','none');
       $('#p2_screen').css('display','none');
  });
  $('#p2_screen section').hide();
  return false;
});






/**
 * @author: mg12 [http://www.neoease.com/]
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
/*
  (new GoTop()).init({
    pageWidth    :1000,
    nodeId      :'go-top',
    nodeWidth    :40,
    distanceToBottom  :120,
    distanceToPage  :20,
    hideRegionHeight  :130,
    text      :'Top'
  });*/
  /* ]]> */
