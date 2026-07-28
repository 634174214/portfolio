var readWarnHtml = $('#read-warning').html();
// 视频目录目标文件夹
var videoPath = 'media/';
// FastClick.attach(document.body);

var tool = {
    noTouchMove: function(e) {
        e.preventDefault();
    },
    bodyNoScroll: function() {
        document.body.addEventListener('touchmove', tool.noTouchMove, {passive: false});
    },
    bodyCanScroll: function() {
        document.body.removeEventListener('touchmove', tool.noTouchMove, {passive: false});
    },
    getSerializeObj: function(arr) {
        var obj = {};
        $.each(arr, function() {
            obj[this.name] = this.value;
        });
        return obj;
    },
    // 生成ajax提交后弹窗的结构
    getLayerContent: function(obj) {
        var tpl = '<div class="wb-l-x">';
            tpl += '<p class="wb-l-title">' + obj.title + '</p>';
            tpl += '<p class="wb-l-text">' + obj.text + '</p>';
            tpl += '</div>';
        return tpl;
    },
    getHomeUrl: function() {
        var url = window.location.href.split('index.html')[0];
        return url;
    },
    isMobile: {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    },
    isWeiXin: function() {
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }(),
    randomNum: function randomNum(minNum, maxNum) { 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random() * minNum+1,10); 
                break; 
            case 2: 
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10); 
                break; 
            default: 
                return 0; 
                break; 
        } 
    },
    getDay: function() {
        var day = window.location.href.split('day=')[1];
        day = parseInt(day);
        var today = false;
        switch(day) {
          case 1:
            today = '2021-04-29T12:00:00';
            break;
          case 2:
            today = '2021-04-30T12:00:00';
            break;
          case 3:
            today = '2021-05-01T12:00:00';
            break;
          case 4:
            today = '2021-05-02T12:00:00';
            break;
          case 5:
            today = '2021-05-03T12:00:00';
            break;
          case 6:
            today = '2021-05-04T12:00:00';
            break;
          case 7:
            today = '2021-05-05T12:00:00';
            break;
        }
        return today;
    }
};

var getEveryNums = function(obj) {
    function getNums() {
        this.today = obj.today || false;
        // 开始日期
        this.begin = obj.begin;
        // 结束日期
        this.end = obj.end;
        // 基数
        this.baseNum = obj.baseNum;
        this.numId = '#nums';
        this.numArr = obj.baseNumArr;
        // this.numArr = [0, 56, 227, 315, 547, 713, 829, 978];
        this.init();
    }
    getNums.prototype = {
        init: function() {
            this.decodeToNum();
            this.getTimeStamp();
            if (this.todayTime < this.beginTime) {
                layer.open({
                    content: '抱歉，当前活动还未开始',
                    btn: ['我知道了']
                });
                this.baseNum = 0;
            } else if (this.todayTime > this.endTime) {
                layer.open({
                    content: '抱歉，当前活动已结束',
                    btn: ['我知道了']
                });
                this.baseNum = this.numArr[this.numArr.length - 1];
            } else {
                this.setBaseNum();
            }
            this.setDomNum();
        },
        decodeToNum: function() {
            // 如果是數值类型 不做转义
            if(typeof this.numArr[1] == 'number') {
                return;
            }
            var arr = [];
            $.each(this.numArr, function(index, item) {
                arr.push(parseInt(window.atob(item)));
            });
            this.numArr = arr;
        },
        setBaseNum: function() {
            var oneDay = 24 * 3600 * 1000;
            var allDiff = this.endTime - this.beginTime;
            // console.log(this.endTime);
            // 总共持续的天数
            var allDiffDay = Math.floor(allDiff / oneDay);
            // console.log(allDiffDay);
            var todayDiff = this.endTime - this.todayTime;
            // 距离结束还有几天
            var todayDiffDay = Math.floor(todayDiff / oneDay);
            // console.log(todayDiffDay);
            // 当前是第几天
            var diff = allDiffDay - todayDiffDay;
            console.log(diff)
            this.baseNum = this.numArr[diff] ? this.numArr[diff] : this.numArr[this.numArr.length - 1];

        },
        getTimeStamp: function() {
            this.beginTime = new Date(this.begin).getTime();
            this.endTime = new Date(this.end).getTime();
            if (Date.parse(this.today)) {
                this.todayTime = new Date(this.today);
            } else {
                this.todayTime = +new Date();
            }
        },
        setDomNum() {
            $(this.numId).text(this.baseNum);
            // 滚动到的时候数字变动
            $(this.numId).countUp({
                delay: 10,
                time: 2000
            });
        }
    };
    return new getNums();
};

