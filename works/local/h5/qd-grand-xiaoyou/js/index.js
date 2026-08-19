"use strict";
var domRect = window.document.documentElement.getBoundingClientRect(),
bw = domRect.width,
bh = domRect.height,
Page = function(e) {
    this.$leftRadio = $(".radio_left .bulecircle"),
    this.$rightRadio = $(".radio_right .bulecircle"),
    this.$loading = $(".loading-box-con"),
    this.$loadingtext = this.$loading.find(".text"),
    this.closeloading = !1,
    this.imgloading = "red",
    this.selectedval = null,
    this.selectedText = "",
    this.modifyLoading = !1,
    this.checkRadioValue = "",
    this.qrcardArrCon = {
        red: {
            base64: qrcardred,
            height: 217,
            left: 15,
            bottom: 16
        },
        green: {
            base64: qrcardgreen,
            height: 234,
            left: 23,
            bottom: 6
        },
        blue: {
            base64: qrcardblue,
            height: 226,
            left: 90,
            bottom: 6
        }
    },
    this.init()
};
Page.prototype = {
    init: function() {
        if ($(".full_thing").css("backgroundImage", "url(" + banner1 + ")"), $(".school_logo").attr("src", schoolLogoBlue), this.code = pageParams.code, -2 === this.code) this.firstpage();
        else {
            this.paramsShowInCanvasYear = pageParams.year,
            this.paramsShowInCanvasNumber = pageParams.number,
            this.paramsShowInCanvasLevel = pageParams.level,
            pageParams.headOrg && ($(".domimg").attr("src", pageParams.headOrg), $(".domimgcon").show()),
            $("#graduation").val(this.paramsShowInCanvasYear),
            $("#name").val(pageParams.nick),
            $("#selectclass").val(this.paramsShowInCanvasNumber);
            var e = this.paramsShowInCanvasNumber + "班";
            this.selectedval = this.paramsShowInCanvasNumber,
            $(".showselect").text(e),
            $(".showselect").css("color", "#000"),
            "初中" === this.paramsShowInCanvasLevel ? this.$leftRadio.css({
                width: "12px",
                height: "12px"
            }) : "高中" === this.paramsShowInCanvasLevel && this.$rightRadio.css({
                width: "12px",
                height: "12px"
            }),
            this.checkRadioValue = this.paramsShowInCanvasLevel,
            this.firstpage()
        }
    },
    addListen: function() {
        var e = this,
        t = document.querySelector(".showimgcon");
        new Hammer(t).on("tap",
        function(t) {
            $(".showimgcon").hide(),
            setTimeout(function() {
                e.closeloading = !1
            },
            200)
        }),
        $(".share").on("click",
        function() {
            if (e.closeloading) return ! 1;
            $(".sharecon").show()
        }),
        $(".sharecon").on("click",
        function() {
            $(".sharecon").hide()
        })
    },
    genrateTouch: function() {
        var e, t, i = this,
        o = !1;
        $(".firstpage").on("touchstart",
        function(t) {
            e = t.originalEvent.changedTouches[0].pageY
        }),
        $(".firstpage").on("touchend",
        function(n) { (t = n.originalEvent.changedTouches[0].pageY) - e < 0 && !o && (o = !0, $(".firstpage").hide(), i.firstAnm.kill(), i.secondpage())
        }),
        $("#selectclass").change(function(e) {
            i.selectedval = $(this).children("option:selected").val(),
            i.selectedText = $(this).children("option:selected").text(),
            "0" !== i.selectedval && i.selectedval ? ($(".showselect").css("color", "#000"), $(".showselect").text(i.selectedText)) : ($(".showselect").css("color", "#a0a0a0"), $(".showselect").text("请选择几班"))
        });
        var n = !0;
        $(".radio_input").on("click",
        function() {
            if (!1 === n) return ! 1;
            n = !1,
            i.checkRadioValue = $(this).val(),
            "高中" === i.checkRadioValue ? (i.$leftRadio.css({
                width: "0px",
                height: "0px"
            }), i.$rightRadio.animate({
                width: "12px",
                height: "12px"
            },
            200,
            function() {
                n = !0
            })) : "初中" === i.checkRadioValue && (i.$leftRadio.animate({
                width: "12px",
                height: "12px"
            },
            200,
            function() {
                n = !0
            }), i.$rightRadio.css({
                width: "0px",
                height: "0px"
            }))
        })
    },
    firstpage: function() {
        var e = this;
        this.$firstpage = $(".firstpage"),
        this.$firstdate = this.$firstpage.find(".date"),
        this.$firstnote = this.$firstpage.find(".note"),
        this.$firstfollower = this.$firstpage.find(".follower"),
        this.$firstbook = this.$firstpage.find(".book"),
        this.$letter = this.$firstpage.find(".letter"),
        this.$firsttext = this.$firstpage.find(".firsttext"),
        this.$firstarrow = this.$firstpage.find(".arrow"),
        this.firstAnm = new TimelineMax({
            paused: !0
        }),
        this.firstAnm.from(this.$firstdate, 1, {
            opacity: 0,
            ease: Power1.easeOut
        },
        "one").from(this.$firstnote, 1, {
            opacity: 0,
            ease: Power1.easeOut
        },
        "-=0.6").from(this.$firstbook, 1.2, {
            opacity: 0,
            ease: Power1.easeOut
        },
        "-=0.8").from(this.$firstfollower, 1, {
            opacity: 0,
            ease: Power1.easeOut
        },
        "-=0.8").from(this.$letter, 1, {
            x: -10,
            y: 10,
            opacity: 0,
            ease: Power1.easeOut
        },
        "-=0.6").from(this.$firsttext, 4, {
            opacity: 0,
            ease: Power1.easeOut
        }).from(this.$firstarrow, 1, {
            opacity: 0,
            ease: Power1.easeOut,
            onComplete: function() {
                e.genrateTouch()
            }
        },
        "-=3").from(this.$firstarrow, 1, {
            y: -10,
            yoyo: !0,
            repeat: -1,
            ease: Power1.easeOut
        },
        "-=3"),
        this.$firstpage.show(),
        this.firstAnm.play()
    },
    secondpage: function() {
        var e = this;
        this.$secondpage = $(".secondpage"),
        this.$studentcon = $(".studentcon"),
        this.$boardContent = $(".secondpage .backboardcontent"),
        this.$inpodium = $(".podiumcon .secondinpodium"),
        this.$student1 = this.$studentcon.find(".student1_content"),
        this.$student2 = this.$studentcon.find(".student2_content"),
        this.$student3 = this.$studentcon.find(".student3_content"),
        this.$student4 = this.$studentcon.find(".student4_content"),
        this.$student5 = this.$studentcon.find(".student5_content"),
        this.$student6 = this.$studentcon.find(".student6_content"),
        this.$treeone = this.$secondpage.find("#treeone"),
        this.$treetwo = this.$secondpage.find("#treetwo"),
        this.$treethree = this.$secondpage.find("#treethree"),
        this.$secondsun1 = this.$secondpage.find(".secondsun1"),
        this.$secondsun2 = this.$secondpage.find(".secondsun2"),
        this.secondAnm = new TimelineMax({
            paused: !0
        }),
        this.secondAnm.from(this.$boardContent, 1.3, {
            opacity: 0,
            ease: Power0.easeNone
        },
        "second_one").from(this.$inpodium, .8, {
            opacity: 0,
            ease: Power0.easeNone
        },
        "-=0.8").from(this.$secondsun1, 1.5, {
            opacity: .5,
            yoyo: !0,
            repeat: -1,
            ease: Power0.easeNone
        },
        "-=0.8").from(this.$secondsun2, 1.5, {
            opacity: .5,
            yoyo: !0,
            repeat: -1,
            ease: Power0.easeNone
        },
        "-=1.2").from(this.$student1, 1.5, {
            x: -5,
            opacity: 0,
            ease: Power0.easeIn
        },
        "second_one+=1.3").from(this.$student2, 1.5, {
            x: 5,
            opacity: 0,
            ease: Power0.easeIn
        },
        "-=0.8").from(this.$student5, 1.5, {
            x: -5,
            opacity: 0,
            ease: Power0.easeIn
        },
        "-=0.8").from(this.$student4, 1.5, {
            x: 5,
            opacity: 0,
            ease: Power0.easeIn
        },
        "-=0.8").from(this.$student3, 1.5, {
            x: -5,
            opacity: 0,
            ease: Power0.easeIn
        },
        "-=0.8").from(this.$student6, 1.5, {
            x: 5,
            opacity: 0,
            ease: Power0.easeIn
        },
        "-=0.8").to(this.$secondpage, 1.5, {
            z: 100,
            x: 30,
            opacity: .3,
            ease: Power0.easeOut,
            onComplete: function() {
                e.threepage(),
                e.secondAnm.kill()
            }
        },
        "-=0.2").from(this.$treeone, .8, {
            opacity: 0,
            ease: Power1.easeOutOut
        },
        "second_one+=0.5").from(this.$treetwo, .8, {
            opacity: 0,
            ease: Power1.easeOutOut
        },
        "second_one+=0.8").from(this.$treethree, .8, {
            opacity: 0,
            ease: Power1.easeOutOut
        },
        "second_one+=1").to(this.$treeone, 4.2, {
            bezier: [{
                x: 108,
                y: 406
            },
            {
                x: 600,
                y: 745
            }],
            scale: .5,
            rotation: -10,
            opacity: 0,
            orientToBezier: !0,
            ease: Power1.easeIn
        },
        "second_one+=0.8").to(this.$treetwo, 3.8, {
            bezier: [{
                x: 88,
                y: 406
            },
            {
                x: 400,
                y: 745
            }],
            scale: .5,
            rotation: -10,
            opacity: 0,
            orientToBezier: !0,
            ease: Power1.easeIn
        },
        "second_one+=1.2").to(this.$treethree, 2, {
            bezier: [{
                x: 108,
                y: 406
            },
            {
                x: 600,
                y: 745
            }],
            scale: .5,
            rotation: -10,
            opacity: 0,
            orientToBezier: !0,
            ease: Power1.easeIn
        },
        "second_one+=1.4"),
        this.$secondpage.show(),
        this.secondAnm.play()
    },
    threepage: function() {
        var e = this;
        this.$threepage = $(".threepage"),
        this.$clickcard = $(".clickcard"),
        this.$student = this.$threepage.find(".student"),
        this.$studentcard = this.$threepage.find(".studentcardCon"),
        this.$point = this.$threepage.find(".point"),
        this.threeAnm = new TimelineMax({
            paused: !0
        }),
        this.threeAnm.from(this.$threepage, 1.3, {
            opacity: .2
        },
        "one").from(this.$student, 1.3, {
            opacity: .6
        },
        "one").from(this.$studentcard, 1.3, {
            opacity: .1
        },
        "-=0.8").from(this.$point, .5, {
            opacity: 0,
            ease: Power0.easeNone,
            onComplete: function() {
                var t = !1;
                e.$clickcard.on("click",
                function() { ! 1 === t && (t = !0, e.$point.hide(), e.threeAnm.kill(), e.threetofour())
                })
            }
        },
        "-=0.8").from(this.$point, .8, {
            x: 10,
            y: 10,
            yoyo: !0,
            repeat: -1,
            ease: Power0.easeNone
        }),
        this.$secondpage.hide(),
        this.$threepage.show(),
        this.threeAnm.play()
    },
    threetofour: function() {
        var e = this;
        this.threetofourAnm = new TimelineMax({
            paused: !0
        }),
        this.threetofourAnm.to(this.$threepage, 2.8, {
            z: 300,
            x: 140,
            y: -120,
            ease: Power1.easeOut,
            onComplete: function() {
                setTimeout(function() {
                    $(".studentcardCon").css("backgroundPosition", "-219px 0px")
                },
                80),
                setTimeout(function() {
                    $(".studentcardCon").css("backgroundPosition", "-428px 0px")
                },
                160),
                setTimeout(function() {
                    $(".studentcardCon").css("backgroundPosition", "-630px 0px")
                },
                240),
                setTimeout(function() {
                    $(".studentcardCon").css("backgroundPosition", "-838px 0px"),
                    setTimeout(function() {
                        e.$threepage.hide(),
                        e.fourpage()
                    },
                    120)
                },
                300)
            }
        }),
        this.threetofourAnm.play()
    },
    fourpage: function() {
        var e = this;
        this.$fourpage = $(".fourpage"),
        this.$fourpage.show(),
        this.$upload = $(".table_right"),
        this.uploadimg(),
        this.$fourpage.find(".left1").on("click",
        function() {
            e.$upload.find(".photo").trigger("click")
        }),
        this.$fourpage.find(".left2").on("click",
        function() {
            e.findclass()
        })
    },
    uploadimg: function() {
        var e = this;
        e.beforeRoate = void 0,
        this.cutCanvas = document.getElementById("cutCanvas"),
        this.ctrlLayer = document.getElementById("ctrlLayer"),
        this.$upload.find(".photo").on("change",
        function(t) {
            var i = this.files[0];
            return void 0 !== i && (i.type && !/image\/\w+/.test(i.type) ? (alert("请上传图片文件"), !1) : void EXIF.getData(i,
            function() {
                var t = EXIF.getTag(this, "Orientation"),
                o = new FileReader;
                o.readAsDataURL(i),
                o.onload = function(i) {
                    var o = new Image;
                    e.cutCanvas.style.display = "block",
                    e.ctrlLayer.style.display = "block",
                    e.$upload.find(".input_img_con").hide(),
                    o.onload = function() {
                        new ImgTouchCanvas({
                            canvas: e.cutCanvas,
                            contrler: e.ctrlLayer,
                            path: o.src,
                            imgRoate: t,
                            beforeRoate: e.beforeRoate
                        });
                        e.modifyLoading = !0,
                        $(".domimgcon").hide(),
                        e.beforeRoate = t
                    },
                    e.isUpload = !0,
                    o.src = i.target.result
                }
            }))
        })
    },
    findclass: function() {
        var e = this,
        t = {};
        t.nick = $("#name").val(),
        t.year = $("#graduation").val(),
        t.number = this.selectedval,
        t.level = this.checkRadioValue;
        var i = this.cutCanvas.toDataURL(.99);
        return ! t.nick || t.nick.length > 10 ? (alert("请正确填写您的姓名"), !1) : t.year && this.Judgefrom(t.year) ? "" !== t.level && t.level ? t.number && "0" !== t.number ? !$(".photo").val() && -2 === pageParams.code || 0 === pageParams.code && !pageParams.headOrg ? (alert("请先上传您的照片"), !1) : (this.paramsShowInCanvasYear = t.year, this.paramsShowInCanvasNumber = t.number, this.paramsShowInCanvasLevel = t.level, this.$loadingtext.text("合成照片中"), this.$loading.show(), void this.generateMyimg(i, t.nick).then(function(t) {
            e.addListen(),
            e.generateResultDom(t),
            e.generateMyCanvas()
        }).
        catch(function(t) {
            e.$loading.hide(),
            -1 === t ? alert("token失效，请重新打开页面") : alert("系统开了个小差")
        })) : (alert("请选择您所在的班级"), !1) : (alert("请选择您毕业的年级"), !1) : (alert("请正确填写您的毕业年份，如：1996"), !1)
    },
    generateMyimg: function(e, t) {
        return new Promise(function(i) {
            var o = new Image,
            n = new Image,
            a = parseInt(5 * Math.random(0, 1));
            n.src = needlearr[a],
            o.onload = function() {
                var e = document.createElement("canvas"),
                a = e.getContext("2d");
                e.width = 414,
                e.height = 605,
                a.fillStyle = "rgba(255,255,255,1)",
                a.fillRect(28, 30, 357, 545),
                a.drawImage(o, 60, 65, 293, 400),
                a.drawImage(n, 352, -20, 70, 70),
                a.fillStyle = "#002f6f",
                a.font = "40px '微软雅黑'",
                a.textAlign = "center",
                a.fillText(t, 207, 532);
                var s = e.toDataURL(.8);
                i(s)
            },
            o.src = e
        })
    },
    generateResultDom: function(e) {
        isStop = !1,
        $(".previewImgcon").append('<img src="' + e + '" alt="" class="resultimg2" >');
        var t = $(".resultimg2"),
        i = t.length,
        o = i < 8 ? enDomImg[i - 1] : enDomImg[7];
        if (i <= 7) {
            for (var n = 0; n < i; n++) $(t[n]).css(o[n]);
            var a = {
                width: "100%",
                height: "100%"
            };
            $(".full_thing").css(a)
        } else {
            var s = 347 * parseInt((i - 1) / 4) + 536 + 356,
            a = {
                width: "100%",
                height: s + "px"
            };
            $(".full_thing").css(a);
            for (var r = [ - 11, -9, -7, -5, -3, 3, 5, 7, 9, 11], h = 0; h < i; h++) {
                var c = h % 4;
                if (parseInt(h / 4) > 0) {
                    o[c].top = Number(o[c].top.split("px")[0]) + 347 + "px";
                    var d = parseInt(10 * Math.random(0, 1));
                    o[c].transform = "rotate(" + r[d] + "deg)"
                }
                $(t[h]).css(o[c])
            }
        }
        this.$fourpage.hide(),
        this.$loading.hide();
        var l = this.paramsShowInCanvasYear + " 届 " + this.paramsShowInCanvasLevel + " " + this.paramsShowInCanvasNumber + " 班";
        $(".endtext").text(l),
        $(".endpage").show();
        var g = new TimelineMax;
        $(".chooseimgtip").show(),
        setTimeout(function() {
            g.to(".chooseimgtip", 1, {
                opacity: 0,
                y: -100,
                ease: Power0.easeNone,
                onComplete: function() {
                    g.kill(),
                    $(".chooseimgtip").hide()
                }
            })
        },
        1500),
        this.circleAnm = new TimelineMax({
            paused: !0
        }),
        this.circleAnm.from(".circleContent", 1.4, {
            opacity: .6,
            ease: Power1.easeOut,
            yoyo: !0,
            repeat: -1
        },
        "one").to(".outcircle", 1.4, {
            scale: 1.3,
            opacity: 0,
            ease: Power1.easeOut,
            yoyo: !1,
            repeat: -1
        },
        "one"),
        this.circleAnm.play();
        var u = this;
        this.$outCircle = $(".outcircle"),
        this.$outCircle.on("click",
        function() {
            $(".chooseimgCon").show()
        }),
        $(".chooseimgCon").on("click", ".choose",
        function(e) {
            var t = $(this).attr("class");
            if (t.indexOf("red") >= 0) {
                if ("red" === u.imgloading) return ! 1;
                u.changeBanner("red"),
                u.imgloading = "red",
                $(this).find("div").show(),
                $(this).siblings(".choose").find("div").hide()
            } else if (t.indexOf("green") >= 0) {
                if ("green" === u.imgloading) return ! 1;
                u.changeBanner("green"),
                u.imgloading = "green",
                $(this).find("div").show(),
                $(this).siblings(".choose").find("div").hide()
            } else if (t.indexOf("blue") >= 0) {
                if ("blue" === u.imgloading) return ! 1;
                u.changeBanner("blue"),
                u.imgloading = "blue",
                $(this).find("div").show(),
                $(this).siblings(".choose").find("div").hide()
            }
            $(".chooseimgCon").hide()
        }),
        $(".chooseimgtext,.closechoose").on("click",
        function() {
            $(".chooseimgCon").hide()
        }),
        this.initWechatView()
    },
    changeBanner: function(e) {
        var t = {
            red: banner1,
            green: banner2,
            blue: banner3
        },
        i = {
            red: schoolLogoBlue,
            green: schoolLogoBlue,
            blue: schoolLogoWhite
        };
        $(".full_thing").css("backgroundImage", "url(" + t[e] + ")"),
        $(".school_logo").attr("src", i[e])
    },
    generateMyCanvas: function() {
        var e = this;
        e.beforeimgloading = "",
        this.$generateMycanvas = $(".generate"),
        this.$generateMycanvas.on("click",
        function() {
            if (e.closeloading) return ! 1;
            if (e.beforeimgloading === e.imgloading) return e.closeloading = !0,
            $(".showimgcon").show(),
            !1;
            e.$loadingtext.text("正在生成中"),
            e.$loading.show();
            var t = "";
            "red" === e.imgloading ? t = banner1: "green" === e.imgloading ? t = banner2: "blue" === e.imgloading && (t = banner3);
            var i = e.qrcardArrCon[e.imgloading];
            e.beforeimgloading = e.imgloading;
            var o = new Image,
            n = new Image;
            n.onload = function() {
                o.onload = function() {
                    var t = document.getElementById("full_thing"),
                    a = $(".resultimg2"),
                    s = document.createElement("canvas"),
                    r = s.getContext("2d");
                    a.length < 8 ? (s.width = bw, s.height = bh + 70) : (s.width = 750, s.height = Number(t.style.height.split("px")[0]) + 30);
                    for (var h = parseInt(s.height / this.height) + 1, c = 0; c < h; c++) {
                        var d = this.height * c;
                        r.drawImage(o, 0, d, this.width, this.height)
                    }
                    for (var l = a.length - 1; l >= 0; l--) {
                        r.setTransform(1, 0, 0, 1, 0, 0);
                        var g = void 0,
                        u = void 0;
                        g = 1 === a.length ? Number(a[l].style.left.split("px")[0]) : Number(a[l].style.left.split("%")[0]) / 100 * bw;
                        var f = Number(a[l].style.marginTop.split("px")[0]);
                        u = a.length < 8 ? Number(a[l].style.top.split("%")[0]) / 100 * bh: Number(a[l].style.top.split("px")[0]);
                        var p = a[l].style.transform,
                        m = parseInt(Number(a[l].style.width.split("px")[0])),
                        w = parseInt(1.45 * m),
                        v = parseInt(g),
                        y = parseInt(u + f),
                        b = Number((e.getrotate(p) * Math.PI / 180).toFixed(2));
                        r.translate(v + .5 * m, y + .5 * w),
                        r.rotate(b),
                        r.drawImage(a[l], -.5 * m, -.5 * w, m, w)
                    }
                    r.setTransform(1, 0, 0, 1, 0, 0),
                    r.fillStyle = "#002f6f",
                    r.font = "50px '微软雅黑'",
                    r.textAlign = "center";
                    var x = e.paramsShowInCanvasYear,
                    I = e.paramsShowInCanvasNumber,
                    C = e.paramsShowInCanvasLevel;
                    r.fillText(x + " 届 " + C + " " + I + " 班", 375, 180);
                    var P = $(".school_logo")[0];
                    r.drawImage(P, 268, 40);
                    var k = s.height - i.bottom - i.height;
                    r.drawImage(n, i.left, k);
                    var T = s.toDataURL(.99);
                    $(".saveimg").attr("src", T),
                    e.closeloading = !0,
                    $(".showimgcon").show(),
                    e.$loading.hide()
                },
                o.src = t
            },
            n.src = i.base64
        })
    },
    getrotate: function(e) {
        if (e) {
            var t = e.split("(")[1];
            return Number(t.split(")")[0].split("deg")[0])
        }
        return 0
    },
    initWechatView: function() {
        var e = this;
        $(".resultimg2").on("click",
        function(t) {
            if (e.closeloading) return ! 1;
            var i = $(this).attr("data-src");
            i && wx.previewImage({
                current: i,
                urls: e.imglistArr
            })
        })
    },
    requestSign: function(e, t) {
        var i = void 0;
        return "upimage" === t && (i = {
            token: localToken,
            code: e.code
        }),
        "create" === t && (i = Object.assign({
            token: localToken
        },
        e)),
        new Promise(function(e, o) {
            $.ajax({
                url: posturl + postarr[t],
                type: "post",
                data: i,
                dataType: "json",
                success: function(t) { - 9 === t.code ? o( - 1) : e(t)
                },
                error: function(e) {
                    o( - 2)
                }
            })
        })
    },
    Judgefrom: function(e) {
        var t = /^[1-9]+[0-9]*]*$/;
        return 4 === e.length && !!t.test(e)
    }
};
var hideCallback = function() {
    window.resize(),
    $(".loading").fadeOut(),
    $(".container").css("backgroundColor", "#fff"),
    window.paceInterval && window.clearInterval(window.paceInterval),
    new Page
};
window.paceInterval = setInterval(function() {
    var e = $(".pace-progress").attr("data-progress");
    parseInt(e) >= 98 && (beginLoading ? (hideCallback(), $(".pace").hide(), $(".loading-box-con").hide()) : $(".loading-box-con").show())
},
200);