/** Simple Fireworks **/

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Firework {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = canvas.height;
        this.targetY = random(canvas.height * 0.2, canvas.height * 0.5);
        this.speed = random(3, 6);
        this.particles = [];
        this.exploded = false;
    }

    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
            }
        } else {
            this.particles.forEach(p => p.update());
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < 40; i++) {
            this.particles.push(new Particle(this.x, this.y));
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y, 2, 8);
        } else {
            this.particles.forEach(p => p.draw());
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = random(-3, 3);
        this.speedY = random(-3, 3);
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.fillStyle = "rgba(255, 200, 0, ${this.alpha})";
        ctx.fillRect(this.x, this.y, 3, 3);
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.04) {
        particles.push(new Firework());
    }

    particles = particles.filter(fw => {
        return !fw.exploded || fw.particles.some(p => p.alpha > 0);
    });

    particles.forEach(fw => {
        fw.update();
        fw.draw();
    });

    requestAnimationFrame(loop);
}

loop();