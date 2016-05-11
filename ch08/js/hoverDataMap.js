/**
 * Created by wuyang on 16/5/8.
 */

//鼠标移入数据上时要做的操作
function hoverDataMap(gd,obj,ox,oy,w,h,MULTIPLE){
    this.gd = gd;
    this.ox = ox;
    this.oy = oy;
    this.w = w;
    this.h = h;
    this._map = obj;  //画布对象指向重置
    this.MULTIPLE = MULTIPLE;
}

hoverDataMap.prototype.init = function(){


    //作为测试,先画一个
    this.oImagebase = this._map.getImageBackground(this.gd);
    this.mousemove(this.gd);
}

//绘制tip元素
hoverDataMap.prototype.drawTip = function(gd,x,y,Data){
    var rect_w = 300;
    var rect_h = 150;

    var x = x;
    var y = y;


    var style = Data.style;
    var title = Data.title;
    var data = Data.data;

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

    if(x>(this.ox+this.w-rect_w)){  //鼠标移入到右边缘
        x = x - 400;

        gd.save();
        gd.beginPath();
        gd.fillStyle = '#EB852A';
        gd.shadowOffsetX = 5; // 阴影Y轴偏移
        gd.shadowOffsetY = 5; // 阴影X轴偏移
        gd.shadowBlur = 14; // 模糊尺寸
        gd.shadowColor = 'rgba(0, 0, 0, 0.2)'; // 颜色
        gd.fillStyle=tipbg;

        gd.roundRect(x,y,rect_w,rect_h,20).fill();

        gd.moveTo(x+rect_w,y+40);
        gd.lineTo(x+rect_w+20,y+40+40);
        gd.lineTo(x+rect_w,y+40+80);
        gd.fill();

        gd.beginPath();
        gd.fillStyle=tippointbg;
        gd.strokeStyle="#fff";
        gd.lineWidth = 3;
        gd.arc(x+rect_w,y+77,8,0,2*Math.PI);
        gd.fill();
        gd.stroke();
    }else{
        x = x;

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
    }






    gd.beginPath();
    gd.fillStyle='#3c3c3c';
    gd.font='26px a';
    gd.textAlign='left';
    gd.textBaseline='top';
    gd.translate(0.5,0.5);


    if(data.length == 1){
        gd.fillText(title,x+20,y+30);
        gd.fillText(data[0],x+20,y+80);
        gd.stroke();
    }else{
        gd.fillText(title,x+20,y+20);
        gd.fillText(data[0],x+20,y+60);
        gd.stroke();
        gd.fillStyle='#f13b3b';
        gd.fillText(data[1],x+20,y+100);
        gd.stroke();
    }

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
    var dIndex = tx;


    //配置tip显示数据的
    var oTableTipData = {
        style : _m.tip.style,
        title : _m.tip.title
    };

    var _m_tip_data = _m.tip.data;

    //DataMap从目前来看,循环形式展示

    var _oTableTipData_data = [];
    for(var i=0,j=_m_tip_data.length;i<j;i++){

        var dd = gd.DataMap[i];
        var dd_d = {};

        //如果鼠标没有到下一个节点,那么就用上一个节点的数值
        while(dIndex>0 && !(dd_d = dd.d[dIndex])){
            dIndex--;
        }
        var str = "";
        if(dd_d.v){
            str = _m_tip_data[i]+dd_d.v+_m.tip.unit;
        }else{
            str = _m_tip_data[i]+"无";
        }
        _oTableTipData_data.push(str);

        this.hoverPoint(gd,dd_d.x,dd_d.y,dd.color);
    }



    oTableTipData.data = _oTableTipData_data;

    if(_m.tip.show){
        this.drawTip(gd,tx+50,ty-60,oTableTipData);
    }


}

//鼠标划入表格的hover事件
hoverDataMap.prototype.mousemove = function(gd){
    var _this = this;
    var __this = this._map;
    var oImagebase = this.oImagebase;
    var timer = null;
    gd.canvas.onmousemove = function(e){
        //根据假数据生成tip提示框

        var l = (this.parentNode.getBoundingClientRect().left || this.parentNode.offsetLeft)+document.body.scrollLeft;
        var t = (this.parentNode.getBoundingClientRect().top || this.parentNode.offsetTop)+document.body.scrollTop;

        var tx = (e.pageX-l)*_this.MULTIPLE;
        var ty = (e.pageY-t)*_this.MULTIPLE;
        if(ty>(_this.oy+_this.h) || ty<(_this.oy) || tx<_this.ox || tx> (_this.ox+_this.w)){
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