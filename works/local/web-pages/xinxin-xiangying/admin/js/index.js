var navM = $('#navM'),
    headerNav = $('#header-nav'),
    header = $('.header').eq(0),
    headerGoBack = $('#goback'),
    navClose = $('#close');
var dialog = $('#dialog'),
    dialogBack = dialog.find('a'),
    dialogMes = dialog.find('span');
var goodsSure = $('#goods-sure');
var staffList = $('#staff-list');
var dialogDouble = $('#dialog-double'),
    doubleBack = dialogDouble.find('.btn-back'),
    doubleSure = dialogDouble.find('.btn-sure');

function staffSuccess(text, callback, time) {
    $('#dialog-success').text(text).fadeIn(time, function() {
        setTimeout(function() {
            $('#dialog-success').fadeOut(time, callback);
        },500);
    });
}

function staffGoBack() {
    $('.staff-erwei').addClass('staff-goback');    
}

// 阻止<a>的默认事件
function stopDefault(e) { 
   if ( e && e.preventDefault ) {
      e.preventDefault(); 
   } else { 
      window.event.returnValue = false;
   }  
}

$(function(){
    $('.on').on('click', function() {
        return false; // 阻止跳转
    });
    headerNav.on('click', function() {
        navM.fadeIn('fast');
        header.addClass('header-fixed');
        headerNav.addClass('open');
    });
    headerGoBack.on('click', function() {
        window.history.go(-1);
    });
    navClose.on('click', function() {
        header.removeClass('header-fixed');
        navM.fadeOut('fast');
        headerNav.removeClass('open');
    });
    goodsSure.on('click', function() {
        if (!$(this).hasClass('confirmed')) {
            dialogMes.text('核销商品成功');
            dialog.fadeIn('fast');
        }
    });
    dialogBack.on('click', function() {
        dialog.fadeOut('fast');
        goodsSure.addClass('confirmed');
    });
    staffList.on('click', 'button', function() {
        var that = $(this).parents('li');
        dialogDouble.fadeIn('fast');
        doubleSure.on('click', function() {
            dialogDouble.fadeOut('fast', staffSuccess('员工删除成功!'), null, 100);
            that.remove();
        });
    });
    doubleBack.on('click', function() {
        dialogDouble.fadeOut('fast');
    });
    // 扫码完成后添加的事件-临时效果
    $('#staff-erwei').on('click', function(){
        staffSuccess('员工绑定成功！', staffGoBack, 200);
    });
});