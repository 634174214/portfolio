let loadImgs = [
        './imgs/baizhantang_chart.png',
        './imgs/baizhantang.png',
        './imgs/baoxiang.png',
        './imgs/bg.png',
        './imgs/border-buttom.png',
        './imgs/border.png',
        './imgs/btn_bg.png',
        './imgs/checkbox.png',
        './imgs/checkbox_choose.png',
        './imgs/close.png',
        './imgs/explain_bg.png',
        './imgs/guofurong.png',
        './imgs/guofurong_chart.png',
        './imgs/index_bg.png',
        './imgs/input_address.png',
        './imgs/input_idcard.png',
        './imgs/input_mobile.png',
        './imgs/input_name.png',
        './imgs/jianqiao.png',
        './imgs/lidazui.png',
        './imgs/lidazui_chart.png',
        './imgs/logo.png',
        './imgs/lvxiucai.png',
        './imgs/lvxiucai_chart.png',
        './imgs/main-title.png',
        './imgs/radio_btn.png',
        './imgs/radio_btn_choose.png',
        './imgs/scroll.png',
        './imgs/share.png',
        './imgs/sword.png',
        './imgs/tongxiangyu.png',
        './imgs/tongxiangyu_chart.png',
        './imgs/wulin.png',
        './imgs/wulin_bg.png',
        './imgs/xiashi.png',

    ]
    // 定义全局变量
let currentIndex = 0;
let lotteryUrl = 'https://ssl.qdxin.cn/h5/2019/ticai'
let isLottery = false; //是否已抽奖
let answers = '', //所有答案的字符串显示
    isFinish = false; //所有题目是否已答完
var myLocation = {}
var city = "",
    btn_disabled = false,
    btn_timer = "";


// 初始化
function init() {
    setTimeout(() => {
        loadImgsProgress().then(() => {
            // 音乐播放
            $('.progress-page').fadeOut()
            $('.page1').fadeIn()
        })
    }, 500);
}

function loadImgsProgress() {
    return new Promise((resolve, reject) => {
        var imgCount = 0;
        var total = loadImgs.length;
        //console.log(total);
        loadImgs.forEach(item => {
            var image = new Image();
            image.onload = function() {
                imgCount++;
                let progress = Math.round((imgCount / total) * 100);
                $('.progress-num').text(progress + '%')
                let total_width = 2;
                let l = total_width * progress / 100 / 2
                let left = (0.2 + l) + 'rem';
                $('.jian').css('left', left);
                $('.jianqiao').css('left', -l + 'rem');
                // that.progress = progress;
                // console.log("已经加载了" + left);

                // that.$loadTxt.text(parseInt(imgCount / total * 100) + '%');
                if (total - 2 <= imgCount) {
                    setTimeout(() => {
                        // that.isLoadingFinish = true;
                        resolve()
                    }, 500);
                    // console.log("全部图片加载完成");
                }
            };
            image.src = item;
        });
    })

}

var layer = function(msg) {
    var $layer = $(".layer-msg");
    $layer.find("p").text(msg);
    $layer.fadeIn(600);
    setTimeout(function() {
        $layer.fadeOut(600);
    }, 1500);
};
window.onload = function() {
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke(
            "getNetworkType", {},
            function(e) {
                playMusic();
                init()
            },
            false
        );
    } else {
        document.addEventListener(
            "WeixinJSBridgeReady",
            function() {
                WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                    playMusic();
                    init()
                });
            },
            false
        );
    }
    configLottery()

    let screenHeight = document.documentElement.clientHeight;
    // alert(screenHeight)
    if (screenHeight > 650) {
        // 就算是iphonex手机
        $('.juanzhou').css('top', '4.3rem')
        $('.xaishi').css({
            'width': '3.1rem',
            'margin-left': '-1.55rem'
        })
        $('.btns').css('bottom', '1.5rem')
        $('.jieshao').css({
            'line-height': '.56rem',
            "top": "42%"
        })
        $('.main-title').css('top', '1.9rem')
        $('.logo').css('top', '0.64rem')
        $('.wulin-logo ').css('top', '2.77rem')
            // $('.scroll').css('top', '0.64rem')
    }

}

var musicStatus = false;

function playMusic() {
    var player = $('#bgMusic')[0];
    musicStatus = !musicStatus;
    // console.log(player);

    if (musicStatus == false) {
        player.pause();
        $('#music').removeClass('xuanzhuan')
    } else {
        player.play();
        $('#music').addClass('xuanzhuan')
    }
}

function closeRole() {
    $('.role-box').removeClass('zoomIn')
    $('.role-box').addClass('zoomOut')
    $('.role-box').hide()
    $('.cover').fadeOut()
}

