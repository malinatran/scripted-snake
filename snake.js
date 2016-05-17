//////// SET UP GAME AREA ///////

var scoreArea = $('#scorearea');
var gameArea = $('#gamearea');
var gameWidth = 500;
var gameHeight = 500;

//////// SET UP GAME VARIABLES ///////
var score = 0;
var blockWidth = 10;
var food;
var gameSpeed;

//////// CREATE THE SNAKE ///////
var direction;
var startingSnakeLength = 5;
var snakeArray = [];
var gameLoop;


//////// CREATE THE GAME LOOP ///////
function createGameLoop() {
  gameLoop = setInterval(nextFrame, gameSpeed);
}

//////// CLEAR THE GAME AREA ///////
function clearGameArea() {
  gameArea.empty();
}

//////// DRAW THE SNAKE ///////
function drawSnake() {
  snakeArray.forEach(function(snakePiece) {
    var snakeBlock = $('<div></div>');
    snakeBlock.css({
      'height': blockWidth,
      'width': blockWidth,
      'left': snakePiece.left,
      'top': snakePiece.top,
      'backgroundColor': 'red',
      'position': 'absolute'
    });
    gameArea.append(snakeBlock);
  });
}

//////// CREATE THE FOOD ///////
function createFood() {
  food = {
    top: Math.round(Math.random()*49) * 10,
    left: Math.round(Math.random()*49) * 10
  }
  drawFood();
}

//////// DRAW THE FOOD ///////
function drawFood() {
  var foodBlock = $('<div></div>');
  foodBlock.css('height', blockWidth);
  foodBlock.css('width', blockWidth);
  foodBlock.css('left', food.left);
  foodBlock.css('top', food.top);
  foodBlock.css('background-color', 'black');
  gameArea.append(foodBlock);
}

//////// DRAW THE SCORE ///////
function drawScore() {
  scoreArea.append("score: " + score);
}

function nextFrame() {
  // Things to solve:
  // 1) Moving the snake's head in the current direction.
  var snakeHead = {
    left: snakeArray[0].left,
    top: snakeArray[0].top
  };

  var newGameSpeed = gameSpeed;

  if (direction == "right") {
    snakeHead.left += blockWidth;
  } else if (direction == "left") {
    snakeHead.left -= blockWidth;
  } else if (direction == "up") { 
    snakeHead.top -= blockWidth;
  } else if( direction == "down") {
    snakeHead.top += blockWidth;
  }

  snakeArray.unshift(snakeHead);

  // 2) Check for collision.
    if (snakeHead.top < 0 || snakeHead.top >= gameHeight || 
    snakeHead.left < 0 || snakeHead.left >= gameWidth) {
      endGame();
      return;
    } else {
      for (var i = 1; i < snakeArray.length - 1; i += 1 ) {
        if (snakeArray[i].left == snakeArray[0].left && 
          snakeArray[i].top == snakeArray[0].top ) {
          endGame();
          return; 
        }
      } 
    }

  // 3) Check if the snake ate the food and grow it if needed.
  if (snakeHead.top == food.top && snakeHead.left == food.left) {
    score += 1;
    drawScore();
    createFood();
    newGameSpeed = gameSpeed * 0.9;
  } else {
    snakeArray.pop();
  }

  // make a clean slate and draw everything
  clearGameArea();
  drawSnake();
  createFood();

  if (newGameSpeed !== gameSpeed) {
    gameSpeed = newGameSpeed;
    clearInterval(gameLoop);
    gameLoop = setInterval(nextFrame, gameSpeed);
  }
}

function endGame(){
  clearInterval(gameLoop);
  console.log('game over');
  var gameOver = $('<div></div>');
  gameOver.addClass('gameover');
  gameOver.html('Game over!');
  gameArea.append(gameOver);
}

//////// ADD KEYBOARD CONTROLS ///////
function detectKeys(event) {
  // http://keycode.info/

  var key = event.which;
  if (key == "37" && direction != "right") {
    direction = "left";
  } else if (key == "38" && direction != "down") {
    direction = "up";
  } else if (key == "39" && direction != "left") {
    direction = "right";
  } else if (key == "40" && direction != "up") {
    direction = "down";
  }

  if (key == 32) {
    newGame();
  }

};

// start the game
function newGame(){
  direction = "right";
  gameSpeed = 100;
  clearGameArea();
  score = 0;

  // create an empty snake Array
  snakeArray = [];
  // Loop through the snakeLength to create a horizontal snake starting from the top left
  for (var i = (startingSnakeLength-1) * blockWidth; i>=0; i -= blockWidth) {
    snakeArray.push({left: i, top:0});
  }
  drawSnake();
  createFood();
  createGameLoop();
  drawScore();
}

$(document).keyup(detectKeys);
newGame();

