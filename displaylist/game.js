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
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 4;
        this.y = 200;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += duringTime * this.vx;
        this.rotation += 3 * duringTime * Math.PI;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(mainContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map