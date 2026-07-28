var manifest = [
           "img/1-1.jpg",
           "img/1-2.jpg",
           "img/10-1.jpg",
           "img/10-2.jpg",
           "img/2-1.jpg",
           "img/2-2.jpg",
           "img/3-1.jpg",
           "img/3-2.jpg",
           "img/4-1.jpg",
           "img/4-2.jpg",
           "img/5-1.jpg",
           "img/5-2.jpg",
           "img/6-1.jpg",
           "img/6-2.jpg",
           "img/7-1.jpg",
           "img/7-2.jpg",
           "img/8-1.jpg",
           "img/8-2.jpg",
           "img/9-1.jpg",
           "img/9-2.jpg",
           "img/audiobtn.png",
           "img/bg-body.png",
           "img/bg-city.png",
           "img/bg-cloud.png",
           "img/bg-last-bottom.png",
           "img/bg-top.png",
           "img/bird-1.png",
           "img/bird-2.png",
           "img/boat-1.png",
           "img/boat-2.png",
           "img/btn-goto.png",
           "img/btn_next.png",
           "img/compare-new.png",
           "img/compare-old.png",
           "img/compare.png",
           "img/content-1-new.png",
           "img/content-1-old.png",
           "img/content-2-new.png",
           "img/content-2-old.png",
           "img/content-3-new.png",
           "img/content-3-old.png",
           "img/light.png",
           "img/last-title.png",
           "img/loading.png",
           "img/pic2-2.png",
           "img/share.jpg",
           "img/small-1.png",
           "img/small-2.png",
           "img/small-3.png",
           "img/title-1.png",
           "img/title-2.png",
           "img/title-3.png",
           "img/title-4.png"
];
var firstLeft = null; // 定义分割线的位置
var firstclip = null; // 定义左边图片分割的位置
var twentyState = 'false';
var draggerBarflag = 'show';
var draggerBar = $('#draggerBar');
var audio = $('#sound'),
    audiobtn =  $('#audiobtn'),
    isPlaying = false; 
var showTitleBox = $('<div class="showTitleBox out">介绍</div>');
$('.titlebox').after(showTitleBox);
var article = $('#article')[0];
var docH = $(window).height();
var nextbtn = $('.swiper-button-next');
var queue = new createjs.LoadQueue(true); 
/* global end */

// 加载完成
function handleFileLoad(e){ 
    var bnum=parseInt(queue.progress*100);
    $("#loading i").html(bnum+"%");
    $("#loading cite").width(bnum+'%');
}
function handleComplete(){ 
     $("#loading").fadeOut('slow');
     var wow = new WOW().init();
     audioControl();
}
// 初始化myswiper
var mySwiper = new Swiper ('.swiper-container', {
  direction: 'vertical', 
  loop: false, 
  height : window.innerHeight,
  navigation: {//箭头
        nextEl: '.swiper-button-next',
  },
  on:{
        init: function() {
          swiperAnimateCache(this); 
          swiperAnimate(this);  
        }, 
        slideChangeTransitionStart: function() {
               switch (this.activeIndex) {
                  case 0: 
                     draggerBar.show();
                     break;
                  case this.slides.length - 1: 
                     nextbtn.hide();
                     break;
                  default:
                     draggerBar.hide();
                     nextbtn.show();
               }
        },
        slideChangeTransitionEnd: function() { 
          swiperAnimate(this); 
          twentytwentyGOInit(this.previousIndex);
        },
        reachEnd: function() { 
          console.log('last');
        }
  }
});
function twentytwentyFirst() {
  if (twentyState == 'false') { 
      $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
      firstLeft =  parseInt($('.twentytwenty-handle').eq(0).css('left'));
      firstclip = $('.twentytwenty-before').eq(0).css('clip');
      twentyState = 'true'; 
      return firstLeft, firstclip, twentyState;
  }
}

//每次滑动上一页的动画重置
function twentytwentyGOInit(preIndex){
  if (preIndex != mySwiper.slides.length - 1) {
      $('.twentytwenty-handle').eq(preIndex).css('left',firstLeft);
      $('.twentytwenty-before').eq(preIndex).css('clip',firstclip);
      $('.showTitleBox').eq(preIndex).attr('class', 'showTitleBox out');
  }
}

function gotoTop(dotime, callback){
  $('html , body').animate({scrollTop: 0}, dotime);
  callback();
}

function draggerBarHidden(){
   if (draggerBarflag = 'show') {
      draggerBar.fadeOut(400);
      draggerBarflag = 'off';
   } 
   return draggerBarflag;
}
// 音频状态判断播放
function playAudio() {
    if (audio.attr('src') == undefined) {
        audio.attr('src', audio.data('src'));
    }
    isPlaying = true;
    // alert(isPlaying)
    audio[0].play();
    return isPlaying;
}
// 音频控制
function audioControl() {
     $('#audiobtn').click(function(){
         if ($('#audiobtn').attr('class')=='on') {
            $('#audiobtn').attr('class','off');
            audio[0].pause();
            isPlaying = false;
         } else {
            $('#audiobtn').attr('class','on');
            audio[0].play();
            isPlaying = true;
         }
     });
}
function resetWOW() {
   var allWow = $('.wow');
   allWow.each(function(index, item) {
      $(item).removeClass('animated');
      $(item).removeAttr('style');
   });
   var wow = new WOW().init();
}
document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        network = e.err_msg.split(":")[1];  //结果在这里
        playAudio(); // 开启音乐播放 返回true则给audiobtn添加on
        isPlaying ? audiobtn.attr('class', 'on') : audiobtn.attr('class', 'off');
    });
}, false);

$(function(){
  queue.on("progress", handleFileLoad);
  queue.on("complete", handleComplete);
  queue.loadManifest(manifest);
  // 显示swiper
  $('#gotobtn').on('touchend', function() {
    $('#main').removeClass('hide');
    twentytwentyFirst();
    swiperAnimateCache(mySwiper); 
    swiperAnimate(mySwiper); 
    draggerBar.show(); 
    nextbtn.show();
    TweenMax.fromTo('article', 0.5, {scale:1, opacity:1}, {
      scale: 0.9,
      opacity: 0,
      onCompleteScope: article
    });
    TweenMax.fromTo('#main', 0.5, {y: docH}, {y: 0});
    $('.twentytwenty-handle').on('touchstart', function() {
        var showbox =  $(this).parents('.row').siblings('.showTitleBox');
        var titlebox = $(this).parents('.row').siblings('.titlebox');
        if (titlebox.is(':visible')) { 
           draggerBarHidden();
           titlebox.removeClass('animated'); 
           titlebox.fadeOut(600,function() { 
             showbox.attr('class','showTitleBox in');
           });
        }
        showbox.on('touchstart', function() {
          titlebox.addClass('animated').show();
          showbox.attr('class','showTitleBox out');
       });
    });
  });
  // 重新播放
  $('#replay').on('click', function(){
    gotoTop(100,resetWOW); 
    mySwiper.slideTo(0, 0, false); 
    TweenMax.fromTo('article', 0.6, {scale: 0.9, opacity: 0}, {scale: 1, opacity: 1});
    TweenMax.fromTo('#main', 0.6, {y: 0}, {y: docH});
  });
});
// $function end