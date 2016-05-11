# 线性数据图表展示(canvas)
>原生制作折线图表代码控制,来自新公司的一个项目,坚决不能烂尾.

![alt](http://a.hiphotos.baidu.com/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=77ccbdbdd300baa1ae214fe92679d277/63d0f703918fa0ece00b145c249759ee3c6ddb97.jpg "感谢优秀的canvas")

#####各个版本的代码级控制
* ch01(*time:2016-5-5*):使用canvas基于面向对象画出第一个静态折线图
* ch02(*time:2016-5-6*):使用dom结构添加动态交互效果.但是效率依然很慢即使操作transform
* ch03(*time:2016-5-7*):将dom结构转化为canvas结构,并且将原来代码进行合理划分.但是在数据线生成的时候,动画依然没有解决
* ch04(*time:2016-5-9*):重新设计hoverDataMap中的init方法,使在生成data时就将canvas生成图片,防止报错,处理单条数据线的动画问题,并且兼容两条线的动画.但是一个数据线是tip框还是有bug
* ch05(*time:2016-5-10*):优化两条线与一条线的兼容问题,并且添加获取缩略图代码.
* ch06(*time:2016-5-10*):全部配置化接口用法,并且优化tip提示框问题.
* ch07(*time:2016-5-10*):全部重新生成动态数据,页面中出现12个canvan,点击放大出效果.运用调节相对值得left和top.
* ch08(*time:2016-5-11*):调节tip框动态显示位置,并且调节显示x,y轴的比例问题.


>>>>下个版本将会把调整细节,集体搜集下来的bug 等...

##讲打包后的代码合并压缩至yunchar文件夹
>api介绍
* 声明个json对象
***
    `{type : "line", //默认线性,也就有着一种
        multiple : 2,  //canvas缩放程度,按照是否有retian屏幕兼容
        animation : false, //是否有动画效果
        axes : {    //坐标轴设置
            ox  :   40,
            oy  :   200,
            x   :   {
                len  : 300,
                text : "流量Mbps",
                data : ["6:00","9:00","12:00","15:00","18:00"],
                scale: true,
                line : true
            },
            y   :   {
                len  : 160,
                text : "时间",
                data : ["0","0.9","1.8"],
                scale: true,
                line : false
            }
        },
        dataset : [ //坐标数据内部设置
            {
                backgroundColor : "#beecfd",
                label : "同行线",
                data : [...]
            },{
                backgroundColor : "#ef8686",
                label : "警报线",
                data : [...]
            }`

        ],
        tip : {   //提示框的内容
            show : false, //是否展示
            style : "table-tip-style1",
            title : "线说明",
            data : ["同行线:","警报线:"],
            unit : "M"
        }
    }`
***
* 然后声明对象
    `new yunChar(oDiv,json);`
    其中oDiv是包裹canvas的对象
    上面配置json数据的原点位置,和宽高都是基于oDiv的左上角;
* 在new对象的下有个getDataImage方法可以获取所描述数据先的图片获取是个数组,里面存放的base64形式的src.

    `var yc = new yunChar($("#canvas")[0],d);
     var src = yc.getDataImage();`