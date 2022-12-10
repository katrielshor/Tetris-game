
function GeneratNewShape() {
  newShape = {
    shapeType: SHAPE_TYPE[Math.floor(Math.random() * SHAPE_TYPE.length)],
    top: 0,
    left: BoardSize.cols / 2 - 1,
    shapeOrient: 0,
  };
  newShape.squarArr = getShape(
    newShape.shapeType,
    newShape.top,
    newShape.left,
    newShape.shapeOrient
  );

  return newShape;
}

function DrawFallingShape() {
  curShape.squarArr.forEach((square) => {
    fillSquare(square);
  });
}

function InitOccupiedSquares() {
  retval = [];
  for (i = 0; i < BoardSize.rows; i++) {
    boardRow = Array(BoardSize.cols).fill(false);
    retval.push(boardRow);
  }
  return retval;
}

function DrewFrame() {
  clearBoard();
  DrawBoard();
  drawGrid();
  DrawFallingShape();
  DrawOccupiedSquares();
  ShowRecord();
}

function IsSquareOccupied(square) {
  if (
    square.row >= BoardSize.rows ||
    square.col < 0 ||
    square.col >= BoardSize.cols
  ) {
    return true;
  }
  if (square.row < 0) return false;
  return occupiedSquares[square.row][square.col];

}

function isShapeOccupied(shape) {
  return shape.some((square) => IsSquareOccupied(square));
}

function AddFallingShapeToOccupiedSquares() {
  curShape.squarArr.forEach((shapeSquare) => {
    if (shapeSquare.row < 0) {
      clearInterval(intervalId);
      scoreResult.textContent = 'Game Is Over'
      return;
    } else occupiedSquares[shapeSquare.row][shapeSquare.col] = true;
  });
}

function RemoveFullLines() {
  fullLines = [];
  for (i = 0; i < occupiedSquares.length; i++) {
    if (occupiedSquares[i].every((square) => square)) fullLines.push(i);
  }
  while (fullLines.length > 0) {
    for (i = fullLines[0]; i > 0; i--) {
      count++;
      SaveRecordInLocalStorge();
      occupiedSquares[i] = occupiedSquares[i - 1];
    }
    occupiedSquares[0] = Array(BoardSize.cols).fill(false);
    fullLines.shift();
    scoreResult.textContent = count;
  }
}

function SaveRecordInLocalStorge() {
  currentRecord = localStorage.getItem("userRecord");
  if(!currentRecord) localStorage.setItem("userRecord", count);
  if(count > currentRecord) localStorage.setItem("userRecord", count);
}

function ShowRecord() {
  recordResult.textContent = localStorage.getItem("userRecord");
}

function DrawOccupiedSquares() {
  for (i = 0; i < occupiedSquares.length; i++) {
    for (j = 0; j < occupiedSquares[i].length; j++) {
      if (occupiedSquares[i][j]) fillSquare({ row: i, col: j });
    }
  }
}

function MainLoop() {
  DrewFrame();

  moveDownShape = getShape(
    curShape.shapeType,
    curShape.top + 1,
    curShape.left,
    curShape.shapeOrient
  );
  if (isShapeOccupied(moveDownShape)) {
    AddFallingShapeToOccupiedSquares();
    RemoveFullLines();
    curShape = GeneratNewShape();
  } else {
    curShape.squarArr = moveDownShape;
    curShape.top++;
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      movedLeftShape = getShape(
        curShape.shapeType,
        curShape.top,
        curShape.left - 1,
        curShape.shapeOrient
      );
      if (!isShapeOccupied(movedLeftShape)) {
        curShape.squarArr = movedLeftShape;
        curShape.left--;
      }
      break;
    case "ArrowRight":
      e.preventDefault();
      movedRightShape = getShape(
        curShape.shapeType,
        curShape.top,
        curShape.left + 1,
        curShape.shapeOrient
      );
      if (!isShapeOccupied(movedRightShape)) {
        curShape.squarArr = movedRightShape;
        curShape.left++;
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      rotatedShape = movedRightShape = getShape(
        curShape.shapeType,
        curShape.top,
        curShape.left,
        (curShape.shapeOrient + 1) % 4
      );
      if (!isShapeOccupied(rotatedShape)) {
        curShape.squarArr = rotatedShape;
        curShape.shapeOrient = (curShape.shapeOrient + 1) % 4;
      }
  }
});

const BoardSize = { rows: 20, cols: 10 };

curShape = GeneratNewShape();
occupiedSquares = InitOccupiedSquares();
intervalId = setInterval(MainLoop, 100);
