var manifest = [
             "img/arrow-down.png",
             "img/audiobtn.png",
             "img/icon-time.png",
             "img/iframe-close.png",
             "img/loading-desc-g.png",
             "img/loading-desc.png",
             "img/loading-title-1.png",
             "img/loading-title-2.png",
             "img/loading-title-g.png",
             "img/loading-title.png",
             "img/LOGO.png",
             "img/num-left.png",
             "img/num-right.png",
             "img/num-title-1.png",
             "img/num-title-2.png",
             "img/num-title-3.png",
             "img/num-title-4.png",
             "img/num-title-5.png",
             "img/num-title-6.png",
             "img/num-title-7.png",
             "img/page-1-title.png",
             "img/page-2-active.png",
             "img/page-2-bg.png",
             "img/page-2-bgbot.png",
             "img/page-2-gobtn.png",
             "img/page-2-numbg.png",
             "img/page-2-title.png",
             "img/page-2-top.png",
             "img/page-2-txtbg.png",
             "img/page1-bg.png",
             "img/page3-1-bg.png",
             "img/page3-banner.png",
             "img/page3-bot1.png",
             "img/page3-bot2.png",
             "img/page3-bot3.png",
             "img/page3-botbg.png",
             "img/page3-er1.png",
             "img/page3-er2.png",
             "img/page3-er3.png",
             "img/page3-er4.png",
             "img/page3-erboxbg.png",
             "img/page3-gps.png",
             "img/page3-logo.png",
             "img/page3-loubg.png",
             "img/page3-meeting.png",
             "img/page3-shizhang.png",
             "img/page3-top-1.png",
             "img/page3-topbg-all.png",
             "img/page3-zhan-a.png",
             "img/page3-zhan-b.png",
             "img/page3-zhan-c.png",
             "img/page3-zhan-e.png",
             "img/page3-zhan-f.png",
             "img/part_01.jpg",
             "img/part_02.jpg",
             "img/part_03.jpg",
             "img/part_04.jpg",
             "img/share.jpg"
];
let numTitle = $('#swiperNum-content img'),
    numText = $('#swiperNum-content .text');
let gpsSrc = 'https://apis.map.qq.com/tools/routeplan/eword=烟台国际博览中心&epointx=37.462817&epointy=121.469543&topbar=1&footdetail=0&trafficbutton=0&editstartbutton=1&positionbutton=1&zoombutton=1?referer=myH5&key=VFLBZ-IKEKU-SFAVG-24SSC-DLAOQ-WYB3T&back=1';
let titleOffsetTop = [];
let textColor = ['color-white', 'color-yellow', 'color-blue'];
let needScroll = true;
let NumContentData = [
    {
        'title': 'img/num-title-1.png',
        'text': '整合全球近30个国家和地区的设计组织、机构、企业以及院校，首次全面展示工业设计产业链、价值链、创新链，全面推动工业设计行业纵深发展。'
    },
    {
        'title': 'img/num-title-2.png',
        'text': '全球设计行业领军企业共同参与，分享设计产业前沿理念，探讨工业设计与产业融合D+X创新模式，围绕设计创业、科技与文化、设计与智能制造、设计振兴乡村等主题，开展深入交流合作。'
    },
    {
        'title': 'img/num-title-3.png',
        'text': '将举办100场设计与制造双向赋能对接会，汇聚技术、设计、制造、人才、资本、平台等创新要素与制造产业进行对接，促成多方合作，构建设计与产业融合发展的动能平台。'
    },
    {
        'title': 'img/num-title-4.png',
        'text': '国内外知名设计机构和独立设计师、创新型企业进行新品发布，创新设计惊艳亮相，彰显设计创新力量，引领产业创新风向，同时引导科技、品牌、商业、企业家精神等社会话题广泛传播。'
    },
    {
        'title': 'img/num-title-5.png',
        'text': '从创新链技术研发到创意链科研院所，从制造链骨干企业到创投链孵化与人才平台，覆盖设计全产业链的龙头骨干企业参展。'
    },
    {
        'title': 'img/num-title-6.png',
        'text': '国际设计组织（机构）、各省市工信主管部门和工业设计行业优秀设计企业代表参会，促进工业设计与经济社会发展深度融合，促进国家、地区间设计交流与合作。'
    },
    {
        'title': 'img/num-title-7.png',
        'text': '将会吸引来自全球创新领域的80000余名专业观众，促进工业设计及相关行业的信息交流，引领全球工业设计发展趋势。'
    }
];
var audio = $('#sound'),
    audiobtn =  $('#audiobtn'),
    isPlaying = false; 

