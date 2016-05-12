/**
 * Created by wuyang on 16/5/10.
 */

var _c = [];

for(var i=0;i<12;i++){

    var random_arr = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1,null,null,null,null,null,null,null,null,null,null];
    var _arr = [];
    for(var j=0;j<97;j++){
        _arr.push(random_arr[(Math.random()*(random_arr.length-1)).toFixed(0)]);
    };


    var o = {};

    o = {
        type : "line", //默认线性,也就有着一种
        multiple : 2,  //canvas缩放程度,按照是否有retian屏幕兼容
        animation : false, //是否有动画效果
        max : 2,
        axes : {    //坐标轴设置
            ox  :   40,
            oy  :   200,
            x   :   {
                len  : 300,
                text : "流量Mbps",
                data : ["6:00","9:00"],
                scale: true,
                line : true
            },
            y   :   {
                len  : 160,
                text : "时间",
                data : ["0","1.0","2.0"],
                scale: true,
                line : true
            }
        },
        dataset : [ //坐标数据内部设置
            {
                backgroundColor : "#beecfd",
                label : "同行线",
                //data : [0.1,0.1,0.2,0.2,0.1,0.1,0.2,0.1,0.2,0.1,0.2,0.2,0.2,0.3,0.2,0.2,0.2,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.5,0.5,0.5,0.5,0.6,0.6,0.8,0.7,0.7,0.6,1.1,0.8,0.9,0.8,1.9,0.7,0.7,0.7,0.8,0.7,0.6,0.6,0.6,0.9,0.6,0.6,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.5,0.6,0.8,0.4,0.4,0.3,0.3,0.3,0.3,0.3,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2]
                data:[0.3,0.6,0.5,0.5,0.5,0.6,0.6,0.8,0.7,0.6,1.1,0.8,0.9],
                data_x:["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"] //每一项data对应data_的值
            }/*,{
                backgroundColor : "#ef8686",
                label : "警报线",
                data : _arr
                //data:[1]
            }*/

        ],
        tip : {   //提示框的内容
            show : true, //是否展示
            style : "table-tip-style1",
            width : 300,
            heigth: 100,
            unit : "$",
            title : "线说明$x$",
            vector : "right", //用于指向鼠标滑动到的单位
            data : ["2016.16.05-2016.16.06"]
        }


    };

    _c.push(o);
}
