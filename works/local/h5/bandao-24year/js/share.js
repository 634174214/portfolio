
// 微信分享相关
function wx_getshareinfo(shareData, redayFunc) {
  let params = 'url=' + encodeURIComponent(window.location.href);
  $.ajax({
    type: "get",
    contentType: 'application/json',
    url: 'https://bandaoapi.bandaoapp.com/wxapi/wxConfig',
    data: params,
    success: function(data){
      if (data.code != 200) {
        console.log("接口返回非200");
        return;
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', showShareMenu, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', showShareMenu);
          document.attachEvent('onWeixinJSBridgeReady', showShareMenu);
        }
      } else {
        showShareMenu();
      }
      var res = data.result
      wx.config({
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideOptionMenu',
          'showOptionMenu'
        ]
      });
      if(!shareData.imgUrl){
        shareData.imgUrl = 'http://config.bandaoapp.com/share.jpg'
      }
      // 页面加载时需要调用的接口
      wx.ready(function () {
        wx.updateAppMessageShareData({...shareData});
        wx.updateTimelineShareData({...shareData});
        wx.onMenuShareAppMessage({...shareData});
        wx.onMenuShareTimeline({...shareData});
        wx.onMenuShareQQ({...shareData});
        wx.onMenuShareWeibo({...shareData});
      });
      wx.error(function (res) {});
    }
  })
}

function wxHide(){
  // wx.hideOptionMenu()
  WeixinJSBridge.call('hideOptionMenu');
}

function hideShareMenu() { 
  // WeixinJSBridgeReady 微信内置浏览器初始化完成响应事件
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', wxHide, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', wxHide);
      document.attachEvent('onWeixinJSBridgeReady', wxHide);
    }
  } else {
    wxHide();
  }
}

function showShareMenu() {
  // wx.showOptionMenu()
  WeixinJSBridge.call('showOptionMenu');
}