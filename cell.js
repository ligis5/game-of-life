function Cell(columns, rows, width, height) {
  const cell = document.createElement("div");
  cell.setAttribute("id", rows);
  cell.setAttribute("class", "cell");

  this.cell = cell;
  this.position = { i: columns, j: rows };
  this.status = 0;
  this.red = 0;

  this.changeStatusOnClick;
  this.cellLives = () => {
    this.status = 1;
    this.red += this.red < 255 ? 5 : 0;
    cell.style.background = `rgb(${this.red}, 0, 0)`;
  };
  this.cellDies = () => {
    this.status = 0;
    this.red = 0;
    cell.style.background = "rgb(40, 51, 153)";
  };
  this.resize = (width, height) => {
    cell.style.width = width + "px";
    cell.style.height = height + "px";
  };
  this.resize(width, height);
  this.neighbours;
  this.cell.addEventListener("click", () => {
    if (this.status == 0) {
      this.cellLives();
      this.changeStatusOnClick();
    } else {
      this.cellDies();
      this.changeStatusOnClick();
    }
  });
}

export default Cell;
