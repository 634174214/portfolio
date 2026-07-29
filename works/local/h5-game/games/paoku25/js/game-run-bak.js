/*=====================
 * 功能: 跑酷游戏
 * 作者: zjsina-pp
 * 版本: 0.1.0
 * 创建时间: 2014-8-18
 * 更新时间: 2014-9-15
 * more: http://ppstudio.sinaapp.com/
 ======================*/
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
                    $('#loading').hide();
                }
                $('#showLd').html('等待加载也是一种人生,  ' + parseInt(count / imgsL * 100) + '%...');
            }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
    var exports = {
        TimeProcess : TimeProcess
    };
    return exports;
}());
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
}
Cattle.prototype = {
    init : function() {
        var sprite = new baseTool.sprite.Sprite(this.img, this.cxt, 7, {
            x : this.x,
            y : this.y
        });
        sprite.add("normal", new baseTool.sprite.Animation({
            startX : 0,
            sw : 260,
            sh : 316,
            width : 130,
            height : 158,
            dir : "down",
            fs : 5,
            loop : true
        }));
        sprite.add("add", new baseTool.sprite.Animation({
            startY : 3160,
            sw : 260,
            sh : 316,
            width : 130,
            height : 158,
            dir : "down",
            fs : 4,
            loop : true
        }));
        sprite.add("cut", new baseTool.sprite.Animation({
            startY : 1580,
            sw : 260,
            sh : 316,
            width : 130,
            height : 158,
            dir : "down",
            fs : 5,
            loop : true
        }));
        this.sprite = sprite;
    },
    update : function() {
        this.sprite.update();
        switch(this.pos) {
            case-1:
                this.x = 40;
                break;
            case 0:
                this.x = 100;
                break;
            case 1:
                this.x = 160;
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
}
var Main = {
    gameArea : game,
    listener : window,
    leftBtn : left_btn,
    rightBtn : right_btn,
    leveltip : level,
    timetip : gametimer,
    gameInfo : {
        w : 0,
        h : 0
    },
    cxt : null,
    cattle : null,
    timeQuene : null,
    sightTimer : 0,
    propTimer : 0,
    stopTimer : 2,
    spupTimer : 30,
    speed_n : 10,
    speed_u : 15,
    speed_c : 0,
    speed : 0,
    level : 0,
    lvcount : 0,
    lvupnum : 2,
    animationSpeed : 50,
    gprocess : 0,
    goverprocess : 2500,
    gametime : 15,
    success : false,
    imgs : [],
    sights : [],
    snum : 0,
    gtime : '0.00',
    pause : 0,
    _end : false,
    _timer1 : 0,
    _timer2 : 0,
    _timer3 : 0,
    _timer4 : 0,
    _timer5 : 0,
    _timer6 : 0,
    _barstep : 1,
    _propnum : 0,
    _lastGmove : 0,
    init : function() {
        var host = 'http://qingdao.sinaimg.cn/v2014/bxsnbnt/';
        imgs = [host + "cattle1.png", host + "sight.png", host + "bar1.png", host + "bar2.png", host + "welcome.jpg", host + "road.jpg", host + "lou.png", host + "start.png", host + "share.png"];
        Main.count(1, navigator.userAgent.indexOf('MicroMessenger') != -1 ? '来源微信' : false || navigator.userAgent.indexOf('Weibo') != -1 ? '来源微博' : false || '来源其他');
        baseTool.file.imgs(imgs, function(imgs) {
            Main.imgs = imgs;
            var rsSupport = "onorientationchange" in window;
            if (rsSupport) {
                Main.addEvent(Main.leftBtn, "orientationchange", rotateScreen);
                function rotateScreen() {
                    if (window.orientation == 180 || window.orientation == 0) {
                        Main.gamePause(0);
                        $('#screentip').hide();
                    }
                    if (window.orientation == 90 || window.orientation == -90) {
                        Main.gamePause(1);
                        $('#screentip').show();
                    }
                }

                rotateScreen();
            }
        });
    },
    start : function() {
        var canvas = Main.gameArea;
        Main.gameInfo.w = canvas.offsetWidth;
        Main.gameInfo.h = canvas.offsetHeight;
        Main.cxt = canvas.getContext("2d");
        Main.cattle = new Cattle(100, 240, Main.imgs[0], Main.cxt, Main.gameInfo);
        Main.cattle.draw();
        Main.SightFactory('start');
        $('.ready , .go').show();
        setTimeout(function() {
            $('.ready , .go').hide();
            Main.animation('#road-move', 'backgroundPosition', 0, 'road');
            Main.animation('#bars', 'change', 0, 'bar');
            Main.animation('#cloud', 'left', -202, 'cloud', 522);
            $('.process').show();
            Main.speed = Main.speed_n + Main.level * 3;
            Main._timer1 = Main.stopTimer;
            Main._timer2 = Main.spupTimer;
            Main.initEvent();
            Main.initSight();
            Main.process();
            Main.PropFactory();
            Main._gTimer1 = setInterval(function() {
                Main._timer5++;
                Main.gtime = Main._timer5 + '.' + Main._timer4 + '' + parseInt(Main._timer3 * 1.6);
                Main.timetip.innerHTML = Main._timer5 == Main.gametime ? '15.00' : Main.gtime;
            }, 1000);
            Main._gTimer2 = setInterval(function() {
                if (++Main._timer3 > 5) {
                    if (++Main._timer4 > 9) {
                        Main._timer4 = 0;
                    }
                    Main._timer3 = 0;
                }
                Main.gtime = Main._timer5 + '.' + Main._timer4 + '' + parseInt(Main._timer3 * 1.6);
                Main.timetip.innerHTML = Main._timer5 == Main.gametime ? '15.00' : Main.gtime;
            }, 1000 / 60);
        }, 1000);
        Main.count(2, '开始游戏');
    },
    gamePause : function(pause) {
        Main.pause = pause;
    },
    initSight : function() {
        Main.sights = ['sight1', 'sight2', 'sight3', 'sight4', 'sight5'];
        Main.snum = 5;
    },
    SightFactory : function(s) {
        if (!!s) {
            if (s == 'start') {
                $('#sight-move').append('<div class="sight-right" style="top: 70px; display: block;"><div class="sight-start" style="background-size: 100px;"></div></div>');
                Main.animation($('.sight-start')[0], 'top', 70, 'sight', 400, function(obj) {
                    $(obj).remove();
                }, 'left');
            }
        } else {
            var rnd = Math.floor(Math.random() * Main.snum), sinner = '', sightBlock = document.createElement("div");
            if (Main._propnum == rnd)
                rnd++;
            sinner += '<div class="' + Main.sights[rnd] + '" ></div>';
            $(sightBlock).attr('class', rnd % 2 == 0 ? 'sight-right' : 'sight-left').html(sinner);
            $('#sight-move').append(sightBlock);
            Main.animation(sightBlock, 'top', 0, 'sight', 400, function(obj) {
                $(obj).remove();
            })
            Main._propnum = rnd;
        }
    },
    PropFactory : function() {
        var rnd1 = Math.floor(Math.random() * 2), rnd2 = Math.floor(Math.random() * 3), mode = ['add', 'cut'], pos = ['left', 'mid', 'right'], posp = [-1, 0, 1], propBlock = document.createElement("div");
        $(propBlock).attr('act', mode[rnd1]).attr('pos', posp[rnd2]).attr('class', 'prop-' + mode[rnd1] + Math.floor(Math.random() * 2) + ' prop-' + pos[rnd2]);
        $('#props').append(propBlock);
        Main.animation(propBlock, 'top', 0, 'prop', 600);
    },
    addEvent : function(el, type, fn) {
        if (el.addEventListener) {
            el.addEventListener(type, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        } else {
            el['on' + type] = fn;
        }
    },
    stope : function(e) {
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
        $.noop();
    },
    transform : function(obj, action) {
        obj.style.transform = obj.style.webkitTransform = obj.style.mozTransform = obj.style.oTransform = obj.style.msTransform = action;
    },
    initEvent : function() {
        var rockSupport = !!window.DeviceOrientationEvent;
        Main.addEvent(Main.listener, 'keydown', Main.keyDown);
        if (rockSupport) {
            Main.addEvent(Main.listener, "deviceorientation", Main.rock);
        } else {
            $(Main.leftBtn).show();
            $(Main.rightBtn).show();
            Main.addEvent(Main.leftBtn, 'click', Main.turnLeft);
            Main.addEvent(Main.rightBtn, 'click', Main.turnRight);
            Main.addEvent(Main.leftBtn, 'touchstart', Main.turnLeft);
            Main.addEvent(Main.rightBtn, 'touchstart', Main.turnRight);
        }
    },
    turnLeft : function(e) {
        Main.stope(e);
        Main.cattle.changeDir(-1);
    },
    turnRight : function(e) {
        Main.stope(e);
        Main.cattle.changeDir(1);
    },
    keyDown : function(e) {
        if (e.keyCode == 37) {
            Main.cattle.changeDir(-1);
        }
        if (e.keyCode == 39) {
            Main.cattle.changeDir(1);
        }
    },
    rock : function(e) {
        Main.stope(e);
        var gmove = e.gamma;
        if (gmove > 15) {
            Main.cattle.changeDir(1);
        } else if (gmove < -15) {
            Main.cattle.changeDir(-1);
        } else {
            Main.cattle.changeDir(0);
        }
        Main._lastGmove = gmove;
    },
    process : function() {
        var tq = new baseTool.time.TimeProcess();
        tq.add(Main.draw, null, Main);
        tq.add(Main.update, null, Main);
        this.timeQuene = tq;
        this.timeQuene.start();
    },
    update : function() {
        if (Main.pause == 0) {
            if (Main.speed != Main.speed_c) {
                Main.propTimer += (Main.speed + Main.level * 3);
                Main.sightTimer += (Main.speed + Main.level * 3);
                if (Main.sightTimer >= 300) {
                    Main.SightFactory();
                    Main.sightTimer = 0;
                }
                if (Main.propTimer >= 80) {
                    Main.PropFactory();
                    Main.propTimer = 0;
                }
                Main.cattle.update();
                if (Main.speed == Main.speed_u + Main.level * 3) {
                    $('#speedup').show();
                    Main.cattle.change("add");
                    $('#proptip').attr('class', 'ptadd');
                    Main._timer2--;
                    if (Main._timer2 < 0) {
                        Main.speed = Main.speed_n + Main.level * 3;
                        Main._timer2 = Main.spupTimer;
                    }
                } else {
                    Main.cattle.change("normal");
                    $('#speedup , #levelup').hide();
                    $('#proptip').attr('class', '');
                }
            } else {
                Main.cattle.change("cut");
                $('#speedup , #levelup').hide();
                $('#proptip').attr('class', 'ptcut');
                Main._timer1--;
                if (Main._timer1 < 0) {
                    Main.speed = Main.speed_n;
                    Main._timer1 = Main.stopTimer;
                }
            }
            Main.gprocess += (Main.speed + Main.level * 3);
            if (Main.gprocess >= Main.goverprocess && Main._timer5 < Main.gametime) {
                Main.success = true;
                Main.over();
            }
            if (Main._timer5 >= Main.gametime) {
                Main.over();
            }
        }
    },
    draw : function() {
        if (!Main._end) {
            Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
            Main.cattle.draw();
            Main.cxt.lineWidth = 16;
            Main.cxt.strokeStyle = '#ffea00';
            Main.cxt.beginPath();
            Main.cxt.moveTo(58, 357);
            Main.cxt.lineTo(265, 357);
            Main.cxt.stroke();
            Main.cxt.strokeStyle = '#7eb619';
            Main.cxt.beginPath();
            Main.cxt.moveTo(58, 357);
            Main.cxt.lineTo(207 / Main.goverprocess * Main.gprocess + 58, 357);
            Main.cxt.stroke();
        }
    },
    animation : function(obj, attr, start, mode, end, cb, temp) {
        var pos = start || 0, cmove = start || 0, posoffset, possacle, timer = setInterval(function() {
            if (Main.pause == 0)
                pos += (Main.speed + Main.level * 3);
            posoffset = pos / 2;
            possacle = pos / 500;
            switch(mode) {
                case'road':
                    if (Main.pause == 0) {
                        $(obj).css({
                            backgroundPosition : '0px ' + pos + 'px'
                        });
                        if (Main._end) {
                            clearInterval(timer);
                        }
                    }
                    break;
                case'bar':
                    if (Main.pause == 0) {
                        Main._timer6 += (Main.speed + Main.level * 3);
                        if (Main._timer6 > 50) {
                            Main._barstep = Main._barstep == 1 ? 2 : 1;
                            $(obj).attr('class', 'bstep' + Main._barstep);
                            Main._timer6 = 0;
                        }
                        if (Main._end) {
                            clearInterval(timer);
                        }
                    }
                    break;
                case'sight':
                    $(obj).css(attr, pos / 2);
                    if (!!temp) {
                        $(obj).css(temp, posoffset);
                    } else {
                        $(obj).css($(obj).attr('class') == 'sight-right' ? 'left' : 'right', posoffset + 150);
                        Main.transform(obj, 'scale(' + (0.4 + possacle) + ')');
                        $(obj).show();
                    }
                    if (!!end && pos > end || Main._end) {
                        cb(obj);
                        clearInterval(timer);
                    }
                    break;
                case'cloud':
                    if (Main.pause == 0)
                        cmove += (Main.speed + Main.level * 3) / 5;
                    $(obj).css(attr, cmove);
                    if (!!end && cmove > end || Main._end) {
                        cmove = start
                    }
                    break;
                case'prop':
                    $(obj).css(attr, pos);
                    if (pos > 390 && pos < 440 && $(obj).attr('pos') == Main.cattle.pos) {
                        if ($(obj).attr('act') == 'add') {
                            Main.lvcount++;
                            $('#levelup').hide();
                            if (Main.lvcount % Main.lvupnum == 0) {
                                Main.level++;
                                $('#levelup').show();
                            }
                            Main.speed = Main.speed_u + Main.level * 3;
                            Main._timer2 = Main.spupTimer;
                        } else {
                            Main.level = 0;
                            Main.lvcount = 0;
                            Main.speed = Main.speed_c;
                        }
                        $(obj).attr('pos', 'none');
                        $(obj).remove();
                        Main.leveltip.innerHTML = 'LV.' + Main.level;
                    }
                    if (!!end && pos > end || Main._end) {
                        $(obj).remove();
                        clearInterval(timer);
                    }
                    break;
                default:
                    clearInterval(timer);
                    return;
            }
        }, Main.animationSpeed)
    },
    count : function(id, tip) {
        $.JSONP('http://act.city.sina.com.cn/interface/activity/json_add_signup.php', {
            act_id : '6969',
            custom_1 : id,
            custom_2 : tip,
            t : 'jsonp'
        }, function(json) {
        })
    },
    over : function() {
        this.timeQuene.stop();
        Main._end = true;
        Main.count(3, '游戏结果展示');
        clearInterval(Main._gTimer1);
        clearInterval(Main._gTimer2);
        var isweixin = navigator.userAgent.indexOf('MicroMessenger') != -1, shareword = '', logoclass = Main.success ? 'game-success' : 'game-fail', df = (100 - (Number(Main.gtime) - 12.52) * 10).toFixed(1);
                Main.shareData = {
            imgUrl : "http://qingdao.sinaimg.cn/2014/1120/U11082P1534DT20141120135042.jpg",
            timeLineLink : "http://act.qd.sina.com.cn/8318/mobile",
            tTitle : shareword,
            tContent : "奔向苏宁不能停  iPhone6+等你秒",
            win_wb_content : "奔向苏宁不能停  iPhone6+等你秒",
            defaut_content : "相信你还可以更拼"
        }
        Main.speed = 0;
        Main.level = 0;
        Main.lvcount = 0;
        Main.sightTimer = 0;
        Main.propTimer = 0;
        $('#sight-move , #props').empty();
        if (!Main.success) {
            $('#endtip').hide();
            $('.process').hide();
            $('#gameresult').show();
            $('#proptip').attr('class', '');
            $('#sharelogo').attr('class', logoclass);
            Main.timetip.innerHTML = '0.00';
            Main.leveltip.innerHTML = 'LV.0';
            $('#result-word').html('<p>你跑的也太逊了!</p><p>你才完成了' + (Main.gprocess / Main.goverprocess * 100).toFixed(1) + '%，</p><p>奔向苏宁不能停  iPhone6+等你秒</p>');
            Main.shareData.tTitle = isweixin ? '没能到达,我是【蜗牛君】,你能成功么!' : '奔向苏宁不能停  iPhone6+等你秒';
            Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
        } else {
            $('#endtip').show();
            $('#wintip').show();
            $('.process').hide();
            $('#sight-static').hide();
            $('#sight-final').show();
            Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
            Main.cxt.drawImage(Main.imgs[0], 0, 0, 260, 316, 100, 200, 100, 128);
            setTimeout(function() {
                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
                Main.cxt.drawImage(Main.imgs[0], 0, 0, 260, 316, 110, 150, 80, 100);
            }, 400);
            setTimeout(function() {
                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
                Main.cxt.drawImage(Main.imgs[0], 0, 0, 260, 316, 160, 100, 40, 68);
                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
            }, 700);
            setTimeout(function() {
                $('#endtip').hide();
                $('#gameresult').show();
                $('#proptip').attr('class', '');
                $('#sharelogo').attr('class', logoclass);
                Main.timetip.innerHTML = '0.00';
                Main.leveltip.innerHTML = 'LV.0';
                df = df > 100 ? '99.' + Math.floor(Math.random() * 3) : df;
                if (Main._timer5 <= 12) {
                    $('#result-word').html('<p>你是【离弦的箭哇！】,领先' + df + '%的人,你用时' + Main.gtime + 's,</p><p>奔向苏宁不能停  iPhone6+等你秒</p>');
                } else if (Main._timer5 > 12 && Main._timer5 <= 15) {
                    $('#result-word').html('<p>你是【真是个飞毛腿！】,领先' + df + '%的人,你用时 ' + Main.gtime + 's,</p><p>奔向苏宁不能停  iPhone6+等你秒</p>');
                } else if (Main._timer5 > 15 && Main._timer5 <= 18) {
                    $('#result-word').html('<p>你是【兔子么？】,领先' + df + '%的人,你用时 ' + Main.gtime + 's,</p><p>奔向苏宁不能停  iPhone6+等你秒</p>');
                } else {
                    $('#result-word').html('<p>你是蜗牛么？领先' + df + '%的人,你用时' + Main.gtime + 's,够lucky !</p><p>奔向苏宁不能停  iPhone6+等你秒</p>');
                }
                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
                Main.success = false;
            }, 1000);
            $.JSONP('http://act.city.sina.com.cn/interface/activity/json_add_signup.php', {
                act_id : '7014',
                custom_1 : Main.gtime,
                t : 'jsonp'
            }, function(json) {
            })
        }
    },
    replay : function() {
        Main._end = false;
        Main._timer1 = 0;
        Main._timer2 = 0;
        Main._timer3 = 0;
        Main._timer4 = 0;
        Main._timer5 = 0;
        Main._timer6 = 0;
        Main.gprocess = 0;
        Main._barstep = Main._barstep == 1 ? 2 : 1;
        $('#sharelogo').attr('class', '');
        $('#road-move').css('backgroundPosition', 0);
        $('#bars').attr('class', 'bstep' + Main._barstep);
        $('#wintip').hide();
        $('.process').show();
        $('#sight-final').hide();
        $('#sight-static').show();
        Main.start();
    }
};
Main.init(); 
