var aDis = document.getElementsByName("description");
var t_summary = "";
if(aDis.length>0) {
  t_summary = aDis[0].content;
  t_summary = t_summary.substr(0,120);
}
var s_url = location.href.split('#')[0] ;
// console.log(s_url)

if(typeof(t_url)=='undefined'|| t_url=='') t_url = s_url ;
if(typeof(t_title)=='undefined'||t_title=='') t_title = document.title ;
if(typeof(t_summ)=='undefined'||t_summ=='') t_summ = t_summary ;
if(typeof(t_pic)=='undefined'||t_pic=='') t_pic = "http://m.qdxin.cn/img/logofen170309.png";
var a_hn = document.location.host.split('.qdxin.cn');
var hn = a_hn[0];
var getUrl = '';
if(hn=='house'||hn=='vip'||hn=='biz') {
	getUrl = '//mp.qdxin.cn/yhxr/jssdk_vars_p.php';
}
else if(hn=='www'||hn=='m'||hn=='club') {
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
  // console.log(getUrl, {u:s_url})
  ajax({
    type:'GET',//请求方式
    url: 'http:' + getUrl,//请求地址
    asny: true, //是否异步
    data:{u: s_url},//数据
    dType:'json',//请求数据类型
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
      console.log(wxcfg)
    },//执行成功的回调函数
    error:function(status){
      return false;
    }//执行失败的回调函数
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
  var type = obj.type || 'GET',//默认是GET
      url = obj.url,
      asny = obj.asny !== false,
      data = obj.data,
      dType = obj.dataType || 'json',
      success = obj.success,
      error = obj.error;
  //处理data
  for(var key in data){
      // data += key + '=' + obj.data[key] + '&';
      // 注意 解码要在ajax处理中进行!不能直接改变s_url！！会导致链接对应不起来 提示不在安全域名内！因为改变了 s_url 但是t_url中不能改变！不能转义 必须保持原样！
      data = key + '=' + encodeURIComponent(obj.data[key]);
  }
  var xhr;//创建XMLHttpRequest
  if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
  }else{
      try{
          xhr = new ActiveXObject('Msxml2.XMLHTTP.6.0');
      }catch(e){
          xhr = new ActiveXObject('Msxml2.XMLHTTP.3.0');
      }
  }
  if( type.toUpperCase() == 'GET' ){//处理GET
      var d = new Date();
      //url += '?' + data + '_=' + d.getTime();//处理缓存问题
      url = url + '?' + data;
      data = null;
  }
  console.log(url)
  xhr.open(type,url,asny);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求头信息
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
          success && success(response);//成功回调函数
      }else{//请求失败
          error && error(xhr.status);//失败回调函数
      }
  }
}