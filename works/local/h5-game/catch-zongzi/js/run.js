;(function (window, Phaser, $) {

    /* 全局变量声明 */
    var c = console.log,
        refuseGame = {},// 关卡实例集
        speed = -500, //粽子前进速度
        ftp = 600, //粽子刷新频率
        total ,//总分
        
        gw = window.document.documentElement.getBoundingClientRect().width,
        gh = window.document.documentElement.getBoundingClientRect().height;

    var images = [
        { name: "bg", type: "jpg" },
    ];

    var imageUrl = "imgs/";

    var layer = function(msg) {
        var $layer = $(".layer-msg");
        $layer.find("p").text(msg);
        $layer.fadeIn(600);
        setTimeout(function() {
            $layer.fadeOut(600);
        }, 1500);
    };

    var showToast = function(msg) {
        var $toast = $('#toast');
        var $msg = $('.toast-msg')
        $msg.text(msg);
        $toast.fadeIn(600);
    }

    var Page = function () {};

    Page.prototype = {
        init: function () {
            this.setJqMap();
            this.addListeners();
            // this.setAnimation();

        },
        setJqMap: function () {
            var that = this;
            var bgImgUrl = bgImgUrlBase64;
            this.resultCanvas = document.getElementById('resultCanvas');
            this.$saveImg = $('#saveImg');
            this.$sharePage = $('#sharePage');

            this.ctx = this.resultCanvas.getContext('2d');
            this.ctx.fillStyle = "#d9fefe";
            this.ctx.fillRect(0, 0, this.resultCanvas.width, this.resultCanvas.height);

            this.$homePage = $('#homePage');
            this.$startBtn = $('#startBtn');
            this.$ruleBtn = $('#ruleBtn');
            this.$closeBtn = $('#closeBtn');
            this.$rulePage = $('#rulePage');

            var bgImg = new Image();

            bgImg.onload = function () {
                // 背景
                that.drawImg(that.ctx,bgImg,{
                    postL: 0,
                    postT: 0,
                    width: that.resultCanvas.width,
                    height: that.resultCanvas.height
                });
            };
            bgImg.src = bgImgUrl;
        },
        drawImg: function (ctx, img, opts) {
            var postL = opts.postL || 0;
            var postT = opts.postT || 0;
            ctx.drawImage(img, postL, postT, opts.width, opts.height);  // 背景
        },

        /**
         * [drawText description]
         * @Author   {{Ruan                   Xueping}}
         * @DateTime 2017-08-01T13:54:53+0800
         * [example: {
         *     str: '我是被写入字符串',
         *     lineWidth: 200, // 一行的宽度
         *     lineWordNum: 13, // 一行中文的长度
         *     posT: 300, // 距离画布顶部的距离
         *     posL: 300, // 距离画布左边的距离
         *     fontTxt: 'bold 20px Microsoft YaHei', // 字体样式
         *     lineHeight: 22, // 行高
         *     color: 'white' //颜色
         * }]
         * @param ctx
         * @param opts
         */
        drawText: function (ctx, opts) {
            var str = typeof opts.str === 'string' ? opts.str : '';

            var posT = opts.posT || 0;
            var posL = opts.posL || 0;

            var lineWordNum = typeof opts.lineWordNum === 'number' ? opts.lineWordNum * 2 : 5 * 2;
            var maxWidth = typeof opts.lineWidth === 'number' ? opts.lineWidth : 750;

            var fontTxt = opts.fontTxt || '20px Microsoft YaHei';
            var lineHeight = typeof opts.lineHeight === 'number' ? opts.lineHeight : 22;
            var color = typeof opts.color === 'string' ? opts.color : 'white';

            var oneLineStr = '';
            var oneLineStrLength = 0;
            var deviL = 0;

            ctx.fillStyle = color;
            ctx.font = fontTxt;
            ctx.fillText(str, posL + deviL, posT);

            // for (var i = 0; this.getTrueLength(str) > 0; i++) {
            //     oneLineStrLength = this.cutString(str, lineWordNum);
            //     oneLineStr = str.substr(0, oneLineStrLength);
            //     deviL = (lineWordNum - this.getTrueLength(oneLineStr)) * (maxWidth / lineWordNum) / 2;
            //     ctx.fillText(oneLineStr, posL + deviL, posT + i * lineHeight, maxWidth);
            //     str = str.substr(oneLineStrLength);
            // }
        },
        //获取字符串的真实长度（字节长度）
        getTrueLength: function(str){
            var len = str.length, truelen = 0;
            for(var x = 0; x < len; x++){
                if(str.charCodeAt(x) > 128){
                    truelen += 2;
                }else{
                    truelen += 1;
                }
            }
            return truelen;
        },

        //按字节长度截取字符串，返回substr截取位置
        cutString: function(str, leng){
            var len = str.length, tlen = len, nlen = 0;
            for(var x = 0; x < len; x++){
                if(str.charCodeAt(x) > 128){
                    if(nlen + 2 <= leng){
                        nlen += 2;
                    }else{
                        tlen = x;
                        break;
                    }
                }else{
                    if(nlen + 1 <= leng){
                        nlen += 1;
                    }else{
                        tlen = x;
                        break;
                    }
                }
            }
            return tlen;
        },
        addListeners: function () {

            var that = this;

            $('.head').attr('src', 'imgs/head-img.jpg')
            $('.nick').html(window.nickname)

            this.$ruleBtn.on('click',function ()　{
                that.$rulePage.fadeIn();
            });

            this.$closeBtn.on('click',function () {
                that.$rulePage.fadeOut();
            });

            this.$startBtn.on('click',function (){
                that.showHomePage.reverse();
                if(that.showHomePage.reversed()) {
                    setTimeout(function () {
                        that.$homePage.fadeOut();
                        // game.state.start('GamePage');
                    },2000)
                }
            });

            document.getElementById('shadow').addEventListener('touchend',function () {
                $('#shadow').fadeOut();
                game.gameStart = true;
            })

            // toDo: 修改这里替换生成结果
            // $('body').on('click', function () {
            //     var headUrl = imageUrl + 'head-img.png';
            //     var user = '恭喜' + window.nickname;
            //     var score = '获得130分';
            //     var total = '成功击败全国99%的玩家';
            //     that.getImg(headUrl, user,score, total);
            // });

            // 分享
            this.$saveImg.on('click', '.share-btn', function () {
                that.$sharePage.fadeIn();
            });

            this.$sharePage.on('click', function () {
                that.$sharePage.fadeOut();
            });

            // 再玩一次
            // this.$saveImg.on('click', '.again-btn', function () {
            //     // toDo: 再玩一次
            //     alert('再玩一次');
            // });
        },
        setAnimation: function () {
            var that = this;

            //首页动画
            this.showHomePage = new TimelineMax({ paused: false });
            this.showHomePage
                .from('.theme',1,{opacity:0,scale: 0.1,ease: Elastic.easeOut},1)
                .from('.start-btn',.8,{opacity:0,scale: 0.1,ease: Elastic.easeOut},1.5)
                .from('.rule-btn',.8,{opacity:0,scale: 0.1,ease: Elastic.easeOut},1.8)
                .from('.gress',1,{y:303,ease: Power3.easeOut},0.3)
                .from('.zongzi',1,{x:-200,ease: Power3.easeOut},0.3)
                .from('.mount-left',1,{x:-200,ease: Power3.easeOut},0.3)
                .from('.dragon',1,{x:200,ease: Power3.easeOut},0.3)
                .from('.mount-right',1,{x:200,ease: Power3.easeOut},0.3)

            this.showHomePage.play();

        },
        /**
         * 生成结果图，需要传入用户头像，用户名分数及排名
         * @param headUrl
         * @param user
         * @param score
         * @param total
         */
        getImg: function(headUrl, user, score, total) {
            var ctx = this.ctx;
            var that = this;
            var headImg = new Image();

            headImg.onload = function () {
                // 背景
                that.drawImg(that.ctx,headImg,{
                    postL: 47,
                    postT: 509 + 319,
                    width: 112,
                    height: 112
                });


                that.drawText(ctx,{
                    str: user,
                    posT: 509 + 350,
                    posL: 183,
                    fontTxt: 'bolder 28px Microsoft YaHei',
                    color: '#fff'
                });

                that.drawText(ctx,{
                    str: score,
                    posT: 509 + 350 + 34,
                    posL: 183,
                    fontTxt: 'bolder 28px Microsoft YaHei',
                    color: '#fff'
                });

                that.drawText(ctx,{
                    str: total,
                    posT: 509 + 350 + 34 + 34,
                    posL: 179,
                    fontTxt: '26px Microsoft YaHei',
                    color: '#fff'
                });

                // 结果图
                $('#resImg').attr('src', that.resultCanvas.toDataURL(0.99))
            };
            headImg.src = headUrl;
        },
        // 自定义加载页面
        preload: function() {
            var imgCount = 0;
            var that = this;
            var total = images.length;
            //console.log(total);
            $.each(images, function(i, e) {
              var image = new Image();

              image.onload = function() {
                imgCount++;
                // that.$loadTxt.text(parseInt(imgCount / total * 100) + '%');
                if (total === imgCount) {
                  // that.setAnimation();
                  // that.showWelcome.play();
                //   that.$loadPage.fadeOut(600);
                //   that.$homePage.removeClass("hide");
                }
              };
              image.fname = e.name;
              image.src = imageUrl + e.name + "." + e.type;
            });
          }

    };

    //创建游戏界面
    refuseGame.GamePage = function ()　{

    };

    refuseGame.GamePage.prototype = {
        preload: function () {
            this.load.image('game-bg', imagesPath + 'game_bg.jpg');
            this.load.image('dragon-boat',imagesPath +　'dragon_boat.png');
            this.load.image('waves',imagesPath +　'waves.png');
            this.load.spritesheet('zongzi1', imagesPath + 'zongzi_sprites1.png', 292, 185);
            this.load.spritesheet('zongzi2', imagesPath + 'zongzi_sprites2.png', 292, 189);
        },
        create: function () {

            game.counter = 30;//倒计时
            // 游戏分数
            this.scorer = 0;
            //是否开始游戏
            game.gameStart = false;
            //设置背景颜色
            this.stage.backgroundColor = '#6de5ff';

            this.gameBg = this.add.image(0, 0, 'game-bg');
            this.gameBg.scale.x = gw / this.gameBg.texture.frame.width;
            this.gameBg.scale.y = gh / this.gameBg.texture.frame.height;

            this.dragonBoat = this.add.image(gw/2-361, gh-438,'dragon-boat');
            this.waves = this.add.image(0, gh-109,'waves');

            // this.zongzi1 = this.add.sprite(100,100,'zongzi1');
            // this.zongzi1.animations.add('upDown', [0, 1]);
            // this.zongzi1.animations.play('upDown', 3, true);
            this.createZongzi();

            game.times = this.add.text(gw - 120, 74, game.counter + 'S', {
                color: "#700727",
                font: "36px",
                fill: "#700727",
                align: "center",
                fontWeight: "bold"
            });

            // 添加文字边
            game.times.stroke = '#fff';
            game.times.strokeThickness = 10;

            // scoreOffsetTop是得分距离屏幕顶部的距离 如果有昵称就是100
            var scoreOffsetTop = 74;
            this.score = this.add.text(177, scoreOffsetTop, this.scorer + '分', {
                color: "#700727",
                font: "36px",
                fill: "#700727",
                align: "center"
            });

            // 添加文字边
            this.score.stroke = '#fff';
            this.score.strokeThickness = 10;
            

            // this.zongzi2 = this.add.sprite(150,300,'zongzi2');
            // this.zongzi2.animations.add('upDown', [0, 1]);
            // this.zongzi2.animations.play('upDown', 3, true);

            // 倒计时
            game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
        },
        update: function () {

        },
        render: function () {

        },
        createZongzi: function () {
            var that = this;

            var index = this.rnd.between(0, 9)
            var left = gw,
                top = this.rnd.between(200,gh-620);

            // this.movethings = this.add.group();
            // //全组开启body
            // this.movethings.enableBody = true;
            // //粽子组全体添加边界检测和边界销毁
            // this.movethings.setAll('outOfBoundsKill', true);
            // this.movethings.setAll('checkWorldBounds', true);
            if(index%2 == 0){
                this.zongzi = this.add.sprite(left,top,'zongzi1');
                this.zongzi.type = 1;
            }else {
                this.zongzi = this.add.sprite(left,top,'zongzi2');
                this.zongzi.type = 2;
            }
            


            this.physics.arcade.enable(this.zongzi);

            // this.zongzi.set('outOfBoundsKill', true);
            // this.zongzi.set('checkWorldBounds', true);

            this.zongzi.animations.add('upDown', [0, 1]);
            this.zongzi.animations.play('upDown', 3, true);

            // this.zongzi = this.movethings.create(left, top, `zongzi1`, index);
            // this.zongzi.body.velocity.x = -300;

            // this.zongzi.animations.add('upDown', [0, 1]);
            // this.zongzi.animations.play('upDown', 3, true);


            // this.zongzi.enableBody = true;
            this.zongzi.body.velocity.x = speed;
            
            // 打开输入，允许拖拽
            this.zongzi.inputEnabled = true;
            var dragRect = new Phaser.Rectangle(0, 0, gw, gh);
            this.zongzi.input.enableDrag(false, false, false, 255,dragRect);
            this.zongzi.events.onDragStart.add(this.dragStart, this);
            this.zongzi.events.onDragStop.add(this.dragEnd, this);

            setTimeout(function (){
                that.createZongzi();
            },ftp)
        },
        dragStart: function (e) {
            
            // e.kill();
            e.animations.stop();
            e.body.velocity.x = 0;
        },
        dragEnd: function (e) {
            console.log(e.type);
            if(e.y >= gh-200) {
                e.body.velocity.x = 0;
                e.inputEnabled = false;
                if(e.type == 1) {
                    this.scorer += 10;
                    this.score.setText(this.scorer + '分');
                    this.getScore(10);
                }else {
                    this.scorer += 20;
                    this.score.setText(this.scorer + '分');
                    this.getScore(20);
                }
            }else {
                e.body.velocity.x = speed;
            }
            e.animations.play('upDown', 3, true);
        },
        updateCounter: function () {
            
            if (!game.gameStart) {
                return;
            }
            // 倒计时
            game.counter--;
            // console.log(1);

            if(game.counter === 25) {
                speed -= 150;
                ftp -= 150;
            }

            if(game.counter === 15) {
                speed -= 100;
                ftp -= 100;
            }

            if (game.counter === 10) {
                speed -= 100;
                ftp -= 100;
                game.add.tween(game.times.scale).to({x: 1.1, y: 1.1}, 300, "Quart.easeOut", true, 0, -1, true);
                // game.add.tween(game.times).to({x: this.world.centerX + 271, y: 55}, 500, "Quart.easeOut", true, 0, -1, true);

            }

            if (game.counter <= 0) {
                game.counter = 0;
                $()
                game.add.tween(game.times.scale).to({x: 1, y: 1}, 10, "Quart.easeOut", true, 0, -1, false,500);
                // game.add.tween(game.times).to({x: this.world.centerX + 275, y: 63}, 1, "Quart.easeOut", true, 0, -1, false,500);

                // if (this.gameOver) {
                //     return;
                // }
                // this.resultPge();
                $('#saveImg').fadeIn();
                var headUrl = headImgBase64;
                var user = '恭喜' + window.nickname;
                var score = '获得'+ this.scorer +'分';
                var total = '成功击败全国'+ parseInt(this.scorer/2000*100)  +'%的玩家';
                map.getImg(headUrl, user,score, total);
            }
            game.times.setText(game.counter + 'S');

        },
        getScore: function (score)　{
            this.goal = this.add.text(gw/2-53, 300 , '+' + score , {
                color: "#6e0505",
                font: "48px",
                fill: "#6e0505",
                align: "center"
            });
            // 添加文字边
            this.goal.stroke = '#fff';
            this.goal.strokeThickness = 10;
            this.add.tween(this.goal).to({alpha: 0,y:220},500, "Quart.easeOut", true)
        }

    }


    var map = new Page();
    var game = new Phaser.Game(gw, gh, Phaser.CANVAS, 'game')

    //注册关卡
    game.state.add('GamePage', refuseGame.GamePage);

    //运行关卡
    $('#startBtn').on('click',function () {
        game.state.start('GamePage');
        
    });
    // game.state.start('GamePage');

    $(function () {
        map.init();
        // 解决pace在Iphone低电量下进度条加载不完全的bug
        var hideCallback = function () {
            $('.load-page').fadeOut();
            $('.pace').hide();
            map.setAnimation();
            // bgLayer.startMove();
            window.paceInterval && window.clearInterval(window.paceInterval);
            // setTimeout(function () {
            //     page.init();
            //     $('#homePage').find('.content').addClass("animate");
            // }, 500);
        };
        window.paceInterval = setInterval(function () {
            var progress = $('.pace-progress').attr('data-progress');
            if (parseInt(progress) >= 95) {
                hideCallback();
            }
        }, 300);
    });

})(window, Phaser, jQuery);
/*  |xGv00|89909df227ebc1c8cf5f8fd656294493 */