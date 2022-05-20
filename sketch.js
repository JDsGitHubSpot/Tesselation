let tile, reloadTile;
let direction;
let mode, shape, style;
let topButt, bottumButt, leftButt, rightButt, tessButt, delButt, resetButt, saveButt, clearButt, setButt, tranButt, rotButt;
let buffer;
let canv;

function setup() {
  buffer = 60;
  setUpWindow();
  setUpPanel();
  direcition = "top";
  mode = "edit";
}

function draw() {
  clear();
  background(200);
  if (mode == "edit") {
    tile.showEditor();
    fill(200);
    noStroke();
    rect(0, tile.size, width, height);
    rotButt.unload();
    tranButt.unload();
    saveButt.unload();
    // setButt.load();
    clearButt.load();
    delButt.load();
    topButt.load();
    rightButt.load();
    leftButt.load();
    bottomButt.load();
    tessButt.load();
  }

  if (mode == "tile") {
    tile.tessellate(12);
    setButt.unload();
    delButt.unload();
    clearButt.unload();
    topButt.unload();
    rightButt.unload();
    leftButt.unload();
    bottomButt.unload();
    tessButt.load();
    saveButt.load();
    noLoop();
  }
  
  if (mode == "save") {
    saveButt.unload();
    clearButt.unload();
    delButt.unload();
    topButt.unload();
    rightButt.unload();
    leftButt.unload();
    bottomButt.unload();
    tile.tessellate(12);
    saveCanvas(canv, 'myTesselation', 'jpeg');
    mode = "tile";
    loop();
  }
  
  if (mode === "settings") {
    saveButt.unload();
    clearButt.unload();
    delButt.unload();
    topButt.unload();
    rightButt.unload();
    leftButt.unload();
    bottomButt.unload();
    rotButt.load();
    tranButt.load();
    tessButt.load();
  }
  
}

function mouseClicked() {
  if (mouseX < width & mouseY < width & mouseX > 0 & mouseY > 0) {
    pushIt();
  }
  for (let butt of myPanel) {
    if (butt.isOver()) {
      butt.pressed();
    }
  }
}

function mousePressed() {
  if (delButt.isOver()) {
    delButt.switch();
  }
  
  if (clearButt.isOver()) {
    clearButt.switch();
  }
  
  if (tessButt.isOver()) {
    tessButt.switch();
  }
  
  if (setButt.isOver()) {
    setButt.switch();
  }
}

function mouseReleased() {
  if (delButt.isPressed) {
    delButt.switch();
  }
  
  if (clearButt.isPressed) {
    clearButt.switch();
  }
  
  if (tessButt.isPressed) {
    tessButt.switch();
  }
  
  if (setButt.isPressed) {
    setButt.switch();
  }
}

function mouseDragged() {
  if (mouseX < width & mouseX > 0 & mouseY > 0 & mouseY < width) {
    pushIt();
  }
}

function keyPressed() {
  changeMode();
  if (mode == "edit") {
    assignDirection();
    deleteIt();
    if (keyCode == ESCAPE) {
    reset();
    }
  }
}

function pushIt() {
  if (direction == "left") {
    tile.pushVertex(mouseX, mouseY, "left");
  }
  if (direction == "top") {
    tile.pushVertex(mouseX, mouseY, "top");
  }
  if (direction == "right") {
    tile.pushVertex(mouseX, mouseY, "right");
  }
  if (direction == "bottom") {
    tile.pushVertex(mouseX, mouseY, "bottom");
  }
}

function assignDirection() {
  if (keyCode == UP_ARROW) {
    switchToTop() 
  }
  if (keyCode == DOWN_ARROW) {
    switchToBottom()
  }
  if (keyCode == RIGHT_ARROW) {
    switchToRight()
  }
  if (keyCode == LEFT_ARROW) {
    switchToLeft()
  }
}

function deleteIt() {
  if (keyCode == BACKSPACE) {
    if (direction == "left") {
      tile.popVertex("left");
    }
    if (direction == "right") {
      tile.popVertex("right");
    }
    if (direction == "top") {
      tile.popVertex("top");
    }
    if (direction == "bottom") {
      tile.popVertex("bottom");
    }
  }
}

function reset() {
  let size = tile.size
  tile = new SquareTile(tile.size);
}

function changeMode() {
  if (keyCode == ENTER) {
    tessButt.switch();
    if (mode == "edit") {
      mode = "tile";
    } else {
      reloadTile = new SquareTile(width);
      direcition = "top";
      mode = "edit";
      reloadTile.top = tile.top;
      reloadTile.bottom = tile.bottom;
      reloadTile.right = tile.right;
      reloadTile.left = tile.left;
      tile = reloadTile;
      tile.rotateTile();
      tile.rotateTile();
      tile.rotateTile();
      loop();
    }
  }
}

