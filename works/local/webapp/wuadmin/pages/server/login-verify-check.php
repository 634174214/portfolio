<?php
// header('content:application/json;chartset=uft-8');
// 调用
session_start();
$verify = $_POST['verify'];
$captchaCode = strtolower($_SESSION['captcha']);
// var_dump($verify == $captchaCode);
$res = array();
if ($verify == $captchaCode) {
    exit('true');
} else {
    exit('false');
}
 ?>