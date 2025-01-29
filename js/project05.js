// This file contains the JavaScript code for the customizable drawing canvas, managing drawing actions, customization options, and image saving.

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushSize = 5;
let brushColor = '#000000';
let backgroundColor = '#ffffff';
let strokes = [];

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

function startDrawing(e) {
    drawing = true;
    strokes.push([]);
    draw(e);
}

function endDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    strokes[strokes.length - 1].push({ x, y, brushSize, brushColor });

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function changeBrushSize(size) {
    brushSize = size;
}

function changeBrushColor(color) {
    brushColor = color;
}

function changeBackgroundColor(color) {
    backgroundColor = color;
    canvas.style.backgroundColor = backgroundColor;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}

function undoLastStroke() {
    strokes.pop();
    redrawCanvas();
}

function redrawCanvas() {
    clearCanvas();
    strokes.forEach(stroke => {
        ctx.beginPath();
        stroke.forEach((point, index) => {
            ctx.lineWidth = point.brushSize;
            ctx.strokeStyle = point.brushColor;
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
            }
        });
    });
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', endDrawing);

document.getElementById('brushSize').addEventListener('input', (e) => changeBrushSize(e.target.value));
document.getElementById('brushColor').addEventListener('input', (e) => changeBrushColor(e.target.value));
document.getElementById('clearCanvas').addEventListener('click', clearCanvas);
document.getElementById('saveCanvas').addEventListener('click', saveCanvas);
document.getElementById('undo').addEventListener('click', undoLastStroke);