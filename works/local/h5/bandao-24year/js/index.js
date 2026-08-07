function pauseMusic(){
  let music = $('#sceneSound')[0];
  music.loop = false;
  music.pause()
}

function playMusic(src){
  let music = $('#sceneSound')[0];
  if(src) music.src = src;
  music.play()
}

wx_getshareinfo({
  title: '肆意生长 时刻追光',
  desc: '沐风栉雨，步履不停。是什么指引着方向，又是什么让步伐变得坚定而有力量？',
  link: window.location.href,
  imgUrl: 'images/icon.png',
})

// 元素延迟展示
function domChange(idName, seconds, hideName){
  setTimeout(function(){
    if(idName && idName == '.next-page-btn'){
      $(`${idName}`).css('display', 'flex')
    }else if(idName){
      $(`${idName}`).show()
    }
    hideName && $(`${hideName}`).hide()
  }, seconds)
}

// 元素渐隐后消失
function domFadeOut(name){
  $(name).css('animation', 'fade-out 1500ms forwards')
  domChange('', 1500, name)
}

function keywordShow() {
  setTimeout(function(){
    // $('.keyword').show()
    $('.keyword-text').show()
    // 背景音乐播放
    let music = $('#bgSound')[0];
    music.play()
    // 首页文字及触点出现
    domChange('#group-one-text1', 2000)
    domChange('#click-item', 10000)
  }, 500)
}

// 进度条消失显示按钮
setTimeout(function(){
  $('.progress-box').hide()
  $('.enter-btn').css('display', 'block')
}, 3500)

function openPage() {
  // 开页黑屏隐藏，键盘动画开始
  domFadeOut('.open-mask')
  keywordShow()
  playMusic()
  setTimeout(function(){
    pauseMusic()
    renderImg('.group-one')
  }, 1900)
}

function isMobile() {
  let ua = navigator.userAgent;
  return !!ua.match(/AppleWebKit.*Mobile.*/) && ua.indexOf('iPad') < 0
}

