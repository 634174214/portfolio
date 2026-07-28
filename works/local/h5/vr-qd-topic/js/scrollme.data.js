//  动态添加的scrollMe.js用到的data-xx属性必须再scroll.js之前就已动态添加完成
// 如果仅仅为了给顶部的元素添加 页面开始时的css动画，那么将scrollme.js的data-when属性=“exit” ，然后直接将属性书写再页面中即可如：<span class="cloud scrollme animateme" id="cloud" data-when="exit"  data-from="0" data-to="0.5"  data-translatex="-200" data-opacity="0">，这样再加载完时，丝毫不影响动态添加的animate.css动画
//为了不影响scrollme 的滚动执行，最好再动画执行完将添加的animated删除掉
function addScrollMeData(data) {
  $.each(data, function(index, item) {
      $('#' + item.id).addClass('scrollme animateme');
      // console.log(item)
      for(var key in item) { // 使用attr 动态添加{key:value}的方法
        $('#' + item.id).attr(key,item[key]);
      }
  });
}
// 设置scrollME.js的执行元素id以及属性参数
var headerScroll = [
    {'id': 'cloud', 'data-when':'exit', 'data-from': 0, 'data-to': 1, 'data-translatex': -200, 'data-opacity':0},
    {'id': 'man', 'data-when':'exit', 'data-from': 0, 'data-to': 1, 'data-translatex': -200, 'data-opacity':0},
    {'id': 'Ftitle', 'data-when':'exit', 'data-from': 0, 'data-to': 1, 'data-translatex': 400, 'data-opacity':0},
    {'id': 'title', 'data-when':'exit', 'data-from': 0, 'data-to': 0.5, 'data-scale':2, 'data-opacity':0},
    {'id': 'headerbg', 'data-when':'exit', 'data-from': 0, 'data-to': 1, 'data-translatey': 200, 'data-opacity':0},
    {'id': 'chtitle', 'data-when':'exit', 'data-from': 0, 'data-to': 1, 'data-translatey': -200, 'data-opacity':0},
];
addScrollMeData(headerScroll);