//  预览类型
const PREVIEW_TYPES = {
  // 链接
  link: "link",
  // 弹窗展示图片
  pictures: "pictures",
  // 词语提示
  tips: "tips",
};
const worksData = {
  categories: [
    {
      name: "⚙️ 全栈项目 (PHP + 前端)",
      type: "fullstack",
      // 注意事项
      tips: [
        '项目列表项中凡是带有“<strong>效果演示</strong>”的链接，均为为此项目使用虚拟数据运行的版本，仅供演示使用；',
        '点击“<strong>查看</strong>”可以直达项目链接的正式地址;'
      ],
      projects: [
        {
          name: "一介武夫博客（客户端）",
          technology: ["PHP", "Smarty", "Jquery", "MySQL", "LESS"],
          link_local: "",
          link_online: "https://634174214.github.io/",
          preview: null,
          desc: "使用原生PHP实现的MVC架构模式的个人博客站点，于2021年上线运行。目前轻量化运营，已实现全站静态化，部署在github pages。",
          date: "2021-05",
        },
        {
          name: "一介武夫博客（服务端）",
          technology: ["PHP", "MySQL", "RequireJS", "Smarty", "LESS"],
          link_local: "works/local/webapp/wuadmin/index.html",
          link_online: "",
          preview: {
            type: PREVIEW_TYPES.pictures,
            text: "预览图片效果",
            pictures: [
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/admin.jpg",
                text: "后台主页",
                portrait: false
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/admin-2.jpg",
                text: "后台主页-展开菜单",
                portrait: false
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/all-blogs.jpg",
                text: "所有文章",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/article-1.jpg",
                text: "文章编辑",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/article-2.jpg",
                text: "保存文章或上传附件",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/channel.jpg",
                text: "频道分类",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/channer-edit.jpg",
                text: "频道编辑",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/message.jpg",
                text: "留言管理",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/message-1.jpg",
                text: "编辑或回复留言",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/message-2.jpg",
                text: "留言用户管理",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/recommend.jpg",
                text: "推荐管理",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/say.jpg",
                text: "我的说说",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/site.jpg",
                text: "站点设置",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/slider.jpg",
                text: "轮播管理",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/tag.jpg",
                text: "标签管理",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/trash.jpg",
                text: "文章回收站",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/uploaded.jpg",
                text: "附件管理",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/uploaded-1.jpg",
                text: "附件管理",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/user.jpg",
                text: "用户信息维护",
                portrait: false              
              },
              {
                image: "works/local/webapp/wuadmin/本机后端效果展示/htmlstatics.jpg",
                text: "全站CMS静态化",
                portrait: false              
              },
            ],
          },
          desc: "MVC架构开发的个人博客后台，支持图片/附件管理、权限管理、文章/栏目管理、留言管理及CMS静态化等功能。部署于本机，可<strong>预览图片效果</strong>或查看静态页面。",
          date: "2021-05",
        },
        {
          name: "信网智绘",
          technology: ["PHP", "Vue3", "VueX", "VolcEngine", "Konva"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/photo-smart/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/photo-smart/'
          },
          desc: "基于即梦AI构建智能绘图系统，单点登录集成至信网智能体平台，支持文生图、图生图、图生视频及AI辅助编辑。",
          date: "2025-09",
        },
        {
          name: "信网专题系统",
          technology: ["PHP", "MySql", "Vue2", "VueX", "LESS"],
          link_local: "",
          link_online: "https://www.qdxin.cn/zhuanti/cehua-index.html",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "管理后台",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/xin-zt/zt-houtai/index.php?p=2&i=1'
          },
          desc: `本专题系统部署于青岛<a href="http://172.20.65.201/xin/h5_zt_image/backend/index.php" target="_blank">信网内网</a>，不支持外网直接访问。您可通过<strong>查看</strong>链接，浏览最新专题的上线汇总页；或点击<strong>管理后台</strong>，体验本地系统。`,
          date: "2021-04",
        },
        {
          name: "信网创意海报设计与管理系统",
          technology: ["PHP", "MySQL", "Vue3", "VueX", "ElementPlus", "Less"],
          link_local: "",
          // http://sj.qdxin.cn/app/xin-card/app/
          link_online: "https://wubin.infinityfreeapp.com/my-works/works/xin-card/app/login.html", 
          preview: {
            type: PREVIEW_TYPES.pictures,
            text: "查看软著证书",
            pictures: [
              {
                image: "works/infinityfreeapp/xin-card/ruanzhu.jpg",
                text: "项目软著证书",
              },
            ]
          },
          // 信网内网 线上账号密码wu m:123
          desc: `“卡片”海报管理系统，部署于<a href="http://sj.qdxin.cn/app/xin-card/app/" target=_blank">信网内网</a>，内置多种海波模板，无需专业软件，实现快速海报图片创作。`,
          date: "2023-03",
        },
        {
          name: "信网H5图集专题系统",
          technology: ["PHP", "MySql", "Vue2", "VueX", "LESS", "Bootstrap"],
          link_local: "",
          link_online: "https://www.qdxin.cn/zhuanti/cehua-index.html",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "管理后台",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/h5_zt_image/backend/index.php'
          },
          desc: "本专题系统部署于青岛信网内网，不支持外网直接访问。您可通过<strong>查看</strong>链接，浏览最新专题的上线汇总页；或点击<strong>管理后台</strong>，体验本地系统。",
          date: "2021-01",
        },
        {
          name: "稿件审校（v2.8）",
          technology: ["PHP", "Dify", "Vue3", "VueX", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/article-check-v2.8/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/dify-article-check/?app_id=14'
          },
          desc: "基于Dify工作流，调用多个模型反复对新闻稿件进行全面内容校对，并识别其中可能存在的风险隐患。",
          date: "2025-11",
        },
        {
          name: "信网资源库（客户端）",
          technology: ["PHP", "Vue3", "VueRouter", "MySQL", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/app/store/public/html/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/qd-pics-2025/app/html'
          },
          desc: "使用瀑布流展示无版权的图片（多尺寸压缩适配各类场景）、音视频等素材，分享工作规范与技术技巧。",
          date: "2025-06",
        },
        {
          name: "信网资源库（管理端）",
          technology: ["PHP", "ElementPlus", "Vue3", "VueRouter", "MySQL", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/app/store/server/html/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/qd-pics-2025/server/html/login.html'
          },
          desc: "后台统一管理维护资源库资源包、资源项，集成打包工具，采用分片上传实现资源包上传。",
          date: "2025-07",
        },
        {
          name: "新闻配图·智能提示词",
          technology: ["PHP", "Dify", "Vue3", "VueX", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/article-photo/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/dify-article-input/?app_id=11'
          },
          desc: "基于Dify工作流与OCR技术，解析新闻标题与正文，输出适配“信网智绘”的AI绘图提示词。",
          date: "2025-11",
        },
        {
          name: "AI智案法宝（客户端）",
          technology: ["PHP", "Vue3", "VUEX", "MySQL", "LESS", "LLM"],
          link_local: "",
          link_online: "https://law.qdxin.cn/pro/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/law-ai-plus/'
          },
          desc: "依托阿里通义法睿、OpenApi farui-plus模型，单次提问即可多模型同步作答，多维度逐层深度拆解法律问题。",
          date: "2024-11",
        },
        {
          name: "AI智案法宝（管理端）",
          technology: ["PHP", "Jquery", "MySQL", "CSS", "Layui"],
          link_local: "",
          link_online: "https://law.qdxin.cn/pro/server/admin-serve/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/law-ai-plus/server/admin-serve/login.html'
          },
          desc: "AI智案法宝实行会员邀请制，本链接为系统用户管理后台演示地址，仅用于演示后台管理功能，非正式业务环境。",
          date: "2024-11",
        },
        {
          name: "“裁判文书”撰写新闻",
          technology: ["PHP", "Vue", "VueX", "Dify", "LLM", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/article-law/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/dify-article-law/'
          },
          desc: "用户提供判决书，通过Dify工作流调度多个模型分步处理，并实现全流程对话记录的存储与管理。",
          date: "2025-11",
        },
        {
          name: "稿件审校-极简版（v2.0）",
          technology: ["PHP", "Dify", "Vue3", "VueX", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/article-check/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/dify-article-check/?app_id=9'
          },
          desc: "基于Dify工作流，快速对新闻稿件进行文字校对、标题优化建议。",
          date: "2025-11",
        },
        {
          name: "新闻视觉化内容生产系统",
          technology: ["PHP", "Dify", "Vue3", "VueX", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/news-video/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/dify-article-input/?app_id=12'
          },
          desc: "基于Dify工作流以及新闻正文和核心关键词，生成视频提示词。",
          date: "2025-12",
        },
         {
          name: "新闻稿一键多平台传播生成工具",
          technology: ["PHP", "Dify", "Vue3", "VueX", "LESS"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/news-create/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/dify-article-input/?app_id=13'
          },
          desc: "基于Dify+OCR，将新闻稿件一键转化为适配微博、公众号、小红书、头条的高互动性多平台内容。",
          date: "2025-11",
        },
        {
          name: "信网智能体用户权限管理系统",
          technology: ["PHP", "‌PHPMailer", "PHP-JWT", "MySQL", "Jquery", "LayUI"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/home/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/xin-workbuddy/'
          },
          desc: "基于JWT单点登录(SSO)技术，汇总信网所有智能体应用，实现统一的用户管理与鉴权体系。",
          date: "2025-08",
        },
        {
          name: "网络纠纷人民调解委员会-AI调解员",
          technology: ["PHP", "Vue3", "VUEX", "MySQL", "LESS", "LLM"],
          link_local: "",
          link_online: "https://law.qdxin.cn/ai/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/law-ai/'
          },
          desc: "融合多平台AI技术，支持多角色调解与法律援助视角的灵活切换。基于Server-Sent Events协议，实现高效实时消息推送。",
          date: "2024-08",
        },
        {
          name: "处罚新闻视频生成",
          technology: ["PHP", "Python", "AI(TTS)", "Playwright", "VUE", "HTML/CSS", "FFmpeg", "MySQL"],
          link_local: "works/ai-h5-video/",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/h5-video/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'https://wubin.infinityfreeapp.com/my-works/works/ai-h5-video/'
          },
          desc: "网页端编辑 H5，AI合成口播语音下载，队列驱动Playwright录屏，最后由FFmpeg合成并剪裁。",
          date: "2026-02",
        },
        {
          name: "智能校稿助手",
          technology: ["PHP", "VUE", "HTML/CSS", "Dify"],
          link_local: "",
          link_online: "https://ai2hinen9t1.thexin.cn/ai/article-bianji/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'http://wubin.infinityfreeapp.com/my-works/works/article-check/'
          },
          desc: "基于DIFY工作流实现的轻量级的自助校稿功能。",
          date: "2025-02",
        },
      ]
    },
    {
      name: "📱 H5 / WebAPP",
      type: "frontend",
      tips: [],
      projects: [
        {
          name: "信网创图-智能在线设计系统",
          technology: ["ECharts", "Vue", "Html2Canvas", "VueResource"],
          link_local: "works/local/webapp/xin-ps/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "本地链接",
            href: "works/local/webapp/xin-ps/",
          },
          link_online: "https://ai2hinen9t1.thexin.cn/app/xin-ps/",
          desc: "",
          date: "2025-01",
        },
        {
          name: "青岛肺炎疫情实时数据平台",
          technology: ["ECharts", "Vue", "Html2Canvas", "VueResource"],
          link_local: "works/local/webapp/yiqing/?show",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "本地链接",
            href: "works/local/webapp/yiqing/?show",
          },
          link_online: "http://vip.qdxin.cn/h5/2020/yiqing/?show",
          desc: "",
          date: "2024-11",
        },
        {
          name: "炸鸡音乐WebAPP",
          technology: ["Vue3", "Sass", "BetterScroll", "Vuex", "LyricParser"],
          link_local: "",
          preview: "",
          link_online: "https://wubin.infinityfreeapp.com/my-works/works/qqmusic-vue3/html/",
          desc: "后端使用PHP随机从歌曲池中随机挑选音乐，组合成播放列表。",
          date: "2023-06",
        },
        {
          name: "2024制作你的春节贺卡",
          technology: ["Fabric", "Vue3", "BetterScroll"],
          link_local: "works/local/webapp/2024-spring-card/",
          preview: "",
          link_online: "https://vip.qdxin.cn/2024/card/index.html?id=spring",
          desc: "",
          date: "2023-11",
        },
        {
          name: "Vue高仿饿了么",
          technology: ["Vue2", "Stylus", "BetterScroll", "Cube-ui"],
          link_local: "works/local/h5/myself-vue-elme/?id=123",
          preview: "",
          link_online: "",
          desc: "",
          date: "2022-11",
        },
        {
          name: "信网资源",
          technology: ["Jquery", "WowJS", "Animate"],
          link_local: "works/local/web-pages/ziyuan/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "本地链接",
            href: "works/local/web-pages/ziyuan/",
          },
          link_online: "https://www.qdxin.cn/ziyuan/",
          desc: "",
          date: "2019-07",
        },
        {
          name: "信网专题",
          technology: ["Vue2", "VueRouter", "LESS", "html2canvas"],
          link_local: "https://wubin.infinityfreeapp.com/my-works/works/xin-zt/zt-houtai/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "信网专题汇总",
            href: 'https://www.qdxin.cn/zhuanti/cehua-index.html'
          },
          link_online: "https://www.qdxin.cn/special/zt-app/app/?id=545",
          desc: "信网专题系统生成的专题页面，点击“查看”即可打开已见网的2026端午专题。",
          date: "2026-06",
        },
        {
          name: "全景青岛，时尚走进生活",
          technology: ["Vue", "响应式", "LocalStorage"],
          link_local: "works/h5/vr-qd-topic/index.html",
          preview: "",
          link_online: "http://vr.qdxin.cn/topic/1904/",
          desc: "",
          date: "2019-04",
        },
        {
          name: "百年青岛沧桑巨变",
          technology: ["Jquery", "Swiper", "TwentyTwenty", "Animate"],
          link_local: "works/local/h5/qdhistory/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2019/qdhistory/",
          desc: "",
          date: "2019-05",
        },
        {
          name: "美丽青岛 迎新春",
          technology: ["Jquery", "Swiper", "HTML", "CSS"],
          link_local: "works/local/h5/meiliqd2018/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2018/meiliqd2018/",
          desc: "",
          date: "2018-02",
        },
        {
          name: "2019新春贺卡",
          technology: ["html2canvas", "CreateJS", "JS", "Animate"],
          link_local: "works/local/h5/newyear2019/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2019/newyear2019/",
          desc: "",
          date: "2019-01",
        },
        {
          name: "2019世界工业设计大会",
          technology: ["Jquery", "Swiper", "Animate", "AosJs"],
          link_local: "works/local/h5/yantaidesign1016/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2019/yantaidesign1016/",
          desc: "",
          date: "2019-10",
        },
        {
          name: "新房装修 旧房改造-海尔三翼鸟",
          technology: ["Jquery", "Swiper", "Layer", "Waypoints"],
          link_local: "works/local/h5/haier/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2021/haier/",
          desc: "",
          date: "2021-04",
        },
        {
          name: "青岛辟谣2019年度总结",
          technology: ["Jquery", "CreateJS", "Animate", "BetterScroll"],
          link_local: "works/local/h5/piyao2019/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2019/piyao2019/",
          desc: "",
          date: "2019-12",
        },
        {
          name: "让市民喝上放心水",
          technology: ["Jquery", "Swiper", "CreateJS"],
          link_local: "works/local/h5/qdwater/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2019/qdwater/",
          desc: "",
          date: "2019-08",
        },
        {
          name: "2020信网线上房展",
          technology: ["Krpano", "Jquery", "BetterScroll", "Animate", "ScrollmeJS"],
          link_local: "works/local/h5/qdfangzhan0303/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2020/qdfangzhan0303/",
          desc: "",
          date: "2020-04",
        },
        {
          name: "315维权快报-海报图片合成器",
          technology: ["VUE2", "Html2Canvas", "CSS3"],
          link_local: "works/local/webapp/sale-card/",
          preview: "",
          link_online: "works/local/webapp/sale-card/",
          desc: "",
          date: "2022-03",
        },
        {
          name: "崂山城区·城载人文",
          technology: ["Krpano", "Jquery", "SoundJS", "PreloadJS"],
          link_local: "works/local/h5/lsvideovr/",
          preview: "",
          link_online: "http://vr.qdxin.cn/18/lsvideovr/",
          desc: "VR项目",
          date: "2018-06",
        },
        {
          name: "青医医疗队出征宣言",
          technology: ["Jquery", "Swiper", "CreateJS"],
          link_local: "works/local/h5/qingyi0207/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2020/qingyi0207/",
          desc: "",
          date: "2020-02",
        },
        {
          name: "青岛文化产业园全景地图",
          technology: ["Krpano", "Jquery", "CreateJS", "WowJS", "ScrollmeJS"],
          link_local: "works/local/h5/map-vr-1905/",
          preview: "",
          link_online: "http://vr.qdxin.cn/topic/map-vr-1905/",
          desc: "",
          date: "2019-05",
        },
        {
          name: "西海岸新区三周年连环画",
          technology: ["Bookmark", "Jquery"],
          link_local: "works/local/h5/ephoto/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2018/ephoto/index/",
          desc: "",
          date: "2019-12",
        },
        {
          name: "预见2020年的胶州(hype制作)",
          technology: ["Hype", "Jquery"],
          link_local: "works/local/h5/jzh5-2020-17/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2017/jzh5-2020-17/",
          desc: "",
          date: "2018-05",
        },
        {
          name: "怡善青岛 脱贫攻坚",
          technology: ["Jquery", "Swiper", "CreateJS"],
          link_local: "works/local/h5/qdcharity/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2019/qdcharity/",
          desc: "",
          date: "2019-08",
        },
        {
          name: "青岛三医90年发展足迹VR展",
          technology: ["Krpano", "VUE2", "WowJS", "Animate"],
          link_local: "works/local/h5/sanyi-history/",
          preview: "",
          link_online: "http://vr.qdxin.cn/topic/sanyi-history/",
          desc: "",
          date: "2021-07",
        },
        {
          name: "黄岛新区成立3周年连环画",
          technology: ["Jquery", "Bookmark"],
          link_local: "works/local/h5/huangdao/",
          preview: "",
          link_online: "http://vip.qdxin.cn/vip/anli/pro/huangdao/",
          desc: "",
          date: "2022-04",
        },
        {
          name: "在路上 他们最美",
          technology: ["Jquery", "Bookmark"],
          link_local: "works/local/h5/onload/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2018/onroad/",
          desc: "",
          date: "2018-06",
        },
        {
          name: "青岛崂山区旅游指南",
          technology: ["Jquery", "Swiper", "WowJS", "Animate"],
          link_local: "works/local/h5/lshandbook/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2018/lshandbook/",
          desc: "",
          date: "2018-07",
        },
      ],
    },
    {
      name: "🟩 APP / 小程序 / 公众号开发",
      type: "app",
      tips: [],
      projects: [
        {
          name: "信号新闻App",
          technology: ["uni-app", "Vue"],
          link_local: "works/local/web-pages/xinhaoapp/",
          preview: "",
          link_online: "",
          // link_online: "https://github.com/634174214/resume/tree/main/download",
          desc: "",
          date: "2022-06",
        },
        {
          name: "信网资讯小程序",
          technology: ["WXML", "WXSS", "ES6"],
          link_local: "works/local/wx-xcx/index.html",
          preview: {
            type: PREVIEW_TYPES.pictures,
            text: "扫码查看",
            pictures: [
              {
                image: "works/local/wx-xcx/5-xinnewsmini-qr.jpg",
                text: "微信小程序二维码",
                portrait: true
              },
              {
                image: "works/local/wx-xcx/5-xinnewsmini.jpg",
                text: "效果预览",
                portrait: false
              }
            ],
          },
          link_online: "",
          desc: "",
          date: "2019-09",
        },
        {
          name: "青岛网络辟谣平台小程序",
          technology: ["WXML", "WXSS", "ES6"],
          link_local: "works/local/wx-xcx/index.html",
          preview: {
            type: PREVIEW_TYPES.pictures,
            text: "扫码查看",
            pictures: [
              {
                image: "works/local/wx-xcx/5-piyaomini-qr.jpg",
                text: "微信小程序二维码",
                portrait: true
              },
              {
                image: "works/local/wx-xcx/5-piyaomini.jpg",
                text: "效果预览",
                portrait: false
              }
            ],
          },
          link_online: "",
          desc: "",
          date: "2020-05",
        },
        {
          name: "微尘公益基金小程序",
          technology: ["WXML", "WXSS", "ES6"],
          link_local: "works/local/wx-xcx/index.html",
          preview: {
            type: PREVIEW_TYPES.pictures,
            text: "扫码查看",
            pictures: [
              {
                image: "works/local/wx-xcx/5-weichenmini-qr.jpg",
                text: "微信小程序二维码",
                portrait: true
              },
              {
                image: "works/local/wx-xcx/5-weichenmini.jpg",
                text: "效果预览",
                portrait: false
              }
            ],
          },
          link_online: "",
          desc: "",
          date: "2019-12",
        },
        // {
        //   name: "瑞源兴微信商城（前后台）",
        //   technology: ["Jquery", "WE-UI", "HTML", "CSS3"],
        //   link_local: "",
        //   preview: "",
        //   link_online: "http://mp2.qdxin.cn/ps/ryx/index.php",
        //   desc: "",
        //   date: "2018",
        // },
        {
          name: "信新相映积分商城",
          technology: ["Jquery", "HTML", "CSS3", "PHP", "MYSQL"],
          link_local: "works/local/web-pages/xinxin-xiangying/client/",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "效果演示",
            href: 'works/local/web-pages/xinxin-xiangying/client/'
          },
          // link_online: "http://mp2.qdxin.cn/gongyi/change.php",
          link_online: "",
          desc: "信网信新相映公益平台积分兑换业务已关闭。您可通过<strong>效果演示</strong>浏览该功能历史页面效果，演示仅作展示，无法进行积分兑换操作。",
          date: "2019-06",
        },
        {
          name: "信新相映积分商城（用户后台）",
          technology: ["Jquery", "WE-UI", "PHP", "MYSQL"],
          link_local: "",
          preview: {
            type: PREVIEW_TYPES.pictures,
            text: "预览效果截图",
            pictures: [
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/用户后台主页.jpg?t=1",
                text: "用户后台主页",
                // 如果图像是竖幅 带着这个
                portrait: true
              },
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/活动报名.jpg",
                text: "用户后台-活动报名",
                portrait: true
              },
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/活动报名-活动详情.jpg",
                text: "用户后台-活动报名-活动详情",
                portrait: true
              },
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/活动报名-个人报名.jpg",
                text: "用户后台-活动报名-个人报名",
                portrait: true
              },
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/活动报名-领队报名.jpg",
                text: "用户后台-活动报名-领队报名",
                portrait: true
              },
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/积分记录.jpg",
                text: "用户后台-积分记录",
                portrait: true
              },
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/往期活动.jpg",
                text: "用户后台-往期活动",
                portrait: true
              },
              {
                image: "works/local/web-pages/xinxin-xiangying/user-manager/积分规则.jpg",
                text: "用户后台-积分规则",
                portrait: true
              },
            ],
          },
          link_online: "http://mp2.qdxin.cn/gongyi/index.php",
          desc: "信新相映服务平台为用户邀请制，需要通过系统管理后台赋予用户访问权限。您可以通过<strong>预览效果截图</strong>了解系统功能。",
          date: "2019-06",
        },
        {
          name: "信新相映积分商城（管理后台）",
          technology: ["Jquery", "PHP", "MYSQL"],
          link_local: "works/local/web-pages/xinxin-xiangying/admin/",
          preview: "",
          link_online: "",
          desc: "该管理后台部署于信网内网，外部无法访问。此处为纯前端页面效果，仅供效果演示。",
          date: "2019-06",
        },
      ],
    },
    {
      name: "🎮 游戏开发",
      type: "game",
      tips: [],
      projects: [
        {
          name: "辟谣游戏:动动手指,粉碎涉青谣言!",
          technology: ["Jquery", "PaceJS", "TweenMax", "BetteroScroll"],
          link_local: "works/local/h5-game/piyao-yiqing/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2022/piyao-yiqing/",
          desc: "手写实现的 2048 核心逻辑，包含动画过渡和本地最高分记录。",
          date: "2022-04",
        },
        {
          name: "迎新春，接金币游戏",
          technology: ["Jquery", "Preloadjs"],
          link_local: "works/local/h5-game/games/get-jb/",
          preview: "",
          link_online: "http://vip.qdxin.cn/vip/anli/pro/xin-games/games/jie-jb/",
          desc: "",
          date: "2021-10",
        },
        {
          name: "来高新区秒变亿万富翁吧！",
          technology: ["Jquery", "PaceJS", "TweenMax"],
          link_local: "works/local/h5-game/games/touzi/",
          preview: "",
          link_online: "http://vip.qdxin.cn/vip/anli/pro/xin-games/games/touzi/",
          desc: "",
          date: "2021-09",
        },
        {
          name: "奔向苏宁不能停",
          technology: ["Jquery", "Preloadjs", "HTML", "CSS"],
          link_local: "works/local/h5-game/games/paoku25/",
          preview: "",
          link_online: "http://vip.qdxin.cn/vip/anli/pro/xin-games/games/paoku26/",
          // http://act.qd.sina.com.cn/8815/mobile
          // http://act.qd.sina.com.cn/8318/mobile?from=timeline&isappinstalled=0
          desc: "",
          date: "2021-09",
        },
        {
          name: "全民射嫦娥",
          technology: ["Jquery", "TransitionJS","HTML", "CSS"],
          link_local: "works/local/h5-game/games/change/",
          preview: "",
          link_online: "http://vip.qdxin.cn/vip/anli/pro/xin-games/games/change/",
          desc: "",
          date: "2021-09",
        },
      ],
    },
    {
      name: "💻 网站 / 专题",
      type: "website",
      tips: [],
      projects: [
        {
          name: "信网-pc版主站",
          technology: ["Jquery", "HTML5", "CSS3", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "https://www.qdxin.cn/",
          desc: "",
          date: "2014-10",
        },
        {
          name: "信网-手机版",
          technology: ["Jquery", "Swiper", "Bootstrap", "HTML5", "CSS3", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "https://m.qdxin.cn/",
          desc: "",
          date: "2014-10",
        },
        {
          name: "信网-青岛辟谣",
          technology: ["Jquery", "HTML5", "CSS3", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "http://piyao.qdxin.cn/",
          desc: "",
          date: "2015",
        },
        {
          name: "信网视频频道（手机版）",
          technology: ["VUE3", "Xgplayer", "BetterScroll", "Swiper"],
          link_local: "",
          preview: "",
          link_online: "https://v.qdxin.cn/video-fs/?id=613",
          desc: "建议使用手机查看。",
          date: "2023-07",
        },
        {
          name: "信网房产频道",
          technology: ["Jquery", "HTML5", "CSS3", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "https://house.qdxin.cn/",
          desc: "",
          date: "2014-10",
        },
        {
          name: "信网直播频道",
          technology: ["Jquery", "VideoJS", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "http://live.qdxin.cn/",
          desc: "",
          date: "2015-05",
        },
        {
          name: "信网-信新相映",
          technology: ["Jquery", "HTML5", "CSS3", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "http://gongyi.qdxin.cn/",
          desc: "",
          date: "2016",
        },
        {
          name: "信网-党建频道", // 党建频道
          technology: ["Jquery", "HTML5", "CSS3", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "http://dangjian.qdxin.cn/",
          desc: "",
          date: "2015",
        },
        {
          name: "青岛信法网",
          technology: ["Jquery", "HTML5", "CSS3", "PHPCMS"],
          link_local: "",
          preview: "",
          link_online: "http://law.qdxin.cn/",
          desc: "",
          date: "2015",
        },
        {
          name: "网事如歌专题",
          technology: ["Jquery", "HTML5", "CSS3"],
          link_local: "",
          preview: "",
          link_online: "http://www.qdxin.cn/special/2016/0509qdgoodstory/",
          desc: "",
          date: "2014",
        },
        {
          name: "发现青岛数字版",
          technology: ["Jquery", "HTML5", "CSS3"],
          link_local: "",
          preview: "",
          link_online: "http://faxian.qdxin.cn/",
          desc: "",
          date: "2014",
        },
        {
          name: "信网VR频道",
          technology: ["Jquery", "HTML5", "CSS3"],
          link_local: "",
          preview: "",
          link_online: "http://vr.qdxin.cn/",
          desc: "",
          date: "2018",
        },
        {
          name: "信新相映大数据可视化平台",
          technology: ["Jquery", "Bootstrap", "Echarts", "Swiper"],
          link_local: "works/local/web-pages/xinxindata/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2020/xinxindata/",
          desc: "",
          date: "2020-05",
        },
        {
          name: "信网传播力",
          technology: ["Jquery", "WowJS", "HTML", "CSS"],
          link_local: "works/local/web-pages/chuanboli/",
          preview: "",
          link_online: "http://www.qdxin.cn/about/chuanboli/",
          desc: "",
          date: "2023-08",
        },
        {
          name: "信网新闻专题模板",
          technology: ["Jquery", "ScrollTo", "Swiper"],
          link_local: "works/local/web-pages/xin-zt-huizong/zt/",
          preview: "",
          link_online: "",
          desc: "",
          date: "2021",
        },
        {
          name: "信网新闻专题-生成工具",
          technology: ["VUE2", "Sortable", "VueDraggable"],
          link_local: "works/local/web-pages/xin-zt-huizong/tool/",
          preview: "",
          link_online: "",
          desc: "",
          date: "2021",
        },
        {
          name: "瞰青岛 改革开发40年",
          technology: ["Jquery", "Animate", "HTML", "CSS"],
          link_local: "works/local/web-pages/seeqd1225/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2018/seeqd1225/",
          desc: "",
          date: "2018-12",
        },
        {
          name: "信网投票系统客户端",
          technology: ["VUE3", "vueRouter", "BetterScroll", "VueScrollTo"],
          link_local: "works/local/web-pages/toupiao/?id=1",
          preview: "",
          link_online: "",
          desc: "仅展示客户端页面效果。",
          date: "2022",
        },
        {
          name: "辟谣信号站 | 专题",
          technology: ["Jquery", "AosJS", "HTML", "CSS"],
          link_local: "works/local/web-pages/piyao-huizong/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2023/piyao-huizong/index.html",
          desc: "",
          date: "2023-11",
        },
        {
          name: "文明出行我践行 信用市南 | 专题",
          technology: ["Jquery", "WowJS", "MoJS", "Jquery.transform"],
          link_local: "works/local/web-pages/wenming/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2023/wenming/",
          desc: "",
          date: "2023-03",
        },
        {
          name: "青岛文明细节",
          technology: ["Jquery", "HTML", "CSS"],
          link_local: "works/local/web-pages/qdwenming/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2018/qdwenming/",
          desc: "",
          date: "2018-12",
        },
        {
          name: "喜迎二十大 翰墨颂党恩 | 专题",
          technology: ["Jquery", "HTML", "CSS"],
          link_local: "works/local/web-pages/xin-huazhan0929/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2022/xin-huazhan0929/",
          desc: "",
          date: "2022-08",
        },
        {
          name: "2021青岛年度总结 | 专题",
          technology: ["Jquery", "HTML", "CSS"],
          link_local: "works/local/web-pages/2021zongjie/",
          preview: "",
          link_online: "http://vip.qdxin.cn/h5/2022/2021zongjie/",
          desc: "",
          date: "2024-08",
        },
        {
          name: "信网2020年终总结 | 专题",
          technology: ["Jquery", "AosJS", "HTML", "CSS"],
          link_local: "works/local/web-pages/xfinal2020/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2021/xfinal2020/",
          desc: "",
          date: "2020-12",
        },
        {
          name: "信网2019年终总结 | 专题",
          technology: ["Jquery", "AosJS", "HTML", "CSS"],
          link_local: "works/local/web-pages/xfinal2019/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2020/xfinal2019/",
          desc: "",
          date: "2020-01",
        },
        {
          name: "信网实时直播（回放）",
          technology: ["Jquery", "VideoJS", "HTML5", "CSS"],
          link_local: "",
          preview: "",
          link_online: "http://mp.qdxin.cn/public/xwqmt/live/html/104.html",
          desc: "",
          date: "2015",
        },
        {
          name: "青岛市乐队网络大赛 | 专题",
          technology: ["HTML", "CSS"],
          link_local: "works/local/web-pages/web-music/",
          preview: "",
          link_online: "",
          desc: "",
          date: "2017",
        },
        {
          name: "信新相映公益服务 | 专题",
          technology: ["Jquery", "modernizr", "Bootstrap", "Popper", "waypoints"],
          link_local: "works/local/web-pages/gongyi0413/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2020/gongyi0413/",
          desc: "",
          date: "2020-04",
        },
        {
          name: "中国院子网",
          technology: ["Jquery", "CreateJS", "HTML", "CSS"],
          link_local: "works/local/web-pages/china-yuanzi/start.html",
          preview: "",
          link_online: "http://vip.qdxin.cn/vip/anli/pro/chinayz/start.html",
          desc: "",
          date: "2022-08",
        },
        {
          name: "微尘公益官网",
          technology: ["Jquery", "HTML", "CSS"],
          link_local: "works/local/web-pages/weichen/1-主页.html",
          preview: {
            type: PREVIEW_TYPES.link,
            text: "本地演示",
            href: 'works/local/web-pages/weichen/1-主页.html'
          },
          link_online: "https://www.weichenfoundation.com/",
          desc: "",
          date: "2021",
        },
        {
          name: "信网智库",
          technology: ["Jquery", "HTML", "CSS"],
          link_local: "works/local/web-pages/xin-doc/登录.html",
          preview: "",
          link_online: "",
          desc: "",
          date: "2022",
        },
        {
          name: "青岛演艺集团官方网站",
          technology: ["Jquery", "HTML", "CSS"],
          link_local: "works/local/web-pages/qdyanyi/",
          preview: "",
          link_online: "http://www.qdyyjt.com/",
          desc: "",
          date: "2022-11",
        },
        {
          name: "信网一代一路频道主页",
          technology: ["Jquery", "HTML", "CSS"],
          link_local: "works/local/web-pages/yidaiyilu0609/",
          preview: "",
          link_online: "http://vip.qdxin.cn/2018/yidaiyilu0609/",
          desc: "",
          date: "2018-06",
        },
      ],
    },
  ],
};
