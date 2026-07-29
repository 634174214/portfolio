<?php
header('Content-type: text/json;charset=utf-8');
$arr = array(
    "code" => 0,
    'successText' => 'sildes change success!'
);

$json = json_encode($arr);

exit($json);
?>