function showRole() {
    $('.role-box').show()
    $('.role-box').addClass('zoomIn')
    $('.role-box').removeClass('zoomOut')
    $('.cover').fadeIn()
}

function closeForm() {
    $('.form_wrap').fadeOut()
    $('.cover').fadeOut()
}

function showForm() {
    $('.form_wrap').fadeIn()
    $('.cover').fadeIn()
}

function share() {
    $('.share').fadeIn()
    $('.share_cover').fadeIn();
}

function closeCover() {
    $('.share_cover').fadeOut()
    $('.share').fadeOut()
}

function checkAnswer() {
    if (currentIndex == questions.length - 1) {
        if (!isFinish) {
            isFinish = true;
        } else {
            return true
        }
    }
    // 判断input类型
    if (questions[currentIndex].type == 'radio') {
        if (!$('input:radio:checked').val()) {
            // alert('请先选择答案')
            isFinish = false;
            layer('请先选择答案')
            return false
        }
        answers += $('input:radio:checked').val() + '|'
    } else {
        var id_array = new Array();
        $('input[name="q0"]:checked').each(function() {
            id_array.push($(this).val()); //向数组中添加元素
        });
        console.log(id_array)
        if (id_array.length == 0) {
            layer('请先选择答案')
            isFinish = false;
            return false
        }
        answers += id_array.join('，') + '|'
    }
    console.log(answers);
    //如果所有题目都答完了，则进行提交答案。
    if (isFinish) {
        var form = new FormData();
        form.append("data[name]", "hgf");
        form.append("data[mobile]", "15888275655");
        form.append("data[field_1]", answers);
        form.append("id", activity_id);

        var settings = {
            "url": "https://ssl.qdxin.cn/h5/2019/ticai/submit.php",
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }

        $.ajax(settings).done(function(response) {
            console.log(response);
        });
    }
    return true
}
// 下一题
function next() {
    if (btn_disabled) {
        return;
    }
    btn_disabled = true
    btn_timer = setTimeout(() => {
        btn_disabled = false;
    }, 1100);
    if (!checkAnswer()) {
        return
    }
    $('.next').addClass('rubberBand')
    setTimeout(() => {
        $('.next').removeClass('rubberBand')
    }, 1000);
    currentIndex++;
    console.log(currentIndex);
    // 答完了
    if (currentIndex == questions.length - 1) {
        console.log('答完了');
        $('.next').addClass('hidden')
        $('.finish').removeClass('hidden')
    }
    if (currentIndex >= 5) {
        $('.baoxaing').children('img').eq(0).attr('src', './imgs/baoxiang.png')
        $('.progress-value').children('span').eq(0).css('color', '#BD2800')
        $('.baoxaing').children('img').eq(0).addClass('heartBeat')
        $('.circle1').addClass('active')
        let p = Math.round((currentIndex - 4) / 21 * 100) + '%';
        $('.progress-line-inner').css('width', p)
        if (currentIndex == 11) $('.progress-line-inner').css('width', '35%')
        if (currentIndex == 18) $('.progress-line-inner').css('width', '67%')
    }
    if (currentIndex >= 11) {
        // 稍稍延迟显示
        setTimeout(() => {
            $('.baoxaing').children('img').eq(1).attr('src', './imgs/baoxiang.png')
            $('.progress-value').children('span').eq(1).css('color', '#BD2800')
            $('.baoxaing').children('img').eq(1).addClass('heartBeat')
            $('.circle2').addClass('active')
        }, 200);

    }
    if (currentIndex >= 18) {
        // 稍稍延迟显示
        setTimeout(() => {
            $('.baoxaing').children('img').eq(2).attr('src', './imgs/baoxiang.png')
            $('.progress-value').children('span').eq(2).css('color', '#BD2800')
            $('.baoxaing').children('img').eq(2).addClass('heartBeat')
            $('.circle3').addClass('active')
        }, 200);

    }
    if (currentIndex >= 25) {
        $('.baoxaing').children('img').eq(3).attr('src', './imgs/baoxiang.png')
        $('.progress-value').children('span').eq(3).css('color', '#BD2800')
        $('.baoxaing').children('img').eq(3).addClass('heartBeat')
        $('.circle4').addClass('active')
        $('.progress-line-inner').css('width', '100%')
    }
    appendChild(currentIndex)

}

