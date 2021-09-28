import Cell from "./cell.js";

const mainDiv = document.querySelector(".main");

const rows = 20;
const columns = 20;
const total = rows * columns;

const cellWidth = mainDiv.clientWidth / columns - 2;
const cellHeight = mainDiv.clientHeight / rows - 2;

const numberOfLifeCells = 40;

let arrayOfEverything = [];

for (let i = 0; i < total; i++) {
  arrayOfEverything.push(0);
}
let arrayOfLiveCells = [];
for (let i = 0; i < numberOfLifeCells; i++) {
  let anyNum = Math.floor(Math.random() * total);
  arrayOfEverything[anyNum] = 1;
  arrayOfLiveCells.push(anyNum);
}

const live = (array) => {
  let nexArray = [];
  for (let i = 0; i < total; i++) {
    let cell = new Cell(i, cellWidth, cellHeight);
    mainDiv.appendChild(cell.cell);
    if (array[i] == 1) {
      cell.cellLives();
    }
    let leftNeigbour = i % rows > 0 ? i - 1 : NaN;
    let rightNeigbour = (i + 1) % rows > 0 ? i + 1 : NaN;
    let aboveNeigbour = i - 20 >= 0 ? i - 20 : NaN;
    let belowNeigbour = i + 20 <= total ? i + 20 : NaN;
    let aboveLeftNeigbour = aboveNeigbour % rows > 0 ? aboveNeigbour - 1 : NaN;
    let aboveRightNeigbour =
      (aboveNeigbour + 1) % rows > 0 ? aboveNeigbour + 1 : NaN;
    let belowLeftNeigbour = belowNeigbour % rows > 0 ? belowNeigbour - 1 : NaN;
    let belowRightNeigbour =
      (belowNeigbour + 1) % rows > 0 ? belowNeigbour + 1 : NaN;

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
      if (!isNaN(n) && n < 400) {
        if (cell.status == 1) {
          amountOfLivingNeighbour++;
        }
      }
    });
    console.log(amountOfLivingNeighbour, cell);
    // if (amountOfLivingNeighbour < 2 || amountOfLivingNeighbour > 3) {
    //   cell.cellDies();
    // }
    if (cell.status == 0 && amountOfLivingNeighbour == 3) {
      cell.cellLives();
      console.log("work");
    }
    nexArray.push(cell.status);
  }

  // const time = setTimeout(() => {
  //   // live(nexArray);
  //   console.log("hi");
  // }, 1000);
};

live(arrayOfEverything);

const autoGrid = () => {
  document.getElementById("main").style.gridTemplateRows = `repeat(
        (${rows}, ${cellHeight}px)`;
  document.getElementById(
    "main"
  ).style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
};
autoGrid();
