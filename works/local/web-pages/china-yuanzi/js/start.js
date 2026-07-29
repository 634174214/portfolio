var imgbox=$('#imglist img');
var playvid = $('#playVid'),
    videowrap = $('#vidplayer').parent(),
    vidplayer = $('#vidplayer'),
    dotime = null,
    vidclose = $('#close');
var videoSrc = {
    'pc':'media/pc.mp4',
    'm':'media/m.mp4'
};
if (IsPC()) {
    vidplayer.attr('src',videoSrc.pc);
    var isIE = IEVersion();
    if (isIE && isIE > 0) {
        dotime = 100;
    } else {
        dotime = 90;
    }
} else {
	dotime = 90;
    vidplayer.attr('src',videoSrc.m);
}
var manifest = [
            "movimg/1.jpg",
            "movimg/2.jpg",
            "movimg/3.jpg",
            "movimg/4.jpg",
            "movimg/5.jpg",
            "movimg/6.jpg",
            "movimg/7.jpg",
            "movimg/8.jpg",
            "movimg/9.jpg",
            "movimg/10.jpg",
            "movimg/11.jpg",
            "movimg/12.jpg",
            "movimg/13.jpg",
            "movimg/14.jpg",
            "movimg/15.jpg",
            "movimg/16.jpg",
            "movimg/17.jpg",
            "movimg/18.jpg",
            "movimg/19.jpg",
            "movimg/20.jpg",
            "movimg/21.jpg",
            "movimg/22.jpg",
            "movimg/23.jpg",
            "movimg/24.jpg",
            "movimg/25.jpg",
            "movimg/26.jpg",
            "movimg/27.jpg",
            "movimg/28.jpg",
            "movimg/29.jpg",
            "movimg/30.jpg",
            "movimg/31.jpg",
            "movimg/32.jpg",
            "movimg/33.jpg",
            "movimg/34.jpg",
            "movimg/35.jpg",
            "movimg/36.jpg",
            "movimg/37.jpg",
            "movimg/38.jpg",
            "movimg/39.jpg",
            "movimg/40.jpg",
            "movimg/41.jpg",
            "movimg/42.jpg",
            "movimg/43.jpg",
            "movimg/44.jpg",
            "movimg/45.jpg",
            "movimg/46.jpg",
            "movimg/47.jpg",
            "movimg/48.jpg",
            "movimg/49.jpg",
            "movimg/50.jpg",
            "movimg/51.jpg",
            "movimg/52.jpg",
            "movimg/53.jpg",
            "movimg/54.jpg",
            "movimg/55.jpg",
            "movimg/56.jpg",
            "movimg/57.jpg",
            "movimg/58.jpg",
            "movimg/59.jpg",
            "movimg/60.jpg",
            "movimg/61.jpg",
            "movimg/62.jpg",
            "movimg/63.jpg",
            "movimg/64.jpg",
            "movimg/65.jpg",
            "movimg/66.jpg",
            "movimg/67.jpg",
            "movimg/68.jpg",
            "movimg/69.jpg",
            "movimg/70.jpg",
            "movimg/71.jpg",
            "movimg/72.jpg",
            "movimg/73.jpg",
            "movimg/74.jpg",
            "movimg/75.jpg",
            "movimg/76.jpg",
            "movimg/77.jpg",
            "movimg/78.jpg",
            "movimg/79.jpg",
            "movimg/80.jpg",
            "movimg/81.jpg",
            "movimg/82.jpg",
            "movimg/83.jpg",
            "movimg/84.jpg",
            "movimg/85.jpg",
            "movimg/86.jpg",
            "movimg/87.jpg",
            "movimg/88.jpg",
            "movimg/89.jpg",
            "movimg/90.jpg",
            "movimg/91.jpg",
            "movimg/92.jpg",
            "movimg/93.jpg",
            "movimg/94.jpg",
            "movimg/95.jpg",
            "movimg/96.jpg",
            "movimg/97.jpg",
            "movimg/98.jpg",
            "movimg/99.jpg",
            "movimg/100.jpg",
            "movimg/101.jpg",
            "movimg/102.jpg",
            "movimg/103.jpg",
            "movimg/104.jpg",
            "movimg/105.jpg",
            "movimg/106.jpg",
            "movimg/107.jpg",
            "movimg/108.jpg",
            "movimg/109.jpg",
            "movimg/110.jpg",
            "movimg/111.jpg",
            "movimg/112.jpg",
            "movimg/113.jpg",
            "movimg/114.jpg",
            "movimg/115.jpg",
            "movimg/116.jpg",
            "movimg/117.jpg",
            "movimg/118.jpg",
            "movimg/119.jpg",
            "movimg/120.jpg",
            "movimg/121.jpg",
            "movimg/122.jpg",
            "movimg/123.jpg",
            "movimg/124.jpg",
            "movimg/125.jpg",
            "movimg/126.jpg",
            "movimg/127.jpg",
            "movimg/128.jpg",
            "movimg/129.jpg",
            "movimg/130.jpg",
            "movimg/131.jpg",
            "movimg/132.jpg",
            "movimg/133.jpg",
            "movimg/134.jpg",
            "movimg/135.jpg",
            "movimg/136.jpg",
            "movimg/137.jpg",
            "movimg/138.jpg",
            "movimg/139.jpg",
            "movimg/140.jpg",
            "movimg/141.jpg",
            "movimg/142.jpg",
            "movimg/143.jpg",
            "movimg/144.jpg",
            "movimg/145.jpg",
            "movimg/146.jpg",
            "movimg/147.jpg",
            "movimg/148.jpg",
            "movimg/149.jpg",
            "movimg/150.jpg",
            "movimg/151.jpg",
            "movimg/152.jpg",
            "movimg/153.jpg",
            "movimg/154.jpg",
            "movimg/155.jpg",
            "movimg/156.jpg",
            "movimg/157.jpg",
            "movimg/158.jpg",
            "movimg/159.jpg",
            "movimg/160.jpg",
            "movimg/161.jpg",
            "movimg/162.jpg",
            "movimg/163.jpg",
            "movimg/164.jpg",
            "movimg/165.jpg",
            "movimg/166.jpg",
            "movimg/167.jpg",
            "movimg/168.jpg",
            "movimg/169.jpg",
            "movimg/170.jpg",
            "movimg/171.jpg",
            "movimg/172.jpg",
            "movimg/173.jpg",
            "movimg/174.jpg",
            "movimg/175.jpg",
            "movimg/176.jpg",
            "movimg/177.jpg",
            "movimg/178.jpg",
            "movimg/179.jpg",
            "movimg/180.jpg",
            "movimg/181.jpg",
            "movimg/182.jpg",
            "movimg/183.jpg",
            "movimg/184.jpg",
            "movimg/185.jpg",
            "movimg/186.jpg",
            "movimg/187.jpg",
            "movimg/188.jpg",
            "movimg/189.jpg",
            "movimg/190.jpg",
            "movimg/191.jpg",
            "movimg/192.jpg",
            "movimg/193.jpg",
            "movimg/194.jpg",
            "movimg/195.jpg",
            "movimg/196.jpg",
            "movimg/197.jpg",
            "movimg/198.jpg",
            "movimg/199.jpg",
            "movimg/200.jpg",
            "movimg/201.jpg",
            "movimg/202.jpg",
            "movimg/203.jpg",
            "movimg/204.jpg",
            "movimg/205.jpg",
  
];
var queue = new createjs.LoadQueue(true);

