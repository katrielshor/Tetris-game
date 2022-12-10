let squareSize = 20;
let canvas = document.getElementById("baseCanvas");
let ctx = canvas.getContext("2d");
let scoreResult = document.getElementById("score");
let recordResult = document.getElementById("record");
let count = 0;
let myRecord = 0
function DrawBoard() {
  ctx.beginPath();
  ctx.rect(0, 0, BoardSize.cols * squareSize, BoardSize.rows * squareSize);
  ctx.stroke();
}

function clearBoard() {
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, BoardSize.cols * squareSize, BoardSize.rows * squareSize);
}

function drawGrid() {
  startPoint = {};
  endPoint = {};

  startPoint.col = 0;
  endPoint.col = BoardSize.cols;

  for (i = 0; i < BoardSize.rows; i++) {
    startPoint.row = i;
    endPoint.row = i;
    drawLine(startPoint, endPoint);
  }

  startPoint.row = 0;
  endPoint.row = BoardSize.rows;

  for (i = 0; i < BoardSize.cols; i++) {
    startPoint.col = i;
    endPoint.col = i;
    drawLine(startPoint, endPoint);
  }
}

function drawLine(startPoint, endPoint) {
  ctx.beginPath();
  ctx.moveTo(startPoint.col * squareSize, startPoint.row * squareSize);
  ctx.lineTo(endPoint.col * squareSize, endPoint.row * squareSize);
  ctx.stroke();
}

function fillSquare(square) {
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(
    square.col * squareSize,
    square.row * squareSize,
    squareSize,
    squareSize
  );
}
