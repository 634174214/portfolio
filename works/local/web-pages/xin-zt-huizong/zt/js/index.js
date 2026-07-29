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
var isPc = IsPC();

// 手机版菜单
$(function() {
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
});

// 轮播
$(function() {
    if($('#focus-slide').length <= 0) {
        return;
    }
    var FocusSwiper = new Swiper('#focus-slide',{
        pagination: '.pagination',
        loop:true,
        autoplay : 5000,
        updateOnImagesReady : true,
        grabCursor: true,
        paginationClickable: true
      })
    $('#focus-slide-left').on('click', function(e){
        e.preventDefault()
        FocusSwiper.swipePrev();
    });
    $('#focus-slide-right').on('click', function(e){
        e.preventDefault();
        FocusSwiper.swipeNext();
    });
});

// 日历
$(function() {
    if(typeof datePanelData == 'undefined') {
        return;
    }
    function setActiveContent(year, month, text) {
        var $monthEl = $('#focus-date-ymonth > strong');
        var $yearEl = $('#focus-date-ymonth > em');
        var $pEl = $('#focus-date-textp');
        $monthEl.text(month);
        $yearEl.text(year);
        $pEl.text(text);
    }
    function getDatePanelData(index) {
        var item = datePanelData[index];
        var dateArr = item.date.split('-');
        var obj = {
            year: dateArr[0],
            month: dateArr[1],
            day: dateArr[2],
            text: item.text
        }
        return obj;
    }

    var slideEles = '';

    // 初始化内容
    var firstDateObj = getDatePanelData(0);
    setActiveContent(firstDateObj.year, firstDateObj.month, firstDateObj.text);

    $.each(datePanelData, function(index, item) {
        console.log(index)
        var dateObj = getDatePanelData(index);
        var day = dateObj.day;
        var slideEle = '';
        
        if(index == 0) {
            slideEle = '<div class="swiper-slide active" data-index="' + index + '"><em>' + day + '</em></div>';
        } else {
            slideEle = '<div class="swiper-slide" data-index="' + index + '"><em>' + day + '</em></div>';
        }
        slideEles += slideEle;
    });
    $('#focus-date-wrapper').append($(slideEles));
    

    var focusDateSwiper = new Swiper('#focus-date-swiper',{
        paginationClickable: true,
        slidesPerView: 5,
        loop: true
    });
    $('#date-slide-left').on('click', function(e){
        e.preventDefault()
        focusDateSwiper.swipePrev();
    });
    $('#date-slide-right').on('click', function(e){
        e.preventDefault();
        focusDateSwiper.swipeNext();
    });
    $('#focus-date-swiper').on('click', '.swiper-slide', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var index = $(this).data('index');
        var dateObj = getDatePanelData(index);
        setActiveContent(dateObj.year, dateObj.month, dateObj.text);
        // console.log(index)
    });
});

// 卡片轮播展示
$(function() {
    if($('#cards-swiper').length <= 0) {
        return;
    }
    var cardsSwiper = new Swiper('#cards-swiper',{
        slidesPerView: isPc ? 4 : 2,
        updateOnImagesReady : true,
        loop: true
    });
    $('#card-arrow-left').on('click', function(e){
        e.preventDefault()
        cardsSwiper.swipePrev();
    });
    $('#card-arrow-right').on('click', function(e){
        e.preventDefault();
        cardsSwiper.swipeNext();
    });
});

// 手风琴
$(function () {
    if($('#acc').length <= 0) {
        return;
    }
    if(isPc) {
        // 展开后li的宽度
        var showWidth = 500;
        // 标题的宽度
        var h3Width = 60;
        var aniTime = 400;
        //鼠标移到当前li上，当前li的宽度变成434px,li里的h3要添加一个类名active让背景变红，文字变白
        $("#acc")
        .find("li")
        .click(function () {
            $(this)
            .stop()
            .animate({ width: showWidth + 'px' }, aniTime)
            .siblings() //当前li的所有兄弟li
            .stop()
            .animate({ width: h3Width + 'px' }, aniTime)
            .children("h3")
            .removeClass("active");
        });
    } else {
        $("#acc").on('click', 'li', function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });
    }
    
});

