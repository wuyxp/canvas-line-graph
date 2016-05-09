/**
 * Created by wuyang on 16/5/8.
 */

//canvas  圆角矩形的画法
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
}

/*
 创建画布
 */
function createTable(w,h){
    this.w = w;
    this.h = h;
    this.c = null;
    this.f = this.f || this.create();

};
createTable.prototype.create = function(){
    var f = document.createDocumentFragment();
    this.c = document.createElement("canvas");

    this.c.width = this.w;
    this.c.height = this.h;

    f.appendChild(this.c);
    return f;
};
createTable.prototype.getTable = function(){
    return this.f;
};
createTable.prototype.getCanvas = function(){
    return this.c;
};