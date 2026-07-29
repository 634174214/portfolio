<?php
session_start();

header("Content-Type:application/json;chartset=uft-8");

$token = isset($_GET['token']) ? $_GET['token'] : false;

if(!$token) {
    $resErr = [
        'code' => 100, 
        'msg' => '没有token',
        'data' => []
    ];
    $json = json_encode($resErr, JSON_UNESCAPED_UNICODE);
    exit($json);
}

$random = mt_rand(1, 20);
$cando = $random > 10 ? true : false;

/* 需要对传递的token进行解析判断 一系列操作 */
// var_dump($_SESSION);
if(isset($_SESSION['user']) && 
   $_SESSION['user'] == 'some_one'
) {
    $res = [
        'code' => 0,
        'msg' => '用户存在',
        'data' => [
            'u_id' => 22,
            'u_name' => 'some_one',
            // 该用户是否可以投票
            'can_do' => true,
            // 用户如果不能投票的提示信息，能投为空
            'can_not_msg' => '抱歉，您今天的投票次数已用完'
        ]
    ]; 
} else {
    $res = [
        'code' => 200,
        'msg' => '没登录, 请先进行登录',
        'data' => []
    ];
}

$json = json_encode($res, JSON_UNESCAPED_UNICODE);
exit($json);