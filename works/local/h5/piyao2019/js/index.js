var audio = $('#sound'),
    audiobtn =  $('#audiobtn'),
    isPlaying = false; 
let manifest = [
    "img/alpha.png",
    "img/arrd.png",
    "img/img-loading.gif",
    "img/loading.png",
    "img/p1-ani-0.png",
    "img/p1-ani-1.png",
    "img/p1-ani-2.png",
    "img/p1-ani-3.png",
    "img/p1-ani-4.png",
    "img/p1-ani-5.png",
    "img/p1-bg.jpg",
    "img/p1-bot.png",
    "img/p1-title.png",
    "img/p2-bot.png",
    "img/p3-top.png",
    "img/pi-ani-1.png",
    "img/piyao.png",
    "img/yaoyan.png",
    "img/audiobtn.png",
    "img/share.jpg",
    "bgm.mp3",
    "image/1.jpg",
    "image/10.jpg",
    "image/11.jpg",
    "image/12.jpg",
    "image/13.jpg",
    "image/14.jpg",
    "image/15.jpg",
    "image/16.jpg",
    "image/2.jpg",
    "image/3.jpg",
    "image/4.jpg",
    "image/5.jpg",
    "image/6.jpg",
    "image/7.jpg",
    "image/8.jpg",
    "image/9.jpg"
];
// 第一屏动画
let pageFirstAni = function() {
    let $aniEl = $('#first .ani-hook');
    let config = [
        {
            'clsname': 'title',
            'aniname': 'fadeInDown',
            'delay': '0s'
        },
        {
            'clsname': 'ani-1',
            'aniname': 'fadeIn',
            'delay': '0.2s'
        },
        {
            'clsname': 'ani-2',
            'aniname': 'fadeInLeft',
            'delay': '0.3s'
        },
        {
            'clsname': 'ani-3',
            'aniname': 'fadeInDown',
            'delay': '0.4s'
        },
        {
            'clsname': 'ani-4',
            'aniname': 'fadeInRight',
            'delay': '0.5s'
        },
        {
            'clsname': 'ani-5',
            'aniname': 'fadeInUp',
            'delay': '0.7s'
        },
        {
            'clsname': 'ani-over',
            'aniname': 'ani-stamp',
            'delay': '1.2s'
        }
    ];
    let initFirstAni = function() {
        $aniEl.each(function(index, aniItem) {
            
            $(aniItem).addClass(config[index].aniname + ' animated');
        });
    }
    let removeFirstAni = function() {
        $aniEl.each(function(index, aniItem) {
            $(aniItem).removeClass(config[index].aniname + ' animated');
          
        });
    }
    return {
        initFirstAni: initFirstAni,
        removeFirstAni: removeFirstAni
    }
}();

function stopbodytouch(){
    $("body").bind("touchmove",function(event){
        event.preventDefault();
    });
}
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod'
    ];
    var flag = true;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) != -1) {
            flag = false;
            break;
        }
    }
    return flag;
}
function playAudio() {
    if (audio.attr('src') == undefined) {
        audio.attr('src', audio.data('src'));
    }
    isPlaying = true;
    audio[0].play();
    return isPlaying;
}
// 返回章的class名称
function getStampCls(cls) {
    switch(cls) {
        case 0:
            cls = '';
            break;
        case 1:
            cls = 'piyao';
            break;
        case 2:
            cls = 'yaoyan';
            break;    
    }
    return cls;
}

// 第二屏
let pageSecond = function(){
    let $list = $('.list','#second'),
        $first = $('#first'),
        $second = $('#second'),
        aniCls = 'fadeInUp animated',
        $backFirst = $('#backto-first');
    let template = function(opt) {
        let imgboxCls = getStampCls(opt.stamp);
        return `
        <li>
            <div class="imgbox ${imgboxCls}">
                <img src="${opt.imgsrc}">
            </div>
            <div class="textbox">
                <h2>${opt.title}</h2>
                <span>${opt.desc}</span>
            </div>
        </li>
        `
    }
    // 添加列表项
    let setSecondList = function() {
        let inhtml = '';
        $.each(data, function(index, item) {
            inhtml = inhtml + template(item);
        });
        $list.append($(inhtml));
    }
    // 让列表依次显示
    let fadeInList = function() {
        let $lis = $list.find('li'),
            lisLens = $lis.length,
            index = 0;
        let timer = setInterval(
            function() {
                if(index < lisLens) {
                    $lis.eq(index).addClass(aniCls);
                    index++;
                } else {
                    index = 0; 
                    clearInterval(timer);
                }
            },
            200
        )
    }
    // 复原列表状态
    let fadeOutList = function() {
        let $lis = $list.find('li');
        $lis.removeClass(aniCls);
    }
    // 显示second
    let showSecond = function() {
        $second.removeClass('off');
        // 先显示元素
        
        $(window).scrollTop(0); 
        fadeInList();
        $second.one('animationend', function() {
            $backFirst.fadeIn('slow');
            $first.hide();
        });
    }
    // 返回第一页
    let hideSecond = function() {
        $first.show();
        $second.addClass('out');
        $backFirst.hide();
        // 动画执行完毕复原状态
        // $second.one('animationend', function() {
        //     fadeOutList();
        //     $second.attr('class', 'second off');
        // });
        setTimeout(function() {
            fadeOutList();
            $second.attr('class', 'second off');
        }, 700);
    }

    return {
        setSecondList: setSecondList,
        showSecond: showSecond,
        hideSecond: hideSecond
    }
}();

