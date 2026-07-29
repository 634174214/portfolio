// 投资列表
window.listData = [
    {
        'img': 'item-img1.png',
        'detail': 'item-detail1.png',
        'name': '青岛卫校出现阳性病例？',
        'intro': '3月10日，有网传青岛卫校不实涉疫信息。对此，青岛卫生学校3月10日发布声明，目前，学校教学秩序正常，未发生此类情况。请网民朋友时刻保持高度警惕，持续关注官方发布的权威信息，不信谣、不传谣、不造谣。',
        'price': 2,
        'pyimage': ''
    }, {
        'img': 'item-img2.png',
        'detail': 'item-detail2.png',
        'name': '网传"青岛今晚12时封城"？',
        'intro': '3月15日上午，有关“青岛今晚12时封城”的信息在网上流传，经核实，该信息不属实。目前，青岛疫情防控形势趋稳，生活必需品价格平稳，货源供应充足。请大家关注官方发布渠道，切勿听信小道消息，做到不造谣不信谣不传谣。',
        'price': 1,
        'pyimage': 'p-2.jpg'
    }, {
        'img': 'item-img3.png',
        'detail': 'item-detail3.png',
        'name': '网传“青岛农贸市场关闭”？',
        'intro': '3月15日上午，有关“青岛要关闭农贸市场”的信息在网上流传，记者从市市场监管局了解到，该信息不属实。目前，青岛农贸市场(莱西除外)正常经营。请大家关注官方发布渠道，切勿听信小道消息，做到不造谣不信谣不传谣。',
        'price': 1,
        'pyimage': ''
    }, {
        'img': 'item-img4.png',
        'detail': 'item-detail4.png',
        'name': '不做核酸检测手机变黄码？',
        'intro': '3月15日晚上，有关“今天核酸不检测，明天手机变黄码!”的信息在网上流传。经向胶州市疾控中心核实，该信息不属实，变成黄色的主要人群不包括未做核酸检测的。',
        'price': 1,
        'pyimage': ''
    },
    {
        'img': 'item-img5.png',
        'detail': 'item-detail5.png',
        'name': '网传“城阳区中小学疫情期间返校通知”？',
        'intro': '3月16日，经城阳区网信部门监测，发现有网民以“青岛市城阳区教育体育局”名义在网络发布《关于城阳区中小学疫情期间返校通知》的信息。此信息不属实，城阳区教育和体育局已报公安机关调查处理。在此提醒广大市民，疫情期间所有教学活动安排均以官方发布为准。',
        'price': 1,
        'pyimage': 'p-5.jpg'

    }, {
        'img': 'item-img6.png',
        'detail': 'item-detail6.png',
        'name': '“市政府会议精神”列举社会秩序恢复正常时间表？',
        'intro': '3月16日，一则关于“市政府会议精神”的信息在社交媒体流传。文中列举了一个社会秩序恢复正常的时间表，包括“3月16日居民出行正常化”“4月6日大中学开学”“4月20日起，剧院、电影院营业”，等等。经核实，此信息不属实，为谣言。经查询发现，该版本谣言之前在多地都出现过，各地曾专门辟谣。',
        'price': 1,
        'pyimage': 'p-6.jpg'
    }, {
        'img': 'item-img7.png',
        'detail': 'item-detail7.png',
        'name': '不进行核酸检测3月18日后取消免费资格？',
        'intro': '3月18日，一段声称“不能提供三轮全员核酸检测依据的人员，3月18日后取消其核酸检测免费资格，不能进入超市等公共场所;对于年龄超过60周岁的漏检人员，将取消市本级社会福利待遇半年……”的视频在青岛流传，经核实，青岛目前没有这些规定。网传内容系部分自媒体平台将其他省市的疫情防控规定移花接木至青岛。',
        'price': 1,
        'pyimage': 'p-7.jpg'
    }, {
        'img': 'item-img8.png',
        'detail': 'item-detail8.png',
        'name': '青岛中医医院张芳芳劳累过度去世？',
        'intro': '3月19日，一段视频在网上流传，内容称“山东青岛中医院张芳芳连续战疫九天劳累过度，心脏骤停，全力医治无效离开我们而去，留下两个年幼的孩子。”经青岛海慈医疗集团检索核实，集团现有员工中没有名为张芳芳的职工，更没有职工牺牲。目前，青岛海慈医疗集团已经报警，警方正在处理。',
        'price': 1,
        'pyimage': 'p-8.jpg'
    },
    {
        'img': 'item-img9.png',
        'detail': 'item-detail9.png',
        'name': '3月26日莱西市解封？',
        'intro': '3月21日，莱西市疫情防控工作指挥部发布辟谣通告，经莱西市网信部门监测，发现有网民在网上传播莱西市封控区核酸检测及城区解封等信息。经核实，该信息不属实，公安部门已经依法开展调查。',
        'price': 1,
        'pyimage': 'p-9.jpg'
    }
];

var isMobile = false;
// 检测userAgent
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
    document.addEventListener("touchmove", function (e) {
        e.preventDefault();
    }, { passive: false });
}

