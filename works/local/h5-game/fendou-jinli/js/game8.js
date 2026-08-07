

let Animation = function () {

}


let catchGame = {},
    gamesence = {},
    gamescend = {},
    domRect,
    bw,
    bh,
    imagesPath,
    socreValue,
    totalarr = [10, 5, 10, -20, -20, 5, 5, 5, 5, 5,],
    loadingtip = false,
    timecreate,
    rank,
    scalex;

imagesPath = 'imgs/';

let showDom = {
    lose: `
    <div class="boleanchoose2" >
    <img class="sharetext" src="${imagesPath}sharetext.png" alt="">
    <div class="giftimg-con1">
        <img class="flash2" src="${imagesPath}flash.png" alt="">
        <img class="getgift" src="${imagesPath}losegift.png" alt="">
    </div>
    <div class="losetext">没中奖，好忧伤</div>
    <div class="giftagain">
        <div class="putoff againlose">再玩一次</div>
        <div>再玩一次</div>
    </div>
    </div>
    `

}
domRect = window.document.documentElement.getBoundingClientRect();
bw = domRect.width;
bh = domRect.height;
scalex = bw / 750
Animation.prototype = {
    init: function init() {
        this.setInfo();
        this.getEle();
        this.setListener()
    },
    setInfo: function setInfo() {
        this.width = domRect.width
        this.height = domRect.height
    },
    getEle: function getEle() {
        this.$endPage = $('#endpage')
    },
    setListener: function setListener() {
        let that = this;
        $('#endpage').on('click', '.again1,.againbig1,.againlose', function () {
            if (loadingtip) {
                return
            }
            $(this).hide()
            setTimeout(() => {
                $(this).show()
                that.$endPage.fadeOut(300);
                game.paused = false
                game.state.start('GamePage')
            }, 100)
        })
        $('#endpage').on('click', '.share1,.sharebig1', function () {
            if (loadingtip) {
                return
            }
            $(this).hide()
            setTimeout(() => {
                $(this).show()
                $('.sharetext').fadeIn(200)
            }, 100)
        })
        $('#endpage ').on('click', '.choosegift1', function () {
            // $.ajax()
            $(this).hide()
            setTimeout(() => {
                $(this).show()
            }, 100)
            if (loadingtip) {
                return
            }
            if (lottery != 0 || gifttimeb === 0) {
                $('#endpage').html(showDom.lose)
                if (gifttimeb >= 1) {
                    gifttimeb--;
                    window.localStorage.setItem('gifttimeb', gifttimeb)
                }
            } else {
                loadingtip = true
                $('#loader').show()
                $.ajax({
                    url: `${posturl}/view/getLottery`,
                    type: 'get',
                    data: { 'token': token || localToken },
                    dataType: 'json',
                    success: function (res) {
                        if (res.state === 'ok') {
                            if (res.data.lottery === 1) {
                                lottery = 1
                                $('#endpage').html(`
                                <div class="boleanchoose" >
                                <div style='height: 18%;width: 100%'></div>                                 
                                <div class="giftimg-con">
                                    <img class="flash2" src="${imagesPath}flash.png" alt="">
                                    <img class="getgift" src="${imagesPath}getgift.png" alt="">
                                </div>
                                <div class="infotext">
                                        <div>喜提大奖！！！</div>
                                        <div>${res.data.prize.name}</div>
                                    </div>
                                <div class="giftinfo">
                                    <div class="text">手机号码</div>
                                    <input class="phone" type="tel" maxlength="11" placeholder="请输入手机号">
                                </div>
                                <div class="putinfo">
                                    <div class="putoff putbtn">提交</div>
                                    <div>提交</div>
                                </div>
                                <div class="wechat">
                                    <img src="${imagesPath}WechatIMG16.png" alt="">
                                    <div class="threetext">
                                        <div>领奖方式：提交手机号码</div>
                                        <div>并长按关注公众号：信网传媒，</div>
                                        <div>输入活动暗号：2019</div>
                                    </div>
                                </div>
                                </div>`)
                            } else {
                                $('#endpage').html(showDom.lose)
                            }
                            if (gifttimeb >= 1) {
                                gifttimeb--;
                                window.localStorage.setItem('gifttimeb', gifttimeb)
                            }
                        }
                        $('#loader').hide()
                    },
                    error: function (err) {
                        alert(err)
                        $('#loader').hide()
                    },
                    complete: function () {
                        loadingtip = false
                    }
                })
            }
        })
        $('#endpage ').on('click', '.putbtn', function () {
            $(this).hide()
            setTimeout(() => {
                $(this).show()
            }, 100)
            let tel = $('.phone').val()
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(tel)) {
                alert('手机号码填写错误')
            } else {
                if (hadput === 1) {
                    alert('您已提交过中奖信息')
                    return
                }
                if (loadingtip) {
                    return
                }
                loadingtip = true
                $('#loader').show()
                $.ajax({
                    url: `${posturl}/view/updateLottery`,
                    type: 'post',
                    data: { 'token': token || localToken, 'userphone': tel ,username: nickname},
                    dataType: 'json',
                    success: function (res) {
                        $('#loader').hide()
                        if (res.state === 'ok') {
                            hadput = 1
                            alert('中奖信息提交成功')
                            $('.phone').val('')
                        } else {
                            alert('中奖信息提交失败')
                        }
                    },
                    error: function (err) {
                        alert(err)
                        $('#loader').hide()
                    },
                    complete: function () {
                        loadingtip = false
                    }
                })
            }
        })
    }
}

