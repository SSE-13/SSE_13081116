/**
 * 重力加速度
 */
var GRAVITY = 9.8;
var BOUNDS_TOP = 0;
var BOUNDS_BOTTOM = 400;
var BOUNDS_LEFT = 0;
var BOUNDS_RIGHT = 400;
var BOUNCE = 0.95;
var friction = 0.99;
/**
 * 计时器系统
 */
var Ticker = (function () {
    function Ticker() {
        this.bodyQueue = [];
    }
    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    Ticker.prototype.start = function (bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    };
    Ticker.prototype.onTicker = function () {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function (body) {
            body.onTicker(duringTime / 100);
        });
    };
    return Ticker;
}());
var Body = (function () {
    function Body(displayObject) {
        this.vx = 0;
        this.vy = 0;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.displayObject = displayObject;
    }
    Body.prototype.onTicker = function (duringTime) {
		//如果开始滑动, 不必计算重力加速度和Y轴位移
		if(this.vy === 0 && BOUNDS_BOTTOM <= this.y + this.height)
		{
		
		}
		else
		{
			this.vy += duringTime * GRAVITY;
			this.y += duringTime * this.vy;
		}
        this.x += duringTime * this.vx;
		
		var dstg = BOUNDS_BOTTOM - this.y - this.height;//离地面高度
		
		//是否开始滑动
		if(Math.abs(this.vy) <= 1 && Math.abs(dstg)<=1)
		{
			this.vy = 0;
			this.y = BOUNDS_BOTTOM - this.height;
		}
		//Add friction
		if (this.vy === 0) {
			this.vx = friction * this.vx;
		}
		
        //反弹
        if (dstg <= 0)
		{
			this.vy = -BOUNCE * this.vy;
			//处理弹跳越界部分
			this.y = BOUNDS_BOTTOM*2 - this.y - this.height*2;
        }
		else if(this.y <= BOUNDS_TOP)
		{
            this.vy = -BOUNCE * this.vy;
			//处理弹跳越界部分
			this.y = BOUNDS_TOP*2 - this.y;
		}
        //TODO： 左右越界反弹
        if (this.x + this.width >= BOUNDS_RIGHT)
		{
            this.vx = -BOUNCE * this.vx;
			//处理弹跳越界部分
			this.x = BOUNDS_RIGHT*2 - this.width*2 - this.x;
        }
		else if(this.x <= BOUNDS_LEFT)
		{  
            this.vx = -BOUNCE * this.vx;
			//处理弹跳越界部分
			this.x = BOUNDS_LEFT * 2 - this.x;
		}
        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;
    };  
    return Body;
}());
var rect = new Rect();
rect.width = 50;
rect.height = 50;
rect.color = '#FF0000';
/**
 * 创建一个物体，其显示内容为一个长方形，受重力做平抛运动
 */
var body = new Body(rect);
body.width = rect.width;
body.height = rect.height;
body.vx = 100; //需要保证 vx 在 0-100的范围内行为正常
body.vy = 0; //需要保证 vy 在 0-100的范围内行为正常
var renderCore = new RenderCore();
var ticker = new Ticker();
renderCore.start([rect]);
ticker.start([body]);
