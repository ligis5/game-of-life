import Cell from "./cell.js";

const mainDiv = document.querySelector(".main");

const rows = 120;
const columns = 120;
const total = rows * columns;

const cellWidth = mainDiv.clientWidth / columns - 2;
const cellHeight = mainDiv.clientHeight / rows - 2;

const numberOfLifeCells = rows * 5;

let arrayOfEverythingStatus = [];
let arrayOfCells = [];

for (let i = 0; i < total; i++) {
  arrayOfEverythingStatus.push(0);
  let cell = new Cell(i, cellWidth, cellHeight);
  mainDiv.appendChild(cell.cell);
  arrayOfCells.push(cell);
}
let arrayOfLiveCellsStatus = [];
for (let i = 0; i < numberOfLifeCells; i++) {
  let anyNum = Math.floor(Math.random() * total);
  arrayOfEverythingStatus[anyNum] = 1;
  arrayOfLiveCellsStatus.push(anyNum);
}

const live = (array) => {
  let nexArray = [];
  for (let i = 0; i < total; i++) {
    if (array[i] == 1) arrayOfCells[i].cellLives();
    if (array[i] == 0) arrayOfCells[i].cellDies();
    // if its by end of row or column it will jump to other side of it, as if top was connected to bottom and left connected to right.

    let leftNeigbour = i % rows > 0 ? i - 1 : i + rows - 1;
    let rightNeigbour = (i + 1) % rows > 0 ? i + 1 : i - (rows - 1);
    let aboveNeigbour = i - rows >= 0 ? i - rows : total - rows + i;
    let belowNeigbour = i + rows <= total ? i + rows : total - i;
    let aboveLeftNeigbour =
      aboveNeigbour % rows > 0 ? aboveNeigbour - 1 : aboveNeigbour + rows - 1;
    let aboveRightNeigbour =
      (aboveNeigbour + 1) % rows > 0
        ? aboveNeigbour + 1
        : aboveNeigbour - (rows - 1);
    let belowLeftNeigbour =
      belowNeigbour % rows > 0 ? belowNeigbour - 1 : belowNeigbour + rows - 1;
    let belowRightNeigbour =
      (belowNeigbour + 1) % rows
        ? belowNeigbour + 1
        : belowNeigbour - (rows - 1);

    let neighbours = [
      array[leftNeigbour],
      array[rightNeigbour],
      array[aboveNeigbour],
      array[belowNeigbour],
      array[aboveLeftNeigbour],
      array[aboveRightNeigbour],
      array[belowLeftNeigbour],
      array[belowRightNeigbour],
    ];

    let amountOfLivingNeighbour = 0;
    neighbours.forEach((n) => {
      if (!isNaN(n) && n == 1) {
        amountOfLivingNeighbour++;
      }
    });
    let checkIf1 = amountOfLivingNeighbour == 2 && arrayOfCells[i].status == 1;
    let checkIf2 = amountOfLivingNeighbour == 3 && arrayOfCells[i].status == 1;
    let checkIf3 = arrayOfCells[i].status == 0 && amountOfLivingNeighbour == 3;
    let checkIf4 = amountOfLivingNeighbour < 2 && arrayOfCells[i].status == 1;
    let checkIf5 = amountOfLivingNeighbour > 3 && arrayOfCells[i].status == 1;
    if (checkIf1 || checkIf2) {
      nexArray.push(1);
    }
    if (checkIf4 || checkIf5) {
      nexArray.push(0);
    }
    if (checkIf3) {
      nexArray.push(1);
    }
    if (!checkIf1 && !checkIf2 && !checkIf3 && !checkIf4 && !checkIf5) {
      nexArray.push(0);
    }
  }

  const time = setTimeout(() => {
    live(nexArray);
  }, 300);
};

live(arrayOfEverythingStatus);

const autoGrid = () => {
  document.getElementById("main").style.gridTemplateRows = `repeat(
        (${rows}, ${cellHeight}px)`;
  document.getElementById(
    "main"
  ).style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
};
autoGrid();
