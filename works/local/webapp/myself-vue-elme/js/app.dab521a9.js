(function (t) {
  function s(s) {
    for (
      var i, o, r = s[0], l = s[1], c = s[2], d = 0, p = [];
      d < r.length;
      d++
    )
      ((o = r[d]),
        Object.prototype.hasOwnProperty.call(a, o) && a[o] && p.push(a[o][0]),
        (a[o] = 0));
    for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (t[i] = l[i]);
    u && u(s);
    while (p.length) p.shift()();
    return (n.push.apply(n, c || []), e());
  }
  function e() {
    for (var t, s = 0; s < n.length; s++) {
      for (var e = n[s], i = !0, r = 1; r < e.length; r++) {
        var l = e[r];
        0 !== a[l] && (i = !1);
      }
      i && (n.splice(s--, 1), (t = o((o.s = e[0]))));
    }
    return t;
  }
  var i = {},
    a = { app: 0 },
    n = [];
  function o(s) {
    if (i[s]) return i[s].exports;
    var e = (i[s] = { i: s, l: !1, exports: {} });
    return (t[s].call(e.exports, e, e.exports, o), (e.l = !0), e.exports);
  }
  ((o.m = t),
    (o.c = i),
    (o.d = function (t, s, e) {
      o.o(t, s) || Object.defineProperty(t, s, { enumerable: !0, get: e });
    }),
    (o.r = function (t) {
      ("undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 }));
    }),
    (o.t = function (t, s) {
      if ((1 & s && (t = o(t)), 8 & s)) return t;
      if (4 & s && "object" === typeof t && t && t.__esModule) return t;
      var e = Object.create(null);
      if (
        (o.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: t }),
        2 & s && "string" != typeof t)
      )
        for (var i in t)
          o.d(
            e,
            i,
            function (s) {
              return t[s];
            }.bind(null, i),
          );
      return e;
    }),
    (o.n = function (t) {
      var s =
        t && t.__esModule
          ? function () {
              return t["default"];
            }
          : function () {
              return t;
            };
      return (o.d(s, "a", s), s);
    }),
    (o.o = function (t, s) {
      return Object.prototype.hasOwnProperty.call(t, s);
    }),
    (o.p = "/"));
  var r = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    l = r.push.bind(r);
  ((r.push = s), (r = r.slice()));
  for (var c = 0; c < r.length; c++) s(r[c]);
  var u = l;
  (n.push([0, "chunk-vendors"]), e());
})({
  0: function (t, s, e) {
    t.exports = e("56d7");
  },
  "0361": function (t, s, e) {},
  "080e": function (t, s, e) {},
  "0f84": function (t, s, e) {},
  1: function (t, s) {},
  "140d": function (t, s, e) {},
  2192: function (t, s, e) {},
  "2bbb": function (t, s, e) {
    "use strict";
    var i = e("d176"),
      a = e.n(i);
    a.a;
  },
  "2ffa": function (t, s, e) {},
  "31bf": function (t, s, e) {
    "use strict";
    var i = e("0f84"),
      a = e.n(i);
    a.a;
  },
  "32b3": function (t, s, e) {
    "use strict";
    var i = e("140d"),
      a = e.n(i);
    a.a;
  },
  "39df": function (t, s, e) {
    "use strict";
    var i = e("98da"),
      a = e.n(i);
    a.a;
  },
  "3c10": function (t, s, e) {
    "use strict";
    var i = e("40dd"),
      a = e.n(i);
    a.a;
  },
  "40dd": function (t, s, e) {},
  "42fb": function (t, s, e) {},
  4678: function (t, s, e) {
    var i = { "./zh-cn": "5c3a", "./zh-cn.js": "5c3a" };
    function a(t) {
      var s = n(t);
      return e(s);
    }
    function n(t) {
      if (!e.o(i, t)) {
        var s = new Error("Cannot find module '" + t + "'");
        throw ((s.code = "MODULE_NOT_FOUND"), s);
      }
      return i[t];
    }
    ((a.keys = function () {
      return Object.keys(i);
    }),
      (a.resolve = n),
      (t.exports = a),
      (a.id = "4678"));
  },
  "489d": function (t, s, e) {
    "use strict";
    var i = e("b648"),
      a = e.n(i);
    a.a;
  },
  "4e72": function (t, s, e) {},
  "56d7": function (t, s, e) {
    "use strict";
    e.r(s);
    (e("cadf"), e("551c"), e("f751"), e("097d"));
    var i = e("2b0e"),
      a = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e(
          "div",
          { attrs: { id: "app" } },
          [
            e("v-header", { attrs: { seller: t.seller } }),
            e(
              "div",
              {
                staticClass: "tab border-1px",
                attrs: { id: "tab" },
                on: {
                  click: function (s) {
                    return (
                      s.stopPropagation(),
                      s.preventDefault(),
                      t.moveActiveLine(s)
                    );
                  },
                },
              },
              [
                e(
                  "div",
                  { staticClass: "tab-item" },
                  [
                    e("router-link", { attrs: { to: "/goods" } }, [
                      t._v("商品"),
                    ]),
                  ],
                  1,
                ),
                e(
                  "div",
                  { staticClass: "tab-item" },
                  [
                    e("router-link", { attrs: { to: "/ratings" } }, [
                      t._v("评论"),
                    ]),
                  ],
                  1,
                ),
                e(
                  "div",
                  { staticClass: "tab-item" },
                  [
                    e("router-link", { attrs: { to: "/seller" } }, [
                      t._v("商家"),
                    ]),
                  ],
                  1,
                ),
                e("div", { staticClass: "tab-line" }, [
                  e("div", {
                    staticClass: "line",
                    style: "transform: translate(" + t.targetLeft + "px, 0)",
                  }),
                ]),
              ],
            ),
            e(
              "keep-alive",
              [e("router-view", { attrs: { seller: t.seller } })],
              1,
            ),
          ],
          1,
        );
      },
      n = [],
      o = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e(
          "header",
          { staticClass: "header" },
          [
            e(
              "div",
              { staticClass: "content-wrapper", on: { click: t.toggleDetail } },
              [
                e("div", { staticClass: "content" }, [
                  e("div", { staticClass: "avatar" }, [
                    e("img", {
                      attrs: {
                        src: t.seller.avatar,
                        width: "65",
                        height: "65",
                      },
                    }),
                  ]),
                  e("div", { staticClass: "shopinfo" }, [
                    e("div", { staticClass: "title" }, [
                      e("cite", { staticClass: "icon-title" }),
                      e("span", [t._v(t._s(t.seller.name))]),
                    ]),
                    e("div", { staticClass: "info" }, [
                      e("span", [t._v(t._s(t.seller.description))]),
                      t._v(" /\n                    "),
                      e("span", [
                        t._v(t._s(t.seller.deliveryTime) + "分钟送达"),
                      ]),
                    ]),
                    t.seller.supports
                      ? e("div", { staticClass: "info bot" }, [
                          e("cite", {
                            staticClass: "icon-info",
                            class: t.classMap[t.seller.supports[0].type],
                          }),
                          e("span", [
                            t._v(t._s(t.seller.supports[0].description)),
                          ]),
                          e("span", { staticClass: "supports-all" }, [
                            t._v(
                              "\n                        " +
                                t._s(t.seller.supports.length) +
                                "个\n                        ",
                            ),
                            e("i", {
                              staticClass: "icon-keyboard_arrow_right",
                            }),
                          ]),
                        ])
                      : t._e(),
                  ]),
                ]),
                e("div", { staticClass: "bulletin" }, [
                  e("cite", { staticClass: "icon-tell" }),
                  e("span", [t._v(t._s(t.seller.bulletin))]),
                  e("i", { staticClass: "icon-keyboard_arrow_right" }),
                ]),
              ],
            ),
            e("div", { staticClass: "background" }, [
              e("img", {
                attrs: { src: t.seller.avatar, width: "100%", height: "100%" },
              }),
            ]),
            e("transition", { attrs: { name: "fade" } }, [
              e(
                "section",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.detailShow,
                      expression: "detailShow",
                    },
                  ],
                  staticClass: "detail",
                },
                [
                  e("div", { staticClass: "detail-wrapper clear-fix" }, [
                    e("div", { staticClass: "detail-main" }, [
                      e("div", { staticClass: "name" }, [
                        t._v(t._s(t.seller.name)),
                      ]),
                      e(
                        "div",
                        { staticClass: "star-wrapper" },
                        [
                          e("star", {
                            attrs: { size: 48, score: t.seller.score },
                          }),
                        ],
                        1,
                      ),
                      e("div", { staticClass: "title" }, [
                        e("span", { staticClass: "line" }),
                        e("p", [t._v("优惠信息")]),
                        e("span", { staticClass: "line" }),
                      ]),
                      t.seller.supports
                        ? e(
                            "ul",
                            { staticClass: "supports-list" },
                            t._l(t.seller.supports, function (s, i) {
                              return e("li", { key: i }, [
                                e("cite", {
                                  staticClass: "detail-icon",
                                  class: t.classMap[s.type],
                                }),
                                e("span", { staticClass: "text" }, [
                                  t._v(t._s(s.description)),
                                ]),
                              ]);
                            }),
                            0,
                          )
                        : t._e(),
                      e("div", { staticClass: "title" }, [
                        e("span", { staticClass: "line" }),
                        e("p", [t._v("商家公告")]),
                        e("span", { staticClass: "line" }),
                      ]),
                      e("p", { staticClass: "detail-bulletin" }, [
                        t._v(t._s(t.seller.bulletin)),
                      ]),
                    ]),
                  ]),
                  e(
                    "div",
                    {
                      staticClass: "detail-close",
                      on: { click: t.toggleDetail },
                    },
                    [e("i", { staticClass: "icon-close" })],
                  ),
                ],
              ),
            ]),
          ],
          1,
        );
      },
      r = [],
      l = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e(
          "div",
          { staticClass: "star", class: t.starCls },
          t._l(t.starScoreCls, function (t, s) {
            return e("span", { key: s, staticClass: "star-item", class: t });
          }),
          0,
        );
      },
      c = [],
      u = (e("c5f6"), "on"),
      d = "off",
      p = "half",
      f = 5,
      h = {
        name: "star",
        props: {
          size: { type: Number, default: 36 },
          score: { type: Number, default: 3 },
        },
        computed: {
          starCls: function () {
            return "star-".concat(this.size);
          },
          starScoreCls: function () {
            for (
              var t = [],
                s = Math.floor(this.score),
                e = (10 * this.score - 10 * s) / 10,
                i = 0;
              i < s;
              i++
            )
              t.push(u);
            e > 0.5 && t.push(p);
            while (t.length < f) t.push(d);
            return t;
          },
        },
      },
      v = h,
      m = (e("5717"), e("2877")),
      C = Object(m["a"])(v, l, c, !1, null, null, null),
      _ = C.exports,
      g = {
        name: "v-header",
        props: { seller: { type: Object } },
        data: function () {
          return { detailShow: !1 };
        },
        created: function () {
          this.classMap = [
            "decrease",
            "discount",
            "special",
            "invoice",
            "guarantee",
          ];
        },
        methods: {
          toggleDetail: function () {
            this.detailShow = !this.detailShow;
          },
        },
        components: { Star: _ },
      },
      w = g,
      y = (e("a734"), Object(m["a"])(w, o, r, !1, null, null, null)),
      b = y.exports;
    (e("28a5"), e("386d"));
    function x() {
      for (
        var t =
            window.location.search.length > 0
              ? window.location.search.substring(1)
              : "",
          s = {},
          e = t.length ? t.split("&") : [],
          i = null,
          a = null,
          n = null,
          o = 0;
        o < e.length;
        o++
      )
        ((i = e[o].split("=")),
          (a = decodeURIComponent(i[0])),
          (n = decodeURIComponent(i[1])),
          a.length && (s[a] = n));
      return s;
    }
    var S = 0,
      k = !1,
      T = {
        name: "app",
        data: function () {
          return {
            seller: {
              id: (function () {
                var t = x();
                return t.id;
              })(),
            },
            targetLeft: 0,
          };
        },
        created: function () {
          var t = this,
            s = k
              ? "/api/seller"
              : "seller.json";
          this.$http.get(s + "?id=" + this.seller.id).then(function (s) {
            ((s = s.body),
              s.errno === S &&
                (t.seller = Object.assign({}, t.seller, s.data)));
          });
        },
        mounted: function () {
          var t = this;
          this.$nextTick(function () {
            var s = document.querySelector("#tab"),
              e = s.querySelector(".active"),
              i = e.offsetLeft;
            t.targetLeft = i;
          });
        },
        methods: {
          moveActiveLine: function (t) {
            var s = t.target;
            this.targetLeft = s.offsetLeft;
          },
        },
        components: { VHeader: b },
      },
      $ = T,
      P = (e("e936"), Object(m["a"])($, a, n, !1, null, null, null)),
      E = P.exports,
      O = e("8c4f"),
      j = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e(
          "div",
          { staticClass: "goods" },
          [
            e("section", { ref: "menuWrapper", staticClass: "menu-wrapper" }, [
              e(
                "ul",
                { staticClass: "menu-list" },
                t._l(t.goods, function (s, i) {
                  return e(
                    "li",
                    {
                      key: i,
                      ref: "menuList",
                      refInFor: !0,
                      staticClass: "good-item border-1px",
                      class: { active: t.currentIndex === i },
                      on: {
                        click: function (s) {
                          return t.selectMenu(i, s);
                        },
                      },
                    },
                    [
                      e(
                        "div",
                        { staticClass: "titlebox" },
                        [
                          s.type > 0
                            ? e("i", {
                                staticClass: "icon",
                                class: t.classMap[s.type],
                              })
                            : t._e(),
                          e("span", { staticClass: "text" }, [
                            t._v(t._s(s.name)),
                          ]),
                          e("transition", { attrs: { name: "countScaleIn" } }, [
                            e(
                              "em",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: t.goodItemCount[i] > 0,
                                    expression: "goodItemCount[index]>0",
                                  },
                                ],
                                staticClass: "count",
                              },
                              [t._v(t._s(t.goodItemCount[i]))],
                            ),
                          ]),
                        ],
                        1,
                      ),
                    ],
                  );
                }),
                0,
              ),
            ]),
            e("section", { ref: "foodWrapper", staticClass: "foods-wrapper" }, [
              e(
                "ul",
                { staticClass: "foods-list" },
                t._l(t.goods, function (s, i) {
                  return e(
                    "li",
                    {
                      key: i,
                      ref: "foodList",
                      refInFor: !0,
                      staticClass: "food-list",
                    },
                    [
                      e("div", { staticClass: "name" }, [t._v(t._s(s.name))]),
                      e(
                        "ul",
                        { staticClass: "food-box" },
                        t._l(s.foods, function (s, i) {
                          return e(
                            "li",
                            {
                              key: i,
                              staticClass: "food-item",
                              on: {
                                click: function (e) {
                                  return t.selectFood(s, e);
                                },
                              },
                            },
                            [
                              e("img", {
                                staticClass: "image",
                                attrs: {
                                  src: s.icon,
                                  width: "60",
                                  height: "60",
                                },
                              }),
                              e("div", { staticClass: "food-info" }, [
                                e("h2", { staticClass: "title" }, [
                                  t._v(t._s(s.name)),
                                ]),
                                e("span", { staticClass: "info" }, [
                                  t._v(t._s(s.description)),
                                ]),
                                e("span", { staticClass: "info" }, [
                                  e("em", [
                                    t._v("月售" + t._s(s.sellCount) + "份"),
                                  ]),
                                  t._v(
                                    "\n                                好评率" +
                                      t._s(s.rating) +
                                      "%\n                            ",
                                  ),
                                ]),
                                e("cite", { staticClass: "price" }, [
                                  t._v(
                                    "\n                                ￥" +
                                      t._s(s.price) +
                                      "\n                                ",
                                  ),
                                  e(
                                    "em",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: s.oldPrice,
                                          expression: "food.oldPrice",
                                        },
                                      ],
                                      staticClass: "oldprice",
                                    },
                                    [t._v("￥" + t._s(s.oldPrice))],
                                  ),
                                ]),
                              ]),
                              e(
                                "div",
                                { staticClass: "cartcontrol-wrapper" },
                                [
                                  e("cartcontrol", {
                                    attrs: { food: s },
                                    on: { add: t.addFood },
                                  }),
                                ],
                                1,
                              ),
                            ],
                          );
                        }),
                        0,
                      ),
                    ],
                  );
                }),
                0,
              ),
            ]),
            e("shopcart", {
              ref: "shopcart",
              attrs: {
                minPrice: t.seller.minPrice,
                deliveryPrice: t.seller.deliveryPrice,
                selectFoods: t.selectFoods,
              },
              on: {
                payMoney: t.payMoney,
                shopcartEmpty: t.shopcartEmpty,
                listadd: t.addFood,
              },
            }),
            e("dropballs", { ref: "dropballs" }),
            e("food", {
              ref: "food",
              attrs: { food: t.selectedFood },
              on: { foodadd: t.addFood },
            }),
            e("confirm", { ref: "confirmAlert" }),
          ],
          1,
        );
      },
      N = [],
      F =
        (e("ac6a"),
        function () {
          var t = this,
            s = t.$createElement,
            e = t._self._c || s;
          return e(
            "div",
            { staticClass: "shopcart" },
            [
              e(
                "section",
                { staticClass: "content", on: { click: t.toggleList } },
                [
                  e("div", { staticClass: "content-left" }, [
                    e(
                      "div",
                      {
                        staticClass: "pay-cart",
                        class: { highlight: t.totalCount > 0 },
                      },
                      [
                        t._m(0),
                        e(
                          "em",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: t.totalCount > 0,
                                expression: "totalCount>0",
                              },
                            ],
                            staticClass: "num",
                          },
                          [t._v(t._s(t.totalCount))],
                        ),
                      ],
                    ),
                    e(
                      "div",
                      {
                        staticClass: "pay-price",
                        class: { highlight: t.totalPrice > 0 },
                      },
                      [t._v("￥" + t._s(t.totalPrice))],
                    ),
                    e("div", { staticClass: "pay-info" }, [
                      t._v("另需配送费￥" + t._s(t.deliveryPrice) + "元"),
                    ]),
                  ]),
                  e("div", { staticClass: "content-right" }, [
                    e(
                      "div",
                      {
                        staticClass: "pay",
                        class: t.payClass,
                        on: {
                          click: function (s) {
                            return (
                              s.stopPropagation(),
                              s.preventDefault(),
                              t.comfirmShow(s)
                            );
                          },
                        },
                      },
                      [t._v(t._s(t.payDesc))],
                    ),
                  ]),
                ],
              ),
              e("transition", { attrs: { name: "moveIn" } }, [
                e(
                  "section",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.listShow,
                        expression: "listShow",
                      },
                    ],
                    staticClass: "shopcart-list",
                  },
                  [
                    e("div", { staticClass: "list-wrapper" }, [
                      e("div", { staticClass: "head" }, [
                        t._v("\n                    购物车 "),
                        e(
                          "span",
                          { staticClass: "empty", on: { click: t.pressEmpty } },
                          [t._v("清空")],
                        ),
                      ]),
                      e("div", { ref: "cartList", staticClass: "list" }, [
                        e(
                          "ul",
                          t._l(t.selectFoods, function (s, i) {
                            return e(
                              "li",
                              { key: i, staticClass: "list-item border-1px" },
                              [
                                e("div", { staticClass: "item-left" }, [
                                  t._v(t._s(s.name)),
                                ]),
                                e("div", { staticClass: "item-right" }, [
                                  e("span", { staticClass: "price" }, [
                                    t._v("￥" + t._s(s.price)),
                                  ]),
                                  e(
                                    "div",
                                    { staticClass: "cartlistcontrol-wrapper" },
                                    [
                                      e("cartcontrol", {
                                        attrs: { food: s },
                                        on: { add: t.addFood },
                                      }),
                                    ],
                                    1,
                                  ),
                                ]),
                              ],
                            );
                          }),
                          0,
                        ),
                      ]),
                    ]),
                  ],
                ),
              ]),
              e("transition", { attrs: { name: "fadeIn" } }, [
                e("div", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.listShow,
                      expression: "listShow",
                    },
                  ],
                  staticClass: "list-mask",
                  on: { click: t.hideCartList },
                }),
              ]),
            ],
            1,
          );
        }),
      M = [
        function () {
          var t = this,
            s = t.$createElement,
            e = t._self._c || s;
          return e("span", { staticClass: "cart-ball" }, [
            e("i", { staticClass: "icon-shopping_cart" }),
          ]);
        },
      ],
      L = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e(
          "div",
          { staticClass: "cart-control" },
          [
            e("transition", { attrs: { name: "move" } }, [
              e(
                "span",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.food.count > 0,
                      expression: "food.count > 0",
                    },
                  ],
                  staticClass: "cart-decrease",
                  on: {
                    click: function (s) {
                      return (
                        s.stopPropagation(),
                        s.preventDefault(),
                        t.decreaseCart(s)
                      );
                    },
                  },
                },
                [e("i", { staticClass: "inner icon-remove_circle_outline" })],
              ),
            ]),
            e(
              "span",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.food.count,
                    expression: "food.count",
                  },
                ],
                staticClass: "cart-count",
              },
              [t._v(t._s(t.food.count))],
            ),
            e(
              "span",
              {
                staticClass: "cart-add",
                on: {
                  click: function (s) {
                    return (
                      s.stopPropagation(),
                      s.preventDefault(),
                      t.addCart(s)
                    );
                  },
                },
              },
              [e("i", { staticClass: "icon-add_circle" })],
            ),
          ],
          1,
        );
      },
      D = [],
      I = "add",
      R = {
        name: "cartcontrol",
        props: { food: { type: Object } },
        methods: {
          addCart: function (t) {
            t._constructed &&
              (this.food.count
                ? this.food.count++
                : i["a"].set(this.food, "count", 1),
              this.$emit(I, t.target));
          },
          decreaseCart: function (t) {
            t._constructed && this.food.count && this.food.count--;
          },
        },
      },
      A = R,
      Y = (e("642a"), Object(m["a"])(A, L, D, !1, null, null, null)),
      H = Y.exports,
      z = e("1fba"),
      B = "payMoney",
      W = "shopcartEmpty",
      U = "listadd",
      J = {
        name: "shopcart",
        props: {
          minPrice: { type: Number, default: 0 },
          deliveryPrice: { type: Number, default: 0 },
          selectFoods: {
            type: Array,
            default: function () {
              return [
                { price: 0, count: 1 },
                { price: 0, count: 4 },
              ];
            },
          },
        },
        data: function () {
          return { listShow: !1 };
        },
        computed: {
          totalPrice: function () {
            var t = 0;
            return (
              this.selectFoods.forEach(function (s) {
                t = s.price * s.count + t;
              }),
              t
            );
          },
          totalCount: function () {
            var t = 0;
            return (
              this.selectFoods.forEach(function (s) {
                t += s.count;
              }),
              t
            );
          },
          payDesc: function () {
            var t = "";
            switch (!0) {
              case 0 === this.totalPrice:
                t = "￥".concat(this.minPrice, "元起送");
                break;
              case this.totalPrice > 0 && this.totalPrice < this.minPrice:
                t = "还差￥".concat(this.minPrice - this.totalPrice, "元起送");
                break;
              case this.totalPrice >= this.minPrice:
                t = "去结算";
                break;
            }
            return t;
          },
          payClass: function () {
            return this.totalPrice < this.minPrice ? "no-enough" : "enough";
          },
        },
        watch: {
          listShow: function () {
            var t = this;
            if (!this.totalCount) return ((this.listShow = !1), !1);
            this.listShow &&
              this.$nextTick(function () {
                t.listScroll
                  ? t.listScroll.refresh()
                  : (t.listScroll = new z["a"](t.$refs.cartList, {
                      click: !0,
                    }));
              });
          },
          totalCount: function () {
            0 === this.totalCount && this.hideCartList();
          },
        },
        methods: {
          comfirmShow: function () {
            this.totalPrice >= this.minPrice && this.$emit(B, this.totalPrice);
          },
          toggleList: function () {
            this.totalCount && (this.listShow = !this.listShow);
          },
          hideCartList: function () {
            this.listShow = !1;
          },
          emptyShopCart: function () {
            this.selectFoods.forEach(function (t) {
              t.count = 0;
            });
          },
          pressEmpty: function () {
            this.$emit(W, this.emptyShopCart);
          },
          addFood: function (t) {
            this.$emit(U, t);
          },
        },
        components: { cartcontrol: H },
      },
      q = J,
      X = (e("3c10"), Object(m["a"])(q, F, M, !1, null, null, null)),
      V = X.exports,
      G = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e("transition", { attrs: { name: "scaleIn" } }, [
          e(
            "section",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: t.comfirmShow,
                  expression: "comfirmShow",
                },
              ],
              staticClass: "confirm",
            },
            [
              e("div", { staticClass: "inner" }, [
                e("h2", [t._v(t._s(t.title))]),
                e("span", { staticClass: "border-1px" }, [t._v(t._s(t.desc))]),
                e("div", { staticClass: "btn-wrapper" }, [
                  e(
                    "a",
                    {
                      staticClass: "btn",
                      attrs: { href: "javascript:;" },
                      on: { click: t._cancelConfirm },
                    },
                    [t._v("取消")],
                  ),
                  e(
                    "a",
                    {
                      staticClass: "btn sure",
                      attrs: { href: "javascript:;" },
                      on: { click: t.pressConfirm },
                    },
                    [t._v("确定")],
                  ),
                ]),
              ]),
            ],
          ),
        ]);
      },
      K = [],
      Q = {
        name: "confirm",
        data: function () {
          return { comfirmShow: !1, title: "标题", desc: "您需要支付0元" };
        },
        methods: {
          showConfirm: function (t, s) {
            var e = t || { title: "请配置标题", desc: "" };
            ((this.comfirmShow = !0),
              (this.title = e.title),
              (this.desc = e.desc),
              (this._confirmEvent =
                s ||
                function () {
                  console.log("无执行事件");
                }));
          },
          _cancelConfirm: function () {
            this.comfirmShow = !1;
          },
          _confirmEvent: function () {},
          pressConfirm: function () {
            (this._confirmEvent(), (this.comfirmShow = !1));
          },
        },
      },
      Z = Q,
      tt = (e("32b3"), Object(m["a"])(Z, G, K, !1, null, null, null)),
      st = tt.exports,
      et = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e(
          "section",
          { staticClass: "dropBall" },
          t._l(t.balls, function (s, i) {
            return e(
              "div",
              { key: i, staticClass: "balls-wrapper" },
              [
                e(
                  "transition",
                  {
                    attrs: { name: "drop" },
                    on: {
                      "before-enter": t.beforeDrop,
                      enter: t.dropping,
                      "after-enter": t.afterDrop,
                    },
                  },
                  [
                    e(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: s.show,
                            expression: "ball.show",
                          },
                        ],
                        staticClass: "ball",
                      },
                      [e("div", { staticClass: "inner inner-hook" })],
                    ),
                  ],
                ),
              ],
              1,
            );
          }),
          0,
        );
      },
      it = [],
      at = {
        name: "dropballs",
        data: function () {
          return {
            balls: [
              { show: !1 },
              { show: !1 },
              { show: !1 },
              { show: !1 },
              { show: !1 },
            ],
            dropBalls: [],
          };
        },
        methods: {
          drop: function (t) {
            for (var s = 0; s < this.balls.length; s++) {
              var e = this.balls[s];
              if (!e.show)
                return (
                  (e.show = !0),
                  (e.target = t),
                  void this.dropBalls.push(e)
                );
            }
          },
          beforeDrop: function (t) {
            var s = this.dropBalls[this.dropBalls.length - 1],
              e = s.target.getBoundingClientRect(),
              i = e.left - 32,
              a = -(window.innerHeight - e.top - 28);
            ((t.style.display = "block"),
              (t.style.webkitTransform = "translate3d(0, ".concat(a, "px, 0)")),
              (t.style.transform = "translate3d(0, ".concat(a, "px, 0)")));
            var n = t.getElementsByClassName("inner-hook")[0];
            ((n.style.transform = "translate3d(".concat(i, "px, 0, 0)")),
              (n.style.webkitTransform = "translate3d(".concat(
                i,
                "px, 0, 0)",
              )));
          },
          dropping: function (t, s) {
            ((this._reflow = document.body.offsetHeight),
              (t.style.webkitTransform = "translate3d(0, 0, 0)"),
              (t.style.transform = "translate3d(0, 0, 0)"));
            var e = t.getElementsByClassName("inner-hook")[0];
            ((e.style.webkitTransform = "translate3d(0, 0, 0)"),
              (e.style.transform = "translate3d(0, 0, 0)"),
              t.addEventListener("transitionend", s));
          },
          afterDrop: function (t) {
            var s = this.dropBalls.shift();
            s.show && ((s.show = !1), (t.style.display = "none"));
          },
        },
      },
      nt = at,
      ot = (e("39df"), Object(m["a"])(nt, et, it, !1, null, null, null)),
      rt = ot.exports,
      lt = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e("transition", { attrs: { name: "moveIn" } }, [
          e(
            "section",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: t.foodShow,
                  expression: "foodShow",
                },
              ],
              ref: "food",
              staticClass: "food",
            },
            [
              e(
                "div",
                { staticClass: "food-container" },
                [
                  e("div", { staticClass: "head-wrapper" }, [
                    e(
                      "div",
                      { staticClass: "back", on: { click: t.closeFood } },
                      [e("i", { staticClass: "icon-arrow_lift arrow" })],
                    ),
                    e("img", {
                      staticClass: "head-img",
                      attrs: { src: t.food.image },
                    }),
                  ]),
                  e("div", { staticClass: "title-wrapper" }, [
                    e("h2", { staticClass: "name" }, [t._v(t._s(t.food.name))]),
                    e("div", { staticClass: "small" }, [
                      e("span", [t._v("月售" + t._s(t.food.sellCount) + "份")]),
                      e("span", [t._v("好评率" + t._s(t.food.rating) + "%")]),
                    ]),
                    e(
                      "div",
                      { staticClass: "price", on: { click: t.addFood } },
                      [
                        e("span", { staticClass: "left" }, [
                          e("em", { staticClass: "now" }, [
                            t._v("￥" + t._s(t.food.price)),
                          ]),
                          t.food.oldPrice
                            ? e("em", { staticClass: "old" }, [
                                t._v("￥" + t._s(t.food.oldPrice)),
                              ])
                            : t._e(),
                        ]),
                        e(
                          "span",
                          { staticClass: "right" },
                          [
                            e("transition", { attrs: { name: "fadeOut" } }, [
                              e(
                                "em",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value:
                                        !t.food.count || 0 === t.food.count,
                                      expression:
                                        "!food.count || food.count === 0",
                                    },
                                  ],
                                  staticClass: "addtocart",
                                  on: {
                                    click: function (s) {
                                      return (
                                        s.stopPropagation(),
                                        s.preventDefault(),
                                        t.addFirst(s)
                                      );
                                    },
                                  },
                                },
                                [
                                  t._v(
                                    "\n                            加入购物车\n                        ",
                                  ),
                                ],
                              ),
                            ]),
                            e(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: t.food.count,
                                    expression: "food.count",
                                  },
                                ],
                                staticClass: "cartcontrol-wrapper",
                              },
                              [
                                e("cartcontrol", {
                                  attrs: { food: t.food },
                                  on: { add: t.addFood },
                                }),
                              ],
                              1,
                            ),
                          ],
                          1,
                        ),
                      ],
                    ),
                  ]),
                  e("split", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.food.info,
                        expression: "food.info",
                      },
                    ],
                  }),
                  e(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: t.food.info,
                          expression: "food.info",
                        },
                      ],
                      staticClass: "info-wrapper",
                    },
                    [
                      e("div", { staticClass: "title" }, [t._v("商品信息")]),
                      e("p", { staticClass: "text" }, [
                        t._v(t._s(t.food.info)),
                      ]),
                    ],
                  ),
                  e("split"),
                  e("div", { staticClass: "ratings-wrapper" }, [
                    e("div", { staticClass: "title" }, [t._v("商品评价")]),
                    e(
                      "div",
                      { staticClass: "rating-box border-1px" },
                      [
                        e("rating-select", {
                          attrs: {
                            selectType: t.selectType,
                            desc: t.desc,
                            onlyContent: t.onlyContent,
                            ratings: t.food.ratings,
                          },
                          on: { select: t.tabSelect, toggle: t.toggle },
                        }),
                      ],
                      1,
                    ),
                    e("div", { staticClass: "rating-content" }, [
                      e(
                        "ul",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value:
                                t.computedRatings && t.computedRatings.length,
                              expression:
                                "computedRatings && computedRatings.length",
                            },
                          ],
                        },
                        t._l(t.computedRatings, function (s, i) {
                          return e(
                            "li",
                            { key: i, staticClass: "rating-item border-1px" },
                            [
                              e("div", { staticClass: "top" }, [
                                e("span", { staticClass: "time" }, [
                                  t._v(t._s(t.format(s.rateTime))),
                                ]),
                                e("span", { staticClass: "user" }, [
                                  e("em", [t._v(t._s(s.username))]),
                                  e("img", {
                                    attrs: {
                                      src: s.avatar,
                                      width: "20",
                                      height: "20",
                                    },
                                  }),
                                ]),
                              ]),
                              e("div", { staticClass: "content" }, [
                                e("i", {
                                  staticClass: "icon",
                                  class: {
                                    "icon-thumb_up": 0 === s.rateType,
                                    "icon-thumb_down": 1 === s.rateType,
                                  },
                                }),
                                e("p", { staticClass: "text" }, [
                                  t._v(t._s(s.text)),
                                ]),
                              ]),
                            ],
                          );
                        }),
                        0,
                      ),
                      e(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value:
                                !t.computedRatings || !t.computedRatings.length,
                              expression:
                                " !computedRatings || !computedRatings.length",
                            },
                          ],
                          staticClass: "no-rating",
                        },
                        [t._v("暂无评价")],
                      ),
                    ]),
                  ]),
                ],
                1,
              ),
            ],
          ),
        ]);
      },
      ct = [],
      ut = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e("div", { staticClass: "split" });
      },
      dt = [],
      pt = { name: "split" },
      ft = pt,
      ht = (e("2bbb"), Object(m["a"])(ft, ut, dt, !1, null, "7cd7a843", null)),
      vt = ht.exports,
      mt = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e("div", { staticClass: "rating-select" }, [
          e("div", { staticClass: "select-tab" }, [
            e(
              "span",
              {
                staticClass: "normal",
                class: { active: 2 === t.selectType },
                on: {
                  click: function (s) {
                    return t.select(2, s);
                  },
                },
              },
              [
                t._v("\n            " + t._s(t.desc.all)),
                e("em", { staticClass: "count" }, [
                  t._v(t._s(t.ratings.length)),
                ]),
              ],
            ),
            e(
              "span",
              {
                staticClass: "normal",
                class: { active: 0 === t.selectType },
                on: {
                  click: function (s) {
                    return t.select(0, s);
                  },
                },
              },
              [
                t._v("\n            " + t._s(t.desc.positive)),
                e("em", { staticClass: "count" }, [
                  t._v(t._s(t.positive.length)),
                ]),
              ],
            ),
            e(
              "span",
              {
                staticClass: "bad",
                class: { active: 1 === t.selectType },
                on: {
                  click: function (s) {
                    return t.select(1, s);
                  },
                },
              },
              [
                t._v("\n            " + t._s(t.desc.negative)),
                e("em", { staticClass: "count" }, [
                  t._v(t._s(t.negative.length)),
                ]),
              ],
            ),
          ]),
          e(
            "div",
            {
              staticClass: "only-content",
              class: { active: t.onlyContent },
              on: { click: t.toggleContent },
            },
            [
              e("i", { staticClass: "icon icon-check_circle" }),
              e("em", { staticClass: "desc" }, [t._v("只显示有内容的评价")]),
            ],
          ),
        ]);
      },
      Ct = [],
      _t = 2,
      gt = 0,
      wt = 1,
      yt = "select",
      bt = "toggle",
      xt = {
        name: "rating-select",
        props: {
          desc: {
            type: Object,
            default: function () {
              return { all: "全部", positive: "推荐", negative: "差评" };
            },
          },
          selectType: { type: Number, default: _t },
          onlyContent: { type: Boolean, default: !1 },
          ratings: {
            type: Array,
            default: function () {
              return [];
            },
          },
        },
        data: function () {
          return {};
        },
        computed: {
          positive: function () {
            var t = this.ratings.filter(function (t) {
              return t.rateType === gt;
            });
            return t;
          },
          negative: function () {
            var t = this.ratings.filter(function (t) {
              return t.rateType === wt;
            });
            return t;
          },
        },
        methods: {
          select: function (t, s) {
            s._constructed && this.$emit(yt, t);
          },
          toggleContent: function (t) {
            t._constructed && this.$emit(bt);
          },
        },
      },
      St = xt,
      kt = (e("489d"), Object(m["a"])(St, mt, Ct, !1, null, "02a67b27", null)),
      Tt = kt.exports,
      $t = e("c1df"),
      Pt = e.n($t),
      Et = "foodadd",
      Ot = 2,
      jt = 0,
      Nt = 1,
      Ft = {
        name: "food",
        props: { food: { type: Object } },
        data: function () {
          return {
            foodShow: !1,
            selectType: Ot,
            desc: { all: "全部", positive: "推荐", negative: "差评" },
            onlyContent: !1,
          };
        },
        computed: {
          computedRatings: function () {
            var t = this,
              s = [];
            return (
              this.food.ratings &&
                this.food.ratings.forEach(function (e) {
                  switch (t.selectType) {
                    case Ot:
                      t.onlyContent ? e.text && s.push(e) : s.push(e);
                      break;
                    case jt:
                      t.onlyContent
                        ? e.text && e.rateType === jt && s.push(e)
                        : e.rateType === jt && s.push(e);
                      break;
                    case Nt:
                      t.onlyContent
                        ? e.text && e.rateType === Nt && s.push(e)
                        : e.rateType === Nt && s.push(e);
                  }
                }),
              s
            );
          },
        },
        methods: {
          show: function () {
            var t = this;
            ((this.foodShow = !0),
              (this.selectType = Ot),
              (this.onlyContent = !1),
              (this.noRatingShow = !1),
              this.$nextTick(function () {
                var s = document.querySelector(".rating-content");
                ((t.lis = s.querySelectorAll("li")),
                  t.foodScroll
                    ? t.foodScroll.refresh()
                    : (t.foodScroll = new z["a"](t.$refs.food, { click: !0 })));
              }));
          },
          closeFood: function (t) {
            t._constructed && (this.foodShow = !1);
          },
          addFirst: function (t) {
            t._constructed &&
              (this.food.count ||
                (i["a"].set(this.food, "count", 1), this.$emit(Et, t.target)));
          },
          addFood: function (t) {
            this.$emit(Et, t);
          },
          tabSelect: function (t) {
            var s = this;
            ((this.selectType = t),
              this.$nextTick(function () {
                s.foodScroll.refresh();
              }));
          },
          toggle: function () {
            var t = this;
            ((this.onlyContent = !this.onlyContent),
              this.$nextTick(function () {
                t.foodScroll.refresh();
              }));
          },
          format: function (t) {
            return Pt()(t).format("YYYY-MM-DD hh:mm");
          },
        },
        components: { split: vt, cartcontrol: H, "rating-select": Tt },
      },
      Mt = Ft,
      Lt = (e("d2dd"), Object(m["a"])(Mt, lt, ct, !1, null, "245853b3", null)),
      Dt = Lt.exports,
      It = !1,
      Rt = 0,
      At = {
        name: "goods",
        props: { seller: { type: Object } },
        data: function () {
          return { goods: [], scrollY: 0, listHeight: [], selectedFood: {} };
        },
        created: function () {
          var t = this;
          this.classMap = [
            "decrease",
            "discount",
            "special",
            "invoice",
            "guarantee",
          ];
          var s = It
            ? "/api/goods"
            : "goods.json";
          this.$http.get(s).then(function (s) {
            ((s = s.body),
              s.errno === Rt &&
                ((t.goods = s.data),
                t.$nextTick(function () {
                  (t._initScroll(), t._calculateHeight());
                })));
          });
        },
        computed: {
          currentIndex: function () {
            for (var t = 0; t < this.listHeight.length; t++) {
              var s = this.listHeight[t],
                e = this.listHeight[t + 1];
              if (!e || (this.scrollY >= s && this.scrollY < e))
                return (this._menuFollowScroll(t), t);
            }
            return 0;
          },
          selectFoods: function () {
            var t = [];
            return (
              this.goods.forEach(function (s) {
                s.foods.forEach(function (s) {
                  s.count && t.push(s);
                });
              }),
              t
            );
          },
          goodItemCount: function () {
            var t = [];
            return (
              this.goods.forEach(function (s) {
                var e = 0;
                (s.foods.forEach(function (t) {
                  t.count && (e += t.count);
                }),
                  t.push(e));
              }),
              t
            );
          },
        },
        methods: {
          _initScroll: function () {
            var t = this;
            ((this.foodScroll = new z["a"](this.$refs.foodWrapper, {
              click: !0,
              probeType: 3,
            })),
              (this.menuScroll = new z["a"](this.$refs.menuWrapper, {
                click: !0,
              })),
              this.foodScroll.on("scroll", function (s) {
                t.scrollY = Math.abs(Math.round(s.y));
              }));
          },
          _calculateHeight: function () {
            var t = this.$refs.foodList,
              s = 0;
            this.listHeight.push(s);
            for (var e = 0; e < t.length; e++)
              ((s += t[e].clientHeight), this.listHeight.push(s));
          },
          _menuFollowScroll: function (t) {
            var s = this.$refs.menuList,
              e = s[t];
            this.menuScroll.scrollToElement(e, 300, -100);
          },
          selectMenu: function (t, s) {
            if (s._constructed) {
              var e = this.$refs.foodList,
                i = e[t];
              this.foodScroll.scrollToElement(i, 300, 0, 1);
            }
          },
          addFood: function (t) {
            this._drop(t);
          },
          _drop: function (t) {
            var s = this;
            this.$nextTick(function () {
              s.$refs.dropballs.drop(t);
            });
          },
          payMoney: function (t) {
            this.$refs.confirmAlert.showConfirm({
              title: "支付",
              desc: "您需要支付".concat(t, "元"),
            });
          },
          shopcartEmpty: function (t) {
            this.$refs.confirmAlert.showConfirm(
              { title: "清空购物车？", desc: "" },
              t,
            );
          },
          selectFood: function (t, s) {
            s._constructed && ((this.selectedFood = t), this.$refs.food.show());
          },
        },
        components: {
          shopcart: V,
          cartcontrol: H,
          confirm: st,
          dropballs: rt,
          food: Dt,
        },
      },
      Yt = At,
      Ht = (e("31bf"), Object(m["a"])(Yt, j, N, !1, null, null, null)),
      zt = Ht.exports,
      Bt = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e("div", { ref: "ratings", staticClass: "ratings" }, [
          e(
            "div",
            { staticClass: "ratings-container" },
            [
              e("section", { staticClass: "points-wrapper" }, [
                e("div", { staticClass: "left" }, [
                  e("span", { staticClass: "point" }, [
                    t._v(t._s(t.seller.score)),
                  ]),
                  e("p", { staticClass: "point-title" }, [t._v("综合评分")]),
                  e("p", { staticClass: "point-desc" }, [
                    t._v("高于周边商家" + t._s(t.seller.rankRate) + "%"),
                  ]),
                ]),
                e("div", { staticClass: "right" }, [
                  e("ul", { staticClass: "point-detail" }, [
                    e("li", [
                      e("div", { staticClass: "title" }, [t._v("服务态度")]),
                      e(
                        "div",
                        { staticClass: "star-wrapper" },
                        [
                          e("star", {
                            attrs: { size: 36, score: t.seller.serviceScore },
                          }),
                        ],
                        1,
                      ),
                      e("p", { staticClass: "point" }, [
                        t._v(t._s(t.seller.serviceScore)),
                      ]),
                    ]),
                    e("li", [
                      e("div", { staticClass: "title" }, [t._v("商品评分")]),
                      e(
                        "div",
                        { staticClass: "star-wrapper" },
                        [
                          e("star", {
                            attrs: { size: 36, score: t.seller.foodScore },
                          }),
                        ],
                        1,
                      ),
                      e("p", { staticClass: "point" }, [
                        t._v(t._s(t.seller.foodScore)),
                      ]),
                    ]),
                    e("li", [
                      e("div", { staticClass: "title" }, [t._v("送达时间")]),
                      e("div", { staticClass: "time" }, [
                        t._v(t._s(t.seller.deliveryTime) + "分钟"),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              e("split"),
              e("section", { staticClass: "ratings-wrapper" }, [
                e(
                  "div",
                  { staticClass: "rating-box border-1px" },
                  [
                    e("rating-select", {
                      attrs: {
                        desc: t.desc,
                        onlyContent: t.onlyContent,
                        selectType: t.selectType,
                        ratings: t.ratings,
                      },
                      on: { select: t.tabSelect, toggle: t.toggle },
                    }),
                  ],
                  1,
                ),
                e("div", { staticClass: "rating-content" }, [
                  t.computedRatings || t.computedRatings.length
                    ? e(
                        "ul",
                        { staticClass: "rating-list" },
                        t._l(t.computedRatings, function (s, i) {
                          return e(
                            "li",
                            { key: i, staticClass: "rating-item border-1px" },
                            [
                              e("div", { staticClass: "avatar" }, [
                                e("img", {
                                  attrs: {
                                    src: s.avatar,
                                    width: "30",
                                    height: "30",
                                  },
                                }),
                              ]),
                              e("div", { staticClass: "content" }, [
                                e("span", { staticClass: "time" }, [
                                  t._v(t._s(t.format(s.rateTime))),
                                ]),
                                e("span", { staticClass: "name" }, [
                                  t._v(t._s(s.username)),
                                ]),
                                e("div", { staticClass: "score" }, [
                                  e(
                                    "div",
                                    { staticClass: "star-wrapper" },
                                    [
                                      e("star", {
                                        attrs: { size: 24, score: s.score },
                                      }),
                                    ],
                                    1,
                                  ),
                                  e("em", { staticClass: "deliveryTime" }, [
                                    t._v(t._s(s.deliveryTime)),
                                  ]),
                                ]),
                                e("p", { staticClass: "text" }, [
                                  t._v(t._s(s.text)),
                                ]),
                                s.recommend && s.recommend.length
                                  ? e(
                                      "div",
                                      { staticClass: "recommend" },
                                      [
                                        e("i", {
                                          class: {
                                            "icon-thumb_up": 0 === s.rateType,
                                            "icon-thumb_down": 1 === s.rateType,
                                          },
                                        }),
                                        t._l(s.recommend, function (s, i) {
                                          return e(
                                            "em",
                                            {
                                              key: i,
                                              staticClass: "recommend-item",
                                            },
                                            [
                                              t._v(
                                                "\n                                    " +
                                                  t._s(s) +
                                                  "\n                                ",
                                              ),
                                            ],
                                          );
                                        }),
                                      ],
                                      2,
                                    )
                                  : t._e(),
                              ]),
                            ],
                          );
                        }),
                        0,
                      )
                    : t._e(),
                ]),
              ]),
            ],
            1,
          ),
        ]);
      },
      Wt = [],
      Ut = 0,
      Jt = 2,
      qt = 0,
      Xt = 1,
      Vt = !1,
      Gt = {
        name: "ratings",
        props: { seller: { type: Object } },
        data: function () {
          return {
            ratings: [],
            desc: { all: "全部", positive: "满意", negative: "不满意" },
            onlyContent: !1,
            selectType: Jt,
          };
        },
        created: function () {
          var t = this,
            s = Vt
              ? "/api/ratings"
              : "ratings.json";
          (this.ratings.length <= 0 &&
            this.$http.get(s).then(function (s) {
              ((s = s.body), s.errno === Ut && (t.ratings = s.data));
            }),
            this.$nextTick(function () {
              t.ratingsScroll = new z["a"](t.$refs.ratings, { click: !0 });
            }));
        },
        computed: {
          computedRatings: function () {
            var t = this,
              s = [];
            return (
              this.ratings.forEach(function (e) {
                switch (t.selectType) {
                  case Jt:
                    t.onlyContent ? e.text && s.push(e) : s.push(e);
                    break;
                  case qt:
                    t.onlyContent
                      ? e.text && e.rateType === qt && s.push(e)
                      : e.rateType === qt && s.push(e);
                    break;
                  case Xt:
                    t.onlyContent
                      ? e.text && e.rateType === Xt && s.push(e)
                      : e.rateType === Xt && s.push(e);
                    break;
                }
              }),
              s
            );
          },
        },
        methods: {
          tabSelect: function (t) {
            var s = this;
            ((this.selectType = t),
              this.$nextTick(function () {
                s.ratingsScroll.refresh();
              }));
          },
          toggle: function () {
            var t = this;
            ((this.onlyContent = !this.onlyContent),
              this.$nextTick(function () {
                t.ratingsScroll.refresh();
              }));
          },
          format: function (t) {
            return Pt()(t).format("YYYY-MM-DD hh:mm");
          },
        },
        components: { split: vt, star: _, "rating-select": Tt },
      },
      Kt = Gt,
      Qt = (e("59f9"), Object(m["a"])(Kt, Bt, Wt, !1, null, "58b350e5", null)),
      Zt = Qt.exports,
      ts = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e(
          "div",
          { ref: "seller", staticClass: "seller" },
          [
            e(
              "section",
              { staticClass: "seller-container" },
              [
                e("div", { staticClass: "shop-wrapper" }, [
                  e(
                    "div",
                    {
                      staticClass: "favorite",
                      class: { active: t.favorite },
                      on: { click: t.favoriteToggle },
                    },
                    [
                      e("i", { staticClass: "icon-favorite" }),
                      e("em", [t._v(t._s(t.favorite ? "已收藏" : "收藏"))]),
                    ],
                  ),
                  e("h2", { staticClass: "shop-name" }, [
                    t._v(t._s(t.seller.name)),
                  ]),
                  e("div", { staticClass: "shop-rating border-1px" }, [
                    e(
                      "div",
                      { staticClass: "star-wrapper" },
                      [
                        e("star", {
                          attrs: { size: 36, score: t.seller.score },
                        }),
                      ],
                      1,
                    ),
                    e("span", { staticClass: "count" }, [
                      t._v("(" + t._s(t.seller.ratingCount) + ")"),
                    ]),
                    e("span", { staticClass: "count" }, [
                      t._v("月售" + t._s(t.seller.sellCount) + "单"),
                    ]),
                  ]),
                  e("ul", { staticClass: "shop-mes" }, [
                    e("li", { staticClass: "mes-item" }, [
                      e("span", { staticClass: "title" }, [t._v("起送价")]),
                      e("p", { staticClass: "text" }, [
                        t._v(t._s(t.seller.minPrice)),
                        e("em", [t._v("元")]),
                      ]),
                    ]),
                    e("li", { staticClass: "mes-item" }, [
                      e("span", { staticClass: "title" }, [t._v("商家配送")]),
                      e("p", { staticClass: "text" }, [
                        t._v(t._s(t.seller.deliveryPrice)),
                        e("em", [t._v("元")]),
                      ]),
                    ]),
                    e("li", { staticClass: "mes-item" }, [
                      e("span", { staticClass: "title" }, [
                        t._v("平均配送时间"),
                      ]),
                      e("p", { staticClass: "text" }, [
                        t._v(t._s(t.seller.deliveryTime)),
                        e("em", [t._v("分钟")]),
                      ]),
                    ]),
                  ]),
                ]),
                e("split"),
                e("div", { staticClass: "bulletin-wrapper" }, [
                  e("div", { staticClass: "title" }, [t._v("公告与活动")]),
                  e("p", { staticClass: "text border-1px" }, [
                    t._v(t._s(t.seller.bulletin)),
                  ]),
                  t.seller.supports && t.seller.supports.length
                    ? e(
                        "ul",
                        { staticClass: "support-list" },
                        t._l(t.seller.supports, function (s, i) {
                          return e(
                            "li",
                            { key: i, staticClass: "support-item border-1px" },
                            [
                              e("cite", {
                                staticClass: "icon",
                                class: t.supportClsMap[i],
                              }),
                              e("span", { staticClass: "desc" }, [
                                t._v(t._s(s.description)),
                              ]),
                            ],
                          );
                        }),
                        0,
                      )
                    : t._e(),
                ]),
                e("split"),
                e("div", { staticClass: "pic-wrapper" }, [
                  e("div", { staticClass: "title" }, [t._v("商家实景")]),
                  e("div", { ref: "pic", staticClass: "pic-container" }, [
                    t.pics && t.pics.length
                      ? e(
                          "ul",
                          { ref: "picList" },
                          t._l(t.seller.pics, function (s, i) {
                            return e(
                              "li",
                              {
                                key: i,
                                staticClass: "pic-item",
                                on: {
                                  click: function (s) {
                                    return t.openImgAlert(i, s);
                                  },
                                },
                              },
                              [e("img", { attrs: { src: s } })],
                            );
                          }),
                          0,
                        )
                      : t._e(),
                  ]),
                ]),
                e("split"),
                e("div", { staticClass: "info-wrapper" }, [
                  e("div", { staticClass: "title border-1px" }, [
                    t._v("商家信息"),
                  ]),
                  e(
                    "ul",
                    { staticClass: "info-list" },
                    t._l(t.seller.infos, function (s, i) {
                      return e(
                        "li",
                        { key: i, staticClass: "info-item border-1px" },
                        [
                          t._v(
                            "\n                    " +
                              t._s(s) +
                              "\n                ",
                          ),
                        ],
                      );
                    }),
                    0,
                  ),
                ]),
              ],
              1,
            ),
            e("img-alert", { ref: "imgAlert", attrs: { pics: t.pics } }),
          ],
          1,
        );
      },
      ss = [],
      es = function () {
        var t = this,
          s = t.$createElement,
          e = t._self._c || s;
        return e("transition", { attrs: { name: "fadeIn" } }, [
          e(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: t.alertShow,
                  expression: "alertShow",
                },
              ],
              staticClass: "img-alert",
              on: { click: t._close },
            },
            [
              e("div", { staticClass: "slide-wrapper" }, [
                e(
                  "span",
                  {
                    staticClass: "goprev btn",
                    class: { "arrow-fadeOut": t.first },
                    on: {
                      click: function (s) {
                        return (
                          s.stopPropagation(),
                          s.preventDefault(),
                          t.pagePrev(s)
                        );
                      },
                    },
                  },
                  [e("i", { staticClass: "icon-arrow_lift" })],
                ),
                e(
                  "span",
                  {
                    staticClass: "gonext btn",
                    class: { "arrow-fadeOut": t.last },
                    on: {
                      click: function (s) {
                        return (
                          s.stopPropagation(),
                          s.preventDefault(),
                          t.pageNext(s)
                        );
                      },
                    },
                  },
                  [e("i", { staticClass: "icon-arrow_lift" })],
                ),
                e("p", { staticClass: "nowpage" }, [
                  e("em", { staticClass: "now" }, [t._v(t._s(t.nowpage))]),
                  t._v(" / " + t._s(t.pics.length) + "\n            "),
                ]),
                e("div", { ref: "bigbox", staticClass: "bigbox" }, [
                  t.pics && t.pics.length
                    ? e(
                        "ul",
                        { ref: "biglist", staticClass: "biglist" },
                        t._l(t.pics, function (s, i) {
                          return e(
                            "li",
                            {
                              key: i,
                              staticClass: "big-item big-item-hook",
                              style: "width:" + t.screenWidth + "px",
                            },
                            [
                              e("img", {
                                staticClass: "bigImg",
                                attrs: { src: s },
                              }),
                            ],
                          );
                        }),
                        0,
                      )
                    : t._e(),
                ]),
              ]),
              e("div", { staticClass: "close" }, [
                e("i", { staticClass: "icon-close" }),
              ]),
            ],
          ),
        ]);
      },
      is = [],
      as = {
        name: "img-alert",
        props: {
          pics: {
            type: Array,
            default: function () {
              return [];
            },
          },
        },
        data: function () {
          return { alertShow: !1, nowpage: 1, last: !1, first: !1 };
        },
        created: function () {
          this.screenWidth = window.innerWidth;
        },
        methods: {
          show: function (t) {
            var s = this;
            ((this.alertShow = !0),
              this.pics.length > 0 &&
                (this._initUlWidth(),
                this._initArrow(t),
                this.$nextTick(function () {
                  (s.slideScroll
                    ? s.slideScroll.refresh()
                    : (s.slideScroll = new z["a"](s.$refs.bigbox, {
                        scrollX: !0,
                        scrollY: !1,
                        momentum: !1,
                        snap: { loop: !1, threshold: 0.3, speed: 400 },
                      })),
                    s.slideScroll.goToPage(t, 0, 0),
                    (s.nowpage = t + 1),
                    s._listenScrollEnd());
                })));
          },
          _listenScrollEnd: function () {
            var t = this;
            t.slideScroll.on("scrollEnd", function () {
              var s = this.getCurrentPage().pageX;
              switch (s) {
                case 0:
                  t.first = !0;
                  break;
                case t.pics.length - 1:
                  t.last = !0;
                  break;
                default:
                  t.first = t.last = !1;
              }
              (console.log(s), (t.nowpage = s + 1));
            });
          },
          pagePrev: function () {
            this.slideScroll.prev();
          },
          pageNext: function () {
            this.slideScroll.next();
          },
          _close: function (t) {
            t._constructed && (this.alertShow = !1);
          },
          _initUlWidth: function () {
            var t = this.$refs.bigbox.clientWidth,
              s = t * this.pics.length;
            this.$refs.biglist.style.width = s + "px";
          },
          _initArrow: function (t) {
            switch (t) {
              case 0:
                ((this.first = !0), (this.last = !1));
                break;
              case this.pics.length - 1:
                ((this.first = !1), (this.last = !0));
                break;
              default:
                ((this.first = !1), (this.last = !1));
            }
          },
        },
      },
      ns = as,
      os = (e("f29a"), Object(m["a"])(ns, es, is, !1, null, "2397a7cf", null)),
      rs = os.exports;
    function ls(t, s, e) {
      var i = window.localStorage._seller_;
      (i ? ((i = JSON.parse(i)), i[t] || (i[t] = {})) : ((i = {}), (i[t] = {})),
        (i[t][s] = e),
        (window.localStorage._seller_ = JSON.stringify(i)));
    }
    function cs(t, s, e) {
      var i = window.localStorage._seller_;
      if (!i) return e;
      if (((i = JSON.parse(i)[t]), !i)) return e;
      var a = i[s];
      return a || e;
    }
    var us = {
        name: "seller",
        props: { seller: { type: Object } },
        data: function () {
          var t = this;
          return {
            favorite: (function () {
              return cs(t.seller.id, "favorite", !1);
            })(),
          };
        },
        created: function () {
          this.supportClsMap = ["jian", "zhe", "te", "piao", "bao"];
        },
        computed: {
          pics: function () {
            return this.seller.pics;
          },
        },
        watch: {
          seller: function () {
            var t = this;
            this.$nextTick(function () {
              (t._initScroll(), t._initPicScroll());
            });
          },
        },
        mounted: function () {
          var t = this;
          this.$nextTick(function () {
            (t._initScroll(), t._initPicScroll());
          });
        },
        methods: {
          favoriteToggle: function (t) {
            t._constructed &&
              ((this.favorite = !this.favorite),
              ls(this.seller.id, "favorite", this.favorite));
          },
          openImgAlert: function (t, s) {
            s._constructed &&
              (this.picScroll.scrollToElement(s.target, 300),
              this.$refs.imgAlert.show(t));
          },
          _initScroll: function () {
            this.sellerScroll
              ? this.sellerScroll.refresh()
              : (this.sellerScroll = new z["a"](this.$refs.seller, {
                  click: !0,
                }));
          },
          _initPicScroll: function () {
            var t = this;
            if (this.seller.pics) {
              var s = 150,
                e = 6,
                i = (s + e) * this.seller.pics.length - e;
              ((this.$refs.picList.style.width = i + "px"),
                this.$nextTick(function () {
                  t.picScroll
                    ? t.picScroll.refresh()
                    : (t.picScroll = new z["a"](t.$refs.pic, {
                        click: !0,
                        scrollX: !0,
                        eventPassthrough: "vertical",
                      }));
                }));
            }
          },
        },
        components: { star: _, split: vt, "img-alert": rs },
      },
      ds = us,
      ps = (e("7df7"), Object(m["a"])(ds, ts, ss, !1, null, "b450355c", null)),
      fs = ps.exports;
    i["a"].use(O["a"]);
    var hs = [
        { path: "/", redirect: "/goods" },
        { path: "/goods", component: zt },
        { path: "/ratings", component: Zt },
        { path: "/seller", component: fs },
      ],
      vs = new O["a"]({ linkActiveClass: "active", routes: hs }),
      ms = e("28dd");
    e("f867");
    (i["a"].use(ms["a"]),
      (i["a"].config.productionTip = !1),
      new i["a"]({
        el: "#app",
        router: vs,
        render: function (t) {
          return t(E);
        },
      }));
  },
  5717: function (t, s, e) {
    "use strict";
    var i = e("080e"),
      a = e.n(i);
    a.a;
  },
  "59f9": function (t, s, e) {
    "use strict";
    var i = e("a634"),
      a = e.n(i);
    a.a;
  },
  "642a": function (t, s, e) {
    "use strict";
    var i = e("2ffa"),
      a = e.n(i);
    a.a;
  },
  "7add": function (t, s, e) {},
  "7df7": function (t, s, e) {
    "use strict";
    var i = e("4e72"),
      a = e.n(i);
    a.a;
  },
  "98da": function (t, s, e) {},
  a634: function (t, s, e) {},
  a734: function (t, s, e) {
    "use strict";
    var i = e("42fb"),
      a = e.n(i);
    a.a;
  },
  b648: function (t, s, e) {},
  d176: function (t, s, e) {},
  d2dd: function (t, s, e) {
    "use strict";
    var i = e("7add"),
      a = e.n(i);
    a.a;
  },
  e936: function (t, s, e) {
    "use strict";
    var i = e("0361"),
      a = e.n(i);
    a.a;
  },
  f29a: function (t, s, e) {
    "use strict";
    var i = e("2192"),
      a = e.n(i);
    a.a;
  },
  f867: function (t, s, e) {},
});
//# sourceMappingURL=app.dab521a9.js.map
