
$.get("/excelPlugin/extractExcel.php",
    function(data)
    {
        excelInfo = eval('('+data+')');                 //更新数据
        var sheets = new Array();
        var d;
        for(var i in excelInfo){
            sheets.push(i);
        }
        // var tempdata = excelInfo['Sheet1']["空闲（折合espc）"];
        // var temptype = ["北京HSS1","北京HSS2","郑州HSS1","郑州HSS2","上海HSS1",
        // "上海HSS2","上海HSS3","上海HSS4","广州HSS1","广州HSS2","广州HSS3","广州HSS4",
        // "南京HSS1","南京HSS2","武汉HSS1","武汉HSS2","成都HSS1","成都HSS2","西安HSS1","西安HSS2"]
        getSheetSelect(sheets);
        var tempyears = new Array();
        d = excelInfo[$('#select1').val()]
        console.log(d);
        for(var i in d){
            if("xaxis" != i){
                console.log(i)
                tempyears.push(i);
            }
        }
        getYearsSelect(tempyears);
        changeData();
        $('#select1').change(function(){
            var tempyears = new Array();
            d = excelInfo[$(this).val()]
            for(var i in d){
                if("xaxis" != i){
                    tempyears.push(i);
                }
            }
            getYearsSelect(tempyears);
            var tempdata = d[$('#select2').val()]
            var temptype = d['xaxis']
            initGraph(tempdata,temptype,tempyears);
            $('#select2').change(changeData);
        })
        $('#select2').change(changeData);
        function changeData(){
            var tempdata = d[$('#select2').val()]
            var temptype = d['xaxis']
            initGraph(tempdata,temptype,tempyears);
        }
    });

//}
function getSheetSelect(sheet){
    var $select = $("<select id='select1'></select>");
    $('#sheet1').append($select);
    for(i=0;i<sheet.length;i++){
        var o = document.createElement('option')
        o.value = sheet[i];
        o.text = sheet[i];
        $select.append(o);
    }
}

function getYearsSelect(years){
    var select = document.getElementById('select2');
    if(select != null){
        select.remove();
    }
    var $select = $("<select id='select2'></select>");
    $('#sheet2').append($select);
    for(i=0;i<years.length;i++){
        var o = document.createElement('option')
        o.value = years[i];
        o.text = years[i];
        $select.append(o);
    }
}



//初始化图表
function initGraph(data,type){
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
                        fontSize: 8,
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