// 提示框
var InfoDlg = function(info, closeDelay, func){ 
	var timerId = false;
	var hasOk = false;
	if(typeof closeDelay === 'function'){
		func = closeDelay;
		closeDelay = null;
	}
	if(!func){
		func = function(){ };
	}
	closeDelay = parseInt(closeDelay);
	var dlg = new DFZ.ui.alert(info, {
		hasBtn:!closeDelay,
		ok_callback : function(){ func(); clearTimeout( timerId ); timerId = false; hasOk=true; },
		onClose : function(){ (hasOk || func()); clearTimeout( timerId ); timerId = false; }
	});
	if(closeDelay){
		timerId = setTimeout(function(){
			clearTimeout( timerId );
			timerId = false;
			dlg.close();
		}, closeDelay);	
	}
	return dlg;
};

/* input输入框点击隐藏提示,带有z_replace样式的对象*/
(function($){
    $.fn.z_replace = function(options) 
    {
        $(this).bind('click',function(){
            if ($(this).attr('title') == $(this).val())
            {
                $(this).val('').css('color','#666');
            }
        });
        $(this).bind('blur',function(){
            if ($(this).val()=='')
            {
                $(this).val($(this).attr('title')).css('#ccc');
            }
        });
    };  

})(jQuery);



function login(no_refresh)
{
    //设置登录后是否刷新
    $("#weibo_login").attr("no_refresh",no_refresh);

    tb_tips('正在拉取登录窗口...');
    tb_insert('用户登录',450,200,$("#position_user").html());
}

$("#weibo_login").live('click',function(event){
    sinaSSOController.customLoginCallBack = function(loginStatus){
        if(loginStatus.result)
        {
            tb_tips('登录成功!');
            setTimeout(function(){
                tb_remove();
                if(!$("#weibo_login").attr("no_refresh")){
                    window.location.reload();
                }
            },1000)
        }
        else 
        {
            var reason = (typeof(loginStatus.reason)!='undefinded' && loginStatus.reason) ?  loginStatus.reason : '微博帐号或密码错误';
            alert(reason);
        }            
    }; 
  
    var savestate = $("#TB_ajaxContent").find("#weibo_remember").attr("checked") ? 30 : 0 ; 
    sinaSSOController.login($("#TB_ajaxContent").find('input[name=username]').val().trim() , $("#TB_ajaxContent").find('input[name=password]').val().trim() , savestate);   
    event.preventDefault();
    return false;
});

