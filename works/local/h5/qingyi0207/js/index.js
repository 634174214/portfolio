var manifest = [
    "img/audiobtn.png",
    "img/btn_next.png",
    "img/desc-bg.png",
    "img/loading-title.png",
    "img/loading-title1.png",
    "img/man-1.jpg",
    "img/man-10.jpg",
    "img/man-2.jpg",
    "img/man-3.jpg",
    "img/man-4.jpg",
    "img/man-5.jpg",
    "img/man-6.jpg",
    "img/man-7.jpg",
    "img/man-8.jpg",
    "img/man-9.jpg",
    "img/title-1.png",
    "img/title-2.png",
    "img/title-3.png",
    "img/xuanyan.png",
    "img/qrcode.png",
    "img/share.jpg",
    "img/win-1.png",
    "img/win-2.png"
];
var topTpl = `
<div class="top-wrapper">
    <div class="name">青岛大学附属医院</div>
    <div class="title">
        <img src="img/title-1.png" 
        alt="白衣仗剑" 
        class="title-left ani" swiper-animate-effect="fadeInLeft"
        swiper-animate-duration="0.5s"
        >
        <img src="img/title-2.png" 
        alt="此生不换" 
        class="title-right ani"
        swiper-animate-effect="fadeInRight"
        swiper-animate-duration="0.6s"
        swiper-animate-delay="0.2s"
        >
    </div>
    <div class="desc ani"
        swiper-animate-effect="bounceIn"
        swiper-animate-duration="0.5s"
        swiper-animate-delay="0.3s"
    >
        <img src="img/xuanyan.png" alt="我们已做好准备，听候党和人民的召唤，义无反顾，勇往直前，驰援湖北，攻坚克难，战胜新型冠状病毒肺炎疫情，向人民交上满意的答卷。">
    </div>
</div>
`;
$('.inner').prepend($(topTpl));
var audio = $('#sound'),
    audiobtn =  $('#audiobtn'),
    isPlaying = false;
var nextbtn = $('.swiper-button-next');
function playAudio() {
    if (audio.attr('src') == undefined) {
        audio.attr('src', audio.data('src'));
    }
    isPlaying = true;
    // alert(isPlaying)
    audio[0].play();
    return isPlaying;
}
function audioControl(){
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

var queue = new createjs.LoadQueue(true);
queue.on("progress", handleFileLoad);
queue.on("complete", handleComplete);
queue.loadManifest(manifest);
function handleFileLoad(e){
    var bnum=parseInt(queue.progress * 100);
    $("#loading i").html(bnum + "%");
    $("#loading cite").width(bnum + '%');
}
function handleComplete(){ 
    audioControl();
    $("#loading").fadeOut('slow');
    // 启动动画
    swiperAnimate(mySwiper)
}

let mySwiper = new Swiper('#container', {
    direction: 'vertical', 
    loop: false,
    height : window.innerHeight,
    navigation: {//箭头
        nextEl: '.swiper-button-next',
    },
    on:{
      init: function(){
        swiperAnimateCache(this); 
        // swiperAnimate(this);  //初始化完成开始动画
      }, 
      slideChangeTransitionStart: function() {
        switch (this.activeIndex) {
           case this.slides.length - 1: //最后一个
              nextbtn.hide();
              break;
           default:
              nextbtn.show();
        }
     },
      slideChangeTransitionEnd: function(){ 
        swiperAnimate(this);
      }
    }
});
// console.log(mySwiper)

$('#replay').on('click', function() {
    // 第三个参数是执行完的回调函数
    mySwiper.slideTo(0, 0, function() {
        swiperAnimate(mySwiper)
    });//切换到第一个slide，速度为1秒
});

document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        network = e.err_msg.split(":")[1];  //结果在这里
        playAudio(); // 开启音乐播放 返回true则给audiobtn添加on
        isPlaying ? audiobtn.attr('class', 'on') : audiobtn.attr('class', 'off');
    });
}, false);