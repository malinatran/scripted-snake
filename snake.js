//////// SET UP GAME AREA ///////

// var scoreArea = ???;
// var gameArea = ???;
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
// var snakeArray = ???;
var gameLoop;


//////// CREATE THE GAME LOOP ///////
function createGameLoop() {
  // gameLoop = setInterval(???, ???);
}

//////// CLEAR THE GAME AREA ///////
function clearGameArea() {

}

//////// DRAW THE SNAKE ///////
function drawSnake() {
  for (/* var i = ???; i < ???; i++ */) {
    // var snakePiece = ???;
    var snakeBlock = $('<div></div>');
    // ???
  }
}

//////// CREATE THE FOOD ///////
function createFood() {
  // food = ???
}

//////// DRAW THE FOOD ///////
function drawFood() {
  var foodBlock = $('<div></div>');
  // ???
}

//////// DRAW THE SCORE ///////
function drawScore() {
  // ???
}

function drawFrame() {
  // ??? create an object that represents the location of the snake's head

  // ??? change the direction of the snake if needed

  // ??? move snake forward by one block

  // ??? check collision

  // ??? check if the snake ate the food

  // draw everything
  clearGameArea();
  drawSnake();
  drawFood();
  drawScore();
}

function endGame(){
  clearInterval(gameLoop);
  console.log('game over');
  var gameOver = $('<div></div>');
  // ???
}

//////// ADD KEYBOARD CONTROLS ///////
function detectKeys(event) {
  // http://keycode.info/

  var key = event.which;
  // ???
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
}

$(document).keypress(detectKeys);
newGame();
