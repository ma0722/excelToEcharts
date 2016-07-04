/*
 * 初始化图表
 */
function initGraph(data, station) {
    // 作为入口
    require.config({
        paths: {
            echarts: '../js/lib/echarts/dist'
        }
    });
    var option = {
        title : {
            text : 'DC1-SS现状配置表 --- ' + station
        },
        tooltip : {
            trigger: 'axis'
        },
        //legend: {
        //    data:['板卡数量（主用+备用）','固网电路域', '移动电路域(与固网电路域合并）', '扁平化HSS之间',
        //            '电路域HSS之间', '固网扁平化LSS', 'ECP呼叫', 'C网扁平化TMSCe', '备用板卡数(容灾）', '空闲']
        //},
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
                data : ['板卡数量（主用+备用）','固网电路域', '移动电路域(与固网电路域合并）', '扁平化HSS之间',
                    '电路域HSS之间', '固网扁平化LSS', 'ECP呼叫', 'C网扁平化TMSCe', '备用板卡数(容灾）', '空闲']
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
                name:'DC1-TG2',
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
            //myChart = ec.init($('#graph'));
            myChart = ec.init(document.getElementById('graph'));
            myChart.setOption(option);
        }
    );
}

$('#stationSelect').change(function(){
    var station = $('#stationSelect').val();
    var showData = data.info[station];
    initGraph(showData, station);
});

function initSelect(stations) {
    $.each(stations, function(key, value) {
        $('#stationSelect').append($('<option>', { value : value }).text(value));
    });
    var currentStation = stations[0]
    initGraph(data.info[currentStation], currentStation);
}

data = null;
$(function(){
    $.ajax({
        type    :  "get",
        url     :   "../php/responseHandle.php",
        data    :   {table : "DC1_SS_config"},
        success :   function(res) {
            data = JSON.parse(res);
            initSelect(data.stations);
        },
        error   :   function(){
            alert("get data error");
        }
    });
});