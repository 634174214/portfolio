let headerGoBack = $('#goback');
let goodsHeader = $('#goods-header');
let headerMenu = $('#header-menu');
let logo = headerGoBack.next();
let nav = $('#nav');
let mainImg = $('#imgbox img');
let nowScroll = 0, progress = 0, menuBtnState = 'closed';
const imgHeight = parseInt($('#imgbox').height());
let myPoints = parseInt($('#my-points cite').text()),
    goodsPoints = parseInt($('#goods-price').text());
// 判断积分
var pointsEnough = function () {
    if (myPoints < goodsPoints) {
        $('#buygoods').attr('class', 'buy-not');
        $('#buygoods').text('积分不足，无法兑换');
        return false;
    } else {
        if ($('#buygoods').hasClass('no-sales')) {
            return false;
        }
    }
};
var handle = function(event) {
    event.preventDefault(); //阻止元素发生默认的行为
};

$(function () {
    $('#content').css({
        'marginTop': imgHeight
    });
    pointsEnough(myPoints, goodsPoints); // 判断积分是否足够
    $('#buygoods').on('click', pointsEnough);
    // 历史记录返回
    headerGoBack.on('click', function() {
        window.history.go(-1);
    });
    // 菜单
    headerMenu.on('touchstart', function() {
        if (menuBtnState === 'closed') {
            $(this).addClass('opened');
            menuBtnState = 'opened';
            goodsHeader.addClass('mustshow');
            nav.fadeIn('fast');
            document.body.addEventListener('touchmove', handle, {passive: false});
        } else {
            $(this).removeClass('opened');
            menuBtnState = 'closed';
            goodsHeader.removeClass('mustshow');
            nav.fadeOut('fast');
            document.body.removeEventListener('touchmove', handle, {passive: false});
        }
    });
    $(window).on('scroll', function() {
         nowScroll = $(window).scrollTop();
         progress = Math.round((nowScroll/imgHeight) * 10) / 10;
         // console.log(progress);
         if (progress <= 1) {
            $('#content').addClass('shoadow');
            goodsHeader.css({
                'backgroundColor': 'rgba(234, 77, 70,'+ progress +')'
            });
            headerGoBack.css({
                'backgroundColor': 'rgba(0, 0, 0,'+ (0.8 - progress) +')'
            });
            headerMenu.css({
                'backgroundColor': 'rgba(0, 0, 0,'+ (0.8 - progress) +')'
            });
            logo.css({
                'opacity': progress
            });
            // 视差效果
            mainImg.css({
                'transform': 'translate(0, ' + -progress * 50 + 'px)'
            });
         } 
         // 加阴影
         if (nowScroll > 0) {
            $('#content').addClass('shoadow');
         } else {
            $('#content').removeClass('shoadow');
         } 
    });
});