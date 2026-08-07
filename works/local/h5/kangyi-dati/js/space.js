var app = new Vue({
	el: '#app',
	data: {
		config: {},
		pageArr: [],
		curPageIndex: 0,
		imgWidth: 0,
		thisPort: window.location.host,
		thisUrl: 'data-json-local.json',
		linkUrl: "",
		DETAIL_TYPE_URL: { // 值为shareUrl是直接跳转后台返回的链接（wiki文档地址：http://wiki.bandaoapp.cn/pages/viewpage.action?pageId=2326545）
			0: 'tuwen', 1: 'tuwen', 2: 'picture', 3: 'video', 4: 'video', 5: 'video', 
			6: 'video', 7: 'video', 8: 'live', 9: 'live', 10: 'zhuanti', 11: 'shareUrl',
			16: 'video', 17: 'read'
		}
	},
	mounted(){
		let curNewsId = window.localStorage.getItem('curNewsId')
		if(curNewsId && this.getQueryValue('newsId') != curNewsId) this.removeLocalStorage()
		
		this.config = {
			$bookBlock: $('#bb-bookblock')
		}
		
		this.imgWidth = document.body.clientHeight / 4 * 0.7
		this.init()
	},
	methods: {
		// 初始执行函数
		init() {
		
			//阻止默认的处理方式(阻止下拉滑动的效果)
			document.body.addEventListener('touchmove', function (e) {
			  e.preventDefault()
			}, {passive: false})
			
			this.getApiUrl()
		},
		
		// 请求接口地址
		getApiUrl() {
			// if (this.thisPort.split(".")[0] == "dev-news" || 
			// 	this.thisPort.split(".")[0] == "dev-home" || 
			// 	this.thisPort.startsWith("localhost")) 
			// {
			// 		this.thisUrl = 'http://dev-api.bandaoapp.com'
			// } else if (this.thisPort.split(".")[0] == "stg-news" || this.thisPort.split(".")[0] == "stg-home") {
			// 		this.thisUrl = 'http://stg-api.bandaoapp.com'
			// } else {
			// 		this.thisUrl = "https://bandaoapi.bandaoapp.com";
			// }
			
			this.getData()
		},
		
		// 获取数据
		getData() {
			let that = this
			$.ajax({
				type: "post",
				contentType: 'application/json',
				url: this.thisUrl,
				data: JSON.stringify({newsId: that.getQueryValue('newsId')}), //547391928015261696  547125017847271424
				success: function(data) {
					// console.log('res:', data)
					that.resDataHandle(data)
				},
				error: function(err) {
					console.log('err:', err)
				}
			});
		},
		
		// 返回数据处理
		resDataHandle(data) {
			let that = this
			if(data.code == 200) {
				let res = data.result,
						resImgArr = res.images || [],
						id = 0,
						dataArr = []
				// console.log('后台返回数据-resImgArr:', resImgArr)
				window.localStorage.setItem('title', res.title)
				window.localStorage.setItem('sharesImg', res.share_icon)
				window.localStorage.setItem('sharesContent', res.share_content)
				document.title = res.title
				
				// 重构数据
				resImgArr.forEach(o => {
					let flag = false
					// 判断图片是横板还是竖版
					this.imgReady(o.img_url, function() {
						if(this.width >= this.height) {
							flag = false 
						} else {
							flag = true
						}
					})
					dataArr.push({url: o.img_url, id: id, newsId: o.newsId, title: o.newsTitle, des: o.description, rowSpace: o.rowSpace, type: o.newsType, source: o.newsSource, shareUrl: o.share_url, isVertical: flag})
					id ++
				}) 
				
				if(dataArr.length == resImgArr.length) {
					that.pageArr = that.dealData([...dataArr])
					// console.log('前端重构数据-dataArr:', dataArr)
					// console.log('翻页按四格重构数据-pageArr:', that.pageArr)
					setTimeout(function(){
						$("#app").show()
						that.config.$bookBlock.bookblock({
							orientation: 'horizontal',
							speed: 400,
							shadowSides: 0.8,
							shadowFlip: 0.7,
							onEndFlip: function(page, isLimit) { // 翻页后的回调函数
								if(window.localStorage.getItem('curPageIndex')) that.removeLocalStorage()
								if(isLimit == that.pageArr.length - 1) {
									$('.div-btn').css({'display': 'none'})
									that.pop("已经是最后一页啦！", 1500)
								} else {
									$('.div-btn').css({'display': 'block'})
								}
								that.curPageIndex = isLimit
								return false;
							}
						});
						
						let index = parseInt(window.localStorage.getItem('curPageIndex')) + 1
						if(index) that.config.$bookBlock.bookblock('jump', index)
						
						that.initEvents()
						that.wx_getshareinfo()
						that.setDingDingShareInfo()
						// 有背景音乐
						if(!!res.bgMusic && res.bgMusic != "") {
							var audio = $('#beijing_audio')[0];
							$('#beijing_audio').attr("src", res.bgMusic);
							$('.audio_play_btn').css("display", "block");
							audio.addEventListener("playing", function () {
								audio.paused = false;
								$('#audio_play_btn_id').removeClass('audio_play_btn')
								$('#audio_play_btn_id').addClass('audio_play_btn_active');
							});
							audio.addEventListener("pause", function () {
								audio.paused = true;
								$('#audio_play_btn_id').removeClass('audio_play_btn_active')
								$('#audio_play_btn_id').addClass('audio_play_btn');
							});
							$('.audio_play_btn')[0].onclick = function () {
								if (audio.paused) {
									audio.play();
									audio.paused = false;
									$('#audio_play_btn_id').removeClass('audio_play_btn')
									$('#audio_play_btn_id').addClass('audio_play_btn_active');
								} else {
									audio.pause();
									audio.paused = true;
									$('#audio_play_btn_id').removeClass('audio_play_btn_active')
									$('#audio_play_btn_id').addClass('audio_play_btn');
								}
							}
						}
					}, 50)
				}
			} else { // 除200code码，其他跳转404页面
				this.render404()
			}
		},
		
		// 404页面
		render404() {
			let that = this
			if (typeof WeixinJSBridge == "undefined") {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
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
		},
		
		// 跳转详情
		goDetail(e) {
			if(!e.type || !this.DETAIL_TYPE_URL[e.type]) return
			
			window.localStorage.setItem('curNewsId', this.getQueryValue('newsId'))
			window.localStorage.setItem('curPageIndex', this.curPageIndex)
			
			if(e.type && this.DETAIL_TYPE_URL[e.type]) {
				window.location.href = this.linkUrl+ "open_" + this.DETAIL_TYPE_URL[e.type] + ".html?newsId=" + e.newsId
			} else if(e.type && this.DETAIL_TYPE_URL[e.type] == 'shareUrl') {
				window.location.href = e.shareUrl
			}
		},
		
		// 清除本地缓存(跳转详情页前的缓存)
		removeLocalStorage() {
			window.localStorage.removeItem('curNewsId')
			window.localStorage.removeItem('curPageIndex')
		},
		
		// 触摸事件
		initEvents() {
			let that = this
			let $slides = that.config.$bookBlock.children();
			
			$slides.on({
				'swipedown': function(event) {
					that.config.$bookBlock.bookblock('prev');
					return false;
				},
				'swipeup': function(event) {
					that.config.$bookBlock.bookblock('next');
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
					that.config.$bookBlock.bookblock('next');
					// console.log('往上滑动');
					return false;
				} else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
					that.config.$bookBlock.bookblock('prev');
					// console.log('往下滑动');
					return false;
				} else {
					console.log('点击未滑动');
				}
			});
		},
	
		// 数据处理
		dealData (list) {
			let use = [], // 重构的数组
					unUse = [], // 暂无匹配的数据
					used = [], // 已匹配的数据
					canUse = [...list], // 待匹配的数据
					unGroup = []
			list.forEach((item, idx) => {
				// 组合
				if(canUse.some(d => d.id === item.id)) {
					let flag = false, pair = []
					if(item.rowSpace === 1) {
						let t1 = canUse.filter(d => (d.id !== item.id) && d.rowSpace === 3)
						let t2 = canUse.filter(d => (d.id !== item.id) && d.rowSpace === 2)
						let t3 = canUse.filter(d => (d.id !== item.id) && d.rowSpace === 1)
						if(t1.length >= 1) { // 1 3
							flag = true
							pair = [t1[0]]
						} else if(t3.length >= 1 && t2.length >= 1) { // 1 1 2
							flag = true
							pair = [t3[0], t2[0]]
						} else if(t3.length >= 3) { // 1 1 1 1
							flag = true
							pair = t3.slice(0, 3)
						} else {
							flag = false
						}
					} else if(item.rowSpace === 2) { // 2 2 、 2 1 1
						let t1 = canUse.filter(d => (d.id !== item.id) && d.rowSpace === 2)
						let t2 = canUse.filter(d => (d.id !== item.id) && d.rowSpace === 1)
						flag = (t1.length >= 1 || t2.length >= 2)  ? true : false
						pair = t1.length >= 1 ? [t1[0]] : t2.slice(0, 2)
					} else if(item.rowSpace === 3) {  // 3 1
						let t1 = canUse.filter(d => (d.id !== item.id) && d.rowSpace === 1)
						flag = t1.length >= 1  ? true : false
						pair = [t1[0]]
					} else if(item.rowSpace === 4) {  // 4
						flag = true
						pair = []
					}
					// 去掉已使用数据
					if(flag) {
						canUse = canUse.filter(d => !((d.id === item.id) || (pair.some(p => p.id === d.id))))
						use.push([item, ...pair])
						used = [...used, item, ...pair]
					} else {
						canUse = canUse.filter(d => d.id !== item.id)
						unUse.push(item)
					}
				}
			})
			unUse = unUse.sort((a, b)=> b.rowSpace - a.rowSpace)
			let used2 = [];
			unUse.forEach((item,idx) => {
				// 重新留白处理
				if(item.rowSpace === 1) {
					let flag = used2.some(o => o.id === item.id)
					if(!flag) unGroup.push(item)
				} else if(item.rowSpace === 2) {
					let tw1 = unUse.filter(o => o.rowSpace === 1)
					use.push([item, ...(tw1 || [])])
					used2 = [...used2, ...(tw1 || [])]
				} else if(item.rowSpace === 3) {
					use.push([item])
				}
				used2.push(item)
			})
			if(unGroup.length) use.push(unGroup)
			return use
		},
		
		/*  信息弹窗
		*  textStr：提示信息内容
		*  time：显示时间多久后消失
		*/
		pop(textStr, time) {
			$('.pop').fadeIn();
			$('.pop').text(textStr);
			setTimeout(function() {
				$('.pop').fadeOut()
			}, time)
		},
		
		// 获取url中参数值
		getQueryValue(queryName) {
			let reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
			let r = window.location.search.substr(1).match(reg);
			if ( r != null ){
				return decodeURI(r[2]);
			}else{
				return null;
			}
		},
		
		// 获取原始图片大小
		imgReady: (function() {
		  var list = [], intervalId = null,
		  // 用来执行队列
		  tick = function () {
		    var i = 0;
		    for (; i < list.length; i++) {
		      list[i].end ? list.splice(i--, 1) : list[i]();
		    };
		    !list.length && stop();
		  },
		  // 停止所有定时器队列
		  stop = function () {
		    clearInterval(intervalId);
		    intervalId = null;
		  };
		  return function (url, ready, load, error) {
		    var onready, width, height, newWidth, newHeight,
		    img = new Image();
		    img.src = url;
		    // 如果图片被缓存，则直接返回缓存数据
		    if (img.complete) {
		      ready.call(img);
		      load && load.call(img);
		      return;
		    };
		    width = img.width;
		    height = img.height;
		    // 加载错误后的事件
		    img.onerror = function () {
		      error && error.call(img);
		      onready.end = true;
		      img = img.onload = img.onerror = null;
		    };
		    // 图片尺寸就绪
		    onready = function () {
		      newWidth = img.width;
		      newHeight = img.height;
		      if (newWidth !== width || newHeight !== height ||newWidth * newHeight > 1024) {
		      // 如果图片已经在其他地方加载可使用面积检测
		        ready.call(img);
		        onready.end = true;
		      };
		    };
		    onready();
		    // 完全加载完毕的事件
		    img.onload = function () {
		      // onload在定时器时间差范围内可能比onready快
		      // 这里进行检查并保证onready优先执行
		      !onready.end && onready();
		      load && load.call(img);
		      // IE gif动画会循环执行onload，置空onload即可
		      img = img.onload = img.onerror = null;
		    };
		    // 加入队列中定期执行
		    if (!onready.end) {
		      list.push(onready);
		      // 无论何时只允许出现一个定时器，减少浏览器性能损耗
		      if (intervalId === null) intervalId = setInterval(tick, 40);
		    };
		  };
		})(),
		
		// 微信分享
		wx_getshareinfo(){
			let that = this
			$.ajax({
				type: "get",
				contentType: 'application/json',
				url: that.thisUrl,
				// url: that.thisUrl + '/wxapi/wxConfig',
				data: 'url=' + encodeURIComponent(window.location.href),
				success: function(data) {
					if (data.code != 200) return
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', that.onBridgeReadShow, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', that.onBridgeReadShow);
							document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReadShow);
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
		},
		onBridgeReady() { 
			WeixinJSBridge.call('hideOptionMenu'); 
		},
		onBridgeReadShow() {
			WeixinJSBridge.call('showOptionMenu');
		},
			
		// 钉钉分享
		setDingDingShareInfo() {
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
	}
})
