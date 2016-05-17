/**
 * Created by wuyang on 16/5/8.
 */

//数据折线构造函数
function createDataMap(gd,cm,ox,oy,w,h,MULTIPLE,max){
    this.ox = ox;
    this.oy = oy;
    this.w = w;
    this.h = h;
    this.gd = gd;
    this.gd.DataMap = [];

    this.cm = cm; // 坐标轴对象作为参数传入hoverDataMap对象中
    this.imagebg; // 预留一张没有数据的图片作为背景

    this.max = max; //数据集体里最大的数

    this.cbfun = function(){}; //执行回调的函数

    this._cacheData=[];//将drawDataMap的值放到缓存里,回头集体画出来.

    //启动表格的鼠标移动事件
    this.oHover = new hoverDataMap(gd,this.cm,ox,oy,w,h,MULTIPLE,this.getCbfun,this);

};


createDataMap.prototype.hoverCbfun = function(fun){
    this.cbfun = fun;
};

createDataMap.prototype.getCbfun = function(data){
    //console.log(this.cbfun);
    //console.log(data);
    this.cbfun.call(null,data);
}


//将所有数据设置到内存上
createDataMap.prototype.drawDataMap = function(color,data,data_x){
    var dataMap = {};
    var data_x = data_x || [];
    var resdata = data;

    var l = resdata.length;
    var m = Math.max.apply(null,resdata);

    dataMap.color = color;

    dataMap.resdata = resdata;
    dataMap.data_x = data_x; //将值与x轴建立对应关系


    this.gd.DataMap.push(dataMap); //将所有data数据添加道dataMap对象上

    this.imagebg = this.cm.getImageBackground(this.gd);

    this.setCacheData(dataMap);



};

createDataMap.prototype.setCacheData = function(cache){
    this._cacheData.push(cache);
};
createDataMap.prototype.getCacheData = function(){
    return this._cacheData;
};


//启动画
createDataMap.prototype.starDraw = function(animation){

    var animation = animation; //是否动画启动数据
    var aData = this.getCacheData();

    this.max = this.setScale(aData);
    if(animation){
        this.animation(aData,function () {
            this.oHover.init();
        });
    }else{
        //直接画时,将画图的上下文传递过去.在生成图片时能够直接用到
        this.drawLine(this.gd,aData,function(){

            this.oHover.init();
        });
    }
};

//设置所有的数据比例,并且返回最大值
createDataMap.prototype.setScale = function(adata){
    //需要找一下aData里面数据的最大值
    var max = 0,m;
    for(var i=0;i<adata.length;i++){
        max = max > (m = Math.max.apply(null,adata[i].resdata)) ? max : m;
    }

    max = this.max || max;

    for(var i=0;i<adata.length;i++){
        adata[i]["d"] = {};
        for(var j=0,l=adata[i].resdata.length;j<l;j++){
            var y = ((max-adata[i].resdata[j])/max)*(this.h-100)+this.oy+100;
            var x = j/(l-1 || 1)*(this.w-80)+this.ox;
            adata[i]["d"][parseInt(x)] = {};
            adata[i]["d"][parseInt(x)].v = adata[i].resdata[j];
            adata[i]["d"][parseInt(x)].v_x = adata[i].data_x[j];
            adata[i]["d"][parseInt(x)].x = x;
            adata[i]["d"][parseInt(x)].y = y;
        }

    }

    return max;
}

//直接画
createDataMap.prototype.drawLine = function(gd,adata,cbfun){

    var cbfun = cbfun || function(){};
    
    for(var d=0,dl=adata.length;d<dl;d++){
        gd.save();
        gd.beginPath();
        gd.translate(0.5,0.5);
        gd.lineWidth = 3;

        var resdata = adata[d].resdata;;
        var lint_s = 0;
        var l = resdata.length;
        var m = this.max;
        gd.strokeStyle = adata[d].color;
        for(var i=0;i<l;i++){
            if(resdata[i] === null) {
                lint_s = 0;
            }else{
                //将所有标记都从y轴向下缩小100
                var y = ((m-resdata[i])/m)*(this.h-100)+this.oy+100;
                var x = i/(l-1 || 1)*(this.w-80)+this.ox;
                if(lint_s === 0){
                    gd.moveTo(x,y);
                }else{
                    gd.lineTo(x,y);
                }
                lint_s++;
            }


        }
        gd.stroke();
        gd.restore();
    }

    cbfun.apply(this);
}

