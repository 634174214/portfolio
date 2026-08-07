var imgArr = [],
	// thisPort = window.location.host,
	thisPort = 'dev-news',
	thisUrl = 'albumDetail.json',
Page = (function() {
	var config = {
			$bookBlock: $('#bb-bookblock'),
		}
		
		// 初始执行函数
		init = function() {

			//阻止默认的处理方式(阻止下拉滑动的效果)
			document.body.addEventListener('touchmove', function (e) {
			  e.preventDefault()
			}, {passive: false})
			
			getApiUrl()
		}
		
		// 请求接口地址
		getApiUrl = function() {
			// if (thisPort.split(".")[0] == "dev-news" || thisPort.split(".")[0] == "dev-home") {
			// 		thisUrl = 'http://dev-api.bandaoapp.com'
			// } else if (thisPort.split(".")[0] == "stg-news" || thisPort.split(".")[0] == "stg-home") {
			// 		thisUrl = 'http://stg-api.bandaoapp.com'
			// } else {
			// 		thisUrl = "https://bandaoapi.bandaoapp.com";
			// }
			getData()
		}
		
		// 获取数据
		getData = function () {
			$.ajax({
				type: "post",
				contentType: 'application/json',
				url: thisUrl,
				data: JSON.stringify({newsId: getQueryValue('newsId')}), //543772441370169344
				success: function(data) {
					// data.code = 404
					if(data.code == 200) {
						var res = data.result,
								resImgArr = res.images || []
						window.localStorage.setItem('title', res.title);
						window.localStorage.setItem('sharesImg', res.share_icon);
						window.localStorage.setItem('sharesContent', res.share_content);
						document.title = res.title
						
						imgArr = []
						for(i = 0; i < resImgArr.length; i ++) {
							imgArr.push({url: resImgArr[i].img_url, des: resImgArr[i].description})
						}
						
						if(imgArr.length == resImgArr.length) {
							render()
							config.$bookBlock.bookblock({
								orientation: 'horizontal',
								speed: 800,
								shadowSides: 0.8,
								shadowFlip: 0.7,
								onEndFlip: function(page, isLimit) { // 翻页后的回调函数
									if(isLimit == imgArr.length - 1) {
										$('.div-btn').css({'display': 'none'})
										pop("已经是最后一页啦！", 1500)
									} else {
										$('.div-btn').css({'display': 'block'})
									}
									return false;
								}
							});
							initEvents()
							// 不执行盯盯以及微信分享
							// wx_getshareinfo()
							// setDingDingShareInfo()
						}
					} else {
						if (typeof WeixinJSBridge == "undefined") {
							if (document.addEventListener) {
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							} else if (document.attachEvent) {
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							}
						} else {
							onBridgeReady();
						}
						document.title = "对不起！您访问的页面不存在"
						var page404str = `<div class="page404">
																<img src="img/404.png" />
															</div>`;
						$("html").css({"height":"100%"});
						$("body").css({"height":"100%","background":"#ffffff"}).html(page404str);
						return;
					}
				},
				error: function(err) {
					console.log('err:', err)
				}
			});
		}
		
	 /*  信息弹窗
		*  textStr：提示信息内容
		*  time：显示时间多久后消失
		*/
		function pop(textStr, time) {
			$('.pop').fadeIn();
			$('.pop').text(textStr);
			setTimeout(function() {
				$('.pop').fadeOut()
			}, time)
		}
		
		// 数据渲染
		render = function () {
			var divs = ''
			for(var i = 0; i < imgArr.length; i++){
				divs = divs + 
								`<div class="bb-item">
									<img src=` + imgArr[i].url + ` alt=` + imgArr[i].des + ` />
								</div>`
			}
			document.getElementById("bb-bookblock").innerHTML = divs;
		}
		
		// 微信分享
		wx_getshareinfo = function (){
			$.ajax({
				type: "get",
				contentType: 'application/json',
				url: thisUrl + '/wxapi/wxConfig',
				data: 'url=' + encodeURIComponent(window.location.href),
				success: function(data) {
					if (data.code != 200) return
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReadShow, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReadShow);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReadShow);
						}
					} else {
						onBridgeReadShow();
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
								'hideMenuItems',
								'showMenuItems'
							]
					});
					wx.ready(function() {
						shareData = {
							title: window.localStorage.getItem('title'), // 分享标题
							desc: window.localStorage.getItem('sharesContent'), // 分享描述
							link: window.location.href, // 分享链接
							imgUrl: window.localStorage.getItem('sharesImg'), // 分享图标
							success: function(res) {}
						}
						wx.updateAppMessageShareData(shareData);
						wx.updateTimelineShareData(shareData);
						wx.onMenuShareAppMessage(shareData);
						wx.onMenuShareTimeline(shareData);
						wx.onMenuShareQQ(shareData);
						wx.onMenuShareWeibo(shareData);
					});
					wx.error(function(res) {
						// alert('error')
						// alert(JSON.stringify(res))
					});
				},
				error: function() {
						console.log("请求接口错误");
				}
			});
		}
		onBridgeReady = function () { 
			WeixinJSBridge.call('hideOptionMenu'); 
		}
		onBridgeReadShow = function () {
			WeixinJSBridge.call('showOptionMenu');
		}
		
		// 钉钉分享
		setDingDingShareInfo = function () {
			dd.ready(function () {
				dd.biz.navigation.setRight({
					show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
					control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
					text: '',//控制显示文本，空字符串表示显示默认文本
					onSuccess: function (result) {
						//如果control为true，则onSuccess将在发生按钮点击事件被回调
						dd.biz.util.share({
							type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
							url: window.location.href,
							content: window.localStorage.getItem('sharesContent'),
							title: window.localStorage.getItem('title'),
							image: window.localStorage.getItem('sharesImg'),
							onSuccess: function () {
									//onSuccess将在分享完成之后回调
									/**/
							},
							onFail: function (err) { }
						})
					},
					onFail: function (err) { }
				});
			})
		}
		
		// 触摸事件
		initEvents = function() {
			var $slides = config.$bookBlock.children();
			
			$slides.on({
				'swipedown': function(event) {
					config.$bookBlock.bookblock('prev');
					return false;
				},
				'swipeup': function(event) {
					config.$bookBlock.bookblock('next');
					return false;
				}
			});

			let startX = 0,
				startY = 0,
				endX = 0,
				endY = 0,
				distanceX = 0,
				distanceY = 0

			$('body').bind('touchstart', function(e) {
				startX = e.originalEvent.changedTouches[0].pageX,
				startY = e.originalEvent.changedTouches[0].pageY;
			}); 
			$('body').bind('touchmove', function(e) {
				//获取滑动屏幕时的X,Y
				endX = e.originalEvent.changedTouches[0].pageX,
				endY = e.originalEvent.changedTouches[0].pageY;
				//获取滑动距离
				distanceX = endX - startX;
				distanceY = endY - startY;
				//判断滑动方向
				if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < 0) {
					config.$bookBlock.bookblock('next');
					// console.log('往上滑动');
					return false;
				} else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
					config.$bookBlock.bookblock('prev');
					// console.log('往下滑动');
					return false;
				} else {
					console.log('点击未滑动');
				}
			});
	}
	
	// 获取url中参数值
	getQueryValue = function (queryName) {
		let reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
		let r = window.location.search.substr(1).match(reg);
		if ( r != null ){
			return decodeURI(r[2]);
		}else{
			return null;
		}
	}

	return {
		init: init
	};

})();


Page.init();