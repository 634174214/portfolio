/*
for iPad
mengjia 20100717
*/
~function(){
	if(window.__nfios){return};
	if(!/\((iPhone|iPad|iPod)/i.test(navigator.userAgent)){return};
	document.addEventListener('mousedown',function(e){
		var ele = e.target;
		do{
			if(ele.tagName == 'A'){
				if(!ele.href || ele.href.indexOf('javascript') == 0){return};
				if(window.frameElement || typeof(blankOnly) === 'object'){ //iframe
					if(ele.target != '_blank'){return};
				};
				ele.target = getTarget(ele.href);
				return;
			};
			if(ele.tagName == 'DIV'){return};
		}while(ele = ele.parentNode);
	},false);

	//css for iOS
	var iPadCSS = document.createElement('style');
	document.getElementsByTagName('head')[0].appendChild(iPadCSS);
	iPadCSS.textContent = 'a{text-decoration:none!important;}';

	//return target type
	function getTarget(toUrl){
		var tg = '_top';
		var m = new UrlInfo(location.href);
		var t = new UrlInfo(toUrl);
		//index to child channel
		if(!m.folder && !m.filename	&& (t.folder || t.filename)){
			tg = '_blank';
		};
		//child channel to content
		if(m.folder && !m.filename && t.filename){
			tg = '_blank';
		};
		return tg;
	}
	//get url info
	function UrlInfo(url){
		this.href = '';
		this.host = '';
		this.folder = '';
		this.filename = '';
		if(typeof url != 'string'){return};
		this.href = url;
		var info = url.match(/\/\/([\.0-9a-z\-\_]+)(?:\/([\.0-9a-z\-\_]+)[\/$])?/i);
		if(info){
			if(info[1]){this.host = info[1].toLowerCase()};
			if(info[2]){this.folder = info[2]};
		};
		var name = url.match(/\/([0-9a-z\-\_]+\.[0-9a-z]+)($|\?|\#)/i);
		if(name){
			this.filename = name[1];
			if(this.filename == 'index.html' || this.filename == 'index.shtml' || this.filename == 'index.php' || this.filename == 'index.htm'){
				this.filename = '';
			}
		};
	}
}();