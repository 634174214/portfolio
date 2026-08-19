'use strict';

var mySwiper, swiper2;

function initApp() {
    // console.log('123');
    $('.app').fadeIn();
    mySwiper = new Swiper('.app', {
        direction: 'vertical', // 垂直切换选项
        // loop: true, // 循环模式选项
        pagination: {
            el: '.main-swiper-pagination',
            clickable: true,
            currentClass: 'my-pagination-current',
            bulletActiveClass: 'my-bullet-active'
        },
        on: {
            init: function init() {
                swiperAnimateCache(this); //隐藏动画元素 
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function slideChangeTransitionEnd() {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                // this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); //动画只展现一次，去除ani类名
            }
        }
    });
    swiper2 = new Swiper('.app2', {
        slidesOffsetAfter: 200,
        // slidesOffsetBefore : 100,
        //   slidesPerView: 'auto',
        //   spaceBetween: 30,
        loop: true, // 循环模式选项
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            currentClass: 'my-pagination-current',
            bulletActiveClass: 'my-bullet-active'
        }
    });
}
$(document).ready(function () {
    // 音乐播放
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
            playMusic();
        }, false);
    } else {
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
                playMusic();
            });
        }, false);
    }
});
var musicStatus = false;

function playMusic() {
    var player = $('#bgMusic')[0];
    musicStatus = !musicStatus;
    // console.log(player);

    if (musicStatus == false) {
        player.pause();
        $('#music').removeClass('xuanzhuan');
    } else {
        player.play();
        $('#music').addClass('xuanzhuan');
    }
}

$('#home_btn').on('click', function () {
    mySwiper.slideNext();
});
$(function () {
    new sanSong();
});
$("#showWritePage").on('click', function () {
    $("#write-song").fadeIn();
    $('.app').fadeOut();
});

$(function () {
    var hideCallback = function hideCallback() {
        $('.pace').hide();
        initApp();
        window.paceInterval && window.clearInterval(window.paceInterval);
    };
    window.paceInterval = setInterval(function () {
        var progress = $('.pace-progress').attr('data-progress');
        if (parseInt(progress) >= 98) {
            hideCallback();
        }
    }, 300);
});