// 投资列表
window.listData = [
    {
        'img': 'item-img1.png',
        'detail': 'item-detail1.png',
        'name': '四新企业',
        'intro': '市筑梦新区以新技术、新业态、新模式、新产业“四新经济”为主攻方向，开放包容，打造创新创业新平台、产业引导新基地、经济发展新引擎，引领、服务全市经济发展。',
        'price': 3
    }, {
        'img': 'item-img2.png',
        'detail': 'item-detail2.png',
        'name': '新能源汽车',
        'intro': '市经开区各项顶层设计加快推进，三期15平方公里基础设施实现“七通一平”，江淮新能源汽车产销量居全国前列，富士康五轴车铣复合加工机批量生产并填补了国内空白，赛富环新电池包项目建成投产，跃迪新能源汽车产业园开工建设。安庆市已出台《持新能源汽车产业发展和推广应用若干政策》，全力支持新能源汽车产业发展。',
        'price': 3
    }, {
        'img': 'item-img3.png',
        'detail': 'item-detail3.png',
        'name': '医药医工和化工新材料',
        'intro': '市高新区实施体制机制创新，加快公共科技服务平台建设，聘请国内顶级科研院所编制产业发展指南，成功创建国家级高新区。医工医药产业：成立股权投资基金和创新人才奖励基金，建成安庆生物医药创新中心、生物医药分析检测等公共平台，积极承接安庆石化百亿元的炼油结构调整及化工新材料项目，',
        'price': 3
    }, {
        'img': 'item-img4.png',
        'detail': 'item-detail4.png',
        'name': '科技孵化企业',
        'intro': '发挥企业创新主体地位，完善政产学研合作机制，逐步建成企业主导、政府服务、高校院所高效协同的创新体系。围绕我市重点发展的新能源、新材料、智能制造等产业，建设创新研发平台，加强知识产权保护，促进科技成果加速转化。',
        'price': 2
    },
    {
        'img': 'item-img5.png',
        'detail': 'item-detail5.png',
        'name': '新业态示范企业',
        'intro': '探索、培育、提供可复制的新型业态。支持各类主体来新区创新创业。依托“互联网+”产业创新工程，推进移动互联网、云计算、物联网等技术在生产领域深度融合，吸引更多数字创意等产业领域人员来园创新创业，培育新业态、发展新模式。',
        'price': 2
    }, {
        'img': 'item-img6.png',
        'detail': 'item-detail6.png',
        'name': '总部经济区',
        'intro': '围绕战略性新兴产业要求，结合我市产业新体系建设需要，挖掘优质项目和企业，综合运用多种手段，借助多方力量，培育本土优质企业、支持市外企业总部搬迁至新区，力争形成总部经济区。',
        'price': 2
    }, {
        'img': 'item-img7.png',
        'detail': 'item-detail7.png',
        'name': '金融服务创新区',
        'intro': '吸引银行、证券、基金、融资租赁等各类金融机构及会计师事务所、律师事务所等各类服务机构入驻新区，综合运用天使投资、创业投资基金、产业基金、债券、融资担保、上市等多种金融方式支持新区企业发展。利用金九条支持全市产业发展。',
        'price': 2
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

