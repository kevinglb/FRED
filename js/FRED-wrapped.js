(function(){
    function FRED(){
        this.init();
        this.preloadImg(this.initCanvas)
        
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
            _this.shackleSwiper1 = null;
            _this.shackleSwiper2 = null;
            _this.cableSwiper = null;
            _this.shackleSwiperIndex = 0;
            _this.imgArr = [];

            _this.startFRED();
            _this.initSwiperSize(_this.initSwiper);
        },

        preloadImg: function(callback){
            //so far 2 ways to preload images for backgrounds of canvas:1.insert css directory 2.create img object
            var _this = this;
            var num = 0;
            _this.imgArr = [{"name":"blanc","src": "../FRED/img/bg/bg-blanc.jpg"},
                            {"name":"rose","src": "../FRED/img/bg/bg-rose.jpg"},
                            {"name":"or","src": "../FRED/img/bg/bg-or.jpg"},
                            {"name":"agrent","src": "../FRED/img/bg/bg-agrent.jpg"},
                            {"name":"jaune","src": "../FRED/img/bg/bg-jaune.jpg"},
                            {"name":"orrose","src": "../FRED/img/bg/bg-orrose.jpg"},
                            {"name":"turquoise","src": "../FRED/img/bg/bg-turquoise.jpg"},
                            {"name":"grisvert","src": "../FRED/img/bg/bg-grisvert.jpg"},
                            {"name":"vert","src": "../FRED/img/bg/bg-vert.jpg"},
                            {"name":"orgris","src": "../FRED/img/bg/bg-orgris.jpg"},
                            {"name":"bleu","src": "../FRED/img/bg/bg-bleu.jpg"}];
            for(var i=0;i<_this.imgArr.length;i++){
                var img = new Image();
                img.src = _this.imgArr[i].src;
                img.onload = function(){
                    _this.imgArr['img'] = img;
                    num++;
                };
                if(num >= _this.imgArr.length){
                    _this.initCanvas();
                }
            }
            //or using jQuery to insert css into head tag
            $('head').append('<link rel="stylesheet" href="css/image.css" type="text/css" />');
            
            
            // if(typeof callback == "function"){
            //     console.log(callback);
            //     callback();
            // }   
        },

        startFRED: function(){
            var _this = this;
            $('#beginPageStart,#goToPlayStart').click(function(){
                $('.beginFred').fadeOut(600,function(){
                    $('.readyPageContent').fadeIn(1000,function(){
                        $('.readyPageSkip').fadeIn(1000,function(){
                            $('.swiper-pagination').fadeIn(200)
                        });
                    });
                });
            });
            $('#fredRules').click(function(){
                $('.beginContainer').fadeOut(600,function(){
                    $('.detailsPageContainer').fadeIn(600);
                });
            });
            $('#nextPage').click(function(){
                $('.detailsPageContainer').fadeOut(600,function(){
                    $('.goToPlayContainer').fadeIn(600);
                });
            });
            $('#readyPageSkip,#closeBtn').click(function(){
                $('.readyPage').fadeOut();
            });
        },
        initCanvas: function(){
            var _this = this;
            _this.canvas.width = _this.innerWidth;
            _this.canvas.height = _this.innerHeight;
            _this.drawCanvas();
        },

        updateCanvas: function(){//del(context)
            var _this = this;
            //prevOrNext();
            var a=0;
            var b=setInterval(function(){
                _this.context.save();//保存状态
                a+=10;//擦除速度
                _this.context.rotate(45*Math.PI/180);//canvas旋转角度
                _this.context.clearRect(0,-600,a,1100);//擦除方块，需要调整
                _this.context.restore();//回归状态
                _this.context.stroke();//执行
                if(a >= 750){
                    clearInterval(b);
                    _this.drawCanvas();
                }
            },10);
        },

        drawCanvas: function(index){
            var _this = this;
            var i =0;
            var canvasBg = _this.imgArr[i]['img'];//还需要创建初始图片数组
            //console.log(canvasBg);  
            // // canvasBg.onload=function(){//需要后期优化
            _this.context.drawImage(canvasBg,0,0,_this.canvas.width,_this.canvas.height);//在canvas上画背景
        },


        initSwiperSize: function(callback){
            var _this = this;
            var rotateAngle = 37*Math.PI/180.0;
            var areaHeight = Math.floor((_this.innerHeight*0.5)*Math.cos(rotateAngle)),
                areaWidth = Math.floor(_this.innerHeight*0.5*Math.sin(rotateAngle)+_this.innerWidth*Math.cos(rotateAngle)),
                midWidth = Math.ceil(_this.innerWidth/Math.cos(37*Math.PI/180.0) + _this.innerWidth*Math.tan(rotateAngle)*Math.cos(53*Math.PI/180.0)),
                midHeight = Math.ceil(_this.innerWidth*Math.sin(rotateAngle))+1;
            _this.$topArea.css({'height':areaHeight,'width':areaWidth,'left':_this.innerWidth - areaWidth});
            _this.$botArea.css({'height':areaHeight,'width':areaWidth});
            _this.$midArea.css({'height':midHeight, 'width':midWidth,'left':(_this.innerWidth-midWidth)/2,'top':Math.ceil((_this.innerHeight-midHeight)/2)});
            _this.$midBg.css({'height':midHeight+1, 'width':midWidth,'left':(_this.innerWidth-midWidth)/2,'top':Math.ceil((_this.innerHeight-midHeight)/2)});
            $(".completeBtn").css("margin-left", -($(".completeBtn").width()/2));

            if(typeof callback === "function"){
                callback(_this); //pass the FRED scoop in case that 'this' in the callback refers to window
            }else{
                return;
            }
            //_this.initSwiper();

        },

        initSwiper: function(target){
            //console.log(this == window);
            // var _this = this === window ? this.FRED : this;
            var _this = target;
            
            _this.shackleSwiper1 = new Swiper('.shackle-container1',{shortSwipes : true,onSlideChangeStart: function(swiper){debugger;console.log(_this);_this.updateCanvas()},touchAngle:80,resistance:false,resistanceRatio:0.9,touchRatio : 0.8,watchSlidesProgress : true}),
            _this.shackleSwiper2 = new Swiper('.shackle-container2',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9}),
            _this.cableSwiper = new Swiper('.cable-container',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9});
            _this.shackleSwiper1.params.control = _this.shackleSwiper2;
            _this.shackleSwiper2.params.control = _this.shackleSwiper1;
            // _this.shackleSwiperIndex = _this.shackleSwiper1.progress;
        },


        detectDir: function(){ //detecet the direction of Swiper animation: prev or ntxt
            var _this = this;
            //console.log(_this.updateCanvas);
            var index = _this.shackleSwiper1.progress/0.125;
            if(index > _this.shackleSwiperIndex){
                console.log('next');
                $(".bgPrev").hide();
                $(".bgNext").show();
                $(".bgNext").attr("data-bg",dataArr[index]);
                $(".bgPrev").attr("data-bg",dataArr[index-1]);
            }else if(index < _this.shackleSwiperIndex){
                console.log('prev')
                $(".bgPrev").show();
                $(".bgNext").hide();
                $(".bgNext").attr("data-bg",dataArr[index-1]);
                $(".bgPrev").attr("data-bg",dataArr[index]);
            }
            _this.shackleSwiperIndex = index;
        }

    };
    window.FRED = new FRED();
}());