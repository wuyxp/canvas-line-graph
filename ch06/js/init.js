/**
 * Created by wuyang on 16/5/10.
 */
//提供canvas的接口api
/*
var oC = new createTable(800*MULTIPLE,800*MULTIPLE);

var oFragmentCanvas = oC.getTable();
oDiv.appendChild(oFragmentCanvas);

var oCanvas = oC.getCanvas().getContext("2d");

//获取canvas对象
//创建坐标轴
var oCM = new createMap(data,oCanvas);


oCM.setTip({
    "style" : "table-tip-style1",
    "title" : "平均吞吐量",
    "data" : ["正常速度","异常速度"],
    "unit" : "M"
})

//创建画布完毕



//返回数据

var res = {"ret_code":0,"total_count":1,"ret_set":[{"instance_name":"123","display_name":"流量使用率","timestamp":1462446000,"instance_id":"i-8t3wysvi","monitor_info":{"default":{"resource_name":"default","data":[0.1,0.1,0.2,0.2,0.1,0.1,0.2,0.1,0.2,0.1,0.2,0.2,0.2,0.3,0.2,0.2,0.2,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.5,0.5,0.5,0.5,0.6,0.6,0.8,0.7,0.7,0.6,1.1,0.8,0.9,0.8,1.9,0.7,0.7,0.7,0.8,0.7,0.6,0.6,0.6,0.9,0.6,0.6,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.5,0.6,0.8,0.4,0.4,0.3,0.3,0.3,0.3,0.3,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2]}},"unit":"%"}],"action":"MultiMonitors","ret_msg":"服务器响应成功","msg":"Success"}
var res1 = {"ret_code":0,"total_count":1,"ret_set":[{"instance_name":"123","display_name":"流量使用率","timestamp":1462446000,"instance_id":"i-8t3wysvi","monitor_info":{"default":{"resource_name":"default","data":[0.1,0.1,0.2,0.2,0.1,0.1,0.2,0.1,0.2,0.1,0.2,0.2,0.2,0.3,0.2,0.2,0.2,0.3,0.3,0.3,0.4,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.8,0.2,1.4,0.1,0.4,0.4,0.5,0.5,0.5,0.5,0.6,0.6,0.8,0.7,0.7,0.6,1.1,0.8,0.9,0.8,1.9,0.7,0.7,0.7,0.8,0.7,0.6,0.6,0.6,0.9,0.6,0.6,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.5,0.6,0.8,0.4,0.4,0.3,0.3,0.3,0.3,0.3,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2]}},"unit":"%"}],"action":"MultiMonitors","ret_msg":"服务器响应成功","msg":"Success"}

var random_arr = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1,null,null,null,null,null,null,null,null,null,null];
var res1_arr = [];
for(var i=0;i<97;i++){
    res1_arr.push(random_arr[(Math.random()*(random_arr.length-1)).toFixed(0)]);
}
res1.ret_set[0].monitor_info.default.data = res1_arr;
console.log(res1_arr);
var oCDM = new createDataMap(oCanvas,oCM,TABLE_LEFT*MULTIPLE,(TABLE_TOP-TABLE_HEIGHT)*MULTIPLE,TABLE_WIDTH*MULTIPLE,TABLE_HEIGHT*MULTIPLE);

oCDM.drawDataMap("#beecfd",res);
oCDM.drawDataMap("#ef8686",res1);


oCDM.starDraw(true);//配置好数据,开始画

//获取缩略图
var src = oCDM.getDataImage();
document.querySelector("#img1").src = src[0].src;
document.querySelector("#img1").title = src[0].title;
document.querySelector("#img2").src = src[1].src;
document.querySelector("#img2").title = src[1].title;



*/

//云char接口

function yunChar(obj,setting){

    var MULTIPLE = setting.multiple || 2;

    var dataset = setting.dataset;
    var axes = setting.axes;

    var oC = new createTable(800*MULTIPLE,800*MULTIPLE);

    var oFragmentCanvas = oC.getTable();
    obj.appendChild(oFragmentCanvas);

    var oCanvas = oC.getCanvas().getContext("2d");

    //获取canvas对象
    //创建坐标轴

    var oCM = new createMap(axes,oCanvas);
    oCM.setTip({        //设置tip框
        "style" : "table-tip-style1",
        "title" : "平均吞吐量",
        "data" : ["正常速度","异常速度"],
        "unit" : "M"
    });


    var oCDM = new createDataMap(oCanvas,oCM,axes.ox*MULTIPLE,(axes.oy-axes.y.len)*MULTIPLE,axes.x.len*MULTIPLE,axes.y.len*MULTIPLE);



    for(var i=0,datal = dataset.length;i<datal;i++){
        oCDM.drawDataMap(dataset[i].backgroundColor,dataset[i].data);
    }
    oCDM.starDraw(true);//配置好数据,开始画




}