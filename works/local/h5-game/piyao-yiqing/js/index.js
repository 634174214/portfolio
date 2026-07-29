var mainClass = null;
// 倒计时 秒
var countDownTime = 180;
var isPC = function() {
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
}();

if (!isPC) {
    $('.pc-show').hide();
} else {
    $('.pc-show').css('zIndex', 9999);
}

// 当显示时候有图片就重置内容
$(document).on('refreshScroll', function(event, domId) {
  if (window.introScroll) {
      window.introScroll.refresh();
  } else {
      window.introScroll = new BScroll('#intro-txt-wrapper',{
          scrollY: true,
          click: true
      });
  }
});


!function (e) {
    // (window.location.href.indexOf("money") >= 0 || /\d+\.\d+\.\d+\.\d+/.test(window.location.hostname)) && e("title").text("【测试】" + e("title").text());
    // a
    var t, i, s, o = "img/", n = window.listData, a = countDownTime, r = 0, c = {}, l = function (e) {
        var t, i, s;
        e.on("touchstart", function (e) {
            t = this.scrollTop,
                i = e.targetTouches[0].pageY
        }),
            e.on("touchmove", function (e) {
                s = e.targetTouches[0].pageY;
                var o = s - i
                    , n = this;
                n.scrollHeight > n.offsetHeight && (o < 0 && 0 === t || o > 0 && t > o || t > 0 && t + 1 < n.scrollHeight - n.offsetHeight) && e.stopPropagation()
            })
    }, d = function () {
        this.init()
    };
    d.prototype.init = function () {
        var t = this;
        t.initDom(),
            t.initEvent(),
            t.start(),
            c.startGame.restart(1);
        for (var i = 0; i < n.length; i++) {
            var s = n[i]
                , r = e('<div class="swiper-slide"><div class="chose-item"><img src="' + o + s.img + '" class="item-img"><img src="' + o + s.detail + '" class="item-detail"></div></div>');
            t.$gameBox.find(".swiper-wrapper").append(r)
        }

        var l = t.$timer.find(".min")
            , d = t.$timer.find(".second")
            , u = parseInt(a / 60)
            , m = parseInt(a % 60);
        l.text(u),
            d.text(m > 9 ? m : "0" + m)
    }
        ,
        d.prototype.start = function () {
            c.startGame = new TimelineMax({
                paused: !0
            }),
                c.startGame.from(".start .cities", 1.5, {
                    y: 250,
                    ease: Power0.easeNone,
                    yoyo: !1
                }, .6),
                c.startGame.from(".start .title", .5, {
                    opacity: 0,
                    y: -220,
                    ease: Bounce.easeOut,
                    yoyo: !1
                }, .9),
                c.startGame.from(".start .small-title", .5, {
                    opacity: 0,
                    y: -50,
                    ease: Power4.easeOut,
                    yoyo: !1
                }, 1.3),
                c.startGame.from(".start .rule-btn", .8, {
                    opacity: 0,
                    x: -150,
                    ease: Back.easeOut.config(1.7),
                    yoyo: !1
                }, 1.7),
                c.startGame.from(".start .start-btn", .8, {
                    opacity: 0,
                    x: -150,
                    ease: Back.easeOut.config(1.7),
                    yoyo: !1
                }, 2),
                c.startGame.from(".start .logo", 1, {
                    y: 20,
                    opacity: 0,
                    ease: Power3.easeOut,
                    yoyo: !1
                }, .1),
                c.startChose = new TimelineMax({
                    paused: !0
                }),
                c.startChose.from(".game-title", .6, {
                    y: "-50%",
                    opacity: 0,
                    ease: Bounce.easeOut
                }),
                c.startCheck = new TimelineMax({
                    paused: !0
                }),
                c.startCheck.from(".money i", .3, {
                    x: 200,
                    y: 300,
                    scale: 3,
                    ease: Power3.easeOut
                }, 1),
                c.startResult = new TimelineMax({
                    paused: !0
                }),
                c.startResult.from(".result .content", .4, {
                    opacity: .5,
                    y: 100,
                    ease: Power3.easeOut,
                    yoyo: !1
                }, .1),
                c.startResult.from(".result .success-title", .3, {
                    opacity: 0,
                    scale: 1.4,
                    ease: Power3.easeOut,
                    yoyo: !1
                }, .3)
        }
        ,
        d.prototype.initDom = function () {
            var t = this;
            t.$game = e(".container.game"),
                t.$section = e(".section"),
                t.$start = e(".section.start"),
                t.$rule = e(".section.rule"),
                t.$gameBox = e(".section.game-box"),
                t.$money = t.$gameBox.find(".money i"),
                t.$timer = t.$gameBox.find(".timer"),
                t.$intro = e(".game-box .intro"),
                t.$result = e(".section.result"),
                t.$policy = e(".policy")
        }
        ,
        d.prototype.initEvent = function () {
            var o = this;
            o.$start.on("click", ".rule-btn", function () {
                o.$rule.fadeIn()
            }),
                o.$start.on("click", ".start-btn", function () {
                    o.$gameBox.show(),
                        t = new Swiper(".chose-list .swiper-container", {
                            loop: !1,
                            slideToClickedSlide: !0,
                            nextButton: ".chose-list .next",
                            prevButton: ".chose-list .prev",
                            onSlideChangeStart: function (e) {
                                o.$gameBox.find(".chose-item").eq(e.activeIndex).hasClass("disabled") ? o.$gameBox.find(".check").addClass("disabled") : o.$gameBox.find(".check").removeClass("disabled")
                            }
                        }),
                        c.startChose.restart(1),
                        o.countDown()
                }),
                o.$rule.on("click", function () {
                    o.$rule.fadeOut()
                }),
                o.$gameBox.on("click", ".check", function () {
                    if (o.$gameBox.find(".check").hasClass("disabled"))
                        return !1;
                    var introStr = '';
                    o.currIndex = t.realIndex,
                    i = n[o.currIndex];
                    o.$intro.find(".intro-title").text(i.name);
                    // 文案内容
                    introStr += '<p>' + i.intro + '</p>';
                    // 将文案内容替换目前结构中
                    o.$intro.find(".intro-txt").html(introStr);
                    o.$intro.fadeIn(function() {
                        $(document).trigger('refreshScroll');
                        
                    });
                    // 如果有图片
                    if (i.pyimage) {
                        var timeStamp = new Date().getTime();
                        var imgSrc = 'img/' + i.pyimage + '?t=' + timeStamp;
                        var image = new Image();
                        image.src = imgSrc;
                        image.id = 'intro-inner-img';
                        // introStr = '<img id="intro-inner-img" src="' + imgSrc + '">';
                        // 那么插入图片后重新刷新滚动
                        $(image).on('load', function() {
                            $('.intro-txt').prepend($(image));
                            $(document).trigger('refreshScroll');
                        });
                    }
                }),
                o.$intro.on("click", ".cancel", function () {
                    o.$intro.hide();
                }),
                o.$intro.on("click", ".buy", function () {
                    // o.$intro.hide(),
                    o.$intro.hide();
                        r += i.price,
                        o.$gameBox.find(".money i").text(r),
                        c.startCheck.restart(1),
                        o.$gameBox.find(".chose-item").eq(o.currIndex).addClass("disabled"),
                        r >= 10 ? (o.$result.find(".res-desc2").hide(),
                            o.$result.find(".res-desc1").show(),
                            o.$result.find(".success-title img").attr("src", "img/success-title.png"),
                            o.$result.show(),
                            c.startResult.restart(1),
                            window.clearInterval(s)) : t.isEnd ? o.$gameBox.find(".check").addClass("disabled") : setTimeout(function () {
                                t.slideNext(function () { }, 800)
                            }, 200)
                }),
                o.$result.on("click", ".check-btn", function () {
                    o.$intro.hide(),
                        o.$policy.fadeIn(),
                        e(".policy .content").scrollTop(0)
                }),
                o.$policy.on("click", ".back", function () {
                    o.$policy.hide()
                }),
                $('#try-again').on('click', function() {
                    o.again();
                }),
                o.$policy.on("click", ".again", function () {
                    o.again()
                }),
                l(e(".policy .content"))
        }
        ,
        d.prototype.again = function () {
            var i = this;
            a = countDownTime,
                r = 0,
                i.$policy.hide(),
                i.$result.hide(),
                i.$gameBox.find(".money i").text(r),
                i.$gameBox.find(".swiper-wrapper").html("");
            for (var s = 0; s < n.length; s++) {
                var l = n[s]
                    , d = e('<div class="swiper-slide"><div class="chose-item"><img src="' + o + l.img + '" class="item-img"><img src="' + o + l.detail + '" class="item-detail"></div></div>');
                i.$gameBox.find(".swiper-wrapper").append(d)
            }
            e(".swiper-container .swiper-wrapper").css("transform", "translate3d(0px, 0px, 0px)"),
                i.$gameBox.show(),
                t ? (t.updateSlidesSize(),
                    t.slideTo(0, 0, !0)) : t = new Swiper(".chose-list .swiper-container", {
                        loop: !1,
                        slideToClickedSlide: !0,
                        nextButton: ".chose-list .next",
                        prevButton: ".chose-list .prev",
                        onSlideChangeStart: function (e) {
                            e.activeIndex === i.currIndex ? i.$gameBox.find(".check").addClass("disabled") : i.$gameBox.find(".check").removeClass("disabled")
                        }
                    }),
                c.startChose.restart(1),
                i.countDown()
        }
        ,
        d.prototype.countDown = function () {
            var e = this
                , t = e.$timer.find(".min")
                , i = e.$timer.find(".second");
            s = setInterval(function () {
                a--;
                var o = parseInt(a / 60)
                    , n = parseInt(a % 60);
                t.text(o),
                    i.text(n > 9 ? n : "0" + n),
                    a <= 0 && (e.getResult(),
                        clearInterval(s))
            }, 1e3)
        }
        ,
        d.prototype.getResult = function () {
            var e = this;
            r >= 10 ? (e.$result.find(".res-desc2").hide(),
                e.$result.find(".res-desc1").show(),
                e.$result.find(".success-title img").attr("src", "img/success-title.png")) : (e.$result.find(".res-desc1").hide(),
                    e.$result.find(".res-desc2").show(),
                    e.$result.find(".success-title img").attr("src", "img/error-title.png")),
                e.$result.show(),
                c.startResult.restart(1)
        }
        ,
        e(function () {
            var t = function () {
                if (mainClass) {
                    return;
                }

                e(".pace").fadeOut();
                mainClass = new d,
                window.paceInterval && window.clearInterval(window.paceInterval);
            };
            window.paceInterval = setInterval(function () {
                var i = e(".pace-progress").attr("data-progress");
                var precent = parseInt(i);
                createProgress(precent);
                // console.log(precent)
                // console.log(mainClass)
                if (precent >= 99) {
                    setTimeout(() => {
                        t();
                    }, 300)
                }
            }, 300)
        })
}(jQuery);

function createProgress(precent) {
    if (!window.progressBarStyle) {
        window.progressBarStyle = document.createElement('style');
        document.head.appendChild(window.progressBarStyle);
    }
    window.progressBarStyle.innerHTML = '.pace .pace-progress-inner:before{width: ' + precent + '%;}';
}