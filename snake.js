var scoreArea = $('#score-area');
var gameArea = $('#game-area');
var gameWidth = 500;
var gameHeight = 500;

var score = 0;
var blockWidth = 10;
var food;
var gameSpeed;

var direction;
var startingSnakeLength = 5;
var snakeArray = [];
var gameLoop;

function createGameLoop() {
  gameLoop = setInterval(nextFrame, gameSpeed);
};

function clearGameArea() {
  gameArea.empty();
};

function drawSnake() {
  snakeArray.forEach(function(snakePiece) {
    var snakeBlock = $('<div></div>');
    snakeBlock.addClass('snake-block');
    snakeBlock.css({
      'height': blockWidth,
      'width': blockWidth,
      'left': snakePiece.left + "px",
      'top': snakePiece.top + "px"
    });
    gameArea.append(snakeBlock);
  });
};

function createFood() {
  food = {
    top: Math.round(Math.random()*49) * 10,
    left: Math.round(Math.random()*49) * 10
  }
  drawFood();
};

function drawFood() {
  var foodBlock = $('<div></div>');
  foodBlock.addClass('food-block');
  foodBlock.css({
    'height': blockWidth,
    'width': blockWidth,
    'left': food.left + "px",
    'top': food.top + "px"
  });
  gameArea.append(foodBlock);
};

function drawScore() {
  scoreArea.empty();
  var scoreText = $('<div>Score: ' + score + '</div>');
  scoreText.addClass('score-text');
  scoreArea.append(scoreText);
};

function nextFrame() {
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

  if (snakeHead.top < 0 || snakeHead.top >= gameHeight || 
  snakeHead.left < 0 || snakeHead.left >= gameWidth) {
    endGame();
    return;
  } else {
    for (var i = 1; i < snakeArray.length - 1; i += 1 ) {
      if (snakeArray[i].left == snakeArray[0].left && 
        snakeArray[i].top == snakeArray[0].top) {
        endGame();
        return; 
      }
    } 
  }

  if (snakeHead.top == food.top && snakeHead.left == food.left) {
    score += 1;
    drawScore();
    createFood();
    newGameSpeed = gameSpeed * 0.9;
  } else {
    snakeArray.pop();
  }

  clearGameArea();
  drawSnake();
  drawFood();

  if (newGameSpeed !== gameSpeed) {
    gameSpeed = newGameSpeed;
    clearInterval(gameLoop);
    gameLoop = setInterval(nextFrame, gameSpeed);
  }
}

function endGame(){
  clearInterval(gameLoop);
  console.log('game over');
  var gameOver = $('<div>GAME OVER!</div>');
  gameOver.addClass('game-over');
  gameArea.append(gameOver);
};

function detectKeys(event) {
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

function newGame() {
  direction = "right";
  gameSpeed = 100;
  clearGameArea();
  score = 0;

  snakeArray = [];
  for (var i = (startingSnakeLength-1) * blockWidth; i>=0; i-=blockWidth) {
    snakeArray.push({
      left: i, 
      top: 0
    });
  };
  drawSnake();
  createFood();
  createGameLoop();
  drawScore();
};

$(document).keyup(detectKeys);
newGame();