// 动态插入题目
function appendChild(currentIndex) {
    $('.question').removeClass('fadeIn')
    $('.question').addClass('fadeOut')
    $('.q-list').removeClass('fadeIn')
    $('.q-list').addClass('fadeOut')
    setTimeout(() => {
        // 改变内容
        $('.question').text(questions[currentIndex].q);
        $('.q-list').empty()
        let opts = questions[currentIndex].opts
        opts.forEach((item, i) => {
            $('.q-list').append(`
            <div class="q-item no_copy">
                <input type="${questions[currentIndex].type}" name="q0" id="q${i}" value="${item.val}" hidden>
                <label for="q${i}" class="no_copy" onclick="">${item.name}</label>
            </div>
        `)
        });
        $('.question').removeClass('fadeOut')
        $('.question').addClass('fadeIn')
        $('.q-list').removeClass('fadeOut')
        $('.q-list').addClass('fadeIn')
    }, 500);

}

// 开始答题
function start() {
    $('.page1').fadeOut()
    $('.answer').fadeIn()
    appendChild(0)
}

// 初始化抽奖系统
function configLottery(params) {
    $.ajax({
        type: 'post',
        async: false,
        url: lotteryUrl + '/v1/common/config',
        headers: {
            "Authorization": 'Bearer ' + token
        },
        dataType: 'json',
        success: function(res) {
            console.log(res)
            if (res.errorcode === 0) {
                if (res.data.lottery && res.data.lottery === 1) {
                    isLottery = true; // 已中奖
                    console.log('已中奖');
                }
            }
        },
        error: function(error) {
            alert('初始化失败，请刷新重试');
        },
        complete: function() {}
    });
}

// 抽奖
function getLotter() {
    if (!checkAnswer()) {
        return
    }
    $('.loading-box').show()
        // if (city != '青岛市') {
        //     setTimeout(() => {
        //         $('answer').hide()
        //         $('.result').show()
        //         $('.baizhantang').fadeIn()
        //         $('.s_person').attr('src', './imgs/baizhantang.png')
        //         window.shareData.tTitle = "我是传说中劫富济贫行侠仗义的大侠，来和我一起守护这个江湖拿大奖！"
        //         $('.loading-box').hide()

    //     }, 500);
    //     return
    // }

    $.ajax({
        url: lotteryUrl + '/v1/common/draw',
        type: 'post',
        data: {
            "lat": myLocation.lat,
            "lng": myLocation.lon
        },
        headers: {
            "Authorization": 'Bearer ' + token
        },

        dataType: 'json',
        success: function(res) {
            $('.loading-box').hide()
            console.log(res)
            window.localStorage.setItem('lotteryTime', new Date().getDate())
            if (res.errorcode === 0) {
                $('answer').hide()
                $('.result').show()
                if (res.data.lottery === 1) {
                    // alert('ok');
                    // 中奖了
                    if (res.data.detail.name) {
                        $('.result-award').text(`恭喜您获得${res.data.detail.name}`)
                        $('.award').text('获得' + res.data.detail.name)
                        if (res.data.detail.name == '新秀丽美旅拉杆箱') {
                            $('.lvxiucai').fadeIn()
                            $('.s_person').attr('src', './imgs/lvxiucai.png')
                            window.shareData.tTitle = "我当个帐房书生却乐得清闲，闯关成功惊喜抽中新秀丽美旅拉杆箱！"
                        } else if (res.data.detail.name == '羽毛球拍套装') {
                            $('.lidazui').fadeIn()
                            $('.s_person').attr('src', './imgs/lidazui.png')
                            window.shareData.tTitle = "我是坚信勤能补拙天道酬勤的好厨子，闯关成功惊喜抽中羽毛球拍套装！"
                        } else if (res.data.detail.name == '迪卡侬背包') {
                            $('.tongxiangyu').fadeIn()
                            $('.s_person').attr('src', './imgs/tongxiangyu.png')
                            window.shareData.tTitle = "我是从小锦衣玉食命运坎坷的镖局千金，闯关成功惊喜抽中迪卡侬背包！"
                        } else if (res.data.detail.name == '毛巾礼盒') {
                            $('.guofurong').fadeIn()
                            $('.s_person').attr('src', './imgs/guofurong.png')
                            window.shareData.tTitle = "我是渴望行侠仗义但随性自在的江湖侠女，闯关成功惊喜抽中毛巾礼盒！"
                        }
                    }
                    isLottery = true; // 已中奖
                } else {
                    // 未中奖

                    $('.baizhantang').fadeIn()
                    $('.s_person').attr('src', './imgs/baizhantang.png')
                    window.shareData.tTitle = "我是传说中劫富济贫行侠仗义的大侠，来和我一起守护这个江湖拿大奖！"
                }
            } else {
                // alert('抽奖失败');
                layer(res.msg ? res.msg : '您已参与过抽奖')
            }
        },
        error: function() {
            // alert('抽奖失败');
            layer(res.msg ? res.msg : '抽奖失败')
            console.error('抽奖失败');
            $('.loading-box').hide()
        },
        complete: function() {

        }
    });
}

