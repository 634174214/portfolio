define(['jquery'], function($){
    $allA = $('a');
    var openiframe = function() {
        $allA.on('click', function() {
            var href = $(this).attr('href');
            // 子页面向父页面传值
            window.parent.postMessage(href, '*');
        });
    }

    var goback = function() {
        window.history.go(-1);
    }

    // 监听父窗口传递过来的信息
    var listenParent = function() {
        window.addEventListener('message', function (event) {
            switch(event.data) {
                case 'back':
                    goback();
                    break;
            }
        }, false);
    }


    var init = function() {
        openiframe();
        listenParent();
    }
    
    return {
        init: init
    };
})