catchGame.GamePage = function () {
}
catchGame.GamePage.prototype = {
    preload: function () {
    },
    create: function () {
        this.initNumber()
        $('.audioCon').css({'top':'3.2rem'})
        this.spriteground = this.add.image(0, 0, 'ground');
        this.spriteground.scale.setTo(bw / 750, bh / 1333);

        this.yunbg = this.add.image(0, -128 * bw / 750, 'yun');
        this.yunbg.scale.set(bw / 750)

        this.num = this.add.image(bw - 130 * bw / 750 - 10, 80 * bw / 750, 'num');
        this.num.anchor.set(0.5, 0.5)
        this.num.scale.set(bw / 750)

        this.lead = this.add.sprite(bw, bh, 'lead');
        this.lead.anchor.set(1, 1)//可以设置定位坐标
        this.lead.scale.set(bw / 750 * 0.6)
        this.lead.animations.add('get', [1], true)
        this.physics.arcade.enable(this.lead);//碰撞检测的必要条件
        /**
         * lead 移动
         */
        this.lead.inputEnabled = true;
        //只能在水平方向上移动
        this.lead.input.allowVerticalDrag = false;
        //限制主角只能在世界中移动，不能超出屏幕
        let dragRect = new Phaser.Rectangle(0, 0, bw, bh);
        this.lead.input.enableDrag(false, false, false, 255, dragRect);
        /**
         * 下落的组创建
         */
        this.fullthings = this.add.group();
        //全组开启body
        this.fullthings.enableBody = true;
        //红包组全体添加边界检测和边界销毁
        this.fullthings.setAll('outOfBoundsKill', true);
        this.fullthings.setAll('checkWorldBounds', true);
        if(this.countSecond<15){
            timecreate = 200
        }else{
            timecreate = 500
        }
        this.time.events.loop(timecreate, this.getfull, this)
        /**
         * 添加文字
         */
        let style = { font: `bold ${30 * bw / 750}px`, fill: "#fff" };
        this.scoreText = this.add.text(bw - 120 * bw / 750 - 10, 41 * bw / 375, `得分：${this.total}`, style);
        this.scoreText.anchor.set(0.5);

        let style2 = { font: `bold ${50 * bw / 750}px`, fill: '#2a82d6' }
        this.timeText = this.add.text(110 * bw / 750, 80 * bw / 750, `${this.countSecond}s`, style2)
        this.timeText.anchor.set(0.5);

        this.getsorce = {
        }

        this.tweens = new Phaser.TweenManager(game);//补间管理器
        this.time.events.loop(Phaser.Timer.SECOND, this.changTime, this);//循环调用事件        
    },
    initNumber: function () {
        this.countSecond = 30;
        this.total = 0;
    },
    //设置下落组的单个下落元素
    getfull: function () {
        let left = this.rnd.between(12, bw - 120)
        let top = 0
        let index = this.rnd.between(0, 9)
        if (this.countSecond < 15) {
            let beforeindex = this.rnd.between(0, 15)
            if (beforeindex > 9) {
                index = this.rnd.between(3, 4)
            } else {
                index = beforeindex
            }
        }
        
        let speed = (30 - this.countSecond) * 14//设置随机速度
        let star = this.fullthings.create(left, top, `gifts`, index)
        star.typeIndex = new Date().getTime()
        star.giftIndex = index
        if(index===0||index===2){
            star.body.velocity.y = 280
        }else{
            star.body.velocity.y = 280 + speed + this.rnd.between(0,200);
        }
        star.scale.setTo(bw / 750)
        star.checkWorldBounds = true;
        star.outOfBoundsKill = true
    },
    //改变游戏时间
    changTime: function () {
        if (this.countSecond > 0) {
            this.countSecond--;
            this.timeText.text = `${this.countSecond}s`
            if (this.countSecond === 0) {
                this.putEndInfo()
            }
        }
    },
    //设置碰撞的分数
    createSorceText: function (key, x, value) {
        let style3 = { font: `bold ${28 * bw / 375}px`, fill: '#fff' }
        this.getsorce[key] = this.add.text(x - 223 * scalex / 2, bh - 254 * scalex / 2, `${value}`, style3)
        this.getsorce[key].stroke = '#7d1b2d';//字的边框
        this.getsorce[key].strokeThickness = 5;
        this.getsorce[key].anchor.set(0.5);
        this.getsorce[key].alpha = 1;
        this.getsorce[key].showMe = this.add.tween(this.getsorce[key]).to({ y: bh - 254 * scalex - 20, alpha: 0 }, 800, Phaser.Easing.Cubic.Out, true, false);
        this.getsorce[key].showMe.onComplete.add(function () {
            this.tweens.remove(this.getsorce[key].showMe)
            this.getsorce[key].kill()
        }, this)
    },
    update: function () {
        game.physics.arcade.overlap(this.fullthings, this.spriteground, this.killFullinGround, null, this);
        game.physics.arcade.overlap(this.lead, this.fullthings, this.killFull, null, this);
    },
    killFull: function (lead, star) {
        star.kill()
        this.total = (this.total + totalarr[star.giftIndex]) < 0 ? 0 : this.total + totalarr[star.giftIndex]
        socreValue = star.giftIndex !== 3 && star.giftIndex !== 4 ? `+ ${totalarr[star.giftIndex]}` : `- 20`
        this.createSorceText(star.typeIndex, lead.x, socreValue)
        this.scoreText.text = `得分：${this.total}`
        if (star.giftIndex !== 3 && star.giftIndex !== 4) {
            this.lead.play('get');
            setTimeout(() => {
                this.lead.animations.stop()
                this.lead.frame = 0;
            }, 400)
        }
    },
    killFullinGround: function (spriteground, star) {
        star.kill()
    },
    putEndInfo: function () {
        // this.state.start('GameEnd')
        game.paused = true
        $('#endpage').fadeIn(200)
        this.showWhat(this.total)
    },
    showWhat: function (key) {
        var headimg = imagesPath + 'share.png';
        if (key >= 100) {
            if (this.total < 150){
                rank = 75
            }else if (this.total < 200){
                rank = 99
            } else {
                rank = 99
            }
            $('#endpage').html(` 
            <div class="showToast" >
            <img class="sharetext" src="${imagesPath}sharetext.png" alt="">
            <div class="userimg-con">
                <img class="userimg" src="imgs/share.png" alt="暂无图片">
                <img class="flash" src="${imagesPath}flash.png" alt="">
            </div>
            <div class="username">
                锦鲤
            </div>
            <img class="endstate" src="${imagesPath}success.png" alt="">
            <div class="what">
                <div class="wenxin">恭喜您获得${this.total}分 </div>
                <div class="wenxin">成功击败全国${rank}%的玩家</div>
                <div class="normal">今天还有0次机会</div>
            </div>
            <div class="choosegift-con">
                <div class="choosegift2"></div>
                <div class="choosegift1"></div>
            </div>
            <div class="little-con">
                <div class="again-con">
                    <div class="again2"></div>
                    <div class="again1"></div>
                </div>
                <div class="share-con">
                    <div class="share2"></div>
                    <div class="share1"></div>
                </div>
            </div>
            </div>`)
        } else {
            $('#endpage').html(`
            <div class="showToast" >
            <img class="sharetext" src="${imagesPath}sharetext.png" alt="">
            <div class="userimg-con">
                <img class="userimg" src="${headimg}" alt="暂无图片">
                <img class="flash" src="${imagesPath}flash.png" alt="">
            </div>
            <div class="username">
                ${nickname}
            </div>
            <img class="endstate" src="${imagesPath}fail.png" alt="">
            <div class="what">
                <div class="wenxin">Sorry, 您的成绩为${this.total}分 </div>
                <div class="wenxin">成绩必须达到100分才能抽奖</div>
                <div class="normal2">继续加油吧！</div>
            </div>
            <div class="againbig">
                <div class="againbig1">再玩一次</div>
                <div class="againbig2">再玩一次</div>
            </div>
            <div class="sharebig">
                <div class="sharebig1">我要分享</div>
                <div class="sharebig2">我要分享</div>
            </div>
            </div>
            `)
        }
        $('#endpage').fadeIn(200)
    }
}