var firstVideoPlay = function() {
    function firstPlay() {
        this.el = document.getElementById('first-video');
        this.$videoX = $('#top-video');
        this.isPlaying = false;
        this.init();
    }
    firstPlay.prototype = {
        init: function() {
            if(tool.isWeiXin) {
                tool.isMobile.iOS() && this.autoPlay();
                tool.isMobile.Android() && this.touchPlay();
            } else {
                this.normalPlay();
            }
        },
        autoPlay: function() {
            var self = this;
            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    network = e.err_msg.split(":")[1];
                    console.log('ios')
                    self.videoPlay();
                });
            }, false);
        },
        touchPlay: function() {
            var self = this;
            // 亲测，touchstart/move/end无法触发视频播放 安卓下
            this.$videoX.one('click', function() {
                self.videoPlay();
                console.log('touch')
            });
        },
        normalPlay: function() {
            var self = this;
            $(document).one('click', function() {
                self.videoPlay();
            });
        },
        videoPlay: function() {
            this.el.play();
            this.el.controls = 'controls';
            this.isPlaying = true;
        },
        pause: function() {
            this.el.pause();
            this.isPlaying = false;
        }
    }
    return new firstPlay();
}();


// 可以用字符串百分比来决定距离屏幕顶部的距离
$('.form-house').waypoint(function() {  
   // this.element才指的是元素  this指向waypoint
//    console.log(this.element)
   $(this.element).addClass('ani');
}, { offset: '90%' });

// 隐私政策阅读
$('.agree-link').on('click', function() {
    // tool.bodyNoScroll();
    layer.open({
        type: 1,
        content: readWarnHtml,
        anim: 'up',
        shadeClose: false,
        style: 'position:fixed; left:0; top:0px; right:0; bottom: 0; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
    });

    $('.read-close').on('click', function() {
        // tool.bodyCanScroll();
        layer.closeAll();
    });
});

// 预约成功展示
var successShow = function() {
    var Plugin = function() {
        // 生成的展示数据总个数
        this.maxLength = 10;
        // 随机姓
        this.nameArr = '赵钱孙李周吴郑王田蒋沈韩杨顾朱张江白宋袁';
        // 随机日期
        this.dateArr = ['今天', '1天前', '2天前', '3天前', '4天前'];
        // 随机号码
        this.phoneArr = [139, 138, 137, 158, 159, 157, 135, 198, 195, 186, 180, 133, 130, 156, 155, 185];
        // 要插入的元素
        this.$wrapper = $('#success-show-swiper-wrapper');
        // 启动swiper的元素
        this.containerId = '#success-show';
        this.init();
    }
    Plugin.prototype = {
        init: function() {
            var slideStr = '';
            while(this.maxLength > 0) {
                slideStr += this.tpl();
                this.maxLength--;
            }
            this.$wrapper.append($(slideStr));
            this.start();
        },
        getRand: function(maxNum) {
            return parseInt(Math.random() * (maxNum + 1), 10); 
        },
        start() {
            var successSwiper = new Swiper (this.containerId, {
                direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                autoplay: {
                    delay: 2000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                allowTouchMove: false
            });
        },
        // 生成名字
        createName: function() {
            var index = this.getRand(this.nameArr.length - 1);
            var name =  this.nameArr[index] + '**';
            return name;
        },
        // 生成随机电话
        createPhone: function() {
            var index = this.getRand(this.phoneArr.length - 1);
            var last = Math.floor(Math.random() * 1000);
            last = last.toString().slice(0, 2);
            var phone = this.phoneArr[index] + '******' + last;
            return phone;
        },
        // 生成随机天数
        createDate: function() {
            var index = this.getRand(this.dateArr.length - 1);
            return this.dateArr[index];
        },
        tpl: function() {
            var name = this.createName(),
                date = this.createDate(),
                phone = this.createPhone();
            var tpl = '<div class="swiper-slide">';
                tpl += '<span class="name">' + name + '</span>';
                tpl += '<span class="phone-num">' + phone + '</span>';
                tpl += '<span class="date">' + date + '</span>';
                tpl += '</div>';
            return tpl;
        }
    }
    return new Plugin();
}();

// 视频轮播按钮
var videoSBtns = new Swiper('#video-swiper-btns', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 10,
    // 点击自动跳转有Bug 不能自动将按钮暴漏出来
    // slideToClickedSlide: true,
    loop: false
});

