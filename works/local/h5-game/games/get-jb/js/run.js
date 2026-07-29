var box = $('#box');
box.css('width',window.innerWidth);
box.css('height',window.innerHeight);

// 游戏定时器
function GameBegin(type) {
    var interval = null;
    var $clickTips = $('#click-tips');
    // 记录最终得分
    window.gameFinalScore = 0;
    var B = 0.56;
    var canvasW = window.innerWidth;
    var canvasH = canvasW / B;
    if(canvasH > window.innerHeight) {
        canvasH = window.innerHeight;
    }
    var canvasObj = $('#canvas');
    canvasObj.css('margin-top',(window.innerHeight-canvasH)/2);
    canvasObj.attr('width',canvasW);
    canvasObj.attr('height',canvasH);
    var ca = document.getElementById("canvas");
    var boxCa = document.getElementById('box');

    var ctx = ca.getContext("2d");
    var bj1 = new Image();

    var player=new Image();
    var tu=new Array();

    bj1.src = "images/bj.jpg";
    player.src = "images/ren.png";

    var playerWidth =123 * B;
    var playerHeight =213 * B;

    var h = 20;
    var gk = 1;
    var sudu = 10;
    var zl = 100;
    var chi = 0;
    var shi = 0;
    var fs = 0;
    var sm = 1;
    var bj = bj1;

    // 创建事件 外部监听gameComplete
    var completeEvent = document.createEvent('CustomEvent');
    completeEvent.initCustomEvent('gameComplete', true, false, 'game complete');

    function object(){
        this.x=0;
        this.y=0;
        this.l=11;
        this.image=new Image();
    }

    var sprite=new object();

    sprite.x = 0;
    sprite.y = canvasH-playerHeight;


    sprite.image = player;

    // addListener(ca,"mousemove",m);
    addListener(boxCa, "click", m);

    

    var beginTime = new Date();
    // 倒计时时间
    var gameTime = 15;
    var remainTime;
    function checkTime() {
        var nowTime = new Date();
        remainTime = gameTime-parseInt((nowTime.getTime()-beginTime.getTime())/1000);
        document.getElementById('count-down-time').innerHTML = remainTime;
    }
    var range = canvasW - 60 * B;
    function chansheng(){
        if(shi%h==0){
            for(var j=2*chi;j<2*(chi+1);j++){
                tu[j]=new object();
                var i=Math.round(Math.random()*range);
                if(j==2*chi+1)
                {
                    while(Math.abs(i-tu[2*chi].x)<30){
                        i=Math.round(Math.random()*range);
                    }
                }
                var k=Math.round(Math.random()*zl);
                if(k < 90){
                    tu[j].image.src="images/1.png";
                    tu[j].q = 1;
                }else if(k < 97){
                    tu[j].image.src="images/2.png";
                    tu[j].q = 2;
                }else{
                    tu[j].image.src="images/3.png";
                    tu[j].q = 3;
                }
                tu[j].x=i;
                tu[j].y=-Math.round(Math.random()*300);
            }
            chi++;
            if(chi==10) chi=0;
        }
        shi++;
    }

    // 速度控制
    function sudukongzhi(){
        if(remainTime > 10){
            h = 5;
            sudu = 30;
        }else if(remainTime > 5){
            h = 5;
            sudu = 50;
        }else{
            h = 5;
            sudu = 60;
        }
    }
    function draw(){
        sudukongzhi();
        chansheng();
        for(var i=0;i<tu.length;i++){
            if(jianche(sprite,tu[i])) {
                if(tu[i].q == 1){
                    fs += 1;
                }else if(tu[i].q == 2){
                    fs += 5;
                }else{
                    fs += 10;
                }
                tu[i].y += 200;
            }else if(!jianche(sprite,tu[i])){
                //ctx.drawImage(tu[i].image,tu[i].x,tu[i].y,60*B,60*B);
                tu[i].y += sudu;
            }
            ctx.drawImage(tu[i].image,tu[i].x,tu[i].y,60*B,60*B);
        }
    }

    function jianche(a,b){
        var c = a.x - b.x;
        var d = a.y - b.y;
        if(c < b.image.width*B && c>-a.image.width*B  && d<b.image.height*B && d>-a.image.height*B){
            // console.log('d得分')
            return true;
        }else{
            return false;
        }
    }
    function addListener(element,e,fn){
        if(element.addEventListener){
            element.addEventListener(e,fn,false);
        } else {
            element.attachEvent("on" + e,fn);
        }
    }

    function m(event){
        // 点击有音效
        SoundEffectPlay.play();

        $clickTips.hide();

        sprite.x = event.clientX - playerWidth / 2;
        if(sprite.x + playerWidth >= canvasW) sprite.x = canvasW-playerWidth;
        else if(sprite.x <= playerWidth / 2) sprite.x = 0;
    }

    function stop(){
        clearInterval(interval);
    }

    // 只画一贞
    if (type === 'drawone') {
        var lin = 1;
        interval = setInterval(function(){
            ctx.clearRect(0,0,canvasW,canvasH);
            ctx.drawImage(bj,0,0,canvasW,canvasH);
            ctx.drawImage(sprite.image,sprite.x,sprite.y,playerWidth,playerHeight);
            draw();
            document.getElementById("game-score").innerHTML = 0;
            checkTime();
            if(lin == 0) {
                stop();
            }
            lin--;
        }, 100);
    }

    // 绘制游戏
    if (type === 'drawgame') {
        $clickTips.show();

        interval = setInterval(function(){
            ctx.clearRect(0,0,canvasW,canvasH);
            ctx.drawImage(bj,0,0,canvasW,canvasH);
            ctx.drawImage(sprite.image,sprite.x,sprite.y,playerWidth,playerHeight);
            draw();
            document.getElementById("game-score").innerHTML = fs;
            // 用全局变量记录最终得分
            window.gameFinalScore = fs;
            checkTime();
            if(remainTime == 0) {
                stop();
                // 向外抛出自定义事件
                if(window.dispatchEvent) {
                  window.dispatchEvent(completeEvent);
                } else {
                  window.fireEvent(completeEvent);
                }
            }
        }, 100);
    }


}

