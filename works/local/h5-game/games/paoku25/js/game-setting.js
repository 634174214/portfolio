// 要跳转到的着陆页
var jumpto = 'jumped.html';

// 原先游戏定宽和高
var OLD_SCREEN_W = 320;
var OLD_SCREEN_H = 504;

// 动画人物（单个帧）的宽度高度
var CATTLE_WIDTH = 130;
var CATTLE_HEIGHT = 158;

var screenW = $(window).width();
var screenH = $(window).height();

// 给canvas赋予属性
var gameEl = document.getElementById('game');
gameEl.width = screenW;
gameEl.height = screenH;

// 人物距离底部的距离 距离20%
var cattle_bottom_offsetY = screenH * 0.2;

// 计算得到人物处于屏幕中的中心位置左上角坐标
var cattle_x = (screenW - CATTLE_WIDTH) / 2;
var cattle_y = screenH - CATTLE_HEIGHT - cattle_bottom_offsetY;

// 进度条宽度
var PROGRESS_BAR_WIDTH = 224;
// 进度条距离屏幕底部的距离
var PROGRESS_BAR_BOTTOM = 135;
// 进度条的高度
var PROGRESS_BAR_HEIGHT = 22;
// 正常状态下进度条颜色
var PROGRESS_BAR_BGCOLOR = '#ffea00';
// 增长的进度条颜色
var PROGRESS_BAR_GROWCOLOR = '#7eb619';
// 根据屏幕宽高计算出progress的位置
var progress_x = (screenW - PROGRESS_BAR_WIDTH) / 2;
var progress_y = screenH - PROGRESS_BAR_BOTTOM - PROGRESS_BAR_HEIGHT + 8;

// 跑酷结果提示
var runResultText = {
    // 12秒以内完成跑酷游戏
    best: {
        title: '你是【离弦的箭哇！】',
        desc: '奔向苏宁不能停  iPhone6+等你秒',
    },
    // 12秒以上15秒以内完成跑酷游戏
    better: {
        title: '你是【真是个飞毛腿！】',
        desc: '奔向苏宁不能停  iPhone6+等你秒'
    },
    // 完成游戏 但是时间大于15秒
    // 游戏时间总共15秒，（此结果一般不会用到）
    normal: {
        title: '你的速度很快，但是还可以更快！',
        desc: '奔向苏宁不能停  iPhone6+等你秒'
    },
    // 失败返回的提示
    worse: function(df) {
        var obj = {};
        // 得分区间在0- 100 超过100算游戏成功到达终点，所以判断要在0-100之间
        switch(true) {
            case df < 30:
                obj.title = '你是小蜗牛吗，快点加快脚步';
                obj.desc = '奔向苏宁不能停  iPhone6+等你秒';
                break;
            case df >= 20 && df < 60:
                obj.title = '你的速度有点慢，还需要加快步伐！';
                obj.desc = '奔向苏宁不能停  iPhone6+等你秒';
                break;
            case df >= 60 && df < 80:
                obj.title = '您距离终点只有一步之遥！';
                obj.desc = '奔向苏宁不能停  iPhone6+等你秒';
                break;
            // 要给完不成游戏的希望相当于成功
            case df >= 80 && df < 100:
                obj = runResultText.better;
                break;
            // 大于100就是完成了
            default:
                obj = runResultText.best;
        }
        return obj;
    }
};


// 根据原来的值与总高比例，计算出当前需要的Y数值
function getTrueAttrY(val) {
    var now = (val * screenH) / OLD_SCREEN_H;
    return now;
}

// 根据图像宽高计算终点人物坐标位置
function getCattleFinalXY(manWidth) {
    var x = screenW / 2 - manWidth / 2;
    return x;
}

// 设置最终得分以及等级 用于跳转到着陆页
function setLevelAndScroe(df) {
    var level = 0;
    var score = 0;
    // 保证最大是100
    df = df >= 99 ? 100 : parseInt(df);
    score = df;
    switch(true) {
        case df < 30:
            level = 1;
            break;
        case df >= 20 && df < 60:
            level = 2;
            break;
        case df >= 60 && df < 80:
            level = 3;
            break;
        // 要给完不成游戏的希望相当于成功
        case df >= 80 && df < 100:
            level = 4;
            break;
        // 大于100就是完成了
        default:
            level = 1;
    }
    window.jumpto = `${window.jumpto}?level=${level}&score=${score}`;
}

