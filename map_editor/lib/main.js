"use strict";
const fs = require('fs');
//撤销用
var history_row = new Array();
var history_col = new Array();
var history_val = new Array();
//=====================================
//读取json
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
//写入json
function writeFile() {
    console.log(mapData);
    var map_path = __dirname + "/map.json";
    var json = "{\"map\":" + JSON.stringify(mapData) + "}";
    console.log(json);
    fs.writeFileSync(map_path, json, "utf-8");
    console.log("saved");
}
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
//保存按钮触发条件
var SaveHitTest = (localPoint, displayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= 100 && localPoint.y >= 0 && localPoint.y <= 50)
        return true;
};
//撤销按钮触发条件
var UndoHitTest = (localPoint, displayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= 100 && localPoint.y >= 0 && localPoint.y <= 50)
        return true;
};
//撤销函数(不知怎么撤颜色= =)
function UndoFunction() {
    if (history_row.length <= 0) {
        alert("已撤销至最后一步");
        return;
    }
    else {
        var r = history_row.pop();
        var c = history_col.pop();
        mapData[r][c] = history_val.pop();
    }
    console.log("undone");
}
//点击事件
function onTileClick(tile) {
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);
    history_row.push(tile.ownedRow);
    history_col.push(tile.ownedCol);
    history_val.push(mapData[tile.ownedRow][tile.ownedCol]);
    mapData[tile.ownedRow][tile.ownedCol] = mapData[tile.ownedRow][tile.ownedCol] ? 0 : 1;
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);
}
//保存按钮
function onSaveClick() {
    console.log("saving");
    writeFile();
}
//撤销按钮
function onUndoClick() {
    console.log("undo");
    UndoFunction();
}
//创建存储数据的数组、渲染、事件核心
var mapData = readFile();
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
//渲染相关
var mainContainer = new render.DisplayObjectContainer();
var button1 = new render.Bitmap();
button1.source = "aaa.png";
button1.y = 250;
var button2 = new render.Bitmap();
button2.source = "undo.png";
button2.x = 150;
button2.y = 250;
var editor = createMapEditor();
mainContainer.addChild(button1);
mainContainer.addChild(button2);
mainContainer.addChild(editor);
renderCore.start(mainContainer, ["aaa.png", "undo.png"]);
eventCore.register(button1, SaveHitTest, onSaveClick);
eventCore.register(button2, UndoHitTest, onUndoClick);
