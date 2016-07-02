<!DOCTYPE HTML>
<html>
<head>
    <title>excel show</title>
    <meta charset="utf-8">

    <link href="../css/bootstrap.css" rel="stylesheet">
    <link href="../css/home.css" rel="stylesheet">

</head>

    <body>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <span class="navbar-brand" href="">Excel数据展示平台</span>
            </div>
          </div><!-- /.container-fluid -->
        </nav>

        <div class="container-fluid">
            <div class="col-xs-6 top">
                <span>工作表：</span>
                <div id="sheet1"></div>
            </div>
            <div class="col-xs-6 top">
                <span>数据种类：</span>
                <div id="sheet2"></div>
            </div>
            <div id="graph" style="width:1500px;height:600px;"></div>
        </div>
    </body>

<script src="../js/jquery.min.js"></script>
<script src="../js/lib/echarts/echarts.js"></script>
<script src="../js/1.js"></script>

</html>
