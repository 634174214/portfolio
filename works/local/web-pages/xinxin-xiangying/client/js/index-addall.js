// http://jqweui.com/extends#infinite 滚动加载
// 加载全部的商品然后再每次滚动到底部就加载6个至超过返回JSon的长度结束
var loading = false;  //加载状态标记
var addIndex = 0; // 记录加载的个数
var addAllGoods = null; // 储存各个排序商品的json
var goodsList = $('#shopping-list');
var cover = $('#cover');
var goodsListHeight = 0;
// 根据按钮状态不同选择加载不同json：时间排序timeline  高-低 downline  低-高upline
var errorGet = $('<div id="errorget">抱歉！您的网络不给力，请刷新后重试！</div>');
var jsonChoose = 'timeline';
var goodsListUrl = {
  'time': 'all_time.json?t=123', // 时间排序
  'up': 'all_up.json',     // 低-高
  'down': 'all_down.json'  // 高-低
};

// 积分状态切换，点击时重新get排序列表
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
                  if (index <= 5) {
                    goodsList.append($(item.html));
                    addIndex = index; //储存位置
                  }
                });
                goodsList.attr('class', 'index-fadeIn');
                cover.hide();
           });
           loading = false;
           jsonChoose = lineChoose; // 切换排序状态
           addAllGoods = data; // 给商品json重新赋值排序
        }
    });
}
// 初始化页面获取加入6个商品
function initGoodsList(jsonData) {
  $.ajax({
       type: "GET",
       url: jsonData,
       dataType: "json",
       success: function(data) {
          addAllGoods = data;
          $.each(data, function(index, item) {
             if (index <= 5) {
               // console.log(index);
               goodsList.append($(item.html));
               addIndex = index; //储存位置
               console.log(addIndex);
             }
             // 设置最小高度
             goodsListHeight = Math.floor(goodsList.height());
             goodsList.css({'min-height': goodsListHeight});
          });
       },
       error: function(error) {
         console.log(error);
         goodsList.hide();
         $('.weui-loadmore').before(errorGet); // 在提示滚动加载前插入元素
         $(document.body).destroyInfinite();//销毁滚动加载
         $('#up, #down').hide(); // 隐藏排序按钮
         loading = true;
       }
   });
}

// 非第一次模拟的AJAX请求
function scrollBottomAppend() {
  var endIndex = addIndex + 6;
  setTimeout(function() {
    $.each(addAllGoods, function(index, item) {
        if (index <= endIndex && index > addIndex) {
          console.log(index +'-'+addAllGoods.length);
          // 如果是最后一个
          if (index === addAllGoods.length - 1) {
            $('#index-bottom-line').fadeIn('fast');
            $('.weui-loadmore').hide();
            loading = true;
            $(document.body).destroyInfinite();//销毁滚动加载
            return;
          } else {
            goodsList.append($(item.html));
            addIndex = index; //储存位置
            loading = false;
          }
        }
    });
  }, 1500);
}

// 状态重置
function addoverInit() {
  addIndex = 0; //重置位置
  loading = false;
  $(document.body).infinite(); // 重新绑定滚动加载
  $('#index-bottom-line').hide();
  $('.weui-loadmore').show();
}

$(function(){
    // 加载全部时间顺序商品 
    initGoodsList(goodsListUrl.time);
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
       console.log(loading);
       if(loading) return; 
       loading = true;
       switch(jsonChoose) {
         case 'timeline':
             scrollBottomAppend(addAllGoods);
             break;
         case 'downline':
             scrollBottomAppend(addAllGoods);
             break;
         case 'upline':
             scrollBottomAppend(addAllGoods);
             break;
         default:
             console.log('数据不存在');
        }
     });    
     // 积分低-高请求
     $('#up').on('touchstart', function() {
        addoverInit();
        btnClick($(this), goodsListUrl.up, 'upline');
     });
     // 积分高 - 低
     $('#down').on('touchstart', function() {
        addoverInit();
        btnClick($(this), goodsListUrl.down, 'downline');
     });
});