var queue = new createjs.LoadQueue(true);
queue.on("progress", handleFileLoad);
queue.on("complete", handleComplete);
queue.loadManifest(manifest);
function handleFileLoad(e){
    var bnum=parseInt(queue.progress*100);
    $("#loading i").html(bnum+"%");
    $("#loading cite").width(bnum+'%');
}
function handleComplete(){ 
    $('#load').fadeOut('slow');
    $('#loadfade-in').show();
}

let setPageOneAni = function() {
    let duration = 0.5;
    let delay = 0.3;
    let h2_delay = 0.6;
    let li = $('#meeting-desc li');
    let h2 = $('#meeting-desc h2');
    let small = $('#meeting-desc small');
    let titleImg = $('#meeting-desc').next();
    $.each(li, function(index, item) {
        $(item).addClass('ani');
        h2.eq(index).addClass('ani');
        small.eq(index).addClass('ani');
        titleImg.addClass('ani');
        if (index === (li.length - 1)) {
            titleImg.attr({
                'swiper-animate-effect' : 'bounceIn',
                'swiper-animate-duration': duration + 0.3 + 's',
                'swiper-animate-delay': h2_delay + 0.1 + 's'
            });
        }
        if (index % 2 === 0) {
            $(item).attr('swiper-animate-effect', 'fadeInLeft');
        } else {
            $(item).attr('swiper-animate-effect', 'fadeInRight');
        }
        $(item).attr({
            'swiper-animate-duration': duration + 's',
            'swiper-animate-delay': delay + 's'
        });
        h2.eq(index).attr({
            'swiper-animate-effect' : 'fadeInLeft',
            'swiper-animate-duration': duration - 0.2 + 's',
            'swiper-animate-delay': h2_delay + 's'
        });
        small.eq(index).attr({
            'swiper-animate-effect' : 'fadeInRight',
            'swiper-animate-duration': duration - 0.1 + 's',
            'swiper-animate-delay': h2_delay + 's'
        });
        delay += 0.2;
        h2_delay += 0.2;
    });
};

let getTitleTop = function() {
    if (titleOffsetTop.length <= 0) {
        let winH = $(window).height();
        titleOffsetTop.push(0);
        $('.rowtitle').each(function(index, item) {
            if (index > 0) {
                let offsetTop = $(item).offset().top;
                offsetTop = Math.floor(offsetTop - winH/2);
                titleOffsetTop.push(offsetTop);
            }
        });
        console.log(titleOffsetTop);
    }
};

let countChange = function(query) {
    let numEl = $(query).find('em');
    let num = Number(numEl.text());
    let start, speed, refreshInterval;
    switch(true) {
      case num < 10:
        start = 0;
        speed = 500;
        refreshInterval = 100;
        break;
      case num < 100 && num > 10:
        start = Math.floor(Math.random() * 5);
        speed = 600;
        refreshInterval = 20;
        break;
      case num <= 999 && num >= 100:
        start = Math.floor(Math.random() * 10);
        speed = 1100;
        refreshInterval = 50;
        break;
      case num >= 1000:
        start = Math.floor(Math.random() * 100);
        speed = 1200;
        refreshInterval = 50;
        break; 
          
    }
    numEl.countTo({
        lastSymbol: '', 
        from: start,  
        speed: speed,  
        refreshInterval:refreshInterval,  
        beforeSize:0, 
        decimals: 0, 
        onUpdate: function() {
        },  
        onComplete: function() {
            for(i in arguments){
                //console.log(arguments[i]);
            }
        }
    });
};

