<?php
// 处理登录相关，登录等一系列判断成功，执行跳转
session_start();

$oldUser = isset($_SESSION['user']) ? $_SESSION['user'] : '';

if(empty($oldUser)) {
    // 证明没有登录
    if(isset($_GET['destroy']) &&
       $_GET['destroy'] == 2
    ) {
        $_SESSION['user'] = 'some_one';
        header('Location: login.php');
    }
} else {
    // 证明已经登录
    if(isset($_GET['destroy']) &&
       $_GET['destroy'] == 1
    ) {
        unset($_SESSION['user']);
        session_destroy();
        header('Location: login.php');
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录</title>
    <style>
        a{display: block;width: 100%;background-color: red;color: #fff;text-align: center;line-height: 40px;margin: 20px auto;}
    </style>
</head>
<body>
    <?php if(empty($oldUser)) {?>
        <a href="login.php?destroy=2">登录</a>
    <?php } else {?>    
        <a href="login.php?destroy=1">注销登录</a>
    <?php } ?>
    <a href="index.html?id=5">前往投票</a>
</body>
</html>