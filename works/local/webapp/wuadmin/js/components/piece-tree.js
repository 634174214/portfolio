// 左侧导航树组件,第一个参数为定义需要依赖其他模块的对象模块
define(['jquery'], function($){
    var $tree = $('#peice-tree');
    // 筛选出所有class名是child的span标签
    var $spanChilds = $tree.find('.child').filter(function() {
        return $(this).prop('nodeName') === 'SPAN';
    });
    var $clildLists = $tree.find('.child-list');

    // 给又二级菜单的项插入箭头
    var insertArrow = function() {
        var $arrow = $('<i class="icon fas fa-caret-right"></i>');
        $spanChilds.append($arrow);
    }

    var removeSlided = function() {
        var isSlided_list = $('.has-slided').length > 0;
        if(isSlided_list) {
            $('.has-slided').removeClass('has-slided');
        }
    }

    var hideALLChildList = function($that) {
        var $that = $that || false;
        var $childShow = $();
        if($that) {
            // 排除
            $childShow = $clildLists.not($that).filter(function() {
                return $(this).is(':visible');
            });
        } else {
            $childShow = $clildLists.filter(function() {
                return $(this).is(':visible');
            });
        }
        $childShow.slideUp();
    }

    var clickItem = function() {
        // 改为child元素 为了防止child-list冒泡
        $tree.on('click', '.child', function() {
            var $childList = $(this).next();
            var hasChildList = $childList.length > 0;
            // 当内部有二级菜单的情况
            if(hasChildList) {
                hideALLChildList($childList);
                // 除了本身其他的所有span.child都去掉高亮样式
                $spanChilds.not($(this)).removeClass('has-active');
                $(this).toggleClass('has-active');
                $childList.slideToggle(function() {
                    // 如果有展开的样式 那么就移除
                    removeSlided();
                });
            } else {
                // 如果没有二级菜单
                $('.has-active').removeClass('has-active');
                hideALLChildList();
                removeSlided();
            }
        });

        // 选中状态阻止二次点击
        $tree.on('click', 'a', function() {
            // 当前项有active样式时，阻止跳转
            if($(this).hasClass('active')) {
                return false;
            }
        })
    }


    var init = function(){
        insertArrow();
        clickItem();
    }
    
    return {
        init: init
    };
})