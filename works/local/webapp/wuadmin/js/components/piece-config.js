define({
    // 版本号
    edition: 'v1.0.0',
    // 后台页面地址
    server: 'http://localhost/wuadmin/pages/',
    // 是否为pc或者手机
    ispc: function() {
        var userAgentInfo = navigator.userAgent;
            var Agents = ['Android', 'iPhone',
                'SymbianOS', 'Windows Phone',
                'iPad', 'iPod'
            ];
            var flag = true;
            for (var i = 0; i < Agents.length; i++) {
                if (userAgentInfo.indexOf(Agents[i]) != -1) {
                    flag = false;
                    break;
                }
            }
            return flag;
    }(),
    // 做好后写一个所有文件对应结构的路由文件
    /*
    index : 大类在左侧导航中的自上而下的排序
    label: 大类的名称
    href: 大类指向的链接
    son: [直属于大类中的子页面]
    list: 需要列出的子类
    list-child:[二级列表项对应的子页面]
    */
    router: [
        {   
            index: 0,
            label: "主页",
            href: "index.html",
            son: [],
            list: []
        },
        {
            index: 1,
            label: "博客",
            href: "",
            son: [],
            list: [
                {
                    text: "写文章",
                    href: "blog-editor.html",
                    child: []
                },
                {
                    text: "草稿箱",
                    href: "blog-all.html",
                    child: []
                },
                {
                    text: "所有文章", 
                    href: "blog-all.html",
                    child: []
                },
                {
                    text: "文章分类", 
                    href: "blog-category.html",
                    child: [
                        {
                            text: "新建文章分类",
                            href: "blog-category-edit.html"
                        }
                    ]
                },
                {
                    text: "推荐管理", 
                    href: "blog-recommend.html",
                    child: []
                }
            ]
        },
        {
            index: 2,
            label: "上传管理",
            href: "blog-uploaded.html",
            son: [],
            list: [],
        },
        {
            index: 3,
            label: "个人信息",
            href: "",
            son: [],
            list: [
                {
                    text: "编辑个人信息", 
                    href: "myinfo.html",
                    child: []
                },
                {
                    text: "密码修改",
                    href: "mypassword.html",
                    child: []
                },
                {
                    text: "用户名修改",
                    href: "myusername.html",
                    child: []
                }
            ]
        },
        {
            index: 4,
            label: "轮播管理",
            href: "slides-all.html",
            son: [
                {
                    text: "新建轮播",
                    href: "slides-edit.html"
                }
            ],
            list: [],
        },
        {
            index: 5,
            label: "标签管理",
            href: "tag-all.html",
            son: [
                {
                    text: "标签编辑",
                    href: "tag-edit.html"
                }
            ],
            list: [],
        },
        {
            index: 6,
            label: "站点设置",
            href: "siteinfo.html",
            son: [],
            list: []
        }

    
    ]
    // end router
    
});