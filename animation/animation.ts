
/**
 * 重力加速度
 */
const GRAVITY = 9.8;

const BOUNDS_TOP=0;

const BOUNDS_BOTTOM = 400;

const BOUNDS_LEFT = 0;

const BOUNDS_RIGHT = 400;

const BOUNCE = 0.95;

//摩擦减速因数(改了)
const friction= 0.99;

/**
 * 计时器系统
 */
class Ticker {

    bodyQueue = [];

    lastTime;

    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    start(bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    }

    onTicker() {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function(body) {
            body.onTicker(duringTime / 100)
        });
    }
}


class Body {

    vx = 0;
    vy = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    //添加属性:是否接触地面
    touchGround = false;    


    displayObject;

    constructor(displayObject: DisplayObject) {
        this.displayObject = displayObject;
    }

    public onTicker(duringTime) {
        //如果未触地开始滑动,计算重力加速度和Y轴位移,否则不计算
        if (!this.touchGround) {
            this.vy += duringTime * GRAVITY;
            this.y += duringTime * this.vy;
        }
        this.x += duringTime * this.vx;

        //离地面高度
        var dstg = BOUNDS_BOTTOM - this.y - this.height;
		
        //判断是否触地开始滑动
        if (Math.abs(this.vy) <= 1 && Math.abs(dstg) <= 1) {
            this.touchGround = true;
            this.vy = 0;
            this.y = BOUNDS_BOTTOM - this.height;
        }
        //Add friction
        if (this.vy === 0) {
            this.vx = friction * this.vx;
        }
		
        //反弹
        if (dstg <= 0) {
            this.vy = -BOUNCE * this.vy;
            //处理弹跳越界部分
            this.y = BOUNDS_BOTTOM * 2 - this.height * 2 - this.y;
        }
        else if (this.y <= BOUNDS_TOP) {
            this.vy = -BOUNCE * this.vy;
            //处理弹跳越界部分
            this.y = BOUNDS_TOP * 2 - this.y;
        }
        //TODO： 左右越界反弹
        if (this.x + this.width >= BOUNDS_RIGHT) {
            this.vx = -BOUNCE * this.vx;
            //处理弹跳越界部分
            this.x = BOUNDS_RIGHT * 2 - this.width * 2 - this.x;
        }
        else if (this.x <= BOUNDS_LEFT) {
            this.vx = -BOUNCE * this.vx;
            //处理弹跳越界部分
            this.x = BOUNDS_LEFT * 2 - this.x;
        }
        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;
    }
}


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
body.vx = 100;//需要保证 vx 在 0-100的范围内行为正常
body.vy = 0;//需要保证 vy 在 0-100的范围内行为正常


var renderCore = new RenderCore();
var ticker = new Ticker();

renderCore.start([rect]);
ticker.start([body]);


