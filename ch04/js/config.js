/**
 * Created by wuyang on 16/5/8.
 */


//兼容retina屏的canvas方案
//将倍数先乘后除
var oDiv = document.querySelector("#canvas");
var MULTIPLE = 2;

var CANVAS_TOP = oDiv.offsetTop;
var CANVAS_LEFT = oDiv.offsetLeft;

var TABLE_TOP = 470;
var TABLE_LEFT = 60;
var TABLE_WIDTH = 670;
var TABLE_HEIGHT = 260;



/*
 创建坐标轴
 参数:
 */

var data = {
    o   :   {
        x : TABLE_LEFT*MULTIPLE,
        y : TABLE_TOP*MULTIPLE
    },
    x   :   {
        len  : TABLE_WIDTH*MULTIPLE,
        text : "流量Mbps",
        data : ["0","0.2","0.4","0.6","0.8","1"],
        scale: true,
        line : true
    },
    y   :   {
        len  : TABLE_HEIGHT*MULTIPLE,
        text : "时间",
        data : ["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"],
        scale: true,
        line : false
    }
};

