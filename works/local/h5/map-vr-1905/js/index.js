var manifest = [
            "img/bird-1.png",
            "img/bird-3.png",
            "img/cy-1.png",
            "img/cy-2.png",
            "img/dialog-top.png",
            "img/food-cloud.png",
            "img/head-bg.png",
            "img/head-idea.png",
            "img/head-title-1.png",
            "img/head-title-2.png",
            "img/head-title-3.png",
            "img/head-title-4.png",
            "img/ls-1.png",
            "img/map-bg.png",
            "img/map-build-1.png",
            "img/map-build-2.png",
            "img/map-build-3.png",
            "img/map-build-4.png",
            "img/map-build-5.png",
            "img/map-build-6.png",
            "img/map-icon-cy.png",
            "img/map-icon-ls.png",
            "img/map-icon-sb.png",
            "img/map-icon-sn.png",
            "img/map-icon-xha.png",
            "img/map-point.png",
            "img/no-play1.png",
            "img/playing1.gif",
            "img/row-cloud.png",
            "img/run2.png",
            "img/say-1-1.png",
            "img/say-1-2.png",
            "img/say-1-3.png",
            "img/say-2-1.png",
            "img/say-2-2.png",
            "img/say-2-3.png",
            "img/say-bg.png",
            "img/say2-2.png",
            "img/sb-1.png",
            "img/sb-2.png",
            "img/sb-3.png",
            "img/share1.jpg",
            "img/sn-1.png",
            "img/sn-2.png",
            "img/sn-3.jpg",
            "img/sn-4.png",
            "img/title-1.png",
            "img/title-2.png",
            "img/vr-boat-1.png",
            "img/vr-boat-2.png",
            "img/vr-boat-3.png",
            "img/vr-boat-4.png",
            "img/vr-boat-5.png",
            "img/vr-diao.png",
            "img/vr-ocean.png",
            "img/vr-title-1.png",
            "img/vr-title-2.png",
            "img/xha-1.jpg"
];
// console.log(t_pic)
var dialog = $('#dialog'),
    dialogClose = $('#dialogclose'),
    dialogArticle = $('#dialog article');
// id:元素id class：要添加的animate动画样式 delay:动画延迟时间
var headerAni = [
    {'id':'head-title', 'class':'fadeInUp', 'delay':'0.1s'},
    {'id':'head-idea', 'class':'bounceIn', 'delay':'0.5s'}
];
var wow = new WOW().init();
var queue = new createjs.LoadQueue(true);
queue.on("progress", handleFileLoad);//加载进度 
queue.on("complete", handleComplete);//加载完成
queue.loadManifest(manifest);//加载的列表
function handleFileLoad(e){
    var bnum=parseInt(queue.progress*100);
    $("#loading i").html(bnum+"%");
    $("#loading cite").width(bnum+'%');
}
function handleComplete(){
     $("#loading").fadeOut('slow');
     addAniClass(animateEnded); // addAniClass函数执行完执行回调函数animateEnded判断动画是否执行完毕
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
 }

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
 function detect(){
        var equipmentType = "";
        var agent = navigator.userAgent.toLowerCase();
        var android = agent.indexOf("android");
        var iphone = agent.indexOf("iphone");
        var ipad = agent.indexOf("ipad");
        if(android != -1){
            equipmentType = "android";
        }
        if(iphone != -1 || ipad != -1){
            equipmentType = "ios";
        }
        return equipmentType;
}

$( 'audio' ).audioPlayer(); //启动插件
if (IsPC()) {
    $('html').addClass('isPC');
} else {
    rem(document, window);
    if (detect() == 'ios') {
       // setaudioplayerBar();
       $('.audioplayer-bar').css('width','73%');
    }
}

// 给顶部添加样式
function addAniClass(callback) {
  // alert('aa')
  $.each(headerAni,function(index,item){
    // console.log(item.id)
    $('#' + item.id).css({ //设置延迟时间
      'animation-delay': item.delay,
      '-webkit-animation-delay': item.delay
    });
    $('#' + item.id).addClass('animated ' + item.class);
    callback(item); // 回调函数执行animateEnded（）并传入headerAni的每个｛...｝
  });
}
// removeAttr移除多个属性('id class')
// 检测动画是否执行完毕 完毕删除添加的样式以及style
function animateEnded(obj) {
  // console.log(obj)
  // 这里注意多个样式如animated后面要有空格！！
  // WebkitAnmationEnd 和 animationed
  $('#' + obj.id).on('webkitAnimationEnd',function(){
     $(this).removeClass('animated ' + obj.class);
     $(this).removeAttr('style');
  });
}

function setaudioplayerBar() {
     var audio_w=$('.audioplayer').width();
     console.log(audio_w)
     var audio_bar = audio_w + 10;
     $('.audioplayer-bar').width(audio_bar);
     $('.audioplayer-time-duration').css('right',audio_w*0.04);
}
// setaudioplayerBar();

$('.audioplayer-playpause').click(function() {
   var index = $(this).index();
   console.log(index)
   $(this).siblings().find('.audioplayer-bar-played').addClass('audioplayer-bar-isplaying');
});

$('.readmore').on('click',function() {
  var myparent = $(this).parent();
  dialog.fadeIn('slow');
  return false;
});
dialogClose.on('click',function(){
  dialog.fadeOut('slow');
});

