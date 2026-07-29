define(['jquery', 'pieceConfig', 'pieceTree', 'pieceTabBar'], function($, config, tree, bar){
    var iframe = document.getElementById('main');
    var $back = $('#back');
    var $reload = $('#reload');
    /* 切记：tree组件是通过a[href="xxx.html"]去选中焦点元素的 */
    // 获取二级菜单下的索引
    var getListIndex = function(arr, url) {
        var listIndex = -1;
        var listHref = '';
        $.each(arr, function(index, item) {
            // 将数组项转为字符串
            var str = JSON.stringify(item.child);
            // 如果iframe的链接与当前遍历项链接相同 或者 iframe的链接存在于child数组中，那么就返回当前二级列表的链接
            if(item.href === url ||
               str.indexOf(url) > 0
            ) {
                listIndex = index;
                listHref = item.href;
            }

        });
        return {
            listIndex: listIndex,
            listHref: listHref
        };
    }

    // 监听iframe加载完成执行 主要驱动左侧导航
    var onload = function() {
        iframe.addEventListener('load', function() {
            // 必须服务器环境 同域名下 获取iframe内部页面的地址
            var iframeUrl = iframe.contentWindow.location.href.split(config.server)[1];
            // 获取子页面的title
            var iframeTitle = iframe.contentWindow.document.title;
            var res = {
                text: '',
                index: -1,
                href: iframeUrl,
                listIndex: -1
            }
            
            /*
            构建出匹配地址链接后的对象
            */
            $.each(config.router, function(index, item) {
                // console.log(item)
                // 将对象转化为字符串
                var str = JSON.stringify(item);
                // 确定地址所在的索引
                if(str.indexOf(iframeUrl) > 0) {
                    res.index = index;
                    // 判断如果索引项下存在二级菜单那么肯定就在二级菜单中
                    if(item.list.length > 0) {
                        var listResObj = getListIndex(item.list, iframeUrl);
                        res.listIndex = listResObj.listIndex;
                        res.text = iframeTitle;
                        res.href = listResObj.listHref;
                    } else {
                        // 如果直属的分类存在
                        if(item.son.length > 0) {
                            // 如果直属的分类中的链接存在与son数组中，那么代表属于这一个分类
                            $.each(item.son, function() {
                                if(iframeUrl === this.href) {
                                    res.href = item.href;
                                }
                            });
                        }
                        res.text = iframeTitle;
                    }
                }
            });
            // 设置bar上显示的内容
            bar.setTabName(res.text);
            // console.log(res);
            // 设置侧边栏
            tree.setActive(res);
        }, false)
    }
    
    // 刷新iframe
    var reload = function() {
        $reload.on('click', function() {
            iframe.contentWindow.location.reload();
        });
    }

    var firstLoad = function() {
        // 这里不能直接在iframe的src中写链接地址，这样会导致iframe阻碍admin.html的加载 从而导致ifrma中的页面开始会有一瞬间是没有样式的！所以这里要等到admin加载完毕后再去动态加载iframe中的页面，需要特别注意
        iframe.src = 'index.html';
    }
    // 监听子页面传递过来的链接, 并改变iframe中链接
    var listenMessage = function() {
        window.addEventListener('message', function(e){
            
        }, false);
    }



    var goback = function() {
        // 返回的时候向子页面发送信息 控制子页面返回
        // iframe.contentWindow.postMessage('back', '*');
        $back.on('click', function() {
            iframe.contentWindow.postMessage('back', "*");
        });
    }
    var init = function() {
        firstLoad();
        listenMessage();
        goback();
        reload();
    }
    
    return {
        init: init,
        onload: onload
    };
})