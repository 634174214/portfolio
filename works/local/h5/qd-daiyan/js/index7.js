"use strict";
$(function() {
    var e = !1,
        n = !1,
        t = "",
        a = null,
        o = !1,
        i = [resultbanner, headeremail, ercard, resultimg1, resultimg2, resultimg3, resultimg4, resultimg5, resultimg6, resultimg7, resultimg8],
        r = ["./img/bigpk.png", "./img/btn.png", "./img/canvastext.png", "./img/crown.png", "./img/emoj.png", "./img/finger.png", "./img/finger2.png", "./img/grid.png", "./img/head.png", "./img/intro.png", "./img/longtext.png", "./img/muchlogo.png", "./img/photo.png", "./img/pld.png", "./img/result_left1.png", "./img/result_left2.png", "./img/result_left3.png", "./img/result_left4.png", "./img/result_left5.png", "./img/result_left6.png", "./img/result_left7.png", "./img/result_left8.png", "./img/result-san.png", "./img/resultlight.png", "./img/sence.png", "./img/upload_banner.png", "./img/uploadtip.png", "./img/yellow.png", "./img/arrow.png", "./img/bigline.png", "./img/bottom-logo.png", "./img/ercardtrue.png", "./img/fingerlight.png", "./img/fingerlight2.png", "./img/photo-img.png", "./img/scanline.png", "./img/share.jpg", "./img/xie.png", "./img/resultbanner1.png", "./img/resultbanner2.png", "./img/resultbanner3.png", "./img/resultbanner4.png", "./img/resultbanner5.png", "./img/resultbanner6.png", "./img/resultbanner7.png", "./img/resultbanner8.png"],
        s = [{
            title: "鱼山路网红墙",
            domImge: "./img/result_left1.png",
            total: 98,
            introHtml: "书卷气韵独树一帜，你就是<br/>岛城 “墙韵” 的 “代墙人”！",
            canvasArr: ["书卷气韵独树一帜", "你就是岛城 “墙韵” 的 “代墙人”！！"],
            resultbannerImg: "./img/resultbanner1.png"
        }, {
            title: "海云庵",
            domImge: "./img/result_left2.png",
            total: 100,
            introHtml: "想带上你的明媚笑意<br/>一同徜徉在百年海云！",
            canvasArr: ["想带上你的明媚笑意，", "一同徜徉在百年海云！"],
            resultbannerImg: "./img/resultbanner2.png"
        }, {
            title: "石老人",
            domImge: "./img/result_left3.png",
            total: 90,
            introHtml: "温柔如你暖洋洋！<br/>就像青岛的石老人，沉稳守望！",
            canvasArr: ["温柔如你暖洋洋！", "就像青岛的石老人，沉稳守望！"],
            resultbannerImg: "./img/resultbanner3.png"
        }, {
            title: "回澜阁",
            domImge: "./img/result_left4.png",
            total: 95,
            introHtml: "你辽阔的格局<br/>如同揽尽沧澜的回澜阁，就是顶！",
            canvasArr: ["你辽阔的格局", "如同揽尽沧澜的回澜阁，就是顶！"],
            resultbannerImg: "./img/resultbanner4.png"
        }, {
            title: "崂山",
            domImge: "./img/result_left5.png",
            total: 85,
            introHtml: "看你松弛的眼眸，不知道<br/>你正为崂山的 “仙光” 所沉醉呢？",
            canvasArr: ["看看你松弛的眼眸", "不知道你正为崂山的 “仙光” 所沉醉呢？"],
            resultbannerImg: "./img/resultbanner5.png"
        }, {
            title: "五月的风",
            domImge: "./img/result_left6.png",
            total: 88,
            introHtml: "捕捉到一位活力达人！赤诚如你<br/>快为我们的 “风彩” 点赞！",
            canvasArr: ["捕捉到一位活力达人！", "赤诚如你，快为我们的 “风彩” 点赞！"],
            resultbannerImg: "./img/resultbanner6.png"
        }, {
            title: "情人坝",
            domImge: "./img/result_left7.png",
            total: 88,
            introHtml: "我能读懂在你温柔的眉眼之间<br/>沉醉于海风长堤的浪漫悠然……",
            canvasArr: ["我能读懂在你温柔的眉眼之间，", "沉醉于海风长堤的浪漫悠然……"],
            resultbannerImg: "./img/resultbanner7.png"
        }, {
            title: "天主教堂",
            domImge: "./img/result_left8.png",
            total: 88,
            introHtml: "没有什么能够阻挡<br/>你眼神里透出的对美好的向往！",
            canvasArr: ["没有什么能够阻挡，", "你眼神里透出的对美好的向往！"],
            resultbannerImg: "./img/resultbanner8.png"
        }],
        l = function() {
            this.init()
        };
    l.prototype = {
        init: function() {
            this.initDomAnm(), this.initEvent()
        },
        generateImg: function(e, n) {
            var t = document.createElement("canvas"),
                a = t.getContext("2d"),
                o = s[n];
            t.width = 637, t.height = 800, a.drawImage(e[0], 0, 0, 637, 800), a.drawImage(e[3 + n], 25, 25, 588, 580), a.drawImage(e[1], 432, 48, 166, 166), a.drawImage(e[e.length - 1], 451, 65, 129, 129), a.drawImage(e[2], 502, 645, 109, 109), a.beginPath(), a.lineWidth = 2, a.strokeStyle = "#333", a.rect(450, 64, 130, 130), a.stroke(), a.fillStyle = "#333", a.font = "bold 44px 'microsoft yahei'", a.textAlign = "left", a.fillText(o.title, 46, 687);
            var i = o.canvasArr;
            return a.font = "23px 'microsoft yahei'", a.fillText(i[0].trim(), 46, 733), a.fillText(i[1].trim(), 46, 766), a.font = "18px 'microsoft yahei'", a.fillText("青岛盐值专题", 502, 780), t.toDataURL(.9)
        },
        initDomAnm: function() {
            this.mainAnm = new TimelineMax({
                paused: !0
            }), this.mainAnm.from(".main-con .muchlogo", 1, {
                opacity: 0,
                y: 20,
                ease: Power0.easeOut
            }, "one").from(".main-con .mid-text", .6, {
                opacity: 0,
                y: 20,
                scale: .3,
                ease: Back.easeOut.config(2)
            }, "one").from(".main-con .left-circle", 1, {
                opacity: 0,
                x: -80,
                rotation: -180,
                ease: Power0.easeOut
            }, "one+=0.5").from(".main-con .right-circle", 1, {
                opacity: 0,
                x: 80,
                rotation: 180,
                ease: Power0.easeOut
            }, "one+=0.5").from(".main-con .crown-con", 1, {
                opacity: 0,
                y: 80,
                ease: Back.easeOut.config(2)
            }, "one+=1.5").from(".main-con .longtext", 1, {
                opacity: 0,
                y: 50,
                ease: Power0.easeOut
            }, "one+=1").from(".main-con .bigcon", 1, {
                opacity: 0,
                y: -100,
                ease: Bounce.easeOut
            }, "one+=1").from(".main-con .pointerone", 1.2, {
                opacity: 1,
                yoyo: !0,
                repeat: -1,
                y: -8,
                ease: Power0.easeOut
            }, "one+=1.2").from(".main-con .pointertwo", 1, {
                opacity: 1,
                yoyo: !0,
                repeat: -1,
                y: -8,
                ease: Power0.easeOut
            }, "one+=1.4").from(".main-con .pointerthree", 1.2, {
                opacity: 1,
                yoyo: !0,
                repeat: -1,
                y: -8,
                ease: Power0.easeOut
            }, "one+=1.6"), this.reverseAnm = new TimelineMax({
                paused: !0
            }), this.reverseAnm.to(".main-con .mid-text", 1, {
                opacity: 0,
                y: 30,
                ease: Back.easeOut.config(1)
            }, "one").to(".main-con .left-circle", 1, {
                opacity: 0,
                x: -80,
                ease: Power0.easeOut
            }, "one+=0.4").to(".main-con .right-circle", 1, {
                opacity: 0,
                x: 80,
                ease: Power0.easeOut
            }, "one+=0.4"), this.secondAnm = new TimelineMax({
                paused: !0
            }), this.secondAnm.from(".intro-container", 2, {
                opacity: 0,
                x: 50,
                y: -50,
                delay: .1,
                ease: Back.easeOut.config(2)
            }, "one"), this.uploadAnm = new TimelineMax({
                paused: !0
            }), this.uploadAnm.from(".upload-page .upload-con", 1, {
                opacity: 0,
                y: 100,
                ease: Back.easeOut.config(2)
            }, "one").from(".upload-page .upload-again", 1, {
                opacity: 0,
                y: 100,
                ease: Back.easeOut.config(2)
            }, "one+=0.8").from(".upload-page .analysis", 1, {
                opacity: 0,
                y: 100,
                ease: Back.easeOut.config(2)
            }, "one+=1.2"), this.analysisAnm = new TimelineMax({
                paused: !0
            }), this.analysisAnm.from(".analysis-page .header-con", 1, {
                opacity: 0,
                y: 100,
                ease: Power0.easeIn
            }, "one").from(".analysis-page .text", 1, {
                opacity: 0,
                y: 50,
                ease: Power0.easeIn
            }, "one+=0.3").from(".analysis-page .analysis-process", 1, {
                opacity: 0,
                y: 50,
                ease: Power0.easeIn
            }, "one+=0.3").from(".analysis-page .header-line", 1, {
                opacity: 0,
                ease: Power0.easeOut
            }, "one+=1.3").to(".analysis-page .header-line", 3, {
                y: -459,
                repeat: -1,
                yoyo: !0,
                ease: Power0.easeInOut
            }, "one+=1.3").to(".analysis-page .process", 6, {
                x: 0,
                ease: Power0.easeIn
            }, "one+=1.3"), this.resultDomAnm = new TimelineMax({
                paused: !0
            }), this.resultDomAnm.from(".result-container .result-vs", .5, {
                opacity: 0,
                y: 50,
                ease: Power0.easeIn
            }, "one").from(".result-container .result-look", .5, {
                opacity: 0,
                y: 30,
                ease: Power0.easeOut
            }, "one+=2.7").from(".result-container .click-save", .8, {
                opacity: 0,
                y: 20,
                ease: Power0.easeOut
            }, "one+=3").from(".result-container .click-again", .8, {
                opacity: 0,
                y: 20,
                ease: Power0.easeOut
            }, "one+=3.3").from(".result-container .text", .8, {
                opacity: 0,
                y: 40,
                ease: Power0.easeInOut
            }, "one+=0.6").from(".result-container .battle-img", 1, {
                opacity: 0,
                x: -80,
                rotation: -180,
                ease: Power0.easeOut
            }, "one+=0.8").from(".result-container .vs", .8, {
                opacity: 0,
                y: -80,
                ease: Back.easeOut.config(2)
            }, "one+=0.8").from(".result-container .header", 1, {
                opacity: 0,
                x: 80,
                rotation: 180,
                ease: Power0.easeOut
            }, "one+=0.8").from(".result-container .total", .8, {
                opacity: 0,
                scale: .4,
                ease: Back.easeOut.config(2)
            }, "one+=1.7").from(".result-container .total", 1, {
                rotation: -30,
                ease: Back.easeOut.config(2)
            }, "one+=2.5").from(".result-container .intro-text", .8, {
                opacity: 0,
                y: -40,
                ease: Power0.easeOut
            }, "one+=0.6").from(".result-container .canvas-text-con", .8, {
                opacity: 0,
                y: 80,
                ease: Back.easeOut.config(2)
            }, "one+=3.5").from(".result-container .finger", .8, {
                opacity: 0,
                y: 80,
                ease: Back.easeOut.config(1)
            }, "one+=4.3").from(".result-container .fingerlight", .5, {
                opacity: 0,
                yoyo: !0,
                repeat: -1,
                ease: Power0.easeInOut
            }, "one+=4.7").from(".result-container .ercard", .8, {
                opacity: 0,
                y: 80,
                ease: Back.easeOut.config(2)
            }, "one+=3.8"), this.resultCtxAnm = new TimelineMax({
                paused: !0
            }), this.resultCtxAnm.from(".canvas-con .canvas-img", 1.2, {
                opacity: 0,
                y: 80,
                ease: Back.easeOut.config(2)
            }, "one").from(".canvas-con .hand-con", .8, {
                opacity: 0,
                y: 80,
                ease: Back.easeOut.config(2)
            }, "one+=0.5").from(".canvas-con .fingerlight", .5, {
                opacity: 0,
                yoyo: !0,
                repeat: -1,
                ease: Power0.easeInOut
            }, "one+=1.8").from(".canvas-con .text", .8, {
                opacity: 0,
                y: 80,
                ease: Back.easeOut.config(2)
            }, "one+=1.1")
        },
        initEvent: function() {
            var r = this;
            this.mainAnm.addCallback(function() {
                e = !0
            }), this.reverseAnm.addCallback(function() {
                l.hide(), m.show(), r.secondAnm.addCallback(function() {
                    e = !0
                }), r.secondAnm.play(), A = 2
            });
            var l = $(".main-con"),
                m = $(".page-intro"),
                c = $(".upload-page"),
                g = $(".analysis-page"),
                u = $(".result-page"),
                p = u.find(".result-container"),
                f = u.find(".canvas-con"),
                d = $(".upload-again"),
                y = $(".analysis"),
                h = document.getElementById("cutCanvas"),
                w = document.getElementById("ctrlLayer"),
                v = $(".click-save"),
                b = $(".click-again"),
                I = void 0,
                x = void 0,
                A = 1;
            $(".main-con,.page-intro").on("touchstart", function(e) {
                I = e.originalEvent.changedTouches[0].pageY
            }), $(".main-con,.page-intro").on("touchend", function(t) {
                (x = t.originalEvent.changedTouches[0].pageY) - I < 0 && e && (1 === A ? (e = !1, r.reverseAnm.play()) : 2 === A && (e = !1, m.hide(), c.show(), r.uploadAnm.addCallback(function() {
                    n = !0
                }), r.uploadAnm.play(), $(".arrow").hide()))
            }), d.on("click", function() {
                if (!n) return !1;
                c.find(".photo").trigger("click")
            }), c.find(".photo").on("change", function(e) {
                if (!n) return !1;
                var t = this.files[0];
                return void 0 !== t && (t.type && !/image\/\w+/.test(t.type) ? (alert("请上传图片文件"), !1) : void EXIF.getData(t, function() {
                    var e = EXIF.getTag(this, "Orientation"),
                        n = new FileReader;
                    n.readAsDataURL(t), n.onload = function(n) {
                        o = !0;
                        var t = new Image;
                        h.style.display = "block", w.style.display = "block", c.find(".uploadtip").hide(), t.onload = function() {
                            h.getContext("2d").setTransform(1, 0, 0, 1, 0, 0), new ImgTouchCanvas({
                                canvas: h,
                                contrler: w,
                                path: t.src,
                                imgRoate: e
                            })
                        }, t.src = n.target.result
                    }
                }))
            }), y.on("click", function() {
                return o ? !!n && (n = !1, t = h.toDataURL(.9), a = parseInt(8 * Math.random(0, 1)), p.find(".result-vs").css("background-image", "url(" + s[a].resultbannerImg + ")"), p.find(".battle-img").attr("src", s[a].domImge), p.find(".intro-text").html(s[a].introHtml), p.find(".text").html(s[a].title), p.find(".total-num").html(s[a].total), p.find(".header").attr("src", t), c.hide(), g.show(), r.resultDomAnm.addCallback(function() {
                    n = !0
                }), r.analysisAnm.addCallback(function() {
                    g.hide(), p.show(), u.show(), r.resultDomAnm.play()
                }, "+=0.2"), void r.analysisAnm.play()) : (alert("请上传您的正脸照片"), !1)
            }), b.on("click", function() {
                if (!n) return !1;
                window.location.replace(window.location.href.split("?")[0] + "?data=" + (new Date).getTime())
            }), v.on("click", function() {
                if (!n) return !1;
                n = !1;
                var e = [].concat(i, [t]),
                    o = 0,
                    s = [],
                    l = e.length;
                    // console.log(e)
                e.map(function(e, n) {
                    var t = new Image;
                    t.onload = function() {
                        if (o++, s[n] = t, o === l) {
                            console.log(s, a);
                            var e = r.generateImg(s, a);
                            // console.log(e);
                            $(".canvas-img").attr("src", e), p.hide(), f.show(), r.resultCtxAnm.play()
                        }
                    }, t.src = e
                })
            })
        }
    };
    var m = new l;
    ! function() {
        var e = 0,
            n = r.length;
        r.map(function(t) {
            var a = new Image;
            a.onload = function() {
                e++;
                var t = parseInt(e / n * 100);
                e === n ? setTimeout(function() {
                    $(".loadanimation-con").hide(), $(".main-con").css("opacity", 1), m.mainAnm.play()
                }, 100) : ($(".loadanimation").css({
                    transform: "translateX(" + (t - 100) + "%)"
                }), $("loadanimation-con .loadingtext").text(t + "%"))
            }, a.src = t
        })
    }()
}); /*  |xGv00|b81dd94533f95951341a3e0d6feca8ab */