queue.on("progress", handleFileLoad);//加载进度 
queue.on("complete", handleComplete);//加载完成
queue.loadManifest(manifest);//加载的列表
function handleFileLoad(e){
    var bnum=parseInt(queue.progress*100);
    $("#loading p").html(bnum+"%");
    $("#loading i").width(bnum+'%');
}
function handleComplete(){
     $("#loading").fadeOut('slow');
}

function appendimg(){
    sclimg=[];
    for(n=2;n<205;n++){
            var shre=n+".jpg";
            var src="movimg/"+shre;
            if(src!=undefined || src!="undefined" || src!=""){
                sclimg.push(src);
            }
    }
    leng=sclimg.length;
    n_asize=$("#imglist img").size();
    for(i=n_asize;i<leng;i++){ 
             $("#imglist").append("<img src="+sclimg[i]+">");
     }
}
    
function imgplay(){
     var num=$(".on").index();
     sleng=$("#imglist img").size();
     if(num<sleng-1){
        num=num+1;
     }else{
        num=0;
     }
     $("#imglist img").eq(num).addClass("on").siblings().removeClass("on");
}
appendimg();
// 播放图片
var imger=setInterval(function(){
     imgplay();
},dotime);
function closeVideo(){
    vidplayer[0].pause();
    videowrap.fadeOut();
}

playvid.on('click',function(){
   vidclose.on('click',closeVideo);
   $('#videobg').on('click',closeVideo);
   videowrap.fadeIn('slow');
   vidplayer[0].play();
});