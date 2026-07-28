var aDis = document.getElementsByName("description");
var t_summary = "";
if(aDis.length>0) {
  t_summary = aDis[0].content;
  t_summary = t_summary.substr(0,120);
}
var u_url = document.location.href ;
var a_url = u_url.split('#');
var s_url = a_url[0];
if(typeof(t_url)=='undefined'||t_url=='') t_url = s_url ;
if(typeof(t_title)=='undefined'||t_title=='') t_title = document.title ;
if(typeof(t_summ)=='undefined'||t_summ=='') t_summ = t_summary ;
if(typeof(t_pic)=='undefined'||t_pic=='') t_pic = "http://m.qdxin.cn/img/logofen170309.png";
var a_hn = document.location.host.split('.qdxin.cn');
var hn = a_hn[0];
var getUrl = '';
if(hn=='house'||hn=='vip'||hn=='biz') {
	getUrl = 'http://mp.qdxin.cn/yhxr/jssdk_vars_p.php';
}
else if(hn=='www'||hn=='m'||hn=='club') {
	getUrl = 'http://mp.qdxin.cn/qdxw/jssdk_vars_p.php';
}
else {
  getUrl = 'http://mp.qdxin.cn/xwcm/jssdk_vars_p.php';
}
var ua = navigator.userAgent ;
if(ua.indexOf('MicroMessenger',10)>0) {
  wxShareData = {
    "title": t_title,
    "desc": t_summ,
    "link": t_url,
    "imgUrl": t_pic,
  };
  $.ajax({
    type: 'get',
    url: getUrl,
    data: {u:s_url},
    async:true,
    error: function(e){
      return false;
    },
    success: function(json){
      if(typeof(json)!='object'){
        var json1 = JSON.parse(json);
      }
      else{
        var json1 = json;
      }
      var json2 = { jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','previewImage','chooseImage','openLocation','getLocation','scanQRCode','hideMenuItems','showMenuItems','closeWindow'] };
      var wxcfg = $.extend({
          debug: true,
          appId: '',
          timestamp: 1,
          nonceStr: '',
          signature: '',
      }, json1, json2);
      wx.config(wxcfg);
    }
  });
  wx.ready(function(){
    wx.onMenuShareAppMessage(wxShareData);
    wx.onMenuShareTimeline(wxShareData);
    wx.onMenuShareQQ(wxShareData);
    wx.onMenuShareWeibo(wxShareData);
  });
} // End of if MicroMessenger
