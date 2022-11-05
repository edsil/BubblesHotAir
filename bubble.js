"use strict";
export { Bubble };
const bounce = true;
const g = 9.8;
const maxTemp = 100;
const minTemp = 10;
const tempTrans = 0.01;
const forcePerDegree = 0.0005;
const hsls = [{ h: 0, s: 50, l: 100 }, { h: 73, s: 50, l: 50 }, { h: 104, s: 50, l: 50 }, { h: 151, s: 50, l: 50 }, { h: 218, s: 50, l: 0 }, { h: 277, s: 50, l: 50 }, { h: 318, s: 50, l: 50 }, { h: 341, s: 50, l: 50 }, { h: 359, s: 50, l: 0 }];

class Bubble {
    constructor(posX, posY, gridSize, gridColArray, ctx, vx = 0, vy = 0, size = 10) {
        this.posX = posX;
        this.posY = posY;
        this.gridSize = gridSize;
        this.gridColArray = gridColArray;
        this.ctx = ctx;
        this.vx = vx;
        this.vy = vy;
        this.iniX = posX;
        this.iniY = posY;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;
        this.cols = Math.ceil(this.w / this.gridSize);
        this.rows = Math.ceil(this.h / this.gridSize);
        this.cycles = 0;
        this.temp = 0;
        this.size = size;
    }

    updateSize(gridSize = false) {
        if (gridSize != false) this.gridSize = gridSize;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;
        this.cols = Math.ceil(this.w / this.gridSize);
        this.rows = Math.ceil(this.h / this.gridSize);
    }

    reset() {
        this.posX = this.iniX;
        this.posY = this.iniY;
    }

    move() {
        this.cycles += 1;
        this.posY += this.vy;
        this.posX += this.vx;
        if (bounce) {
            if (this.posY < 0) {
                this.posY *= -1;
                this.vy = Math.abs(this.vy) / 12;
            } else if (this.posY > this.h) {
                this.posY = - this.posY + 2 * this.h;
                this.vy = -Math.abs(this.vy) / 12;
            }
            if (this.posX < 0) {
                this.posX *= -1;
                this.vx = Math.abs(this.vx);
            } else if (this.posX > this.w) {
                this.posX = - this.posX + 2 * this.w;
                this.vx = -Math.abs(this.vx);
            }
        }
        else {
            if (this.posY < 0) {
                this.posY += this.h;
            } else if (this.posY > this.h) {
                this.posY -= this.h;
            }
            if (this.posX < 0) {
                this.posX += this.w;
            } else if (this.posX > this.w) {
                this.posX -= this.w;
            }
        }
        var diffTemp = ((minTemp + this.posY * (maxTemp - minTemp) / this.h) - this.temp);
        this.temp = this.temp + diffTemp * tempTrans;
        this.vy = this.vy - (this.temp - (maxTemp - minTemp) / 2) * forcePerDegree;
    }

    draw() {
        this.ctx.fillStyle = "hsl(0, 50%, " + Math.round(this.temp * 0.9) + "%)";
        //this.ctx.beginPath();
        //this.ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
        this.ctx.fillRect(this.posX, this.posY, this.size, this.size);
        //this.ctx.fill();

    }

}