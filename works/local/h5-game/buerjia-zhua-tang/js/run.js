!function (t, e, a) {
    "use strict";
    var s, i, o, n, h, d, c = {}, r = !1;
    o = e.document.documentElement.getBoundingClientRect(),
        // i = "https://mat1.gtimg.com/zj/maxbao/peko-catch-game/imgs/",
        i = "imgs/",
        n = o.width,
        h = o.height;
    var l = {
        firstLoad: [{
            name: "logo",
            file: "logo.png"
        }, {
            name: "main-title",
            file: "main-title.png"
        }, {
            name: "machine",
            file: "home-machine.png"
        }, {
            name: "home-girl",
            file: "home-girl.png"
        }, {
            name: "start-btn",
            file: "start-btn.png"
        }, {
            name: "rules-btn",
            file: "rules-btn.png"
        }]
    }
        , m = function () { };
    m.prototype = {
        init: function (t) {
            this.setInfo(),
                this.setJqMap(),
                this.setAnimation(),
                this.preLoad(t.firstLoad, this.checkLoad),
                this.setListeners()
        },
        setInfo: function () {
            this.width = o.width,
                this.height = 9.936 * o.height
        },
        setJqMap: function () {
            this.$loadingCover = t("#loadingCover"),
                this.$loadBar = t("#loadBar"),
                this.$loadInner = this.$loadBar.find(".load-inner"),
                this.$loadWords = this.$loadBar.find(".load-words"),
                this.$homePage = t("#homePage"),
                this.$startBtn = this.$homePage.find("#startBtn"),
                this.$rulesBtn = this.$homePage.find("#rulesBtn"),
                this.$infoPage = t("#infoPage"),
                this.$startGameBtn = this.$infoPage.find("#startBtnInfo"),
                this.$endPage = t("#endPage"),
                this.startSound = document.getElementById("startSound")
        },
        setAnimation: function () {
            var t = this;
            this.loadingBubble = new TimelineMax({
                paused: !0
            }),
                this.loadingBubble.staggerFrom(".home-ball", 2, {
                    opacity: 0,
                    y: "100%",
                    clearProps: "all",
                    ease: Power4.easeOut
                }, .1),
                this.showHomePage = new TimelineMax({
                    paused: !0,
                    onStart: function () {
                        t.$loadBar.hide()
                    }
                }),
                this.showHomePage.from("#logo", 1, {
                    opacity: 0,
                    scale: .1,
                    ease: Elastic.easeOut.config(1, .3)
                }, 0).from("#mainTitle", 1, {
                    opacity: 0,
                    scale: .1,
                    ease: Elastic.easeOut.config(1, .3)
                }, .2).from("#homeGround", 2, {
                    opacity: 0,
                    ease: Power2.easeOut
                }, .6).from("#homeGirl", .5, {
                    opacity: 0,
                    ease: Power4.easeIn
                }, .6).from("#startBtn", 1, {
                    opacity: 0,
                    scale: .5,
                    ease: Elastic.easeOut.config(1, .3)
                }, 1).from("#rulesBtn", 1, {
                    opacity: 0,
                    scale: .5,
                    ease: Elastic.easeOut.config(1, .3)
                }, 1.2),
                this.hideHomePage = new TimelineMax({
                    paused: !0,
                    onStart: function () {
                        r && t.$infoPage.show()
                    },
                    onComplete: function () {
                        if (r)
                            return !1;
                        t.$homePage.fadeOut(),
                            s.paused = !1
                    }
                }),
                this.hideHomePage.staggerTo(".home-ball", .5, {
                    opacity: 0,
                    y: "-100%",
                    ease: Power4.easeOut
                }, .1).to(".home-inner", .5, {
                    opacity: 0
                }, 0),
                this.showInfoPage = new TimelineMax({
                    paused: !0
                }),
                this.showInfoPage.staggerFrom(".info-ball", 2, {
                    opacity: 0,
                    y: "100%",
                    clearProps: "all",
                    ease: Power4.easeOut
                }, .1).from("#startBtnInfo", 1, {
                    opacity: 0,
                    scale: .5,
                    ease: Elastic.easeOut.config(1, .3)
                }, 1).from("#descWords", 1, {
                    opacity: 0,
                    y: "5%",
                    ease: Power4.easeOut
                }, .6),
                this.hideInfoPage = new TimelineMax({
                    paused: !0,
                    onStart: function () {
                        t.$homePage.fadeOut(),
                            t.$infoPage.fadeOut(),
                            s.paused = !1,
                            startSound.play()
                    }
                }),
                this.hideInfoPage.staggerTo(".info-ball", .5, {
                    opacity: 0,
                    y: "-100%",
                    ease: Power4.easeOut
                }, .1).to(".info-page #startBtn", .5, {
                    opacity: 0
                }, 0).to("#descWords", .5, {
                    opacity: 0
                }, 0),
                this.showEndPage = new TimelineMax({
                    paused: !0,
                    onStart: function () {
                        t.$endPage.show()
                    }
                }),
                this.showEndPage.staggerFrom(".end-ball", 2, {
                    opacity: 0,
                    y: "100%",
                    clearProps: "all",
                    ease: Power4.easeOut
                }, .1).from("#endGirl", .5, {
                    opacity: 0
                }, .4).from("#scoreWrap", .5, {
                    opacity: 0
                }, .6).from("#enterBtnWrap", .5, {
                    opacity: 0
                }, .6)
        },
        preLoad: function (e, a) {
            this.$loadingCover.hide();
            var s = e.length
                , o = 1
                , n = 0
                , h = this
                , d = function () {
                    n = o++ / s,
                        "function" == typeof a && a(n, h)
                };
            t.each(e, function (t, e) {
                var a = new Image;
                a.onload = d,
                    a.src = i + e.file
            })
        },
        checkLoad: function (t, e) {
            var a = 100 * t
                , s = e.loadingBubble.endTime();
            e.$loadInner.css("width", a + "%"),
                e.$loadWords.html(parseInt(a) + "%"),
                e.loadingBubble.tweenTo(t * s),
                1 === t && e.showHomePage.play()
        },
        setListeners: function () {
            var t = this;
            this.$rulesBtn.on("click", function () {
                r = !0,
                    t.hideHomePage.play(),
                    t.showInfoPage.play()
            }),
                this.$startBtn.on("click", function () {
                    t.hideHomePage.play(),
                        t.startSound.play()
                }),
                this.$startGameBtn.on("click", function () {
                    r = !1,
                        t.hideInfoPage.play(),
                        t.startSound.play()
                })
        }
    },
        t(function () {
            d = new m,
                d.init(l)
        }),
        c.GamePage = function () {
            this.total = 0,
                this.timer = 0,
                this.isCatching = !1,
                this.isCatched = !1,
                this.score = 0,
                this.conutSecond = 30,
                this.sugarScore = 0
        }
        ,
        c.GamePage.prototype = {
            preload: function () {
                this.load.spritesheet("machine", i + "machine.png"),
                    this.load.spritesheet("machine-mask", i + "machine-mask.png"),
                    this.load.spritesheet("machine-face", i + "machine-face.png", 220, 146, 3),
                    this.load.spritesheet("machine-hand", i + "machine-hand.png", 250, 221, 2),
                    this.load.spritesheet("machine-hand-back", i + "machine-hand-back.png", 250, 221, 2),
                    this.load.spritesheet("stick", i + "stick.png", 250, 221, 2),
                    this.load.spritesheet("dog", i + "dog.png"),
                    this.load.spritesheet("dog-words", i + "dog-words.png", 208, 167, 2),
                    this.load.spritesheet("sugars", i + "sugars.png", 120, 104, 4),
                    this.load.spritesheet("catch-btn", i + "catch-btn.png", 214, 211),
                    s.load.audio("start", i + "start.mp3"),
                    s.load.audio("success", i + "success.mp3"),
                    s.load.audio("fail", i + "fail.mp3")
            },
            create: function () {
                var t = this;
                this.startSound = this.add.audio("start"),
                    this.successSound = this.add.audio("success"),
                    this.failSound = this.add.audio("fail"),
                    s.paused = !0,
                    this.physics.startSystem(a.Physics.ARCADE);
                var t = this
                    , e = .1 * n;
                this.stage.backgroundColor = "#eee74c",
                    this.machine = this.add.image(0, e, "machine"),
                    this.machine.scale.setTo(n / this.machine.texture.frame.width),
                    this.face = this.add.sprite(74, 25, "machine-face"),
                    this.machine.addChild(this.face),
                    this.handBack = this.add.sprite(.68 * n, .6 * n, "machine-hand-back"),
                    this.handBack.anchor.set(.5, 1),
                    this.handBack.scale.setTo(n / 800),
                    this.sugars = this.add.physicsGroup(),
                    this.hand = this.add.sprite(.68 * n, .6 * n, "machine-hand"),
                    this.hand.anchor.set(.5, 1),
                    this.hand.scale.setTo(n / 800),
                    this.physics.arcade.enable(this.hand),
                    this.hand.body.setSize(25, 40, 115, 180),
                    this.stick = this.add.sprite(-5, -140, "stick"),
                    this.stick.anchor.set(.5, 1),
                    this.stick.scale.setTo(n / 450),
                    this.handBack.addChild(this.stick),
                    this.catchDown = this.add.tween(this.hand).to({
                        y: 1.1 * n
                    }, 500, a.Easing.Cubic.InOut, !1, 0, 0, !1),
                    this.catchUp = this.add.tween(this.hand).to({
                        y: .6 * n
                    }, 500, "Linear", !1, 0, 0, !1),
                    this.catchDown.onStart.add(function () {
                        t.hand.frame = 1
                    }),
                    this.catchDown.onComplete.add(function () {
                        t.hand.frame = 0,
                            t.physics.arcade.collide(t.hand, t.sugars, t.collisionHandler, t.processHandler, t),
                            t.catchUp.start()
                    }),
                    this.catchBackDown = this.add.tween(this.handBack).to({
                        y: 1.1 * n
                    }, 500, a.Easing.Cubic.InOut, !1, 0, 0, !1),
                    this.catchBackUp = this.add.tween(this.handBack).to({
                        y: .6 * n
                    }, 500, "Linear", !1, 0, 0, !1),
                    this.catchDown.onStart.add(function () {
                        t.handBack.frame = 1
                    }),
                    this.catchDown.onComplete.add(function () {
                        t.handBack.frame = 0,
                            t.catchBackUp.start()
                    }),
                    this.catchUp.onComplete.add(function () {
                        t.isCatching = !1,
                            t.isCatched = !1
                    }),
                    this.machineMask = this.add.image(0, e, "machine-mask"),
                    this.machineMask.scale.setTo(n / this.machine.texture.frame.width),
                    this.dog = this.add.sprite(.1 * n, .75 * h, "dog"),
                    this.dog.anchor.set(0, 1),
                    this.dog.scale.setTo(n / 700),
                    this.dogWords = this.add.sprite(100, -150, "dog-words", 0),
                    this.dogWords.anchor.set(0, 1),
                    this.dogWords.scale.setTo(n / 400),
                    this.dogWords.alpha = 0,
                    this.dog.addChild(this.dogWords),
                    this.catchBtn = this.game.add.button(this.world.centerX, .88 * h, "catch-btn", this.catchIt, this, 1, 1, 0),
                    this.catchBtn.anchor.set(.5, .5),
                    this.catchBtn.scale.setTo(n / 800);
                var i = {
                    font: "bold 20px",
                    fill: "#7d1b2d"
                };
                this.scoreText = this.add.text(this.catchBtn.x, this.catchBtn.y - 65, "得分:" + this.score, i),
                    this.scoreText.anchor.set(.5, .5),
                    i = {
                        font: "bold 25px",
                        fill: "#7d1b2d"
                    },
                    this.secondText = this.add.text(.95 * n, .02 * h, this.conutSecond + " s", i),
                    this.secondText.anchor.set(1, 0),
                    i = {
                        font: "bold 34px",
                        fill: "#ffffff"
                    },
                    this.addScoreWords = this.add.text(.68 * n, .65 * n, "+ " + this.sugarScore, i),
                    this.addScoreWords.anchor.set(.5, .5),
                    this.addScoreWords.stroke = "#7d1b2d",
                    this.addScoreWords.strokeThickness = 5,
                    this.addScoreWords.alpha = 0,
                    this.addScoreWords.showMe = this.add.tween(this.addScoreWords).to({
                        y: .4 * n,
                        alpha: 0
                    }, 1e3, a.Easing.Cubic.Out, !1),
                    this.time.events.loop(a.Timer.SECOND, this.checkTime, this)
            },
            checkTime: function () {
                if (this.conutSecond-- ,
                    this.secondText.text = this.conutSecond + " s",
                    this.conutSecond <= 0) {
                    s.paused = !0,
                        t("#gamePage").fadeOut(),
                        d.showEndPage.play(),
                        t("#endScore").html(this.score);
                    var a = {
                        times: 1,
                        best: this.score
                    }
                        , i = e.localStorage.getItem("pekoCatch");
                    if (i) {
                        var o = JSON.parse(i);
                        o.times < 3 && a.best > o.best ? t("#lastScore").html(a.best) : (t("#lastScore").html(o.best),
                            a.best = o.best),
                            a.times = o.times + 1,
                            e.localStorage.setItem("pekoCatch", JSON.stringify(a))
                    } else
                        t("#lastScore").html(a.best),
                            e.localStorage.setItem("pekoCatch", JSON.stringify(a))
                }
            },
            catchIt: function () {
                if (this.isCatching)
                    return !1;
                this.isCatching = !0,
                    this.catchDown.start(),
                    this.catchBackDown.start(),
                    this.dogWords.alpha = 0
            },
            update: function () {
                this.total < 500 && this.time.now > this.timer && this.createSugars()
            },
            collisionHandler: function (t, e) { },
            processHandler: function (t, e) {
                if (this.isCatched)
                    return !1;
                var a = this.rnd.between(0, 2);
                this.isCatched = !0,
                    e.move.pause(),
                    this.face.frame = 1,
                    1 === a ? e.isFail.start() : e.isSuccess.start()
            },
            render: function () { },
            createSugars: function () {
                var t, e = this, a = this.rnd.between(0, 3);
                switch (t = this.add.sprite(.1 * n, .78 * n, "sugars", a),
                t.anchor.set(.5, .5),
                t.scale.setTo(n / 600),
                t.move = this.add.tween(t).to({
                    x: n + 200,
                    y: 1.49 * n
                }, 4e3, "Linear", !0),
                t.isSuccess = this.add.tween(t).to({
                    y: .6 * n
                }, 500, "Linear", !1),
                t.addScore = this.add.tween(t).to({
                    y: t.y - 100,
                    alpha: 0
                }, 100, "Linear", !1),
                t.addScoreEf = this.add.tween(t.scale).to({
                    x: .5,
                    y: .5
                }, 100, "Linear", !1),
                t.isFail = this.add.tween(t).to({
                    y: .7 * n
                }, 400, "Linear", !1),
                t.dropDown = this.add.tween(t).to({
                    y: t.y + 100,
                    alpha: 0,
                    angle: 360
                }, 500, "Linear", !1),
                t.move.onComplete.add(function (t) {
                    t.kill()
                }),
                t.isSuccess.onComplete.add(function (t) {
                    t.addScore.start(),
                        t.addScoreEf.start(),
                        e.addScoreWords.text = "+ " + t.score,
                        e.addScoreWords.y = .55 * n,
                        e.addScoreWords.alpha = 1,
                        e.addScoreWords.showMe.start(),
                        e.successSound.play(),
                        e.dogWords.frame = 1,
                        e.dogWords.alpha = 1
                }),
                t.addScore.onComplete.add(function (t) {
                    e.score += t.score,
                        e.scoreText.text = "得分：" + e.score,
                        e.face.frame = 0,
                        e.addScoreWords.showMe.resume()
                }),
                t.isFail.onComplete.add(function (a) {
                    t.dropDown.start(),
                        e.face.frame = 2,
                        e.dogWords.frame = 0,
                        e.dogWords.alpha = 1,
                        e.failSound.play()
                }),
                t.dropDown.onComplete.add(function (t) {
                    t.kill(),
                        e.face.frame = 0
                }),
                this.sugars.add(t),
                a) {
                    case 0:
                        t.score = 5;
                        break;
                    case 1:
                        t.score = 1;
                        break;
                    case 2:
                        t.score = 3;
                        break;
                    case 3:
                        t.score = 10
                }
                this.total++ ,
                    this.timer = s.time.now + 600
            }
        },
        s = new a.Game(e.innerWidth, e.innerHeight, a.CANVAS, "gamePage"),
        s.state.add("GamePage", c.GamePage),
        s.state.start("GamePage")
}(jQuery, window, Phaser);
