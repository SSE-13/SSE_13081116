

var mainContainer=new render.DisplayObjectContainer();
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();

head.source = "head.png";
trunk.source = "trunk.png";
left_leg.source = "leftleg.png";
right_leg.source = "rightleg.png";
left_arm.source = "lefthand.png";
right_arm.source = "righthand.png";

humanContainer.addChild(head);
humanContainer.addChild(trunk);
humanContainer.addChild(left_leg);
humanContainer.addChild(right_leg);
humanContainer.addChild(left_arm);
humanContainer.addChild(right_arm);

humanContainer.x=-50;
humanContainer.y=-60;
mainContainer.addChild(humanContainer);

var renderCore = new render.RenderCore();
renderCore.start(mainContainer, ["head.png","trunk.png","leftleg.png", "rightleg.png","lefthand.png","righthand.png"]);

var speed=4;
var rotationspeed=3;

class HumanBody extends Body {
    
    vx=speed;
    x=100;
    y=200;
    onTicker(duringTime: number) {
        this.x += duringTime* this.vx;
        this.rotation +=rotationspeed*duringTime*Math.PI;
    }
}

var ticker = new Ticker();
var body = new HumanBody(mainContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var head_click=0;
var leg_click=false;

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    
    if(localPoint.x>=24&&localPoint.x<=73&&localPoint.y>=-1&&localPoint.y<=40){        
        head_click++;        
        console.log("head");
    }
    else if(localPoint.x>=25&&localPoint.x<=40&&localPoint.y>=78&&localPoint.y<=96||
    localPoint.x>=49&&localPoint.x<=65&&localPoint.y>=80&&localPoint.y<=96){
        //leg
        leg_click=true;
        head_click=0;
        console.log("leg");

    }
    return true;
}

var headOnClick = () => {
    //alert("clicked!!");
    console.log(head_click+","+leg_click);
    //前进中点头 反向移动
    if(head_click==1&&!leg_click){
        body.vx*=-1;
        rotationspeed*=-1;
        head_click=0;
    }
    
    //前进/后退中点腿 站立
    else if(head_click==0&&leg_click){
        body.vx=0;
        rotationspeed=0;
        body.rotation=0;
    }
    
    //站立中点头 继续前进
    else if(head_click==1&&leg_click){
        body.vx=4;
        rotationspeed=3;
        leg_click=false;
        head_click=0;
    }
    
}

eventCore.register(head,headHitTest,headOnClick);



/*
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x = 100;
head.source = "wander-icon.jpg";
humanContainer.addChild(head);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);

class HumanBody extends Body {
    
    
    vx:number = 5;
    

    onTicker(duringTime: number) {
        this.x = 100;//+= duringTime * this.vx;
        this.y = 100;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);

*/








