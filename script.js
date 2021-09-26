const mainDiv = document.querySelector(".main");

const rows = 40;
const columns = 40;
const total = rows * columns;

const cellWidth = mainDiv.clientWidth / columns - 2;
const cellHeight = mainDiv.clientHeight / rows - 2;

const numberOfLifeCells = 10;

const arrayOfEverything = [];

for (let i = 0; i < total; i++) {
  arrayOfEverything.push(0);
}
for (let i = 0; i < numberOfLifeCells; i++) {
  arrayOfEverything[Math.floor(Math.random() * total)] = 1;
}

for (i = 0; i < total; i++) {
  const cell = document.createElement("div");
  cell.setAttribute("id", i);
  cell.setAttribute("class", "cell");
  mainDiv.appendChild(cell);
  cell.style.width = cellWidth + "px";
  cell.style.height = cellHeight + "px";
  cell.setAttribute("live", arrayOfEverything[i]);
  if (cell.getAttribute("live") == "1") {
    cell.style.background = "black";
  }
}
const autoGrid = () => {
  document.getElementById("main").style.gridTemplateRows = `repeat(
        (${rows}, ${cellHeight}px)`;
  document.getElementById(
    "main"
  ).style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
  console.log(mainDiv);
};
autoGrid();
