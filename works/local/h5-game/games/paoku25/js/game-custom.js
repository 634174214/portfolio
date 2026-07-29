document.addEventListener("touchmove", function(e) {
    e.preventDefault();
    e.returnValue = false;
    $.noop();
}, { passive: true });

(function($, undefined) {
    $.extend({
        JSONP: function(url, data, callback, charset) {
            var script = document.createElement("script"),
            head = document.getElementsByTagName("head")[0] || document.documentElement,
            jsc = $.now(),
            randnum = Math.round(Math.random() * 1000),
            jsonp = ("jsonp" + randnum + jsc++);
            if (!callback) {
                callback = data;
                data = {};
            }
            if ($.isFunction(callback)) {
                window[jsonp] = callback;
                callback = jsonp;
            }
            if (typeof data === "object") {
                data = $.param(data);
            }
            script.src = url + (url.indexOf("?") !== -1 ? "&": "?") + "callback=" + callback + "&" + data;
            if (charset) {
                script.charset = charset;
            }
            var done = false;
            if (!done) {
                script.onload = script.onreadystatechange = function() {
                    if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                        done = true;
                        script.onload = script.onreadystatechange = null;
                        head.removeChild(script);
                        window[jsonp] = undefined;
                        try {
                            delete window[jsonp];
                        } catch(jsonpError) {}
                    }
                };
            }
            head.insertBefore(script, head.firstChild);
            return callback;
        },
        error: function(msg) {
            if (!$.debug) {
                if (!location.href.split("?")[1] || location.href.split("?")[1].indexOf("jsDebug") === -1) {
                    return;
                } else {
                    $.debug = true;
                }
            }
            if (!$.debugPanel) {
                var jsc = $.now();
                $.debugPanel = $("<div></div>").appendTo(document.body).attr("id", "debug-panel-" + jsc).addClass("jquery-debug-panel").css({
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: 500,
                    height: 600,
                    opacity: 0.8,
                    fontFamily: "Trebuchet MS, Tahoma, Verdana, Arial, sans-serif",
                    fontSize: "10px",
                    color: "#fff",
                    background: "#000"
                });
                $.debugPanel.titlebar = $("<div></div>").appendTo($.debugPanel).addClass("jquery-debug-panel-titlebar").css({
                    position: "relative",
                    width: "100%",
                    height: 30,
                    cursor: "move",
                    background: "#ff0"
                });
                $.debugPanel.closeButton = $("<div></div>").appendTo($.debugPanel.titlebar).addClass("jquery-debug-panel-close-button").css({
                    position: "absolute",
                    width: 45,
                    height: 25,
                    right: 5,
                    top: 2,
                    cursor: "pointer"
                }).text("关闭").bind("click",
                function() {
                    $.debugPanel.hide();
                });
                $.debugPanel.content = $("<div></div>").appendTo($.debugPanel).addClass("jquery-debug-panel-content").css({
                    position: "relative",
                    overflowY: "auto"
                });
            }
            $("<span>" + msg + "</span></br>").appendTo($.debugPanel.content);
            $.debugPanel.show();
        },
        ns: function() {
            var a = arguments[0],
            o;
            if (!a) {
                return;
            }
            var b = a.split(".");
            var c = b[0];
            eval('if (typeof ' + c + ' == "undefined"){' + c + ' = {};} o = ' + c + ';');
            for (var i = 1; i < b.length; i++) {
                o[b[i]] = o[b[i]] || {};
                o = o[b[i]];
            }
        }
    });
})(jQuery);

$('#startgame').click(function() {
    $('#home').hide();
    $('#prompt').show();
    $('#container').show();
});
$('#prompt').click(function() {
    $('#prompt').hide();
    Main.start();
});
$('#replayBtn').click(function() {
    $('#gameresult').hide();
    Main.replay();
});
$('#shareBtn').click(function() {
   window.location.href = window.jumpto;
});


