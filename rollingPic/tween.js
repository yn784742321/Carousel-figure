//轮播-----------------------------------------------------------------------------------
$(function(){
    //生成span
    function createSpan(){
        $("._container").append($("<span class='_sl'><img src='images/arr_left.png'></span>"));
        $("._container").append($("<span class='_sr'><img src='images/arr_right.png'></span>"));
        var _wrap_dot = $("<div class='_wrap_dot'></div>");
        $("._container").append(_wrap_dot);
        var _dot = [];
        for(var i=0;i<n;i++){
            _dot[i] = $("<i class='_dot'></i>");
            $("._wrap_dot").append(_dot[i]);
        }
    }
    //tween
    Math.easeout = function (current, target, rate, callback) {
        if (current == target || typeof current != 'number') {
            return;
        }
        target = target || 0;
        rate = rate || 2;
        var step = function () {
            current = current + (target - current) / rate;
            if (Math.abs(current-target) < 1) {
                callback(target, true);
                return;
            }
            callback(current, false);
            requestAnimationFrame(step);
        };
        step();
    };
    //小圆点控制图片
    function dotChangePic(index){
        if(count==index) return;
        var current = -count*width;
        var target = -index*width;
        count = index;
        Math.easeout(current,target,8,function (value){
            $("._wrap_content").css("left",value);
        });
    }
    //切换图片
    function lunbo(width,dir){
        dir = dir || -1;
        var contain = $("._wrap_content");
        var target = -width*count;
        var current = -width*(count+dir);
        $("._wrap_content").css("left",current);
        Math.easeout(current,target,8,function (value){
            $("._wrap_content").css("left",value);
        });
        //小圆点样式
        var index = count;
        if(index==n){
            index = 0;
        }
        $("._dot").eq(index).addClass("_dotBg").siblings().removeClass("_dotBg");
    }
    //手动轮播
    function manualLunbo(width,dir){
        dir = dir || -1;
        if(dir==1){
            count--;
            if(count==-1){
                count=n-1;
            }
            lunbo(width,dir);   
        }else{
            count++;
            if(count==n+1){
                count=1;
            }
            lunbo(width,dir);     
        }
    }
    //自动轮播
    var timer1 = setInterval(function(){
        manualLunbo(width,-1);
    },3000);
    //初始化
    function init(){
        //生成span
        createSpan(n);
        //初始化小圆点第一个
        $("._dot").eq(0).addClass("_dotBg");
        //展示收起span
        $("._container").mouseover(function(){
            $("._sl").show();
            $("._sr").show();
        }).mouseout(function(){
            $("._sl").hide();
            $("._sr").hide();
        });
        //开始和暂停轮播
        $("._container").mouseover(function(){
            clearInterval(timer1);
        });
        $("._container").mouseout(function(){
            timer1 = setInterval(function(){
                 manualLunbo(width,-1);
            },3000);
        });
        $("._sl").click(function(){
            manualLunbo(width,1);
        });
        $("._sr").click(function(){
            manualLunbo(width);
        }); 
        $("._wrap_dot ._dot").each(function(){
            $(this).click(function(){
                $(this).addClass("_dotBg").siblings().removeClass("_dotBg");
                dotChangePic($("._wrap_dot ._dot").index(this));
            });
        });
    }    
    //所有变量初始化
    var count = 0;
    var n=4;
    var width = 1192;
    init();
});