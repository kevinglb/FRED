$(function(){
    var height = window.innerHeight,
        width = window.innerWidth,
        rotateAngle = 37*Math.PI/180.0;
    var areaHeight = Math.floor((height*0.5)*Math.cos(rotateAngle)),
        areaWidth = Math.floor(height*0.5*Math.sin(rotateAngle)+width*Math.cos(rotateAngle)),
        midWidth = Math.ceil(width/Math.cos(37*Math.PI/180.0) + width*Math.tan(rotateAngle)*Math.cos(53*Math.PI/180.0)),
        midHeight = Math.ceil(width*Math.sin(rotateAngle))+1;
        //midWith appears white space if using rotateAngle 

    $(".topArea").css({'height':areaHeight,'width':areaWidth,'left':width - areaWidth});
    $(".botArea").css({'height':areaHeight,'width':areaWidth});
    $(".midArea").css({'height':midHeight, 'width':midWidth,'left':(width-midWidth)/2,'top':Math.ceil((height-midHeight)/2)});
    $(".midBg").css({'height':midHeight+1, 'width':midWidth,'left':(width-midWidth)/2,'top':Math.ceil((height-midHeight)/2)});
      
    //initial three swipers and sync the control of two shackleSwiper    
    var shackleSwiper1 = new Swiper('.shackle-container1',{shortSwipes : true,
        touchAngle:80,
        resistance:false,
        resistanceRatio:0.9,
        onSlideChangeStart: function(swiper){del(context)},
        watchSlidesProgress : true
    }),
    shackleSwiper2 = new Swiper('.shackle-container2',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9}),
    cableSwiper = new Swiper('.cable-container',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9});
    shackleSwiper1.params.control =shackleSwiper2;
    shackleSwiper2.params.control =shackleSwiper1;

    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');
    canvas.width=width;
    canvas.height=height;

    var num=shackleSwiper1.progress;
    var changeNum;

    var imgIndex=0;

    var canvasBg=new Image();
    function drawBg(){
        canvasBg.src=imageArr[imgIndex].src;//还需要创建初始图片数组
        // canvasBg.onload=function(){//需要后期优化
        context.drawImage(canvasBg,0,0,canvas.width,canvas.height);//在canvas上画背景
        // }
    }
        var aa=0;
    function del(context){//
        aa++;
        console.log(aa);
        prevOrNext();
        var a=0;
        var b=setInterval(function(){
            context.save();//保存状态
            a+=15;//擦除速度
            context.rotate(45*Math.PI/180);//canvas旋转角度
            context.clearRect(0,-600,a,1500);//擦除方块，需要调整
            context.restore();//回归状态
            context.stroke();//执行
            if(a>=1000){
                clearInterval(b);
                drawBg();
            }
        },10)
    }
    function prevOrNext(){
        changeNum=shackleSwiper1.progress;
        var index = changeNum/0.125;
        if(changeNum>num){
            console.log('next');
            $(".bgPrev").hide();
            $(".bgNext").show();
            imgIndex++;
            // $('.bgNext').css({background:imageArr[imgIndex+1].src})
            $(".bgNext").attr("data-bg",dataArr[index]);
            $(".bgPrev").attr("data-bg",dataArr[index-1]);
        }else if(changeNum<num){
            console.log('prev')
            $(".bgPrev").show();
            $(".bgNext").hide();
            imgIndex--;
            $(".bgNext").attr("data-bg",dataArr[index-1]);
            $(".bgPrev").attr("data-bg",dataArr[index]);
        }
        num=changeNum;
    }

    //load
    (function(){
        var imgSources={
            blanc:"../FRED/img/bg/bg-blanc.jpg",
            rose:"../FRED/img/bg/bg-rose.jpg",
            or:"../FRED/img/bg/bg-or.jpg",
            agrent:"../FRED/img/bg/bg-agrent.jpg",
            jaune:"../FRED/img/bg/bg-jaune.jpg",
            orrose:"../FRED/img/bg/bg-orRose.jpg",
            turquoise:"../FRED/img/bg/bg-turquoise.jpg",
            grisvert:"../FRED/img/bg/bg-grisvert.jpg",
            vert:"../FRED/img/bg/bg-vert.jpg",
            orgris:"../FRED/img/bg/bg-orgris.jpg",
            bleu:"../FRED/img/bg/bg-bleu.jpg",
        }    
        //执行图片预加载，加载完成后执行main
        loadImages(imgSources,imgCallback);
    })();
    function loadImages(imgSources,imgCallback){
        var images={};
        var loadedImages = 0;    
        var numImages = 0;  
        for (var src in imgSources) {
            numImages++;
            images[src] = new Image();
            //把imgSources中的图片信息导入images数组  
            images[src].src = imgSources[src];   
            //当一张图片加载完成时执行    
            images[src].onload = function(){
                loadedImages++;
                //重绘一个进度条
                //当所有图片加载完成时，执行回调函数callback
                if (loadedImages >= numImages) {    
                    imgCallback(images);
                    console.log('success');     
                }    
            };  
             
        }    
    }

    var imageArr=[];
    var dataArr = [];
    function imgCallback(images){//载入完成后回调
        for(var a in images){
            var obj = images[a];
            imageArr.push(obj);
            dataArr.push(a.toString());
        }
        drawBg();
        // loadScript();
    }
    function loadScript(){
        var body=document.getElementsByTagName('body')[0];
        var script=document.createElement("script");
        script.type="text/javascript";
        script.src=""
        body.appendChild(script);
    }
    
});