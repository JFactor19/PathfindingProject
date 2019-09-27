var tableString;
var width = 35;
var height = 15;
var cells = [];
var localX;
var localY;


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
    console.log("drew it");
}

function updateCellCategory(x, y, c) {
    cells[x][y].category = c;
    drawMap();
}


$(document).ready(function() {
    createMap();
    drawMap();
  });
  
  $("*").on("mousedown", 'td',  function() 
  {
    mouseDown = true;
  });
  
  $(document).on("mouseup", function() 
  {
    mouseDown = false;
  });
  
  $("*").on("mousemove", 'td',  function() 
  {
    if(!mouseDown)
      return;
  
    localX = $(this).attr("data-row");
    localY = $(this).attr("data-column");
    updateCellCategory(localY, localX, "explored");
  });