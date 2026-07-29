<?php
// 调用
session_start();

$nameArr = ['mutong20180920', '8yueshiyi', 'wubin'];
$captchaCode = strtolower($_SESSION['captcha']);

$verify = $_POST['verify'];
$username = $_POST['username'];

$res = array();

// 这里用switch判断每种name的情况比较好
if(in_array($username, $nameArr) &&
   $verify = $captchaCode
) {
  $res['code'] = 0;
  $res['success'] = true;
  $res['message'] = '新的密码已经发送到您注册邮箱，请查收';
  $res['email_address'] = 'https://mail.qq.com/';
} else {
  $res['code'] = 2;
  $res['success'] = false;
  $res['message'] = '您的用户名不存在';
}

header("content:application/json;chartset=uft-8");
// 第二个参数JSON_UNESCAPED_UNICODE 实现中文不转码z 
echo json_encode($res, JSON_UNESCAPED_UNICODE);

 ?>