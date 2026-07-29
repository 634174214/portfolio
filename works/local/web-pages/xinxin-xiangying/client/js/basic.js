var headerGoBack = $('#goback');
var menuBtn = $('#header-menu');
var menuBtnState = 'closed';
var nav = $('#nav');
var addressList = $('#address-list');
var addressNone = $('<p>请添加一个新的收货地址</p>');
var addressChoose = $('#address-choose');
// 给每个label和Input添加关联id
var all_label = $('#address-choose label');
// express=邮寄到付 takemyself = 自提
var takeChoose = 'express';
var expressTakeover = $('#express-takeover');

var handle = function(event) {
    event.preventDefault(); //阻止元素发生默认的行为
};

$(function() {
    // 历史记录返回
    headerGoBack.on('click', function() {
        window.history.go(-1);
    });
    // 收货选择给每个label和input加上对应id
    all_label.each(function(index, item) {
        var thisId = 'x' + index;
        $(item).attr('for', thisId);
        $(item).find('input').attr('id', thisId);
    });
    // 菜单
    menuBtn.on('touchstart', function() {
        if (menuBtnState === 'closed') {
            $(this).addClass('opened');
            menuBtnState = 'opened';
            nav.fadeIn('fast');
            document.body.addEventListener('touchmove', handle, {passive: false});
        } else {
            $(this).removeClass('opened');
            menuBtnState = 'closed';
            nav.fadeOut('fast');
            document.body.removeEventListener('touchmove', handle, {passive: false});
        }
    });
    // 地址删除
    addressList.on('click', '.delete', function() {
        var $thisLi = $(this).parents('li');
        $.confirm("是否立即删除此收货地址？", "提示", function() {
            $thisLi.slideUp('fast', function() {
                $thisLi.remove();
                $.toast("删除成功", 500);
                var allLi = $('#address-list li').length;
                if (allLi <= 0) {
                    // addressList.find('ul').remove();
                    addressList.prepend(addressNone);
                    addressList.attr('class', 'address-none');

                }
            });
        });
    });
    // 地址选择-删除点击
    addressChoose.on('click', '.delete', function() {
        var $thisLi = $(this).parents('li');
        $.confirm("是否立即删除此收货地址？", "提示", function() {
            $thisLi.slideUp('fast', function() {
                $thisLi.remove();
                $.toast("删除成功", 500);
                // 检测是否有剩余Li
                var allLi = $('#address-choose li').length;
                if (allLi <= 0) {
                    // addressList.find('ul').remove();
                    addressChoose.prepend(addressNone);
                    addressChoose.attr({
                        'id':'',
                        'class' : 'address-none'
                    });

                }
            });       
        });
    });
    // 订单提交
    // 自提
    $('#take-myself').on('click', function() {
        if(takeChoose === 'express') {
            expressTakeover.slideUp('300');
            $('#take-tips').show();
        }
        takeChoose = 'takemyself';
    });
    // 快递到付
    $('#take-express').on('click', function() {
        if(takeChoose === 'takemyself') {
            expressTakeover.slideDown('300');
            $('#take-tips').hide();
        }
        takeChoose = 'express';
    });
    // 订单提交
    $('#order-submit').on('click', function() {
        if (takeChoose === 'express') {
            if (expressTakeover.hasClass('pass')) {
                expressTakeover.removeClass('error');
                $.confirm("确定要提交订单吗？", "提示", function() {
                    window.location.href = '订单提交-成功.html';
                });
            } else {
                $.toptip('请选择收货地址', 1000, 'warning');
                expressTakeover.addClass('error');
            }
        } else {
            $.confirm("确定要提交订单吗？", "提示", function() {
                window.location.href = '订单提交-成功.html';
            });
        }
    });
});