let colorIndex = 0;
var swiperNum = new Swiper('#swiperNum', {
  slidesPerView: 3,
  height: 300,
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  on:{
    init: function() {
      this.colorIndex = 0;
    },
    slideChangeTransitionStart: function() {
      let nowIndex = this.activeIndex;
      let activeEl = this.slides.eq(nowIndex)[0];
      countChange(activeEl);
    },
    slideChangeTransitionEnd: function() {
        let nowIndex = this.realIndex;
        numTitle.attr('src', NumContentData[nowIndex].title);
        numText.text(NumContentData[nowIndex].text);
        // 循环更换text颜色
        if (colorIndex > (textColor.length - 1)) {
          colorIndex = 0;
        }
        let cls = 'text ' + textColor[colorIndex];
        numText.attr('class', cls);
        colorIndex++;
    }
  },
});
let swiperBox = new Swiper('#swiperBox',{
    direction: 'vertical',
    mousewheelControl: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
    },
    on:{
      init: function(){
        var swiper = this;
        swiper.myIndex = 0;
        swiperAnimateCache(this); 
        this.emit('slideChangeTransitionEnd');
      }, 
      progress: function(progress){
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide=swiper.slides.eq(i);
            var progress = swiper.slides[i].progress;
            var translate, boxShadow;
            translate = progress * swiper.height * 0.8;
            scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
            if (i == swiper.myIndex) {
                slide.transform('translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')');
                slide.css({'z-index':0,'boxShadow':'0px 0px 10px rgba(0,0,0,.5)'});
            }
        }
      }, 
      transitionEnd: function(){
            var swiper = this;
            swiper.myIndex = swiper.activeIndex;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide=swiper.slides.eq(i);
                slide.transform('');
                slide.css('z-index',1);
            }
            swiper.mousewheel.enable();
      },
      setTransition: function(speed){
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide=swiper.slides.eq(i);
                slide.transition(speed + 'ms');
            }
            swiper.mousewheel.disable();
      },
      slideChangeTransitionEnd: function(){ 
        if (this.activeIndex === (this.slides.length - 1)) {
            $('.swiperBox-next').hide();
        } else {
            $('.swiperBox-next').show();
        }
        swiperAnimate(this); 
      } 
    }
});
AOS.init({
    easing: 'ease-out-back',
    duration: 600,
    startEvent: 'click'
});

function debounce(cb, waitTime, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) cb.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, waitTime);
        if (callNow) cb.apply(context, args);
    };
};
let scrollLink = debounce(function() {
    if (needScroll) {
        let scrollY = Math.floor($(window).scrollTop());
        let i = 0;
        $.each(titleOffsetTop, function(index, item) {
            let height1 = item;
            let height2 = titleOffsetTop[index + 1];
            if ((scrollY >= height1 && scrollY < (height2 - 0))) {
                console.log('gun:' + scrollY);
                console.log(height1,height2);
                console.log('index:' + index);
                i = index;
            }
            if (scrollY > (height2 - 0)) {
                i = titleOffsetTop.length - 1;
            }
        });
        console.log(i)
        $('#stairs li').removeClass('active');
        $('#stairs li').eq(i).addClass('active');
    }
}, 0);
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

$(function(){
    $('#loading-title2').on('webkitAnimationEnd', function(){
        if ($(this).hasClass('bounceIn')) {
          $(this).attr('class', 'animated pulse infinite logo-title');
        }
    });
    $('#swiperNum-main').on('webkitAnimationEnd', function(){
        let nowIndex = swiperNum.activeIndex;
        let activeEl = swiperNum.slides.eq(nowIndex)[0];
        countChange(activeEl);
    });
    setPageOneAni();
    $('#loadfade-in').on('click', function() {
        $('#loading').fadeOut();
        swiperBox.emit('slideChangeTransitionEnd');
    });
    $('#swiperNum-prev').on('click', function() {
        swiperNum.slidePrev();
    });
    $('#swiperNum-next').on('click', function() {
        swiperNum.slideNext();
    });
    $('#gothreeBtn').on('click', function() {
        $('#swiper').removeClass('page2In');
        $('#swiper').addClass('page2out');
        $('#meeting-info').fadeIn('slow');
        $('#page3-first-ani').addClass('p3firstAni');
        setTimeout(function() {
            getTitleTop();
            $('#menu').fadeIn();
            $('#swiper').addClass('hide');
        }, 600);
    });
    // 返回H5
    $('#backH5').on('click', function() {
        $('#menu').hide();
        $('#swiper').removeClass('page2out hide');
        $('#swiper').addClass('page2In');
        $('#meeting-info').fadeOut();
        swiperBox.slideTo(0);
        swiperBox.emit('slideChangeTransitionEnd');
        $('#page3-first-ani').removeClass('p3firstAni');
    });
    $('#swiper').on('webkitAnimationEnd', function() {
        $(this).attr('class', 'swiperBox-wrapper');
    });
    $('#stairs-control').on('click', function() {
        let $this = $(this);
        $('#stairs').slideToggle('fast', function(){
            if ($('#stairs').is(':visible')) {
                $this.addClass('close');
            } else {
                $this.removeClass('close');
            }
        });
    });
    $('#stairs').on('click', 'li', function() {
        let index = $(this).index();
        $('html,body').animate({
            scrollTop: titleOffsetTop[index]
       }, 1000);
    });
    $(window).on('scroll', scrollLink);
    audioControl();
});

document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        network = e.err_msg.split(":")[1];  
        playAudio(); 
        isPlaying ? audiobtn.attr('class', 'on') : audiobtn.attr('class', 'off');
    });
}, false);