// 第三屏
let pageThird = function() {
    let pic = $('#content-img')[0],
        $title =  $('#third .py-title'),
        $desc = $('#third-content .desc'),
        $imgbox = $('#third-content .imgbox'),
        $comment = $('#comment span'),
        $third = $('#third'),
        $inner = $third.find('.inner'),
        thirdScroll = Object;
    
    // 设置内容
    let setContent = function(data) {
        $title.text(data.title);
        $desc.text(data.desc);
        $comment.text(data.comment);
    }
    // 清除内容
    let clearContent = function() {
        $title.empty();
        $desc.empty();
        $comment.empty();
        pic.src = '';
    }
    // 显示详细内容 
    let showThird = function(index) {
        let _data = data[index];
        // 根据stamp属性获取章的样式
        let imgboxCls = getStampCls(_data.stamp);
        pic.src = _data.imgsrc;
        pic.addEventListener('load', function() {
            // 图片加载完成时执行
            if(thirdScroll) {
                console.log('a')
                thirdScroll = new BScroll('#third-content',{
                    scrollY: true,
                    click: true
                });
            } else {
                thirdScroll.refresh();
            }
        });
        setContent(_data);
        $third.removeClass('off');
        // 检测动画执行完毕
        $inner.one('animationend', function() {
            $imgbox.addClass(imgboxCls + ' ani-stamp-py');
            bodyScrollLock.lock($third)
        });
    } 
    // 关闭详细内容
    let hideThird = function() {
        $third.fadeOut('slow', function() {
            $third.addClass('off');
            $imgbox.attr('class', 'imgbox');
            $third.removeAttr('style');
            clearContent();
            // 解除屏幕锁
            bodyScrollLock.unlock($third)
        });
    }
    return {
        showThird: showThird,
        hideThird: hideThird
    }
}();


$(function() {
    let isPC = IsPC();
    // 判断是否是pc
    if(isPC) {
        var qrSrc = 'http://mp.qdxin.cn/wpay/qrcode.php?size=9&data=' + window.location.href;
        $('#ispc').show();
        $('#ispc-qr').attr('src', qrSrc);
    }
    var queue = new createjs.LoadQueue(true);
    queue.loadManifest(manifest);//加载的列表
    queue.on("progress", handleFileLoad);//加载进度 
    queue.on("complete", handleComplete);//加载完成
    function handleFileLoad(e){
        var bnum=parseInt(queue.progress*100);
        $("#loading i").html(bnum+"%");
        $("#loading cite").width(bnum+'%');
    }
    function handleComplete(){ // 加载完成执行
        $("#loading").fadeOut('slow');
        pageFirstAni.initFirstAni();
    }

    $('#audiobtn').click(function(){
        if ($('#audiobtn').attr('class')=='on') {
           $('#audiobtn').attr('class','off');
           audio[0].pause();
           isPlaying = false;
        } else {
           $('#audiobtn').attr('class','on');
           audio[0].play();
           isPlaying = true;
        }
    });

    pageSecond.setSecondList();
    $("#first").swipe({
        swipeUp:function(){
            pageSecond.showSecond();
        }
    });
    $('#arr').on('click', pageSecond.showSecond);
    $('.back', '#backto-first').on('click', pageSecond.hideSecond);
    $('#second').on('click', 'li', function() {
        let index = $(this).index();
        pageThird.showThird(index);
    });
    $('#backto-second').on('click', pageThird.hideThird);
});

document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        network = e.err_msg.split(":")[1];  
        playAudio(); 
        isPlaying ? audiobtn.attr('class', 'on') : audiobtn.attr('class', 'off');
    });
}, false);
