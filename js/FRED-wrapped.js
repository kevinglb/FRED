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

            _this.imgArr = [];
            _this.canvas = document.getElementById('canvas');
            _this.context = _this.canvas.getContext('2d');
            _this.shackleSwiper1 = null;
            _this.shackleSwiper2 = null;
            _this.cableSwiper = null;
            _this.shackleSwiperIndex = 0;

            //these will update once slide on cable or shackle
            _this.selectedCable = "gold";
            _this.selectedShackle = "blanc";

            _this.imgArr = [];
            _this.userInfo={};
            _this.userInfoPass=false;

            _this.startFRED();
            _this.preloadImg(_this.initCanvas);
            _this.initSwiperSize();
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
                var image = new Image();
                image.src = _this.imgArr[i].src;
                _this.imgArr[i].image= image;
                image.onload = function(){
                    num++;
                    if(num >= _this.imgArr.length && typeof callback == "function"){
                        //console.log(callback);
                        callback(); //the default 'this' in callback will refer to window scoop
                    };
                }
            }
            //or using jQuery to insert css into head tag
            $('head').append('<link rel="stylesheet" href="css/image.css" type="text/css" />'); 
        },

        startFRED: function(){
            var _this = this;
            $('#beginPageStart,#goToPlayStart').bind('click',function(){
                $('.beginFred').fadeOut(500,function(){
                    $('.readyPageContent').fadeIn(1000,function(){
                        $('.readyPageSkip').fadeIn(1000,function(){
                            $('.swiper-pagination').fadeIn(200)
                        });
                    });
                });
            });
            $('#fredRules').bind('click',function(){
                $('.beginContainer').fadeOut(500,function(){
                    $('.detailsPageContainer').fadeIn(500);
                });
            });
            $('#nextPage').bind('click',function(){
                $('.detailsPageContainer').fadeOut(500,function(){
                    $('.goToPlayContainer').fadeIn(500);
                });
            });
            $('#readyPageSkip,#closeBtn').bind('click',function(){
                $('.readyPage').fadeOut();
            });

            var readyPageSwiper = new Swiper('.readyPage-container',{pagination : '.swiper-pagination',shortSwipes : true, resistance : false,resistanceRatio:0.9});

            $('input[type="date"]').change(function(event) {
                $('.dateContainer .year').text($('#date').val().slice(0,4))
                $('.dateContainer .month').text($('#date').val().slice(5,7))
                $('.dateContainer .day').text($('#date').val().slice(8,10))
            });
            $('#formSubmit').bind('click',function(){
                var sureName=$('#sureName').val().trim(),
                    givenName=$('#givenName').val().trim(),
                    sex=$('input[type="radio"]:checked').val(),
                    email=$('#email').val().trim(),
                    city=$('#city').val().trim(),
                    birthday=$('#date').val().trim(),
                    newsletter=$('input[type="checkbox"]:checked').val();
                if(sureName==''){
                    $('.prompt .promptInput').text('请输入您的');
                    $('.prompt .promptSelect').text('尊姓');
                    $('.prompt').fadeIn(800,function(){
                        $('.prompt').fadeOut(800)
                    })
                    // alert('请输入您的姓')
                }else if(givenName==''){
                    $('.prompt .promptInput').text('请输入您的');
                    $('.prompt .promptSelect').text('名字');
                    $('.prompt').fadeIn(800,function(){
                        $('.prompt').fadeOut(800)
                    })
                    // alert('请输入您的名字')
                }else if(sex==undefined){
                    $('.prompt .promptInput').text('请选择您的');
                    $('.prompt .promptSelect').text('性别');
                    $('.prompt').fadeIn(800,function(){
                        $('.prompt').fadeOut(800)
                    })
                    // alert('请选择您的性别')
                }else if(email==''){
                    $('.prompt .promptInput').text('请输入您的');
                    $('.prompt .promptSelect').text('电子邮箱');
                    $('.prompt').fadeIn(800,function(){
                        $('.prompt').fadeOut(800)
                    })
                    // alert('请输入您的电子邮箱')
                }else if(city==''){
                    $('.prompt .promptInput').text('请输入您');
                    $('.prompt .promptSelect').text('所在的城市');
                    $('.prompt').fadeIn(800,function(){
                        $('.prompt').fadeOut(800)
                    })
                    // alert('请输入您所在的城市')
                }else if(birthday==''){
                    $('.prompt .promptInput').text('请输入您的');
                    $('.prompt .promptSelect').text('生日');
                    $('.prompt').fadeIn(800,function(){
                        $('.prompt').fadeOut(800)
                    })
                    // alert('请输入您的生日')
                }else{
                    _this.userInfoPass=true;
                }
                    
                _this.getUserInfo(sureName,givenName,sex,email,city,birthday,newsletter);
            })
        },

        initCanvas: function(){
            //initCanvas used as callback function, the "this" refers to window as default
            var _this = this === window ? window.FRED : this;
            _this.canvas.width = _this.innerWidth;
            _this.canvas.height = _this.innerHeight;
            _this.drawCanvas();
        },

        updateCanvas: function(){//del(context)
            var _this = this;
            _this.detectDir();
            var a=0;
            var b=setInterval(function(){
                _this.context.save();//保存状态
                a+=10;//擦除速度
                _this.context.rotate(45*Math.PI/180);//canvas旋转角度
                _this.context.clearRect(0,-500,a,1100);//擦除方块，需要调整
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
            var i =_this.shackleSwiperIndex,
                canvasBg = _this.imgArr[i].image;//还需要创建初始图片数组
            _this.context.drawImage(canvasBg,0,0,_this.canvas.width,_this.canvas.height);//在canvas上画背景
        },

        initSwiperSize: function(){
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
            $(".completeBtn").bind('click',function(){
                $(".completeFred").addClass("active");

                _this.initForm();
                _this.generateCombo();
                setTimeout(function(){
                    $(".wrap").hide();
                },300);
        
            });
            _this.initSwiper();
        },

        initSwiper: function(){
            
            var _this = this;
            //console.log(_this);
            
            _this.shackleSwiper1 = new Swiper('.shackle-container1',{shortSwipes : true,onSlideChangeStart: function(swiper){_this.updateCanvas()},onSlideChangeEnd: function(swiper){_this.changeShackle()},touchAngle:80,resistance:false,resistanceRatio:0.9,touchRatio : 0.8,watchSlidesProgress : true}),
            _this.shackleSwiper2 = new Swiper('.shackle-container2',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9}),
            _this.cableSwiper = new Swiper('.cable-container',{shortSwipes : true, touchAngle:80,resistance : false,resistanceRatio:0.9,onSlideChangeEnd: function(swiper){_this.changeCable()}});
            _this.shackleSwiper1.params.control = _this.shackleSwiper2;
            _this.shackleSwiper2.params.control = _this.shackleSwiper1;
            //_this.shackleSwiperIndex = _this.shackleSwiper1.progress;
        },

        changeCable: function(){
            var _this = this;
            _this.selectedCable = $(".cable-container").find(".swiper-slide-active").find('.cableImg').attr("data-cable");
            console.log(_this.selectedCable);
        },

        changeShackle: function(){
            var _this = this;
            _this.selectedShackle = $(".shackle-container1").find(".swiper-slide-active").find('.shackleImg').attr("data-shackle");
        },

        detectDir: function(){ //detecet the direction of Swiper animation: prev or ntxt
            var _this = this;
            //console.log(_this.updateCanvas);
            var index = _this.shackleSwiper1.progress/0.125;
            if(index > _this.shackleSwiperIndex){
                console.log('next');
                $(".bgPrev").hide();
                $(".bgNext").show();
                $(".bgNext").attr("data-bg",_this.imgArr[index].name);
                $(".bgPrev").attr("data-bg",_this.imgArr[Math.abs(index-1)].name);
            }else if(index < _this.shackleSwiperIndex){
                console.log('prev')
                $(".bgPrev").show();
                $(".bgNext").hide();
                $(".bgNext").attr("data-bg",_this.imgArr[Math.abs(index-1)].name);
                $(".bgPrev").attr("data-bg",_this.imgArr[index].name);
            }
            _this.shackleSwiperIndex = index;
        },

        generateCombo: function(){
            var _this = this;
            var bracelet = "img/complete-bracelet/"+_this.selectedShackle+"-"+_this.selectedCable+".png";
            console.log(bracelet);
            var bg = "url('img/images/complete_"+_this.selectedShackle+".jpg')";
            $(".shareWrap").css({"background-image": bg});
            $(".shareWrap .combo").attr("src",bracelet);
        },
        initForm:function(){
            var _this = this;
            $("#formSubmit").bind('click',function(){
                if(_this.userInfoPass){
                    $(".shareWrap").addClass("active");
                }
            });
        },

        completeForm:function(){
            var _this = this;
        },
        getUserInfo:function(sureName,givenName,sex,email,city,birthday,newsletter){
            var _this = this;
            _this.userInfo.name=sureName+givenName;
            _this.userInfo.sex=sex;
            _this.userInfo.email=email;
            _this.userInfo.city=city;
            _this.userInfo.birthday=birthday;
            _this.userInfo.newsletter=newsletter;
            console.log(_this.userInfo);
        },


    };
    window.FRED = new FRED();
}());