// 视频轮播
var videoSlider = new Swiper ('#video-slider', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    on: {
        init: function(){
            var realIndex = this.realIndex;
            $(videoSBtns.slides[realIndex]).addClass('active');
        }, 
      },
    
    // 如果需要分页器
    pagination: {
      el: '.video-swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.video-swiper-button-next',
      prevEl: '.video-swiper-button-prev',
    }
});

videoSlider.on('slideChangeTransitionEnd', function() {
    var realIndex = this.realIndex;
    videoSBtns.slideTo(realIndex, 1000, false);
    $(videoSBtns.slides).removeClass('active');
    $(videoSBtns.slides[realIndex]).addClass('active');
});

$(videoSBtns.slides).on('click', function() {
   $(videoSBtns.slides).removeClass('active');
   $(this).addClass('active');
   var index = $(this).index();
   videoSBtns.slideTo(index)
   videoSlider.slideToLoop(index, 1000, false);
});

// 视频弹窗播放
var videoShow = function() {
    function vShow() {
        this.$showX = $('#video-show-x');
        this.$showV = $('#video-show-v');
        // console.log(this.$showV.attr('src'))
        this.init();
    }
    vShow.prototype = {
        init: function() {
            this.show();
            this.close();
        },
        show: function() {
            var self = this;
            $('.video-show').on('click', function() {
                tool.bodyNoScroll();
                var vSrc = $(this).data('video');
                vSrc = videoPath + vSrc;
                self.$showV.attr('src', vSrc);
                self.$showX.fadeIn(function() {
                    if(firstVideoPlay.isPlaying) {
                        firstVideoPlay.pause();
                    }
                    self.$showV[0].play();
                });
            });
        },
        close: function() {
            var self = this;
            this.$showX.on('click', '.close-video-x', function() {
                self.$showV[0].pause();
                tool.bodyCanScroll();
                self.$showX.fadeOut(function() {
                    self.$showV.attr('src', '');
                });
            });
        }
    }
    return new vShow();
}();

// 表单验证
var formValidate = function() {
    function formVal() {
        this.sameForm = ['#form-a'];
        this.init();
    }
    formVal.prototype = {
        init: function() {
            var self = this;
            this.addMethods();
            $.each(this.sameForm, function(index, item) {
                self.validate(item);
            });
        },
        addMethods: function() {
            jQuery.validator.addMethod("mobile", function (value, element) {
                var mobile = /^1[3|4|5|7|8]\d{9}$/;
                return this.optional(element) || (mobile.test(value));
            }, "请输入正确的手机号格式！");
            
            
            jQuery.validator.addMethod("chinese", function (value, element) {
                var chinese = /^[\u4E00-\u9FFF]+$/;
                return this.optional(element) || (chinese.test(value));
            }, "请输入有效的中文名称！");
        },
        validate: function(formId) {
            // 表单验证
            $(formId).validate({
                // debug: true,
                rules: {
                    area: {
                        required: true,
                        number: true
                    },
                    myname: {
                        required: true,
                        chinese: true,
                        maxlength: 6
                    },
                    phonenum: {
                        required: true,
                        mobile: true
                    },
                    agree: {
                        required: true
                    }
                },
                messages: {
                    area: {
                        required: '您的房屋面积不能为空',
                        number: '房屋面积必须是数字格式！'
                    },
                    myname: {
                        required: '您的姓名不能为空',
                        chinese: '请输入有效的中文名称！',
                        maxlength: '姓名长度不能超过6个字'
                    },
                    phonenum: {
                        required: '您的手机号不能为空',
                        mobile: '请输入正确的手机号格式！'
                    },
                    agree: {
                        required: '请仔细阅读并同意《隐私政策》'
                    }
                },
                errorPlacement: function($error, $input) {
                    var $row = $input.parents('.row');
                    $row.append($error);
                },
                submitHandler: function(form) {
                    // 表单通过验证 向外发送事件
                    var serializeArr = $(form).serializeArray();
                    var obj = tool.getSerializeObj(serializeArr);
                    // 给提交按钮添加等待
                    var $submitBtn = $(form).find('.submit');
                    // 设置按钮不能再次被点击
                    $submitBtn[0].disabled = true;
                    // 触发window上的提交事件
                    $(document).trigger('formSubmit', [obj, $submitBtn[0]]);
                    return false;
                }
            });
        }
    }
    return new formVal();
}();