/*
 * 初始化图表
 */
function initGraph(data, Xvalue, province) {
    // 作为入口
    require.config({
        paths: {
            echarts: '../js/lib/echarts/dist'
        }
    });
    var option = {
        title : {
            text : 'DC1-TG 扩容需求表 --- ' + province
        },
        tooltip : {
            trigger: 'axis'
        },
        //legend: {
        //    data: legend
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
                data : Xvalue
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


$('#provinceSelect').change(function(){
    var province = $('#provinceSelect').val();
    var showData = data.info[province];
    initGraph(showData, data["Xvalue"], province);
});

function initSelect(provinces) {
    $.each(provinces, function(key, value) {
        $('#provinceSelect').append($('<option>', { value : value }).text(value));
    });
    var currentProvince = provinces[0];
    initGraph(data.info[currentProvince], data["Xvalue"], currentProvince);
}

data = null;
$(function(){
    $.ajax({
        type    :  "get",
        url     :   "../php/responseHandle.php",
        data    :   {table : "DC1_TG_expand"},
        success :   function(res) {
            data = JSON.parse(res);
            initSelect(data.provinces);
        },
        error   :   function(){
            alert("get data error");
        }
    });
});