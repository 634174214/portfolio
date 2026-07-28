var manifest = [
            "img/1-taipings.png",
            "img/10-yz.png",
            "img/11-aomen.png",
            "img/12-fushan.png",
            "img/13-jiaodong.png",
            "img/2-laoshan.png",
            "img/3-yaner.png",
            "img/4-xiaoyu.png",
            "img/5-xiaomai.png",
            "img/6-xianggang.png",
            "img/7-zhongyang.png",
            "img/8-taiplu.png",
            "img/9-taipj.png",
            "img/bird-1.png",
            "img/bird-2.png",
            "img/bird-3.png",
            "img/boat-bg.png",
            "img/ch-bg.png",
            "img/cloud-1.png",
            "img/dialog-top - bak.png",
            "img/dialog-top.png",
            "img/en-bg-1.png",
            "img/en-bg-2.png",
            "img/fashion-ch.png",
            "img/fashion-en.png",
            "img/header-bg-bottom.png",
            "img/hill-1.png",
            "img/hill-11.png",
            "img/hill-2.png",
            "img/man.png",
            "img/no-play1.png",
            "img/playing1.gif",
            "img/title-1.png",
            "img/title-2.png",
            "img/vr-bg-bottom.png",
            "img/vr-bg-top.png",
            "img/vr-bg.png",
            "img/vr-cloud-1.png",
            "img/vr-cloud-2.png",
            "img/vr-title1.png",
            "img/share.jpg",
            "img/vr-title2.png"
];
console.log(t_pic)
var dialog = $('#dialog'),
    dialogClose = $('#dialogclose'),
    dialogArticle = $('#dialog article');
var article_ch = [
  '胶州湾畔、黄海之滨，镶嵌着一颗璀璨的明珠——青岛。这里依山傍海、风景秀丽，蜿蜒曲折的海岸线、风格各异的万国建筑，透出绰约典雅的迷人风姿，被誉为“东方瑞士”欧韵之都，被联合国评为最适合人类居住的城市之一。',
  '这个因海而生、向海而兴、以岛命名的城市，身上闪耀着诸多光环：首批沿海开放城市、计划单列市、副省级城市、国家沿海重要中心城市、“一带一路”双节点城市、滨海度假旅游城市、国际性港口城市、国家历史文化名城、帆船之都、啤酒之城、电影之都、文明城市、品牌之都……',
  '2018年6月，举世瞩目的上海合作组织首脑峰会在青岛举办。世界水准、中国气派、山东风格、青岛特色，峰会获得圆满成功，展示了青岛开放的胸襟，赢得了世界的赞誉。习近平总书记对山东以及青岛的发展提出了殷切的希望并作出重要指示。',
  '2019年4月23日，庆祝人民海军成立70周年海上阅兵活动在青岛举行。习近平总书记再一次来到青岛，并提出了构建海洋命运共同体，为维护海上安全稳定、推进全球海洋治理提供了中国智慧和方案。',
  '“办好一次会，搞活一座城”，青岛正按照总书记的要求，打造对外开放新高地，建设对外开放桥头堡，立体、综合、全方位地搞活一座城，向着开放、现代、活力、时尚的国际大都市奋力奔跑。',
  '青岛，欧陆风情的历史风貌，温润宜人的海洋性气候，旖旎多姿的自然景观，丰厚多彩的人文底蕴，令这座城市洋溢着时尚而又浪漫的独特风情。',
  '在青岛，曾经诞生过多个中国第一：开办了中国人经营的第一家电影院，上映了中国第一部有声影片，是中国第一个有汽车的城市，建设了中国第一条公路，生产出了中国第一台火车机车和第一瓶矿泉水，成立了中国第一个帆船俱乐部，建设了亚洲第一个海洋馆等等。',
  '多元文化在这里交融、创新思想在这里碰撞、智能科技在这里集聚，构筑起充满生机、开放进取、品质卓越的时尚之城。',
  '己亥新春，《流浪地球》和《疯狂的外星人》两部登顶贺岁电影票房榜的现象级国产科幻电影横空出世，它们共同的置景拍摄地——青岛成为焦点。2017年，青岛获评联合国教科文组织“世界电影之都”，打造了全球最大全产业链影视基地。',
  '时尚是生产方式，也是一种生活方式。在青岛，国际时装周、国际啤酒节、国际管乐艺术节、国际帆船周、海上马拉松等大型活动每年轮番上演，让这个城市处处弥漫着时尚气息。',
  '青岛，建设国际时尚城的大幕正徐徐开启，时尚正在走进生活。时尚青岛，呼之欲出。'
];
var article_en = [
  'Qingdao,  is a city in eastern Shandong Province on the east coast of China. It is a city specifically designated in the state plan, a megacity, a sub-provincial city, the economic center of Shandong Province, a coastal important central city of China, a coastal city for resort and tourism, an international port city, an important pilot zone for development of modern marine industry of China, an international shipping hub of Northeast Asia, a marine sports base, a main hub in the economic corridor of New Eurasian Land Bridge of “the Belt and Road” and a pivot of marine cooperation strategy.',
  'Qingdao is located on the southeast coast of Shandong Peninsula, in the east of Jiaodong Peninsula and in the frontal zone of China-Japan-South Korea free trade area. It borders on Yellow Sea, facing Korean Peninsula across the sea, adjacent to Yantai in the northeast, connected to Weifang in the west and neighboring Rizhao in the southwest. It has a total area of 11,282 square kilometres, administering 7 districts and managing 3 county-level cities. In 2017, its total number of permanent residents was 9,290,500 and its total regional GDP was 1,103,728,000,000 Yuan.',
  'Qingdao is the host city of sailing races of 2008 Beijing Olympic Games and of the 13th Paralympic Games, known as the Sailing City of China, the Best Sailing City of Asia, the World Beer City, the “Cinema City” of the United Nations, one of the first coastal open-up cities of China, the National Civilized City, one of the Happiest Cities of China. It also won the reputations of the European-style city as “the Oriental Swiss” and “the City of Brands of China”. ',
  'Qingdao is an international marine scientific research and education center where reside 26 universities such as Shandong University , Ocean University of China, China University of Petroleum. Another 29 universities such as Tsinghua University and Peking University have been introduced into Qingdao. There are diversified exotic-style architectures in Qingdao, so it is called “the Universal Exposition of Architectures”. The architectural complex in Eight Great Passes was awarded the title of “the Most Beautiful Urban Area of China”. '
];
// id:元素id class：要添加的animate动画样式 delay:动画延迟时间
var headerAni = [
    {'id':'cloud', 'class':'fadeInLeft', 'delay':'1s'},
    {'id':'birdone', 'class':'fadeInUp', 'delay':'0.5s'},
    {'id':'man', 'class':'fadeInLeft', 'delay':'0.2s'},
    {'id':'Ftitle', 'class':'fadeInRight', 'delay':'0.2s'},
    {'id':'title', 'class':'flipInY', 'delay':'0s'},
    {'id':'headerbg', 'class':'fadeInUp', 'delay':'0.5s'},
    {'id':'chtitle', 'class':'fadeInDown', 'delay':'0.5s'},
    {'id':'hill', 'class':'fadeInUp', 'delay':'0s'}
];