var curPage = 0; // 记录当前页码,切换页面
function changePage() {
  console.log('curPage==========',curPage);
  $('.next-page-btn').hide()
  curPage++
  switch (curPage) {
    case 1:
      // 关电脑
      $('#click-item').hide()
      domFadeOut('.light-group')
      domChange('#group-one-text2', 2000)
      domChange('.next-page-btn', 10000)
      renderImg('.group-two')
      break;
    case 2:
      // 关机 -> 光的那边是什么
      domFadeOut('.dark-group')
      domChange('#group-one-end', 1000)
      domChange('.next-page-btn', 3200)
      renderImg('.group-three')
      break;
    case 3: 
      // 切换到第二组，车灯页
      changeGroup('-100vh', '.group-two')
      playMusic('media/car.wav')
      setTimeout(function(){
        $('.car-light-img').show()
        domChange('#group-two-text1', 1000 ,'')
        domChange('.next-page-btn', 6000)
      }, 2000)
      break;
    case 4: 
      // 车灯 -> 马路
      domFadeOut('.car-light')
      playMusic('media/road.mp3')
      setTimeout(function(){
        $('.cars').show()
      }, 1350)
      setTimeout(function(){
        $('#group-two-text2').css('display', 'flex')
        domChange('.next-page-btn', 3500)
      }, 5000)
      break;
    case 5: 
      // 马路 -> 路灯
      domFadeOut('.car-load')
      domChange('.load-light-list', 1000)
      setTimeout(function(){
        $('#group-two-text3').css('display', 'flex')
        domChange('.next-page-btn', 4500)
      }, 4500)
      renderImg('.group-four')
      break;
    case 6: 
      // 切换到第三组， 回家
      changeGroup('-200vh', '.group-three')
      setTimeout(function(){
        $('#click-item5').show()
      }, 2000)
      break;
    case 7: 
      // 解锁开灯
      $('#click-item5').hide()
      playMusic('media/lock.wav')
      setTimeout(function(){
        $('.home-light').show()
        setTimeout(function(){
          $('#group-three-text1').css('display', 'flex')
          domChange('.next-page-btn', 4500)
        }, 1000)
      }, 4000)
      break;
    case 8: 
      // 家门 -> 手机微信，弹出提示
      domFadeOut('.home-index')
      setTimeout(function(){
        playMusic('media/msg.mp3')
        $('.car-light-img').show()
      }, 2100)
      domChange('#wxGuang', 2200)
      setTimeout(function(){
        $('#msg2').css('width', '1.64rem')
        $('#msg2').css('left', 'calc(50% - .76rem)')
      }, 2200)
      setTimeout(function(){
        $('#msg2').css('top', '57%')
        $('#msg1').css('width', '1.64rem')
        $('#msg1').css('left', 'calc(50% - .76rem)')
      }, 3500)
      setTimeout(function(){
        $('#group-three-text2').css('display', 'flex')
      }, 5000)
      domChange('.next-page-btn', 11000)
      break;
    case 9: 
      // 手机微信 -> 蛋糕
      domFadeOut('.home-weixin')
      setTimeout(function(){
        $('#group-three-text3').css('display', 'flex')
        domChange('#click-item2', 5000)
      }, 1000)
      break;
    case 10: 
      // 吹蜡烛 -> 卧室
      $('#click-item2').hide()
      $('#cakeGuang').hide()
      setTimeout(() => {
        domFadeOut('.home-cake')
      }, 700);
      break;
    case 11: 
      // 卧室关灯
      $('#click-item3').hide()
      playMusic('media/close.mp3')
      $('#bedLight').hide()
      setTimeout(function(){
        $('#group-three-text4').css('display', 'flex')
        domChange('.next-page-btn', 4200)
      }, 1200)
      renderImg('.group-five')
      break;
    case 12: 
      // 切换到第四组， 梦和结语
      changeGroup('-300vh', '.group-four')
      if(!isMobile()){
        // pc 不做动画
        // $('.open-dream-btn').hide()
        // $('#click-item6').hide()
        $('.dream-cycle').hide()
      }
      setTimeout(function(){
        $('#group-four-text1').css('display', 'flex')
        domChange('.next-page-btn', 2500)
      }, 1200)
      break;
    case 13: 
      // 进入梦境
      domFadeOut('.last-index')
      break;
    case 14:
      // 打开梦境 
      $('.open-dream-btn').hide()
      $('#click-item6').hide()
      setTimeout(function(){
        $('.dream-cycle').css({'width': '120vh', 'height': '120vh'})
        domChange('.next-page-btn', 3500)
      },500)
      break;
    case 15:
      // 关闭梦境,进入日出
      domFadeOut('.last-dream')
      setTimeout(function(){
        $('#group-four-text2').css('display', 'flex')
        domChange('#click-item4', 3500)
      }, 1200)
      break;
    case 16:
      // 光晕放大,展示结语
      $('.guangyun').show()
      $('.guangyun').css('animation', 'guangyun-scale 2s forwards');
      setTimeout(function(){
        domFadeOut('.last-sun')
        domChange('#group-four-end', 1000)
        $('.click-item').addClass('black-click-item')
        domChange('.next-page-btn', 5000)
      },700)
      break;
    case 17:
      // 结束
      changeGroup('-400vh', '.group-five')
      domChange(null, 4000, '.end-img1')
      domChange(null, 8500, '.end-img2')
      break;
    default:
      break;
  }
}

function changeGroup(num, name){
  $(name).show()
  setTimeout(function(){
    $('.page').css('margin', `${num} 0 0`)
  }, 400)
}

// 图片渲染
function renderImg(name) {
  $(`${name} img`).not('[data-isLoaded]').each(function() {
    var $node = $(this)
    //设置一个定时器起到缓冲效果 
    setTimeout(function() {
      // 获取目标元素 并替换 
      $node.attr('src', $node.attr('data-src'))
      //性能优化 进行判断 已经加载的不会再进行加载  
      $node.attr('data-isLoaded', 1)
    }, 200)
  })
}

function test(){
  curPage = 11;
    changePage()
}
// test()