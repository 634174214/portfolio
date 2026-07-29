var swiperMes = $('#swiper-mes'),
    swiperMesLi = $('#swiper-mes li'),
    previewSlideNum= null,
    cantouchMove = null,
    view = $('#view');
var preview = $('#preview'),
    previewSlide = preview.find('.swiper-slide');

if(swiperMesLi.eq(0).text() == ''){
   swiperMesLi.eq(0).hide();
} else {
   swiperMesLi.eq(0).show();
}

if (IsPC()) {
   cantouchMove = true;
} else {
   // previewSlideNum = 3;
   cantouchMove =false;
}


var viewSwiper = new Swiper('.view .swiper-container', {
   calculateHeight:true,
   onSlideChangeStart: function() {
      updateNavPosition();
      swiperLichange();
   }
});

$('.view .arrow-left,.preview .arrow-left').on('click', function(e) {
   e.preventDefault();
   if (viewSwiper.activeIndex == 0) {
      viewSwiper.swipeTo(viewSwiper.slides.length - 1, 1000);
      return;
   }
   viewSwiper.swipePrev();
});
$('.view .arrow-right,.preview .arrow-right').on('click', function(e) {
   e.preventDefault();
   if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
      viewSwiper.swipeTo(0, 1000);
      return;
   }
   viewSwiper.swipeNext();
});

var previewSwiper = new Swiper('.preview .swiper-container', {
   visibilityFullFit: true,
   slidesPerView: 'auto',
   onlyExternal: cantouchMove,
   // slidesPerView : previewSlideNum,
   onSlideClick: function() {
       previewSwiperGoNext();
      viewSwiper.swipeTo(previewSwiper.clickedSlideIndex);
   }
});

function updateNavPosition() {
      $('.preview .active-nav').removeClass('active-nav');
      var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav');
      if (!activeNav.hasClass('swiper-slide-visible')) {
         if (activeNav.index() > previewSwiper.activeIndex) {
            var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1;
            previewSwiper.swipeTo(activeNav.index() - thumbsPerNav);
         } else {
            previewSwiper.swipeTo(activeNav.index());
         }
      }
   }

function swiperLichange(){
   var thisIndex = viewSwiper.activeIndex;
   swiperMesLi.hide();
   if(swiperMesLi.eq(thisIndex).text() == ''){
      swiperMesLi.eq(thisIndex).hide();
   } else {
      swiperMesLi.eq(thisIndex).show();
   }
}

function previewSwiperGoNext(){
   // 当前点击preview的索引
   var previewIndex = previewSwiper.clickedSlideIndex;
   // 获取上一个焦点图的index
   var previewSlide_active = previewSlide.filter(".active-nav").index();
   if(previewIndex > previewSlide_active){
      previewSwiper.swipeNext(); 
   } else if(previewIndex < previewSlide_active){
      previewSwiper.swipePrev(); 
   }
   
}