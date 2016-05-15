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
        onSlideChangeEnd: function(swiper){del(context)},
        watchSlidesProgress : true
    }),
        shackleSwiper2 = new Swiper('.shackle-container2',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9}),
        cableSwiper = new Swiper('.cable-container',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9});
    shackleSwiper1.params.control =shackleSwiper2;
    shackleSwiper2.params.control =shackleSwiper1;


    // function changeBG(){
    //     var topBg = $(".fullBg.top"),
    //         botBg = $(".fullBg.bot");
    //     topBg.fadeOut(50);
    //     botBg.fadeIn(100);
    //     botBg.removeClass("bot").addClass("top");
    //     topBg.removeClass("top").addClass("bot");
        
    // }
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');
    canvas.width=width;
    canvas.height=height;
    var canvasBg=new Image();
    canvasBg.src="../FRED/img/bg/bg-agrent.jpg";//还需要创建初始图片数组
    canvasBg.onload=function(){//需要后期优化
        context.drawImage(canvasBg,0,0);//在canvas上画背景
    }
    function del(context){//
        console.log(shackleSwiper1.progress);//当前页页码
        var a=0;
        var b=setInterval(function(){
            context.save();//保存状态
            a+=30;//擦除速度
            context.rotate(45*Math.PI/180);//canvas旋转角度
            context.clearRect(0,-600,a,1500);//擦除方块，需要调整
            context.restore();//回归状态
            context.stroke();//执行
            if(a==1500){
                clearInterval(b);
                context.drawImage(canvasBg,0,0);
            }
        },10)
    }
});