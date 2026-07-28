
var krpanoplugin=function(){
	var local = this;
	var krpano = null;
	var plugin = null;

	var container=null;

	local.registerplugin=function(krpanointerface, pluginpath, pluginobject){
		krpano=krpanointerface;
		plugin=pluginobject;

		container=document.createElement('iframe');
		container.style.width="100%";
		container.style.height="100%";
		container.style.zIndex="4000";
		container.style.border="0";
		container.id="map";
		
		plugin.showmap=showmap;
		plugin.sprite.appendChild(container);
	}

	function showmap(){
		var lat=plugin.lat;
		var lng=plugin.lng;
		var title=plugin.title;
		var address=plugin.desc==""||plugin.desc==null?null:plugin.desc;

		if(lat==""||lat==null||lng==""||lng==null||title==""||title==null){
			alert("缺少位置坐标，请检查坐标信息！");
		}
		else{
			var link="http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:"+lat+","+lng+";title:"+title+";addr:"+address+"&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
			window.location.href=link;
		}
	}

	local.unloadplugin = function()
	{
		plugin = null;
		krpano = null;
	}

}