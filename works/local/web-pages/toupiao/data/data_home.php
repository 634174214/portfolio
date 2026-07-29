<?php
header("Content-Type:application/json;chartset=uft-8");

$id = isset($_GET['id']) ? $_GET['id'] : false;

if(!$id) {
    $resErr = [
        'code' => 100, 
        'msg' => '请求失败',
        'data' => []
    ];
    $json = json_encode($resErr, JSON_UNESCAPED_UNICODE);
    exit($json);
}

// 开始和结束时间
$today = date('Y-m-d 00:00:00', time());
$end = date('Y-m-d 00:00:00', time() + 60 * 60 * 24 * 2);

$res = [
    'code' => 0,
    'msg' => '请求成功',
    'data' => [
        // 投票专题的id
        'id' => $id,
        'page_title' => '感恩母亲节',
        'page_description' => '晒合照，赢奖励',
        // 模式分为文字模式text和图片image模式
        'mode' => 'image',
        // 只针对于当为text模式时候才用的配置 高度单位px
        'text_box_height' => 150,
        'text_box_bgcolor' => '#673ab7',
        // 只针对图片模式才用的配置 高度单位px,为''则是前端设置的默认值
        'image_box_height' => 80,
        'top_banner' => 'images/top-banner.png',
        // 活动开始时间
        'start_time' => $today,
        // 活动结束时间
        'end_time' => $end,
        'infos' => [
            [
                'info_title' => '活动介绍',
                'info_content' => '母亲节即将到来，让我们一起晒一晒我和母亲的合影。让时间定格此刻，保存幸福，让瞬间成为永恒。每人每天选择一位进行投票，一次可投一票。投票时间：5月7日——5月11日。参赛者上传信息，严禁盗用他人照片等信息。'
            ],
            [
                'info_title' => '奖品说明',
                'info_content' => '一等奖：大润发购物卡，面值500元。<br>二等奖：大润发购物卡，面值200元。<br>三等奖：泡泡玛特盲盒一个。'
            ],
            [
                'info_title' => '兑换地址',
                'info_content' => '青岛市市南区南京路110号5楼05室。'
            ]
        ],
        // 微信分享图
        'wx_share' => '',
        // 投票项列表
        'list' => [
            [
                'touid' => 1,
                'text' => '感谢我的母亲，感谢她对我的爱',
                'image' => 'images/1.png',
                'tickets' => mt_rand(10, 9999),
                'title' => '何玉莹和母亲',
            ],
            [
                'touid' => 2,
                'text' => '感谢我的母亲，感谢她对我的爱',
                'image' => 'images/2.png',
                'tickets' => mt_rand(10, 9999),
                'title' => '刘涵和母亲',
            ],
            [
                'touid' => 3,
                'text' => '感谢我的母亲，感谢她对我的爱',
                'image' => 'images/3.png',
                'tickets' => mt_rand(10, 999),
                'title' => '王戎和母亲',
            ],
            [
                'touid' => 4,
                'text' => '感谢我的母亲，感谢她对我的爱',
                'image' => 'images/4.png',
                'tickets' => mt_rand(10, 9999),
                'title' => '赵敏和母亲',
            ],
            [
                'touid' => 5,
                'text' => '感谢我的母亲，感谢她对我的爱',
                'image' => 'images/5.png',
                'tickets' => mt_rand(10, 9999),
                'title' => '张海和母亲',
            ],
            [
                'touid' => 6,
                'text' => '感谢我的母亲，感谢她对我的爱',
                'image' => 'images/6.png',
                'tickets' => mt_rand(10, 999),
                'title' => '丁月苼和母亲',
            ]
        ]
    ]
];  
$json = json_encode($res, JSON_UNESCAPED_UNICODE);
exit($json);