// 上传图片
var setUploadFile = function(conf){
        var isPicType = $ACT_INFO.ACT_TYPE.indexOf('3') != 0; // 是否是图片类型,第一个是3就不是图片类型
        var actId = conf.actId; // 活动id
        var image; // 图片地址
        var image_width;
        var image_height;
        var work_desc; // 图片描述
        var toWeibo; // 是否发送到微博
        var toMeishitui;  // 是否发送到美食推
        var tip = conf.tip || '提交成功！';
        var act_status = conf.act_status;
        var in_blacklist = conf.in_blacklist;
        // 弹窗html标签
        var checkhtml = ($ACT_INFO.ACT_TYPE == '10') ? 
        		('同步到：<a id="to-meishitui" class="act-uploadPic-syncFood act-uploadPic-syncBtn" title="美食推"></a>' +
                '<a id="to-weibo" class="act-uploadPic-syncWeibo act-uploadPic-syncBtn" title="新浪微博"></a>') :
                ('<input type="checkbox" id="to-weibo" name="to-weibo" checked="checked" class="act-uploadPic-syncWeibo act-uploadPic-syncBtn" style="background:none;"/><label for="to-weibo">同步到微博</label><span id="to-meishitui"></span>');
        
        var html = ('<div class="pop-wrap" style="margin: 0;"><div class="pop">	<h3 class="pop-tit">参加活动</h3><a href="#" pop-uploadfile="close" id="join_act_close" class="close">关闭</a><form id="form-join-activity" action="" class="image-intro"><h4>图片说明</h4> <p><textarea id="tarea-description" class="textarea"></textarea></p> <p pop-uploadfile="upload-select"><a id="upload-a" href="#" class="upload-pic" title="上传图片">&nbsp;</a><em class="grey">选择并上传(限jpg/png/gif格式，3M以内)</em></p> <p pop-uploadfile="upload-loading"> <em class="grey pic-loading">图片正在上传，请等待...</em></p> <p pop-uploadfile="upload-success"><a href="#" class="upload-pic" title="上传图片">&nbsp;</a><em class="file-name" pop-uploadfile="filename-wrap"></em><a pop-uploadfile="upload-cancel" href="#">取消</a></p><p  class="tc"><input type="submit" value="" class="sub" /></p></form><div id="file-browser"><form target="Upfiler_file_iframe" class="img_form" action="${上传地址}?cb=${回调文件地址}&callback_func=${回调函数}&pic_name=pic1" enctype="multipart/form-data" method="POST"><input type="file" id="file-upload-input" hideFocus="true" class="img_file" name="pic1" /></form></div><iframe frameborder="0" src="about:blank" name="Upfiler_file_iframe" id="Upfiler_file_iframe" class="fb_img_iframe" style="display: none;"></iframe>' +
             '<div class="act-uploadPic-syncWrapper">' +
             checkhtml +
             '</div>' +
             '</div></div>').replace(/\$\{(.*?)\}/g,function(all,type){
            switch (type){
                case '上传地址':
                    return conf.uploadPatch;
                case '回调函数':
                    return '__uploadCallback__';
                case '回调文件地址':
                    return conf.callbackFilePatch;
            }
        });
        // 弹窗dialog对象
        var dialog = new DFZ.ui.LightBox({
            content : html ,
            hidden : true,
            bgColor : "#000",
            opacity : .3,
            zIndex : 10001,
            isHover : false
        });
        $('#to-weibo').click(function(){
            if(this.className.indexOf('disabled')==-1){
                this.className ="act-uploadPic-syncWeibo-disabled act-uploadPic-syncBtn";
            }else{
                this.className ="act-uploadPic-syncWeibo act-uploadPic-syncBtn";
            };
        });
         $('#to-meishitui').click(function(){
            if(this.className.indexOf('disabled')==-1){
                this.className ="act-uploadPic-syncFood-disabled act-uploadPic-syncBtn";
            }else{
                this.className ="act-uploadPic-syncFood act-uploadPic-syncBtn";
            };
        }); 
        // 文件浏览设置onchange事件监听，在onchange之后上传文件
        $('#file-upload-input').css({fontSize:'80px',position:'absolute', opacity:0, right:'0', top:'-2px',cursor:'pointer'}).attr('title','上传图片').get(0).onchange = function(){
        	image = '';  // 上传尚未上传完成，将上传状态置为未上传 
            $('[pop-uploadfile=upload-success]').css('display','none');
            $('[pop-uploadfile=upload-select]').css('display','none');
            $('#file-upload-input').css('display','none');
            $('[pop-uploadfile=upload-loading]').css('display',''); 
            $(this).parent().submit(); 
        }; 
        // 弹窗关闭按钮事件监听
        $('[pop-uploadfile=close]').live('click',function(e){
        	image = '';
            $('#tarea-description').val('');
            dialog.hidd();    
			e.preventDefault();
        });
        // 取消按钮点击后重新显示提示信息
		$('[pop-uploadfile=upload-cancel]').live('click', function(e){
			$('[pop-uploadfile=upload-success]').css('display','none');
            $('[pop-uploadfile=upload-loading]').css('display','none');
			$('[pop-uploadfile=upload-select]').css('display','');
            $('#file-upload-input').css('display','');
            image = false; // 将上传状态置为未上传
           e.preventDefault(); 
		});
        // 初始化的时候上传成功的信息是隐藏的
        $('[pop-uploadfile=upload-loading]').css('display','none');
		$('[pop-uploadfile=upload-success]').css('display','none'); 
        // 注册上传的回调函数
		window.__uploadCallback__ = function(response){
            if(response.error == '0'){
                $('[pop-uploadfile=filename-wrap]').html(response.real_pic_name);
                $('[pop-uploadfile=upload-success]').css('display','');
                $('[pop-uploadfile=upload-select]').css('display','none');
                $('[pop-uploadfile=upload-loading]').css('display','none');
                $('#file-upload-input').css('display','');
                image = response.pic_large;
                image_width = response.pic_large_width;
                image_height = response.pic_large_height;
            }else{
                DFZ.ui.error(response.errmsg , function(){
                    // 关闭弹窗之后什么都不做
                });
                image = '';
                $('[pop-uploadfile=upload-success]').css('display','none');
                $('[pop-uploadfile=upload-select]').css('display','');
                $('[pop-uploadfile=upload-loading]').css('display','none');
                $('#file-upload-input').css('display','');
            }
            conf.callbackFunc.call(dialog, response);
		};

        $('#tarea-description').live('keypress keydown keyup input',function(e){
            if($.byteLength(this.value) >= 240){  
                this.value = $.substrCn(this.value, 120);
                this.focus();
            } 
        });
        // 为浏览按钮设置样式，和IE6兼容性的调整
        $('#file-browser').css({width:'80px',height:'27px',position:'absolute',left:'45px',top:'182px',overflow:'hidden'});
		 if(DFZ.util.browser.IE6){
	            var fileControl = $('#file-upload-input').get(0);
	            fileControl.style.filter = 'alpha(opacity=0)';
		 }
        // 表单提交拦截，改成ajax提交
        $('#form-join-activity').live('submit', function(e){
            e.preventDefault();
            work_desc = $('#tarea-description').val();
            toWeibo = ($('#to-weibo').get(0).className.indexOf('disabled')==-1) ? 1 : 0;
            toMeishitui = ($('#to-meishitui').get(0).className.indexOf('disabled')==-1) ? 1 : 0;
            if(isPicType && !image){
                return DFZ.ui.error('您还没有上传图片。',function(){});
            }
            if(!work_desc){
                return DFZ.ui.error('您还没有填写图片说明。',function(){});
            }
            $.$getJSON(conf.submitPatch, {
                        act_id:actId,
                        image:image,
                        image_height:image_height,
                        image_width:image_width,
                        work_desc:work_desc,
                        to_weibo:toWeibo,
                        to_meishitui:toMeishitui
                    }, function(data){
                    	if(data.error == 1){ 
                    		DFZ.ui.error(data.errmsg);
                    	}else{
                    		dialog.hidd();
                    		image = '';
                            $('#tarea-description').val('');
                            //添加中奖逻辑：如果启用抽奖则
                            if( data.draw && data.draw.tip && data.draw.tip.text ) {
								InfoDlg( tip ,'',function() {
									$( 'h3', $('div#dialog_prize_div') ).text( ( data.draw.tip.text ) );
                                    if( data.draw.tip.image ) {
                                        $( 'div.prize-pic img', $('div#dialog_prize_div') ).attr('src',( data.draw.tip.image ) );
                                    } else {
                                        $( 'div.prize-pic', $('div#dialog_prize_div') ).hide();
                                    }
									InfoDlg( $('div#dialog_prize_div').find('div.prize-div').html() ,function(){
										location.reload(); 
									})._$node.find('.F_btn').css({textAlign:'center'}).end().find('.layer_point .point dd').css({width:'auto'});
								});
								return;
							}
                            var callback = function (){ 
                            	location.reload(); 
                            };
                            var dlg = new DFZ.ui.alert(tip,
                            	{hasBtn : true,
                    			width : "auto",
                    			ok_callback : callback,
                    			onClose : callback
                    		});  
                            var timer = setTimeout(function(){
                            	dlg.close();
                            }, 3000);
                    	}
                    },{
                    mode:'abort',
                    dataType:'jsonp'
                });
        });
        // 参加活动按钮增加点击事件
		$(conf.activeBtn).click(function(e){
			if($CONFIG.ERROR==1){
				DFZ.ui.alert('你的账号异常');
				return;
			}
			if( conf.check_login == 1 && $CONFIG.ID==undefined){
				login();
				return;
			}
			if(act_status==1){
				DFZ.ui.alert('活动未开始');
				return;
			}else if(act_status==3){
				DFZ.ui.alert('活动已结束');
				return;
			}
            if($ACT_INFO.ACT_TYPE=='10' && $CONFIG.IS_FOOD_USER =='0'){
                return DFZ.ui.customAlert('您还不是美食推用户，无法参加活动','去激活',function(){
                	window.open('http://'+$CONFIG.FOOD_DOMAIN);
                });
            }
			if(in_blacklist==1){
				DFZ.ui.alert('资格受限，无法参加活动');
				return;
			}
			dialog.show();
			 $('[pop-uploadfile=upload-success]').css('display','none');             
             if(isPicType){
                $('[pop-uploadfile=upload-select]').css('display','');
                $('#file-upload-input').css('display','');
             }else{
                $('[pop-uploadfile=upload-select]').css('display','none');
                $('#file-upload-input').css('display','none');
                $('#form-join-activity h4').html('&nbsp;');
             }
             $('[pop-uploadfile=upload-loading]').css('display','none');             
			e.preventDefault();
		});
		dialog.hidd();
		if($ACT_INFO.ACT_TYPE!='10')
		{
			$("#to-meishitui").hide();
			$("#to-meishitui").get(0).className ="act-uploadPic-syncFood-disabled act-uploadPic-syncBtn";
		}
};

