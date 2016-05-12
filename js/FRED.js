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
    var shackleSwiper1 = new Swiper('.shackle-container1',{shortSwipes : true,touchAngle:80,resistance:false,resistanceRatio:0.9,onSlideChangeEnd: function(swiper){changeBG()}}),
        shackleSwiper2 = new Swiper('.shackle-container2',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9}),
        cableSwiper = new Swiper('.cable-container',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9});
    shackleSwiper1.params.control =shackleSwiper2;
    shackleSwiper2.params.control =shackleSwiper1;

    function changeBG(){
        var topBg = $(".fullBg.top"),
            botBg = $(".fullBg.bot");
        topBg.fadeOut(50);
        botBg.fadeIn(100);
        botBg.removeClass("bot").addClass("top");
        topBg.removeClass("top").addClass("bot");
        
    }
});