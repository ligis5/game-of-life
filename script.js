import Cell from "./cell.js";

const mainDiv = document.querySelector(".main");
const buttonPlay = document.querySelector(".play");
const buttonReset = document.querySelector(".reset");

const rows = 100;
const columns = 100;
const total = rows * columns;

const cellWidth = mainDiv.clientWidth / columns - 2;
const cellHeight = mainDiv.clientHeight / rows - 2;

const numberOfLifeCells = 0;

let arrayOfEverythingStatus = [];
let arrayOfCells = [];

//Create array filled with 0 representing dead cells, and create cells.
for (let i = 0; i < columns; i++) {
  arrayOfEverythingStatus.push([]);
  arrayOfCells.push([]);
  for (let j = 0; j < rows; j++) {
    arrayOfEverythingStatus[i].push(0);
    let cell = new Cell(i, j, cellWidth, cellHeight);
    mainDiv.appendChild(cell.cell);
    arrayOfCells[i][j] = cell;
    // if cell is clicked its state will change.
    cell.changeStatusOnClick = () => {
      arrayOfEverythingStatus[i][j] =
        arrayOfEverythingStatus[i][j] == 0 ? 1 : 0;
    };
  }
}

const cellNeighbours = () => {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      arrayOfCells[i][j].neighbours = {
        left: arrayOfCells[i][j > 0 ? j - 1 : j + (rows - 1)],
        right: arrayOfCells[i][j < rows - 1 ? j + 1 : j - (rows - 1)],
        top: arrayOfCells[i > 0 ? i - 1 : i + (columns - 1)][j],
        bottom: arrayOfCells[i < columns - 1 ? i + 1 : i - (columns - 1)][j],
        topLeft:
          arrayOfCells[i > 0 ? i - 1 : i + (columns - 1)][
            j > 0 ? j - 1 : j + (rows - 1)
          ],
        topRight:
          arrayOfCells[i > 0 ? i - 1 : i + (columns - 1)][
            j < rows - 1 ? j + 1 : j - (rows - 1)
          ],
        bottomLeft:
          arrayOfCells[i < columns - 1 ? i + 1 : i - (columns - 1)][
            j > 0 ? j - 1 : j + (rows - 1)
          ],
        bottomRight:
          arrayOfCells[i < columns - 1 ? i + 1 : i - (columns - 1)][
            j < rows - 1 ? j + 1 : j - (rows - 1)
          ],
      };
    }
  }
};
cellNeighbours();

// add some random 1s to array, to make some cells alive.
for (let i = 0; i < numberOfLifeCells; i++) {
  arrayOfEverythingStatus[Math.floor(Math.random() * columns)][
    Math.floor(Math.random() * rows)
  ] = 1;
}

// change cells current state to what is in array.
const cellsStatusChange = (array) => {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      arrayOfCells[i][j].status = array[i][j];
      if (arrayOfCells[i][j].status == 1) {
        arrayOfCells[i][j].cellLives();
      }
      if (arrayOfCells[i][j].status == 0) arrayOfCells[i][j].cellDies();
    }
  }
};
cellsStatusChange(arrayOfEverythingStatus);

const nextArrayOfEverything = (array) => {
  let nextArray = [];
  for (let i = 0; i < columns; i++) {
    nextArray.push([]);
    for (let j = 0; j < rows; j++) {
      nextArray[i].push(0);
      let neighbours = [
        arrayOfCells[i][j].neighbours.left.status +
          arrayOfCells[i][j].neighbours.right.status +
          arrayOfCells[i][j].neighbours.top.status +
          arrayOfCells[i][j].neighbours.bottom.status +
          arrayOfCells[i][j].neighbours.topLeft.status +
          arrayOfCells[i][j].neighbours.topRight.status +
          arrayOfCells[i][j].neighbours.bottomLeft.status +
          arrayOfCells[i][j].neighbours.bottomRight.status,
      ];

      if (
        (neighbours == 2 && array[i][j] == 1) ||
        (neighbours == 3 && array[i][j] == 1) ||
        (array[i][j] == 0 && neighbours == 3)
      ) {
        nextArray[i][j] = 1;
      }
      if (arrayOfCells[i][j].red >= 255) explodingCell(arrayOfCells[i][j]);
    }
  }
  return nextArray;
};

// if cells reaches maximum red 255. then it explodes changing state of some neighbours and their neighbours.
const explodingCell = (cell) => {
  Object.values(cell.neighbours).forEach((neigbour) => {
    let num = Math.random();
    if (neigbour.status == 1) neigbour.cellDies();
    if (num >= 0.6) {
      if (neigbour.status == 0) neigbour.cellLives();
    }
    Object.values(neigbour.neighbours).forEach((n) => {
      let num2 = Math.random();
      if (n.status == 1) n.cellDies();
      if (num2 >= 0.8) {
        if (n.status == 0) n.cellLives();
      }
    });
  });
  cell.cellDies();
};

const autoGrid = () => {
  document.getElementById("main").style.gridTemplateRows = `repeat(
        (${rows}, ${cellHeight}px)`;
  document.getElementById(
    "main"
  ).style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
};
autoGrid();

let fps = 5;
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

const gameLoop = () => {
  if (!stop) window.requestAnimationFrame(gameLoop);
  else window.cancelAnimationFrame(gameLoop);

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);

    arrayOfEverythingStatus = nextArrayOfEverything(arrayOfEverythingStatus);
    cellsStatusChange(arrayOfEverythingStatus);
  }
};

let stop = true;
buttonPlay.addEventListener("click", () => {
  stop = stop == true ? false : true;
  let button = document.getElementById("play");
  let button2 = document.getElementById("reset");
  if (stop) {
    gameLoop();
    button.style.color = "aqua";
    button2.style.color = "aqua";
  }
  if (!stop) {
    gameLoop();
    button.style.color = "black";
    button2.style.color = "black";
  }
});
buttonReset.addEventListener("click", () => {
  if (stop) {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        arrayOfEverythingStatus[i][j] = 0;
      }
    }
    for (let i = 0; i < numberOfLifeCells; i++) {
      arrayOfEverythingStatus[Math.floor(Math.random() * columns)][
        Math.floor(Math.random() * rows)
      ] = 1;
    }
    cellsStatusChange(arrayOfEverythingStatus);
  }
});
