<?php
header("Content-Type:application/json;chartset=uft-8");

$id = isset($_POST['id']) ? intval($_POST['id']) : false;
$touid = isset($_POST['touid']) ? intval($_POST['touid']) : false;



if(!$id || !$touid) {
    $resErr = [
        'code' => 100, 
        'msg' => '请求失败',
        'data' => []
    ];
    $json = json_encode($resErr, JSON_UNESCAPED_UNICODE);
    exit($json);
}

$res = [
    'code' => 0, 
    'msg' => '请求成功',
    'data' => [
        'id' => $id,
        'touid' => $touid,
        // 投票是否成功
        'success' => true
    ]
];

$json = json_encode($res, JSON_UNESCAPED_UNICODE);
exit($json);