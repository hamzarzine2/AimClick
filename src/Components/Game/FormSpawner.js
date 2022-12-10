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

/*
**function that set the canvas 
*/
function setCanvasContextAndSize() {
  canvas = document.querySelector('#gameCanvas');
  canvas.addEventListener('click', onClickForm);
  canvasContext = canvas.getContext('2d');
  setSizeCanvas();
}

/*
**function that set the canvas size
*/
function setSizeCanvas() {
  const divCanvas = document.querySelector('#gameDiv');
  canvas.width = divCanvas.offsetWidth;
  canvas.height = divCanvas.offsetHeight;
  widthCanvas = canvas.width;
  heightCanvas = canvas.height;
}

/*
**function that do the cycle of frame draw
*/
function drawOneFrame() {
  clearFrame();
  setSizeCanvas();
  drawCircle();
}

/*
**function that clear the frame
*/
function clearFrame() {
  canvasContext.clearRect(0, 0, widthCanvas, heightCanvas);
}

/*
**function to draw a circle in the canvas
*/
function drawCircle() {
  canvasContext.fillStyle = color;
  x = Math.random() * (widthCanvas - radius * 2);
  y = Math.random() * (heightCanvas - radius * 2);

  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContext.fill();
}

/*
**function verify if the click is on the target and add to score if true + refresh the score and draw a new frame 
*/
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

/*
**function that refresh the score
*/
function refreshScore() {
  const divScore = document.querySelector('#score');
  score += 5;
  divScore.innerHTML = `<p> Your score : ${score} </p>`;
}

/*
**function that set the score to 0
*/
function initScore() {
  score = 0;
}

/*
**function that update the size of circle
*/
function updateSize(size) {
  radius = parseInt(size, 10);
  setCanvasContextAndSize();
}

/*
**function that set color 
*/
function updateColor(colorAdd) {
  color = colorAdd;
  setCanvasContextAndSize();
}

export { drawOneFrame, setCanvasContextAndSize, score, initScore, updateSize, updateColor };
