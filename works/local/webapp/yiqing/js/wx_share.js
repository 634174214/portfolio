var aDis = document.getElementsByName("description");
var t_summary = "";
if(aDis.length>0) {
  t_summary = aDis[0].content;
  t_summary = t_summary.substr(0,120);
}
var s_url = document.location.href.split('#')[0] ;

if(typeof(t_url)=='undefined'|| t_url=='') t_url = s_url ;
if(typeof(t_title)=='undefined'||t_title=='') t_title = document.title ;
if(typeof(t_summ)=='undefined'||t_summ=='') t_summ = t_summary ;
if(typeof(t_pic)=='undefined'||t_pic=='') t_pic = "http://m.qdxin.cn/img/logofen170309.png";
var a_hn = document.location.host.split('.qdxin.cn');
var hn = a_hn[0];
var getUrl = '';
if(hn=='www'||hn=='m'||hn=='club') {
	getUrl = '//mp.qdxin.cn/qdxw/jssdk_vars_p.php';
}
else {
  getUrl = '//mp.qdxin.cn/xwcm/jssdk_vars_p.php';
}
var ua = navigator.userAgent ;
if(ua.indexOf('MicroMessenger',10)>0) {
  wxShareData = {
    "title": t_title,
    "desc": t_summ,
    "link": t_url,
    "imgUrl": t_pic,
  };
  console.log(getUrl, {u:s_url})
  ajax({
    type:'GET',
    url: 'http:' + getUrl,
    asny: true, 
    data:{u: s_url},
    dType:'json',
    success: function(json){
      if(typeof(json)!='object'){
        var json1 = JSON.parse(json);
      }
      else{
        var json1 = json;
      }
      var json2 = {
        debug: false,
        jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','updateAppMessageShareData','updateTimelineShareData','previewImage','chooseImage','openLocation','getLocation','scanQRCode','hideMenuItems','showMenuItems','closeWindow']
      };
      var wxcfg = Object.assign({}, json1, json2);
      wx.config(wxcfg);
      // console.log(wxcfg)
    },
    error:function(status){
      return false;
    }
  })

  
  wx.ready(function(){
  	wx.checkJsApi({
      jsApiList: ['onMenuShareAppMessage'],
      success: function(res) {
        wx.onMenuShareAppMessage(wxShareData);
        wx.onMenuShareTimeline(wxShareData);
        wx.onMenuShareQQ(wxShareData);
        wx.onMenuShareWeibo(wxShareData);
      }
    });
    if( typeof wx.updateAppMessageShareData == 'function' ) {
        wx.updateAppMessageShareData(wxShareData);
        wx.updateTimelineShareData(wxShareData);
    }
  });
} // End of if MicroMessenger

function ajax(obj){
  var type = obj.type || 'GET',
      url = obj.url,
      asny = obj.asny !== false,
      data = obj.data,
      dType = obj.dataType || 'json',
      success = obj.success,
      error = obj.error;
  for(var key in data){
      data = key + '=' + encodeURIComponent(obj.data[key]);
  }
  var xhr;
  if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
  }else{
      try{
          xhr = new ActiveXObject('Msxml2.XMLHTTP.6.0');
      }catch(e){
          xhr = new ActiveXObject('Msxml2.XMLHTTP.3.0');
      }
  }
  if( type.toUpperCase() == 'GET' ){
      var d = new Date();
      url = url + '?' + data;
      data = null;
  }
  xhr.open(type,url,asny);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send(data);//发送数据
  //xhr监听
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status ==200 ){
          if( dType == 'text' || dType == 'json'){
              if( dType == 'json'){//json
                  response = JSON.parse( xhr.responseText );
              }else{//普通文本
                  response = xhr.responseText;
              }
          }else{//XML
              response = xhr.responseXML;
          }
          success && success(response);
      }else{//请求失败
          error && error(xhr.status);
      }
  }
}