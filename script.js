import Cell from "./cell.js";

const mainDiv = document.querySelector(".main");
const buttonPlay = document.querySelector(".play");
const buttonReset = document.querySelector(".reset");

const rows = 150;
const columns = 150;
const total = rows * columns;

const cellWidth = mainDiv.clientWidth / columns - 2;
const cellHeight = mainDiv.clientHeight / rows - 2;

const numberOfLifeCells = rows * 10;

let arrayOfEverythingStatus = [];
let arrayOfCells = [];
//Create array filled with 0 representing dead cells, and create cells.
for (let i = 0; i < columns; i++) {
  arrayOfEverythingStatus.push([]);
  arrayOfCells.push([]);
  for (let j = 0; j < rows; j++) {
    arrayOfEverythingStatus[i].push(0);
    let cell = new Cell(j, cellWidth, cellHeight);
    mainDiv.appendChild(cell.cell);
    arrayOfCells[i].push(cell);
  }
}
// add some random 1s to array, to make some cells alive.
for (let i = 0; i < numberOfLifeCells; i++) {
  arrayOfEverythingStatus[Math.floor(Math.random() * columns)][
    Math.floor(Math.random() * rows)
  ] = 1;
}

const gpu = new GPU();

// change cells current state to what is in array.
const cellsStatusChange = (array) => {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      arrayOfCells[i][j].status = array[i][j];
      if (arrayOfCells[i][j].status == 1) arrayOfCells[i][j].cellLives();
      if (arrayOfCells[i][j].status == 0) arrayOfCells[i][j].cellDies();
    }
  }
};
cellsStatusChange(arrayOfEverythingStatus);

const nextArrayOfEverything = gpu
  .createKernel(function (array, rows, columns) {
    let nextValue = 0;
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let x = this.thread.x;
        let y = this.thread.y;
        let neighbours =
          array[y][x > 0 ? x - 1 : x + (rows - 1)] +
          array[y][x < rows - 1 ? x + 1 : x - (rows - 1)] +
          array[y > 0 ? y - 1 : y + (columns - 1)][x] +
          array[y < columns - 1 ? y + 1 : y - (columns - 1)][x] +
          array[y > 0 ? y - 1 : y + (columns - 1)][
            x > 0 ? x - 1 : x + rows - 1
          ] +
          array[y > 0 ? y - 1 : y + (columns - 1)][
            x < rows - 1 ? x + 1 : x - (rows - 1)
          ] +
          array[y < columns - 1 ? y + 1 : y - (columns - 1)][
            x > 0 ? x - 1 : x + (rows - 1)
          ] +
          array[y < columns - 1 ? y + 1 : y - (columns - 1)][
            x < rows - 1 ? x + 1 : x - (rows - 1)
          ];

        if (
          (neighbours == 2 && array[y][x] == 1) ||
          (neighbours == 3 && array[y][x] == 1) ||
          (array[y][x] == 0 && neighbours == 3)
        ) {
          nextValue = 1;
        }
        if (
          (neighbours < 2 && array[y][x] == 0) ||
          (neighbours > 3 && array[y][x] == 0) ||
          (neighbours < 2 && array[y][x] == 1) ||
          (neighbours > 3 && array[y][x] == 1)
        ) {
          nextValue = 0;
        }
      }
    }
    return nextValue;
  })
  .setOutput([rows, columns]);

const autoGrid = () => {
  document.getElementById("main").style.gridTemplateRows = `repeat(
        (${rows}, ${cellHeight}px)`;
  document.getElementById(
    "main"
  ).style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
};
autoGrid();

let time;
let stop = true;
buttonPlay.addEventListener("click", () => {
  stop = stop == true ? false : true;
  let button = document.getElementById("play");
  let button2 = document.getElementById("reset");
  if (stop) {
    clearInterval(time);
    button.style.color = "aqua";
    button2.style.color = "aqua";
  }
  if (!stop) {
    button.style.color = "black";
    button2.style.color = "black";
  }
  if (!stop) {
    time = setInterval(() => {
      // console.time("time");
      arrayOfEverythingStatus = nextArrayOfEverything(
        arrayOfEverythingStatus,
        rows,
        columns
      );
      cellsStatusChange(arrayOfEverythingStatus);
      // console.timeEnd("time");
    }, 1000 / 10);
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