//带有动画的画
createDataMap.prototype.animation = function(adata,cbfun){
    var _this = this;
    var timer = null;
    var state_x=1;
    var cbfun = cbfun || function(){};
    //初始化的线运动
    function ss(){

        var start_x = _this.ox;
        var start_y = _this.oy+_this.h/2;
        var end_x = _this.ox + _this.w-80;
        var end_y = start_y;
        state_x++;
        var _x = Math.tween.Quad.easeInOut(state_x,start_x,end_x,50);

        _this.gd.save();
        _this.gd.beginPath();
        _this.gd.translate(0.5,0.5);
        _this.gd.lineWidth = 3;
        _this.gd.strokeStyle = adata[0].color;
        _this.gd.moveTo(start_x,start_y);
        _this.gd.lineTo(_x,end_y);
        _this.gd.stroke();
        _this.gd.restore();
        if(_x>=end_x){
            //cbfun.apply(_this);
            moveLine.apply(_this);
            return false;
        }
        requestAnimFrame(ss);
    }
    ss();

    //从线变为折线的运动

    function moveLine(){
        var state_y = 1;
        var _this = this;

        function moveLineSs(){

            _this.cm.clearMap(_this.gd);
            _this.cm.setImageBackground(_this.gd,_this.imagebg);

            //遍历每一条线

            for(var i=0,a_i=adata.length;i<a_i;i++){

                _this.gd.save();
                _this.gd.beginPath();
                _this.gd.translate(0.5,0.5);
                _this.gd.lineWidth = 3;
                _this.gd.strokeStyle = adata[i].color;

                //遍历线上每一个值
                var resdata = adata[i].resdata;
                var lint_s = 0;
                for(var j=0,a_j=resdata.length;j<a_j;j++){

                    var m = _this.max;
                    if(resdata[j] === null) {
                        lint_s = 0;
                    }else {
                        var _y = ((m - resdata[j]) / m) * (_this.h-100) + _this.oy+100;
                        var start_y = _this.oy + _this.h / 2;
                        var y = Math.tween.Quad.easeInOut(state_y, start_y, _y - start_y, 100);
                        var x = j / (a_j-1 || 0) * (_this.w-80) + _this.ox;

                        if (lint_s == 0) {
                            _this.gd.moveTo(x, y);
                        } else {
                            _this.gd.lineTo(x, y);
                        }
                        lint_s++;



                    }
                }

                _this.gd.stroke();
                _this.gd.restore();

            }

            if (state_y >= 100 || state_y <= -100) {
                cbfun.apply(_this);
                return false;
            } else {
                state_y++;

            }



            requestAnimFrame(moveLineSs);
        }
        moveLineSs();
    }
};


//获取数据线的缩略图


createDataMap.prototype.getDataImage = function(){
    var _src = [];
    var oC = document.createElement("canvas");
    oC.width = this.gd.canvas.width;
    oC.height = this.gd.canvas.height;
    var oCG = oC.getContext("2d");
    var i=0,l=this.getCacheData().length;
    for(;i<l;i++){
        var tmap = [];
        var oSrc = {}

        tmap.push(this.getCacheData()[i]);
        oCG.clearRect(0,0,oC.width,oC.height);
        this.drawLine(oCG,tmap,function(){});
        oSrc.src = oC.toDataURL("image/png");
        oSrc.title = tmap[0].display_name;
        _src.push(oSrc);
    };

    return _src;
}

















