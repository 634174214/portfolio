var initPage = {
  setPublicImgList: function() {
     // 取消右边距
    $('.public-imglist li').each(function(index, item) {
      if((index + 1) % 3 === 0) {
        $(item).addClass('nomarleft');
      }
    });
  },
  setProgressBox: function() {
    $('.progress-box li:last').addClass('nobot');
  },
  setDownLoadList: function() {
    $('.download-list li').each(function(index, item) {
      if((index + 1) % 2 === 0) {
        $(item).addClass('nomargin');
      }
    });
  },
  setGoTop: function() {
    var gotop = $('<div id="go-top"></div>');
    $('body').append(gotop);
  },
  setPageAreaWidth: function(isPC) {
    if (!isPC) { return }
    var $wrap = $('.pages-area .pages-area-wrapper'),
        aWidth = 48, // 每个a的宽度
        amgLeft = 15, // 每个a距离左边的宽度
        aLens = $('.pages-area a').length,
        emLens = $('.pages-area em').length;
    var width =  (aLens + emLens) * aWidth + (aLens + emLens - 1) * amgLeft;
    $wrap.css('width', width);
  }
};

($(function() {
  $('#nav').on('click', 'a', function(e) {
     e.preventDefault();
     var url = '';
     switch($(this).text()) {
       case '首页':
        url = '1-主页.html';
        break;
        case '关于我们':
        url = '10-关于我们.html';
        break;
        case '我们关注的':
        url = '4-我们关注的.html';
        break;
        case '近期公益活动':
        url = '7-近期公益活动.html';
        break;
        case '最新动态':
        url = '2-最新资讯.html';
        break;
        case '表格下载':
        url = '11-表格下载.html';
        break;
     }
     window.location.href = url;
  });
})());


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

$(function(){
  var isPC = IsPC();
  var $payBox = $('#fadeInbox');
  var $bigImg = $('#bigimg .inner');
  var $swiperThumb = $('#swiper-thumb span');
  var indexSwiper = $('#swiper').swiper({
    autoplay: 5000,
    autoplayDisableOnInteraction : false,
    pagination : '.pagination',
    loop: true,
    //其他设置
    onSlideChangeEnd: function(swiper){
      // loop模式下真正的索引
      var index = swiper.activeLoopIndex;
      $swiperThumb.removeClass('active');
      $swiperThumb.eq(index).addClass('active');
    },
    // autoplay停止时
    onAutoplayStop: function(swiper){
      if(!swiper.support.transitions){ //IE7、IE8
        swiper.startAutoplay();
      }
    }
  });
  $swiperThumb.on('click', function() {
    var index = $(this).index();
    indexSwiper.swipeTo(index, 1000, false);
    $swiperThumb.removeClass('active');
    $swiperThumb.eq(index).addClass('active');
  });
  initPage.setPublicImgList();
  initPage.setProgressBox();
  initPage.setDownLoadList();
  initPage.setGoTop();
  initPage.setPageAreaWidth(isPC);
  // 项目活动报名 付款
  $('#dobtn').on('click', function() {
    var isShow = $payBox.is(':visible');
    if(isShow) { return false } 
    $payBox.fadeIn();
    return false;
  });

  $('.linkbtn').on('click', function() {
    // 这里获取对应二维码或者是其他方式 请自行决定
    var isShow = $payBox.is(':visible');
    if(isShow) { return false } 
    $payBox.fadeIn();
    return false;
  });

  $('.close', '#fadeInbox').on('click', function() {
    $('#fadeInbox').fadeOut();
  });
  // 项目进度 图片点击
  $('.close', '#bigimg').on('click', function() {
    $('#bigimg').fadeOut();
  });
  $('.imgshow').on('click', 'span', function() {
	  var thisImg = $('img' ,this);
      var src = thisImg.attr('data-pic');
      if (!src)
          src = thisImg.attr('src');
    $bigImg.attr('src', src);
    $('#bigimg').fadeIn();
  });
  // 返回顶部
  $('#go-top').on('click', function() {
    $('html,body').animate({scrollTop: 0});
  });
  // 返回上一页
  $('#goback').on('click', function() {
    window.history.back(-1); 
  });
  // about
  var aboutSwiperSpeed = isPC ? 1000 : 300;
  var aboutSwiper = $('#family-swiper').swiper({
    autoplay: false,
    calculateHeight : true,
    loop: false,
    pagination : '.about-pagination',
    speed: aboutSwiperSpeed
  });
  $('#about-family-goprev').on('click', function() {
    aboutSwiper.swipePrev();
  });
  $('#about-family-gonext').on('click', function() {
    aboutSwiper.swipeNext();
  });
  
});

