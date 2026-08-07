"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t
    }
}();
! function() {
    for (var e = window.innerHeight, t = window.innerWidth, i = !1, s = ["./imgs/rampage.png", "./imgs/unstoppable.png", "./imgs/godlike.png", "./imgs/dominating.png", "./imgs/legendary.png", "./imgs/rule_con.png", "./imgs/sharep.png", "./imgs/btn_bg.png", "./imgs/gm_bg.jpg", "./imgs/gametip.png", "./imgs/black.png", "./imgs/movelr.png", "./imgs/movet.png", "./imgs/kualan.png", "./imgs/speed.png", "./imgs/runP.png", "./imgs/left.png", "./imgs/right.png", "./imgs/candy.png", "./imgs/binggan.png", "./imgs/ball.png", "./imgs/hand.png"], n = ["接近暴走了", "已经无人能挡了", "已经主宰比赛了", "已经接近神了", "已经超过神了"], a = 0, r = 0, o = s.length; r < o; r++) ! function(e, t) {
        var i = new Image;
        i.onload = function() {
            a++;
            var e = parseInt(a / t * 100);
            if (a === t) {
                new Phaser.Game(h)
            } else $(".loadanimation").css({
                width: e + "%"
            }), $(".loadingtext").text(e + "%")
        }, i.src = s[e]
    }(r, o);
    var p = function(s) {
            function a() {
                _classCallCheck(this, a);
                var e = _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, a));
                return e.fisrtGame = !0, e.loading_touch = !1, e.standLoading = 1, e.beforestand = 1, e.speedmultiple = 1, e.scoremultiple = 1, e.timeCount = 30, e.personruntip = "run", e.SpeedXright = -78, e.SpeedXleft = 75, e.Speedy = -303, e.buttonLoading = !0, e.SCORE = 0, e.$Close = $(".close"), e.$Again = $(".btn_left"), e.$Share = $(".btn_right"), e.$Sharepage = $(".sharepage"), e
            }
            return _inherits(a, s), _createClass(a, [{
                key: "preload",
                value: function() {
                    this.load.image("gmBg", "./imgs/gm_bg.jpg"), this.load.image("gameTip", "./imgs/gametip.png"), this.load.image("black", "./imgs/black.png"), this.load.image("movelr", "./imgs/movelr.png"), this.load.image("movet", "./imgs/movet.png"), this.load.image("kualan", "./imgs/kualan.png"), this.load.spritesheet("speed", "./imgs/speed.png", {
                        frameWidth: 523,
                        frameHeight: 175
                    }), this.load.spritesheet("runP", "./imgs/runP.png", {
                        frameWidth: 188,
                        frameHeight: 331
                    }), this.load.spritesheet("left", "./imgs/left.png", {
                        frameWidth: 338,
                        frameHeight: 300
                    }), this.load.spritesheet("right", "./imgs/right.png", {
                        frameWidth: 291,
                        frameHeight: 343
                    }), this.load.spritesheet("candy", "./imgs/candy.png", {
                        frameWidth: 192,
                        frameHeight: 87
                    }), this.load.spritesheet("binggan", "./imgs/binggan.png", {
                        frameWidth: 154,
                        frameHeight: 110
                    }), this.load.spritesheet("ball", "./imgs/ball.png", {
                        frameWidth: 127,
                        frameHeight: 134
                    }), this.load.spritesheet("hand", "./imgs/hand.png", {
                        frameWidth: 150,
                        frameHeight: 253
                    }), this.load.audio("getfail", "./music/getfail.mp3"), this.load.audio("getcandy", "./music/getcandy.mp3")
                }
            }, {
                key: "create",
                value: function() {
                    var i = this;
                    this.getfail = this.sound.add("getfail"), this.getcandy = this.sound.add("getcandy"), this.add.image(0, 0, "gmBg").setOrigin(0, 0).setScale(t / 750, e / 1206), this.add.image((t - 750) / 2 + 50, 40, "gameTip").setOrigin(0, 0), this.add.image(700 + (t - 750) / 2, 40, "gameTip").setOrigin(1, 0), this.black = this.add.image(0, 0, "black").setOrigin(0, 0).setScale(t / 750, e / 1206).setAlpha(.8).setVisible(!1), this.movelr = this.add.image(t / 2, e / 2, "movelr").setOrigin(.5, .5).setVisible(!1), this.black.depth = 10, this.movelr.depth = 11;
                    var s = {
                        fontFamily: "fancyFont",
                        fontSize: 26,
                        color: "#ffffff"
                    };
                    this.textTime = this.add.text((t - 750) / 2 + 50 + 89, 71, "时间：30s", s).setOrigin(.5, .5), this.textFraction = this.add.text(700 + (t - 750) / 2 - 89, 71, "积分：" + this.SCORE, s).setOrigin(.5, .5), this.personAnm = this.physics.add.sprite(t / 2 + 8, e - 440 * e / 1206, "runP").setOrigin(.5, 1), this.anims.create({
                        key: "walk",
                        frames: this.anims.generateFrameNumbers("runP", {
                            start: 0,
                            end: 1
                        }),
                        frameRate: 6,
                        repeat: -1
                    }), this.personAnm.anims.play("walk", !0), this.personAnm.depth = 2, this.gamePeGroup = this.physics.add.group(), this.gameOutGroup = this.physics.add.group(), this.speedGroup = this.physics.add.group(), this.getGamesprite(), this.getGameLeft(), this.physics.add.overlap(this.personAnm, this.gamePeGroup, this.setScore, null, this), this.time.addEvent({
                        delay: 1e3,
                        callback: function() {
                            if (--i.timeCount <= 0) i.textTime.setText("时间：0s"), i.gamePeGroup.clear(!0), i.scene.pause(), $(".headImg").attr("src", window.headimg), $(".name").text(window.nickname), $(".firstline").text("恭喜" + window.nickname + "获得" + i.SCORE + "分"), i.judgeResult(i.SCORE), i.buttonLoading = !0, $(".topMeng").show(), $(".endpage").show(), i.showResultDomAnm.restart();
                            else if (i.textTime.setText("时间：" + i.timeCount + "s"), 24 === i.timeCount) {
                                i.speedmultiple = 1.2, i.scoremultiple = 2;
                                var s = i.speedGroup.create(390 + (t - 750) / 2, e, "speed", 1).setOrigin(.5, 0);
                                s.setVelocityY(-101)
                            } else if (18 === i.timeCount) {
                                i.speedmultiple = 1.5, i.scoremultiple = 3;
                                var n = i.speedGroup.create(390 + (t - 750) / 2, e, "speed", 2).setOrigin(.5, 0);
                                n.setVelocityY(-101)
                            } else if (12 === i.timeCount) {
                                i.speedmultiple = 1.8, i.scoremultiple = 4;
                                var a = i.speedGroup.create(390 + (t - 750) / 2, e, "speed", 3).setOrigin(.5, 0);
                                a.setVelocityY(-101)
                            } else if (6 === i.timeCount) {
                                i.speedmultiple = 2, i.scoremultiple = 5;
                                var r = i.speedGroup.create(390 + (t - 750) / 2, e, "speed", 4).setOrigin(.5, 0);
                                r.setVelocityY(-101)
                            }
                        },
                        loop: 30
                    }), this.initGameOut(), this.fisrtGame && ($(".loadanimation").css({
                        width: "100%"
                    }), $(".loadingtext").text("100%"), setTimeout(function() {
                        $(".loading_con").hide(), i.scene.pause(), i.addEvent(), i.addJqueryEvent(), i.showResultDom()
                    }, 200))
                }
            }, {
                key: "judgeResult",
                value: function(e) {
                    var t = null;
                    e > 300 ? ($(".legendary").show(), $(".legendary").siblings().hide(), t = n[4]) : e > 220 ? ($(".godlike").show(), $(".godlike").siblings().hide(), t = n[3]) : e > 150 ? ($(".dominating").show(), $(".dominating").siblings().hide(), t = n[2]) : e >= 100 ? ($(".unstoppable").show(), $(".unstoppable").siblings().hide(), t = n[1]) : ($(".rampage").show(), $(".rampage").siblings().hide(), t = n[0]), $(".seondline").text(t)
                }
            }, {
                key: "addJqueryEvent",
                value: function() {
                    this.$Close.on("click", function() {
                        var e = this;
                        $(".topMeng").hide(), $(".firstpage").hide(), this.scene.resume(), this.fisrtGame && setTimeout(function() {
                            e.black.setVisible(!0), e.movelr.setVisible(!0), e.scene.pause(), setTimeout(function() {
                                i = !0
                            }, 300)
                        }, 600)
                    }.bind(this)), this.$Again.on("click", function() {
                        this.buttonLoading || (this.fisrtGame = !1, this.initGameData(), this.scene.restart(), $(".topMeng").hide(), $(".endpage").hide())
                    }.bind(this)), this.$Share.on("click", function() {
                        this.buttonLoading || ($(".endpage").hide(), $(".sharepage").show())
                    }.bind(this)), this.$Sharepage.on("click", function() {
                        $(".sharepage").hide(), $(".endpage").show()
                    }.bind(this));
                    var e, t, s, n = document.getElementById("text_con");
                    n.addEventListener("touchstart", function(i) {
                        e = this.scrollTop, t = i.targetTouches[0].pageY
                    }, !0), n.addEventListener("touchmove", function(i) {
                        s = i.targetTouches[0].pageY;
                        var n = s - t,
                            a = this;
                        a.scrollHeight > a.offsetHeight + 1 && (n < 0 && 0 === e || n > 0 && e > n || e > 0 && e + 1 < a.scrollHeight - a.offsetHeight) && i.stopPropagation()
                    }, !0)
                }
            }, {
                key: "initGameData",
                value: function() {
                    this.timeCount = 30, this.standLoading = 1, this.beforestand = 1, this.personruntip = "run", this.speedmultiple = 1, this.scoremultiple = 1, this.SCORE = 0
                }
            }, {
                key: "initGameOut",
                value: function() {
                    var i = this.gameOutGroup.create(130, e - 305 - 252 * e / 1206, "left", 0).setOrigin(1, 1).setScale(.3 + (e - 305 - 202 * e / 1206 - 250 * e / 1206) / (e - 250 * e / 1206) * .7);
                    i.setVelocity(40, -101 * e / 1206), i.type = "left";
                    var s = this.gameOutGroup.create(t - 100, e - 305 - 252 * e / 1206, "right", 0).setOrigin(0, 1).setScale(.3 + (e - 305 - 202 * e / 1206 - 250 * e / 1206) / (e - 250 * e / 1206) * .7);
                    s.setVelocity(-100, -101 * e / 1206), s.type = "right";
                    var n = this.gameOutGroup.create(220, e - 305 - 504 * e / 1206, "left", 2).setOrigin(1, 1).setScale(.3 + (e - 305 - 504 * e / 1206 - 250 * e / 1206) / (e - 250 * e / 1206) * .7);
                    n.setVelocity(40, -101 * e / 1206), n.type = "left";
                    var a = this.gameOutGroup.create(t - 200, e - 305 - 504 * e / 1206, "right", 2).setOrigin(0, 1).setScale(.3 + (e - 305 - 504 * e / 1206 - 250 * e / 1206) / (e - 250 * e / 1206) * .7);
                    a.setVelocity(-100, -101 * e / 1206), a.type = "right"
                }
            }, {
                key: "setScore",
                value: function(e, t) {
                    if ("run" === this.personruntip) {
                        if (this.standLoading !== t.getPewehre) return;
                        e.y > t.y + 20 && e.y < t.y + 80 && "hand" === t.getType ? (this.gamePeGroup.remove(t, !0, !0), this.createSorceText(e.x - 20, e.y - 380, t.getvalue)) : e.y < t.y + 50 && "hand" !== t.getType && (this.gamePeGroup.remove(t, !0, !0), this.createSorceText(e.x - 20, e.y - 380, t.getvalue))
                    } else if ("jump" === this.personruntip) {
                        if (this.standLoading !== t.getPewehre) return;
                        if ("hand" !== t.getType) return;
                        e.y > t.y + 20 && e.y < t.y + 80 && (this.gamePeGroup.remove(t, !0, !0), this.createSorceText(e.x - 20, e.y - 380, t.getvalue))
                    } else if ("jumpmove" === this.personruntip) {
                        if (this.standLoading !== t.getPewehre) return;
                        if ("hand" !== t.getType) return;
                        e.y > t.y + 20 && e.y < t.y + 80 && (this.gamePeGroup.remove(t, !0, !0), this.createSorceText(e.x - 20, e.y - 380, t.getvalue))
                    } else if ("move" === this.personruntip) {
                        if (this.standLoading !== t.getPewehre) return;
                        e.y > t.y + 20 && e.y < t.y + 80 && "hand" === t.getType ? (this.gamePeGroup.remove(t, !0, !0), this.createSorceText(e.x - 20, e.y - 380, t.getvalue)) : e.y < t.y + 60 && "hand" !== t.getType && (this.gamePeGroup.remove(t, !0, !0), this.createSorceText(e.x - 20, e.y - 380, t.getvalue))
                    }
                }
            }, {
                key: "getGameLeft",
                value: function() {
                    var i = this,
                        s = Phaser.Math.Between(0, 6),
                        n = this.gameOutGroup.create(0, e - 305, "left", s).setOrigin(1, 1);
                    n.setVelocity(40, -101 * e / 1206), n.type = "left";
                    var a = this.gameOutGroup.create(t, e - 305, "right", s).setOrigin(0, 1);
                    a.setVelocity(-100, -101 * e / 1206), a.type = "right", this.time.addEvent({
                        delay: parseInt(4e3),
                        callback: function() {
                            i.getGameLeft()
                        },
                        loop: !1
                    })
                }
            }, {
                key: "getfollowSprite",
                value: function(i, s) {
                    var n = [];
                    n = 0 === s ? [1, 2] : 1 === s ? [0, 2] : [0, 1];
                    var a = Phaser.Math.Between(0, 1),
                        r = Phaser.Math.Between(0, 4),
                        o = n[a],
                        p = null,
                        h = null;
                    r > 1 ? (p = "hand", h = r - 2) : (p = "ball", h = r);
                    var l = "-" + 5 * this.scoremultiple,
                        u = null;
                    2 === o ? (u = this.gamePeGroup.create(690 + (t - 750) / 2, e, p, h).setOrigin(.5, 0), u.setVelocity(this.SpeedXright * this.speedmultiple, this.Speedy * this.speedmultiple * e / 1206)) : 0 === o ? (u = this.gamePeGroup.create((t - 750) / 2 + 80, e, p, h).setOrigin(.5, 0), u.setVelocity(this.SpeedXleft * this.speedmultiple, this.Speedy * this.speedmultiple * e / 1206)) : 1 === o && (u = this.gamePeGroup.create(384 + (t - 750) / 2, e, p, h).setOrigin(.5, 0), u.setVelocityY(this.Speedy * this.speedmultiple * e / 1206)), u.getvalue = l, u.getType = p, u.getPewehre = o, u.depth = 1
                }
            }, {
                key: "getGamesprite",
                value: function() {
                    var i = this,
                        s = Phaser.Math.Between(0, 2),
                        n = Phaser.Math.Between(0, 10),
                        a = null,
                        r = null,
                        o = null,
                        p = null;
                    n > 7 ? (a = "hand", r = n - 8, o = "-" + 5 * this.scoremultiple) : n > 5 ? (a = "ball", r = n - 6, o = "-" + 5 * this.scoremultiple) : n > 2 ? (a = "binggan", r = n - 3, 0 === r ? o = "+" + 10 * this.scoremultiple : 1 === r ? o = "+" + this.scoremultiple : 2 === r && (o = "+" + 5 * this.scoremultiple)) : (a = "candy", r = n, o = "+" + 3 * this.scoremultiple), 2 === s ? (p = this.gamePeGroup.create(690 + (t - 750) / 2, e, a, r).setOrigin(.5, 0), p.setVelocity(this.SpeedXright * this.speedmultiple, this.Speedy * this.speedmultiple * e / 1206)) : 0 === s ? (p = this.gamePeGroup.create((t - 750) / 2 + 80, e, a, r).setOrigin(.5, 0), p.setVelocity(this.SpeedXleft * this.speedmultiple, this.Speedy * this.speedmultiple * e / 1206)) : 1 === s && (p = this.gamePeGroup.create(384 + (t - 750) / 2, e, a, r).setOrigin(.5, 0), p.setVelocityY(this.Speedy * this.speedmultiple * e / 1206)), p.getvalue = o, p.getType = a, p.getPewehre = s, p.depth = 1, this.getfollowSprite(a, s), this.time.addEvent({
                        delay: parseInt(1500 / this.speedmultiple),
                        callback: function() {
                            i.getGamesprite()
                        },
                        loop: !1
                    })
                }
            }, {
                key: "addEvent",
                value: function() {
                    var e, t, s, n, a, r = this;
                    $(".gamecontainer").on("touchstart", function(i) {
                        a = !0, e = i.originalEvent.changedTouches[0].pageX, t = i.originalEvent.changedTouches[0].pageY
                    }), $(".gamecontainer").on("touchmove", function(o) {
                        s = o.originalEvent.changedTouches[0].pageX, n = o.originalEvent.changedTouches[0].pageY;
                        var p = n - t,
                            h = s - e;
                        if (i) return r.scene.resume(), i = !1, r.black.setVisible(!1), r.movelr.setVisible(!1), !1;
                        Math.abs(h) > Math.abs(p) && h < -5 ? 0 !== r.standLoading && a && (a = !1, "jump" === r.personruntip ? r.personruntip = "jumpmove" : r.personruntip = "move", r.changePersonStand("left", r.standLoading), r.personAnm.setVelocityX(-500)) : Math.abs(h) > Math.abs(p) && h > 5 && 2 !== r.standLoading && a && (a = !1, "jump" === r.personruntip ? r.personruntip = "jumpmove" : r.personruntip = "move", r.changePersonStand("right", r.standLoading), r.personAnm.setVelocityX(500))
                    }), $(".gamecontainer").on("touchend", function(e) {})
                }
            }, {
                key: "showResultDom",
                value: function() {
                    var e = this;
                    this.showResultDomAnm = new TimelineMax({
                        paused: !0
                    }), this.showResultDomAnm.from(".headImg", .8, {
                        opacity: 0,
                        y: 30,
                        ease: Power0.easeInOut
                    }, "one").from(".name", .8, {
                        opacity: 0,
                        y: 30,
                        ease: Power0.easeInOut
                    }, "one+=0.2").from(".love_con", .8, {
                        opacity: 0,
                        scale: .5,
                        ease: Power0.easeInOut
                    }, "one+=0.6").from(".info", .6, {
                        opacity: 0,
                        y: 20,
                        ease: Power0.easeInOut
                    }, "one+=1.2").from(".btn_left", 2, {
                        opacity: 0,
                        y: 70,
                        ease: Elastic.easeOut.config(1, .3)
                    }, "one+=1.8").from(".btn_right", 2, {
                        opacity: 0,
                        y: 70,
                        ease: Elastic.easeOut.config(1, .3),
                        onComplete: function() {
                            e.buttonLoading = !1
                        }
                    }, "one+=2.1").from(".text", 1, {
                        opacity: 0,
                        ease: Power0.easeInOut
                    }, "one+=2.4")
                }
            }, {
                key: "createSorceText",
                value: function(e, t, i) {
                    i.includes("-") ? (this.getfail.play(), this.SCORE = this.SCORE - Number(i.substr(1)) >= 0 ? this.SCORE - Number(i.substr(1)) : 0) : i.includes("+") && (this.getcandy.play(), this.SCORE = this.SCORE + Number(i.substr(1))), this.textFraction.setText("得分：" + this.SCORE);
                    var s = e + Phaser.Math.Between(-45, 45),
                        n = this.add.text(s, t, "" + i, {
                            fontFamily: "fancyFont",
                            color: "#fff",
                            fontSize: "50px",
                            stroke: "#7d1e2d",
                            strokeThickness: 6
                        });
                    n.depth = 3, this.add.tween({
                        targets: n,
                        y: "-=60",
                        ease: "Linear",
                        duration: 1e3,
                        repeat: 0,
                        yoyo: !1,
                        onComplete: function() {
                            n.destroy()
                        }
                    })
                }
            }, {
                key: "changePersonStand",
                value: function(e, t) {
                    "left" === e ? this.beforestand = this.standLoading-- : "right" === e && (this.beforestand = this.standLoading++)
                }
            }, {
                key: "stopPreson",
                value: function(i, s, n, a) {
                    var r = 170 * Math.abs(a - 1);
                    n <= e - 440 * e / 1206 - 70 ? i.setVelocityY(150) : n > e - 440 * e / 1206 && ("jump" !== this.personruntip && "jumpmove" !== this.personruntip || (i.setVelocityY(0), i.anims.play("walk", !0), "jump" === this.personruntip ? this.personruntip = "run" : "jumpmove" === this.personruntip && (this.personruntip = "move"), i.y = e - 440 * e / 1206)), 0 === a || 2 === a ? s >= t / 2 + 8 + r && 1 === this.beforestand ? (this.beforestand = a, i.setVelocityX(0), "jumpmove" === this.personruntip ? this.personruntip = "jump" : "move" === this.personruntip && (this.personruntip = "run")) : s <= t / 2 + 8 - r && 1 === this.beforestand && (this.beforestand = a, i.setVelocityX(0), "jumpmove" === this.personruntip ? this.personruntip = "jump" : "move" === this.personruntip && (this.personruntip = "run")) : 1 === a && (s >= t / 2 + r + 8 && 0 === this.beforestand ? (this.beforestand = 1, i.setVelocityX(0), "jumpmove" === this.personruntip ? this.personruntip = "jump" : "move" === this.personruntip && (this.personruntip = "run")) : s <= t / 2 + r + 8 && 2 === this.beforestand && (this.beforestand = 1, i.setVelocityX(0), "jumpmove" === this.personruntip ? this.personruntip = "jump" : "move" === this.personruntip && (this.personruntip = "run")))
                }
            }, {
                key: "update",
                value: function() {
                    var t = this;
                    this.gamePeGroup && this.gamePeGroup.getChildren().forEach(function(i) {
                        if (i.y < 200 * e / 1206) t.gamePeGroup.remove(i, !0, !0);
                        else {
                            var s = .3 + (i.y - 200 * e / 1206) / (e - 200 * e / 1206) * .7;
                            i.setScale(s), 2 === i.getPewehre ? i.setVelocity(t.SpeedXright * t.speedmultiple * s, t.Speedy * t.speedmultiple * e / 1206 * s) : 0 === i.getPewehre ? i.setVelocity(t.SpeedXleft * t.speedmultiple * s, t.Speedy * t.speedmultiple * e / 1206 * s) : 1 === i.getPewehre && i.setVelocityY(t.Speedy * t.speedmultiple * e / 1206 * s)
                        }
                    }), this.gameOutGroup && this.gameOutGroup.getChildren().forEach(function(i) {
                        if (i.y < 250 * e / 1206) t.gameOutGroup.remove(i, !0, !0);
                        else {
                            var s = .4 + (i.y - 250 * e / 1206) / (e - 250 * e / 1206) * .7;
                            i.setScale(s), "right" === i.type ? i.setVelocity(-40 * s, -101 * e / 1206 * s) : i.setVelocity(40 * s, -101 * e / 1206 * s)
                        }
                    }), this.speedGroup && this.speedGroup.getChildren().forEach(function(i) {
                        if (i.y < 250 * e / 1206) t.speedGroup.remove(i, !0, !0);
                        else {
                            var s = .3 + (i.y - 250 * e / 1206) / (e - 250 * e / 1206) * .7;
                            i.setScale(s), i.setVelocityY(-200 * e / 1206)
                        }
                    }), this.stopPreson(this.personAnm, this.personAnm.x, this.personAnm.y, this.standLoading)
                }
            }]), a
        }(Phaser.Scene),
        h = {
            type: Phaser.CANVAS,
            parent: "gamecontainer",
            width: t,
            height: e,
            physics: {
                default: "arcade",
                arcade: {}
            },
            audio: {
                disableWebAudio: !0
            },
            backgroundColor: 16777215,
            scene: [p]
        }
}($);