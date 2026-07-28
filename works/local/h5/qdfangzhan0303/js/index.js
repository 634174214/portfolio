let needCountdown = false;
let imgs = [
    "img/loading-mbg.png",
    "img/area-item-d.png",
    "img/area-item-r.png",
    "img/area-vrbg.png",
    "img/close.png",
    "img/cloud-1.png",
    "img/cloudbg.png",
    "img/dialog-top.png",
    "img/foot-top.png",
    "img/go-top.png",
    "img/head-bg.png",
    "img/head-city.png",
    "img/head-little.png",
    "img/head-long.png",
    "img/head-lu.png",
    "img/head-lv.png",
    "img/head-title-bg.png",
    "img/head-title-big-1.png",
    "img/head-title-big-2.png",
    "img/head-wan.png",
    "img/loading-bg.png",
    "img/loading.gif",
    "img/mid-bg.png",
    "img/mid-city.png",
    "img/mid-house.png",
    "img/mid-l.png",
    "img/mid-r.png",
    "img/pc-qr.png",
    "img/see-detail.png",
    "img/share.jpg",
    "img/waiting.png",
    "img/xinlogo.png",
    "images/lvdi/lv-title.png",
    "images/lvdi/lvdi-0.png",
    "images/lvdi/lvdi-1.png",
    "images/lvdi/lvdi-2.png"
];

const tools = {
    sleep: function(delay) {
        var start = (new Date()).getTime();
        while((new Date()).getTime() - start < delay) {
            continue;
        }
    },
    stopDefault: function(e) {
        if(e && e.preventDefault){
            e.preventDefault();
        }
        //IE中组织浏览器行为
        else{
        window.event.returnValue=fale;
        }
        return false;
    },
    stopBodyScroll: function() {
        document.body.addEventListener('touchmove', tools.stopDefault, {passive: false});
    },
    enableBodyScroll: function() {
        document.body.removeEventListener('touchmove', tools.stopDefault, {passive: false});
    }
}
let setVrPano = function() {
    let $pano = $('#pano');
    let pano = null;

    let create = function(url) {
        pano = embedpano({
            swf: url + "/tour.swf", 
            xml: url + "/tour.xml", 
            target:"pano", 
            html5:"auto", 
            mobilescale:1.0, 
            passQueryParameters:true
        });
    }

    let destroy = function() {
        $pano.empty();
        pano = null;
    }

    return {
        create: create,
        destroy: destroy
    }
}();


let beginLoading = function() {
    let index = 0;
    let imgLen = imgs.length;
    let $loading = $('#loading'),
        $precent = $('#loading-precent'),
        $num = $('.num', $precent),
        $progress = $('.bar', $precent);
    let preloadImage = function(path) {
        return new Promise(function(resolve, reject) {
            var image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = path;
        });
    }

    let init = function() {
        imgs.forEach(item => {
            preloadImage(item).then(resolve => {
                // console.log(resolve);
                // 加载完当前图片执行 让全局Index++
                index++;
                // 计算百分比 拼接字符串
                let percent = Math.ceil(index / imgLen * 100);
                let percentStr = percent + '%';
                $num.text(percentStr);
                $progress.width(percentStr);
                if(percent === 100) {
                    if(needCountdown) {
                        let $text = $('#loading-precent .text');
                        let count = 3;
                        $text.text('即将进入...' + count);
                        let timer = setInterval(function() {
                            count--;
                            $text.text('即将进入...' + count);
                            if(count <= 0) {
                                clearInterval(timer);
                                $loading.fadeOut(beginScreenAnimate.start());
                            }
                        }, 1000);
                        return
                    }
                    $loading.fadeOut(beginScreenAnimate.start());
                }
            }).catch(reject => {
                console.log('load error');
            })
        });
    }

    return {
        init: init
    }
}();

// 开始首屏的动画
let beginScreenAnimate = function() {
    let $tops_ani = $('.first-ani', '#head-top'),
        $mids_ani = $('.first-ani', '#head-mid'),
        $bots_ani = $('.first-ani', '#head-bot');
    let delay = 0.5, step = 0.1;

    let setTop = function() {
        $tops_ani.eq(0).addClass('fadeInDown animated');
        $tops_ani.eq(1).addClass('fadeInUp animated');
    }

    let setMid = function() {
        $mids_ani.each((index, item) => {
            $(item).css({
                        'animation-delay': delay + 's'
                    })
                   .addClass('fadeInUp animated');
            delay += step;
        });
    }

    let setBot = function() {
        $bots_ani.css('animation-delay', delay + 's')
                 .addClass('bounceIn animated');
    }

    // 销毁
    let destroy = function() {
        let $all = $('.first-ani', 'header');
        $all.on('webkitAnimationEnd', function() {
            $(this).removeAttr('class style');
        });
    }

    let start = function() {
       setTop();
       setMid();
       setBot();
       destroy();
    }

    return {
        start: start
    }
}()

