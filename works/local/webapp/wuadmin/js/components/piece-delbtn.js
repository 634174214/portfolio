/*
用于列表页点击删除的弹窗
标准结构
<span href="../delete.php" class="piece-btn warn del" data-layer-delmsg="确定要删除这篇文章吗？">删除</span>
*/
define(['jquery', 'pieceLayer'], function($, pieceLayer){
    var layer = null;

    // 单个的.del被点击的时候
    var delClsClick = function($dels) {
        $dels.on('click', function() {
            // 获取删除链接的href
            var delHref = $(this).attr('href');
            var delmsg = $(this).data('layer-delmsg') || '确定要删除吗？';
            layer.confirm(delmsg, {
                // skin: 'layui-layer-lan',
                title: '确认删除',
                btn: ['确认','取消'] //按钮
              }, function(){
                // 点击确定执行, 将删除按钮的链接使用JS去跳转达到删除目的
                // layer.msg(delHref, {icon: 1});
                window.location.href = delHref;
              }, function(){
                // 点击取消执行
                // layer.msg('也可以这样', {
                //   time: 20000, //20s后自动关闭
                //   btn: ['明白了', '知道了']
                // });
            });
        });
    }

    var getDelmanyNames = function($checkedbox) {
        var nameStr = '?';
        $checkedbox.each(function(index) {
            var andfu = (index === 0) ? '' : '&';
            nameStr = nameStr + andfu + $(this).attr('name') + '=on';
        });
        return nameStr;
    }

    // 用于批量删除的时候
    var delManyClsClick = function($delMany) {
        $delMany.on('click', function() {
            var $checkedbox = $('input[type="checkbox"]:checked');
            // 判断是否有选中的复选框
            var hasCheckedbox = $checkedbox.length > 0;
            if(!hasCheckedbox) {
                layer.msg('请选择要删除的文件', {
                  time: 2000, //20s后自动关闭
                });
                return;
             }

            // 获取删除链接的href
            var delHref = $(this).attr('href');
            var delmsg = $(this).data('layer-delmsg') || '确定要删除吗？';
            // 获取所有选中元素的name
            var searchStr = getDelmanyNames($checkedbox);
            // 拼接链接地址
            delHref = delHref + searchStr;

            layer.confirm(delmsg, {
                // skin: 'layui-layer-lan',
                title: '确认删除',
                btn: ['确认','取消'] //按钮
              }, function(){
                // 点击确定执行, 将删除按钮的链接使用JS去跳转达到删除目的
                window.location.href = delHref;
              }, function(){
                // 点击取消执行
                // layer.msg('也可以这样', {
                //   time: 20000, //20s后自动关闭
                //   btn: ['明白了', '知道了']
                // });
            });
        });
    }

    var init = function() {
        var $dels = $('.del');
        var $delMany = $('.delmany');
        layer = pieceLayer.init();
        if($dels.length > 0) {
            delClsClick($dels);
        }
        if($delMany.length > 0) {
            delManyClsClick($delMany);
        }
    }

    return {
        init: init
    };
})