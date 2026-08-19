!
function(e) {
    var o, i, a, t;
    i = function(e) {
        console.log(e), window.txvideo = window.txvideo ? window.txvideo : new tvp.VideoInfo, window.txvideo.setVid(e.id), window.txvideo.setHistoryStart(0), window.txplayer = new tvp.Player, window.txplayer.create({
            width: e.width,
            height: e.height,
            video: window.txvideo,
            modId: "vedioBox",
            pic: e.pic,
            autoplay: !1
        }), a = window.txplayer, console.log(a)
    }, o = function() {
        e(".video-btn").on("click", function() {
            e(".videos").fadeIn(), a.play()
        }), e(".top-back").click(function() {
            e("html,body").animate({
                scrollTop: "0px"
            }, "slow")
        }), e(".share").click(function() {
            e(".share-box").fadeIn(), TweenMax.fromTo(e(".share-title"), .8, {
                scale: 1.2,
                opacity: .9
            }, {
                scale: 1,
                opacity: 1,
                delay: .1
            }), TweenMax.fromTo(e(".citys"), 1, {
                y: 30,
                opacity: .9
            }, {
                y: 0,
                opacity: 1,
                delay: .8,
                ease: Power4.easeOut
            })
        }), e(".share-box .know").click(function() {
            e(".share-box").fadeOut()
        }), e(".videos .close-btn").click(function() {
            e(".videos").fadeOut(), a.pause()
        })
    }, t = function() {
        o(), $welcome = e(".banner"), TweenMax.fromTo($welcome.find(".logo"), 1, {
            y: -20,
            opacity: .7
        }, {
            y: 0,
            opacity: 1,
            delay: 2
        }), TweenMax.fromTo($welcome.find(".main-title"), 1.5, {
            scale: .77
        }, {
            scale: 1,
            delay: .1
        }), TweenMax.fromTo($welcome.find(".mini-title"), 1.5, {
            scale: .88,
            opacity: .7
        }, {
            scale: 1,
            opacity: 1,
            delay: 1.3
        }), TweenMax.fromTo($welcome.find(".left"), 1.1, {
            x: -10,
            opacity: .5
        }, {
            x: 0,
            opacity: .7,
            delay: 1.6
        }), TweenMax.fromTo($welcome.find(".right"), 1.1, {
            x: 10,
            opacity: .5
        }, {
            x: 0,
            opacity: .7,
            delay: 1.6
        }), TweenMax.fromTo($welcome.find(".main-title-tip"), 1.6, {
            y: 20,
            scale: 1.11,
            opacity: .8
        }, {
            y: 0,
            scale: 1,
            opacity: 1,
            delay: .11
        }), TweenMax.fromTo($welcome.find(".min-title"), 1.5, {
            opacity: .6,
            scale: .9
        }, {
            opacity: 1,
            scale: 1,
            delay: 1.6
        }), TweenMax.fromTo($welcome.find(".video-btn"), 1, {
            opacity: .9,
            scale: .95
        }, {
            opacity: 1,
            scale: 1,
            delay: 2.7,
            ease: Power4.easeIn
        });
        var a = e(".videos"),
            t = {
                width: window.innerWidth,
                height: window.innerHeight,
                id: a.attr("data-id"),
                pic: a.attr("data-pic")
            };
        i(t)
    }, e(function() {
        var o = function() {
                Pace.ignore(function() {
                    return !0
                }), e(".pace").hide(), e(".loading").fadeOut(), t(), window.paceInterval && window.clearInterval(window.paceInterval)
            };
        window.paceInterval = setInterval(function() {
            var i = e(".pace-progress").attr("data-progress-text");
            "99%" !== i && "100%" !== i || o()
        }, 300)
    })
}(jQuery); /*  |xGv00|e760fa50ebc1337f0c4c1f3a9afd3996 */