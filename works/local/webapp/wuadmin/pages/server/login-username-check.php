<?php
// header('content:application/json;chartset=uft-8');
// 调用
session_start();
$username = $_POST['username'];
$nameArr = ['mutong20180920', '8yueshiyi', 'wubin'];
if(in_array($username, $nameArr)) {
    exit('true');
} else {
    exit('false');
}
 ?>