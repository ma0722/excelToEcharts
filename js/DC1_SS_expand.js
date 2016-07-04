/*
 * 初始化图表
 */
function initGraph(data, mySeries) {
    // 作为入口
    require.config({
        paths: {
            echarts: '../js/lib/echarts/dist'
        }
    });
    var legend = data.keys;
    legend.shift();
    var option = {
        title : {
            text : 'DC1-SS 扩容需求表'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: legend
        },
        //calculable : true,
        xAxis : [
            {
                type :  'category',
                name :  '配置',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle: {
                        fontSize: 8
                    }
                },
                data : data.c0
            }
        ],
        yAxis : [
            {
                //type :  'category',
                type :  'value',
                name :  '数目'
            }
        ],
        series : mySeries
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


function genSeries(data){
    var $i = 1;
    var keys = data.keys;
    var serise = Array();
    for ( ; ; $i++) {
        var col = 'c' + $i;
        tmp = data[col];
        if ( tmp == undefined)
            break;
        var names  = data.keys;
        var one = {
            name: names[$i],
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
            data: data[col]
        };
        serise.push(one);
    }
    return serise;
}


data = null;
$(function(){
    $.ajax({
        type    :  "get",
        url     :   "../php/responseHandle.php",
        data    :   {table : "DC1_SS_expand"},
        success :   function(res) {
            data = JSON.parse(res);
            var mySerise = genSeries(data);
            initGraph(data, mySerise);
        },
        error   :   function(){
            alert("get data error");
        }
    });
});