var switch_cur, show_mask, hide_mask;
$(function() {
    //为所有的翻页按钮增加样式
    $.each($(".page,.f-page"),
    function(i, n) {
        if ($(n).children("a").length <= 1) {
            $(n).hide();
            $(n).parents(".focus-dt").hide();
        } else {
            $(n).children("a:first").addClass("cur");
        }
    });

    switch_cur = function(obj, index) {
        obj.children("a").removeClass("cur");
        obj.children("a").eq(index).addClass("cur");
    };

    show_mask = function() {
        $(".mask").height($(".warp").height()).show();
    };

    hide_mask = function() {
        $(".mask").hide();
    };
});

// for ani
var baseTool = function() {
    function reg(space, obj) {
        var namespace = exports[space] || {};
        for (var key in obj) {
            namespace[key] = obj[key];
        }
        exports[space] = namespace;
    }

    var exports = {
        reg : reg
    };
    return exports;
}();
baseTool.reg("file", function() {
    function imgs(arrUrl, cb) {
        var count = 0, imgs = [], imgsL = arrUrl.length;
        for (var i = 0; i < imgsL; i++) {
            var img = new Image();
            img.onload = function() {
                this.onload = null;
                imgs.push(this);
                count += 1;
                img = null;
                if (count >= arrUrl.length) {
                    imgs.sort(function(a, b) {
                        return a.index - b.index;
                    });
                    cb && cb(imgs);
                }
            };
            img.index = i;
            img.src = arrUrl[i];
        }
    }

    var exports = {
        imgs : imgs
    };
    return exports;
}());
baseTool.reg("sprite", function() {
    var Frame = function(x, y, w, h, dw, dh) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dw = dw;
        this.dh = dh;
    };
    var Animation = function(param) {
        this.startX = param.startX || 0;
        this.startY = param.startY || 0;
        this.fs = param.fs || 1;
        this.sw = param.sw || 0;
        this.sh = param.sh || 0;
        this.width = param.width || param.sw;
        this.height = param.height || param.sh;
        this.dir = param.dir || "right";
        this.loop = !!param.loop;
        this.ls = [];
        this.current = null;
        this.index = -1;
        this.init();
    };
    Animation.prototype = {
        init : function() {
            for (var i = 0; i < this.fs; i++) {
                var x = this.startX + (this.dir == "right" ? i * this.sw : 0);
                var y = this.startY + (this.dir == "down" ? i * this.sh : 0);
                var frame = new Frame(x, y, this.sw, this.sh, this.width, this.height);
                this.ls.push(frame);
            }
            this.index = 0;
            this.current = this.ls[0];
        },
        next : function() {
            if (this.index + 1 >= this.ls.length) {
                if (this.loop) {
                    this.current = this.ls[0];
                    this.index = 0;
                }
            } else {
                this.index += 1;
                this.current = this.ls[this.index];
            }
        },
        reset : function() {
            this.current = this.ls[0];
            this.index = 0;
        },
        size : function() {
            return {
                w : this.width,
                h : this.height
            };
        }
    };
    var Sprite = function(img, cxt, fps, param, sightdir) {
        this.animations = {};
        this.img = img;
        this.cxt = cxt;
        this.x = param.x || 0;
        this.y = param.y || 0;
        this.fps = fps;
        this.xspeed = param.xspeed || 0;
        this.yspeed = param.yspeed || 0;
        this.lazy = 1000 / this.fps;
        this.last = 0;
        this.moveLazy = 30;
        this.moveLast = 0;
        this.index = null;
        this.key = "";
    };
    Sprite.prototype = {
        add : function(key, animation) {
            this.animations[key] = animation;
            if (!this.index) {
                this.index = animation;
                this.key = key;
            }
        },
        change : function(key) {
            if (key == this.key)
                return false;
            var index = this.animations[key];
            if (!index)
                return false;
            this.index = index;
            this.okey = this.key;
            this.key = key;
            this.index.reset();
        },
        draw : function() {
            if (!this.index || !this.img)
                return false;
            var frame = this.index.current;
            this.cxt.drawImage(this.img, frame.x, frame.y, frame.w, frame.h, this.x, this.y, frame.dw, frame.dh);
        },
        update : function() {
            var t = new Date().getTime();
            var diff = t - this.last;
            var moveDiff = t - this.moveLast;
            if (this.last == 0) {
                diff = this.lazy;
                moveDiff = this.moveLazy;
            }
            if (diff >= this.lazy) {
                this.index.next();
                this.last = t;
            }
            if (moveDiff >= this.moveLazy) {
                if (this.xspeed)
                    this.x += this.xspeed;
                if (this.yspeed)
                    this.y += this.yspeed;
                this.moveLast = t;
            }
        },
        move : function(x, y) {
            this.x = x;
            this.y = y;
        }
    };
    var exports = {
        Frame : Frame,
        Animation : Animation,
        Sprite : Sprite
    };
    return exports;
}());
baseTool.reg("time", function() {
    var requestAnimationFrame = function(cb) {
        setTimeout(cb, 100);
    };
    var TimeProcess = function() {
        this.list = [];
        this.isStart = false;
    };
    TimeProcess.prototype = {
        add : function(cb, param, context) {
            this.list.push({
                cb : cb,
                param : param,
                context : context
            });
        },
        start : function() {
            this.isStart = true;
            var self = this;
            requestAnimationFrame(function() {
                var item = null, p = [];
                for (var i = 0; i < self.list.length; i++) {
                    item = self.list[i];
                    item.cb.apply(item.context, item.param);
                }
                if (self.isStart)
                    requestAnimationFrame(arguments.callee);
            });
        },
        stop : function() {
            this.isStart = false;
        }
    };
    var exports = {
        TimeProcess : TimeProcess
    };
    return exports;
}());

