var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainContainer = new render.DisplayObjectContainer();
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
humanContainer.x = -50;
humanContainer.y = -60;
mainContainer.addChild(humanContainer);
var renderCore = new render.RenderCore();
renderCore.start(mainContainer, ["head.png", "trunk.png", "leftleg.png", "rightleg.png", "lefthand.png", "righthand.png"]);
var speed = 4;
var rotationspeed = 3;
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = speed;
        this.x = 100;
        this.y = 200;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += duringTime * this.vx;
        this.rotation += rotationspeed * duringTime * Math.PI;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(mainContainer);
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var head_click = 0;
var leg_click = false;
var headHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x >= 24 && localPoint.x <= 73 && localPoint.y >= -1 && localPoint.y <= 40) {
        head_click++;
        console.log("head");
    }
    else if (localPoint.x >= 25 && localPoint.x <= 40 && localPoint.y >= 78 && localPoint.y <= 96 ||
        localPoint.x >= 49 && localPoint.x <= 65 && localPoint.y >= 80 && localPoint.y <= 96) {
        //leg
        leg_click = true;
        head_click = 0;
        console.log("leg");
    }
    return true;
};
var headOnClick = function () {
    //alert("clicked!!");
    console.log(head_click + "," + leg_click);
    //前进中点头 反向移动
    if (head_click == 1 && !leg_click) {
        body.vx *= -1;
        rotationspeed *= -1;
        head_click = 0;
    }
    else if (head_click == 0 && leg_click) {
        body.vx = 0;
        rotationspeed = 0;
        body.rotation = 0;
    }
    else if (head_click == 1 && leg_click) {
        body.vx = 4;
        rotationspeed = 3;
        leg_click = false;
        head_click = 0;
    }
};
eventCore.register(head, headHitTest, headOnClick);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxJQUFJLGFBQWEsR0FBQyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3RELElBQUksY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7QUFDM0IsUUFBUSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7QUFDaEMsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFDbEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFDakMsU0FBUyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFFbkMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxjQUFjLENB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