gamesence.GameSence = function () {

}
gamesence.GameSence.prototype = {
    preload: function () {
        this.load.image('ground', imagesPath + 'bg.png');
        this.load.image('logo', imagesPath + 'logo.png');
        this.load.image('top', imagesPath + 'top.png');
        this.load.image('bgyun', imagesPath + 'bgyun.png');
        this.load.image('left1yun', imagesPath + 'left1yun.png');
        this.load.image('left2yun', imagesPath + 'left2yun.png');
        this.load.image('rightyun', imagesPath + 'rightyun.png');
        this.load.image('midyun', imagesPath + 'midyun.png');
        this.load.image('bggray', imagesPath + 'bggray.png');
        this.load.image('rule', imagesPath + 'rule.png');
        this.load.image('close', imagesPath + 'close.png')
        this.load.image('yun', imagesPath + 'gamepage1.png');
        this.load.image('num', imagesPath + 'num.png');

        this.load.image('img1', imagesPath + 'fail.png')
        this.load.image('img2', imagesPath + 'lotteryoff.png')
        this.load.image('img3', imagesPath + 'lotteryon.png')
        this.load.image('img4', imagesPath + 'off.png')
        this.load.image('img5', imagesPath + 'on.png')
        this.load.image('img6', imagesPath + 'success.png')
        this.load.image('img7', imagesPath + 'shareoff.png')
        this.load.image('img8', imagesPath + 'shareon.png')
        this.load.image('img9', imagesPath + 'flash.png')
        this.load.image('img10', imagesPath + 'WechatIMG16.png')
        this.load.image('img11', imagesPath + 'sharetext.png')
        this.load.image('img12', imagesPath + 'againon.png')
        this.load.image('img13', imagesPath + 'againoff.png')
        this.load.image('img14', imagesPath + 'getgift.png')
        this.load.image('img15', imagesPath + 'losegift.png')

        this.load.spritesheet('leadfirst', imagesPath + 'leadfirst.png', 390, 473, 2)
        this.load.spritesheet('gifts', imagesPath + 'gift2.png', 90, 122, 10)
        this.load.spritesheet('lead', imagesPath + 'lead2.png', 393, 268, 2)
        this.load.spritesheet('beginbutton', imagesPath + 'beginbutton.png', 299, 94)
        this.load.spritesheet('rulebtn', imagesPath + 'rulebtn.png', 299, 94)
        this.stage.backgroundColor = '#3f7dcf'
        this.load.onFileComplete.add(function (e) {
            $('.loadanimation').css({'width':e+'%'})
            $('.loadingtext').text(`${e}%`)
            if (e == 100) {
                $('#loading').hide()
                $('#gamepage').show()
                this.state.start('GameScend')
            }
        }, this)
    },
    create: function () {
    }
}

