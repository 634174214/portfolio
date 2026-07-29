function getStyle(obj, attr) {//获取attr属性
	if (obj.currentStyle) {//IE
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json, fn) {//完美运动框架
	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		var bStop = true;//判断所有运动是否都已经完成，默认为完成

		for (var attr in json) {
			var nowStyle;//当前属性
			if (attr == 'scrollLeft' || attr == 'scrollTop') {
				nowStyle = obj[attr];
			} else if (attr == 'opacity'){//获取当前属性，opacity特殊处理
				nowStyle = Math.round(getStyle(obj, attr)*100);
			} else {//获取当前属性
				nowStyle = parseInt(getStyle(obj, attr));
			}

			//计算运动速度
			var iSpeed = (json[attr] - nowStyle)/4;
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

			if (iSpeed != 0) {//判断所有运动只要有一个未完成，设置bStop = false
				bStop = false;
			}
			if (attr == 'scrollLeft' || attr == 'scrollTop') {
				obj[attr] = nowStyle + iSpeed;
			} else if (attr == 'opacity') {
				obj.style.opacity = (nowStyle + iSpeed)/100;
				obj.style.filter = 'alpha(opacity=' + (nowStyle + iSpeed) + ')';
			} else {
				obj.style[attr] = nowStyle + iSpeed + "px";
			}
		}
		//检测停止
		if (bStop) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, 30);
}

function getByClass(oParent, sClass) {//通过className获取对象
	var aChild = oParent.getElementsByTagName('*');
	var regex = new RegExp('\\b' + sClass + '\\b', 'i');
	var result = [];

	for (var i=0; i<aChild.length; i++) {
		if (regex.test(aChild[i].className)) {//判断对象className是否符合条件
			result.push(aChild[i]);
		}
	}

	return result;
}

function TouchSlider(oSlider, flag, callback) {//满屏的touch幻灯片
	this.init(oSlider,flag, callback);
}

TouchSlider.prototype = {
	touchstart: function(e) {//触摸开始事件
		clearInterval(this.timer);//清除定时器
		clearInterval(this.oSlider.timer);//清除对象运动定时器
		if (e.targetTouches.length == 1) {//判断是否只有一个手指
			var touch = e.targetTouches[0];

			this.startPageX = this.startTouchX = touch.pageX;//记录手触摸时的坐标
			this.startSliderLeft = this.oSlider.scrollLeft;//记录刚开始时的scrollLeft

		}
	},
	touchmove: function(e) {//触摸滑动事件
		if (e.targetTouches.length == 1) {
			var touch = e.targetTouches[0];

			this.endSpeed = touch.pageX - this.startPageX;//记录move的速度
			this.oSlider.scrollLeft = this.startSliderLeft - (touch.pageX - this.startTouchX);//oSlider随着手指拖动
			this.startPageX = touch.pageX;//更新move的开始坐标
		}
	},
	touchend: function(e,flag,fn) {//触摸结束事件
		this.endSliderLeft = this.oSlider.scrollLeft;//记录刚结束时的scrollLeft
		this.aImgWidth=$(this.aImg[0]).outerWidth(true);
		if(flag =='1'){
			var targetIndex = this.oSlider.scrollLeft/this.aImgWidth;//要滚动到的目标索引
			if (Math.abs(this.endSpeed) >= 5) {//判断手指离开屏幕时一瞬间的速度是否大于8,改变目标索引
				targetIndex = this.endSpeed>0 ? Math.floor(targetIndex) : Math.ceil(targetIndex);
			} else {
				
					targetIndex = Math.round(this.oSlider.scrollLeft/this.aImgWidth);	
			}

			var that = this;
			startMove(this.oSlider, {'scrollLeft': targetIndex*this.aImgWidth}, function() {//开始滚动
				fn && fn(targetIndex);	
			});
			
		}else{
			startMove(this.oSlider, {'scrollLeft': this.endSliderLeft},fn);
		}

	},
	init: function(oSlider, flag,callback) {//初始化页面
		this.oSlider = oSlider;//slider容器
		this.oImgBox = getByClass(oSlider, 'touchSlider_imgBox')[0];//slider img容器
		this.aImg = getByClass(this.oImgBox, 'touchSlider_img');//运动的
		this.bodyWidth = document.documentElement.clientWidth;//浏览器宽度
		this.startTouchX = 0;//手指刚触摸时的X坐标
		this.startSliderLeft = 0;//手指刚触摸时的scrollLeft
		this.startPageX = 0;//手指每次move开始时的X坐标
		this.endSpeed = 0;//每次move时的速度

		this.oImgBox.style.width = this.aImg.length*$(this.aImg[0]).outerWidth(true) + 'px';
		

		var that = this;
		this.oSlider.addEventListener('touchstart', function(e) {//绑定touchstart
			that.touchstart(e);
		}, false);
		this.oSlider.addEventListener('touchmove', function(e) {//绑定touchmove
			that.touchmove(e);
		}, false);
		this.oSlider.addEventListener('touchend', function(e) {//绑定touchend
			that.touchend(e,flag, callback);
		}, false);
	}
}

