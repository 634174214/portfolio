(function ($,bgMove) {
    'use strict';
    var pageSwiper,
        baseUrl =  '../img/',
        animate = {}; // 动画

    /*
     * 允许滑动
     * elem:要滑动的元素 $('.elem')
     * */
    var startTouch = function (elem) {
        var startScroll, touchStart, touchCurrent;

        elem.on('touchstart', function(e) {
            startScroll = this.scrollTop;
            touchStart = e.targetTouches[0].pageY;
        });

        elem.on('touchmove', function(e) {
            touchCurrent = e.targetTouches[0].pageY;
            var touchesDiff = touchCurrent - touchStart;
            var slide = this;
            var onlyScrolling =
                (slide.scrollHeight > slide.offsetHeight) && //allow only when slide is scrollable
                (
                    (touchesDiff < 0 && startScroll === 0) || //start from top edge to scroll bottom
                    //( touchesDiff > 0 && startScroll === ( slide.scrollHeight - slide.offsetHeight ) ) || //start from bottom edge to scroll top
                    (touchesDiff > 0 && startScroll > touchesDiff) ||
                    (startScroll > 0 && startScroll + 1 < (slide.scrollHeight - slide.offsetHeight)) //start from the middle
                );
            if(onlyScrolling) {
                e.stopPropagation();
            }
            if(touchesDiff < -50) {
                // 上拉加载
                // e.stopPropagation();
                // $(".dreamer .special").fadeOut();
                // $(".dreamer .bottom-line").fadeOut();
                // $(".dreamer .dream-list").css("height", "75%");
            }
            if(touchesDiff > 0) {
                // e.stopPropagation();
                // $(".dreamer .dream-list").css("height", "60%");
                // $(".dreamer .special").fadeIn();
                // $(".dreamer .bottom-line").fadeIn();
            }
        });
    }

    var Page = function () {
        $('.container').fadeIn();
        $('.navigation-btn').delay(300).fadeIn();
        // var that = this
        this.init();
    };

    // init
    Page.prototype.init = function () {
        var that = this;
        that.initDom();
        that.initEvent();
    };

    // DOM
    Page.prototype.initDom = function () {
        this.$live = $('.section.live');
        this.$menuBtn = $('.menu-btn');
        this.$menuPage = $('.menu-page');
        this.$closeMenuBtn = $('.close-menu-btn');
        this.$item1 = this.$menuPage.find('.item1');
        this.$item2 = this.$menuPage.find('.item2');
        this.$item3 = this.$menuPage.find('.item3');
    };

    // alert
    Page.prototype.alert = function (str,status) {
        var that = this;
        that.$alert.html(str)
        that.$alert.fadeIn(200);
        setTimeout(function() {
            that.$alert.fadeOut(200);
        },1300)
    };

    // event
    Page.prototype.initEvent = function () {
        var that = this;

        // 允许滑动
        startTouch(that.$live.find('.sch-list'));
        startTouch(that.$live.find('.live_list'));
        // 开始
        pageSwiper = new Swiper('.container .swiper-container', {
            // autoplay: 2000,
            // loop: true,
            // lazyLoading : true,
            direction : 'vertical',
            loop: false,
            effect : 'fade', // 切换效果
            fade: {
                crossFade: true,
            },
            onSlideChangeStart: function(swiper){
                // console.log(swiper.activeIndex);
            }
        });

        //菜单
        this.$menuBtn.on('click',function () {

            that.$menuBtn.fadeOut();
            that.$menuPage.fadeIn();
            that.$menuPage.addClass('show');

        });
        //关闭菜单
        this.$closeMenuBtn.on('click',function () {

            that.$menuPage.fadeOut();
            that.$menuBtn.fadeIn();
            that.$menuPage.removeClass('show');

        });

        this.$menuPage.on('click',function () {
            that.$menuPage.fadeOut();
            that.$menuBtn.fadeIn();
            that.$menuPage.removeClass('show');
        });


        //嘉宾介绍
        var guestSwiper = new Swiper('.guest-container',{
            direction: 'horizontal',
            slidesPerView:'auto',
            pagination : '.guest-pagination',
            onSlideChangeEnd: function (swiper) {
                // console.log(swiper.activeIndex);
                if (swiper.activeIndex === 5) {
                    guestSwiper.lockSwipeToNext();
                }else {
                    guestSwiper.unlockSwipeToNext();
                }
            }
        });

        //点击导航
        this.$item1.on('click', function () {
            pageSwiper.slideTo(0);
            that.$menuPage.fadeOut();
            that.$menuBtn.fadeIn();
            that.$menuPage.removeClass('show');
        });

        this.$item2.on('click', function () {
            pageSwiper.slideTo(1);
            that.$menuPage.fadeOut();
            that.$menuBtn.fadeIn();
            that.$menuPage.removeClass('show');
        });

        this.$item3.on('click',function () {
            pageSwiper.slideTo(2);
            that.$menuPage.fadeOut();
            that.$menuBtn.fadeIn();
            that.$menuPage.removeClass('show');
        });
    };

    var Live =  function () {
        this.init();
    };
    var loadingmore = false;
    Live.prototype =  {
        init: function () {
            this.$live = $('.section.live');
            this.config = window.liveConfig;
            this.videoResult = {};

            var nowTime = ((new Date()).getTime()) / 1000;
            var liveTime = (new Date(this.config.day + ' ' + this.config.start).getTime()) / 1000;
            this.leafTime = parseInt(liveTime) - parseInt(nowTime);

            this.pullDown();
            this.initLiveContent();
            this.getImgText();
            this.initVideo();
            this.isMore = true;
            this.isPull = true;
            var _this = this;
            var interRefash = setInterval(function() {
                var scrollTop = _this.$live.find('.live_list').scrollTop();
                // if (!_this.isMore) {
                //     clearInterval(interRefash);
                //     return false;
                // }
                if (scrollTop <= 5) {
                    _this.refreshData();
                }
            }, 1000);
        },
        initLiveContent: function () {
            // 开始时间
            var config = this.config;
            $('.live .live-time').html(config.day + ' ' + config.start.slice(0,5) + '-' + config.end.slice(0,5));
        },
        initVideo: function () {
            var width = this.$live.find('.video').width();
            var height = this.$live.find('.video').height();
            this.initLiveShowData(width, height);
        },
        initLiveShowData: function (w,h) {
            // 直播流数据
            var _this = this;
            _this.videoResult = 'media/xin.mp4';
            // 视频初始化
            _this.initLive(w,h);
            // $.ajax({
            //     url: '//vod.qtv.com.cn/szoiwerw/data?tid=506&appid=10001009&otype=json&appkey=c5a3e1529a7ba805&idlist=' + _this.config.pid,
            //     dataType: 'jsonp'
            // }).done(function(t) {
            //     if(t.errorno !== 0) {
            //         console.log(t.errormsg);
            //         return;
            //     }
            //     if(t.results && t.results.length > 0) {
            //         for(var i = 0; i < t.results.length; i++) {
            //             if (t.results[i].id === _this.config.pid) {
            //                 _this.videoResult = t.results[i];
            //                 // 视频初始化
            //                 _this.initLive(w,h);
            //             }
            //         }
            //     }
            // }).fail(function() {
            // });
        },
        initLive: function(w, h) {
            /*
             * 直播状态说明
             * 1 直播中
             * 3 直播前
             * 4 提前开始的直播且已结束 未生成回看视频
             * 5 直播结束 已生成回看视频
             * */
            var _this = this;
            var videoResult = _this.videoResult;
            // 手动设置不让他过期
            _this.leafTime = 100;
            // console.log(w,h)
            // console.log(_this.leafTime)
            // console.log(_this.config.bid)
            // 有直播id 和 直播数据
            if (_this.leafTime >=0) {
                // 预热视频
                _this.noLive(_this.config.bid, w, h);
                _this.$live.find('.tabs').hide();
                _this.$live.find('.sch-tabs').show();
            } else if(videoResult && videoResult.fields) {
                if(videoResult.fields.playing_status === 1) {
                    // 直播
                    _this.live(videoResult.fields.stream_id, w, h);
                } else if(videoResult.fields.playing_status === 5) {
                    // 回放（直播生成的vid）
                    _this.noLive(videoResult.fields.live_vid, w, h);
                } else {
                    var timeEleLiveStartTime = _this.getDateFromVedioSystemStr(videoResult.fields.start_time);
                    var timeEleLiveEndTime = _this.getDateFromVedioSystemStr(videoResult.fields.end_time);
                    var systemTime = new Date().getTime();
                    var diffTime = timeEleLiveStartTime - systemTime;
                    var diffTime2 = systemTime - _this.getDateFromVedioSystemStr(videoResult.fields.end_time);
                    if(diffTime > 0) {
                        // console.log('直播未开始');
                        // _this.clickAlertStr = '直播未开始';
                        // $('.not-begin').show();
                        _this.noLive(_this.config.bid, w, h);
                        setTimeout(_this.initLiveShowData, diffTime);
                    } else if(diffTime2 > 0) {
                        if (_this.config.aid) {
                            // 自己生成回放id
                            _this.noLive(_this.config.aid,w,h);
                            return false;
                        }
                        // _this.clickAlertStr = '回放正在生成中，敬请期待';
                        // $('.not-begin').show();
                    }
                }
            }
        },
        noLive: function(vId, w, h) {
            /* 回放 */
            // var player = new Txplayer({
            //     containerId: 'videoBox',
            //     vid: vId,
            //     width: w,
            //     height: h,
            //     autoplay: false
            // });
            console.log(w,h)
            var videoEl = `<video src="media/xin.mp4" controls="controls" style="width:100%;height:100%;"></video>`
            $('#videoBox').append($(videoEl));
        },
        live: function (vid, w, h) {
            /* 直播 */
            var config = {
                containerId: 'videoBox',
                vid: vid,
                livepid: '',
                width: w,
                height: h,
                autoplay: false
            };
            var player = new TxvLive(config);
            player.on('ready', function () {
                // 准备完成开始播放
            });
        },

        // 图文直播相关
        getDateFromVedioSystemStr: function(str) {
            var reg = /^(\d{4})-(\d{1,2})-(\d{1,2}) *(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (!str) {
                return null;
            }
            str = $.trim(str);
            var match = str.match(reg);
            if (!match) {
                return null;
            }
            var y = parseInt(match[1]);
            var M = parseInt(match[2] - 1);
            var d = parseInt(match[3]);
            var h = parseInt(match[4]);
            var m = parseInt(match[5]);
            var s = parseInt(match[6]);
            return new Date(y, M, d, h, m, s).getTime();
        },

        getImgText: function () {
            /* 获取图文直播数据 */
            var _this = this;
            var imgs = [
                'imgs/0.jpg',
                'imgs/1.png',
                'imgs/2.png',
                'imgs/3.png',
                'imgs/4.png',
                'imgs/5.png',
                'imgs/6.png',
                'imgs/7.png',
                'imgs/8.png',
                'imgs/9.png',
                'imgs/10.png'
            ];
             var msg = '';
             $.each(imgs, function(index, item) {
                msg += '<img style="width: 100%;margin: auto" src="' + item + '">';
             });
            _this.$live.find('.live_list').append(msg);
            // var url = '//vod.qtv.com.cn/getRoseMsgByRoseIdOpen?roseid=' + this.config.imgTextId + '&topid=&lastid=&getOrig=0&refer=cmseditor';
            // $.ajax({
            //     url: url,
            //     dataType: "jsonp",
            //     jsonpCallback: "callback",
            //     success: function (res) {
            //         if (res.content.live_room.top.length === 0 || res.content.live_room.new.length) {
            //             var msg = '<img style="width: 100%;margin: auto" src="imgs/149297109.jpg">';
            //             _this.$live.find('.live_list').append(msg);
            //         } else {
            //             _this.$live.find('.live_list').append(_this.initImgText(res, false));
            //         }
            //     }
            // });
        },

        pullDown: function() {
            /* 下拉加载更多 */
            var _this = this;
            var $live_list = _this.$live.find('.live_list')
            _this.$live.find('.live_list').on('scroll', function() {
                if(!_this.isPull) {
                    return false;
                }
                if(loadingmore) {
                    return false;
                }
                // if(window.isLoading) {
                //     return;
                // }

                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if((scrollHeight + 100) >= windowHeight) {
                    window.loadTimeout && clearTimeout(window.loadTimeout);
                    window.loadTimeout = setTimeout(function() {
                        // 获取上一条id
                        var id = $live_list.find('li').eq($live_list.find('li').length - 1).attr("id");
                        if (!id) {
                            return;
                        }
                        loadingmore = true;
                        // $.ajax({
                        //     url: "//vod.qtv.com.cn/getRoseMsgByRoseIdOpen?roseid=" + _this.config.imgTextId + "&topid=&lastid=" + id + "&getOrig=0&refer=cmseditor",
                        //     dataType: "jsonp",
                        //     jsonpCallback: "callback",
                        //     success: function (res) {
                        //         if (res.content.live_room.bnext == 0) {
                        //             _this.moreData(res);
                        //             _this.$live.find('.live_list').append('<p class="more-item">没有更多了</p>');
                        //             _this.isPull = false;
                        //             return false;
                        //         }
                        //         _this.moreData(res);
                        //     },
                        //     complete: function() {
                        //         loadingmore = false;
                        //     }
                        // });
                    }, 300);
                }
            });
        },

        moreData: function(res) {
            // 加载更多
            var _this = this;
            _this.$live.find('.live_list').append(_this.initImgText(res, false));
            /*myScroll.refresh()
            if (ret.content.live_room.bnext == 0) {
                $(".pullUpLabel").html("无更多数据.....");
                $('.more_message').hide();
            }*/
        },
        refreshData: function() {
            /* 获取直播最新数据
             * topid:上一条id
             */
            var _this = this;
            var id = _this.$live.find(".live_list>li").eq(0).attr("id");
            // $.ajax({
            //     url: "//vod.qtv.com.cn/getRoseMsgByRoseIdOpen?roseid=" + _this.config.imgTextId + "&topid=" + id + "&lastid=&getOrig=0&refer=cmseditor",
            //     dataType: "jsonp",
            //     jsonpCallback: "callback",
            //     success: function (res) {
            //         // if (res.content.live_room.bnext == 0) {
            //         //     _this.addNewData(res)
            //         //     // _this.$live.find('.live_list').prepend('<p class="more-item">没有更多了</p>');
            //         //     _this.isMore = false;
            //         //     return false;
            //         // }
            //         _this.addNewData(res)
            //     }
            // });
        },
        addNewData: function(res) {
            // 添加最新数据
            var _this = this;
            // $('.top-info').remove();
            _this.$live.find('.live_list').prepend(_this.initImgText(res, true));
        },
        initImgText: function (res, bool) {
            var _this = this;
            var infoTop = res.content.live_room.top;
            var infoReverse = res.content.live_room.new;
            var h = '';
            if (bool === true) {
                for (var i = 0; i < infoTop.length; i++) {
                    var info = infoTop[i][0];
                    var headImg = info.mb_head_url || info.mb_head_url ||
                        "//t0.qlogo.cn/mbloghead/6d3170029a3af2b5f8ae/50";
                    //info.rose_data.id为直播单条id
                    h += "<li id='" + info.rose_data.id + "' class='top-info'>";
                    h += "<div class='left'><img src=" + headImg + "></div>";
                    h += "<div class='right'><span class='con_arrow'></span><p><span class='author_nick'>" + info.nick +
                        "</span><span class='author_type'>" + _this.role[info.rose_data.role] + "</span></p>";
                    h += "<p class='self_time'><span>" + info.province_city + "</span>" + _this.timeToStr(info.pub_time) +
                        "</p>";
                    if (info.pic && info.pic.length > 0) {
                        h += _this.fillImageData(info.pic[0].origUrl, info.pic[0].url, info.pic[0].desc, info.pic[0].width,
                            info.pic[0].height);
                    } else if (info.rose_data && info.rose_data.type == 4) {
                        h += _this.fillVideoData(info.reply_content, info.rose_data.attachment.playurl, info.rose_data.attachment
                            .img);
                    } else {
                        h += _this.fillTextData(info.reply_content);
                    }
                    h += "</div></li>";
                }
            }
            for (var i = 0; i < infoReverse.length; i++) {
                var info = infoReverse[i][0];
                var headImg = info.mb_head_url || info.mb_head_url ||
                    "//t0.qlogo.cn/mbloghead/6d3170029a3af2b5f8ae/50";
                //info.rose_data.id为直播单条id
                h += "<li id='" + info.rose_data.id + "' class='normal'>";

                h += "<div class='left'><img src=" + headImg + "></div>";
                h += "<div class='right'>" +
                    "<span class='con_arrow'></span><p><span class='author_nick'>" + info.nick +
                    "</span><span class='author_type'>" + _this.role[info.rose_data.role] + "</span></p>";
                h += "<p class='self_time'><span>" + info.province_city + "</span>" + _this.timeToStr(info.pub_time) +
                    "</p>";

                if (info.pic && info.pic.length > 0) {
                    h += _this.fillImageData(info.pic[0].origUrl, info.pic[0].url, info.pic[0].desc, info.pic[0].width,
                        info.pic[0].height);
                } else if (info.rose_data && info.rose_data.type == 4) {
                    h += _this.fillVideoData(info.reply_content, info.rose_data.attachment.playurl, info.rose_data.attachment
                        .img);
                } else if (info.rose_data && info.rose_data.type == 1) {
                    h += _this.fillReplay(info.reply_content, info.rose_data.attachment);
                } else {
                    h += _this.fillTextData(info.reply_content);
                }
                h += "</div></li>";
            }

            return h;
        },
        role: ['', '主持人', '直播员', '嘉宾'],
        timeToStr: function (time) {
            var date = new Date;
            date.setTime(time * 1E3);

            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            if (month < 10) {
                month = "0" + month;
            }

            if (day < 10) {
                day = "0" + day;
            }

            if (hour < 10) {
                hour = "0" + hour;
            }

            if (minute < 10) {
                minute = "0" + minute;
            }

            if (second < 10) {
                second = "0" + second;
            }

            return month + "-" + day + " " + hour + ":" + minute; //+ ":" + second;
        },
        fillImageData: function (imageUrl, smallImageUrl, desc, width, height) {
            var html = "";
            var showHeight = (height * 150.0) / width;
            html += ("<div class='type-img'>");
            html += ("<div class='zh_img colorGray'>");
            html += ("<p class='self_text'>" + desc + "</p>");
            html += ("<img class='lazy' src='" + smallImageUrl + "'>");
            html += ("</div></div>");
            return html;
        },
        fillTextData: function (content) {
            var html = "";
            html += ("<div class='type-text'>");
            html += ("<p class='self_text'>" + content + "</p>");
            html += ("</div>");
            return html;
        }
    }

    $(function () {
        var bgLayer = new bgMove({
            onHide: function () {
                // console.log('aaaaa');
                new Page();
            }
        });


        var hideCallback = function () {
            $('.loading').fadeOut();
            $('.pace').hide();
            bgLayer.startMove();
            window.paceInterval && window.clearInterval(window.paceInterval);
            setTimeout(function () {
                new Live();
            }, 500);
        };

        window.paceInterval = setInterval(function () {
            var progress = $('.pace-progress').attr('data-progress');
            if (parseInt(progress) >= 98) {
                hideCallback();
            }
        }, 300);
    })
})(jQuery,bgMove)
/*  |xGv00|06de77292ce403f92f51991119099e03 */