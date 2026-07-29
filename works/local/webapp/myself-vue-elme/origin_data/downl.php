<?php
// 兼容低版本PHP 模拟str_starts_with
if (!function_exists('str_starts_with')) {
    function str_starts_with(string $haystack, string $needle): bool
    {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }
}

// 配置
$saveDir = __DIR__ . '/download_img/';
$timeout = 10;
// 需要处理的json文件列表
$jsonFiles = [
    'seller.json',
    'goods.json',
    'ratings.json'
];

// 创建图片保存文件夹
if (!file_exists($saveDir)) {
    mkdir($saveDir, 0755, true);
}

/**
 * 获取不重复的安全文件名，重名自动加_1 _2
 */
function getSafeFileName($saveDir, $originName)
{
    $pathInfo = pathinfo($originName);
    $baseName = $pathInfo['filename'];
    $ext = isset($pathInfo['extension']) ? '.' . $pathInfo['extension'] : '';
    $finalName = $baseName . $ext;
    $fullPath = $saveDir . DIRECTORY_SEPARATOR . $finalName;
    $index = 1;

    while (file_exists($fullPath)) {
        echo "【重名提示】{$finalName} 已存在，重命名为 {$baseName}_{$index}{$ext}\n";
        $finalName = $baseName . '_' . $index . $ext;
        $fullPath = $saveDir . DIRECTORY_SEPARATOR . $finalName;
        $index++;
    }
    return $finalName;
}

/**
 * 递归提取所有http图片url
 */
function extractAllImages($data, &$urlList)
{
    if (is_array($data)) {
        foreach ($data as $k => $v) {
            // 匹配图片字段
            if (in_array($k, ['avatar','icon','image']) && is_string($v) && str_starts_with($v, 'http')) {
                $urlList[] = $v;
            }
            // pics 图片数组
            if ($k === 'pics' && is_array($v)) {
                foreach ($v as $picUrl) {
                    if (is_string($picUrl) && str_starts_with($picUrl, 'http')) {
                        $urlList[] = $picUrl;
                    }
                }
            }
            extractAllImages($v, $urlList);
        }
    }
}

/**
 * 递归替换数组内远程url为本地路径
 */
function replaceImagePath(&$data, $map)
{
    if (is_array($data)) {
        foreach ($data as $k => &$v) {
            if (is_string($v) && isset($map[$v])) {
                $v = $map[$v];
            }
            replaceImagePath($v, $map);
        }
        unset($v);
    }
}

// 全局URL映射，多个json共用同一张图只下载一次
$globalUrlMap = [];

// 循环处理每个json文件
foreach ($jsonFiles as $jsonFile) {
    echo "\n==================== 开始处理文件：{$jsonFile} ====================\n";
    if (!file_exists($jsonFile)) {
        echo "警告：文件 {$jsonFile} 不存在，跳过\n";
        continue;
    }

    // 读取并解析JSON
    $raw = file_get_contents($jsonFile);
    $jsonData = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "错误：{$jsonFile} JSON解析失败 " . json_last_error_msg() . "\n";
        continue;
    }

    // 提取当前文件所有图片链接
    $currentUrls = [];
    extractAllImages($jsonData, $currentUrls);
    $currentUrls = array_unique($currentUrls);
    $totalImg = count($currentUrls);
    echo "检测到本文件图片数量：{$totalImg}\n";

    // 遍历下载图片并建立映射
    foreach ($currentUrls as $url) {
        // 全局已处理过直接复用映射
        if (isset($globalUrlMap[$url])) {
            echo "已下载过：{$url}，直接复用路径\n";
            continue;
        }

        echo "正在下载：{$url}\n";
        // 截取原始文件名
        $urlPath = parse_url($url, PHP_URL_PATH);
        $originFileName = basename($urlPath);
        if (empty($originFileName)) {
            $originFileName = md5($url) . '.jpg';
        }

        $safeName = getSafeFileName($saveDir, $originFileName);
        $saveFullPath = $saveDir . DIRECTORY_SEPARATOR . $safeName;
        $localRelPath = 'download_img/' . $safeName;
        $globalUrlMap[$url] = $localRelPath;

        // 跳过已存在文件
        if (file_exists($saveFullPath)) {
            echo "文件已存在，跳过下载：{$safeName}\n";
            continue;
        }

        // curl下载
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_TIMEOUT => $timeout,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120'
        ]);
        $imgBin = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $errMsg = curl_error($ch);
        curl_close($ch);

        if ($errMsg || $httpCode < 200 || $httpCode >= 400 || empty($imgBin)) {
            echo "下载失败 HTTP:{$httpCode} 错误:{$errMsg}\n";
            continue;
        }

        file_put_contents($saveFullPath, $imgBin);
        echo "保存成功 → {$safeName}\n";
    }

    // 替换当前json内所有图片路径
    replaceImagePath($jsonData, $globalUrlMap);

    // 生成新json文件 new_xxx.json
    $newJsonName = 'new_' . $jsonFile;
    file_put_contents($newJsonName, json_encode($jsonData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    echo "已生成替换后的文件：{$newJsonName}\n";
}

echo "\n==================== 全部处理完成 ====================\n";
echo "图片存放目录：" . realpath($saveDir) . "\n";
echo "映射规则：远程图片地址 → download_img/原始文件名(重名自动加数字后缀)\n";
?>