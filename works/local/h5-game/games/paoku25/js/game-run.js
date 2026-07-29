/*=====================
 * 功能: 跑酷游戏
 * 作者: zjsina-pp
 * 版本: 0.1.0
 * 创建时间: 2014-8-18
 * 更新时间: 2014-9-15
 * more: http://ppstudio.sinaapp.com/
 ======================*/




var Main = {
    gameArea : game,
    listener : window,
    leftBtn : left_btn,
    rightBtn : right_btn,
    leveltip : level,
    timetip : gametimer,
    // 游戏界面的尺寸
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
    // 游戏进度
    gprocess : 0,
    // 结束的长度
    goverprocess : 2500,
    // 游戏执行时间 秒
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
        var host = 'img/';
        imgs = [
            host + "cattle1.png", 
            host + "sight.png", 
            host + "bar1.png", 
            host + "bar2.png", 
            host + "welcome.jpg", 
            host + "road.jpg", 
            host + "lou.png", 
            host + "start.png", 
            host + "share.png"
        ];
        Main.count(1, navigator.userAgent.indexOf('MicroMessenger') != -1 ? '来源微信' : false || navigator.userAgent.indexOf('Weibo') != -1 ? '来源微博' : false || '来源其他');
        // 原加载部分 返回的imgs是图片元素
        baseTool.file.imgs(imgs, function(imgs) {
            Main.imgs = imgs;
            // 是否支持屏幕旋转
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
                // 隐藏加载层
                PreLoading.hide(function() {
                    $('#startgame').show().addClass('bounceIn');
                });
            }
        });
    },
    start : function() {
        var canvas = Main.gameArea;
        Main.gameInfo.w = canvas.offsetWidth;
        Main.gameInfo.h = canvas.offsetHeight;
        Main.cxt = canvas.getContext("2d");
        Main.cattle = new Cattle(cattle_x, cattle_y, Main.imgs[0], Main.cxt, Main.gameInfo);
        Main.cattle.draw();
        // debugger
        Main.SightFactory('start');
        $('.ready , .go').show();
        setTimeout(function() {
            // debugger
            $('.ready , .go').hide();
            Main.animation('#road-move', 'backgroundPosition', 0, 'road');
            // 适用原来的背景写在样式里切换会有闪屏的问题，改为在#bar中直接插入2个img 初始让其都显示见larout.css中#bar
            Main.animation('#bars', 'change', 0, 'bar');
            // Main.animation('#cloud', 'left', -202, 'cloud', 522);
            Main.animation('#cloud', 'left', -100, 'cloud', screenW + 100);
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
        var start_top = cattle_y - CATTLE_HEIGHT + 50;
        if (!!s) {
            if (s == 'start') {
                $('#sight-move').append(`<div class="sight-right" style="top: 33%; display: block;"><div class="sight-start" style="background-size: 100px;"></div></div>`);
                Main.animation($('.sight-start')[0], 'top', 0, 'sight', 400, function(obj) {
                    $(obj).remove();
                }, 'left');
            }
        } else {
            var rnd = Math.floor(Math.random() * Main.snum), sinner = '', sightBlock = document.createElement("div");
            if (Main._propnum == rnd){
                rnd++;
            }
            sinner += '<div class="' + Main.sights[rnd] + '" ></div>';
            $(sightBlock).attr('class', rnd % 2 == 0 ? 'sight-right' : 'sight-left').html(sinner);
            $('#sight-move').append(sightBlock);
            Main.animation(sightBlock, 'top', 0, 'sight', 400, function(obj) {
                $(obj).remove();
            });
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
        // 设备是否支持重力感应
        var rockSupport = !!window.DeviceOrientationEvent;
        Main.addEvent(Main.listener, 'keydown', Main.keyDown);
        /*
        无论是否支持重力感应 都改为虚拟按键判断
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
        */
        $(Main.leftBtn).show();
        $(Main.rightBtn).show();
        Main.addEvent(Main.leftBtn, 'click', Main.turnLeft);
        Main.addEvent(Main.rightBtn, 'click', Main.turnRight);
        Main.addEvent(Main.leftBtn, 'touchstart', Main.turnLeft);
        Main.addEvent(Main.rightBtn, 'touchstart', Main.turnRight);
    },
    turnLeft : function(e) {
        mySoundeffectplay();
        Main.stope(e);
        Main.cattle.changeDir(-1);
    },
    turnRight : function(e) {
       mySoundeffectplay();
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
        // debugger
        if (!Main._end) {
            // 画进度条
            Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
            Main.cattle.draw();
            // 线宽度
            Main.cxt.lineWidth = PROGRESS_BAR_HEIGHT;
            Main.cxt.strokeStyle = PROGRESS_BAR_BGCOLOR;
            Main.cxt.beginPath();
            Main.cxt.moveTo(progress_x, progress_y);
            Main.cxt.lineTo(progress_x + PROGRESS_BAR_WIDTH, progress_y);
            Main.cxt.stroke();
            Main.cxt.strokeStyle = PROGRESS_BAR_GROWCOLOR;
            Main.cxt.beginPath();
            Main.cxt.moveTo(progress_x, progress_y);
            // console.log(207 / Main.goverprocess * Main.gprocess + progress_x)
            Main.cxt.lineTo(207 / Main.goverprocess * Main.gprocess + progress_x, progress_y);
            Main.cxt.stroke();
        }
    },
    // cb callback
    animation : function(obj, attr, start, mode, end, cb, temp) {
        var pos = start || 0, cmove = start || 0, posoffset, possacle, timer = setInterval(function() {
            if (Main.pause == 0) {
                pos += (Main.speed + Main.level * 3);
            }

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
                    // 0.44是一个系数，最终值在220左右
                    var offset = Math.floor(screenW - screenW * 0.44);
                    if (!!temp) {
                        $(obj).css(temp, posoffset);
                    } else {
                        $(obj).css($(obj).attr('class') == 'sight-right' ? 'left' : 'right', posoffset + offset);
                        Main.transform(obj, 'scale(' + (0.4 + possacle) + ')');
                        $(obj).show();
                    }
                    var newPos = getTrueAttrY(pos);
                    var newend = getTrueAttrY(end);
                    if (!!end && newPos > newend || Main._end) {
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
                    // 根据屏幕高度比例 计算得到新的偏移top 
                    var newPos = getTrueAttrY(pos);
                    $(obj).css(attr, newPos);
                    // 根据屏幕高度计算得到的人物头坐标<pos < 人物脚坐标
                    if (newPos > cattle_y && newPos < (cattle_y + CATTLE_HEIGHT) && $(obj).attr('pos') == Main.cattle.pos) {
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
                    // 根据屏幕高度比例 计算得到新的超过top 在153行
                    var newend = getTrueAttrY(end);
                    if (!!end && newPos > newend || Main._end) {
                        $(obj).remove();
                        clearInterval(timer);
                    }
                    break;
                default:
                    clearInterval(timer);
                    return;
            }
        }, Main.animationSpeed);
    },
    count : function(id, tip) {
        // $.JSONP('http://act.city.sina.com.cn/interface/activity/json_add_signup.php', {
        //     act_id : '6969',
        //     custom_1 : id,
        //     custom_2 : tip,
        //     t : 'jsonp'
        // }, function(json) {
        // });
    },
    over : function() {
        this.timeQuene.stop();
        Main._end = true;
        Main.count(3, '游戏结果展示');
        clearInterval(Main._gTimer1);
        clearInterval(Main._gTimer2);
        var isweixin = navigator.userAgent.indexOf('MicroMessenger') != -1, 
            shareword = '', 
            logoclass = Main.success ? 'game-success' : 'game-fail', 
            // 得到的分数 超过100就算作游戏成功
            df = (100 - (Number(Main.gtime) - 12.52) * 10).toFixed(1);
        Main.shareData = {
            imgUrl : "img/U11082P1534DT20141120135042.jpg",
            timeLineLink : "",
            tTitle : shareword,
            tContent : "",
            win_wb_content : document.title,
            defaut_content : document.title
        };
        Main.speed = 0;
        Main.level = 0;
        Main.lvcount = 0;
        Main.sightTimer = 0;
        Main.propTimer = 0;
        $('#sight-move , #props').empty();
        // 如果没有完成跑酷游戏
        if (!Main.success) {
            $('#endtip').hide();
            $('.process').hide();
            $('#gameresult').fadeIn();
            $('#proptip').attr('class', '');
            $('#sharelogo').attr('class', logoclass);
            Main.timetip.innerHTML = '0.00';
            Main.leveltip.innerHTML = 'LV.0';
            // 没有完成游戏的超越人数百分比
            var no_precent = (Main.gprocess / Main.goverprocess * 100).toFixed(1);
            var no_p_title = '<p>' + runResultText.worse(df).title + '</p>';
            var no_p_desc = '<p>' + runResultText.worse(df).desc + '</p>';
            var no_p_defen = '<p>您超越了' + no_precent + '%的玩家，请再接再厉哦！</p>';
            $('#result-word').html(no_p_title + no_p_defen + no_p_desc);
            Main.shareData.tTitle = document.title;
            Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);

            setLevelAndScroe(df);

        } else {
            $('#endtip').show();
            $('#wintip').show();
            $('.process').hide();
            $('#sight-static').hide();
            $('#sight-final').show();
            Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
            // 宽高每次缩小的尺寸
            var scaleW = 30;
            var finalMan = {
                // 规定要使用的图像
                img: Main.imgs[0],
                // 开始剪裁的位置x坐标
                sx: 0,
                // 开始剪裁的位置y坐标
                sy: 0,
                // 被剪切图像的宽度
                switch: CATTLE_WIDTH * 2,
                // 被剪切图像的高度
                sheight: CATTLE_HEIGHT * 2,
                // 要使用的图像的宽度
                width: CATTLE_WIDTH - scaleW,
                // 要使用的图像的高度
                height: CATTLE_HEIGHT - scaleW
            };
            var finalLineY = screenH * 0.3;
            var finalLineX = getCattleFinalXY(finalMan.width);
            Main.cxt.drawImage(finalMan.img, finalMan.sx, finalMan.sy, finalMan.switch, finalMan.sheight, finalLineX, finalLineY, finalMan.width, finalMan.height);
            setTimeout(function() {
                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);

                finalMan.width = finalMan.width - scaleW;
                finalMan.height = finalMan.height - scaleW;
                finalLineX = getCattleFinalXY(finalMan.width);

                Main.cxt.drawImage(finalMan.img, finalMan.sx, finalMan.sy, finalMan.switch, finalMan.sheight, finalLineX, finalLineY, finalMan.width, finalMan.height);
            }, 400);
            setTimeout(function() {
                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);

                finalMan.width = finalMan.width - scaleW;
                finalMan.height = finalMan.height - scaleW;
                finalLineX = getCattleFinalXY(finalMan.width);

                Main.cxt.drawImage(finalMan.img, finalMan.sx, finalMan.sy, finalMan.switch, finalMan.sheight, finalLineX, finalLineY, finalMan.width, finalMan.height);
                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
            }, 700);
            setTimeout(function() {
                $('#endtip').hide();
                $('#gameresult').fadeIn();
                $('#proptip').attr('class', '');
                $('#sharelogo').attr('class', logoclass);
                Main.timetip.innerHTML = '0.00';
                Main.leveltip.innerHTML = 'LV.0';
                // 由于下方将df转化为字符串 这里先保留一份
                var dfCopy = df;
                // 得分
                df = df > 100 ? '99.' + Math.floor(Math.random() * 3) : df;
                var p_title = '';
                var p_defen = '<p>领先' + df + '%的人，您用时' + Main.gtime + '秒</p>';
                var result_word_html = '';
                // 完成跑酷 在12秒以内
                if (Main._timer5 <= 12) {
                    p_title = '<p>' + runResultText.best.title + '<p>';
                    p_desc = '<p>' + runResultText.best.desc + '<p>';
                    
                } else if (Main._timer5 > 12 && Main._timer5 <= 15) {
                    p_title = '<p>' + runResultText.better.title + '<p>';
                    p_desc = '<p>' + runResultText.better.desc + '<p>';
                } else if (Main._timer5 > 15 && Main._timer5 <= 18) {
                    // 大于15秒但是小于18秒之间完成 最高15秒这里暂不处理
                    // $('#result-word').html('<p>你是【兔子么？】,领先' + df + '%的人,你用时 ' + Main.gtime + 's,</p><p>奔向苏宁不能停  iPhone6+等你秒</p>');
                    p_title = '<p>' + runResultText.better.title + '<p>';
                    p_desc = '<p>' + runResultText.better.desc + '<p>';
                } else {
                    // 其他时间完成超过 18秒 此情况也不会出现
                    p_title = '<p>' + runResultText.normal.title + '<p>';
                    p_desc = '<p>' + runResultText.normal.desc + '<p>';
                }
                result_word_html = p_title + p_defen + p_desc;
                $('#result-word').html(result_word_html);

                Main.cxt.clearRect(0, 0, Main.gameInfo.w, Main.gameInfo.h);
                Main.success = false;

                setLevelAndScroe(dfCopy);

            }, 1000);
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