function checkForm() {
    var name = $('input[name="name"]').val()
    var idcard = $('input[name="idcard"]').val()
    var mobile = $('input[name="mobile"]').val()
    var address = $('input[name="address"]').val()
    console.log(name);
    if (!name) {
        layer("未填写姓名");
        return false;
    } else if (!valTel(mobile) || !valIdCard(idcard)) {
        return
    } else if (!address) {
        layer("未填写邮寄地址");
        return
    }
    var url = lotteryUrl + '/v1/common/info';

    let params = {
        user_name: name,
        user_phone: mobile,
        user_desc: address + ' ' + idcard,
    }

    $('.loading-box').show()

    // return
    $.ajax({
        type: 'post',
        url: url,
        data: params,
        dataType: "json",
        headers: {
            "Authorization": 'Bearer ' + token
        },
        success: function(res) {
            $('.loading-box').hide();
            if (res.errorcode === 0) {
                window.sessionStorage.setItem('market_token', '');
                layer('提交成功！')
                setTimeout(function() {
                    $('.form_wrap').hide()
                    $('.get-award').hide()
                    $('.share-btn').css('display', 'flex');
                    $('.cover').hide();
                }, 2000)
            } else {
                // alert('提交失败')
                layer(res.msg ? res.msg : '提交失败')
            }
        },
        error: function(res) {
            $('.loading-box').hide();
            layer('提交失败，请重试！');
        },
        complete: function() {

        }
    })
}

function valTel(val) {
    var tel = $.trim(val);
    var TEL_REG = /^1(2|3|4|5|6|7|8|9)\d{9}$/; // 手机正则
    if (tel) {
        if (!TEL_REG.test(tel)) {
            layer("手机号码格式不正确");
            return false;
        }
    } else {
        layer("未填写手机号码");
        return false;
    }
    return true;
}

function valIdCard(val) {
    var tel = $.trim(val);
    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/; // 手机正则
    if (tel) {
        if (!reg.test(tel)) {
            layer("身份证格式不正确");
            return false;
        }
    } else {
        layer("未填写身份证号");
        return false;
    }
    return true;
}


/*获取地理位置 开始*/
function getLocation() {
    return new Promise((resolve, reject) => {
        var options = {
            // timeout: 30000,
            // enableHighAccuracy: true,
            // maximumAge: 1000
        };
        if (navigator.geolocation) {
            //浏览器支持geolocation
            navigator.geolocation.getCurrentPosition((position) => {
                var longitude = position.coords.longitude;
                var latitude = position.coords.latitude;
                myLocation = {
                    lon: longitude,
                    lat: latitude
                }
                resolve()
            }, (error) => {
                // console.log(1);
                console.log(error);
                switch (error.code) {
                    case 1:
                        alert("位置服务被拒绝");
                        break;
                    case 2:
                        alert("暂时获取不到位置信息");
                        break;
                    case 3:
                        alert("获取信息超时");
                        break;
                    case 4:
                        alert("未知错误");
                        break;
                }
                reject(error)
            }, options);
        } else {
            //浏览器不支持geolocation
            console.log('浏览器不支持geolocation');
        }
    })

}




var lightenMyCity = function() {
    var keyList = [
        'ZV4BZ-KGY3Q-7SF5T-GMNMQ-JQEQJ-U5BCD'
    ];
    var keyIndex = parseInt(Math.random() * keyList.length); // parseInt(Math.random()*(max-min+1)+min,10)
    var subData = {
        location: myLocation.lat + ',' + myLocation.lon,
        // location: 39 + ',' + -97,
        /*换成自己申请的key*/
        key: keyList[keyIndex],
        get_poi: 0
    };
    console.log(subData.key);
    var url = "//apis.map.qq.com/ws/geocoder/v1/?";
    var nationName, cityName;
    subData.output = "jsonp";

    $.ajax({
        type: "get",
        dataType: 'jsonp',
        data: subData,
        jsonp: "callback",
        jsonpCallback: "QQmap",
        url: url,
        success: function(res) {
            console.log(res);
            if (res.status == 0) {
                city = res.result.ad_info.city ? res.result.ad_info.city : res.result.address_component.city;
                console.log(city);

            }

        },
        error: () => {

        }
    })
}

setTimeout(() => {
    getLocation().then(() => {
        lightenMyCity();
    })
}, 3000);