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


function Imagelist() {
    // 起始的数值
    var tab1Record = 0;
    var tab2Record = 0;
    // 每次加载的个数
    var count = 15;

    var $tab1List = $('#tab-1-list');
    var $tab2List = $('#tab-2-list');
    var $load1More = $('#load1more');
    var $load2More = $('#load2more');

    function tplItem(obj) {
        var label = isMobile ? '' : '作者：';
        var thumb = '';
        if (obj.src.indexOf('tab-1') > -1) {
            thumb = obj.src.replace(/tab-1/g, 'tab-1-thumb');
        }
        if (obj.src.indexOf('tab-2') > -1) {
            thumb = obj.src.replace(/tab-2/g, 'tab-2-thumb');
        }
        var tpl = '<li data-needtip="' + obj.needtip + '" data-src="' + obj.src + '">';
        tpl += '<div class="img-x">';
        tpl += '<img src="' + thumb + '?t=3">';
        tpl += '</div>';
        tpl += '<p class="info-x">' + label + obj.name + '</p>';
        tpl += '</li>';
        return tpl;
    }

    function getLast(record, arr) {
        if ((record + count) < arr.length) {
            return record + count;
        } else {
            return arr.length;
        }
    }

    function loadMore() {
        $load1More.on('click', function() {
            if ($(this).hasClass('load-over') ||
                tab1Record >= (dataTab1.length - 1)
            ) {
                return;
            }
            if (tabCurrent == 'tab-1') {
                insert1();
            }
        });
         $load2More.on('click', function() {
            if ($(this).hasClass('load-over') ||
                tab2Record >= (dataTab2.length - 1)
            ) {
                return;
            }
            if (tabCurrent == 'tab-2') {
                insert2();
            }
        });
    }

    function insert1() {
        var now1Last = getLast(tab1Record, dataTab1);
        var htmlStr = '';
        $.each(dataTab1, function(index, item) {
            if (index < now1Last && index >= tab1Record) {
                htmlStr += tplItem(item);
            }
        });
        $tab1List.append($(htmlStr));
        tab1Record = now1Last;
        if (tab1Record >= dataTab1.length - 1) {
            $load1More.addClass('load-over');
        }
    }
    function insert2() {
        var now2Last = getLast(tab2Record, dataTab2);
        var htmlStr = '';
        $.each(dataTab2, function(index, item) {
            if (index < now2Last && index >= tab2Record) {
                htmlStr += tplItem(item);
            }
        });
        // console.log(htmlStr)
        $tab2List.append($(htmlStr));
        tab2Record = now2Last;
        if (tab2Record >= dataTab2.length - 1) {
            $load2More.addClass('load-over');
        }
    }

    function start() {
        insert1();
        insert2();
    }

    start();
    loadMore();
}
Imagelist();

$('#tab').on('click', '.tab-btn', function(e) {
    if ($(this).hasClass('active')) {
        return;
    }
    $('.tab-btn').removeClass('active');
    $('.look-more').removeClass('active');
    $(this).addClass('active');
    var tabCls = $(this).attr('class');

    if (tabCls.indexOf('tab-1') > -1) {
        $('#tab-1-list').removeClass('hide');
        $('#tab-2-list').addClass('hide');
        $('#load1more').addClass('active');
        $('#imges-tips').show();
        tabCurrent = 'tab-1';
    }
    if (tabCls.indexOf('tab-2') > -1) {
        $('#tab-1-list').addClass('hide');
        $('#tab-2-list').removeClass('hide');
        $('#load2more').addClass('active');
        $('#imges-tips').hide();
        tabCurrent = 'tab-2';
    }
});


var $iframeBox = $('#iframe-box');
var $iframe = $('#iframe');
var $iframeName = $('#iframe-uname');
var tipsTimer = null;
$('#images-list').on('click', 'li', function() {
    // 是否需要提示(代表原图为横幅 但是手机上为竖幅)
    var needTip = parseInt($(this).data('needtip')) === 1;

    var $img = $(this).find('img').eq(0);
    var $p = $(this).find('.info-x').eq(0);
    // console.log($p)
    var thumbsrc = $img.attr('src');
    var imgsrc = $(this).data('src');
    // imgsrc = imgsrc.replace(/-thumb/g, '');

    // 就算是特殊的图片 显示的始终是-PC的图 那么手机版替换-m
    if (isMobile && needTip) {
        imgsrc = imgsrc.replace(/\./g, '-m.');
    }

    // console.log(imgsrc)
    var author = $p.text();

    $iframeBox.fadeIn();
    $iframe.attr('src', 'iframe.html?src=' + imgsrc);
    $iframeName.text(author);

    if(isMobile && needTip) {
        $('#shu2heng').show();
        tipsTimer = setTimeout(function() {
            $('#shu2heng').fadeOut();
        }, 2000);
    }
    
});

$('#iframe-close').on('click', function() {
    
    if($('#shu2heng').is(':visible')) {
        $('#shu2heng').hide();
        clearTimeout(tipsTimer);
    }

    $iframeBox.fadeOut(function() {
        $iframe.removeAttr('src');
         $iframeName.text('');
    });
});


var tabTop = $('#tab').offset().top;
$(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop();
    // console.log(scrollTop)
    if (scrollTop < tabTop) {
        $('#tab').removeClass('fixed');
        return;
    }
    if (scrollTop >= tabTop &&
        !$('#tab').hasClass('fixed')
    ) {
        $('#tab').addClass('fixed');
    }
});