gamescend.GameScend = function () {

}
gamescend.GameScend.prototype = {
    preload: function () {
        this.isrule = false
        this.isgo = false
        this.spriteground = this.add.image(0, 0, 'ground');
        this.spriteground.scale.setTo(bw / 750, bh / 1333);
        this.logo = this.add.image(scalex * 60, scalex * 40, 'logo')
        this.logo.scale.set(scalex)
        this.top = this.add.image(scalex * 375, scalex * 10, 'top')
        this.add.tween(this.top).to({ y: scalex * 140, alpha: 1 }, 800, Phaser.Easing.Bounce.Out, true, 100, 0, false)
        this.top.anchor.set(0.5, 0)
        this.top.scale.set(scalex)
        this.leadfirst = this.add.sprite(bw - 6, bh - scalex * 220, 'leadfirst');
        this.leadfirst.anchor.set(1, 1)
        this.leadfirst.scale.set(scalex)
        this.leadfirst.animations.add('fly', [0, 1], 8, true);
        this.leadfirst.play('fly')
        this.bgyun = this.add.image(0, bh, 'bgyun')
        this.bgyun.alpha = 0.3
        this.add.tween(this.bgyun).to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.Liner, true, false)
        this.bgyun.anchor.set(0, 1)
        this.bgyun.scale.set(scalex)
        this.left1yun = this.add.image(-scalex * 307, bh - scalex * 212, 'left1yun')
        this.add.tween(this.left1yun).to({ x: 0 }, 1200, Phaser.Easing.Cubic.Out, true, false)
        this.left1yun.anchor.set(0, 1)
        this.left1yun.scale.set(scalex)
        this.left2yun = this.add.image(-scalex * 170, bh + scalex * 124, 'left2yun')
        this.add.tween(this.left2yun).to({ x: 0, y: bh - scalex * 10 }, 800, Phaser.Easing.Cubic.Out, true, false)
        this.left2yun.anchor.set(0, 1)
        this.left2yun.scale.set(scalex)
        this.midyun = this.add.image(bw + 148 * scalex / 2, bh - scalex * 80, 'midyun')
        this.add.tween(this.midyun).to({ x: bw / 2 + 40 * scalex }, 1200, Phaser.Easing.Cubic.Out, true, false)
        this.midyun.anchor.set(0.5, 1)
        this.midyun.scale.set(scalex)
        this.rightyun = this.add.image(bw, bh + 86 * scalex, 'rightyun')
        this.add.tween(this.rightyun).to({ y: bh }, 800, Phaser.Easing.Cubic.Out, true, false)
        this.rightyun.anchor.set(1, 1)
        this.rightyun.scale.set(scalex)
        this.catchBtn = this.add.button(this.world.centerX, bh - scalex * 180, 'beginbutton', this.catchIt, this, 0, 0, 1);
        this.add.tween(this.catchBtn).to({}, 800, Phaser.Easing.Bounce.Out, true, false)
        this.catchBtn.anchor.set(0.5, 1);
        this.catchBtn.scale.setTo(scalex);
        this.ruleBtn = this.add.button(bw / 2, bh - scalex * 50, 'rulebtn', this.showrule, this, 0, 0, 1);
        this.ruleBtn.anchor.set(0.5, 1);
        this.ruleBtn.scale.setTo(scalex);
    },
    catchIt: function () {
        if (!this.isrule && !this.isgo) {
            this.isgo = true
            setTimeout(() => {
                this.state.start('GamePage')
            }, 100)
        }
    },
    showrule: function () {
        if (this.isrule) {
            return
        }
        this.isrule = true
        this.bggray = this.add.image(0, 0, 'bggray')
        this.bggray.scale.set(bw / 750, bh / 1208)
        this.rule = this.add.image(bw / 2, bh / 2, 'rule')
        this.rule.anchor.set(0.5)
        this.rule.scale.set(scalex)
        this.close = this.add.button(bw / 2, bh / 2 + 747 * scalex / 2 + 10, 'close', this.closerule, this)
        this.close.anchor.set(0.5, 0)
        this.close.scale.set(scalex)
    },
    closerule: function () {
        this.bggray.kill()
        this.rule.kill()
        this.close.kill()
        this.isrule = false
    }
}
let game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gamepage')
game.state.add('GamePage', catchGame.GamePage);
game.state.add('GameSence', gamesence.GameSence)
game.state.add('GameScend', gamescend.GameScend)
$(function () {
    let candyXgc = new Animation();
    candyXgc.init();
    game.state.start('GameSence')
})