// 全屏轮播
$(function() {
    var fullscreenSwiper = null;
    if($('#fullscreen-swiper').length <= 0) {
        return;
    }
    if(isPc) {
        fullscreenSwiper = new Swiper('#fullscreen-swiper',{
            paginationClickable: true,
            // centeredSlides: true,
            slidesPerView:  3,
            loop: true,
            watchActiveIndex: true,
            updateOnImagesReady : true,
            noSwiping : true,
            autoplay: 4000,
            autoplayDisableOnInteraction : false,
            onSlideChangeStart: function(swiper){
                // 由于从左侧开始 焦点集中在中间 所以始终要+1
                var activeIndex = swiper.activeIndex + 1;
                var $slides = $('#fullscreen-swiper').find('.swiper-slide');
                var $slideAct = $($slides[activeIndex]);
                console.log($slides[activeIndex])
                var imgsrc = $slideAct.find('img').attr('src');
                var href = $slideAct.find('.inner').attr('href');
                var ptext = $slideAct.find('p').text();
                $('#fullscreen-bigger-img').attr('src', imgsrc);
                $('#fullscreen-bigger-href').attr('href', href);
                $('#fullscreen-bigger-p').text(ptext);
            }
        });
    } else {
        fullscreenSwiper = new Swiper('#fullscreen-swiper',{
            paginationClickable: true,
            // centeredSlides: true,
            loop: true,
            watchActiveIndex: true,
            updateOnImagesReady : true,
            noSwiping : false,
            autoplay: 4000,
            autoplayDisableOnInteraction : false,
            onSlideChangeStart: function(swiper){
                // 由于从左侧开始 焦点集中在中间 所以始终要+1
                var activeIndex = swiper.activeIndex + 1;
                var $slides = $('#fullscreen-swiper').find('.swiper-slide');
                var $slideAct = $($slides[activeIndex]);
                console.log($slides[activeIndex])
                var imgsrc = $slideAct.find('img').attr('src');
                var href = $slideAct.find('.inner').attr('href');
                var ptext = $slideAct.find('p').text();
                $('#fullscreen-bigger-img').attr('src', imgsrc);
                $('#fullscreen-bigger-href').attr('href', href);
                $('#fullscreen-bigger-p').text(ptext);
            }
        });
    }
    
    $('#fullscreen-arrow-left').on('click', function(e){
        e.preventDefault()
        fullscreenSwiper.swipePrev();
    });
    $('#fullscreen-arrow-right').on('click', function(e){
        e.preventDefault();
        fullscreenSwiper.swipeNext();
    });
});

// 生成导航
$(function() {
    var $allParts = $(".part");
    var headerNav = '';
    var headerId = 'part-';
    $allParts.each(function(index, item) {
        var navtitle = $(item).data('navtitle');
        var navId = headerId + index;
        if(navtitle) {
            var hli = '<li><a href="#' + navId + '">' + navtitle + '</a></li>';
            $(item).attr('id', navId);
            headerNav += hli;
        }
    });
    $('#header-nav-ul').append($(headerNav));
});

// 导航
$(function() {  
    $('#header-nav-ul').on('click', 'a', function() {
        var id = $(this).attr('href');
        $.scrollTo(id, 500);
        return false;
    });
});

// 返回顶部
$(function() {
    $("#go-top").click(function(){   
        $.scrollTo('#header-banner', 500);  
        return false; 
    });   
});

// header-nav滚动固定
$(function() {
    var $headerNav = $('#header-nav');
    var $headerMBtn = $('#header-nav-button');
    var headerTop = $headerNav.offset().top;
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();

        if($headerNav.hasClass('fixed') &&
            scrollTop > headerTop
        ) {
            return;
        }

        if(isPc) {
            if(!$headerNav.hasClass('fixed') &&
                scrollTop > headerTop
            ) {
                $headerNav.addClass('fixed');
            } else {
                $headerNav.removeClass('fixed');
            }
        } else {
            if(!$headerNav.hasClass('fixed') &&
                scrollTop > headerTop
            ) {
                $headerMBtn.addClass('show');
            } else {
                $headerMBtn.removeClass('show');
            }

            $headerMBtn.on('click', function() {
                $headerNav.addClass('fixed');
            });
            $('#header-nav-close').on('click', function() {
                $headerNav.removeClass('fixed');
            });
        } 
        
    });
    
});