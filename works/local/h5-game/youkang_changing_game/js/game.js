;(function (window, Phaser, $) {

    'use strict';
    /* 全局变量声明 */
    var
        changingGame = {},// 关卡实例集
        game,//Phaser实例
        // config = {},// 游戏参数集
        elemMap = {},//Dom元素集
        scenData = scen, // 底部场景数据
        gw, gh,  // 页面宽度和高度,
        imagesPath = 'img/'
    ;


    /* 系统信息设置 */
    gw = window.document.documentElement.getBoundingClientRect().width;
    gh = window.document.documentElement.getBoundingClientRect().height;

    elemMap.$loadPage = $('#loadingPage');
    elemMap.$game = $('#game');
    elemMap.$start = $('#start');
    elemMap.$result = $('#result');

    // 换装初始化
    var changing = function () {
        this.init();
    };

    changing.prototype.init = function () {
        var scen = scenData;
        this.initDecor(scen.person[0].body[0]);
        this.initOther();
    };

    // 初始化人物饰品
    changing.prototype.initDecor = function (body) {
        var $decorList = elemMap.$game.find('.decor-list');
        var img = body.img;
        var list = body.list;
        $decorList.html('');
        for (var i in list) {
            var item = list[i];
            var $decor = $('<div class="decor-item" style="background-image: url('+ imagesPath + img +');background-position:'+item.x + "px " + item.y + 'px"></div>');
            $decorList.append($decor);
        }
    };

    // 初始化其它，宠物、家具、表情
    changing.prototype.initOther = function () {
        var dataList = scenData;
        var $petList = elemMap.$game.find(".pet-list.list");  // 宠物列
        var $furnList = elemMap.$game.find(".furn-list.list");// 家居列
        var $moodList = elemMap.$game.find(".mood-list.list");// 表情列

        var petList = dataList.person[2].list;
        var furnList = dataList.person[3].list;
        var moodList = dataList.person[4].list;

        var petImg = dataList.person[2].img;
        var furnImg = dataList.person[3].img;
        var moodImg = dataList.person[4].img;

        for (var i in petList) {
            var item = petList[i];
            var $item1 = $('<div class="pet-item" style="background-image: url('+  imagesPath + petImg +');background-position:'+item.x + "px " + item.y + 'px"></div>');
            $petList.append($item1);
        }
        for (var j in furnList) {
            var item = furnList[j];
            var $item2 = $('<div class="furn-item" style="background-image: url('+ imagesPath + furnImg +');background-position:'+item.x + "px " + item.y + 'px"></div>');
            $furnList.append($item2);
        }
        for (var k in moodList) {
            var item = moodList[k];
            var $item3 = $('<div class="mood-item" style="background-image: url('+ imagesPath + moodImg +');background-position:'+item.x + "px " + item.y + 'px"></div>');
            $moodList.append($item3);
        }
    };

    // 获取随机数
    changing.prototype.getRnd = function (rndMax) {
        var rnd = game.rnd.integerInRange(0, rndMax); // 0-rndMax之间的随机数
        return rnd;
    };

    // 生成图片
    changing.prototype.cutImg = function () {
        var $resultImg = elemMap.$result.find('.result-img');
        setTimeout(function () {
            var $draw = document.getElementsByTagName("canvas")[0];
            var src =  $draw.toDataURL("image/png");
            $resultImg.attr("src",src);
        },50);
        elemMap.$result.addClass('camer');
    };

    var change = new changing();

    // 创建开始页面
    changingGame.GamePage = function (game) {

        this.itmes = [];
        this.currIndex = 0;

        this.distance = gw;
        game.currItem = null; // 当前
        this.ctrlRect = null; // 边框
        this.currDecor = null;
        // 临时变量
        this.debug = true;
        // 事件
        this.eventListener();

        // 触摸缩放所需的变量
        this.touchBegin = -1;
        this.scaleBegin = -1;

        this.closeBtn = null;
    };

    changingGame.GamePage.prototype = {
        preload: function () {

            // this.load.onFileComplete.add(this.loadprogress);

            var deadLine = false;
            // 元素加载
            this.load.spritesheet('scene', imagesPath + 'scene.png',750, 646);
            this.load.spritesheet('face', imagesPath + 'face.png',750, 646);
            this.load.image('close', imagesPath + 'close.png');
            // GIRL
            this.load.spritesheet('headsGirl', imagesPath + 'heads_girl.png',360,660);
            this.load.spritesheet('glassGirl', imagesPath + 'glass_girl.png',360,660);
            this.load.spritesheet('clothGirl', imagesPath + 'cloth_girl.png',360,660);
            this.load.spritesheet('pantsGirl', imagesPath + 'pants_girl.png',360,660);

            // BOY
            this.load.spritesheet('headsBoy', imagesPath + 'heads_boy.png',360,660);
            this.load.spritesheet('glassBoy', imagesPath + 'glass_boy.png',360,660);
            this.load.spritesheet('clothBoy', imagesPath + 'cloth_boy.png',360,660);
            this.load.spritesheet('pantsBoy', imagesPath + 'pants_boy.png',360,660);

            // 其它
            this.load.spritesheet('pets', imagesPath + 'pets.png',250,370); // 宠物
            this.load.spritesheet('furn', imagesPath + 'furn.png',450,491); // 家居
            this.load.spritesheet('mood', imagesPath + 'mood.png',280,280); // 表情

            // Bottom
            this.load.image('bottom', imagesPath + 'bottom.png');


        },
        create: function () {
            // elemMap.$loadPage.hide();

            var centerX = this.world.centerX;
            var centerY = this.world.centerY;


            //设置背景颜色
            this.stage.backgroundColor = '#e7faff';

            // 设置游戏场景
            this.gameScene = this.add.sprite(gw, gh + 6, 'scene');
            this.gameScene.anchor.set(1, 1);
            this.gameScene.scale.setTo(gw / 750, gw / 750);

            // this.load.audio('bgm','music.mp3' );
            // bgMusic = game.add.audio('bgm');
            // /*背景音乐添加*/
            // bgMusic.autoplay = true;
            // bgMusic.play();
            // bgMusic.volume = 5;
            // bgMusic.loopFull();

            // 关闭按钮
            this.closeBtn = this.add.sprite(100,100,'close');
            this.closeBtn.inputEnabled = true;
            this.closeBtn.events.onInputUp.add(this.kill);
            this.closeBtn.alpha = 0;
            this.closeBtn.anchor.set(0.5);

            // Bottom
            this.bottom = this.add.image(gw,gh,'bottom');
            this.bottom.anchor.set(1,1);
            this.bottom.scale.setTo(gw / 750, gw / 750);

            // 添加白边
            this.ctrlRect = game.add.graphics();

            // 触摸缩放所需的物理设置
            this.physics.enable([this.input.pointer1,this.input.pointer2,this.ctrlRect], Phaser.Physics.ARCADE);
            this.physics.arcade.collide(this.input.pointer1,this.input.pointer2);
            //this.closeBtn.anchor.set(0.5);
        },
        // loadprogress: function () {
        //     // elemMap.$loadWords.html(game.load.progress + "%");
        // },
        update: function () {
            if (game.currItem){
                // this.ctrlRect.x = game.currItem.x;
                // this.ctrlRect.y = game.currItem.y;
                // this.ctrlRect.width = game.currItem.width;
                // this.ctrlRect.height = game.currItem.height;
                this.ctrlRect.clear();
                this.ctrlRect.lineStyle(2, 0xffffff, 1);
                this.ctrlRect.drawRect(game.currItem.x, game.currItem.y, game.currItem.width, game.currItem.height);
                // this.ctrlRect.endFill();

                this.game.world.bringToTop( this.ctrlRect);

                // 添加关闭按钮到当前选择
                this.closeBtn.x = game.currItem.x + game.currItem.width;
                this.closeBtn.y = game.currItem.y;
                this.closeBtn.alpha = 1;
                this.game.world.bringToTop( this.closeBtn);
                // this.world.bringToTop(this.group1);

                // 判断屏幕上是否有两个触摸点
                if ( this.input.pointer1.isDown && this.input.pointer2.isDown ) {

                    var distance = this.game.physics.arcade.distanceBetween(this.input.pointer1,this.input.pointer2);

                    var scaleVal = 0;

                    // 存储刚刚触碰屏幕时手指之间的距离
                    if ( this.touchBegin < 0){
                        this.touchBegin = distance;
                        this.scaleBegin = game.currItem.scale.x;
                        // game.currItem.input.draggable = false;
                    }
                    // 根据手指间的距离缩放当前物体
                    scaleVal = this.scaleBegin + ((distance - this.touchBegin) / this.touchBegin);

                    if ( scaleVal <= 1.6 && scaleVal > 0.5 ){
                        game.currItem.scale.setTo( scaleVal );
                    }

                } else {
                    this.touchBegin = -1;
                    game.currItem.input.draggable = true;
                }
            } else {
                this.closeBtn.alpha = 0;
                this.ctrlRect.clear();
            }
        },
        render: function () {
            // game.debug.pointer(game.input.pointer1);
            // game.debug.pointer(game.input.pointer2);

            // 调试
            // if (this.debug) {
            //     if (game.currItem) {
            //         // game.debug.rectangle(this.ctrlRect, '#ffffff', false);
            //     }
            // }
        },
        createNewPeople: function (gender) {
            /*
             *  人物添加
             *  gender: 性别
             *  */

            var gender = gender;
            var newItem = this.add.sprite( this.world.centerX - 100 - change.getRnd(100), this.world.centerY - 400 - change.getRnd(200), 'pants' + gender,6);
            newItem.scale.setTo(0.85);
            newItem.inputEnabled = true;
            newItem.input.enableDrag(false, true);
            newItem.index = this.currIndex;

            this.pants = this.add.sprite(0,0,'pants' + gender,0); // 裤子
            this.cloth = this.add.sprite(0,0,'cloth' + gender,0); // 衣服
            this.face  = this.add.sprite(0,0,'face',0);           // 脸部
            this.heads = this.add.sprite(0,0,'heads' + gender,0); // 发型
            this.glass = this.add.sprite(0,0,'glass' + gender,12);// 头饰

            newItem.addChild(this.pants);
            newItem.addChild(this.cloth);
            newItem.addChild(this.face);
            newItem.addChild(this.heads);
            newItem.addChild(this.glass);

            this.itmes[this.index] = newItem;
            // 添加拖拽
            this.itmes[this.index].events.onDragStart.add(this.onDragStart, this);
            // this.itmes[this.index].events.onDragStop.add(this.onDragEnd, this);

            game.currItem = this.itmes[this.index];
            game.currItem.gender = gender;
            game.currItem.type = 'heads';
            game.currItem.child = 3;

            // 添加个数增加
            this.currIndex++;
            if (this.currIndex >=2) {
                elemMap.$game.find('.cut-btn').show();
            }
        },
        createNewThing: function (type,index) {
            /*
             * 添加其它元素
             * */
            console.log(type);
            var newItem = this.add.sprite( this.world.centerX - 100 - change.getRnd(150), this.world.centerY - 120 - change.getRnd(150), type,index);
            // newItem.anchor.set(0,0.5);
            newItem.inputEnabled = true;
            newItem.input.enableDrag(false, true);
            newItem.index = this.currIndex;

            this.itmes[this.index] = newItem;
            // 添加拖拽
            this.itmes[this.index].events.onDragStart.add(this.onDragStart, this);
            // this.itmes[this.index].events.onDragStop.add(this.onDragEnd, this);

            game.currItem = this.itmes[this.index];
            // 添加个数增加
            this.currIndex++;
            if (this.currIndex >=2) {
                elemMap.$game.find('.cut-btn').show();
            }
        },
        onDragStart: function (sprite, pointer) {
            this.touchBegin = -1;
            this.scaleBegin = -1;
            // console.log(sprite.index);
            // 当前item为当前拖拽目标
            game.currItem = sprite;

            var gender = sprite.gender;
            // 重置性别
            if (gender) {
                game.currItem.gender = gender;

                // this.decorData = scenData.person[index];

                if (gender === "Girl") {
                    this.decorData = scenData.person[0];
                }
                if (gender === "Boy") {
                    this.decorData = scenData.person[1];
                }
                this.currDecor = this.decorData.body[0];
                this.resetDecor();
                change.initDecor(this.currDecor);
            }
            // this.add.tween(game.currItem.scale).to({x: 1.06, y: 1.06}, 230, "Quart.easeIn", true,30);
        },
        // onDragEnd: function () {
           // this.add.tween(game.currItem.scale).to({x: 1, y: 1}, 230, "Quart.easeOut", true,30);
        // },
        kill: function () {
            // 删除当前元素
            if (game.currItem.gender) {
                elemMap.$game.find('.chose-area.gender .gender-chose').show();
                elemMap.$game.find('.chose-area.gender .gender-decor').hide();
            }
            game.currItem.kill();
            game.currItem = null;
        },
        changeScene: function (index) {
            // 场景切换
            this.gameScene.loadTexture('scene', index);
        },
        resetDecor: function () {
          // 重置人物选择区
            elemMap.$game.find('.chose-area.gender .gender-chose').hide();
            elemMap.$game.find('.chose-area.gender .gender-decor').show();
            elemMap.$game.find('.decor-btn').removeClass('active');
            elemMap.$game.find('.decor-btn').eq(0).addClass('active');
        },
        eventListener: function () {

            $('body').on('touchmove', function(event) {
                event.preventDefault();
            });

            // 滚动条添加
            var furnScroll = new PerfectScrollbar('.furn-list', {
                // wheelSpeed: 1,
                // handlers: 'touch',
                wheelPropagation: false,
                minScrollbarLength: 20
            });

            var decorList = new PerfectScrollbar('.decor-list', {
                // wheelSpeed: 1,
                // handlers: 'touch',
                wheelPropagation: false,
                minScrollbarLength: 20
            });

            var that = this;
            // 开始游戏
            elemMap.$start.on('click',function () {
                // 运行关卡
                // game.state.start('GamePage');
                elemMap.$game.show();
                elemMap.$loadPage.addClass('slide-in');
            });

            // 导航切换
            elemMap.$game.find('.tool-nav').on('click','.nav-btn.tool',function () {
                var _this = $(this);
                var index = _this.index();
                if (_this.hasClass('active')) {
                    return;
                }
                var $slide = elemMap.$game.find('.nav-btn.slide');

                // 如果导航隐藏，显示
                if ($slide.hasClass('top')) {
                    $slide.removeClass('top');
                    $slide.addClass('down');
                    elemMap.$game.find('.top-tips').hide();
                    elemMap.$game.find('.chose-content').show();
                }
                _this.siblings().removeClass('active');
                _this.addClass('active');

                elemMap.$game.find('.chose-area').siblings().hide();
                elemMap.$game.find('.chose-area').eq(index).show();

                // 重新初始化人物选择区
                elemMap.$game.find('.chose-area.gender .gender-chose').show();
                elemMap.$game.find('.chose-area.gender .gender-decor').hide();
                elemMap.$game.find('.decor-btn').removeClass('active');
                elemMap.$game.find('.decor-btn').eq(0).addClass('active');
            });

            // 场景选择
            elemMap.$game.find('.chose-area.scene').on('click','.scene-box',function () {
                var _this = $(this);
                var index = _this.index();
                that.changeScene(index);
            });

            // 性别选择
            elemMap.$game.find('.chose-area.gender').on('click','.gender-box',function () {
                var _this = $(this);
                var index = _this.index();

                // 性别
                var gender = _this.attr("data-gender");
                // 新的人物
                that.createNewPeople(gender);

                elemMap.$game.find('.chose-area.gender .gender-chose').hide();
                elemMap.$game.find('.chose-area.gender .gender-decor').show();
                game.currItem.gender = gender;

                // 当前性别所对应的挂饰，初始化
                that.decorData = scenData.person[index];
                that.currDecor = that.decorData.body[0];
                change.initDecor(that.currDecor);
            });

            // 人物挂饰切换
            elemMap.$game.find('.chose-area.gender .gender-decor').on('click','.decor-btn',function () {
                var _this = $(this);
                var index = _this.index();
                if (_this.hasClass('active')) {
                    return false;
                } else {
                    _this.siblings().removeClass('active');
                    _this.addClass('active');

                    that.currDecor = that.decorData.body[index];

                    game.currItem.type = that.currDecor.type;  // 挂饰类型
                    game.currItem.child = that.currDecor.child;// 当前挂饰对应的序号

                    change.initDecor(that.currDecor);
                }
            });

            // 选择挂饰
            elemMap.$game.find('.chose-area.gender .gender-decor').on('click','.decor-list .decor-item',function () {
                var _this = $(this);
                var index = _this.index();
                // game.currItem.children[index].kill();
                game.currItem.children[game.currItem.child].loadTexture(game.currItem.type + game.currItem.gender, index);
            });

            // 宠物
            elemMap.$game.find('.chose-area.pet').on('click','.pet-list .pet-item',function () {
                var type = 'pets';
                var _this = $(this);
                var index = _this.index();
                that.createNewThing(type,index);
            });
            // 家具
            elemMap.$game.find('.chose-area.furn').on('click','.furn-list .furn-item',function () {
                var type = 'furn';
                var _this = $(this);
                var index = _this.index();
                that.createNewThing(type,index);
            });

            // 表情
            elemMap.$game.find('.chose-area.mood').on('click','.mood-list .mood-item',function () {
                var type = 'mood';
                var _this = $(this);
                var index = _this.index();
                that.createNewThing(type,index);
            });

            // 工具栏隐藏
            elemMap.$game.find('.tool-nav').on('click','.nav-btn.slide',function () {
                var _this = $(this);
                var $choseContent = elemMap.$game.find('.chose-content');
                if (_this.hasClass('down')) {
                    _this.removeClass('down');
                    _this.addClass('top');
                    elemMap.$game.find('.top-tips').show();
                    $choseContent.hide();
                } else {
                    _this.removeClass('top');
                    _this.addClass('down');
                    elemMap.$game.find('.top-tips').hide();
                    $choseContent.show();
                }
            });

            elemMap.$game.find('.top-tips').on('click',function () {
                elemMap.$game.find('.tool-nav .slide').removeClass('top');
                elemMap.$game.find('.tool-nav .slide').addClass('down');
                elemMap.$game.find('.top-tips').hide();
                elemMap.$game.find('.chose-content').show();
            });

            // 截图保存
            elemMap.$game.find('.cut-btn').on('click',function () {
                // 清空当前
                game.currItem = null;
                change.cutImg();
            });
        }
    };


    $(function () {
        game = new Phaser.Game(gw, gh, Phaser.CANVAS, 'game');

        //在游戏中注册关卡
        game.state.add('GamePage', changingGame.GamePage);
        game.state.start('GamePage');

        var hideCallback = function() {
            $('.pace').hide();
            elemMap.$start.css("opacity","1");
            Pace.ignore(function() {
                return true;
            });
            window.paceInterval && window.clearInterval(window.paceInterval);
        };
        window.paceInterval = setInterval(function() {
            var progress = $('.pace-progress').attr('data-progress-text');
            if(progress === '99%' || progress === '100%') {
                hideCallback();
            }
        }, 300);
    })
})(window, Phaser, Zepto);