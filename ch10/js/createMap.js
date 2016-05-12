/**
 * Created by wuyang on 16/5/8.
 */
/*
创建坐标轴的
 */

function createMap(json,gd,MULTIPLE){
    this.ox = json.ox * MULTIPLE;
    this.oy = json.oy * MULTIPLE;
    this.x = json.x;
    this.y = json.y;
    
    this.tip; //坐标轴提示框的文字

    this.endx = this.ox+this.x.len* MULTIPLE;
    this.endy = this.oy-this.y.len* MULTIPLE;

    this.init(gd);



};

//初始化坐标轴的各个细节
createMap.prototype.init = function(gd){

    //横竖坐标轴
    this.drawLine(gd,this.ox,this.oy,this.ox,this.endy,"#cfcfcf");
    this.drawLine(gd,this.ox,this.oy,this.endx,this.oy,"#cfcfcf");

    //坐标两边端点文字
    this.drawExplain(gd,this.ox-10,this.endy,this.x.text.substring(0,2));
    this.drawExplain(gd,this.ox-10,this.endy+40,this.x.text.substring(2));

    this.drawExplain(gd,this.endx,this.oy+10,this.y.text);

    //坐标刻度文字
    if(this.y.scale){
        this.drawScale(gd,this.ox,this.oy,this.endx,this.oy,this.x.data);
    }
    if(this.x.scale){
        this.drawScale(gd,this.ox,this.oy,this.ox,this.endy,this.y.data);
    }



    //坐标刻度线
    if(this.y.line){
        this.drawScaleLine(gd,this.ox,this.oy,this.endx,this.endy,"#f3f3f5",this.x.data,"vertical");
    }
    if(this.x.line){
        this.drawScaleLine(gd,this.ox,this.oy,this.endx,this.endy,"#f3f3f5",this.y.data,"horizontal");
    }

}

//画横竖坐标轴
createMap.prototype.drawLine = function(gd,x0,y0,x1,y1,color){
    gd.save();
    gd.translate(0.5,0.5);
    gd.lineWidth = 2;
    gd.strokeStyle = color;
    gd.beginPath();
    gd.moveTo(x0,y0);
    gd.lineTo(x1,y1);
    gd.stroke();
    gd.closePath();
    gd.restore();
};

//画坐标轴的两个端点
createMap.prototype.drawExplain = function(gd,x0,y0,text){


    gd.save()
    gd.beginPath();

    gd.fillStyle='#3c3c3c';
    gd.font='26px a';
    gd.textAlign='right';
    gd.textBaseline='top';
    gd.translate(0.5,0.5);
    gd.fillText(text,x0,y0);

    gd.stroke();
    gd.restore();

};


//画刻度
createMap.prototype.drawScale = function(gd,x0,y0,x1,y1,data){

    var direction = x0 == x1 ? "vertical" : "horizontal" //方向
    var l = data.length;



    gd.save()
    gd.beginPath();
    gd.fillStyle='#3c3c3c';
    gd.font='26px a';
    gd.textAlign='right';
    gd.textBaseline='top';
    gd.translate(0.5,0.5);


    for(var i=0;i<l;i++){
        if(direction == "vertical"){
            var s = (y1-y0+100)/(l-1|| 0);
            gd.fillText(data[i],x0-10,y0+s*i-20);
        }else{
            var s = (x1-x0-80)/(l -1 ||0);
            gd.fillText(data[i],x0+s*i+20,y0+10);

        }

    }
    
    gd.stroke();
    gd.restore();

};

//画刻度线
createMap.prototype.drawScaleLine = function(gd,x0,y0,x1,y1,color,data,d){
    var direction = d; //方向
    var l = data.length;


    gd.save();
    gd.lineWidth = 2;
    gd.strokeStyle = color;
    gd.translate(0.5,0.5);
    
    for(var i=0;i<l;i++){
        gd.beginPath();
        if(direction == "vertical"){
            var s = (x1-x0-80)/(l-1 || 0);
            var sx = x0+(i*s);
            gd.moveTo(sx,y0);
            gd.lineTo(sx,y1);

        }else{
            var s = (y1-y0+100)/(l-1 || 0);
            var sy = y0+(i*s);
            gd.moveTo(x0,sy);
            gd.lineTo(x1,sy);
        }
        gd.stroke();
        gd.closePath();

    }

    gd.restore();
};
//设置该画布的tip样式
createMap.prototype.setTip = function(setting){
    this.tip = setting;
}

//将画布清除
createMap.prototype.clearMap = function(gd){
    gd.clearRect(0,0,gd.canvas.width,gd.canvas.height);
};

//将画布生成base64
createMap.prototype.getImageBackground = function(gd){
    var i = new Image();
    i.src = gd.canvas.toDataURL("image/png");
    return i;
};
//将画布预制的base64作为背景贴到canvas上
createMap.prototype.setImageBackground = function(gd,image){

    gd.drawImage(image, 0, 0);

};

