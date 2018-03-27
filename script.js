var canvas, context;
var HEIGHT = window.innerHeight, WIDTH = window.innerWidth;
const pi =  Math.PI;
var segmentAmount = 3;
var rotationSpeed = 0;
var dt = 1;
var colors =  ["#ff0000", "#00ff00", "#0000ff"];
var isStarted = false;
var isPaused = false;
var anim;
var dw = 0;

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", onKeyDown);

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
    dw += 0.01; 
}
function decSpeed() {
    dw -= 0.01; 
}


function main() {
    if (!isStarted){
        prepareCanvas();
        isStarted = true;
    }
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

function Update() {
    rotationSpeed += dw;
}

function Draw() {
    // clear screen
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    // circles
    let x = WIDTH * 0.5;
    let y = HEIGHT * 0.5;
    let r = 200;

    for (let i = 0; i < segmentAmount; i++) {
        let startAngle = i * 2 * pi / segmentAmount + rotationSpeed*dt;
        let endAngle = (i + 1) * 2 * pi / segmentAmount + rotationSpeed*dt;
        let j = i % 3;
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, r, startAngle, endAngle);
        context.lineTo(x,y);
        context.closePath();
        context.fillStyle = colors[j];
        context.fill();
    }
}