"use strict";
function _classCallCheck(e, o) {
  if (!(e instanceof o))
    throw new TypeError("Cannot call a class as a function");
}
var _createClass = (function () {
  function e(e, o) {
    for (var a = 0; a < o.length; a++) {
      var t = o[a];
      ((t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        "value" in t && (t.writable = !0),
        Object.defineProperty(e, t.key, t));
    }
  }
  return function (o, a, t) {
    return (a && e(o.prototype, a), t && e(o, t), o);
  };
})();
!(function () {
  var e = (function () {
      function e() {
        (_classCallCheck(this, e),
          (this.$fisrtbtn = $(".firstbtn")),
          (this.$twoCon = $(".two_con")),
          (this.$chooseBtn = $(".wine, .feel, .other")),
          (this.$true = $(".back_btn_one_next")),
          (this.$back = $(".back_btn_one")),
          (this.$again = $(".again")),
          (this.$share = $(".share")),
          (this.wineTitle = $(".wine_title")),
          (this.feelTitle = $(".feel_title")),
          (this.otherTitle = $(".other_title")),
          (this.wineCon = $(".wine_con")),
          (this.feelCon = $(".feel_con")),
          (this.othercon = $(".other_con")),
          (this.$yyyMusic = $("#yyyMusic")[0]),
          (this.animationLoading = !0),
          (this.stateloading = 1),
          (this.wineVal = null),
          (this.feelVal = null),
          (this.otherVal = null),
          (this.changeArr = [
            { title: this.wineTitle, el: this.wineCon },
            { title: this.feelTitle, el: this.feelCon },
            { title: this.otherTitle, el: this.othercon },
          ]),
          this.appInit());
      }
      return (
        _createClass(e, [
          {
            key: "appInit",
            value: function () {
              (this.addEvent(), this.anmInit());
            },
          },
          {
            key: "addEvent",
            value: function () {
              var e = this;
              (this.$fisrtbtn.on(
                "click",
                function () {
                  this.animationLoading ||
                    ((this.animationLoading = !0),
                    (this.$yyyMusic.muted = !0),
                    this.$yyyMusic.play(),
                    this.firstAnm.stop(),
                    this.firstTotwoAnm.play());
                }.bind(this),
              ),
                this.$share.on("click", function () {
                  $(".share_con").show();
                }),
                $(".share_con").on("click", function () {
                  $(".share_con").hide();
                }),
                this.$again.on("click", function () {
                  window.location.replace(
                    window.location.href.split("?")[0] +
                      "?data=" +
                      new Date().getTime(),
                  );
                }),
                this.$chooseBtn.on("click", function () {
                  if (!e.animationLoading) {
                    ($(this).parent().find(".circle_click").addClass("showred"),
                      $(this).parent().find(".item_title").addClass("red"),
                      $(this)
                        .parent()
                        .siblings()
                        .find(".circle_click")
                        .removeClass("showred"),
                      $(this)
                        .parent()
                        .siblings()
                        .find(".item_title")
                        .removeClass("red"));
                    var o = $(this).attr("data-own"),
                      a = $(this).attr("data-index");
                    "wine" === o
                      ? (e.wineVal = a)
                      : "feel" === o
                        ? (e.feelVal = a)
                        : "other" === o && (e.otherVal = a);
                  }
                }),
                this.$true.on("click", function () {
                  if (!e.animationLoading) {
                    var o = void 0,
                      a = void 0,
                      t = void 0,
                      n = void 0;
                    if (1 === e.stateloading) {
                      if (!e.wineVal) return !1;
                      ((e.animationLoading = !0),
                        (o = e.changeArr[0].title),
                        (a = e.changeArr[0].el),
                        (t = e.changeArr[1].title),
                        (n = e.changeArr[1].el),
                        (e.stateloading = 2),
                        e.changeState(o, a, t, n));
                    } else if (2 === e.stateloading) {
                      if (!e.feelVal) return !1;
                      ((e.animationLoading = !0),
                        (o = e.changeArr[1].title),
                        (a = e.changeArr[1].el),
                        (t = e.changeArr[2].title),
                        (n = e.changeArr[2].el),
                        (e.stateloading = 3),
                        e.changeState(o, a, t, n));
                    } else if (3 === e.stateloading) {
                      if (!e.otherVal) return !1;
                      ((e.animationLoading = !0),
                        (o = e.changeArr[2].title),
                        (a = e.changeArr[2].el),
                        (t = null),
                        (n = null),
                        (e.stateloading = 4),
                        e.changeState(o, a, t, n, 2));
                    }
                  }
                }),
                this.$back.on("click", function () {
                  if (!e.animationLoading) {
                    var o = void 0,
                      a = void 0,
                      t = void 0,
                      n = void 0;
                    1 === e.stateloading
                      ? ((e.animationLoading = !0),
                        (o = e.changeArr[0].title),
                        (a = e.changeArr[0].el),
                        (t = null),
                        (n = null),
                        (e.stateloading = 0),
                        e.changeState(o, a, t, n, 1))
                      : 2 === e.stateloading
                        ? ((e.animationLoading = !0),
                          (o = e.changeArr[1].title),
                          (a = e.changeArr[1].el),
                          (t = e.changeArr[0].title),
                          (n = e.changeArr[0].el),
                          (e.stateloading = 1),
                          e.changeState(o, a, t, n))
                        : 3 === e.stateloading &&
                          ((e.animationLoading = !0),
                          (o = e.changeArr[2].title),
                          (a = e.changeArr[2].el),
                          (t = e.changeArr[1].title),
                          (n = e.changeArr[1].el),
                          (e.stateloading = 2),
                          e.changeState(o, a, t, n));
                  }
                }));
            },
          },
          {
            key: "anmInit",
            value: function () {
              var e = this;
              ((this.firstAnm = new TimelineMax({ paused: !0 })),
                (this.twoAnm = new TimelineMax({ paused: !0 })),
                this.firstAnm
                  .from(
                    ".box",
                    0.6,
                    { opacity: 0, y: -100, ease: Bounce.easeOut },
                    "one",
                  )
                  .from(
                    ".logo",
                    1,
                    { opacity: 0, ease: Power0.easeNone },
                    "one+=0.3",
                  )
                  .from(
                    ".bigtitle",
                    0.8,
                    {
                      opacity: 0,
                      scale: 0.7,
                      ease: Elastic.easeOut.config(1, 0.3),
                    },
                    "one+=0.5",
                  )
                  .from(
                    ".smalltitle",
                    1,
                    { opacity: 0, y: -10, ease: Power0.easeNone },
                    "one+=0.8",
                  )
                  .from(
                    ".bigstar1",
                    1,
                    {
                      opacity: 0,
                      scale: 0.6,
                      ease: Elastic.easeOut.config(1, 0.3),
                    },
                    "one+=1",
                  )
                  .to(
                    ".bigstar1",
                    1,
                    {
                      opacity: 1,
                      y: -10,
                      ease: Power0.easeInOut,
                      yoyo: !0,
                      repeat: -1,
                    },
                    "one+=2",
                  )
                  .from(
                    ".bigstar2",
                    1,
                    {
                      opacity: 0,
                      scale: 0.6,
                      ease: Elastic.easeOut.config(1, 0.3),
                    },
                    "one+=1.2",
                  )
                  .to(
                    ".bigstar2",
                    1,
                    {
                      opacity: 0.4,
                      ease: Power0.easeInOut,
                      yoyo: !0,
                      repeat: -1,
                    },
                    "one+=2.2",
                  )
                  .to(
                    ".smallstar",
                    2,
                    {
                      opacity: 1,
                      scale: 0.8,
                      y: 70,
                      rotation: 200,
                      ease: Power0.easeNone,
                    },
                    "one+=1.4",
                  )
                  .from(
                    ".welcome",
                    0.5,
                    {
                      opacity: 0,
                      scale: 0.8,
                      ease: Elastic.easeOut.config(1, 0.3),
                    },
                    "one+=1.9",
                  )
                  .from(
                    ".arrow",
                    1,
                    {
                      opacity: 0,
                      scale: 0.8,
                      ease: Elastic.easeOut.config(1, 0.3),
                    },
                    "one+=2.3",
                  )
                  .from(
                    ".wine_cup",
                    0.6,
                    { opacity: 0, x: -30, ease: Power0.easeNone },
                    "one+=2.5",
                  )
                  .from(
                    ".wine_body",
                    0.6,
                    { opacity: 0, x: 30, ease: Power0.easeNone },
                    "one+=3.1",
                  )
                  .from(
                    ".firstbtn",
                    1,
                    {
                      opacity: 0,
                      scale: 0.8,
                      skewX: 0.8,
                      ease: Elastic.easeOut.config(1, 0.3),
                      onComplete: function () {
                        e.animationLoading = !1;
                      },
                    },
                    "one+=3.1",
                  ),
                this.firstAnm.delay(0.5),
                this.firstAnm.play(),
                (this.firstTotwoAnm = new TimelineMax({ paused: !0 })),
                this.firstTotwoAnm
                  .to(
                    ".logo",
                    0.8,
                    {
                      y: -200,
                      opacity: 0,
                      ease: Elastic.easeIn.config(1, 0.5),
                    },
                    "one",
                  )
                  .to(
                    ".firstbtn",
                    0.8,
                    { y: 200, opacity: 0, ease: Elastic.easeIn.config(1, 0.5) },
                    "one",
                  )
                  .to(
                    ".concat_con",
                    1,
                    {
                      x: -200,
                      opacity: 0,
                      ease: Elastic.easeIn.config(1, 0.5),
                      onComplete: function () {
                        setTimeout(function () {
                          ($(".concat_con").hide(),
                            $(".two_con").show(),
                            e.showState($(".wine_title"), $(".wine_con"), 1),
                            e.chooseAnm.play());
                        }, 100);
                      },
                    },
                    "-=0.5",
                  ),
                (this.chooseAnm = new TimelineMax({ paused: !0 })),
                this.chooseAnm
                  .to(
                    ".circle_mid",
                    8,
                    { rotation: 360, ease: Power0.easeNone, repeat: -1 },
                    "one",
                  )
                  .to(
                    ".circle_in",
                    5,
                    { rotation: -360, ease: Power0.easeNone, repeat: -1 },
                    "one",
                  ),
                (this.choosebig1 = new TimelineMax({ paused: !0 })),
                this.choosebig1
                  .to(
                    ".wine_con .item_one",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one",
                  )
                  .to(
                    ".wine_con .longshelan",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=0.2",
                  )
                  .to(
                    ".wine_con .item_two",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=1.8",
                  )
                  .to(
                    ".wine_con .bailandi",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=1.8",
                  )
                  .to(
                    ".wine_con .item_three",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=3.3",
                  )
                  .to(
                    ".wine_con .futejia",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=3.3",
                  )
                  .to(
                    ".wine_con .item_four",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=4.8",
                  )
                  .to(
                    ".wine_con .weishiji",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=4.8",
                  ),
                this.choosebig1.repeatDelay(1),
                this.choosebig1.repeat(-1),
                (this.choosebig2 = new TimelineMax({ paused: !0 })),
                this.choosebig2
                  .to(
                    ".feel_con .item_one",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one",
                  )
                  .to(
                    ".feel_con .apple",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=0.2",
                  )
                  .to(
                    ".feel_con .item_two",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=1.8",
                  )
                  .to(
                    ".feel_con .pear",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=1.8",
                  )
                  .to(
                    ".feel_con .item_three",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1, 
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=3.3",
                  )
                  .to(
                    ".feel_con .origin",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=3.3",
                  )
                  .to(
                    ".feel_con .item_four",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=4.8",
                  )
                  .to(
                    ".feel_con .grape",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=4.8",
                  ),
                this.choosebig2.repeatDelay(1),
                this.choosebig2.repeat(-1),
                (this.choosebig3 = new TimelineMax({ paused: !0 })),
                this.choosebig3
                  .to(
                    ".other_con .item_one",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one",
                  )
                  .to(
                    ".other_con .sudashui",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=0.2",
                  )
                  .to(
                    ".other_con .item_two",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=1.8",
                  )
                  .to(
                    ".other_con .jianzhi",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=1.8",
                  )
                  .to(
                    ".other_con .item_three",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=3.3",
                  )
                  .to(
                    ".other_con .ninmenzhi",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=3.3",
                  )
                  .to(
                    ".other_con .item_four",
                    0.4,
                    {
                      scale: 1.2,
                      yoyo: !0,
                      repeat: 1,
                      repeatDelay: 0.4,
                      ease: Power0.easeNone,
                    },
                    "one+=4.8",
                  )
                  .to(
                    ".other_con .tangjiang",
                    0.2,
                    {
                      rotation: 10,
                      yoyo: !0,
                      repeat: 1,
                      ease: Power0.easeNone,
                    },
                    "one+=4.8",
                  ),
                this.choosebig3.repeatDelay(1),
                this.choosebig3.repeat(-1),
                (this.yaoyiyaoAnm = new TimelineMax({ paused: !0 })),
                this.yaoyiyaoAnm
                  .fromTo(
                    ".yaoyiyao",
                    0.8,
                    { opacity: 0, y: -200 },
                    { y: 0, opacity: 1, ease: Back.easeOut.config(1) },
                    "one",
                  )
                  .fromTo(
                    ".wine_body_big",
                    0.8,
                    { opacity: 0, y: 200 },
                    {
                      y: 0,
                      opacity: 1,
                      ease: Back.easeOut.config(1),
                      onComplete: function () {
                        (e.yaoyiyaobody.play(), e.yaoyiyaoinit());
                      },
                    },
                    "-=0.5",
                  )
                  .from(
                    ".arrow_two",
                    0.8,
                    { opacity: 0, ease: Power0.easeOut },
                    "-=0.2",
                  )
                  .to(".arrow_two", 0.8, {
                    opacity: 0.5,
                    yoyo: !0,
                    repeat: -1,
                    ease: Power0.easeOut,
                  }),
                (this.yaoyiyaohide = new TimelineMax({ paused: !0 })),
                this.yaoyiyaohide
                  .to(
                    ".yaoyiyao",
                    0.8,
                    { y: -200, opacity: 0, ease: Back.easeOut.config(1) },
                    "one",
                  )
                  .to(
                    ".wine_body_con",
                    0.8,
                    {
                      y: 200,
                      opacity: 0,
                      ease: Back.easeOut.config(1),
                      onComplete: function () {
                        e.showendRes();
                      },
                    },
                    "-=0.5",
                  ),
                (this.yaoyiyaobody = new TimelineMax({ paused: !0 })),
                this.yaoyiyaobody
                  .to(
                    ".wine_body_big",
                    0.2,
                    { rotation: 10, ease: Power0.easeNone },
                    "one",
                  )
                  .to(
                    ".wine_body_big",
                    0.4,
                    { rotation: -10, ease: Power0.easeNone },
                    "two",
                  )
                  .to(
                    ".wine_body_big",
                    0.2,
                    { rotation: 0, ease: Power0.easeNone },
                    "three",
                  ),
                this.yaoyiyaobody.repeat(-1),
                this.yaoyiyaobody.repeatDelay(1));
            },
          },
          {
            key: "judgeState",
            value: function () {
              var e = Number(this.wineVal);
              return 1 === e
                ? "./imgs/endcard_ex1.png"
                : 2 === e
                  ? "./imgs/endcard_ex2.png"
                  : 3 === e
                    ? "./imgs/endcard_ex3.png"
                    : 4 === e
                      ? "./imgs/endcard_ex4.png"
                      : void 0;
            },
          },
          {
            key: "showendRes",
            value: function () {
              ($(".result_con").show(),
                (this.showresAnm = new TimelineMax()),
                this.showresAnm
                  .from(
                    ".endcard",
                    1,
                    { z: -1e3, rotationY: 210, ease: Back.easeOut.config(1) },
                    "one",
                  )
                  .from(
                    ".again",
                    1,
                    { y: 50, opacity: 0, ease: Back.easeOut.config(1) },
                    "-=0.4",
                  )
                  .from(
                    ".share",
                    1,
                    { y: 50, opacity: 0, ease: Back.easeOut.config(1) },
                    "-=0.5",
                  ));
            },
          },
          {
            key: "yaoyiyaoinit",
            value: function () {
              var e = this,
                o = !0,
                a = !0,
                t = void 0,
                n = void 0,
                i = void 0;
              window.addEventListener(
                "deviceorientation",
                function (s) {
                  var c = event.alpha,
                    r = event.beta,
                    l = event.gamma;
                  if (
                    (a &&
                      ((a = !1),
                      (t = event.alpha),
                      (n = event.beta),
                      (i = event.gamma)),
                    ((Math.abs(c - t) > 30 && 200 > Math.abs(c - t)) ||
                      Math.abs(r - n) > 30 ||
                      Math.abs(l - i) > 40) &&
                      o)
                  ) {
                    o = !1;
                    var y = e.judgeState();
                    $(".endcard").attr("src", y);
                    var h = !1;
                    ($("#music").hasClass("xuanzhuan") && (h = !0),
                      setTimeout(function () {
                        ((e.$yyyMusic.muted = !1),
                          playeraudio.pause(),
                          e.$yyyMusic.play());
                      }, 1e3),
                      setTimeout(function () {
                        (h && playeraudio.play(),
                          e.$yyyMusic.pause(),
                          e.yaoyiyaobody.kill(),
                          e.yaoyiyaohide.play());
                      }, 2e3));
                  }
                },
                !1,
              );
            },
          },
          {
            key: "changeState",
            value: function (e, o, a, t) {
              var n =
                  arguments.length > 4 &&
                  void 0 !== arguments[4] &&
                  arguments[4],
                i = this,
                s = new TimelineMax();
              2 === n || 1 === n
                ? s
                    .to(
                      e,
                      0.8,
                      {
                        y: -200,
                        opacity: 0,
                        ease: Elastic.easeIn.config(1, 0.5),
                      },
                      "one",
                    )
                    .to(
                      o,
                      0.8,
                      {
                        y: 200,
                        opacity: 0,
                        ease: Elastic.easeIn.config(1, 0.5),
                      },
                      "one+=0.3",
                    )
                    .to(
                      ".btn_con",
                      0.8,
                      {
                        y: 200,
                        opacity: 0,
                        ease: Elastic.easeIn.config(1, 0.5),
                        onComplete: function () {
                          (s.kill(),
                            1 === n &&
                              ($(".two_con").hide(),
                              $(".concat_con").show(),
                              i.choosebig1.pause(),
                              setTimeout(function () {
                                ($(".othergray").removeClass("changeAnm"),
                                  (i.animationLoading = !1),
                                  i.firstTotwoAnm.reverse());
                              }, 200)),
                            2 === n &&
                              ($(".two_con").hide(),
                              $(".three_con").show(),
                              i.choosebig3.pause(),
                              i.yaoyiyaoAnm.play()));
                        },
                      },
                      "one+=0.3",
                    )
                : s
                    .to(
                      e,
                      0.8,
                      {
                        y: -200,
                        opacity: 0,
                        ease: Elastic.easeIn.config(1, 0.5),
                      },
                      "one",
                    )
                    .to(
                      o,
                      0.8,
                      {
                        y: 200,
                        opacity: 0,
                        ease: Elastic.easeIn.config(1, 0.5),
                        onComplete: function () {
                          (s.kill(), o.hide(), a && i.showState(a, t));
                        },
                      },
                      "-=0.5",
                    );
            },
          },
          {
            key: "showState",
            value: function (e, o) {
              var a =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2],
                t = this;
              o.show();
              var n = new TimelineMax();
              1 === a
                ? ($(".othergray").addClass("changeAnm"),
                  n
                    .set(".btn_con", { opacity: 1, y: 0 })
                    .fromTo(
                      e,
                      0.8,
                      { opacity: 0, y: -200 },
                      { y: 0, opacity: 1, ease: Back.easeOut.config(1) },
                      "one",
                    )
                    .fromTo(
                      o,
                      0.8,
                      { opacity: 0, y: 200 },
                      { y: 0, opacity: 1, ease: Back.easeOut.config(1) },
                      "-=0.5",
                    )
                    .from(
                      ".back_btn_one",
                      1,
                      { y: 50, opacity: 0, ease: Back.easeOut.config(1) },
                      "-=0.4",
                    )
                    .from(
                      ".back_btn_one_next",
                      1,
                      {
                        y: 50,
                        opacity: 0,
                        ease: Back.easeOut.config(1),
                        onComplete: function () {
                          ((t.stateloading = 1),
                            t.choosebig1.play(),
                            (t.animationLoading = !1),
                            n.kill());
                        },
                      },
                      "-=0.5",
                    ))
                : n
                    .fromTo(
                      e,
                      0.8,
                      { opacity: 0, y: -200 },
                      { y: 0, opacity: 1, ease: Back.easeOut.config(1) },
                      "one",
                    )
                    .fromTo(
                      o,
                      0.8,
                      { opacity: 0, y: 200 },
                      {
                        y: 0,
                        opacity: 1,
                        ease: Back.easeOut.config(1),
                        onComplete: function () {
                          (1 === t.stateloading
                            ? (t.choosebig1.play(), t.choosebig2.pause())
                            : 2 === t.stateloading
                              ? (t.choosebig3.pause(),
                                t.choosebig2.play(),
                                t.choosebig1.pause())
                              : 3 === t.stateloading &&
                                (t.choosebig3.play(), t.choosebig2.pause()),
                            (t.animationLoading = !1),
                            n.kill());
                        },
                      },
                      "-=0.5",
                    );
            },
          },
        ]),
        e
      );
    })(),
    o = function () {
      (window.resize(),
        $(".loading").fadeOut(),
        window.paceInterval && window.clearInterval(window.paceInterval),
        $(".container").css("opacity", "1"));
      new e();
    };
  window.paceInterval = setInterval(function () {
    var e = $(".pace-progress").attr("data-progress");
    parseInt(e) >= 98 && (o(), $(".pace").hide());
  }, 200);
})($, window); 