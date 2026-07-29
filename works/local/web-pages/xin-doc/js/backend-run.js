// 顶部响应式菜单
layui.use(['element', 'layer', 'util'], function(){
    var element = layui.element,
    layer = layui.layer,
    util = layui.util,
    $ = layui.$;
    
    //头部事件
    util.event('lay-header-event', {
      //左侧菜单事件
      menuLeft: function(othis){
        $('body').addClass('site-mobile');
  
        $('#site-mobile-shade').on('click', function() {
          $('body').removeClass('site-mobile');
        })
      }
      ,menuRight: function(){
        layer.open({
          type: 1
          ,title: '更多'
          ,content: '<div style="padding: 15px;">处理右侧面板的操作</div>'
          ,area: ['260px', '100%']
          ,offset: 'rt' //右上角
          ,anim: 5
          ,shadeClose: true
          ,scrollbar: false
        });
      }
    });
    
  });

// 点击layui-logo前往指定的页面
layui.use([], function() {
  $ = layui.$;
    // 点击layui-logo跳转到指定页面
    $(".layui-logo").on('click', function() {
      var url = $(this).data('open');
      window.location.href = url;
    });
});
  