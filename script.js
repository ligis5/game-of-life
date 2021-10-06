import Cell from "./cell.js";

const mainDiv = document.querySelector(".main");
const buttonPlay = document.querySelector(".play");
const buttonReset = document.querySelector(".reset");

const rows = 100;
const columns = 100;
const total = rows * columns;

const cellWidth = mainDiv.clientWidth / columns - 2;
const cellHeight = mainDiv.clientHeight / rows - 2;

const numberOfLifeCells = rows * 5;

let arrayOfEverythingStatus = [];
let arrayOfCells = [];

for (let i = 0; i < rows; i++) {
  arrayOfEverythingStatus.push([0]);
  arrayOfCells.push([]);
  for (let j = 0; j < columns; j++) {
    arrayOfEverythingStatus[i].push(0);

    let cell = new Cell(j, cellWidth, cellHeight);
    mainDiv.appendChild(cell.cell);
    arrayOfCells[i].push(cell);
  }
}

for (let i = 0; i < numberOfLifeCells; i++) {
  arrayOfEverythingStatus[Math.floor(Math.random() * rows)][
    Math.floor(Math.random() * rows)
  ] = 1;
}

let stop = true;

const cellsStatusChange = (array) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      arrayOfCells[i][j].status = array[i][j];
      if (arrayOfCells[i][j].status == 1) arrayOfCells[i][j].cellLives();
      if (arrayOfCells[i][j].status == 0) arrayOfCells[i][j].cellDies();
    }
  }
};
cellsStatusChange(arrayOfEverythingStatus);
const nextArrayOfEverything = (array) => {
  let nextArray = [];
  for (let i = 0; i < rows; i++) {
    nextArray.push([0]);
    for (let j = 0; j < columns; j++) {
      nextArray[i].push(0);
      let leftNeigbour = array[i][j > 0 ? j - 1 : j + (columns - 1)];
      let rightNeigbour = array[i][j < columns - 1 ? j + 1 : j - (columns - 1)];
      let aboveNeigbour = array[i > 0 ? i - 1 : i + (rows - 1)][j];
      let belowNeigbour = array[i < rows - 1 ? i + 1 : i - (rows - 1)][j];
      let aboveLeftNeigbour =
        array[i > 0 ? i - 1 : i + (rows - 1)][j > 0 ? j - 1 : j + columns - 1];
      let aboveRightNeigbour =
        array[i > 0 ? i - 1 : i + (rows - 1)][
          j < columns - 1 ? j + 1 : j - (columns - 1)
        ];
      let belowLeftNeigbour =
        array[i < rows - 1 ? i + 1 : i - (rows - 1)][
          j > 0 ? j - 1 : j + (columns - 1)
        ];
      let belowRightNeigbour =
        array[i < rows - 1 ? i + 1 : i - (rows - 1)][
          j < columns - 1 ? j + 1 : j - (columns - 1)
        ];

      let neighbours = [
        leftNeigbour,
        rightNeigbour,
        aboveNeigbour,
        belowNeigbour,
        aboveLeftNeigbour,
        aboveRightNeigbour,
        belowLeftNeigbour,
        belowRightNeigbour,
      ];

      let amountOfLivingNeighbour = 0;
      neighbours.forEach((n) => {
        if (n == 1) {
          amountOfLivingNeighbour++;
        }
      });

      let checkIf1 = amountOfLivingNeighbour == 2 && array[i][j] == 1;
      let checkIf2 = amountOfLivingNeighbour == 3 && array[i][j] == 1;
      let checkIf3 = array[i][j] == 0 && amountOfLivingNeighbour == 3;
      let checkIf4 = amountOfLivingNeighbour < 2 && array[i][j] == 1;
      let checkIf5 = amountOfLivingNeighbour > 3 && array[i][j] == 1;
      if (checkIf1 || checkIf2) {
        nextArray[i][j] = 1;
      }
      if (checkIf4 || checkIf5) {
        nextArray[i][j] = 0;
      }
      if (checkIf3) {
        nextArray[i][j] = 1;
        arrayOfCells[i][j].red += 10;
        // arrayOfCells[i][j].red < 255 ? 10 : arrayOfCells[i][j].cellDies();
      }
      if (!checkIf1 && !checkIf2 && !checkIf3 && !checkIf4 && !checkIf5) {
        nextArray[i][j] = 0;
      }
    }
  }
  arrayOfEverythingStatus = nextArray;
  return nextArray;
};
let time;

const autoGrid = () => {
  document.getElementById("main").style.gridTemplateRows = `repeat(
        (${rows}, ${cellHeight}px)`;
  document.getElementById(
    "main"
  ).style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
};
autoGrid();

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
      cellsStatusChange(nextArrayOfEverything(arrayOfEverythingStatus));
    }, 1000 / 10);
  }
});
buttonReset.addEventListener("click", () => {
  if (stop) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        arrayOfEverythingStatus[i][j] = 0;
      }
    }
    for (let i = 0; i < numberOfLifeCells; i++) {
      arrayOfEverythingStatus[Math.floor(Math.random() * rows)][
        Math.floor(Math.random() * rows)
      ] = 1;
    }
    cellsStatusChange(arrayOfEverythingStatus);
  }
});
