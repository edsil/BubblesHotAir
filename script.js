"use strict";
import { Bubble } from "./bubble.js";
const numbOfBubles = 400;
const mouse = { left: false, right: false, x: 0, y: 0 };
var canvas, ctx;
var h, w;
var timer = 0;
var momTimer = 0;
var startTimer = 0;
var frame = 0;
var runs = 0;
var momFPS = 0;
var momFrame = 0;
const bubles = [];

window.onload = function () {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "1px";
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "1px solid black";
    document.body.appendChild(canvas);
    w = window.innerWidth - 3;
    h = window.innerHeight - 3;
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    addEvents();
    createBubles(numbOfBubles);
    timer = performance.now();
    startTimer = timer;
    momTimer = timer;
    requestAnimationFrame(updateDraw);
};

function addEvents() {
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);
    window.addEventListener("keyup", keyup);
    window.addEventListener('resize', () => {
        w = window.innerWidth - 5;
        h = window.innerHeight - 5;
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        cols = Math.ceil(w / gridSize);
        rows = Math.ceil(h / gridSize);
    });
}

function createBubles(n) {
    for (var i = 0; i < n; i++) {
        var x = Math.random() * w;
        var y = Math.random() * h;
        var vx = Math.random() * 6 - 3;
        var vy = Math.random() * 6 - 3;
        var bu = new Bubble(x, y, 10, 0, ctx, vx, vy, 3);
        bubles.push(bu);
    }
}

function trim(value, min, max) {
    if (value <= min) return min;
    if (value >= max) return max;
    return value;
}


function updateDraw(ts) {
    frame += 1;
    timer = performance.now();
    if (frame % 30 == 0) {
        momFPS = Math.round(1000 * (frame - momFrame) / (timer - momTimer));
        momFrame = frame;
        momTimer = timer;
    }
    ctx.clearRect(0, 0, w, h);
    bubles.forEach(function (b, i) {
        b.move();
        b.draw();
    })

    var boxWidth = 0;
    const txt = [];
    const fps = Math.round(1000 * frame / (timer - startTimer));
    if (fps > 20) {
        createBubles(fps - 20 + 1);
    }
    txt.push("FPS: " + fps);
    txt.push("Moment FPS: " + Math.round(momFPS));
    txt.push("Total Frames: " + Math.round(frame / 1000) + "k");
    txt.push("Seconds: " + Math.round((timer - startTimer) / 1000));
    txt.push("Particles: " + bubles.length);
    for (const t of txt) boxWidth = Math.max(boxWidth, t.length);
    var boxHeight = txt.length;
    var lettSize = 15;
    ctx.clearRect(5, 3, lettSize * boxWidth / 2, lettSize * boxHeight);
    ctx.fillStyle = 'black';
    ctx.font = "15px Arial";
    txt.forEach(function (t, i) {
        ctx.fillText(t, lettSize / 2, lettSize + i * lettSize);
    });
    requestAnimationFrame(updateDraw);
}

function keyup(e) {
    if (e.code == "Digit1") {
        null;
    }
}

function mouseDown(event) {
    updateMousePos(event);
    mouse.left = event.button === 0 ? true : mouse.left;
    mouse.right = event.button === 2 ? true : mouse.right;
}

function mouseUp(event) {
    updateMousePos(event);
    mouse.left = event.button === 0 ? false : mouse.left;
    mouse.right = event.button === 2 ? false : mouse.right;
}

function mouseMove(event) {
    event.preventDefault();
    updateMousePos(event);
}

function updateMousePos(event) {
    mouse.x = event.clientX - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;
}