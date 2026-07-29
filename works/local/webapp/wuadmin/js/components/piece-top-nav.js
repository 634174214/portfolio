// 左侧导航树组件,第一个参数为定义需要依赖其他模块的对象模块
define(['jquery'], function($){
    var $topNav = $('#piece-top-nav');
    var $userInfo = $('.user-info', $topNav).eq(0);
    var $userMenu = $('.menu', $userInfo).eq(0);
    var $userMes = $('.mes', $userInfo).eq(0);
    var $reload = $('#reload');
    
    var menuHover = function() {
        $userInfo.hover(
            function() {
                $userMenu.slideDown();
                $userMes.addClass('show');
            },
            function() {
                $userMenu.slideUp();
                $userMes.removeClass('show');
            }
        )
    }

    var reload = function() {
        $reload.on('click', function() {
            window.location.reload();
        });
    }

    var init = function() {
        menuHover();
        reload();
    }

    return {
        init: init
    };
})