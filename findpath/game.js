var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
        }
        WorldMap.prototype.render = function (context) {
            var walkable = '#F0F0FF';
            var unwalkable = '#000000';
            context.strokeStyle = '#00000F';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if (!this.grid.getWalkable(i, j)) {
                        context.fillStyle = unwalkable;
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    }
                    else {
                        context.fillStyle = walkable;
                        context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fill();
                        context.stroke();
                    }
                }
            }
            context.closePath();
        };
        return WorldMap;
    }(DisplayObject));
    game.WorldMap = WorldMap;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#0000FF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.body_x = new Array();
            this.body_y = new Array();
            this.dx = new Array();
            this.dy = new Array();
            this.movestep = 1;
        }
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            this.FindPath = new astar.AStar();
            this.FindPath.setHeurisitic(this.FindPath.diagonal);
            var result = this.FindPath.findPath(grid);
            var path = this.FindPath._path;
            for (var i = 0; i < this.FindPath._path.length; i++) {
                this.body_x[i] = this.FindPath._path[i].x;
                this.body_y[i] = this.FindPath._path[i].y;
                console.log("x:" + this.body_x[i] + ", y:" + this.body_x[i]);
            }
            for (var j = 1; j < this.FindPath._path.length; j++) {
                this.dx[j] = this.body_x[j] - this.body_x[j - 1];
                this.dy[j] = this.body_y[j] - this.body_y[j - 1];
                console.log(this.dx[j] + "," + this.dy[j]);
            }
            console.log(path);
            console.log(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            if (this.x < NUM_ROWS * GRID_PIXEL_WIDTH && this.y < NUM_COLS * GRID_PIXEL_HEIGHT) {
                if (this.movestep < this.FindPath._path.length - 1) {
                    this.x += GRID_PIXEL_WIDTH * this.dx[this.movestep];
                    this.y += GRID_PIXEL_HEIGHT * this.dy[this.movestep];
                    this.movestep++;
                    console.log(this.dx[this.movestep] + "  " + this.dy[this.movestep]);
                }
            }
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
var renderCore = new RenderCore();
renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
