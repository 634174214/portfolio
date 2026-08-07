!
function(e, t, i) {
    "use strict";
    var n, s, r, a = {},
        o = {},
        c = scen,
        d = "img/";
    s = e.document.documentElement.getBoundingClientRect().width, r = e.document.documentElement.getBoundingClientRect().height, o.$loadPage = i("#loadingPage"), o.$game = i("#game"), o.$start = i("#start"), o.$result = i("#result");
    var h = function() {
            this.init()
        };
    h.prototype.init = function() {
        var e = c;
        this.initDecor(e.person[0].body[0]), this.initOther()
    }, h.prototype.initDecor = function(e) {
        var t = o.$game.find(".decor-list"),
            n = e.img,
            s = e.list;
        t.html("");
        for (var r in s) {
            var a = s[r],
                c = i('<div class="decor-item" style="background-image: url(' + d + n + ");background-position:" + a.x + "px " + a.y + 'px"></div>');
            t.append(c)
        }
    }, h.prototype.initOther = function() {
        var e = c,
            t = o.$game.find(".pet-list.list"),
            n = o.$game.find(".furn-list.list"),
            s = o.$game.find(".mood-list.list"),
            r = e.person[2].list,
            a = e.person[3].list,
            h = e.person[4].list,
            l = e.person[2].img,
            g = e.person[3].img,
            p = e.person[4].img;
        for (var u in r) {
            var m = r[u],
                f = i('<div class="pet-item" style="background-image: url(' + d + l + ");background-position:" + m.x + "px " + m.y + 'px"></div>');
            t.append(f)
        }
        for (var v in a) {
            var m = a[v],
                b = i('<div class="furn-item" style="background-image: url(' + d + g + ");background-position:" + m.x + "px " + m.y + 'px"></div>');
            n.append(b)
        }
        for (var $ in h) {
            var m = h[$],
                w = i('<div class="mood-item" style="background-image: url(' + d + p + ");background-position:" + m.x + "px " + m.y + 'px"></div>');
            s.append(w)
        }
    }, h.prototype.getRnd = function(e) {
        return n.rnd.integerInRange(0, e)
    }, h.prototype.cutImg = function() {
        var e = o.$result.find(".result-img");
        setTimeout(function() {
            var t = document.getElementsByTagName("canvas")[0],
                i = t.toDataURL("image/png");
            e.attr("src", i)
        }, 50), o.$result.addClass("camer")
    };
    var l = new h;
    a.GamePage = function(e) {
        this.itmes = [], this.currIndex = 0, this.distance = s, e.currItem = null, this.ctrlRect = null, this.currDecor = null, this.debug = !0, this.eventListener(), this.touchBegin = -1, this.scaleBegin = -1, this.closeBtn = null
    }, a.GamePage.prototype = {
        preload: function() {
            this.load.spritesheet("scene", d + "scene.png", 750, 646), this.load.spritesheet("face", d + "face.png", 750, 646), this.load.image("close", d + "close.png"), this.load.spritesheet("headsGirl", d + "heads_girl.png", 360, 660), this.load.spritesheet("glassGirl", d + "glass_girl.png", 360, 660), this.load.spritesheet("clothGirl", d + "cloth_girl.png", 360, 660), this.load.spritesheet("pantsGirl", d + "pants_girl.png", 360, 660), this.load.spritesheet("headsBoy", d + "heads_boy.png", 360, 660), this.load.spritesheet("glassBoy", d + "glass_boy.png", 360, 660), this.load.spritesheet("clothBoy", d + "cloth_boy.png", 360, 660), this.load.spritesheet("pantsBoy", d + "pants_boy.png", 360, 660), this.load.spritesheet("pets", d + "pets.png", 250, 370), this.load.spritesheet("furn", d + "furn.png", 450, 491), this.load.spritesheet("mood", d + "mood.png", 280, 280), this.load.image("bottom", d + "bottom.png")
        },
        create: function() {
            this.world.centerX, this.world.centerY;
            this.stage.backgroundColor = "#e7faff", this.gameScene = this.add.sprite(s, r + 6, "scene"), this.gameScene.anchor.set(1, 1), this.gameScene.scale.setTo(s / 750, s / 750), this.closeBtn = this.add.sprite(100, 100, "close"), this.closeBtn.inputEnabled = !0, this.closeBtn.events.onInputUp.add(this.kill), this.closeBtn.alpha = 0, this.closeBtn.anchor.set(.5), this.bottom = this.add.image(s, r, "bottom"), this.bottom.anchor.set(1, 1), this.bottom.scale.setTo(s / 750, s / 750), this.ctrlRect = n.add.graphics(), this.physics.enable([this.input.pointer1, this.input.pointer2, this.ctrlRect], t.Physics.ARCADE), this.physics.arcade.collide(this.input.pointer1, this.input.pointer2)
        },
        update: function() {
            if (n.currItem) if (this.ctrlRect.clear(), this.ctrlRect.lineStyle(2, 16777215, 1), this.ctrlRect.drawRect(n.currItem.x, n.currItem.y, n.currItem.width, n.currItem.height), this.game.world.bringToTop(this.ctrlRect), this.closeBtn.x = n.currItem.x + n.currItem.width, this.closeBtn.y = n.currItem.y, this.closeBtn.alpha = 1, this.game.world.bringToTop(this.closeBtn), this.input.pointer1.isDown && this.input.pointer2.isDown) {
                var e = this.game.physics.arcade.distanceBetween(this.input.pointer1, this.input.pointer2),
                    t = 0;
                this.touchBegin < 0 && (this.touchBegin = e, this.scaleBegin = n.currItem.scale.x), t = this.scaleBegin + (e - this.touchBegin) / this.touchBegin, t <= 1.6 && t > .5 && n.currItem.scale.setTo(t)
            } else this.touchBegin = -1, n.currItem.input.draggable = !0;
            else this.closeBtn.alpha = 0, this.ctrlRect.clear()
        },
        render: function() {},
        createNewPeople: function(e) {
            var e = e,
                t = this.add.sprite(this.world.centerX - 100 - l.getRnd(100), this.world.centerY - 400 - l.getRnd(200), "pants" + e, 6);
            t.scale.setTo(.85), t.inputEnabled = !0, t.input.enableDrag(!1, !0), t.index = this.currIndex, this.pants = this.add.sprite(0, 0, "pants" + e, 0), this.cloth = this.add.sprite(0, 0, "cloth" + e, 0), this.face = this.add.sprite(0, 0, "face", 0), this.heads = this.add.sprite(0, 0, "heads" + e, 0), this.glass = this.add.sprite(0, 0, "glass" + e, 12), t.addChild(this.pants), t.addChild(this.cloth), t.addChild(this.face), t.addChild(this.heads), t.addChild(this.glass), this.itmes[this.index] = t, this.itmes[this.index].events.onDragStart.add(this.onDragStart, this), n.currItem = this.itmes[this.index], n.currItem.gender = e, n.currItem.type = "heads", n.currItem.child = 3, ++this.currIndex >= 2 && o.$game.find(".cut-btn").show()
        },
        createNewThing: function(e, t) {
            console.log(e);
            var i = this.add.sprite(this.world.centerX - 100 - l.getRnd(150), this.world.centerY - 120 - l.getRnd(150), e, t);
            i.inputEnabled = !0, i.input.enableDrag(!1, !0), i.index = this.currIndex, this.itmes[this.index] = i, this.itmes[this.index].events.onDragStart.add(this.onDragStart, this), n.currItem = this.itmes[this.index], ++this.currIndex >= 2 && o.$game.find(".cut-btn").show()
        },
        onDragStart: function(e, t) {
            this.touchBegin = -1, this.scaleBegin = -1, n.currItem = e;
            var i = e.gender;
            i && (n.currItem.gender = i, "Girl" === i && (this.decorData = c.person[0]), "Boy" === i && (this.decorData = c.person[1]), this.currDecor = this.decorData.body[0], this.resetDecor(), l.initDecor(this.currDecor))
        },
        kill: function() {
            n.currItem.gender && (o.$game.find(".chose-area.gender .gender-chose").show(), o.$game.find(".chose-area.gender .gender-decor").hide()), n.currItem.kill(), n.currItem = null
        },
        changeScene: function(e) {
            this.gameScene.loadTexture("scene", e)
        },
        resetDecor: function() {
            o.$game.find(".chose-area.gender .gender-chose").hide(), o.$game.find(".chose-area.gender .gender-decor").show(), o.$game.find(".decor-btn").removeClass("active"), o.$game.find(".decor-btn").eq(0).addClass("active")
        },
        eventListener: function() {
            i("body").on("touchmove", function(e) {
                e.preventDefault()
            });
            var e = (new PerfectScrollbar(".furn-list", {
                wheelPropagation: !1,
                minScrollbarLength: 20
            }), new PerfectScrollbar(".decor-list", {
                wheelPropagation: !1,
                minScrollbarLength: 20
            }), this);
            o.$start.on("click", function() {
                o.$game.show(), o.$loadPage.addClass("slide-in")
            }), o.$game.find(".tool-nav").on("click", ".nav-btn.tool", function() {
                var e = i(this),
                    t = e.index();
                if (!e.hasClass("active")) {
                    var n = o.$game.find(".nav-btn.slide");
                    n.hasClass("top") && (n.removeClass("top"), n.addClass("down"), o.$game.find(".top-tips").hide(), o.$game.find(".chose-content").show()), e.siblings().removeClass("active"), e.addClass("active"), o.$game.find(".chose-area").siblings().hide(), o.$game.find(".chose-area").eq(t).show(), o.$game.find(".chose-area.gender .gender-chose").show(), o.$game.find(".chose-area.gender .gender-decor").hide(), o.$game.find(".decor-btn").removeClass("active"), o.$game.find(".decor-btn").eq(0).addClass("active")
                }
            }), o.$game.find(".chose-area.scene").on("click", ".scene-box", function() {
                var t = i(this),
                    n = t.index();
                e.changeScene(n)
            }), o.$game.find(".chose-area.gender").on("click", ".gender-box", function() {
                var t = i(this),
                    s = t.index(),
                    r = t.attr("data-gender");
                e.createNewPeople(r), o.$game.find(".chose-area.gender .gender-chose").hide(), o.$game.find(".chose-area.gender .gender-decor").show(), n.currItem.gender = r, e.decorData = c.person[s], e.currDecor = e.decorData.body[0], l.initDecor(e.currDecor)
            }), o.$game.find(".chose-area.gender .gender-decor").on("click", ".decor-btn", function() {
                var t = i(this),
                    s = t.index();
                if (t.hasClass("active")) return !1;
                t.siblings().removeClass("active"), t.addClass("active"), e.currDecor = e.decorData.body[s], n.currItem.type = e.currDecor.type, n.currItem.child = e.currDecor.child, l.initDecor(e.currDecor)
            }), o.$game.find(".chose-area.gender .gender-decor").on("click", ".decor-list .decor-item", function() {
                var e = i(this),
                    t = e.index();
                n.currItem.children[n.currItem.child].loadTexture(n.currItem.type + n.currItem.gender, t)
            }), o.$game.find(".chose-area.pet").on("click", ".pet-list .pet-item", function() {
                var t = i(this),
                    n = t.index();
                e.createNewThing("pets", n)
            }), o.$game.find(".chose-area.furn").on("click", ".furn-list .furn-item", function() {
                var t = i(this),
                    n = t.index();
                e.createNewThing("furn", n)
            }), o.$game.find(".chose-area.mood").on("click", ".mood-list .mood-item", function() {
                var t = i(this),
                    n = t.index();
                e.createNewThing("mood", n)
            }), o.$game.find(".tool-nav").on("click", ".nav-btn.slide", function() {
                var e = i(this),
                    t = o.$game.find(".chose-content");
                e.hasClass("down") ? (e.removeClass("down"), e.addClass("top"), o.$game.find(".top-tips").show(), t.hide()) : (e.removeClass("top"), e.addClass("down"), o.$game.find(".top-tips").hide(), t.show())
            }), o.$game.find(".top-tips").on("click", function() {
                o.$game.find(".tool-nav .slide").removeClass("top"), o.$game.find(".tool-nav .slide").addClass("down"), o.$game.find(".top-tips").hide(), o.$game.find(".chose-content").show()
            }), o.$game.find(".cut-btn").on("click", function() {
                n.currItem = null, l.cutImg()
            })
        }
    }, i(function() {
        n = new t.Game(s, r, t.CANVAS, "game"), n.state.add("GamePage", a.GamePage), n.state.start("GamePage");
        var c = function() {
                i(".pace").hide(), o.$start.css("opacity", "1"), Pace.ignore(function() {
                    return !0
                }), e.paceInterval && e.clearInterval(e.paceInterval)
            };
        e.paceInterval = setInterval(function() {
            var e = i(".pace-progress").attr("data-progress-text");
            "99%" !== e && "100%" !== e || c()
        }, 300)
    })
}(window, Phaser, Zepto);