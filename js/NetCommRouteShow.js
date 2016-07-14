var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#myholder'),
    width: 1500,
    height: 800,
    model: graph,
    gridSize: 1
});

paper.$el.css('pointer-events', 'none');

var ib1 = new joint.shapes.basic.Image({
    position: { x: 155, y: 625 },
    size: { width: 163, height: 100 },
    attrs: {
        text: { text: '固定电话' },
        image: { 'xlink:href': '../image/固定电话.png', width: 163, height: 100 }
    }
});

var ib2 = new joint.shapes.basic.Image({
    position: { x: 150, y: 450 },
    size: { width: 178, height: 111 },
    attrs: {
        text: { text: '固定网络' },
        image: { 'xlink:href': '../image/固定网络.png', width: 178, height: 111 }
    }
});

var ib3 = new joint.shapes.basic.Image({
    position: { x: 1000, y: 625 },
    size: { width: 169, height: 63 },
    attrs: {
        text: { text: '移动电话' },
        image: { 'xlink:href': '../image/移动电话.png', width: 169, height: 63 }
    }
});

var ib4 = new joint.shapes.basic.Image({
    position: { x: 1000, y: 455 },
    size: { width: 165, height: 103 },
    attrs: {
        text: { text: '移动网络' },
        image: { 'xlink:href': '../image/移动网络.png', width: 165, height: 103 }
    }
});

var ib5 = new joint.shapes.basic.Image({
    position: { x: 350, y: 0 },
    size: { width: 600, height: 200 },
    attrs: {
        text: { text: '骨干软交换网络' },
        image: { 'xlink:href': '../image/骨干软交换网络.png', width: 600, height: 200 }
    }
});

var link1 = new joint.dia.Link({
    source: { id: ib2.id },
    target: { id: ib5.id },
    attrs: {
        '.connection': {
            stroke: '#7CFC00',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});
link1.label(0, {
    position: .5,
    attrs: {
        rect: { fill: 'white' },
        text: { fill: 'blue', text: '固网呼叫电信固网、异网用户' }
    }
});


var link2 = new joint.dia.Link({
    source: { id: ib4.id },
    target: { id: ib5.id },
    attrs: {
        '.connection': {
            stroke: '#9400D3',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});
link2.label(0, {
    position: .5,
    attrs: {
        rect: { fill: 'white' },
        text: { fill: 'blue', text: 'C网呼叫C网、异网移动用户' }
    }
});

var link3 = new joint.dia.Link({
    source: { id: ib2.id },
    target: { id: ib4.id },
    attrs: {
        '.connection': {
            stroke: '#6959CD',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});
link3.label(0, {
    position: .5,
    attrs: {
        rect: { fill: 'white' },
        text: { fill: 'blue', text: '固网呼叫C网用户就近网' }
    }
});

var link4 = new joint.dia.Link({
    source: { id: ib1.id },
    target: { id: ib2.id },
    attrs: {
        '.connection': {
            stroke: '#7CFC00',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});

var link5 = new joint.dia.Link({
    source: { id: ib3.id },
    target: { id: ib4.id },
    attrs: {
        '.connection': {
            stroke: '#9400D3',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});

var link6 = new joint.dia.Link({
    source: { id: ib4.id },
    target: { id: ib2.id },
    attrs: {
        '.connection': {
            stroke: '#EEEE00',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});
link6.label(0, {
    position: .5,
    attrs: {
        rect: { fill: 'white' },
        text: { fill: 'blue', text: 'C网用户呼叫电信及异网固定网用户就近网' }
    }
});

graph.addCells([ib1, ib2, ib3, ib4, ib5]);

flag1 = false;
flag2 = false;
flag3 = false;
flag4 = false;
linkGroup1 = [link1, link4];
linkGroup2 = [link2, link5];
linkGroup3 = [link3];
linkGroup4 = [link6];
$("#button1").click(function(){
    if (flag1){
        graph.removeCells(linkGroup1);
        flag1 = !flag1;
        $("#button1").removeClass("button1");
    } else{
        graph.addCell(linkGroup1);
        flag1 = !flag1;
        $("#button1").addClass("button1");
    }
});
$("#button2").click(function(){
    if (flag2){
        graph.removeCells(linkGroup2);
        flag2 = !flag2;
        $("#button2").removeClass("button2");
    } else{
        graph.addCell(linkGroup2);
        flag2 = !flag2;
        $("#button2").addClass("button2");
    }
});
$("#button3").click(function(){
    if (flag3){
        graph.removeCells(linkGroup3);
        flag3 = !flag3;
        $("#button3").removeClass("button3");
    } else{
        if (flag4) {
            flag4 = !flag4;
            graph.removeCells(linkGroup4);
            $("#button4").removeClass("button4");
        }
        graph.addCell(linkGroup3);
        flag3 = !flag3;
        $("#button3").addClass("button3");
    }
});
$("#button4").click(function(){
    if (flag4){
        graph.removeCells(linkGroup4);
        flag4 = !flag4;
        $("#button4").removeClass("button4");
    } else{
        if (flag3) {
            flag3 = !flag3;
            graph.removeCells(linkGroup3);
            $("#button3").removeClass("button3");
        }
        graph.addCell(linkGroup4);
        flag4 = !flag4;
        $("#button4").addClass("button4");
    }
});

