var canvas, context;
var HEIGHT = window.innerHeight, WIDTH = window.innerWidth;
const pi =  Math.PI;
var rotationLength = 0;
var dt = 1;
var isStarted = false;
var isPaused = false;
var isFastEnough = false;
var anim;

var Circle = function() {
    this.segments = 3;
    this.speed = 0;
    this.color1 =  "#ff0000";
    this.color2 =  "#00ff00";
    this.color3 =  "#0000ff";
    this.updateColors = function() {
        this.colors =  [this.color1, this.color2, this.color3];
    };
};

document.addEventListener("keydown", onKeyDown);
document.addEventListener("DOMContentLoaded", main);
function onKeyDown(/*KeyDownEvent*/ e) {

    if (e.keyCode == 69) { // E
        addSpeed();
    }
    if (e.keyCode == 81) { // Q
        decSpeed();
    }
    if (e.keyCode == 80) { // P
        pause();
    }
}

function pause() {
    if (!isPaused) {
        cancelAnimationFrame(anim);
        isPaused = true;
    } else {
        main();
        isPaused = false;
    }
}
function addSpeed() {
    circle.speed += 0.01; 
}
function decSpeed() {
    circle.speed -= 0.01; 
}


function main() {
    if (!isStarted){
        prepareCanvas();
        isStarted = true;
        circle = new Circle();
        setupGui();
    }
    circle.updateColors();
    Update();
    Draw();
    anim = requestAnimationFrame(main);
}

function prepareCanvas() {
    canvas = document.createElement('canvas');
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
}

function setupGui() {
    var gui = new dat.GUI();
    gui.add(circle, 'segments', 3, 99)
        .name("Segment amount")
        .step(3);
    gui.add( circle, 'speed', -7, 7 )
        .name("Rotation speed")
        .step(0.001);
    gui.addColor(circle, 'color1');
    gui.addColor(circle, 'color2');
    gui.addColor(circle, 'color3');
}

function Update() {
    rotationLength += circle.speed / dt;
}

function Draw() {
    // clear screen
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    // circles
    let x = WIDTH * 0.5;
    let y = HEIGHT * 0.5;
    let r = 200;

    for (let i = 0; i < circle.segments; i++) {
        let startAngle = i * 2 * pi / circle.segments + rotationLength / dt;
        let endAngle = (i + 1) * 2 * pi / circle.segments + rotationLength / dt;
        let j = i % 3;
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, r, startAngle, endAngle);
        context.lineTo(x,y);
        context.closePath();
        context.fillStyle = circle.colors[j];
        context.fill();
    }
}
