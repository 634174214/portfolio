'use strict';

// sanSong

var bgImgData = null;
var envelopBgData = null;
var titleImgData = null;
var codeImgData = null;

var sanSong = function sanSong() {
    this.init();
    this.initDom();
    this.initEvent();
};

// 获取字符串的真实长度（字节长度）
function getTrueLength(str) {
    var len = str.length,
        truelen = 0;
    for (var x = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
            truelen += 2;
        } else {
            truelen += 1;
        }
    }
    return truelen;
}
//按字节长度截取字符串，返回substr截取位置
function cutString(str, leng) {
    var len = str.length,
        tlen = len,
        nlen = 0;
    for (var x = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
            if (nlen + 2 <= leng) {
                nlen += 2;
            } else {
                tlen = x;
                break;
            }
        } else {
            if (nlen + 1 <= leng) {
                nlen += 1;
            } else {
                tlen = x;
                break;
            }
        }
    }
    return tlen;
}

function drawText(ctx, opts) {
    var str = typeof opts.str === 'string' ? opts.str : '';
    var posT = opts.posT || 0;
    var posL = opts.posL || 0;
    var lineWordNum = typeof opts.lineWordNum === 'number' ? opts.lineWordNum * 2 : 5 * 2;
    var maxWidth = typeof opts.lineWidth === 'number' ? opts.lineWidth : 750;
    var fontTxt = opts.fontTxt || '20px Microsoft YaHei';
    var lineHeight = typeof opts.lineHeight === 'number' ? opts.lineHeight : 22;
    var color = typeof opts.color === 'string' ? opts.color : 'white';
    var oneLineStr = '';
    var oneLineStrLength = 0;
    var deviL = 0;
    ctx.fillStyle = color;
    ctx.font = fontTxt;
    for (var i = 0; getTrueLength(str) > 0; i++) {
        oneLineStrLength = cutString(str, lineWordNum);
        oneLineStr = str.substr(0, oneLineStrLength);
        deviL = (lineWordNum - getTrueLength(oneLineStr)) * (maxWidth / lineWordNum) / 2;
        ctx.fillText(oneLineStr, posL + deviL, posT + i * lineHeight, maxWidth);
        str = str.substr(oneLineStrLength);
    }
}
function successCallback() {}
sanSong.prototype = {
    init: function init() {

        document.body.addEventListener('touchstart', function () {});
        window.onresize = function () {
            var height = $(document).height();
            var h = (height - 667) / 2 + 29;
            $('#content').css({
                'height': height + 'px',
                'padding-top': h + 'px'
            });
        };
        var height = $(document).height();
        var h = (height - 667) / 2 + 29;
        $('#content').css({
            'height': height + 'px',
            'padding-top': h + 'px'
        });
        // 输入框BUG
        $('input').on('blur', function () {
            if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(navigator.userAgent)) {
                window.scrollTo(0, window.document.body.scrollTop);
                // window.document.body.scrollTop = window.document.body.scrollHeight;
            }
        });

        var bgImg = new Image();
        bgImg.crossOrigin = '';
        bgImg.onload = function () {
            bgImgData = bgImg;
        };
        bgImg.src = 'imgs/bg.jpg';

        var envelopBg = new Image();
        // envelopBg.setAttribute('crossOrigin', 'anonymous');
        envelopBg.crossOrigin = '';
        envelopBg.onload = function () {
            envelopBgData = envelopBg;
        };
        envelopBg.src = 'imgs/envelop-bg.png';

        var titleImg = new Image();
        // envelopBg.setAttribute('crossOrigin', 'anonymous');
        titleImg.crossOrigin = '';
        titleImg.onload = function () {
            titleImgData = titleImg;
        };
        titleImg.src = 'imgs/top-title.png';

        var code = new Image();
        // envelopBg.setAttribute('crossOrigin', 'anonymous');
        code.crossOrigin = '';
        code.onload = function () {
            codeImgData = code;
        };
        code.src = 'imgs/songs-code.png';
    },
    initDom: function initDom() {
        this.$writeSong = $('.write-song');
        this.$saveSong = $('.save-song');
        this.$loading = $('.loading-box'); // loading
    },

    // loading
    showLoading: function showLoading(msg) {
        var that = this;
        that.$loading.find('.text').text(msg);
        that.$loading.show();
    },

    // loadingClose
    closeLoading: function closeLoading() {
        var that = this;
        that.$loading.hide();
    },
    initEvent: function initEvent() {
        var that = this;
        this.$writeSong.on('click', '.save-btn', function () {
            that.saveSongs();
        });
        this.$saveSong.find('#saveLayer').on('click', function () {
            $(this).fadeOut();
        });
    },
    saveSongs: function saveSongs() {
        /**
         * 获取情诗以及个人信息数据
         * */
        var that = this;
        var $songs = that.$writeSong.find('.song-inputs input');
        var songs = [];
        for (var _i = 0; _i < $songs.length; _i++) {
            if (!$songs[_i].value) {
                alert('请输入您的三行情诗');
                return;
            }
            songs.push($songs[_i].value);
        }
        var year = that.$writeSong.find('.year input').val();
        if (!year) {
            alert('请输入您的毕业年份');
            return;
        }
        var grade = that.$writeSong.find('.grade input').val();
        if (!grade) {
            alert('请输入您的班级');
            return;
        }
        var name = that.$writeSong.find('.name input').val();
        if (!name) {
            alert('请输入您的姓名');
            return;
        }
        that.$saveSong.find('.songs').html('');
        for (var i = 0; i < songs.length; i++) {
            that.$saveSong.find('.songs').append('<p>' + songs[i] + '</p>');
        }
        that.$saveSong.find('.info .year').text(year);
        that.$saveSong.find('.info .grade').text(grade);
        that.$saveSong.find('.info .name').text(name);

        var info = {
            year: year,
            grade: grade,
            name: name
        };
        that.drawSongs(songs, info, function () {
            that.submit(songs, info, function () {
                // 提交成功的回调
                that.$writeSong.fadeOut(function () {
                    that.$saveSong.fadeIn();
                    that.$saveSong.find('#saveLayer').fadeIn();
                    var hideIt = setTimeout(function () {
                        that.$saveSong.find('#saveLayer').fadeOut();
                        clearTimeout(hideIt);
                    }, 1500);
                });
            });
        });
    },
    drawSongs: function drawSongs(songs, info, cb) {
        var that = this;
        /***
         * 利用canvas画出情诗，以供保存
         */
        var songCanvas = document.getElementById('songCanvas');

        var ctx = songCanvas.getContext('2d');
        ctx.fillStyle = "#ddb274";
        ctx.fillRect(0, 0, songCanvas.width, songCanvas.height);

        // 页面背景
        ctx.drawImage(bgImgData, 0, 0, songCanvas.width, songCanvas.height);

        // 信封
        ctx.drawImage(envelopBgData, 42, 161, 666, 993);

        // title
        ctx.drawImage(titleImgData, 132, 58, 485, 50);

        // 二维码
        ctx.drawImage(codeImgData, 312, 686, 138, 160);

        // 情书绘制
        for (var i = 0; i < songs.length; i++) {
            drawText(ctx, {
                str: songs[i],
                lineWidth: 474,
                lineWordNum: 15, // 一行中文的长度
                posT: 244 + i * 77, // 距离画布顶部的距离
                posL: 147, // 距离画布左边的距离
                fontTxt: 'bolder ' + 30 + 'px Microsoft YaHei', // 字体样式
                lineHeight: 77, // 行高
                color: '#333' //颜色
            });
        }

        // 个人信息
        ctx.fillStyle = '#333';
        // ctx.font = 'italic small-caps normal ' + 26 + 'px';
        ctx.font = 26 + 'px Microsoft YaHei';
        ctx.fillText('毕业年份：' + info.year, 350, 244 + 3 * 77, 260);

        ctx.fillText('班       级：' + info.grade, 350, 244 + 4 * 77, 260);

        ctx.fillText('姓       名：' + info.name, 350, 244 + 5 * 77, 260);

        that.$saveSong.find('.songs-res-img').attr('src', songCanvas.toDataURL('jpg', 0.8));
        cb();
    },

    // 处理提交结果
    // 数据提交
    submit: function submit(songs, info, cb) {
        var that = this;
        that.showLoading('生成中...');
        var url = 'https://qd.sina.com.cn/person/wbin/3-middles-chool/haibao/submit/index.php?id=' + actid;
        var formData = {
            mobile: '17609491111',
            name: info.name,
            field_1: info.year,
            field_2: info.grade,
            field_3: songs.join('；')
        };
        var signUp = $.ajax({
            cache: true,
            type: 'get',
            url: url,
            data: {
                id: actid,
                data: formData,
                callback: successCallback
            },
            dataType: 'json',
            async: false,
            timeout: 3000,
            success: function success(res) {
                that.closeLoading();
                // console.log(data);
                if (res.result === 'success') {
                    cb();
                } else {
                    alert(res.result);
                }
            },
            error: function error(data) {
                console.log(data);
                alert('生成失败请重试！');
            },
            complete: function complete(XMLHttpRequest, status) {
                that.closeLoading();
                if (status === 'timeout') {
                    // 超时,status还有success,error等值的情况
                    signUp.abort();
                    alert("生成失败请重试");
                }
            }
        });
    }
};