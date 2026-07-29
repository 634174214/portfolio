<?php
// 兼容低PHP版本缺少str_starts_with函数
if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle)
    {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }
}

// 配置
$sourceJson = 'api_piyao_269.json';    // 你的辟谣数组保存文件名
$outputJson = 'new_list.json';// 替换路径后的新文件
$saveDir = __DIR__ . '/download_img/';
$timeout = 10;

// 创建图片文件夹
if (!file_exists($saveDir)) {
    mkdir($saveDir, 0755, true);
}

/**
 * 获取不重复文件名，重名自动后缀 _1 _2
 */
function getSafeFile($saveDir, $originName)
{
    $info = pathinfo($originName);
    $base = $info['filename'];
    $ext  = isset($info['extension']) ? '.' . $info['extension'] : '';
    $name = $base . $ext;
    $full = $saveDir . $name;
    $i = 1;
    while (file_exists($full)) {
        echo "[重名提示] {$name} 已存在，改为 {$base}_{$i}{$ext}\n";
        $name = $base . '_' . $i . $ext;
        $full = $saveDir . $name;
        $i++;
    }
    return $name;
}

// 1. 读取并解析JSON
if (!file_exists($sourceJson)) {
    die("错误：找不到 {$sourceJson} 文件\n");
}
$raw = file_get_contents($sourceJson);
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("JSON解析失败：" . json_last_error_msg() . "\n");
}

// 2. 收集所有图片URL并建立映射
$urlMap = [];
$imgUrls = [];
foreach ($data as $item) {
    $url = trim($item['imgurl'] ?? '');
    if ($url !== '' && str_starts_with($url, 'http')) {
        $imgUrls[] = $url;
    }
}
$imgUrls = array_unique($imgUrls);
$total = count($imgUrls);
echo "共找到 {$total} 张图片，开始下载\n\n";

// 3. 循环下载每张图
foreach ($imgUrls as $url) {
    if (isset($urlMap[$url])) continue;

    echo "下载：{$url}\n";
    // 提取原始文件名
    $path = parse_url($url, PHP_URL_PATH);
    $originName = basename($path);
    if (empty($originName)) {
        $originName = md5($url) . '.jpg';
    }

    $safeName = getSafeFile($saveDir, $originName);
    $localPath = 'download_img/' . $safeName;
    $saveFull = $saveDir . $safeName;
    $urlMap[$url] = $localPath;

    // 已存在跳过下载
    if (file_exists($saveFull)) {
        echo "→ 文件已存在，跳过\n\n";
        continue;
    }

    // curl请求图片
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_USERAGENT => 'Mozilla/5.0 Chrome'
    ]);
    $bin = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err || $code < 200 || $code >= 400 || empty($bin)) {
        echo "→ 下载失败 HTTP:{$code} | {$err}\n\n";
        continue;
    }

    file_put_contents($saveFull, $bin);
    echo "→ 保存成功：{$safeName}\n\n";
}

// 4. 替换数组内所有imgurl本地路径
foreach ($data as &$item) {
    $old = trim($item['imgurl'] ?? '');
    if ($old !== '' && isset($urlMap[$old])) {
        $item['imgurl'] = $urlMap[$old];
    }
}
unset($item);

// 5. 输出新JSON文件
file_put_contents($outputJson, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo "==================== 完成 ====================\n";
echo "图片保存目录：" . realpath($saveDir) . "\n";
echo "替换后的文件：{$outputJson}\n";
?>