(function(){
    function FRED(){
        this.init();
        //this.preloadImg();
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
            _this.canvas = document.getElementById('canvas');
            _this.context = _this.canvas.getContext('2d');


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
        },

        initCanvas: function(){
            var _this = this;

            _this.canvas.width = _this.innerWidth;
            _this.canvas.height = _this.innerHeight;
            _this.drawCanvas();
        },

        drawCanvas: function(){
            var _this = this;
            _this.canvasBg.src=imageArr[imgIndex].src;//还需要创建初始图片数组
            // canvasBg.onload=function(){//需要后期优化
            _this.context.drawImage(_this.canvasBg,0,0,_thiscanvas.width,_thiscanvas.height);//在canvas上画背景
        },
        updateCanvas: function(){
            var _this = this;
            prevOrNext();
            var a=0;
            var b=setInterval(function(){
                _this.context.save();//保存状态
                a+=10;//擦除速度
                _this.context.rotate(45*Math.PI/180);//canvas旋转角度
                _this.context.clearRect(0,-600,a,1100);//擦除方块，需要调整
                _this.context.restore();//回归状态
                _this.context.stroke();//执行
                if(a>=750){
                    clearInterval(b);
                    _this.drawCanvas();
                }
            },10);
        }

    };
    window.FRED = new FRED();
}());