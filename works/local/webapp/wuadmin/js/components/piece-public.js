// 所有页面都运行的函数,注意 这个必须在jq之后引入
define([
    'pieceTree',
    'pieceTopNav',
    'pieceTabBar',
], function(
    tree,
    nav,
    bar,
) {
    
    var pageLoaded = function() {
        // 页面加载完成 开启所有元素的transition动画
        $(document).ready(function(){ 
            　$("body").removeClass("preload");
        }); 
    }

    var init = function() {
        pageLoaded();
        tree.init();
        nav.init();
        bar.init();
    }

    return {
        init: init
    }
});