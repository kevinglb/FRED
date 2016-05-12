(function(){
    function FRED(){
        this.init();
    }
    FRED.prototype={
        init: function(){
            var _this = this;
            _this.innerHeight = window.innerHeight,
            _this.innerWidth  = window.innerWidth,
            _this.$topArea = $(".topArea"),
            _this.$midArea = $(".midArea"),
            _this.$botArea = $(".botArea"),
            _this.$midBg = $(".midBg");
        },
        initSwiperSize: function(callback){
            var _this = this;
            var areaHeight = Math.floor((_this.innerHeight*0.5)*Math.cos(rotateAngle)),
                areaWidth = Math.floor(_this.innerHeight*0.5*Math.sin(rotateAngle)+_this.innerWidth*Math.cos(rotateAngle)),
                midWidth = Math.ceil(_this.innerWidth/Math.cos(37*Math.PI/180.0) + _this.innerWidth*Math.tan(rotateAngle)*Math.cos(53*Math.PI/180.0)),
                midHeight = Math.ceil(_this.innerWidth*Math.sin(rotateAngle))+1;
            _this.$topArea.css({'height':areaHeight,'width':areaWidth,'left':width - areaWidth});
            _this.$botArea.css({'height':areaHeight,'width':areaWidth});
            _this.$midArea.css({'height':midHeight, 'width':midWidth,'left':(width-midWidth)/2,'top':Math.ceil((height-midHeight)/2)});
            _this.$midBg.css({'height':midHeight+1, 'width':midWidth,'left':(width-midWidth)/2,'top':Math.ceil((height-midHeight)/2)});
            if(typeof callback === "function"){
                callback();
            }else{
                return;
            }
        },
        initSwiper: function(){
            var _this = this;
            var shackleSwiper1 = new Swiper('.shackle-container1',{shortSwipes : true,touchAngle:80,resistance:false,resistanceRatio:0.9,onSlideChangeEnd: function(swiper){changeBG()}}),
                shackleSwiper2 = new Swiper('.shackle-container2',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9}),
                cableSwiper = new Swiper('.cable-container',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9});
            shackleSwiper1.params.control =shackleSwiper2;
            shackleSwiper2.params.control =shackleSwiper1;
        }
    };
    window.FRED = new FRED();
}());