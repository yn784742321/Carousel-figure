//轮播-----------------------------------------------------------------------------------
$(function(){
    //生成轮播用的span
    function createSpan(width){
        var spanL = $("<span></span>");
        spanL.css({
            class:"_sl",
            display:"block",
            width:"26px",
            height:"36px",
            background:"rgba(0,0,0,0.2)",
            position:"absolute",
            left:"0",
            top:"45%",
            zIndex:"200",
            cursor:"pointer",
            textAlign:"center",
            display:"none"
        });
        spanL.attr("dir","left"); 
        $("._container").append(spanL);
        var arrL = $("<i></i>");
        var slCss = spanL.css("height");
        arrL.css({
            width:"0",
            height:"0",
            display:"inline-block",
            lineHeight:slCss,
            marginTop:"50%",
            borderTop:"6px solid transparent",
            borderBottom:"6px solid transparent",
            borderRight:"6px solid #eee",
        });
        spanL.append(arrL);
        var spanR = $("<span></span>");
        spanR.css({
            class:"_sr",
            display:"block",
            width:"26px",
            height:"36px",
            background:"rgba(0,0,0,0.2)",
            position:"absolute",
            right:"0",
            top:"45%",
            zIndex:"200",
            cursor:"pointer",
            textAlign:"center",
            display:"none"
        });
        $("._container").append(spanR);
        var arrR = $("<i></i>");
        var srCss = spanL.css("height");
        arrR.css({
            width:"0",
            height:"0",
            display:"inline-block",
            lineHeight:srCss,
            marginTop:"50%",
            borderTop:"6px solid transparent",
            borderBottom:"6px solid transparent",
            borderLeft:"6px solid #eee"
        });
        spanR.append(arrR);
        $("._container").mouseover(function(){
            spanL.show();
            spanR.show();
        }).mouseout(function(){
            spanL.hide();
            spanR.hide();
        });
    }
    //tween
    var timer=null;
    function move(target,current) {
        clearInterval(timer);
        timer = setInterval(function () {
            var speed = (target-current)/3;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            if(current==target){
                clearInterval(timer);
            }
            current = current+speed;
            $("._wrap_content").css("left",current);
        },30);
    }
    //切换图片
    function lunbo(width,dir){
        dir = dir || -1;
        var contain = $("._wrap_content");
        var target = -1*width*count;
        var current = -1*width*(count+dir);
        $("._wrap_content").css("left",current);
        move(target,current);
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
            if(count==n){
                count=0;
            }
            lunbo(width,dir);     
        }
    }
    //自动轮播
    var timer1 = setInterval(function(){
        manualLunbo(width,-1);
    },2500);
    //初始化
    function init(){
        //生成轮播用span
        createSpan(width);
        //开始和暂停轮播
        $("._container").mouseover(function(){
            clearInterval(timer1);
        });
        $("._container").mouseout(function(){
            timer1 = setInterval(function(){
                 manualLunbo(width,-1);
            },2500);
        });
        $("._container span").eq(0).click(function(){
            manualLunbo(width,1);
        });
        $("._container span").eq(1).click(function(){
            manualLunbo(width);
        });
    }
    //所有变量初始化
    var count = 0;
    var n=4;
    var width = 1192;
    init();
});
