<?php
// 调用
session_start();

$nameArr = ['mutong20180920', '8yueshiyi', 'wubin'];
$psd = '123';
$captchaCode = strtolower($_SESSION['captcha']);

$verify = $_POST['verify'];
$username = $_POST['username'];
$password = $_POST['password'];
if(isset($_POST['remember'])) {
  $remember = $_POST['remember'];
}

$res = array();

// 这里用switch判断每种name的情况比较好
if(in_array($username, $nameArr) &&
   $password == $psd &&
   $verify == $captchaCode
) {
  $res['code'] = 0;
  $res['success'] = true;
  $res['message'] = '登录成功';
} else {
  $res['code'] = 2;
  $res['success'] = false;
  $res['message'] = '您输入的密码不正确，请重试';
}

header("content:application/json;chartset=uft-8");
// 第二个参数JSON_UNESCAPED_UNICODE 实现中文不转码z 
echo json_encode($res, JSON_UNESCAPED_UNICODE);

 ?>