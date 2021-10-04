function Cell(id, width, height) {
  const cell = document.createElement("div");
  cell.setAttribute("id", id);
  cell.setAttribute("class", "cell");
  cell.style.width = width + "px";
  cell.style.height = height + "px";

  this.cell = cell;
  this.id = id;

  this.status = 0;
  this.red = 0;
  this.green = 0;
  this.blue = 0;
  this.cellLives = () => {
    this.status = 1;
    cell.style.background = `rgb(${this.red}, 0, 0)`;
  };
  this.cellDies = () => {
    this.status = 0;
    cell.style.background = "rgb(40, 51, 153)";
  };
  // this.neighbours = []
  this.cell.addEventListener("click", () => {
    if (this.status == 0) {
      this.cellLives();
      console.log(cell.status);
    } else {
      this.cellDies();
      console.log(cell.status);
    }
  });
}

export default Cell;
