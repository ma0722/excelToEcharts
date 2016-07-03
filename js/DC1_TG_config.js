/*
 * 初始化图表
 */
function initGraph(data,type) {
    // 作为入口
    require.config({
        paths: {
            echarts: 'js/lib/echarts/dist'
        }
    });

    var option = {

        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['数据值']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle: {
                        fontSize: 8
                    }
                },
                data : type
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'数据值',
                type:'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#800080'
                            }
                        }
                    }
                },
                data:data
            }
        ]
    };

    require(
        [
            'echarts',
            'echarts/chart/bar'
        ],
        function (ec) {
            myChart = ec.init(document.getElementById('graph'),'macarons');
            myChart.setOption(option);
        }
    );
}


$(function(){
    var data = getData("DC1_TG_config");
    console.log(data);
    initGraph(data);
});