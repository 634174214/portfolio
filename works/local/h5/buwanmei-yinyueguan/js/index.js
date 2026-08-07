"use strict";
window.page = function() {
    var i = $(".layer-msg"),
        s = function(s) {
            i.find("p").text(s), i.fadeIn(600), setTimeout(function() {
                i.fadeOut(600)
            }, 2e3)
        },
        n = function() {
            this.songArr = ["crf", "dlm", "hls", "zdan", "znylsf", "zsdg"], this.songObj = {
                crf: {
                    songUrl: "./music/song_1.mp3",
                    shareText: "邀你探秘不完美音乐馆，Ta正在听《虫儿飞》",
                    shareImg: "imgs/share/crf.jpg"
                },
                dlm: {
                    songUrl: "./music/song_2.mp3",
                    shareText: "邀你探秘不完美音乐馆，Ta正在听《哆来咪》",
                    shareImg: "imgs/share/dlm.jpg"
                },
                hls: {
                    songUrl: "./music/song_3.mp3",
                    shareText: "邀你探秘不完美音乐馆，Ta正在听《欢乐颂》",
                    shareImg: "imgs/share/hls.jpg"
                },
                zdan: {
                    songUrl: "./music/song_4.mp3",
                    shareText: "邀你探秘不完美音乐馆，Ta正在听《真的爱你》",
                    shareImg: "imgs/share/zdan.jpg"
                },
                znylsf: {
                    songUrl: "./music/song_5.mp3",
                    shareText: "邀你探秘不完美音乐馆，Ta正在听《祝你一路顺风》",
                    shareImg: "imgs/share/znylsf.jpg"
                },
                zsdg: {
                    songUrl: "./music/song_6.mp3",
                    shareText: "邀你探秘不完美音乐馆，Ta正在听《张三的歌》",
                    shareImg: "imgs/share/zsdg.jpg"
                }
            }, this.playMusic = null, this.musicLoading = 1, this.slideIndex = null, this.slidePreviousIndex = 1, this.showShareAnm = null, this.animationlaoding = !0, this.chooseMusicIndex = 1, this.init()
        };
    n.prototype = {
        init: function() {
            for (var i = getQueryString("which_song"), s = 0, n = this.songArr.length; s < n; s++)
                if (this.songArr[s] === i) {
                    this.chooseMusicIndex = s, this.slideIndex = s;
                    break
                }
            this.addJq(), this.initSwiper(), this.addListener(), this.addStaticAnm()
        },
        begin: function() {
            this.mainAnm.play()
        },
        addJq: function() {
            this.$nextBtn = $(".main-time"), this.$btnHelpThem = $(".help_them"), this.$btnShareSong = $(".share_song"), this.$musicBtnCon = $(".music_play_load"), this.$musicBtn = $(".music_btn"), this.$songText = $(".song_text"), this.$musicItem = $(".music-item"), this.$goBack = $(".all_back"), this.$detailPage = $(".detail-page")
        },
        addListener: function() {
            var i = this;
            this.$nextBtn.on("click", function() {
                i.animationlaoding || (i.animationlaoding = !0, this.setI && clearInterval(this.setI), i.mainAnm.kill(), i.mainOut.play())
            }), this.$btnHelpThem.on("click", function() {
                var s = this;
                if (i.animationlaoding) return !1;
                i.animationlaoding = !0, 2 === i.musicLoading && i.stopF(i.songArr[i.slideIndex]), $(this).css({
                    backgroundPosition: "-270px 0",
                    lineHeight: "109px"
                }), setTimeout(function() {
                    i.animationlaoding = !1, $(s).css({
                        backgroundPosition: "0 0",
                        lineHeight: "105px"
                    }), window.location.href = window.helpThemUrl
                }, 100)
            }), this.$btnShareSong.on("click", function() {
                var s = this;
                if (i.animationlaoding) return !1;
                $(".virtual_dom").show(), i.swiper.allowTouchMove = !1, i.animationlaoding = !0, $(this).css({
                    backgroundPosition: "-270px 0",
                    lineHeight: "109px"
                }), setTimeout(function() {
                    $(s).css({
                        backgroundPosition: "0 0",
                        lineHeight: "105px"
                    }), i.showShareAnm = new TimelineMax({
                        paused: !0
                    });
                    var n = Number(i.slideIndex);
                    i.showShareAnm.to(".share_song", .8, {
                        opacity: 0,
                        y: 20,
                        ease: Power0.easeOut
                    }, "one").to(".help_them", .8, {
                        opacity: 0,
                        y: 20,
                        ease: Power0.easeOut
                    }, "one+=0.3").to(".swiper-button-prev-xgc", .5, {
                        opacity: 0,
                        x: -214,
                        ease: Power0.easeOut
                    }, "one+=1").to(".swiper-button-next-xgc", .5, {
                        opacity: 0,
                        x: 214,
                        ease: Power0.easeOut
                    }, "one+=1").to(".music_play_load", .6, {
                        opacity: 0,
                        y: 30,
                        ease: Power0.easeOut
                    }, "one+=1"), n > 0 && n < 5 ? i.showShareAnm.to($(i.$musicItem[n - 1]).find(".music_banner"), .5, {
                        opacity: 0,
                        x: -40,
                        ease: Power0.easeNone
                    }, "one+=1.4").to($(i.$musicItem[n + 1]).find(".music_banner"), .5, {
                        opacity: 0,
                        x: 40,
                        ease: Power0.easeNone
                    }, "one+=1.4") : 0 === n ? i.showShareAnm.to($(i.$musicItem[n + 1]).find(".music_banner"), .5, {
                        opacity: 0,
                        x: 40,
                        ease: Power0.easeNone
                    }, "one+=1.4") : i.showShareAnm.to($(i.$musicItem[n - 1]).find(".music_banner"), .5, {
                        opacity: 0,
                        x: -40,
                        ease: Power0.easeNone
                    }, "one+=1.4"), i.showShareAnm.to(".share_text", .6, {
                        opacity: 1,
                        y: -20,
                        ease: Power0.easeOut,
                        onComplete: function() {
                            i.shareAnm.restart()
                        }
                    }, "one+=2.1").to(".all_water", .7, {
                        opacity: 1,
                        y: 150,
                        ease: Power0.easeOut
                    }, "one+=2.3").to(".all_back", .4, {
                        opacity: 1,
                        x: 0,
                        ease: Power0.easeOut
                    }, "one+=2.8"), i.showShareAnm.restart().timeScale(1.3), i.showShareAnm.eventCallback("onReverseComplete", function() {
                        i.swiper.allowTouchMove = !0, i.animationlaoding = !1, $(".virtual_dom").hide()
                    })
                }, 100)
            }), this.$musicBtn.on("click", function() {
                if (i.animationlaoding) return !1;
                1 === i.musicLoading ? (i.playF(i.songArr[i.slideIndex]), i.musicLoading = 2) : (i.stopF(i.songArr[i.slideIndex]), i.musicLoading = 1)
            }), this.$goBack.on("click", function() {
                i.showShareAnm.reverse().timeScale(1.6)
            })
        },
        addStaticAnm: function() {
            var i = this;
            this.mainAnm = new TimelineMax({
                paused: !0
            }), this.mainAnm.from(".main_logo", .3, {
                opacity: 0,
                y: 10,
                ease: Power0.easeOut
            }, "main").from(".main_magnetic_tape", .6, {
                opacity: 0,
                x: -60,
                y: 60,
                ease: Back.easeOut.config(1.7)
            }, "main+=0.4").from(".main_guitar", .6, {
                opacity: 0,
                x: 10,
                y: 60,
                ease: Back.easeOut.config(1.7)
            }, "main+=0.4").from(".main_children", .6, {
                opacity: 0,
                y: -30,
                ease: Back.easeOut.config(1.7)
            }, "main+=0.8").from(".main_earpiece", .4, {
                opacity: 0,
                rotation: 3,
                ease: Power0.easeOut
            }, "main+=1.3").from(".main_biglogo", 1, {
                opacity: 0,
                scale: .7,
                ease: Elastic.easeOut.config(1, .4)
            }, "main+=1.7").from(".main_small_logo", .4, {
                opacity: 0,
                y: 10,
                ease: Power0.easeOut
            }, "main+=2").from(".main_lb", .7, {
                opacity: 0,
                scale: .7,
                ease: Elastic.easeOut.config(1, .4)
            }, "main+=2.5").from(".main_yf", .5, {
                opacity: 0,
                ease: Power0.easeOut
            }, "main+=2.7").from(".main-time", 1, {
                opacity: 0,
                x: 100,
                rotation: 360,
                ease: Back.easeOut.config(1.7),
                onComplete: function() {
                    i.animationlaoding = !1;
                    var s = 3;
                    i.setI = setInterval(function() {
                        s--, s < 1 ? i.setI && (clearInterval(i.setI), i.mainOut.play()) : $(".main-time").html("跳过<br/>" + s + "S")
                    }, 1e3)
                }
            }, "main+=3"), this.mainOut = new TimelineMax({
                paused: !0
            }), this.mainOut.to(".main_logo", .6, {
                opacity: 0,
                y: -130,
                ease: Power0.easeOut
            }, "out").to(".main-time", .6, {
                opacity: 0,
                y: -130,
                ease: Power0.easeOut
            }, "out").to(".main-logo-con", .6, {
                opacity: 0,
                y: -450,
                ease: Back.easeIn.config(1.7)
            }, "out+=0.2").to(".main-preson", .6, {
                opacity: 0,
                y: -360,
                ease: Back.easeIn.config(1.8),
                onComplete: function() {
                    $(".main-page").hide(), i.startAnm.play()
                }
            }, "out+=0.4"), this.startAnm = new TimelineMax({
                paused: !0
            }), this.startAnm.from(".head-list", .8, {
                opacity: 0,
                y: 20,
                ease: Power0.easeOut
            }, "start+=0.1").from(".song_text_con", .8, {
                opacity: 0,
                y: 20,
                ease: Power0.easeOut
            }, "start+=0.4").from(".change_music_con", .8, {
                opacity: 0,
                y: 20,
                ease: Power0.easeOut
            }, "start+=0.6").from(".help_them", .8, {
                opacity: 0,
                y: 40,
                ease: Back.easeOut.config(1.7)
            }, "start+=0.8").from(".share_song", .8, {
                opacity: 0,
                y: 40,
                ease: Back.easeOut.config(1.7),
                onComplete: function() {
                    i.animationlaoding = !1, $(".virtual_dom").hide()
                }
            }, "start+=1"), this.shareAnm = new TimelineMax({
                paused: !0
            });
            var s = new TweenMax(".piaoyf", 3, {
                bezier: {
                    type: "soft",
                    values: [{
                        x: 30,
                        y: 0
                    }, {
                        x: 40,
                        y: -5
                    }, {
                        x: 50,
                        y: -40
                    }, {
                        x: 60,
                        y: -100
                    }, {
                        x: 80,
                        y: -300
                    }]
                },
                ease: Power0.easeOut
            });
            this.shareAnm.add(s, "one").to(".piaoyf", .5, {
                opacity: 1,
                ease: Power0.easeNone
            }, "one").to(".piaoyf", .6, {
                opacity: 0,
                ease: Power0.easeNone
            }, "one+=2.4")
        },
        addAnm: function(i) {
            i.html('\n                <img src="./imgs/yf/yf1.png" alt="" class="abs yf_top yf_ins yf_1">\n                <img src="./imgs/yf/yf3.png" alt="" class="abs yf_top yf_ins yf_3">\n                <img src="./imgs/yf/yf2.png" alt="" class="abs yf_top yf_ins yf_2">\n                <img src="./imgs/yf/yf5.png" alt="" class="abs yf_top yf_ins yf_5">\n                <img src="./imgs/yf/yf4.png" alt="" class="abs yf_top yf_ins yf_4">\n                <img src="./imgs/yf/yf6.png" alt="" class="abs yf_top yf_ins yf_6">\n                <img src="./imgs/yf/yf1.png" alt="" class="abs yf_bottom yf_ins yf_1">\n                <img src="./imgs/yf/yf3.png" alt="" class="abs yf_bottom yf_ins yf_3">\n                <img src="./imgs/yf/yf2.png" alt="" class="abs yf_bottom yf_ins yf_2">\n                <img src="./imgs/yf/yf5.png" alt="" class="abs yf_bottom yf_ins yf_5">\n                <img src="./imgs/yf/yf4.png" alt="" class="abs yf_bottom yf_ins yf_4">\n                <img src="./imgs/yf/yf6.png" alt="" class="abs yf_bottom yf_ins yf_6">\n            '), i.css("opacity", 1), this.yf = new TimelineMax({
                paused: !0
            });
            for (var s = i.find(".yf_top"), n = i.find(".yf_bottom"), e = 0, t = s.length; e < t; e++) this.yf.add(this.generate(s[e], 1), 1.3 * e).to(s[e], .5, {
                opacity: 0
            }, 1.3 * e + 2.5).add(this.generate(n[e], 2), 1.3 * e + .2).to(n[e], 1, {
                opacity: 0
            }, 1.3 * e + 2 + .2);
            this.yf.play().repeat(-1)
        },
        generate: function(i, s) {
            return 1 === s ? new TweenMax(i, 3, {
                bezier: {
                    type: "soft",
                    values: [{
                        x: -70,
                        y: -52
                    }, {
                        x: -80,
                        y: -70
                    }, {
                        x: -85,
                        y: -110
                    }, {
                        x: -93,
                        y: -180
                    }]
                },
                ease: Power0.easeOut
            }) : new TweenMax(i, 3, {
                bezier: {
                    type: "soft",
                    values: [{
                        x: 70,
                        y: 52
                    }, {
                        x: 80,
                        y: 70
                    }, {
                        x: 85,
                        y: 110
                    }, {
                        x: 93,
                        y: 180
                    }]
                },
                ease: Power0.easeOut
            })
        },
        initSwiper: function() {
            var i = this;
            this.swiper = new Swiper(".swiper-container", {
                loop: !1,
                initialSlide: i.chooseMusicIndex,
                centeredSlides: !0,
                slidesPerView: "auto",
                spaceBetween: 30,
                slideToClickedSlide: !0,
                navigation: {
                    nextEl: ".swiper-button-next-xgc",
                    prevEl: ".swiper-button-prev-xgc"
                },
                on: {
                    slideChangeTransitionStart: function() {
                        var s = this.activeIndex,
                            n = i.$songText;
                        i.slideIndex = s, i.slidePreviousIndex = this.previousIndex, 2 === i.musicLoading && i.stopF(i.songArr[i.slidePreviousIndex]), i.changeIntro(n, s, this.previousIndex), i.changeShareText()
                    },
                    init: function() {
                        if (0 === i.chooseMusicIndex) {
                            var s = this.activeIndex,
                                n = i.$songText;
                            i.slideIndex = s, 2 === i.musicLoading && i.stopF(i.songArr[i.slidePreviousIndex]), i.changeIntro(n, s, i.slidePreviousIndex), i.changeShareText()
                        }
                    }
                }
            })
        },
        changeIntro: function(i, s, n) {
            $(i[s]).show(), $(i[n]).hide(), 0 === s ? $(".swiper-button-prev-xgc").css("opacity", .5) : 5 === s ? $(".swiper-button-next-xgc").css("opacity", .5) : ($(".swiper-button-prev-xgc").css("opacity", 1), $(".swiper-button-next-xgc").css("opacity", 1))
        },
        playF: function(i) {
            var n = this,
                e = n.songObj[i].songIns;
            e && "loaded" === e._state ? (e.play(), n.showMusicBtn(1)) : (n.showMusicBtn(2), e = new Howl({
                src: n.songObj[i].songUrl,
                html5: !0,
                onload: function() {
                    this.play(), n.showMusicBtn(1)
                },
                onloaderror: function(i) {
                    s("音频加载失败"), n.showMusicBtn(3)
                },
                onend: function() {
                    n.showMusicBtn(3)
                }
            }), n.songObj[i].songIns = e)
        },
        stopF: function(i) {
            var s = this.songObj[i].songIns;
            s && "loaded" === s._state ? s.pause() : s && (s.unload(), s = null, this.songObj[i].songIns = null), this.showMusicBtn(3)
        },
        showMusicBtn: function(i) {
            switch (i) {
                case 1:
                    this.$musicBtnCon.find(".music_stop").show(), this.$musicBtnCon.find(".music_play").hide(), this.$musicBtnCon.find(".loading_music").hide(), this.addAnm($(this.$musicItem[this.slideIndex]).prev()), $(this.$musicItem[this.slideIndex]).find(".music_banner").addClass("rotatoAnm"), $(this.$musicItem[this.slidePreviousIndex]).find(".music_banner").removeClass("rotatoAnm");
                    break;
                case 2:
                    this.$musicBtnCon.find(".music_stop").hide(), this.$musicBtnCon.find(".loading_music").show(), this.$musicBtnCon.find(".music_play").hide();
                    break;
                case 3:
                    this.yf && (this.yf.kill(), this.yf = null, $(".yf_con").css("opacity", 0)), $(this.$musicItem[this.slideIndex]).find(".music_banner").removeClass("rotatoAnm"), $(this.$musicItem[this.slidePreviousIndex]).find(".music_banner").removeClass("rotatoAnm"), this.$musicBtnCon.find(".music_stop").hide(), this.$musicBtnCon.find(".loading_music").hide(), this.$musicBtnCon.find(".music_play").show(), this.musicLoading = 1
            }
        },
        changeShareText: function() {
            var i = this.slideIndex,
                s = this.songArr[i],
                n = this.songObj[s].shareImg;
            window.nickname || (window.nickname = "");
            var e = window.nickname + " " + this.songObj[s].shareText;
            window.shareData = {
                imgUrl: n,
                timeLineLink: window.location.href.split("?")[0] + "?which_song=" + s,
                tTitle: e,
                tContent: "不完美音乐馆，敬候光临。"
            }
        }
    };
    var e = new n,
        t = ["./imgs/share/hls.jpg", "./imgs/share/znylsf.jpg", "./imgs/share/zdan.jpg", "./imgs/share/zsdg.jpg", "./imgs/share/crf.jpg", "./imgs/share/dlm.jpg", "./imgs/yf/yf1.png", "./imgs/yf/yf2.png", "./imgs/yf/yf3.png", "./imgs/yf/yf4.png", "./imgs/yf/yf5.png", "./imgs/yf/yf6.png", "./imgs/all_back.png", "./imgs/all_water.png", "./imgs/all-sprite.png", "./imgs/btn_sprite.png", "./imgs/change_left.png", "./imgs/change_right.png", "./imgs/main_child.png", "./imgs/main_circle.png", "./imgs/main_earpiece.png", "./imgs/main_guitar.png", "./imgs/main_logo.png", "./imgs/main_magnetic_tape.png", "./imgs/main_small_logo.png", "./imgs/main-biglogo.png", "./imgs/main-lb.png", "./imgs/main-yf.png", "./imgs/music_banner1.png", "./imgs/music_banner2.png", "./imgs/music_banner3.png", "./imgs/music_banner4.png", "./imgs/music_banner5.png", "./imgs/music_banner6.png", "./imgs/music_play_banner.png", "./imgs/music_play.png", "./imgs/music_stop.png", "./imgs/share_text.png", "./imgs/song_crf_text.png", "./imgs/song_dlm_text.png", "./imgs/song_hls_text.png", "./imgs/song_zdan_text.png", "./imgs/song_znylsf_text.png", "./imgs/song_zsdg_text.png"];
    return function() {
        var i = 0,
            s = t.length;
        t.map(function(n) {
            var t = new Image;
            t.onload = function() {
                i++;
                var n = parseInt(i / s * 100);
                i === s ? ($(".loadanimation-con").hide(), $(".container").css("opacity", 1), setTimeout(function() {
                    e.begin()
                }, 100)) : ($(".loadanimation").css({
                    transform: "translateX(" + (n - 100) + "%)"
                }), $("loadanimation-con .loadingtext").text(n + "%"))
            }, t.src = n
        })
    }(), e
}(); /*  |xGv00|eab69d5ea80863815c7b14ff2d52fd15 */