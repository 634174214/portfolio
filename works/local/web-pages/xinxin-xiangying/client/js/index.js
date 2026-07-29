// http://jqweui.com/extends#infinite 滚动加载
var loading = false;  //状态标记
var addover = 0; // 模拟加载的次数
var goodsList = $('#shopping-list');
var cover = $('#cover');
const goodsListHeight = Math.floor(goodsList.height());
// 根据按钮状态不同选择加载不同json：时间排序timeline  高-低 downline  低-高upline
var jsonChoose = 'timeline';

// 积分状态切换
function btnClick(that, jsonData, lineChoose) {
    if (that.hasClass('on')) { return; }
    that.addClass('on');
    that.siblings().removeClass('on');
    $.ajax({
        type: "GET",
        url: jsonData,
        dataType: "json",
        success:function(data){
           cover.show();
           goodsList.attr('class', 'index-fadeOut');
           goodsList[0].addEventListener("webkitAnimationEnd", function() {
                goodsList.empty();
                $.each(data, function(index, item) {
                  goodsList.append($(item.html));
                });
                goodsList.attr('class', 'index-fadeIn');
                cover.hide();
           });
           loading = false;
           jsonChoose = lineChoose;
        }
    });
}

// 滚动底部加载的ajax
function scrollBottomAjax(jsonData) {
    setTimeout(function() {
     $.ajax({
          type: "GET",
          url: jsonData,
          dataType: "json",
          success: function(data) {
             $.each(data, function(index, item) {
                goodsList.append($(item.html));
             });
             loading = false;
             addover += 1; // 模拟滚动加载
          }
      });
    },1500);
}

// 模拟的状态重置
function addoverInit() {
    addover = 0; // 重置下拉加载的次数
    $('#index-bottom-line').hide();
     $('.weui-loadmore').show();
}

$(function(){
    goodsList.css({'min-height': goodsListHeight});
    // console.log(goodsListHeight);
    var carousel = new Swiper ('.swiper-container', {
       direction: 'horizontal', // 垂直切换选项
       loop: true, // 循环模式选项
       autoplay:{
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
       },
       // 如果需要分页器
       pagination: {
         el: '.swiper-pagination',
       }
     }); 
     // 滚动加载
     $(document.body).infinite().on("infinite", function() {
       // 模拟加载4次就不加载
       if (addover >= 4) {
            $('#index-bottom-line').fadeIn('fast');
            $('.weui-loadmore').hide();
            loading = true; // 状态返回true即停止滚动加载
            return;
       }
       if(loading) return;
       loading = true;
       // 为false时滚动加载,根据状态不同加载不同json
       switch(jsonChoose) {
            case 'timeline':
                scrollBottomAjax('indexdata.json');
                break;
            case 'downline':
                scrollBottomAjax('indexdatadown1.json');
                break;
            case 'upline':
                scrollBottomAjax('indexdataup.json');
                break;
            default:
                console.log('数据不存在');
        }
     });    
     // 积分低-高请求
     $('#up').on('touchstart', function() {
        btnClick($(this), 'indexdataup.json', 'upline');
        addoverInit();
     });
     // 积分高 - 低
     $('#down').on('touchstart', function() {
        btnClick($(this), 'indexdatadown1.json', 'downline');
        addoverInit();
     });
});