;(function (window, Phaser, $) {

    'use strict';
    Array.prototype.clone = function () {
        return this.slice(0);
    };
    /*全局变量声明*/
    var
        refuseGame = {},//关卡实例集

        game,//Phaser实例
        getTrash,
        eventListener, // 事件监听
        config = {},//游戏参数集

        elemMap = {},//Dom元素集
        gw, gh,  // 页面宽度和高度
        againData = [],
        trashData = [],  //所有垃圾的雪碧图位置信息，便于随机添加
        setTrashData //为垃圾数组添加初始数据

    ;


    /*系统信息设置*/
    elemMap.$loadPage = $('#loadingPage');
    elemMap.$loadWords = $('#loadingProgress');
    elemMap.$knowPage = $('#know');
    elemMap.$gameResult = $('#gameResult');

    gw = window.document.documentElement.getBoundingClientRect().width;
    gh = window.document.documentElement.getBoundingClientRect().height;

    //设置垃圾信息
    setTrashData = function () {
        trashData = [{
            x: 0, y: 0,
            index: 0,
            name: '旧杂志',
            type: 'recoverable' //可回收的。

        }, {
            x: -100, y: 0,
            index: 1, //对应icon下标
            name: '可乐罐',
            type: 'recoverable' //可回收的。
        }, {
            x: -200, y: 0, index: 2, //对应icon下标
            name: '旧报纸',
            type: 'recoverable' //可回收的。
        }, {
            x: -300, y: 0, index: 3, //对应icon下标
            name: '旧图书',
            type: 'recoverable' //可回收的。
        }, {
            x: -400, y: 0, index: 4, //对应icon下标
            name: '纸板箱',
            type: 'recoverable' //可回收的。
        }, {
            x: -500, y: 0, index: 5, //对应icon下标
            name: '包装纸',
            type: 'recoverable' //可回收的。
        }, {
            x: -600, y: 0, index: 6, //对应icon下标
            name: '旧塑料拖鞋',
            type: 'recoverable' //可回收的。
        }, {
            x: -700, y: 0, index: 7, //对应icon下标
            name: '矿泉水瓶',
            type: 'recoverable' //可回收的。
        }, {
            x: -800, y: 0, index: 8, //对应icon下标
            name: '饮料瓶',
            type: 'recoverable' //可回收的。
        }, {
            x: -900, y: 0, index: 9, //对应icon下标
            name: '旧衣物',
            type: 'recoverable' //可回收的。
        }, {
            x: -100, y: -100, index: 11, //对应icon下标
            name: '啤酒瓶',
            type: 'recoverable' //可回收的。
        }, {
            x: -200, y: -100, index: 12, //对应icon下标
            name: '泡沫塑料',
            type: 'recoverable' //可回收的。
        }, {
                x: -400, y: -100, index: 14, //对应icon下标
                name: '废螺丝钉',
                type: 'recoverable' //可回收的。
            },
            /* 有害垃圾*/
            {
                x: -500, y: -100, index: 15, //对应icon下标
                name: '废旧电池',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -600, y: -100, index: 16, //对应icon下标
                name: '废旧手机',
                type: 'harmful' // 其他垃圾。
            },
            {
                x: -700, y: -100, index: 17, //对应icon下标
                name: '废油漆桶',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -800, y: -100, index: 18, //对应icon下标
                name: '过期药品',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -900, y: -100, index: 19, //对应icon下标
                name: '废旧灯管',
                type: 'harmful' // 其他垃圾。
            },
            {
                x: 0, y: -200, index: 20, //对应icon下标
                name: '杀虫剂罐',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -100, y: -200, index: 21, //对应icon下标
                name: '废水银温度计',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -300, y: -200, index: 23, //对应icon下标
                name: '过期化妆品',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -400, y: -200, index: 24, //对应icon下标
                name: '打印机墨盒',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -600, y: -200, index: 26, //对应icon下标
                name: '废农药筒',
                type: 'harmful' // 有害垃圾。
            },
            /* 餐厨垃圾 */
            {
                x: -700, y: -200, index: 27, //对应icon下标
                name: '剩菜剩饭',
                type: 'kitchen' //可回收的。
            },
            {
                x: -800, y: -200, index: 28, //对应icon下标
                name: '菜根菜叶',
                type: 'kitchen' // 厨余垃圾。
            },
            {
                x: 0, y: -300, index: 30, //对应icon下标
                name: '瓜果皮',
                type: 'kitchen' // 有害垃圾。
            },
            {
                x: -100, y: -300, index: 31, //对应icon下标
                name: '蛋壳',
                type: 'kitchen' // 其他垃圾。
            },
            {
                x: -200, y: -300, index: 32, //对应icon下标
                name: '鸡骨',
                type: 'kitchen' //可回收的。
            },
            {
                x: -300, y: -300, index: 33, //对应icon下标
                name: '茶叶渣',
                type: 'kitchen' //可回收的。
            },
            {
                x: -400, y: -300, index: 34, //对应icon下标
                name: '废弃食用油',
                type: 'kitchen' // 厨余垃圾。
            },
            {
                x: -500, y: -300, index: 35, //对应icon下标
                name: '枯萎鲜花',
                type: 'kitchen' // 有害垃圾。
            },
            {
                x: -600, y: -300, index: 36, //对应icon下标
                name: '食物残渣',
                type: 'kitchen' // 其他垃圾。
            },
            /*其它垃圾*/
            {
                x: -700, y: -300, index: 37, //对应icon下标
                name: '烟头',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -800, y: -300, index: 38, //对应icon下标
                name: '破碗碟',
                type: 'other' // 有害垃圾。
            },
            {
                x: -900, y: -300, index: 39, //对应icon下标
                name: '玉米核',
                type: 'other' // 其他垃圾。
            },
            {
                x: 0, y: -400, index: 40, //对应icon下标
                name: '旧鞋帽',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -100, y: -400, index: 41, //对应icon下标
                name: '宠物粪便',
                type: 'other' // 有害垃圾。
            },
            {
                x: -200, y: -400, index: 42, //对应icon下标
                name: '厕纸',
                type: 'other' // 其他垃圾。
            },
            {
                x: -300, y: -400, index: 43, //对应icon下标
                name: '卫生巾',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -400, y: -400, index: 44, //对应icon下标
                name: '尿片',
                type: 'other' // 其他垃圾。
            },
            {
                x: -500, y: -400, index: 45, //对应icon下标
                name: '纸巾',
                type: 'other' // 有害垃圾。
            },
            {
                x: -600, y: -400, index: 46, //对应icon下标
                name: '大棒骨',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -700, y: -400, index: 47, //对应icon下标
                name: '贝壳',
                type: 'other' // 有害垃圾。
            },
            {
                x: -900, y: -400, index: 49, //对应icon下标
                name: '陶瓷',
                type: 'other' // 厨余垃圾。
            },
            {
                x: 0, y: -500, index: 50, //对应icon下标
                name: '尘土',
                type: 'other' // 有害垃圾。
            },
            {
                x: -300, y: -500, index: 53, //对应icon下标
                name: '照片',
                type: 'other' // 其他垃圾。
            },
            {
                x: -400, y: -500, index: 54, //对应icon下标
                name: '明信片',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -500, y: -500, index: 55, //对应icon下标
                name: '一次性餐具',
                type: 'other' // 有害垃圾。
            },
            {
                x: -600, y: -500, index: 56, //对应icon下标
                name: '废弃食品袋',
                type: 'other' // 其他垃圾。
            },
            {
                x: -700, y: -500, index: 57, //对应icon下标
                name: '旧相册',
                type: 'other' // 其他垃圾。
            },
            {
                x: -800, y: -500, index: 58, //对应icon下标
                name: '木屑',
                type: 'other' // 其他垃圾。
            },{
                x: 0, y: -600, index: 60, //对应icon下标
                name: '铜',
                type: 'recoverable' //可回收的。
            },{
                x: -100, y: -600, index: 61, //对应icon下标
                name: '铁',
                type: 'recoverable' //可回收的。
            },{
                x: -200, y: -600, index: 62, //对应icon下标
                name: '铝',
                type: 'recoverable' //可回收的。
            },{
                x: -300, y: -600, index: 63, //对应icon下标
                name: '玻璃瓶罐',
                type: 'recoverable' //可回收的。
            },{
                x: -400, y: -600, index: 64, //对应icon下标
                name: '平板玻璃',
                type: 'recoverable' //可回收的。
            },{
                x: -500, y: -600, index: 65, //对应icon下标
                name: '牙刷',
                type: 'recoverable' //可回收的。
            },{
                x: -600, y: -600, index: 66, //对应icon下标
                name: '染发剂',
                type: 'harmful' //可回收的。
            },{
                x: -700, y: -600, index: 67, //对应icon下标
                name: '除草剂容器',
                type: 'harmful' //可回收的。
            },{
                x: -800, y: -600, index: 68, //对应icon下标
                name: '过期糕点',
                type: 'kitchen' //可回收的。
            },{
                x: -900, y: -600, index: 69, //对应icon下标
                name: '瓜子壳',
                type: 'kitchen' //可回收的。
            },{
                x: 0, y: -700, index: 70, //对应icon下标
                name: '花生壳',
                type: 'kitchen' //可回收的。
            },{
                x: -100, y: -700, index: 71, //对应icon下标
                name: '废弃鱼虾',
                type: 'kitchen' //可回收的。
            },{
                x: -200, y: -700, index: 72, //对应icon下标
                name: '坚果壳',
                type: 'other' //可回收的。
            },{
                x: -300, y: -700, index: 73, //对应icon下标
                name: '果核',
                type: 'other' //可回收的。
            },{
                x: -400, y: -700, index: 74, //对应icon下标
                name: '纸杯',
                type: 'other' //可回收的。
            }
        ];
        againData = [{
            x: 0, y: 0,
            index: 0,
            name: '旧杂志',
            type: 'recoverable' //可回收的。

        }, {
            x: -100, y: 0,
            index: 1, //对应icon下标
            name: '可乐罐',
            type: 'recoverable' //可回收的。
        }, {
            x: -200, y: 0, index: 2, //对应icon下标
            name: '旧报纸',
            type: 'recoverable' //可回收的。
        }, {
            x: -300, y: 0, index: 3, //对应icon下标
            name: '旧图书',
            type: 'recoverable' //可回收的。
        }, {
            x: -400, y: 0, index: 4, //对应icon下标
            name: '纸板箱',
            type: 'recoverable' //可回收的。
        }, {
            x: -500, y: 0, index: 5, //对应icon下标
            name: '包装纸',
            type: 'recoverable' //可回收的。
        }, {
            x: -600, y: 0, index: 6, //对应icon下标
            name: '旧塑料拖鞋',
            type: 'recoverable' //可回收的。
        }, {
            x: -700, y: 0, index: 7, //对应icon下标
            name: '矿泉水瓶',
            type: 'recoverable' //可回收的。
        }, {
            x: -800, y: 0, index: 8, //对应icon下标
            name: '饮料瓶',
            type: 'recoverable' //可回收的。
        }, {
            x: -900, y: 0, index: 9, //对应icon下标
            name: '旧衣物',
            type: 'recoverable' //可回收的。
        }, {
            x: -100, y: -100, index: 11, //对应icon下标
            name: '啤酒瓶',
            type: 'recoverable' //可回收的。
        }, {
            x: -200, y: -100, index: 12, //对应icon下标
            name: '泡沫塑料',
            type: 'recoverable' //可回收的。
        }, {
                x: -400, y: -100, index: 14, //对应icon下标
                name: '废螺丝钉',
                type: 'recoverable' //可回收的。
            },
            /* 有害垃圾*/
            {
                x: -500, y: -100, index: 15, //对应icon下标
                name: '废旧电池',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -600, y: -100, index: 16, //对应icon下标
                name: '废旧手机',
                type: 'harmful' // 其他垃圾。
            },
            {
                x: -700, y: -100, index: 17, //对应icon下标
                name: '废油漆桶',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -800, y: -100, index: 18, //对应icon下标
                name: '过期药品',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -900, y: -100, index: 19, //对应icon下标
                name: '废旧灯管',
                type: 'harmful' // 其他垃圾。
            },
            {
                x: 0, y: -200, index: 20, //对应icon下标
                name: '杀虫剂罐',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -100, y: -200, index: 21, //对应icon下标
                name: '废水银温度计',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -300, y: -200, index: 23, //对应icon下标
                name: '过期化妆品',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -400, y: -200, index: 24, //对应icon下标
                name: '打印机墨盒',
                type: 'harmful' // 有害垃圾。
            },
            {
                x: -600, y: -200, index: 26, //对应icon下标
                name: '废农药筒',
                type: 'harmful' // 有害垃圾。
            },
            /* 餐厨垃圾 */
            {
                x: -700, y: -200, index: 27, //对应icon下标
                name: '剩菜剩饭',
                type: 'kitchen' //可回收的。
            },
            {
                x: -800, y: -200, index: 28, //对应icon下标
                name: '菜根菜叶',
                type: 'kitchen' // 厨余垃圾。
            },
            {
                x: 0, y: -300, index: 30, //对应icon下标
                name: '瓜果皮',
                type: 'kitchen' // 有害垃圾。
            },
            {
                x: -100, y: -300, index: 31, //对应icon下标
                name: '蛋壳',
                type: 'kitchen' // 其他垃圾。
            },
            {
                x: -200, y: -300, index: 32, //对应icon下标
                name: '鸡骨',
                type: 'kitchen' //可回收的。
            },
            {
                x: -300, y: -300, index: 33, //对应icon下标
                name: '茶叶渣',
                type: 'kitchen' //可回收的。
            },
            {
                x: -400, y: -300, index: 34, //对应icon下标
                name: '废弃食用油',
                type: 'kitchen' // 厨余垃圾。
            },
            {
                x: -500, y: -300, index: 35, //对应icon下标
                name: '枯萎鲜花',
                type: 'kitchen' // 有害垃圾。
            },
            {
                x: -600, y: -300, index: 36, //对应icon下标
                name: '食物残渣',
                type: 'kitchen' // 其他垃圾。
            },
            /*其它垃圾*/
            {
                x: -700, y: -300, index: 37, //对应icon下标
                name: '烟头',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -800, y: -300, index: 38, //对应icon下标
                name: '破碗碟',
                type: 'other' // 有害垃圾。
            },
            {
                x: -900, y: -300, index: 39, //对应icon下标
                name: '玉米核',
                type: 'other' // 其他垃圾。
            },
            {
                x: 0, y: -400, index: 40, //对应icon下标
                name: '旧鞋帽',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -100, y: -400, index: 41, //对应icon下标
                name: '宠物粪便',
                type: 'other' // 有害垃圾。
            },
            {
                x: -200, y: -400, index: 42, //对应icon下标
                name: '厕纸',
                type: 'other' // 其他垃圾。
            },
            {
                x: -300, y: -400, index: 43, //对应icon下标
                name: '卫生巾',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -400, y: -400, index: 44, //对应icon下标
                name: '尿片',
                type: 'other' // 其他垃圾。
            },
            {
                x: -500, y: -400, index: 45, //对应icon下标
                name: '纸巾',
                type: 'other' // 有害垃圾。
            },
            {
                x: -600, y: -400, index: 46, //对应icon下标
                name: '大棒骨',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -700, y: -400, index: 47, //对应icon下标
                name: '贝壳',
                type: 'other' // 有害垃圾。
            },
            {
                x: -900, y: -400, index: 49, //对应icon下标
                name: '陶瓷',
                type: 'other' // 厨余垃圾。
            },
            {
                x: 0, y: -500, index: 50, //对应icon下标
                name: '尘土',
                type: 'other' // 有害垃圾。
            },
            {
                x: -300, y: -500, index: 53, //对应icon下标
                name: '照片',
                type: 'other' // 其他垃圾。
            },
            {
                x: -400, y: -500, index: 54, //对应icon下标
                name: '明信片',
                type: 'other' // 厨余垃圾。
            },
            {
                x: -500, y: -500, index: 55, //对应icon下标
                name: '一次性餐具',
                type: 'other' // 有害垃圾。
            },
            {
                x: -600, y: -500, index: 56, //对应icon下标
                name: '废弃食品袋',
                type: 'other' // 其他垃圾。
            },
            {
                x: -700, y: -500, index: 57, //对应icon下标
                name: '旧相册',
                type: 'other' // 其他垃圾。
            },
            {
                x: -800, y: -500, index: 58, //对应icon下标
                name: '木屑',
                type: 'other' // 其他垃圾。
            },{
                x: 0, y: -600, index: 60, //对应icon下标
                name: '铜',
                type: 'recoverable' //可回收的。
            },{
                x: -100, y: -600, index: 61, //对应icon下标
                name: '铁',
                type: 'recoverable' //可回收的。
            },{
                x: -200, y: -600, index: 62, //对应icon下标
                name: '铝',
                type: 'recoverable' //可回收的。
            },{
                x: -300, y: -600, index: 63, //对应icon下标
                name: '玻璃瓶罐',
                type: 'recoverable' //可回收的。
            },{
                x: -400, y: -600, index: 64, //对应icon下标
                name: '平板玻璃',
                type: 'recoverable' //可回收的。
            },{
                x: -500, y: -600, index: 65, //对应icon下标
                name: '牙刷',
                type: 'recoverable' //可回收的。
            },{
                x: -600, y: -600, index: 66, //对应icon下标
                name: '染发剂',
                type: 'harmful' //可回收的。
            },{
                x: -700, y: -600, index: 67, //对应icon下标
                name: '除草剂容器',
                type: 'harmful' //可回收的。
            },{
                x: -800, y: -600, index: 68, //对应icon下标
                name: '过期糕点',
                type: 'kitchen' //可回收的。
            },{
                x: -900, y: -600, index: 69, //对应icon下标
                name: '瓜子壳',
                type: 'kitchen' //可回收的。
            },{
                x: 0, y: -700, index: 70, //对应icon下标
                name: '花生壳',
                type: 'kitchen' //可回收的。
            },{
                x: -100, y: -700, index: 71, //对应icon下标
                name: '废弃鱼虾',
                type: 'kitchen' //可回收的。
            },{
                x: -200, y: -700, index: 72, //对应icon下标
                name: '坚果壳',
                type: 'other' //可回收的。
            },{
                x: -300, y: -700, index: 73, //对应icon下标
                name: '果核',
                type: 'other' //可回收的。
            },{
                x: -400, y: -700, index: 74, //对应icon下标
                name: '纸杯',
                type: 'other' //可回收的。
            }
        ];
        // console.log(trashData);
    }
    setTrashData();
    // 科普知识垃圾分类
    getTrash = function () {
        var trashDatas = trashData;
        for (var i = 0; i < trashDatas.length; i++) {
            // console.log(trashDatas[i]);
            switch (trashDatas[i].type) {
                case 'recoverable': {
                    var $dom = $('<div class="garbage-item" style="background-position:' + trashDatas[i].x + "px " + trashDatas[i].y + "px" + ' ;">' +
                        '<p class="name">' + trashDatas[i].name + '</p>' +
                        '</div>');
                    elemMap.$knowPage.find('.reused .garbage-list').append($dom);
                    break;
                }
                case 'kitchen' : {
                    var $dom = $('<div class="garbage-item" style="background-position:' + trashDatas[i].x + "px " + trashDatas[i].y + "px" + ' ;">' +
                        '<p class="name">' + trashDatas[i].name + '</p>' +
                        '</div>');
                    elemMap.$knowPage.find('.cook .garbage-list').append($dom);
                    break;
                }
                case 'harmful' : {
                    var $dom = $('<div class="garbage-item" style="background-position:' + trashDatas[i].x + "px " + trashDatas[i].y + "px" + ' ;">' +
                        '<p class="name">' + trashDatas[i].name + '</p>' +
                        '</div>');
                    elemMap.$knowPage.find('.harm .garbage-list').append($dom);
                    break;
                }
                case 'other' : {
                    var $dom = $('<div class="garbage-item" style="background-position:' + trashDatas[i].x + "px " + trashDatas[i].y + "px" + ' ;">' +
                        '<p class="name">' + trashDatas[i].name + '</p>' +
                        '</div>');
                    elemMap.$knowPage.find('.others .garbage-list').append($dom);
                    break;
                }
            }
        }
    }

    eventListener = function () {
        var $knowBack = $('#knowBack'),
            $closeBtn = $('#closeBtn'),
            $garbshItem = $('.sort-list .item'),
            $garbageBox = $('.list-box'),
            $schedule = $('.schedule'),
            $gameInfo = $('.game-info');
        $knowBack.click(function () {
            elemMap.$knowPage.fadeOut();
        });
        $closeBtn.click(function () {
            elemMap.$gameResult.fadeOut();
        });

        $garbshItem.click(function () {
            var _this = $(this);
            var index = _this.index();
            $garbageBox.hide();
            $garbageBox.eq(index).show();
        });

        $gameInfo.on('touchstart', function () {
            $gameInfo.fadeOut();
            // game.state.start('GamePage');
            game.gameStart = true;
            game.counter = 60;
        });

        $('.card-btn').on('click', function () {
            $schedule.fadeIn();
        });
        getTrash();
    }

    //创建开始页面
    refuseGame.StartPage = function (game) {

    };

    refuseGame.StartPage.prototype = {
        preload: function () {

            this.load.onFileComplete.add(this.loadprogress);

            // 首页元素加载
            this.load.image('bg', imagesPath + 'page.png');
            this.load.image('logo', imagesPath + 'logo.png');
            this.load.image('leaf', imagesPath + 'leaf.png');
            this.load.image('mountain', imagesPath + 'mountain.png');
            this.load.image('mainTitle', imagesPath + 'main-title.png');
            this.load.image('swallow', imagesPath + 'swallow.png');
            this.load.image('houses', imagesPath + 'houses.png');
            this.load.image('shadow', imagesPath + 'shadow.png');
            this.load.image('indexPerson', imagesPath + 'index-people1.png');
            this.load.spritesheet('start-btn', imagesPath + 'btns.png', 199, 114);

        },
        create: function () {
            // this.load.audio('bgm','music.mp3' );

            // bgMusic = game.add.audio('bgm');
            // /*背景音乐添加*/
            // bgMusic.autoplay = true;
            // bgMusic.play();
            // bgMusic.volume = 5;
            // bgMusic.loopFull();

            elemMap.$loadPage.hide();

            /*预加载游戏页面图片*/
            // game.load.image('black', imagesPath + 'black-layer.png');
            // game.load.image('hand', imagesPath + 'hand.png');
            this.load.start();
            /*背景音乐添加*/

            /*设置封面背景  根据屏幕的大小调整背景图的比例*/
            this.stage.backgroundColor = '#88d4fa';
            var bg = this.add.image(0, 0, 'bg');
            bg.scale.x = gw / bg.texture.frame.width;
            bg.scale.y = gh / bg.texture.frame.height;


            // 添加首页元素

            this.logo = this.add.image(gw * 0.15, 0 + 28, 'logo');
            this.logo.anchor.set(0.5, 0);

            this.leaf = this.add.image(gw, 0, 'leaf');
            this.leaf.anchor.set(1, 0);

            this.shadow = this.add.image(gw, this.world.centerY + 83, 'shadow');
            this.shadow.anchor.set(1, 0);
            this.shadow.scale.setTo(gw / 750, gw / 750);

            this.mountain = this.add.image(gw, this.world.centerY - 80, 'mountain');
            this.mountain.anchor.set(1, 1);
            this.mountain.scale.setTo(gw / 750, gw / 750);

            this.mainTitle = this.add.image(gw * 0.5, this.world.centerY - 194, 'mainTitle');
            this.mainTitle.anchor.set(0.5, 1);
            this.mainTitle.scale.setTo(gw / 750, gw / 750);


            this.swallow = this.add.image(gw * 0.5 - 447, this.world.centerY - 224, 'swallow');
            this.swallow.anchor.set(0);
            this.swallow.scale.setTo(gw / 750, gw / 750);

            this.houses = this.add.image(gw, this.world.centerY - 164, 'houses');
            this.houses.anchor.set(1, 0);
            this.houses.scale.setTo(gw / 750, gw / 750);

            /*添加开始按钮*/
            this.startBtn = this.add.button(this.world.centerX, this.world.centerY + 360, 'start-btn', this.startGame, this, 1, 1);
            this.startBtn.anchor.set(0.5, 0);
            this.startBtn.scale.setTo(gw / 750, gw / 750);

            this.knowBtn = this.add.button(this.world.centerX, this.world.centerY + 222, 'start-btn', this.startKnow, this, 0, 0);
            this.knowBtn.anchor.set(0.5, 0);
            this.knowBtn.scale.setTo(gw / 750, gw / 750);

            // indexPerson
            this.indexPerson = this.add.image(gw, gh, 'indexPerson');
            this.indexPerson.anchor.set(1, 1);
            this.indexPerson.scale.setTo(gw / 750, gw / 750);

            // 底部文案
            this.gov = this.add.text(this.world.centerX, gh - 100, '青岛市文明办', {
                color: "#fff",
                font: "18px",
                fill: "#fff",
                align: "center"
            });
            this.gov.anchor.set(0.5, 0);
            this.gov.scale.setTo(gw / 750, gw / 750);

            this.support = this.add.text(this.world.centerX, gh - 70, '青岛信网技术支持', {
                color: "#fff",
                font: "18px",
                fill: "#fff",
                align: "center"
            });

            this.support.anchor.set(0.5, 0);
            this.support.scale.setTo(gw / 750, gw / 750);

            //添加首页动画
            /* this.add.tween( this.star1 ).from( { x: gw + 200 }, 10000, "Quart.easeOut", true);
             this.add.tween( this.star2 ).from( { x: -200 }, 6000, "Quart.easeOut", true,500);
             this.add.tween( this.star3 ).from( { x: gw + 200 }, 4000, "Linear", true,500);
             this.add.tween( this.words.scale ).from( { x: 0.2, y: 0.2 }, 2000, "Linear", true,3000);
             this.add.tween( this.words ).from( { alpha: 0 }, 2000, "Linear", true,3000);
             this.add.tween( this.startBtn ).from( { alpha: 0 }, 2000, "Linear", true,5000);*/
            //game.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);

            this.add.tween(this.leaf).to({angle: 10}, 200, "Quart.easeOut", true, 200);

            this.add.tween(this.mainTitle).from({y: -200}, 1200, "Quart.easeIn", true, 100);
            this.add.tween(this.knowBtn.scale).from({x: 0.1, y: 0.1}, 1000, "Quart.easeOut", true, 1300);
            this.add.tween(this.startBtn).from({y: 1700}, 1000, "Quart.easeOut", true, 1600);
            this.add.tween(this.indexPerson).from({x: 1100}, 500, "Quart.easeOut", true, 2900);
            this.add.tween(this.leaf).to({angle: 9}, 2100, Phaser.Circular, true, 0, -1, true);
            this.add.tween(this.shadow).to({y: this.world.centerY + 90}, 2200, Phaser.Circular, true, 0, -1, true);
            this.add.tween(this.swallow).to({
                y: this.world.centerY - 300,
                x: this.world.centerX + 380,
                angle: 10
            }, 4100, Phaser.Circular, true, 0, -1, false);
            this.add.tween(this.swallow.scale).to({x: 0.9, y: 0.9}, 4000, Phaser.Circular, true, 0, -1, false);
            this.add.tween(this.mountain).to({y: this.world.centerY - 60}, 3000, Phaser.Circular, true, 0, -1, true, 1200);
        },
        loadprogress: function () {
            elemMap.$loadWords.html(game.load.progress + "%");
        },
        update: function () {
            // this.add.tween(this.leaf).to({angle: 10}, 200, "Quart.easeOut", true, 200);
            // this.add.tween(this.leaf).to({angle: -10}, 200, "Quart.easeOut", true, 200);
        },
        render: function () {

        },
        startGame: function () {
            $('.game-info').fadeIn();
            setTrashData();
            // console.log(trashData);
            game.state.start('GamePage');
        },
        startKnow: function () {
            console.log('Know');
            elemMap.$knowPage.fadeIn();
        }
    };

    //创建游戏页面
    refuseGame.GamePage = function () {

        this.beginX = gw * 0.25;
        this.beginY = gh * 0.5;

        //垃圾
        this.startTrash = null;
        this.currTrash = null;
        this.endTrash = null;

        //定义四个垃圾桶
        this.recoverable = null; //可回收
        this.kitchen = null; //厨余
        this.harmful = null; //有害
        this.other = null; //其他

        //当前目标垃圾捅
        this.goalDustbin = null;

        //垃圾与各个垃圾桶之间的距离
        this.rd = null;
        this.kd = null;
        this.hd = null;
        this.od = null;


        //设定垃圾与垃圾桶的接触距离
        this.distance = gw * 0.15;

        //临时变量
        this.debug = false;

    };

    refuseGame.GamePage.prototype = {
        preload: function () {
            this.load.spritesheet('trash', imagesPath + 'trash1.png', 100, 100);
            this.load.spritesheet('dustbin', imagesPath + 'dustbin1.png', 200, 300);
            this.load.spritesheet('gamePeople', imagesPath + 'game-people.png', 276, 332);
            this.load.spritesheet('back-btn', imagesPath + 'back-btn.png', 199, 114);
            this.load.image('game-bg', imagesPath + 'game-bg.png');
            this.load.image('time-bg', imagesPath + 'time-bg.png');
            // game.load.audio('rightMusic', 'right-music.mp3');
            // game.load.audio('errorMusic', 'error-music.mp3');
        },
        create: function () {
            // 回答正确的音乐
            // game.rightMusic = game.add.audio('rightMusic');
            // game.rightMusic.autoplay = false;
            // game.rightMusic.play();

            // 回答错误的音乐
            // game.errorMusic = game.add.audio('errorMusic');
            // game.errorMusic.autoplay = false;
            // game.errorMusic.play();

            // 游戏时间
            game.counter = 60;
            // 游戏分数
            this.scorer = 0;
            this.gameOver = false;
            game.gameStart = false;
            this.resulTitle = ['环保小能手', '环保达人', '环保大使', '桐乡环境守护者'];
            var centerX = this.world.centerX;
            var centerY = this.world.centerY;

            this.dustbinScale = gw / 700;

            //设置背景颜色
            this.stage.backgroundColor = '#8ed3f5';

            this.gameBg = this.add.image(0, 0, 'game-bg');
            this.gameBg.scale.x = gw / this.gameBg.texture.frame.width;
            this.gameBg.scale.y = gh / this.gameBg.texture.frame.height;

            //添加 垃圾桶
            this.recoverable = this.add.sprite(centerX - gw * 0.05, centerY - gw * 0.3, 'dustbin');
            this.recoverable.type = 'recoverable';
            this.recoverable.status = 'closed';
            this.recoverable.openMe = 1;
            this.recoverable.closeMe = 0;
            this.recoverable.shaking = this.add.tween(this.recoverable).to({x: centerX - gw * 0.05 + 5}, 50, "Quart.easeOut", false, 0, 3, true);
            this.recoverable.anchor.set(0.5);
            this.recoverable.scale.setTo(this.dustbinScale);


            this.kitchen = this.add.sprite(centerX + gw * 0.25, centerY - gw * 0.2, 'dustbin', 2);
            this.kitchen.type = 'kitchen';
            this.kitchen.status = 'closed';
            this.kitchen.openMe = 3;
            this.kitchen.closeMe = 2;
            this.kitchen.shaking = this.add.tween(this.kitchen).to({x: centerX + gw * 0.25 + 5}, 50, "Quart.easeOut", false, 0, 3, true);
            this.kitchen.anchor.set(0.5);
            this.kitchen.scale.setTo(this.dustbinScale);


            this.harmful = this.add.sprite(centerX + gw * 0.23, centerY + gw * 0.22, 'dustbin', 4);
            this.harmful.type = 'harmful';
            this.harmful.status = 'closed';
            this.harmful.openMe = 5;
            this.harmful.closeMe = 4;
            this.harmful.shaking = this.add.tween(this.harmful).to({x: centerX + gw * 0.23 + 5}, 50, "Quart.easeOut", false, 0, 3, true);
            this.harmful.anchor.set(0.5);
            this.harmful.scale.setTo(this.dustbinScale);

            this.other = this.add.sprite(centerX - gw * 0.04, centerY + gw * 0.45, 'dustbin', 6);
            this.other.type = 'other';
            this.other.status = 'closed';
            this.other.openMe = 7;
            this.other.closeMe = 6;
            this.other.shaking = this.add.tween(this.other).to({x: centerX - gw * 0.04 + 5}, 50, "Quart.easeOut", false, 0, 3, true);
            this.other.anchor.set(0.5);
            this.other.scale.setTo(this.dustbinScale);

            // 创建垃圾
            this.createTrash();

            // 时间-计分板
            this.timeBg = this.add.sprite(centerX + 191, 55, 'time-bg');
            this.timeBg.anchor.set(0, 0);
            this.timeBg.scale.setTo(this.dustbinScale);

            game.times = this.add.text(centerX + 270, 63, game.counter, {
                color: "#fff",
                font: "32px",
                fill: "#fff",
                align: "center"
            });
            game.times.anchor.set(0.5, 0);
            game.times.scale.setTo(this.dustbinScale);

            this.score = this.add.text(40, 45, this.scorer + '分', {
                color: "#fff",
                font: "60px SimHei",
                fill: "#fff",
                align: "center"
            });
            // 添加文字边
            this.score.stroke = '#b51e0b';
            this.score.strokeThickness = 10;
            this.score.fill = '#fff';

            this.score.anchor.set(0, 0);
            this.score.scale.setTo(this.dustbinScale);

            // 这里添加人物，并为人物添加动画
            this.gamePeople = this.add.sprite(0, gh, 'gamePeople', 1);
            this.gamePeople.anchor.set(0, 1);
            this.gamePeople.scale.setTo(gw/750);

            // 倒计时
            game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        },
        update: function () {
            game.physics.arcade.collide([this.currTrash, this.recoverable, this.kitchen, this.harmful, this.other]);

            //时刻判断垃圾与各个桶之间的距离
            this.rd = this.game.physics.arcade.distanceBetween(this.currTrash, this.recoverable);
            this.kd = this.game.physics.arcade.distanceBetween(this.currTrash, this.kitchen);
            this.hd = this.game.physics.arcade.distanceBetween(this.currTrash, this.harmful);
            this.od = this.game.physics.arcade.distanceBetween(this.currTrash, this.other);


            //根据垃圾与各垃圾桶之间的距离做判断和相应处理
            this.checkTrash(this.rd, this.recoverable);
            this.checkTrash(this.kd, this.kitchen);
            this.checkTrash(this.hd, this.harmful);
            this.checkTrash(this.od, this.other);

        },
        render: function () {

            if (this.debug) {
                game.debug.body(this.currTrash);
                game.debug.body(this.recoverable);
                game.debug.body(this.kitchen);
                game.debug.body(this.harmful);
                game.debug.body(this.other);
            }

            //game.debug.bodyInfo(this.hideCloth, 32, 32);
        },
        updateCounter: function () {
            if (!game.gameStart) {
                return;
            }
            // 倒计时
            game.counter--;

            if (game.counter === 6) {
                game.add.tween(game.times.scale).to({x: 2, y: 2}, 500, "Quart.easeOut", true, 0, -1, true);
                game.add.tween(game.times).to({x: this.world.centerX + 271, y: 55}, 500, "Quart.easeOut", true, 0, -1, true);

                // game.times = this.add.text(centerX + 270, 55, game.counter, {
                //     color: "#fff",
                //     font: "32px",
                //     fill: "#fff",
                //     align: "center"
                // });
            }

            if (game.counter <= 0) {
                game.counter = 0;

                game.add.tween(game.times.scale).to({x: 1, y: 1}, 10, "Quart.easeOut", true, 0, -1, false,500);
                game.add.tween(game.times).to({x: this.world.centerX + 275, y: 63}, 1, "Quart.easeOut", true, 0, -1, false,500);

                if (this.gameOver) {
                    return;
                }
                this.resultPge();
            }
            game.times.setText(game.counter + 'S');

        },
        resultPge: function () {
            // 游戏结果
            // game.add.tween(elemMap.$gameResult).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            var scoreNum = this.scorer;
            var index = 0, percent = '90%';
            if (scoreNum > 0 && scoreNum < 40) {
                index = 0;
            } else if (scoreNum < 60) {
                index = 1;
            } else if (scoreNum < 80) {
                index = 2;
            } else if (scoreNum < 120) {
                index = 3;
            }
            percent = Math.ceil((scoreNum / 120) * 100);
            if (percent > 99) {
                percent = 99;
            }
            elemMap.$gameResult.find('.score').text(scoreNum + ' 分');
            elemMap.$gameResult.find('.title').text(this.resulTitle[index]);
            elemMap.$gameResult.find('.percent').text(percent + '%');
            elemMap.$gameResult.fadeIn();

            // 添加返回按钮
            this.backBtn = this.add.button(this.world.centerX + 127, gh - 45, 'back-btn', this.backPage);
            this.backBtn.anchor.set(0, 1);
            this.backBtn.scale.setTo(this.dustbinScale);
            this.gameOver = true;
        },
        backPage: function () {
            // 音乐暂停，回到主页
            game.state.start('StartPage');
            trashData = againData;
            // console.log(againData,trashData);
        },
        createTrash: function () {
            var trashDatas = trashData;
            if (trashDatas.length === 0) {
                setTrashData();
            }

            if (this.currTrash !== null) {
                this.currTrash.kill();
            }
            this.startTrash = null;

            // 随机数范围
            var rndMax = trashDatas.length - 1;

            var rnd = this.rnd.integerInRange(0, rndMax);
            var currData = trashDatas[rnd];
            // 删除该元素，去重复
            trashDatas.splice(rnd, 1);

            this.startTrash = this.add.sprite(this.beginX, this.beginY - 65, 'trash', currData.index);
            this.startTrash.anchor.set(0.5, 0.5);
            this.startTrash.scale.setTo(gw / 500);

            this.endTrash = this.add.sprite(this.beginX8, this.beginY - 65, 'trash', currData.index);
            this.endTrash.anchor.set(0.5, 0.5);
            this.endTrash.alpha = 0;
            this.endTrash.scale.setTo(gw / 500);

            // 随机添加垃圾
            this.currTrash = this.add.sprite(this.beginX, this.beginY - 65, 'trash', currData.index);
            this.currTrash.anchor.set(0.5, 0.5);
            this.currTrash.alpha = 0;
            this.currTrash.scale.setTo(gw / 500);

            // 垃圾名称
            game.garbageName = this.add.text(this.beginX - 5, this.beginY + 3, currData.name, {
                color: "#fff",
                font: "28px special", // 60号黑体
                fill: "#fff",
                align: "center"
            });
            game.garbageName.anchor.set(0.5, 0.5);
            game.garbageName.scale.setTo(this.dustbinScale);

            // 将初始信息赋予新建垃圾便于后期判断
            this.currTrash.name = currData.name;
            this.currTrash.type = currData.type;

            // 打开输入，允许拖拽
            this.currTrash.inputEnabled = true;
            this.currTrash.input.enableDrag();
            this.currTrash.events.onDragStart.add(this.dragStart, this);
            this.currTrash.events.onDragStop.add(this.dragEnd, this);

            game.physics.enable([this.currTrash, this.recoverable, this.kitchen, this.harmful, this.other], Phaser.Physics.ARCADE);

            // 添加动画效果
            this.add.tween(this.startTrash).from({alpha: 0, y: this.beginY + 20}, 200, "Quart.easeOut", true);

        },
        dragStart: function () {

            if (game.counter <= 0) {
                console.log('Game Over');
                this.currTrash.kill();
                this.goalDustbin = null;
                return;
            }
            this.startTrash.kill();
            this.currTrash.alpha = 1;
        },
        dragEnd: function () {
            // console.log(this.goalDustbin);
            //判断垃圾是否选择了正确的垃圾桶
            if (this.goalDustbin) {

                this.endTrash.x = this.currTrash.x;
                this.endTrash.y = this.currTrash.y;
                this.endTrash.alpha = 1;

                var hideTrash = this.add.tween(this.endTrash).to({
                    x: this.goalDustbin.x,
                    y: this.goalDustbin.y - gw * 0.15
                }, 100, "Quart.easeOut", true);
                this.add.tween(this.endTrash.scale).to({x: 0.5, y: 0.5}, 200, "Quart.easeOut", true, 200);
                this.add.tween(this.endTrash).to({angle: 360}, 200, "Quart.easeOut", true, 200);
                this.add.tween(this.endTrash).to({alpha: 0}, 200, "Quart.easeOut", true, 300);
                game.garbageName.setText('');
                this.createTrash();

                var dd = this.goalDustbin;
                hideTrash.onComplete.add(function () {
                    // console.log(dd);
                    dd.loadTexture('dustbin', dd.closeMe);
                    //取消目标垃圾桶；
                    this.goalDustbin = null;
                    // 对应分数+1
                    this.scorer += 2;
                    this.score.setText(this.scorer + '分');
                    this.gamePeople.loadTexture('gamePeople', 1);
                }, this);

            } else {
                this.add.tween(this.currTrash).to({x: this.beginX, y: this.beginY - 65}, 200, "Quart.easeOut", true);
                this.gamePeople.loadTexture('gamePeople', 1);
            }

        },
        checkTrash: function (between, dustbin) {

            if (between < this.distance) {

                if (this.currTrash.type === dustbin.type && dustbin.status === 'closed') {

                    dustbin.status = 'open';

                    //将正确的垃圾桶赋予目标垃圾桶；,如果没有选中正确的为空
                    this.goalDustbin = dustbin;
                    // console.log(this.goalDustbin);
                    //选择正确后的动画
                    dustbin.loadTexture('dustbin', dustbin.openMe);

                    // 人物表情
                    this.gamePeople.loadTexture('gamePeople', 0);

                    // this.add.sprite(this.world.centerX - 14, this.world.centerY + 31, 'dustbin', 1);
                }

                if (this.currTrash.type !== dustbin.type && dustbin.status === 'closed') {
                    dustbin.status = 'shake';
                    //this.add.tween( dustbin ).to( { x:dustbin.bx + 5 }, 100, "Quart.easeOut", true, 0, 3,true);
                    dustbin.shaking.start();
                    this.gamePeople.loadTexture('gamePeople', 2);
                }
            } else {

                if (this.currTrash.type === dustbin.type && dustbin.status === 'open') {

                    //this.add.tween(dustbin).to({alpha: 1}, 500, "Quart.easeOut", true);
                    // dustbin.loadTexture('dustbin', dustbin._frame.index - 1);
                    dustbin.loadTexture('dustbin', dustbin.closeMe);
                    //取消目标垃圾桶；
                    this.goalDustbin = null;
                }
                dustbin.status = 'closed';
            }
        }
    };

    game = new Phaser.Game(gw, gh, Phaser.CANVAS, 'game');

    //在游戏中注册关卡
    game.state.add('StartPage', refuseGame.StartPage);
    game.state.add('GamePage', refuseGame.GamePage);

    //运行关卡
    game.state.start('StartPage');
    // 事件注册
    eventListener();

})(window, Phaser, jQuery);