DFZ.ui.customAlert = function(content, okText,onOk){
    if(this === DFZ.ui || this === window){
        return new DFZ.ui.customAlert(content, okText,onOk);
    }
    var that = this;
	var obj = {};
    var options = {};
    var tpl = '<div style="font:12px/24px Microsoft YaHei" node-type="inner"><div class="layer_point" node-type="outer"><dl style="list-style:none;" class="point clearfix"><dt><span node-type="icon" class="icon_warnM"></span></dt><dd style="margin:0; padding:0;" node-type="inner"><p node-type="textLarge" class="W_texta"  style="margin:0; padding:5px; padding-left:20px; font:14px/24px Microsoft YaHei;">{{html content}}</p><p node-type="textSmall" class="W_textb"></p></dd></dl><div class="btn W-btn" style="text-align:center; padding-top:40px;"><a node-type="OK" id="${ok_id}" class="W_btn_b" href="javascript:void(0)"><span>${ok_label}</span></a><a node-type="OK" id="${cancel_id}" class="W_btn_a" href="javascript:void(0)"><span>${cancel_label}</span></a></div></div></div>',
		ok_id = "ok_" + (new Date).getTime(),
		cancel_id = "cancel_" + (new Date).getTime(),
		_content = "",
		_dialog = null,
		$btn = null,
		tempJ = $("<div></div>");
	options = $.extend({
		hasBtn : true,
		title : "提示",
		ok_label : okText || "确定",
		cancel_label : "取消",
		ok_callback : function(){
            if(typeof(onOk) == 'function'){
                onOk();
            }
        },
		cancel_callback : function(){}
	}, options || {});
	
    obj.width = options.width ? options.width: 380;
    obj.height = options.height;
    obj.zIndex = options.zIndex;
    obj.hidden = options.hidden;
	obj.title = options.title;
	obj.isBg = options.isBg;
	obj.noDrag = false;
	obj.esc = true;
	obj.isTitle = options.isTitle;
	_content = $.tmpl(tpl, {
		content : content,
		ok_label : options.ok_label,
		cancel_label : options.cancel_label,
		ok_id : ok_id,
		cancel_id : cancel_id
	}).appendTo(tempJ);
	
	obj.content = tempJ.html();
	
	_dialog = new DFZ.ui.BasicDiaglog(obj);
	
	$ok = $("#" + ok_id);
	$cancel = $("#" + cancel_id);
    var j = function() {
        options.ok_callback();
		$ok.unbind("click", r);
		$ok = null;
		$cancel.unbind("click", a);
		$cancel = null;
		_dialog.close();
		$(document).unbind("keyup", r);
        return false;
    };
    var a = function() {
        options.cancel_callback();
		$ok.unbind("click", r);
		$ok = null;
		$cancel.unbind("click", a);
		$cancel = null;
		_dialog.close();
		$(document).unbind("keyup", r);
        return false;
    };
    var r = function(event) {
        var x = event,
        	w = x.target,
			tagName = w.tagName.toUpperCase();
        if (w.nodeType == 3) {
            w = w.parentNode
        }
        if (w.tagName == "input" || w.tagName == "textarea") {
            return;
        }
        switch (x.keyCode) {
        case 27:
            a();
            break;
        }
    };
	
	$ok.bind("click", j);
	
	$cancel.bind("click", a);
	
	$(document).bind("keyup", r);
    if (options.hidden) {
        this.focusTarget = $ok;
    } else {
        $ok.focus();
    }
	_dialog.show();
	return _dialog;
};

        



