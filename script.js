const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particleArray = [];
let hue = 0;

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 1; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 1; i < 5; i++) {
    particleArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 2 + 1;
    this.speedx = (Math.random() - 0.5) * 4;
    this.speedy = (Math.random() - 0.5) * 4;
    this.depth = Math.random() * 400;
  }

  update() {
    this.x += this.speedx;
    this.y += this.speedy;
    if (this.size > 5) {
      this.size -= 0.1;
    }
  }

  draw() {
    const depthFactor = 1 - this.depth / 400;
    const transparency = 1 - this.depth / 400;

    ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${transparency})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * depthFactor, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
    if (particleArray[i].size <= 1.1) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animation() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue += 5;
  requestAnimationFrame(animation);
}

animation();
