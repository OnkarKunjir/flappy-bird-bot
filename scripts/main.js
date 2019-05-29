let p;
var s;
function setup(){
    createCanvas(600 , 500);
    p = new population();
    s = createSlider(1 , 20 , 20);

}

function draw(){
    background(0);
    var step = s.value();
    //console.log(step);
    for(var i=0;i<step;i++){
        p.update();
    }
}

