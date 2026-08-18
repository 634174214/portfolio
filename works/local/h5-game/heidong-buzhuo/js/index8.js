"use strict";
!(function () {
  var e = window.document.documentElement.getBoundingClientRect(),
    t = e.width,
    a = null,
    i = e.height,
    s = "imgs/",
    o = {};
  ((a = new Phaser.Game(t, i, Phaser.CANVAS, "gamepage", null, !0)),
    (o.StateD = function () {
      ((this.getsorce = {}),
        (this.initTime = 10),
        (this.endNum = 0),
        (this.resultAnm = new TimelineMax({ paused: !0 })),
        this.resultAnm
          .from(
            ".resultlogo",
            0.8,
            { x: -100, opacity: 0, ease: Back.easeOut.config(1.7) },
            "one",
          )
          .from(
            ".text",
            0.8,
            { y: 10, opacity: 0, ease: Power0.easeOut },
            "one",
          )
          .from(
            ".btn_again",
            0.8,
            {
              opacity: 0,
              scaleX: 0.3,
              scaleY: 1.3,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "-=0.4",
          )
          .from(
            ".btn_share",
            0.8,
            {
              opacity: 0,
              scaleX: 0.3,
              scaleY: 1.3,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "-=0.4",
          ),
        (this.fontAnm = new TimelineMax({ paused: !0 })));
      var e = this;
      (this.fontAnm.to(".time_far", 1, {
        scale: 2,
        onComplete: function () {
          e.fontAnm.set(".time_far", { scale: 1 });
        },
        repeat: 2,
      }),
        (this.$share = $(".btn_share")),
        (this.$again = $(".btn_again")),
        this.$again.on("click", function () {
          ($(".time_far").text("10"),
            $(".time_far").css("color", "#fff"),
            $(".toast").hide(),
            $(".shareText").hide(),
            (e.initTime = 10),
            (e.endNum = 0),
            (a.paused = !1));
        }),
        this.$share.on("click", function () {
          $(".shareText").show();
        }));
    }),
    (o.StateD.prototype = {
      preload: function () {
        ((a.paused = !0),
          this.load.image("page3_light", s + "page3_light.png"),
          this.load.image("page3_leida_all", s + "page3_leida_all.png"),
          this.load.image("page3_light_line", s + "page3_light_line.png"),
          this.load.image("page3_leida_di", s + "page3_leida_di.png"),
          this.load.image("btn", s + "btn.png"));
      },
      create: function () {
        var e = this;
        ((this.page3_light = this.add.image(t / 2, i - 80, "page3_light")),
          this.page3_light.anchor.set(0.5, 1),
          (this.page3_light.rotation = 0.12),
          this.add
            .tween(this.page3_light)
            .to(
              { alpha: 0.5 },
              1200,
              Phaser.Easing.Cubic.InOut,
              !0,
              0,
              Number.MAX_VALUE,
              !0,
            ),
          (this.page3_light_line = this.add.image(
            t / 2 + 5,
            i - 350,
            "page3_light_line",
          )),
          this.page3_light_line.anchor.set(0, 1),
          this.add
            .tween(this.page3_light_line)
            .to(
              { alpha: 0.4 },
              500,
              Phaser.Easing.Cubic.InOut,
              !0,
              0,
              Number.MAX_VALUE,
              !0,
            ),
          (this.page3_leida_all = this.add.image(
            t / 2,
            i - 213,
            "page3_leida_all",
          )),
          this.page3_leida_all.anchor.set(0.5, 1),
          (this.page3_leida_all.rotation = 0.15),
          (this.leidadi = this.add.image(t / 2, i - 163, "page3_leida_di")),
          this.leidadi.anchor.set(0.5, 1),
          (this.btn = this.add.sprite(t / 2, i - 122, "btn")),
          this.btn.anchor.set(0.5, 1));
        var s = { font: "bold 26px ", fill: "#fff" };
        ((this.tip = this.add.text(t / 2, i - 122 - 13, "点击捕捉", s)),
          this.tip.anchor.set(0.5, 1),
          (this.btn.inputEnabled = !0),
          (this.tip.inputEnabled = !0),
          this.tip.events.onInputDown.add(function () {
            e.getNumber();
          }),
          this.btn.events.onInputDown.add(function () {
            e.getNumber();
          }),
          a.time.events.loop(Phaser.Timer.SECOND, this.changTime, this));
      },
      changTime: function () {
        if (0 === --this.initTime) {
          a.paused = !0;
          var e = this.jugelevel(this.endNum),
            t =
              "你成功捕捉到<span class='endTextTB'>" +
              this.endNum +
              "TB</span>数据，在计划中<br/>\n                打败了<span class='endTextLevel'>" +
              e +
              "%</span>的人。";
          ($(".toast_con .text").html(t),
            $(".toast").show(),
            this.resultAnm.restart());
        }
        (3 === this.initTime &&
          ($(".time_far").css("color", "red"), this.fontAnm.restart()),
          $(".time_far").text(this.initTime));
      },
      jugelevel: function (e) {
        return 0 === e
          ? 0
          : e < 10
            ? 10
            : e < 20
              ? 20
              : e < 50
                ? 40
                : e < 80
                  ? 80
                  : 99;
      },
      getNumber: function () {
        var e = new Date().valueOf(),
          a = { font: "32px microsoft yahei", fill: "#64faff" };
        ((this.endNum = this.endNum + 1),
          (this.getsorce[e] = this.add.text(
            t / 2 + this.rnd.between(0, 30),
            500,
            "捕捉+1",
            a,
          )),
          this.getsorce[e].anchor.set(0.5),
          (this.getsorce[e].alpha = 1),
          (this.getsorce[e].showMe = this.add
            .tween(this.getsorce[e])
            .to({ y: 400, alpha: 0 }, 800, Phaser.Easing.Cubic.Out, !0, !1)),
          this.getsorce[e].showMe.onComplete.add(function () {
            (this.tweens.remove(this.getsorce[e].showMe),
              this.getsorce[e].kill());
          }, this));
      },
    }),
    a.state.add("StateD", o.StateD),
    a.state.start("StateD"));
  var n = function () {
    this.init();
  };
  n.prototype = {
    init: function () {
      (this.animate(), this.addEvent());
    },
    addEvent: function () {
      var e = this;
      ((this.$begin = $(".page2start")),
        this.$begin.on("click", function () {
          ($(".secondpage").hide(),
            $(".firstpage").show(),
            e.secondAnm.kill(),
            e.firstAnm.play());
        }));
    },
    animate: function () {
      var e = this;
      ((this.firstAnm = new TimelineMax({ paused: !0 })),
        this.firstAnm
          .to(
            ".block_circle",
            4.2,
            { rotation: 560, scale: 1.3, ease: Power1.easeOut },
            "one",
          )
          .to(".cloud", 4.5, { scale: 1.3, ease: Power2.easeInOut }, "one")
          .fromTo(
            ".threetext",
            1,
            { scale: 0.1, opacity: 0, repeat: 2 },
            {
              scale: 1.3,
              opacity: 1,
              onComplete: function () {
                e.firstAnm.set(".threetext", { opacity: 0 });
              },
            },
            "one+=0.2",
          )
          .fromTo(
            ".twotext",
            1,
            { scale: 0.1, opacity: 0, repeat: 2 },
            {
              scale: 1.3,
              opacity: 1,
              onComplete: function () {
                e.firstAnm.set(".twotext", { opacity: 0 });
              },
            },
            "one+=1.2",
          )
          .fromTo(
            ".onetext",
            1,
            { scale: 0.1, opacity: 0, repeat: 2 },
            {
              scale: 1.3,
              opacity: 1,
              onComplete: function () {
                ($(".firstpage").hide(),
                  $(".threepage").show(),
                  e.firstAnm.kill(),
                  (a.paused = !1));
              },
            },
            "one+=2.2",
          )
          .to(
            ".cloud_g_l_t",
            0.8,
            {
              y: -400,
              x: -300,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 0.4,
            },
            "one-=1.3",
          )
          .to(
            ".cloud_w_l_t",
            0.7,
            {
              y: -400,
              x: -50,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 1,
            },
            "one-=1.2",
          )
          .to(
            ".cloud_w_r_t",
            0.6,
            {
              y: -400,
              x: 300,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 0.4,
            },
            "one-=1.5",
          )
          .to(
            ".cloud_g_l_b",
            0.8,
            {
              y: 400,
              x: -100,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 0.4,
            },
            "one-=0.9",
          )
          .to(
            ".cloud_w_l_b",
            0.7,
            {
              y: 400,
              x: -400,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 0.4,
            },
            "one-=1.2",
          )
          .to(
            ".cloud_g_r_b",
            0.8,
            {
              y: 400,
              x: 200,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 0.4,
            },
            "one-=0.8",
          )
          .to(
            ".cloud_w_r_b",
            0.8,
            {
              y: 400,
              x: 300,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 0.4,
            },
            "one-=1",
          )
          .to(
            ".cloud_w_b",
            0.8,
            {
              y: 400,
              opacity: 1,
              ease: Power2.easeOut,
              repeat: -1,
              repeatDelay: 1,
            },
            "one-=1.2",
          ),
        (this.secondAnm = new TimelineMax({ paused: !0 })),
        this.secondAnm
          .to(".page2_w", 2, { x: -50, y: -50, ease: Power1.easeOut }, "second")
          .from(
            ".biglogo",
            1,
            {
              y: -100,
              opacity: 0,
              scale: 0.7,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "second+=0.2",
          )
          .from(
            ".page2_star",
            0.5,
            { opacity: 0, x: 100, ease: Power1.easeOut },
            "second+=0.9",
          )
          .from(
            ".page2_star2",
            0.5,
            {
              opacity: 0,
              x: -100,
              ease: Power1.easeOut,
              onComplete: function () {
                e.secondAnm
                  .fromTo(
                    ".page2_star",
                    0.7,
                    { opacity: 1 },
                    { opacity: 0.6, repeat: -1, yoyo: !0 },
                    "two",
                  )
                  .fromTo(
                    ".page2_star2",
                    0.9,
                    { opacity: 1 },
                    { opacity: 0.6, repeat: -1, yoyo: !0 },
                    "two",
                  );
              },
            },
            "second+=0.9",
          )
          .from(
            ".page2smalltitle",
            0.6,
            { opacity: 0, scale: 0.5, ease: Bounce.easeOut },
            "second+=1",
          )
          .from(
            ".page2_black",
            0.6,
            { opacity: 0, ease: Power0.easeNone },
            "second+=1.4",
          )
          .from(
            ".page2start",
            1,
            {
              opacity: 0,
              scaleX: 0.3,
              scaleY: 1.3,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "second+=1.7",
          )
          .from(
            ".textTip",
            1,
            { opacity: 0, y: 10, ease: Power0.easeOut },
            "-=0.6",
          )
          .from(
            ".logo_one",
            0.8,
            {
              opacity: 0,
              y: 30,
              scaleX: 0.3,
              scaleY: 1.3,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "second+=0.2",
          )
          .from(
            ".logo_two",
            0.8,
            {
              opacity: 0,
              y: 30,
              scaleX: 0.3,
              scaleY: 1.3,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "second+=0.4",
          )
          .from(
            ".logo_three",
            0.8,
            {
              opacity: 0,
              y: 30,
              scaleX: 0.3,
              scaleY: 1.3,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "second+=0.6",
          )
          .from(
            ".logo_four",
            0.8,
            {
              opacity: 0,
              y: 30,
              scaleX: 0.3,
              scaleY: 1.3,
              ease: Elastic.easeOut.config(1, 0.3),
            },
            "second+=0.8",
          ),
        this.secondAnm.play());
    },
  };
  var c = function () {
    (window.resize(),
      Pace.ignore(function () {
        return !0;
      }),
      $(".contair").show(),
      window.paceInterval && window.clearInterval(window.paceInterval));
  };
  window.paceInterval = setInterval(function () {
    var e = $(".pace-progress").attr("data-progress");
    parseInt(e) >= 98 && (c(), $(".pace").hide(), new n());
  }, 200);
})($); 
