/* 改造闭包。。。以实现动态生成图片上传按钮效果  edit by xinwei 2013.4.9 */
	var tools = {};
	// 提交的iframe的id
	tools.iframeId = 0;

	// 是否是ie6
	tools.isIE6 = navigator.userAgent.toLowerCase().indexOf('msie 6')>-1;

	// 存储所有实例
	tools.instances = [];

	// 创建工具函数
	tools.create = function(tag){
		return document.createElement(tag);
	};

	// 获取按钮的绝对位置
	tools.getAbsolutePostion = function(obj){
		var pos = {};
		pos.x = obj.offsetLeft;
		pos.y = obj.offsetTop;
		while(obj = obj.offsetParent){
			pos.x += obj.offsetLeft;
			pos.y += obj.offsetTop;
		}
		return pos;
	};

	// 插件的主要实现
	tools.achieve = function(button){
		// 若没有使用new方式创建，则自己调用new
		if(this === window || this === tools){
			return new tools.achieve(button);
		}

		// 若传进来的是id，则获取dom元素
		if(typeof button === 'string'){
			button = document.getElementById(button);
		}

		var that = this;

		// 提交的iframe的id
		var id = this.iframeId = 'upload-beautify-plugin-' + (++tools.iframeId);

		// 创建文档随便
		var docFragment = document.createDocumentFragment();

		// 要实现的上传按钮
		var button = this.button = button;

		// 是否开启debug
		var debug = button.getAttribute('plugin-debug');

		// 盖住按钮用的div
		var cover = this.cover = tools.create('div');
		cover.onmouseover = function(){
			button.className += ' plugin-upload-hover';
		}
		cover.onmouseout = function(){
			button.className = button.className.replace('plugin-upload-hover','');
		}
		var coverStyle = cover.style;
		coverStyle.position = 'absolute';
		coverStyle.overflow = 'hidden';
		coverStyle.zIndex = '10001';
		if('opacity' in coverStyle){
			coverStyle.opacity = '0';
		}else{
			coverStyle.filter = "alpha(opacity=0)";
		}
		this.adjustCover();
		
		docFragment.appendChild(cover);

		// 创建form表单
		var form = this.form = tools.create('form');
		form.target = id;
		form.enctype = "multipart/form-data";
		form.encoding = "multipart/form-data";
		form.method = 'post';
		form.action = button.getAttribute('plugin-action');
		cover.appendChild(form);

		// 创建文件域
		var fileControl = this.fileControl = tools.create('input');
		fileControl.name = button.getAttribute('plugin-name');
		fileControl.type = 'file';
		var ifileControl = {};
		fileControl.onclick  = function(e){
			if(button.getAttribute('plugin-disabled') === 'disabled'){
				e = e || window.event;
				e.preventDefault && e.preventDefault();
				return false;
			}
		} 
		var fileStyle = fileControl.style;
		fileStyle.position = 'absolute';
		fileStyle.right = '0';
		fileStyle.fontSize = '1000px';
		fileStyle.backgroundColor = 'red';
		fileStyle.cursor = 'pointer';
		if(!debug){
			if('opacity' in fileStyle){
				fileStyle.opacity = '0';
				}else{
				fileStyle.filter = "alpha(opacity=0)";
			}
		}else{
			if('opacity' in fileStyle){
				fileStyle.opacity = '0.2';
			}else{
				fileStyle.filter = "alpha(opacity=20)";
			}
		}
		fileControl.setAttribute('hideFocus', 'true');
		form.appendChild(fileControl);
		fileControl.onchange = function(e){
			e = e||window.event;
			var func = new Function('event', button.getAttribute('plugin-onsubmit'));
			if(func.call(that, e) !== false){
				var form = this.parentNode||this.parentElement;
				form.submit();
			};
		};
		
		// 提交用的iframe
		var iframe = this.iframe = tools.create('iframe');
		iframe.id = id;
		iframe.name = id;
		iframe.src = 'about:blank';
		iframe.style.display = 'none';
		docFragment.appendChild(iframe);  

		// 添加文档碎片
		document.body.appendChild(docFragment);
		iframe.contentWindow && (iframe.contentWindow.name = id);

		// 添加到数组中
		tools.instances.push(this);
	};

	// 调整cover的位置
	tools.achieve.prototype.adjustCover = function(){
		var button = this.button;
		var coverStyle = this.cover.style;
		var pos = tools.getAbsolutePostion(button);
		coverStyle.left = pos.x + 'px';
		coverStyle.top = pos.y + 'px';
		coverStyle.width = button.offsetWidth + 'px';
		coverStyle.height = button.offsetHeight + 'px'; 
	}

	//  获取上传按钮美化组件实例
	tools.achieve.getInstance = function(dom){
		if(typeof dom === 'string'){
			dom = document.getElementById(dom);
		}

		var instances = tools.instances;
		for(var i=0,len=instances.length; i<len; i++){
			if(instances[i].button === dom){
				return instances[i];
			}
		}
		return false;
	};

	// 上传按钮美化组件执行完成后的回调
	tools.achieve.onload = function(){}

	// 页面载入完成后自动寻找plugin-type="file"的元素
	tools.BindFileBeautify = function(){
		tools.UnbindFileBeautify();
		var doms = document.getElementsByTagName('*');
		for(var i= 0,len=doms.length; i<len; i++){
			if(doms[i].getAttribute('plugin-type') === 'file'){
				tools.achieve(doms[i]); 
			}
		}
		tools.achieve.onload();
	};

	//解绑
	tools.UnbindFileBeautify = function(){
		var instances = tools.instances;
		for(var i=0,len=instances.length; i<len; i++){
			var iframe = instances[i].iframe;
			var coverStyle = instances[i].cover;
			if(iframe.parentNode)
			{
				iframe.parentNode.removeChild(iframe);
			}
			if(coverStyle.parentNode)
			{
				coverStyle.parentNode.removeChild(coverStyle);
			}
		}
		tools.instances = [];
	}

	// 页面resize的时候调整位置
	tools.AdjustCovers = function(){
		var instances = tools.instances;
		for(var i=0,len=instances.length; i<len; i++){
			instances[i].adjustCover();
		}
	}

	// 添加onload事件
	if(window.addEventListener){
		window.document.addEventListener('DOMContentLoaded', tools.BindFileBeautify, false);
	}else{
		window.attachEvent('onload', tools.BindFileBeautify);
	}

	// 添加resize事件
	if(window.addEventListener){
		window.addEventListener('resize', tools.AdjustCovers, false);
	}else{
		window.attachEvent('onload', tools.AdjustCovers);
	}

	//添加到命名空间下
	if(window.$){
		window.$.tools = tools;
	}else{
		window.$ = {tools:tools};
	}