// 打开房产弹窗
let showFangDialog = function() {
    let $seeDetail = $('.see-detail');
    // 获取页面全部.list
    let $lists = $('.list');
    let $dialog = $('#dialog')
    let $content = $('#dialog-content');
    let Wrapper = document.getElementById('dialog-wrapper');
    let $close = $('#dialog-close');
    let $golink = $('#dialog-golink');
    let bScroll = null;

    let $VR = $('#vr-window'),
        $VRloading = $('#vr-loading'),
        $VRopen = $('#dialog-vrlink'),
        $VRclose = $('#vr-close');
    // 用来记录VR当前的数据
    let vrData = Object;

    // 开启滚动
    let initBScroll = function() {
        if(!bScroll) {
            bScroll = new BScroll(Wrapper, {
                scrollY: true // 默认
            });
        } else {
            bScroll.refresh();
        }
    }
    // 设置插入内容
    let setIntroduce = function(name) {
        // eval(name)将字符串变为变量名称
        // let content = eval(name).content;
        // 获取介绍
        let content = fangData[name].introduce;
        let str = ''
        content.forEach(item => {
            str = str + `<p>${item}</p>`;
        });
        $content.append($(str));
        // BS需要先显示出来 再进行滚动初始化
        $dialog.fadeIn();
        initBScroll();
    }
    // 设置楼盘信息
    let setBuilding = function(name, index) {
        let data = fangData[name].building[index];
        let str = `<div class="title">${data.title}</div>`;
        if(data.link) {
            $golink.show();
            $golink.attr('href', data.link);
        }
        data.content.forEach(item => {
            str = str + `<p>${item}</p>`;
        });
        $content.append($(str));
        $dialog.fadeIn();
        initBScroll();
    }
    // 设置VR弹窗的内容
    let setVRdialog = function(name, index) {
        // 储存vr dialog对象
        vrData = fangData[name].vr[index];
        let str = `<div class="title">${vrData.label}</div>`;
        $VRopen.show();
        vrData.desc.forEach(item => {
            str = str + `<p>${item}</p>`;
        });
        $content.append($(str));
        $dialog.fadeIn();
        initBScroll();
    }
    // 打开企业介绍
    let openIntroduce = function() {
        let Parent = $(this).parents('.part')[0];
        let name = Parent.dataset.name;
        setIntroduce(name);
        tools.stopBodyScroll();
    }
    // 关闭弹窗
    let closeDialog = function() {
        tools.enableBodyScroll();
        $dialog.fadeOut(function() {
            $content.empty();
            $VRopen.hide();
            $golink.hide();
            vrData = {};
        });
    }
    // 打开楼盘介绍
    let openBuilding = function() {
        let Parent = $(this).parents('.part')[0];
        // 获取点击的是那一个企业
        let name = Parent.dataset.name;
        // 获取当前点击list中所有的normal
        let $allNormal = $(this).parent().find('.normal');
        // 点击索引,获取点击元素相对于所有.normal的位置
        let index = $allNormal.index($(this));
        setBuilding(name, index);
        tools.stopBodyScroll();
    }

    let openDialogVR = function() {
        let Parent = $(this).parents('.part')[0];
        let name = Parent.dataset.name;
        let $allVr = $(this).parent().find('.vr');
        let index = $allVr.index($(this));
        setVRdialog(name, index);
        tools.stopBodyScroll();
    }
    // 打开vr
    let openVR = function() {
        // 如果是外链vr则跳出
        let isHttp = vrData.path.indexOf('http') > -1;
        if(isHttp) {
            window.location.href = vrData.path;
            return
        }
        $VR.removeClass('off');
        // 强制浏览器重绘
        let _h = document.getElementById('head-top').clientHeight;
        setTimeout(function() {
            $VR.addClass('on');
            setVrPano.create(vrData.path);
        }, 0);
        setTimeout(() => {
            $VRloading.fadeOut();
        }, 1000)
    }
    let closeVR = function() {
        $VR.attr('class', 'vr-window')
        $VR.on('webkitTransitionEnd', function() {
            $(this).addClass('off');
            setVrPano.destroy();
            $VRloading.show();
            $(this).off('webkitTransitionEnd');
        });
    }

    let init = function() {
        $seeDetail.on('click', openIntroduce);
        $close.on('click', closeDialog);
        $lists.on('click', '.normal', openBuilding);
        $lists.on('click', '.vr', openDialogVR);
        $VRopen.on('click', openVR);
        $VRclose.on('click', closeVR);
    }

    return {
        init: init
    }
}();



// 设置开发商部分滚动效果
let setPartScrollme = function() {
    let $parts = $('.part'),
        $info = $('.info', $parts),
        $lists = $('.list', $parts),
        $imgboxs = $('.imgbox', $info),
        $textboxs = $('.textbox', $info),
        $listTitle = $('.area-title', $parts);
        
    let setInfo = function() {
        $info.each((index, item) => {
            let isleft = $(item).hasClass('left');
            let $img = $imgboxs.eq(index),
                $text = $textboxs.eq(index);
            $img.addClass('scrollme animateme');
            $text.addClass('scrollme animateme');
            $img.attr({
                'data-when': 'enter',
                'data-from': '1',
                'data-to': '0',
                'data-opacity': 0,
                'data-translatex': '-150',
            });
            if(isleft) {
                $img.attr({
                    'data-translatex': '-150',
                });
            } else {
                $img.attr({
                    'data-translatex': '150',
                });
            }
        })
    }

    let setList = function() {
        $lists.each((index, item) => {
            let $lis = $('li', $(item));
            $lis.addClass('scrollme animateme')
                .attr({
                    'data-when': 'enter',
                    'data-from': '1',
                    'data-to': '0',
                    'data-rotatey': '-90',
                    'data-opacity': 0
                });
        });
    }

    let setAreaTitle = function() {
        let $imgs = $listTitle.find('img');
        $imgs.addClass('scrollme animateme')
             .attr({
                'data-when': 'enter',
                'data-from': '1',
                'data-to': '0',
                'data-scale': '2',
                'data-opacity': 0
             });
    }
    
    let init = function() {
        setInfo();
        setList();
        setAreaTitle();
    }

    return {
        init: init
    }
}();

beginLoading.init();
showFangDialog.init();
setPartScrollme.init();



