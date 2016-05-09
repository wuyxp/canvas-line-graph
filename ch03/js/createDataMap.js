/**
 * Created by wuyang on 16/5/8.
 */

//数据折线构造函数
function createDataMap(gd,ox,oy,w,h){
    this.ox = ox;
    this.oy = oy;
    this.w = w;
    this.h = h;
    this.gd = gd;
    this.gd.DataMap = [];
}

createDataMap.prototype.drawDataMap = function(color,res,animation){
    var dataMap = {};
    var animation = animation || true; //是否动画启动数据

    var resdata = res.ret_set[0].monitor_info.default.data;
    var l = resdata.length;
    var m = Math.max.apply(null,resdata);

    if(animation){
        this.animation(color,function () {});
    }

    dataMap.instance_id = res.ret_set[0].instance_id;
    dataMap.display_name = res.ret_set[0].display_name;
    dataMap.timestamp = res.ret_set[0].timestamp;
    dataMap.d = {};

    this.gd.save();
    this.gd.beginPath();
    this.gd.translate(0.5,0.5);
    this.gd.lineWidth = 3;
    this.gd.strokeStyle = color;


    for(var i=0;i<l;i++){
        var y = ((m-resdata[i])/m)*this.h+this.oy;
        var x = i/l*this.w+this.ox;
        dataMap.d[parseInt(x)] = {};
        dataMap.d[parseInt(x)].v = resdata[i];
        dataMap.d[parseInt(x)].x = x;
        dataMap.d[parseInt(x)].y = y;
        this.gd.lineTo(x,y);

    }


    this.gd.stroke();
    this.gd.restore();

    this.gd.DataMap.push(dataMap);
};

createDataMap.prototype.animation = function(color,cbfun){
    var _this = this;
    var timer = null;
    var state_x=1;
    var cbfun = cbfun || function(){};
    function ss(){

        var start_x = _this.ox;
        var start_y = _this.oy+_this.h/2;
        var end_x = _this.ox + _this.w;
        var end_y = start_y;
        state_x++;
        var _x = Math.tween.Quad.easeInOut(state_x,start_x,end_x,100);

        _this.gd.save();
        _this.gd.beginPath();
        _this.gd.translate(0.5,0.5);
        _this.gd.lineWidth = 4;
        _this.gd.strokeStyle = color;
        _this.gd.moveTo(start_x,start_y);
        _this.gd.lineTo(_x,end_y);
        _this.gd.stroke();
        _this.gd.restore();
        if(_x>=end_x){
            cbfun.apply();
            return false;
        }
        requestAnimFrame(ss);
    }
    ss();
};
