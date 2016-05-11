/**
 * Created by wuyang on 16/5/10.
 */
//提供canvas的接口api

//云char接口

function yunChar(obj,setting){

    var MULTIPLE = setting.multiple || 2;

    var dataset = setting.dataset;
    var axes = setting.axes;

    var oC = new createTable(obj.offsetWidth*MULTIPLE,obj.offsetHeight*MULTIPLE);

    this.oCDM; //存放data线条

    var oFragmentCanvas = oC.getTable();
    obj.appendChild(oFragmentCanvas);

    var oCanvas = oC.getCanvas().getContext("2d");

    //获取canvas对象
    //创建坐标轴

    var oCM = new createMap(axes,oCanvas,MULTIPLE);
    
    oCM.setTip(setting.tip);


    this.oCDM = new createDataMap(oCanvas,oCM,axes.ox*MULTIPLE,(axes.oy-axes.y.len)*MULTIPLE,axes.x.len*MULTIPLE,axes.y.len*MULTIPLE,MULTIPLE);



    for(var i=0,datal = dataset.length;i<datal;i++){
        this.oCDM.drawDataMap(dataset[i].backgroundColor,dataset[i].data);
    }
    this.oCDM.starDraw(setting.animation);//配置好数据,开始画


};

yunChar.prototype.getDataImage = function(){
    return this.oCDM.getDataImage();
}