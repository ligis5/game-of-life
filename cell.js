function Cell(id, width, height) {
  const cell = document.createElement("div");
  cell.setAttribute("id", id);
  cell.setAttribute("class", "cell");
  cell.style.width = width + "px";
  cell.style.height = height + "px";

  this.cell = cell;
  this.id = id;

  this.status = 0;

  this.cellLives = () => {
    this.status = 1;
    cell.style.background = "black";
  };
  this.cellDies = () => {
    this.status = 0;
    cell.style.background = "white";
  };
}

export default Cell;
