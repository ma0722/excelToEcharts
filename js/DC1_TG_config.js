/*
 * 初始化图表
 */
function initGraph(data) {
    // 作为入口
    require.config({
        paths: {
            echarts: '../js/lib/echarts/dist'
        }
    });
    var option = {
        title : {
            text : 'DC1—TG现状配置表'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['DC1-TG1','DC1-TG2']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        //calculable : true,
        xAxis : [
            {
                type :  'category',
                name :  '省份',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle: {
                        fontSize: 8
                    }
                },
                data : data.province
            }
        ],
        yAxis : [
            {
                //type :  'category',
                type :  'value',
                name :  '数目'
            }
        ],
        series : [
            {
                name:'DC1-TG1',
                type:'bar',
                itemStyle: {
                    normal: {
                        label: {
                            //show: true,
                            textStyle: {
                                color: '#800080'
                            }
                        }
                    }
                },
                data:data.DC1_TG1
            },
            {
                name:'DC1-TG2',
                type:'bar',
                itemStyle: {
                    normal: {
                        label: {
                            //show: true,
                            textStyle: {
                                color: '#800080'
                            }
                        }
                    }
                },
                data:data.DC1_TG2
            }
        ]
    };
    require(
        [
            'echarts',
            'echarts/chart/bar'
        ],
        function (ec) {
            //myChart = ec.init($('#graph'));
            myChart = ec.init(document.getElementById('graph'));
            myChart.setOption(option);
        }
    );
}


$(function(){
    $.ajax({
        type    :  "get",
        url     :   "../php/responseHandle.php",
        data    :   {table : "DC1_TG_config"},
        success :   function(data) {
            data = JSON.parse(data);
            console.log(data.province);
            console.log(data.DC1_TG1);
            console.log(data.DC1_TG2);
            initGraph(data);
        },
        error   :   function(){
            console.log("get data error");
        }
    });
});