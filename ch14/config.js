/**
 * Created by wuyang on 16/5/10.
 */

var _c = [];

for(var i=0;i<12;i++){

    var random_arr = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2,1.3,1.4,1.5,null,null];
    var _arr1 = [], _arr2=[];
    for(var j=0;j<20;j++){
        _arr1.push(random_arr[(Math.random()*(random_arr.length-3)).toFixed(0)]);
        _arr2.push(random_arr[(Math.random()*(random_arr.length-1)).toFixed(0)]);
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
                rotate : 60,
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
                data: _arr1,
                data_x:["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"] //每一项data对应data_的值
            },
            {
                backgroundColor : "#ef8686",
                label : "报警线",
                data : _arr2,
                data_x:["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"] //每一项data对应data_的值
            }

        ],
        tip : {   //提示框的内容
            show : false, //是否展示
            style : "table-tip-style1",
            width : 300,
            height: 200,
            unit : "$",
            title : "线说明$x$",
            vector : "right", //用于指向鼠标滑动到的单位
            data : ["标准$y$","报警$y$"]
        }


    };

    _c.push(o);
}