function dialogMes(btnClass,btnText,articleContent) {
  this.btnClass = btnClass;
  this.btnText =btnText;
  this.articleContent = articleContent;
}
var dialogMes_ch = new dialogMes('dch', '返回', article_ch);
var dialogMes_en = new dialogMes('den', 'HOME', article_en);

function rem(doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            };

          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
 }

 // 判断手机/PC
 function IsPC() {
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
 }
 function detect(){
        var equipmentType = "";
        var agent = navigator.userAgent.toLowerCase();
        var android = agent.indexOf("android");
        var iphone = agent.indexOf("iphone");
        var ipad = agent.indexOf("ipad");
        if(android != -1){
            equipmentType = "android";
        }
        if(iphone != -1 || ipad != -1){
            equipmentType = "ios";
        }
        return equipmentType;
}

$( 'audio' ).audioPlayer(); //启动插件
if (IsPC()) {
    $('html').addClass('isPC');
} else {
    rem(document, window);
    if (detect() == 'ios') {
       // setaudioplayerBar();
       $('.audioplayer-bar').css('width','73%');
    }
}

var queue = new createjs.LoadQueue(true);
queue.on("progress", handleFileLoad);//加载进度 
queue.on("complete", handleComplete);//加载完成
queue.loadManifest(manifest);//加载的列表
function handleFileLoad(e){
    var bnum=parseInt(queue.progress*100);
    $("#loading i").html(bnum+"%");
    $("#loading cite").width(bnum+'%');
}
function handleComplete(){
     $("#loading").fadeOut('slow');
     addAniClass(animateEnded); // addAniClass函数执行完执行回调函数animateEnded判断动画是否执行完毕
}

// 给顶部添加样式
function addAniClass(callback) {
  $.each(headerAni,function(index,item){
    // console.log(item.id)
    $('#' + item.id).css({ //设置延迟时间
      'animation-delay': item.delay,
      '-webkit-animation-delay': item.delay
    });
    $('#' + item.id).addClass('animated ' + item.class);
    callback(item); // 回调函数执行animateEnded（）并传入headerAni的每个｛...｝
  });
}
// removeAttr移除多个属性('id class')
// 检测动画是否执行完毕 完毕删除添加的样式以及style
function animateEnded(obj) {
  // console.log(obj)
  // 这里注意多个样式如animated后面要有空格！！
  // WebkitAnmationEnd 和 animationed
  $('#' + obj.id).on('webkitAnimationEnd',function(){
     $(this).removeClass('animated ' + obj.class);
     $(this).removeAttr('style');
  });
}

function setaudioplayerBar() {
     var audio_w=$('.audioplayer').width();
     console.log(audio_w)
     var audio_bar = audio_w + 10;
     $('.audioplayer-bar').width(audio_bar);
     $('.audioplayer-time-duration').css('right',audio_w*0.04);
}
// setaudioplayerBar();

$('.audioplayer-playpause').click(function() {
   var index = $(this).index();
   console.log(index)
   $(this).siblings().find('.audioplayer-bar-played').addClass('audioplayer-bar-isplaying');
});

$('.readmore').on('click',function() {
  var myparent = $(this).parent();


  // console.log(myparent)
  if (myparent.hasClass('ch')) {
      dialogClose.attr('class', dialogMes_ch.btnClass).text(dialogMes_ch.btnText);
      $.each(dialogMes_ch.articleContent,function(index,item){
        dialogArticle.append('<p>'+ item +'</p>');
      });
  } else if(myparent.hasClass('en')) {
      dialogClose.attr('class', dialogMes_en.btnClass).text(dialogMes_en.btnText);
      $.each(dialogMes_en.articleContent,function(index,item){
        dialogArticle.append('<p>'+ item +'</p>');
      });
  }
  dialog.fadeIn('slow');
  return false;
});
dialogClose.on('click',function(){
  dialog.fadeOut('slow');
  $(this).removeAttr('class').text('');
  dialogArticle.empty();
});