
    let  tl = new TimelineMax({paused:true})

    let topic = $('.topic')
    let bird = $('.bird')
    let tree = $('.tree')
    let leftF = $('.leftmidflower')
    let rightF = $('.rightmidflower')
    let cat = $('.cat')
    let mom = $('.mom')
    let son = $('.son')
    let arrow = $('.arrow')
    let $loading =$('.loading-box-con')
    var busy_up =false
    var localhostPaht = "https://ssl.qdxin.cn/xin/uauth";
    var reg_host = localhostPaht + "/active/"
    var activity_id = 5197
    var imgurl = null
    var params = {}

    tl
    .from(leftF,1,{opacity:0,left:-82},'feature')
    .from(rightF,1,{opacity:0,right:-130},'feature')
    .from(cat,1,{opacity:0,},'-=0.25')
    .from(tree,2,{opacity:0,},'feature')
    .from(topic,1,{opacity:0,scale:0.5,ease:Elastic.easeOut.config(1,0.4)},0.25)
    .from(mom,1.2,{opacity:0,left:-50,ease:Power2.easeNone},0.8)
    .from(son,1,{opacity:0,scale:0.9,right:-40,bottom:160,ease:Power3.easeNone,onComplete:genrateTouch},1)

    let caidaiarr =[
        'imgs/1red1.png',
        'imgs/1red2.png',
        'imgs/1yel1.png',
        'imgs/1whi1.png'
    ]
    function getan () {
        let tlcaidai = new TimelineMax({paused:true})
        for(let i =0;i<20;i++){
            let num_r = parseInt(Math.random(0,1)*4) 
            let string = `<img src="${caidaiarr[num_r]}" alt="" class="caidai" style="left:360px;top:400px">`
            $('.firstpage').append(string)
        }
        let element = $('.firstpage .caidai')
        for(let i=0;i<20;i++){
            tlcaidai.to(element[i],0.5,{left:Math.random(0,1)*750,top:Math.random(0,1)*900,ease:Power3.easeOut},'caidai')
        }
        tlcaidai.restart()
    }
    function getan2 () {
        let tlcaidai2 = new TimelineMax({paused:true})
        for(let i =0;i<20;i++){
            let num_r = parseInt(Math.random(0,1)*4) 
            let string = `<img src="${caidaiarr[num_r]}" alt="" class="caidai" style="left:160px;top:250px">`
            $('.resultex1').append(string)
        }
        let element = $('.resultex1 .caidai')
        for(let i=0;i<20;i++){
            tlcaidai2.to(element[i],0.5,{top:Math.random(0,1)*600-50,left:Math.random(0,1)*700-207,ease:Power3.easeInOut,onComplete:closeend},'caidai')
        }
        tlcaidai2.restart()
    }

    setTimeout(()=>{
        arrow.show()
        arrow.addClass('show')
    },2000)


    let mom2=$('.mom2')
    let second_text1 = $('.text1')
    let second_text2 = $('.text2')
    let tl2 = new TimelineMax()
    function secondA(){
        tl2.to(second_text1,1,{opacity:1,top:'9%',ease:Power2.easeNone},'textA')
        .to(second_text2,1,{opacity:1,top:'9%',ease:Power2.easeNone,onComplete:function(){
            $('.rule').fadeIn(200)
        }},'textA').delay(0.3)
    }
    // secondA()
    $('.second_btn1').on('click',function(){
        $('.rule').show()
    })
    $('.close').on('click',function(){
        $('.rule').hide()
    })
    $('.second_btn2').on('click',function(){
        $('.secondpage').hide()
        $('.thirdpage').show()
    })
    let third_btn1 = $('.third_btn1')
    let third_btn2 = $('.third_btn2')
    let photovalue = $('.photo')
    let namevalue = $('.name_value')
    let tel  = $('.tel_value')
    let name_now = null;
    let tel_now = null;
    third_btn1.on('click',function(){
        photovalue.trigger('click')
    })
    third_btn2.on('click',function(){
        // alert("活动已结束！")
        // return false;
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        name_now = namevalue.val().trim();
        tel_now = tel.val()
        if (!myreg.test(tel_now)) {
            alert('输入正确的手机号')
            return false;
        }
        if(!name_now){
            alert('输入姓名')   
            return false;
        }
        if(!$('.getimg img').attr('src')){
            alert('请上传照片')
            return false;
        }
        $loading.find('.text').text('生成照片中')
        $loading.show()
        getend()
        // submit(imgurl,name_now,tel_now).then(res=>{
        //     getend()
        // }).catch(err=>{
        //     alert('生成照片失败，请稍后再试')
        // })
    })
    var resImg1,
        resImg2,
        headImg;
    photovalue.on('change',function(e){
        if (!e.target.files.length||busy_up) {
            return false
        }
        $loading.find('.text').text('正在加载中')
        $loading.show()
        let file = e.target.files[0]
        endup(file).then(res=>{
            $('.getimg').show()
            if (res.w / res.h > 517 / 549) {
                $('.getimg img').css('height', '100%')
                $('.getimg img').css('width', 'auto')
            } else {
                $('.getimg img').css('width', '100%')
                $('.getimg img').css('height', 'auto')
            }
            headImg = res.url
            $('.getimg img').attr('src', res.url)
            $loading.hide()
            $('.photo').val('')
            // uploadfile(res.url).then(res2=>{
            //     $('.getimg').show()
            //     if(res.w/res.h>517/549){
            //         $('.getimg img').css('height','100%')
            //         $('.getimg img').css('width','auto')
            //     }else{
            //         $('.getimg img').css('width','100%')
            //         $('.getimg img').css('height','auto')
            //     }
            //     headImg = res.url
            //     $('.getimg img').attr('src',res.url)
            //     $loading.hide()
            //     $('.photo').val('')
            // }).catch(err=>{
            //     $('.photo').val('')
            //     alert('图片上传失败' + err)
            // })
        }).catch(err=>{
            $('.photo').val('')            
        })
    })

    function getend(){
        var resCanvas = document.getElementById('rescanvas');
        let ctx = resCanvas.getContext('2d');
        ctx.fillStyle='rgba(255,255,255,1)';
        ctx.fillRect(0, 0, resCanvas.width, resCanvas.height);
        // 层级按照写入顺序，越晚写入越靠上
        // 头像
        let headImg2 = new Image()
        headImg2.src= headImg
        let headImg4 = new Image()
        headImg4.src = qrcode
        var headImg1 = new Image()
        headImg1.src=headImg1_64
        headImg1.onload = ()=>{
            let cutw,cuth,postL,postT;
            let w = headImg2.width
            let h = headImg2.height
            let scalewh = 574/591
            if(w/h>574/591){
                cuth = headImg2.height;
                cutw = cuth*scalewh;
                postL = (w-cutw)/2;
                postT = 0
            }else{
                cutw = headImg2.width;
                cuth = cutw/scalewh;
                postT = (h-cuth)/2;
                postL = 0
            }
            ctx.drawImage(headImg2,postL,postT,cutw,cuth,17,17,574,591)
            ctx.drawImage(headImg1,6,617,526,188)
            ctx.drawImage(headImg4,480,694,110,110)
            var headImg3 = new Image()
            resImg1 = resCanvas.toDataURL('image/jpeg');
            // 结果图
            $('.resImg1').attr('src',resImg1)
            headImg3.src = headImg3_64
            headImg3.onload = ()=>{
                ctx.clearRect(0,617,608,198)
                ctx.fillStyle='rgba(255,255,255,1)';
                ctx.fillRect(0,617,608,198);
                ctx.drawImage(headImg3,47,617,526,188)
                ctx.drawImage(headImg4,480,694,110,110)
                resImg2 = resCanvas.toDataURL('image/jpeg');
                // 结果图
                $('.resImg2').attr('src',resImg2)
                $loading.hide() 
                $('.thirdpage').fadeOut(100)
                $('.fourpage').fadeIn(300)
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: false, // 循环模式选项
                    speed:500,
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                })  
            }
        }
    }


    let $gift = $('.gift')
    let giftex1 = $('.giftex1')
    let giftex2 = $('.giftex2')
    let giftex3 = $('.giftex3')
    let texttip = $('.texttip')
    $gift.on('click',function(){
        $('.gift_con').fadeIn(200, fourA)
        // if (lottery === null){
        //     alert('获取用户信息失败,请刷新')
        // }else if(lottery ===0 || (lottery===1&&!basedata.data.UserPhone)){
        //     $('.gift_con').fadeIn(200,fourA)
        // }else{
        //     alert('您已参加过此次抽奖')
        // }
    })
    let tl4 = new TimelineMax()

    function fourA(){
        tl4.to(giftex1,0.8,{opacity:1,scale:1,ease:Elastic.easeOut.config(1,0.4)})
        .to(giftex2,0.8,{opacity:1,scale:1,ease:Elastic.easeOut.config(1,0.4)},'-=0.45')
        .to(giftex3,0.8,{opacity:1,scale:1,ease:Elastic.easeOut.config(1,0.4)},'-=0.45')
        .to(texttip,0.3,{opacity:1,ease:Power0.easeNone,onComplete:giftclick},'-=0.45')
    }


    let prizeArr= {
        '一等奖':'imgs/firstprize.png',
        '二等奖': 'imgs/secondprize.png',
        '三等奖':'imgs/thirdprize.png',
        '幸运奖':'imgs/luckyprize.png'
    }
    let gift_loading =false 
        
    function tlpig(){
        let $leaf = $('.leaf')
        let tlleaf = new TimelineMax()
        tlleaf.to($leaf,1.5,{right:260,bottom:10,rotation:10,ease:Power3.easeOut,onComplete:closeend})
    }

    function tl4end(){
        if(lottery === 0){
            $loading.find('.text').text('正在抽奖中')
            $loading.show()
            request(name_now,tel_now).then(res=>{
                console.log(res)
                if(res.data.lottery ==1){
                    let getLotteryName = res.data.prize.name
                    $('.result').html(`
                        <div class="resultex1">
                            <img src="imgs/getcat.png" alt="" class="pig">
                            <img src="${prizeArr[getLotteryName]}" alt="" class="prize">
                        </div>
                    `)
                    $loading.hide()
                    $('.result').show()
                    getan2()
                }else {
                    $('.result').html(`
                        <div class="resultex2">
                            <img src="imgs/losecat.png" alt="" class="pig">
                            <img src="imgs/leaf.png" alt="" class="leaf">
                        </div>
                    `)
                    $loading.hide()
                    $('.result').show()
                    tlpig()
                }
            }).catch(err=>{
                if(err.state === 'token'){
                    goDrawUrl()
                }else{
                    $loading.hide()
                    gift_loading= false
                    alert('系统开了个小差')
                }
            })
        }else{
            if(lottery === 1 && !basedata.data.UserPhone){
                $loading.find('.text').text('正在抽奖中')
                $loading.show()
                $.ajax({
                    url: `${posturl}/server/updateLottery.php`,
                    type: 'post',
                    data: { 'token': localToken,'username':name_now,'userphone':tel_now},
                    dataType: 'json',
                    success:res=>{
                        if(res.state === 'ok'){
                            let getLotteryName2 = basedata.data.prize.name
                            $('.result').html(`
                                <div class="resultex1">
                                    <img src="imgs/getcat.png" alt="" class="pig">
                                    <img src="${prizeArr[getLotteryName2]}" alt="" class="prize">
                                </div>
                            `)
                            $loading.hide()
                            $('.result').show()
                            getan2()
                        }else{
                            if(res.state === 'token'){
                                goDrawUrl()
                            }else{
                                $loading.hide()
                                gift_loading= false
                                alert('系统开了个小差')
                            }
                        }
                    },
                    error:res=>{
                        $loading.hide()
                        gift_loading= false
                        alert('系统开了个小差')
                    }
                })
            }else{
                $('.result').html(`
                    <div class="resultex2">
                        <img src="imgs/losecat.png" alt="" class="pig">
                        <img src="imgs/leaf.png" alt="" class="leaf">
                    </div>
                `)
                $('.result').show()
                tlpig()
            }
        }
    }
    function closeend(){
        var $result = $('.result')
        var $giftCon = $('.gift_con')
        $result.on('click',function(){
            $result.fadeOut(300)
            $giftCon.fadeOut(300)
            lottery =3
        })
    }
    

    function giftclick () {
        $('.giftex1,.giftex2,.giftex3').on('click',function(){
            // if(gift_loading){
            //     return false
            // }
            // gift_loading = true
            tl4.to($(this),0.15,{scaleX:1.25,scaleY:0.75,ease:Power0.easeNone},'and')
            .to($(this),0.2,{scaleX:0.75,scaleY:1.15,ease:Power0.easeNone},)
            .to($(this),0.2,{scaleX:1.15,scaleY:0.85,ease:Power0.easeNone},)
            .to($(this),0.2,{scaleX:0.95,scaleY:1.25,ease:Power0.easeNone},)
            .to($(this),0.2,{scaleX:1.05,scaleY:0.95,ease:Power0.easeNone},)
            .to($(this),0.2,{scaleX:1,scaleY:1,ease:Power0.easeNone,onComplete:tl4end},)   
        })
    }




    function genrateTouch(){
        var startX,startY,moveEndX,moveEndY,loading_o=false;
        $(".firstpage").on("touchstart", function(e) {
            startX = e.originalEvent.changedTouches[0].pageX;
            startY = e.originalEvent.changedTouches[0].pageY;
        });
        $(".firstpage").on("touchend", function(e) {
        　　moveEndX = e.originalEvent.changedTouches[0].pageX;
        　　moveEndY = e.originalEvent.changedTouches[0].pageY;
        　　let Y = moveEndY - startY;
        　　if ((Y>0 ||Y<0) &&!loading_o) {
            loading_o = true
            tl.reverse()
            setTimeout(()=>{
                $('.firstpage').fadeOut(300)
                $('.secondpage').fadeIn()
                secondA()
            },1900)
        　　}
        });
    }

    var hideCallback = function () {
        window.resize();
        $('.pace').hide(); 
        $('body').css('background-color','#ffdbcd')
        $('html').css('background-color','#ffdbcd')
        $('.contair').show()
        window.paceInterval && window.clearInterval(window.paceInterval);
    };
    window.paceInterval = setInterval(function () {
        var progress = $('.pace-progress').attr('data-progress');
        if (parseInt(progress) >= 98) {
            if(gettoken_loading){
                if(lottery==null){
                    $loading.hide()
                    hideCallback();
                    tl.restart();
                    getan()
                }else{
                    $loading.show()
                }
            }else{
                window.paceInterval && window.clearInterval(window.paceInterval);
                $loading.hide()
                alert('获取信息失败请刷新')
            }
        }
    }, 200);

    function uploadfile (stampBase) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: "post",
                url: 'https://ssl.qdxin.cn/xin/uploads/base64ToImgQcloud.php',
                data: {
                    img_base64: stampBase
                },
                dataType: "json",
                success: function (data) {
                    imgurl = data.thumb
                    resolve()
                    // // that.reg_success_callback(data);
                    // console.log(data.thumb);
                    // //$controlImg.attr('src', data.thumb);
                    // addImg(data);
                    // imgData.push(data);
                    // console.log(imgData);
                    // img_num--;
                    // if (img_num <= 0) {
                    //     // alert('最多上传9张照片！');
                    //     $('.control-img-upload').hide();
                    //     return;
                    // }
                },
                error: function (request) {
                    // alert(JSON.stringify(request));
                    reject(JSON.stringify(request))
                },
                complete: function () {
                    // $gun.css('display', 'none');
                    // alert('loading');
                }
            });
        })
    }
    
    function submit (img,name,tel) {
        var url = reg_host + 'sign/submit.php?id=' + activity_id;
        params.name = name;
        params.mobile = tel;
        params.img_path =[];
        params.img_thumb_path = []
        params.img_thumb_big_path = []
        params.img_path[0] = img;
        params.img_thumb_path[0] = img;
        params.img_thumb_big_path[0] = img;
        return new Promise((resolve,reject)=>{
            $.ajax({
                cache: true,
                type: "get",
                url: url,
                data: {
                    id: activity_id,
                    data: params
                },
                dataType: "json",
                // jsonpCallback: "reg_success_callback",
                async: false,
                error: function () {
                    reject()
                },
                success: function (data) {
                    if (data.result == "success") {
                        // alert("提交成功！");
                        // // $('.form-msg')[0].reset();
                        // clearData();
                        resolve()
                    } else {
                        reject()
                        // alert(data.result);
                    }
                }
            });
        })
    }
     
    function request(name,tel){
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: `${posturl}/server/getLottery.php`,
                type: 'get',
                data: { 'token': localToken },
                dataType: 'json',
                success:(res)=>{
                    let now_data = res
                    if(res.state ==='ok'){
                        if(res.data.lottery ===1){
                            lottery =1;
                            basedata = res
                            $.ajax({
                                url: `${posturl}/server/updateLottery.php`,
                                type: 'post',
                                data: { 'token': localToken,'username':name,'userphone':tel},
                                dataType: 'json',
                                success:res=>{
                                    if(res.state == 'ok'){
                                        resolve(now_data)
                                    }else{
                                        reject(res)
                                    }
                                },
                                error:res=>{
                                    reject(res)
                                }
                            })
                        }else if (res.data.lottery === 0){
                            resolve(now_data)
                        }
                    }else{
                        reject (res)
                    }
                },
                error:(res)=>{
                    reject(res)
                }
            })
        }) 
    }

    function endup (file){
        return new Promise(resolve => {
            EXIF.getData(file, function(){
                let Orientation = EXIF.getTag(this, 'Orientation');
                let fileSize = file.size
                let reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = (res) => {
                    let img = new Image();
                    img.src = res.target.result
                    let scale = parseInt(fileSize/1000000) === 0? 1 : parseInt(fileSize/1000000)+1;
                    let enscale = Math.sqrt(scale).toFixed(1);
                    img.onload = function(){
                        let img = this;
                        let w = parseInt(img.width/enscale);
                        let h = parseInt(img.height/enscale);
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext('2d');
                        if(Orientation){
                        switch(Orientation){
                            case 6:     // 旋转90度
                            canvas.width = h;
                            canvas.height = w;
                            ctx.fillStyle='rgba(255,255,255,1)';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.rotate(Math.PI / 2);
                            // (0,-h) 从旋转原理图那里获得的起始点
                            ctx.drawImage(img, 0, -h, w, h);
                            break;
                            case 3:     // 旋转180度
                            canvas.width = w;
                            canvas.height = h;
                            ctx.fillStyle='rgba(255,255,255,1)';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.rotate(Math.PI);
                            ctx.drawImage(img, -w, -h, w, h);
                            break;
                            case 8:     // 旋转-90度
                            canvas.width = h;
                            canvas.height = w;
                            ctx.fillStyle='rgba(255,255,255,1)';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.rotate(3 * Math.PI / 2);
                            ctx.drawImage(img, -w, 0, w, h);
                            break;
                            default:
                            canvas.width = w;
                            canvas.height = h;
                            ctx.fillStyle='rgba(255,255,255,1)';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img, 0, 0, w, h);
                        }
                        }else{
                            canvas.width = w;
                            canvas.height = h;
                            ctx.fillStyle='rgba(255,255,255,1)';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img, 0, 0, w, h);
                        }
                        let newbase64 = canvas.toDataURL('image/jpeg');
                        let dataarr = {
                            url:newbase64,
                            w:canvas.width,
                            h:canvas.height
                        }
                        resolve(dataarr)
                    }
                }
            });
        })
    }
