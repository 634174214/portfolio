var tabCurrent = 'tab-1';

var isMobile = function() {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
        return true;
  }
  return false;
}();

// 手机版菜单
var menuCl = document.getElementById("menuClose");
    var menuPop = document.getElementById("menuPid");
    var menuPId=$('#menuPid'),
          Cont=$('#menuNavC');
    var headmenu = document.getElementById("popGd");
    var fixhead = document.getElementById("fixMenu");
    var logoTi = document.getElementById("wordTi");
    

    var btnSwith = 'closed';
    function menuClickFn(){
    if(btnSwith == 'closed'){
        menuPop.style.display = 'block';
        logoTi.style.display = 'none';
        menuCl.setAttribute("class","nav-hamburger opened");
        btnSwith = 'opened';
        headmenu.setAttribute("class","popTopP45 headMenu headMenu_open");
        fixhead.setAttribute("class","guDig fixDiv");
        Cont.hide();
    }else{
        menuPop.style.display = 'none';
        btnSwith = 'closed';
        menuCl.setAttribute("class","nav-hamburger");
        headmenu.setAttribute("class","popTopP45 headMenu");
        fixhead.setAttribute("class","guDig");
                  logoTi.style.display = 'block';
                  Cont.show();
    }       
}
function addEvent(elm, evType, fn, useCapture) {
if (elm.addEventListener) {
elm.addEventListener(evType, fn, useCapture);//DOM2.0
return true;
}
else if (elm.attachEvent) {
var r = elm.attachEvent('on' + evType, fn);//IE5+
return r;
}
else {
elm['on' + evType] = fn;//DOM 0
}
}
addEvent(menuCl,'click',menuClickFn,false);


function setCounts(n) {
    // console.log(n);
    var it = $(".t_num1 i");
    var len = String(n).length;
    for(var i = 0; i < len; i++) {
        if(it.length <= i) {
            $(".t_num1").append("<i></i>");
        }
        var num = String(n).charAt(i);
        //根据数字图片的高度设置相应的值
        var y = -parseInt(num) * 58;
        var obj = $(".t_num1 i").eq(i);
        obj.animate({
            backgroundPosition: '(0 ' + String(y) + 'px)'
        }, 'slow', 'swing', function() {});
    }
}

// 监听点赞
function listenZans(zans) {
    var URL = '';
    if (window.location.href.indexOf('localhost') > -1 ||
        window.location.href.indexOf('192.168') > -1
    ) {
       URL = 'test-data/post.json';
    } else {

       URL = 'http://mp.qdxin.cn/public/xwqmt/live/33011/zanadd';
    }

    $(window).bind('addZans', function() {
       $.ajax({
            url: URL,
            dataType: 'json',
            type: 'POST',
            success: function(res) {
                console.log(res)
                setCounts(res.zan);
            }
       });
    });
}

// 获取图片 并插入
(function() {
    // 请求的地址
    var IMGS_URL = '';
    if (window.location.href.indexOf('localhost') > -1 ||
        window.location.href.indexOf('192.168') > -1
    ) {
       IMGS_URL = 'test-data/data.json';
    } else {

      IMGS_URL = 'http://mp.qdxin.cn/public/xwqmt/live_img_json.php?id=33011';
    }
    
    
    var ZIP_TYPES = ['345x560', '560x345', '480x480'];
    // 压缩接口
    var ZIP_URL = 'http://aimg.qdxin.cn/imagescale/?size=' + ZIP_TYPES[2] + '&url=';
    // 外层的高度
    var BOX_HEIGHT = 400;
    // 取几张图片
    var IMGS_COUNTS = 15;
    // 当前图片索引
    var currentIndex = 0;
    // 包含全部数据的数组
    var arr = [];
    var imgArr = [];
    var $imWrapper = $('#im_wrapper');

    function shuffle(arr) {
        return arr.sort(function() {
            return Math.random() - 0.5;
        });
    }

    function insertImgs() {
        $.each(imgArr, function(index, item) {
            if(item.indexOf('https') > -1) {
                item = item.replace('https', 'http');
            }
            var imgsrc = ZIP_URL + item;
            var $div = $('<div data-origin="' + item + '"><img src="' + imgsrc +  '"></div>');
            $imWrapper.append($div);
        });
        // $imWrapper.css({
        //     height: BOX_HEIGHT
        // })
    }


    $.ajax({
        url: IMGS_URL,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            // 只有当大于15张时才执行
            if (res.imgArr.length >= IMGS_COUNTS) {
                // console.log(res.imgArr)
                // 首先执行数组乱序
                arr = shuffle(res.imgArr);
                console.log(arr);
                var copyArr = JSON.parse(JSON.stringify(arr));
                imgArr = copyArr.splice(0, IMGS_COUNTS);
                console.log(imgArr);
                currentIndex = currentIndex + IMGS_COUNTS;
                insertImgs();

                photosStart({
                    boxWidth: $(window).width(),
                    boxHeight: BOX_HEIGHT
                });
            }
            
           
            if(res.zans && typeof res.zans =='number') {
                setCounts(res.zans);
                listenZans(res.zans);
            }
        }
    });

    // 换一组
    $('#change-group').bind('click', function() {
        if ($('#im_loading').is(':visible')) {
            return;
        }

        // 必须使用Unbind否则闭包中绑定的bind会重复执行！！
        $('#im-cover-close').unbind(); 

        var copyArr = JSON.parse(JSON.stringify(arr));
        if ( (currentIndex + IMGS_COUNTS) < copyArr.length ) {
            imgArr = copyArr.splice(currentIndex, IMGS_COUNTS);
            // console.log(1);
        } else {
            // 对数组重新乱序再重新取
            arr = shuffle(arr);
            currentIndex = 0;
            copyArr = JSON.parse(JSON.stringify(arr));
            imgArr = copyArr.splice(0, IMGS_COUNTS);
            // console.log(2);
        }
        // console.log(imgArr);
        currentIndex = currentIndex + IMGS_COUNTS;
        
        $('#im_loading').show();
        $('#im_wrapper').empty();

        insertImgs();

        photosStart({
            boxWidth: $(window).width(),
            boxHeight: BOX_HEIGHT
        });

        return false;
    });

})();


new WOW().init();