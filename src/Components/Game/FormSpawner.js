/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
let radius = 20;
let color = '#ed2553';
let canvas;
let widthCanvas;
let heightCanvas;
let canvasContext;
let x;
let y;
// eslint-disable-next-line import/no-mutable-exports
let score = 0;

function setCanvasContextAndSize() {
  canvas = document.querySelector('#gameCanvas');
  canvas.addEventListener('click', onClickForm);
  canvasContext = canvas.getContext('2d');
  setSizeCanvas();
}

function setSizeCanvas() {
  const divCanvas = document.querySelector('#gameDiv');
  canvas.width = divCanvas.offsetWidth;
  canvas.height = divCanvas.offsetHeight;
  widthCanvas = canvas.width;
  heightCanvas = canvas.height;
}

function drawOneFrame() {
  clearFrame();
  setSizeCanvas();
  drawCircle();
}

function clearFrame() {
  canvasContext.clearRect(0, 0, widthCanvas, heightCanvas);
}

function drawCircle() {
  canvasContext.fillStyle = color;
  x = Math.random() * (widthCanvas - radius * 2);
  y = Math.random() * (heightCanvas - radius * 2);

  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContext.fill();
}

function onClickForm(e) {
  const xPosReal = x + canvas.offsetLeft;
  const yPosReal = y + canvas.offsetTop;

  if (
    ((e.clientX >= xPosReal && e.clientX <= xPosReal + radius) ||
      (e.clientX <= xPosReal && e.clientX >= xPosReal - radius)) &&
    ((e.clientY >= yPosReal && e.clientY <= yPosReal + radius) ||
      (e.clientY <= yPosReal && e.clientY >= yPosReal - radius))
  ) {
    refreshScore();
    drawOneFrame();
  }
}

function refreshScore() {
  const divScore = document.querySelector('#score');
  score += 5;
  divScore.innerHTML = `<p> Your score : ${score} </p>`;
}

function initScore() {
  score = 0;
}

function updateSize(size) {
  radius = parseInt(size, 10);
  setCanvasContextAndSize();
}

function updateColor(colorAdd) {
  color = colorAdd;
  setCanvasContextAndSize();
}

export { drawOneFrame, setCanvasContextAndSize, score, initScore, updateSize, updateColor };