// 对人物雪碧图的操作
var Cattle = function(x, y, img, cxt, panelInfo) {
    this.x = x;
    this.y = y;
    this.pos = 0;
    this.img = img;
    this.cxt = cxt;
    this.pinfo = panelInfo;
    this.state = "normal";
    this.lastKey = "";
    this.sprite = null;
    this.init();
};
Cattle.prototype = {
    init : function() {
        var sprite = new baseTool.sprite.Sprite(this.img, this.cxt, 7, {
            x : this.x,
            y : this.y
        });
        // 正常状态
        sprite.add("normal", new baseTool.sprite.Animation({
            startX : 0,
            sw : CATTLE_WIDTH * 2,
            sh : CATTLE_HEIGHT * 2,
            // 动画人物的宽度（雪碧图宽）
            width : CATTLE_WIDTH,
            // 动画人物（单个的高度）
            height : CATTLE_HEIGHT,
            dir : "down",
            fs : 5,
            loop : true
        }));
        // 加速状态
        sprite.add("add", new baseTool.sprite.Animation({
            startY : 3160,
            sw : CATTLE_WIDTH * 2,
            sh : CATTLE_HEIGHT * 2,
            width : CATTLE_WIDTH,
            height : CATTLE_HEIGHT,
            dir : "down",
            fs : 4,
            loop : true
        }));
        // 减速状态
        sprite.add("cut", new baseTool.sprite.Animation({
            startY : 1580,
            sw : CATTLE_WIDTH * 2,
            sh : CATTLE_HEIGHT * 2,
            width : CATTLE_WIDTH,
            height : CATTLE_HEIGHT,
            dir : "down",
            fs : 5,
            loop : true
        }));
        this.sprite = sprite;
    },
    update : function() {
        this.sprite.update();
        // 当处于3个赛道时的人物坐标
        // 原先是 40 100 160 所以每个赛道宽60
        switch(this.pos) {
            case -1:
                this.x = cattle_x - 60;
                break;
            case 0:
                this.x = cattle_x;
                break;
            case 1:
                this.x = cattle_x + 60;
                break;
            default:
                return;
        }
        this.sprite.move(this.x, this.y);
    },
    draw : function() {
        this.sprite.draw();
    },
    changeDir : function(dir) {
        if (!!dir) {
            this.pos += dir;
            this.pos = this.pos > 1 ? 1 : this.pos < -1 ? -1 : this.pos;
        } else {
            this.pos = 0;
        }
    },
    change : function(state) {
        this.sprite.change(state);
    },
    size : function() {
        return this.sprite.size();
    },
    move : function(x, y) {
        this.sprite.move(x, y);
    }
};

// 左右移动按钮播放音效
function mySoundeffectplay() {
    if (typeof SoundEffectPlay == 'undefined') {
        return;
    }
    SoundEffectPlay.play();
}