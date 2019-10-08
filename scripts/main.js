var tableString;
var width = 35;
var height = 15;
var cells = [];
var localX;
var localY;
var mouseDown;
var drawType = "wall";
var startIndex = [2];
var endIndex = [2];

function cell(x, y, c) {
  positionX = x;
  positionY = y;
  category = c;
}

function createMap() {
  for (var i = 0; i < height; i++) {
    var row = [];
    for (var j = 0; j < width; j++) {
      let c = new cell();
      c.category = "unexplored";
      c.positionX = j;
      c.positionY = i;
      row.push(c);
    }
    cells.push(row);
  }
}

function drawMap() {
  tableString = "<table draggable='false'>";
  for (var i = 0; i < height; i++) {
    tableString += "<tr draggable='false'>";
    for (var j = 0; j < width; j++) {
      tableString += '<td draggable="false" class="' + cells[i][j].category + '" data-row="' + j + '" data-column="' + i + '"></td>';
    }
    tableString += "</tr>";
  }
  tableString += "</table>";
  $("#mainContainer").html(tableString);
}

function updateCellCategory(x, y, c) {
  cells[x][y].category = c;
  drawMap();
}


$(document).ready(function () {
  createMap();
  drawMap();
  startIndex[0] = -1;
  startIndex[1] = -1;
  endIndex[0] = -1;
  endIndex[1] = -1;
});

$("*").on("mousedown", 'td', function () {
  mouseDown = true;
});

$(document).on("mouseup", function () {
  mouseDown = false;
});

$("*").on("mousemove", 'td', function () {
  if (!mouseDown)
    return;
  if (drawType == "wall") {
    localX = $(this).attr("data-row");
    localY = $(this).attr("data-column");
    updateCellCategory(localY, localX, drawType);
  }
});

$(document).on("click", "td", function () {
  if (drawType == "start") {
    removeStartEnd("start");
    localX = $(this).attr("data-row");
    localY = $(this).attr("data-column");
    startIndex[0] = parseInt(localX);
    startIndex[1] = parseInt(localY);
    updateCellCategory(localY, localX, drawType);
  }
  else if (drawType == "end") {
    removeStartEnd("end");
    localX = $(this).attr("data-row");
    localY = $(this).attr("data-column");
    endIndex[0] = parseInt(localX);
    endIndex[1] = parseInt(localY);
    updateCellCategory(localY, localX, drawType);
    currentIndex = startIndex;
  }
});

$("#solveButton").on('click', function () {
  if (startIndex[0] >= 0 && startIndex[1] >= 0 && endIndex[0] >= 0 && endIndex[1] >= 0) {
    solveStep();
  }

});

$('#drawSelect').on('change', function () {
  drawType = $(this).val();
});

function removeStartEnd(x) {
  resetStartEnd();
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (cells[i][j].category == x) {
        updateCellCategory(i, j, "unexplored");
      } else if (cells[i][j].category == "explored") {
        updateCellCategory(i, j, "unexplored");
      }
    }
  }
}

function resetStartEnd() {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (cells[i][j].category == "start") {
        startIndex[0] = j;
        startIndex[1] = i;
        console.log("startIndex Set to: " + startIndex);
      }
      else if (cells[i][j].category == "end") {
        endIndex[0] = j;
        endIndex[1] = i;
        console.log("endIndex Set to: " + endIndex);
      }
    }
  }
}

function solveStep() {
  var solved = false;
  while (!solved) {
    if (startIndex[0] < endIndex[0]) {
      startIndex[0]++;
    } else if (startIndex[0] > endIndex[0]) {
      startIndex[0]--;
    }
    if (startIndex[1] > endIndex[1]) {
      startIndex[1]--;
    } else if (startIndex[1] < endIndex[1]) {
      startIndex[1]++;
    }

    if (cells[startIndex[1]][startIndex[0]].category != "end") {
      updateCellCategory(startIndex[1], startIndex[0], "explored");
    } else {
      solved = true;
    }
  }

}