function switchToTop() {
  if (leftButt.isPressed) {
    leftButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  } else if (rightButt.isPressed) {
    rightButt.switch();
  }
  direction = "top";
  topButt.switch();
}
  
function switchToBottom() {
  if (leftButt.isPressed) {
    leftButt.switch();
  } else if (topButt.isPressed) {
    topButt.switch();
  } else if (rightButt.isPressed) {
    rightButt.switch();
  }
  direction = "bottom";
  bottomButt.switch();
}

function switchToRight() {
  if (topButt.isPressed) {
    topButt.switch();
  } else if (leftButt.isPressed) {
    leftButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  }
  direction = "right";
  rightButt.switch();
}

function switchToLeft() {
  if (topButt.isPressed) {
    topButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  } else if (rightButt.isPressed) {
    rightButt.switch();
  }
  direction = "left";
  leftButt.switch();
}

function tesselate() {
  if (mode == "edit") {
      mode = "tile";
      tessButt.text = "Edit";
      tessButt.textOn = "Edit";
      tessButt.textOff = "Edit";
    } else {
      reloadTile = new SquareTile(width);
      direcition = "top";
      mode = "edit";
      reloadTile.top = tile.top;
      reloadTile.bottom = tile.bottom;
      reloadTile.right = tile.right;
      reloadTile.left = tile.left;
      tile = reloadTile;
      tile.rotateTile();
      tile.rotateTile();
      tile.rotateTile();
      tessButt.text = "Tesselate";
      tessButt.textOn = "Tesselate";
      tessButt.textOff = "Tesselate";
      loop();
    }
  if (leftButt.isPressed) {
    leftButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  } else if (topButt.isPressed) {
    topButt.switch();
  }
}

function deletePoint() {
  if (direction == "left") {
      tile.popVertex("left");
    }
    if (direction == "right") {
      tile.popVertex("right");
    }
    if (direction == "top") {
      tile.popVertex("top");
    }
    if (direction == "bottom") {
      tile.popVertex("bottom");
    }
}

function saveTess() {
  mode = "save";
  redraw();
}

function setTess() {
  tessButt.text = "Edit";
  tessButt.textOn = "Edit";
  tessButt.textOff = "Edit";
  mode = "settings"
}

function styleTran() {
  style = "translate";
  if (!tranButt.isPressed) {
    tranButt.switch();
  }
  if (rotButt.isPressed) {
    rotButt.switch();
  }
}

function styleRot() {
  style = "rotate";
  if (!rotButt.isPressed) {
    rotButt.switch();
  }
  if (tranButt.isPressed) {
    tranButt.switch();
  }
}

function setUpPanel() {
  topButt = makeButt("Top");
  topButt.position = [70, height - 50];
  topButt.shape = [5,2]
  topButt.color = topButt.colorOff;
  buttAction(topButt, switchToTop);
  
  bottomButt = makeButt("Bottom");
  bottomButt.position = [70, height - 30];
  bottomButt.shape = [5,2]
  bottomButt.color = bottomButt.colorOff;
  buttAction(bottomButt, switchToBottom);
  
  rightButt = makeButt("right");
  rightButt.position = [120, height - 40];
  rightButt.shape = [5,2]
  rightButt.color = bottomButt.colorOff;
  buttAction(rightButt, switchToRight);
  
  leftButt = makeButt("left");
  leftButt.position = [20, height - 40];
  leftButt.shape = [5,2]
  leftButt.color = bottomButt.colorOff;
  buttAction(leftButt, switchToLeft);
  
  tessButt = makeButt("Tesselate");
  tessButt.position = [200, height - 40];
  tessButt.shape = [7,2];
  buttAction(tessButt, tesselate);
  
  delButt = makeButt("Delete");
  delButt.position = [300, height - 40];
  delButt.shape = [5,2];
  buttAction(delButt, deletePoint);
  
  clearButt = makeButt("Clear");
  clearButt.position = [353, height - 40];
  clearButt.shape = [5,2];
  buttAction(clearButt, reset);
  
  saveButt = makeButt("Save");
  saveButt.position = [140, height - 40];
  saveButt.shape = [5,2];
  buttAction(saveButt, saveTess);
  
  setButt = makeButt("Settings");
  setButt.position = [420, height - 40];
  setButt.shape = [7,2];
  buttAction(setButt, setTess);
  
  tranButt = makeButt("Translate");
  tranButt.position = [20, height - 80];
  tranButt.shape = [9,2];
  buttAction(tranButt, styleTran);
  
  rotButt = makeButt("Rotate");
  rotButt.position = [120, height - 80];
  rotButt.shape = [9,2];
  buttAction(rotButt, styleRot);
}

function setUpWindow() {
  if ((windowWidth+buffer) < windowHeight) {
    canv = createCanvas(windowWidth, windowWidth + buffer);
  } else {
    canv = createCanvas(windowHeight-buffer, windowHeight);
  }
  tile = new SquareTile(width);
}