import Cell from "./cell.js";

const mainDiv = document.querySelector(".main");
const buttonPlay = document.querySelector(".play");
const buttonReset = document.querySelector(".reset");

const rows = 10;
const columns = 10;
const total = rows * columns;

const cellWidth = mainDiv.clientWidth / columns - 2;
const cellHeight = mainDiv.clientHeight / rows - 2;

const numberOfLifeCells = 1;

let arrayOfEverythingStatus = [[], []];
let arrayOfCells = [[], []];

for (let i = 0; i < rows; i++) {
  arrayOfEverythingStatus[0].push([0]);
  arrayOfEverythingStatus[1].push([0]);
  arrayOfCells[0].push([]);
  arrayOfCells[1].push([]);
  for (let j = 0; j < columns; j++) {
    arrayOfEverythingStatus[0][i].push(0);
    arrayOfEverythingStatus[1][i].push(0);

    let cell = new Cell(j, cellWidth, cellHeight);
    mainDiv.appendChild(cell.cell);
    arrayOfCells[0][i].push(cell);
    arrayOfCells[1][i].push(cell);
  }
}

for (let i = 0; i < numberOfLifeCells; i++) {
  arrayOfEverythingStatus[0][Math.floor(Math.random() * rows)][
    Math.floor(Math.random() * rows)
  ] = 1;
  arrayOfEverythingStatus[1][Math.floor(Math.random() * rows)][
    Math.floor(Math.random() * rows)
  ] = 1;
}

let stop = true;

const cellsStatusChange = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      arrayOfCells[0][i][j].status = arrayOfEverythingStatus[0][i][j];
      arrayOfCells[1][i][j].status = arrayOfEverythingStatus[1][i][j];
      if (arrayOfCells[0][i][j].status == 1) arrayOfCells[0][i][j].cellLives();
      if (arrayOfCells[0][i][j].status == 1) arrayOfCells[0][i][j].cellLives();
    }
  }
};
cellsStatusChange();
const nextArrayOfEverything = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (
        arrayOfCells[0][i][j].status == 1 ||
        arrayOfCells[1][i][j].status == 1
      ) {
        if (i > 0 || i < rows) {
          let leftNeigbour = arrayOfCells[0][i][j - 1];
          let rightNeigbour = arrayOfCells[0][i][j + 1];
          let aboveNeigbour = arrayOfCells[0][i - 1][j];
          let belowNeigbour = arrayOfCells[0][i + 1][j];
          let aboveLeftNeigbour = arrayOfCells[0][i - 1][j - 1];
          let aboveRightNeigbour = arrayOfCells[0][i - 1][j + 1];
          let belowLeftNeigbour = arrayOfCells[0][i + 1][j - 1];
          let belowRightNeigbour = arrayOfCells[0][i + 1][j + 1];

          // only return new array after calculations, then in new function give cells new states.
        }
      }
    }
  }
};

nextArrayOfEverything();
// const live = (array) => {
//   let nexArray = [];

//   for (let i = 0; i < total; i++) {
//     if (array[i] == 1) arrayOfCells[i].cellLives();
//     if (array[i] == 0) arrayOfCells[i].cellDies();

//     // if its by end of row or column it will jump to other side of it, as if top was connected to bottom and left connected to right.
//     let leftNeigbour = i % rows > 0 ? i - 1 : i + rows - 1;
//     let rightNeigbour = (i + 1) % rows > 0 ? i + 1 : i - (rows - 1);
//     let aboveNeigbour = i - rows >= 0 ? i - rows : total - rows + i;
//     let belowNeigbour = i + rows <= total ? i + rows : total - i;
//     let aboveLeftNeigbour =
//       aboveNeigbour % rows > 0 ? aboveNeigbour - 1 : aboveNeigbour + rows - 1;
//     let aboveRightNeigbour =
//       (aboveNeigbour + 1) % rows > 0
//         ? aboveNeigbour + 1
//         : aboveNeigbour - (rows - 1);
//     let belowLeftNeigbour =
//       belowNeigbour % rows > 0 ? belowNeigbour - 1 : belowNeigbour + rows - 1;
//     let belowRightNeigbour =
//       (belowNeigbour + 1) % rows
//         ? belowNeigbour + 1
//         : belowNeigbour - (rows - 1);

//     let neighbours = [
//       array[leftNeigbour],
//       array[rightNeigbour],
//       array[aboveNeigbour],
//       array[belowNeigbour],
//       array[aboveLeftNeigbour],
//       array[aboveRightNeigbour],
//       array[belowLeftNeigbour],
//       array[belowRightNeigbour],
//     ];

//     let amountOfLivingNeighbour = 0;
//     neighbours.forEach((n) => {
//       if (!isNaN(n) && n == 1) {
//         amountOfLivingNeighbour++;
//       }
//     });
//     let checkIf1 = amountOfLivingNeighbour == 2 && arrayOfCells[i].status == 1;
//     let checkIf2 = amountOfLivingNeighbour == 3 && arrayOfCells[i].status == 1;
//     let checkIf3 = arrayOfCells[i].status == 0 && amountOfLivingNeighbour == 3;
//     let checkIf4 = amountOfLivingNeighbour < 2 && arrayOfCells[i].status == 1;
//     let checkIf5 = amountOfLivingNeighbour > 3 && arrayOfCells[i].status == 1;
//     if (checkIf1 || checkIf2) {
//       nexArray.push(1);
//     }
//     if (checkIf4 || checkIf5) {
//       nexArray.push(0);
//     }
//     if (checkIf3) {
//       nexArray.push(1);
//       arrayOfCells[i].red +=
//         arrayOfCells[i].red < 255 ? 10 : arrayOfCells[i].cellDies();
//     }
//     if (!checkIf1 && !checkIf2 && !checkIf3 && !checkIf4 && !checkIf5) {
//       nexArray.push(0);
//     }
//   }

//   if (stop) return;
//   if (!stop) {
//     const time = setTimeout(() => {
//       live(nexArray);
//       arrayOfEverythingStatus = nexArray;
//     }, 1000 / 10);
//   }
// };

// live(arrayOfEverythingStatus);

const autoGrid = () => {
  document.getElementById("main").style.gridTemplateRows = `repeat(
        (${rows}, ${cellHeight}px)`;
  document.getElementById(
    "main"
  ).style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
};
autoGrid();

// buttonPlay.addEventListener("click", () => {
//   stop = stop == true ? false : true;
//   let button = document.getElementById("play");
//   let button2 = document.getElementById("reset");
//   if (stop) {
//     button.style.color = "aqua";
//     button2.style.color = "aqua";
//   }
//   if (!stop) {
//     button.style.color = "black";
//     button2.style.color = "black";
//   }
//   if (!stop) live(arrayOfEverythingStatus);
// });
// buttonReset.addEventListener("click", () => {
//   if (stop) {
//     for (let i = 0; i < total; i++) {
//       arrayOfEverythingStatus[i] = 0;
//     }
//     for (let i = 0; i < numberOfLifeCells; i++) {
//       let anyNum = Math.floor(Math.random() * total);
//       arrayOfEverythingStatus[anyNum] = 1;
//     }
//     live(arrayOfEverythingStatus);
//   }
// });