window.addEventListener('loadingComplete', function() {
    OnePageAni();
});


$('#game-shuoming').on('click', function() {
    $('#game-info').fadeIn();
});
$('#game-info').on('click', function() {
    $(this).fadeOut();
});

$('#game-start').on('click', function() {
    GameBegin('drawone');

    $('#start-page').fadeOut();
    // 执行倒计时
    GameCountDown.beginDown();
    // GameBegin();
});

// 重玩
$('#game-again').on('click', function() {
    $('#start-page').fadeIn();
    $('#game-final').fadeOut();
});

// 监听倒计时是否结束
window.addEventListener('countDownComplete', function() {
    GameCountDown.fadeOut();

    GameBegin('drawgame');
});

// 监听游戏是否结束
window.addEventListener('gameComplete', function() {
    console.log(window.gameFinalScore);
    $('#game-final').fadeIn();
    setFinalText(window.gameFinalScore);
});

function setFinalText(score) {
    var $fText = $('#final-showText');
    var $fScore = $('#final-score');
    var $jump = $('#jump-link');
    var text = '';
    var level = 0;
    switch(true) {
        case score > 0 && score < 10:
            text = '您的手速还有很大进步空间！';
            level = 1;
            break;
        case score >= 10 && score < 15:
            text = '您已经超越了50%的玩家';
            level = 2;
            break; 
        case score >= 15 && score < 25:
            text = '您已经超越了70%的玩家';
            level = 3;
            break; 
        case score >= 25 :
            text = '您已经超越了90%的玩家！';
            level = 4;
            break; 
        default:
            text = '您的手速还有很大进步空间！';
            level = 1;
            break;
    }

    $jump.attr('href', 'jumped.html?level=' + level + '&score=' + score);
    $fText.text(text);
    $fScore.text(score);
}


