// 图片预加载
var loadImage = function(url, callback) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        callback.call(img);
        return;
    };
    img.onload = function() {
        callback.call(img);
    };
};
var imgLoad = function(srcs, callback) {
    var srcs = srcs || [];
    var len = srcs.length;
    if (len < 1)
        return;
    // 记录加载长度
    var loadNum = 0;
    var loading_p = 0;
    var loading = function() {
        if (loadNum < len) {
            loading_p = Math.ceil(100 * loadNum / len);
            var _src = srcs[loadNum];
            loadImage(_src, function(img) {
                loadNum++;
                callback && callback(loading_p);
                loading();
            });
        } else {
            loading_p = '100';
            callback && callback(loading_p);
        };
    }
    loading();
};
var initPage = function() {
    var _img = $('.swiper-container img');
    var arr = [];
    _img.each(function(i, v) {
        var _src = $(v).attr('src');
        if (_src) {
            arr.push(_src);
        };
    });

    var obj = {
        num : 0,
        timer : null
    };

    imgLoad(arr, function(num) {
        obj.timer && clearTimeout(obj.timer);
        if (num >= 100) {
            num = 100;
            // obj.timer = setTimeout(initSwiper,500);
        };
        if (num == 100) {
        }
    });
};
initPage();


// 图片最大宽高
var MAN_WIDTH = 142;
var MAN_HEIGHT = 172;
var screenW = $(window).width();
var screenH = $(window).height();
var springBox = $(".springBox");
var springBoxWidth = screenW - (screenW * 0.1);
// 垂直部分的比例 需要考虑上半部分的高度 这里是占40%
var springBoxHeight = screenH - (screenH * 0.4);
// console.log(springBoxHeight)
// 结束跳转的链接
var jumpLink = '';

// 计算得到水平边缘
var springBoxXMax = springBoxWidth - MAN_WIDTH;
var springBoxYMax = springBoxHeight - MAN_HEIGHT;

// 计算随机整数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
            break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
        default: 
            return 0; 
             break; 
    } 
} 

var icoTimeout_min = 700;         // 泡温泉最小时间
var icoTimeout_threshold = 800;   // 泡温泉阈值
var manid = 0;
var score = 0;
//var gameTime = 3000;
// 游戏倒计时时间 15秒要输入16000
var gameTime = 16000;
var countDownTime = gameTime / 1000;
// var gameTime = 1600;
var time = countDownTime;
var data_Top10 = [];
var icoArray = [
        "img/U10478P1534DT20150828101212.png",
        "img/U10478P1534DT20150828101212.png",
        "img/U10478P1534DT20150828101212.png",
        "img/U10478P1534DT20150828101212.png",
        "img/U10478P1534DT20150828101212.png",
        "img/U10478P1534DT20150828101212.png",
        "img/U10478P1534DT20150828101212.png"
];
var icoLArray = [
    "img/U10478P1534DT20150828101511.png",
    "img/U10478P1534DT20150828101511_1.png",
    "img/U10478P1534DT20150828101511_1_1.png",
    "img/U10478P1534DT20150828101512.png",
    "img/U10478P1534DT20150828101512_1.png",
    "img/U10478P1534DT20150828101512_1_1.png",
    "img/U10478P1534DT20150828101512_1_1_1.png"
];

function icoAct() {
    $(".ico").bind("touchstart mousedown",function (){
        event.preventDefault(); 
        icoEventHandle($(this));
    });
}

function icoEventHandle(dom){
    dom.unbind();
    removeOldMan();
    score++;
    var sid = parseInt(dom.attr("sid"));
    var randomTime = icoTimeout_min + Math.random() * icoTimeout_threshold;
    // console.log(sid + " t:" + randomTime);
    springAddHandle(sid, randomTime);
    dom.css({opacity: 1, scale: 1}).transition({opacity: 0,scale: 0.8},60);
    setTimeout(function() {
        dom.css({opacity: 0, scale: 1}).transition({opacity: 1},120);
        dom.bind("touchstart mousedown",function (){icoEventHandle(dom)});
    }, randomTime);
}

// 避免池中太多人物 删除掉旧的 每次点击删除一个最旧的
function removeOldMan() {
    var $allMen = $('.springBox').find('.man');
    if ($allMen.length > 5) {
        $allMen.eq(0).remove();
    }
}


function springAddHandle(sid, randomTime) {
    
    var random_x = randomNum(0, springBoxXMax);
    var random_y = randomNum(0, springBoxYMax);

    // random_y = ( sid === 6 ) ? random_y - 50 : random_y ;

    var thisid = manid;
    // console.log(thisid);

    var html = "";
    html+= '<img src="' + icoLArray[sid-1] + '"class="man man_' + thisid + '"  style="position:absolute; left:' + random_x + 'px; top:' + random_y + 'px; z-index:' + random_y.toFixed(0) +";";
    if (Math.random()>0.5) {
        var scaleX = "-webkit-transform:scaleX(-1); transform:scaleX(-1);";
        html+= scaleX;
    }
    html+= '"/>';
    springBox.append(html);
    manid++;
}

function reset(){
    manid = 0;
    score = 0;
    time = countDownTime;
    $(".ico").unbind();
    $(".man").remove();
}

function gamestart(){
    reset();
    $(".startBtn").unbind();
    $("#p1").css({x: '0px'}).transition({x: '-120%'},800,"cubic-bezier(.83,-0.26,.28,1.28)",function(){
        $("#p2").fadeIn();
    });

    //start
    icoAct();

    //gametime
    setTimeout(function () {
        gameover();
    }, gameTime);

    startTimer();
}

function startTimer() {
    var timeDom = $(".time");
    t = setInterval(function() {
        time -= 0.1;
        if(time <= 0){
            timeDom.text("0");
            clearInterval(t);
            return;
        }
        timeDom.text(time.toFixed(0));
    }, 100);
}

function gameover() {

    $(".score").text(score);
    document.title = "土豪我射了" + score + "个嫦娥姐姐，玩“全民射嫦娥”赢中秋“约”会！";

    var resultImg = 'img/';
    // 1是最差
    var level = 1;

    switch(true) {
        case score < 10:
            resultImg += 'game-result-4.png';
            level = 1;
            break;
        case score >= 10 && score < 20:
            resultImg += 'game-result-3.png';
            level = 2;
            break;
        case score >= 20 && score < 30:
            resultImg += 'game-result-2.png';
            level = 3;
            break;
        case score >= 30:
            resultImg += 'game-result-1.png';
            level = 4;
            break; 
        default:
            resultImg += 'game-result-4.png';
            level = 1;
    }
    // 根据得分跳转到的链接
    jumpLink = 'jumped.html?level=' + level + '&score=' + score;
    $('#game-result-img').attr('src', resultImg);

    /* 进入前10 */
    $(".popup2").show();
    $(".cover").hide();

    $("#p2").fadeOut();
    $("#wrap_2").fadeIn();
    $(".startBtn").unbind().bind("click",function(){
        gamestart();
    });

}

function onceAgain() {
    $('#wrap_2').fadeOut(200);
    $("#p2").fadeOut(200);
    $("#p1").css({x: '-640px'}).transition({x: '0px'},800,"cubic-bezier(.83,-0.26,.28,1.28)",function(){
        $(".cover").hide();
    });
}


$(".startBtn").bind("click", function () {
    gamestart();
});


$(".submitBtn").unbind().bind("click",function(){
    window.location.href = jumpLink;
});