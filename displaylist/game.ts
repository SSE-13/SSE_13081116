module game {


}

var maincontainer=new render.DisplayObjectContainer();
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

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","trunk.png","leftleg.png", "rightleg.png","lefthand.png","righthand.png"]);


class HumanBody extends Body {
    
    vx=4;
    y=100;
    onTicker(duringTime: number) {

        this.x += duringTime* this.vx;
        this.y += duringTime* this.vy; 
        this.rotation +=Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);











