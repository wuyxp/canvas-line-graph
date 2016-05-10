/**
 * Created by wuyang on 16/5/8.
 */

//鼠标移入数据上时要做的操作
function hoverDataMap(gd,obj){
    this.gd = gd;
    this._map = obj;  //画布对象指向重置
}

hoverDataMap.prototype.init = function(){


    //作为测试,先画一个
    this.drawTip(this.gd,100,100,{
        style : "table-tip-style1",
        data : ["测试样式1","正常流量:"+"0.5"+"Mbps","异常流量:0Mbps"]
    });


    this.drawTip(this.gd,500,100,{
        style : "table-tip-style2",
        data : ["测试样式2","正常流量:"+"0.5"+"Mbps","异常流量:0Mbps"]
    });
    this.oImagebase = this._map.getImageBackground(this.gd);
    this.mousemove(this.gd);
}

//绘制tip元素
hoverDataMap.prototype.drawTip = function(gd,x,y,data){
    var rect_w = 300;
    var rect_h = 150;

    var style = data.style;
    var data = data.data;

    var tipbg,tippointbg;

    switch  (style){
        case "table-tip-style1":
            tipbg = "#beecfd";
            tippointbg = "#7fd9fb";
            break;
        case "table-tip-style2":
            tipbg = "#fdf0da";
            tippointbg = "#f13b3b";
            break;
    };



    gd.save();
    gd.beginPath();
    gd.fillStyle = '#EB852A';
    gd.shadowOffsetX = 5; // 阴影Y轴偏移
    gd.shadowOffsetY = 5; // 阴影X轴偏移
    gd.shadowBlur = 14; // 模糊尺寸
    gd.shadowColor = 'rgba(0, 0, 0, 0.2)'; // 颜色
    gd.fillStyle=tipbg;

    gd.roundRect(x,y,rect_w,rect_h,20).fill();

    gd.moveTo(x,y+40);
    gd.lineTo(x-20,y+40+40);
    gd.lineTo(x,y+40+80);
    gd.fill();

    gd.beginPath();
    gd.fillStyle=tippointbg;
    gd.strokeStyle="#fff";
    gd.lineWidth = 3;
    gd.arc(x,y+77,8,0,2*Math.PI);
    gd.fill();
    gd.stroke();

    gd.beginPath();
    gd.fillStyle='#3c3c3c';
    gd.font='26px a';
    gd.textAlign='left';
    gd.textBaseline='top';
    gd.translate(0.5,0.5);

    gd.fillText(data[0],x+20,y+20);
    gd.fillText(data[1],x+20,y+60);
    gd.stroke();
    gd.fillStyle='#f13b3b';
    gd.fillText(data[2],x+20,y+100);

    gd.stroke();
    gd.restore();

};
//将选中的点加粗
hoverDataMap.prototype.hoverPoint = function(gd,x,y,color){
    gd.save();
    gd.beginPath();
    gd.fillStyle=color;
    //gd.moveTo(x,y);
    //gd.lineTo(x+1,y+1);
    gd.arc(x,y,5,0,2*Math.PI);
    gd.fill();
    gd.restore();
};


//根据鼠标位置绘制各种数据
hoverDataMap.prototype.drawDataPoint = function(gd,tx,ty,oImagebase){
    var _m = this._map;
    _m.clearMap(gd);
    _m.setImageBackground(gd,oImagebase);
    //暂时将datamap下的第一个数据作为默认数据
    //处理鼠标移入到canvan上吧鼠标移入的距离乘以像素缩小的倍数
    var d1Index = tx*MULTIPLE;


    //DataMap从目前来看,这个数据最多会有两条,所以不做循环,单纯的用查找的方式写
    var d1 = gd.DataMap[0];
    var d2 = gd.DataMap[1] || "";



    //如果鼠标没有到下一个节点,那么就用上一个节点的数值

    while(d1Index>0 && !d1.d[d1Index]){
        d1Index--;
    }
    var d1_d = d1.d[d1Index];
    var d2_d = d2 && d2.d[d1Index];

    //配置tip显示数据的
    var oTableTipData = {
        style : _m.tip.style,
        data : [_m.tip.title,_m["tip"]["data"][0]+d1_d.v+_m.tip.unit,_m["tip"]["data"][1]+(d2_d.v||0)+_m.tip.unit]
    };
    this.hoverPoint(gd,d1_d.x,d1_d.y,d1.color);
    if(d2_d.v !== null){
        this.hoverPoint(gd,d2_d.x,d2_d.y,d2.color);

    }
    this.drawTip(gd,tx*MULTIPLE+50,ty*MULTIPLE-60,oTableTipData);

}

//鼠标划入表格的hover事件
hoverDataMap.prototype.mousemove = function(gd){
    var _this = this;
    var __this = this._map;
    var oImagebase = this.oImagebase;
    var timer = null;
    gd.canvas.onmousemove = function(e){
        //根据假数据生成tip提示框


        var tx = e.pageX-oDiv.offsetLeft;
        var ty = e.pageY-oDiv.offsetTop;

        if(ty>TABLE_TOP || ty<(TABLE_TOP-TABLE_HEIGHT) || tx<TABLE_LEFT || tx> (TABLE_WIDTH+TABLE_LEFT)){
            //如果鼠标在那个表格之外,那么返回false隐藏tip
            if(oImagebase){
                __this.clearMap(gd);
                __this.setImageBackground(gd,oImagebase);
            }

            return false;
        }else{

            oImagebase && _this.drawDataPoint(gd,tx,ty,oImagebase);
        }

    };
    gd.canvas.onmouseover = function(){

    };
    gd.canvas.onmouseout = function(){
        if(oImagebase){
            __this.clearMap(gd);
            __this.setImageBackground(gd,oImagebase);
        }
    }

}