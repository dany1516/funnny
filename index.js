var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var countDownSeconds = 3;
var introText = "Press A Key to Start";
var countDownText = "Game starts in: ";
var levelText = "Level ";
var gameOverText = "Game Over, Press Any Key to Restart";

//starts the game on key down
$(document).keydown(function() {
  if (started !== true) {
    started = true;
    nextSequence();
  }
})

//handling the user input if started
$(".btn").click(function() {
  if (started === true) {
    userInputHandler(this);
  }
})

function userInputHandler(input) {
  userChosenColour = $(input).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(input);
  checkAnswer(userClickedPattern.length - 1);

}

//adds next color in the pattern
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  effectsRandomColor(randomChosenColor);
  levelHandler();
}

//applies animation and sound effects
function effectsRandomColor(color) {
  $("." + color).fadeOut(100).fadeIn(100);
  playSound(color);
}

//changes the h1 and increment the level
function levelHandler() {
  level++;
  $("h1").text(levelText + level);
}

//play the specific sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animation when user press a color
function animatePress(currentColour) {
  console.log(currentColour);
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100)
}

// verify the user input
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    nextLevelHandler();
  } else {
    gameOverHandler();
  }
}

//if pattern is complete and correct go next level
function nextLevelHandler() {
  if (gamePattern.length === userClickedPattern.length) {
    userClickedPattern = [];
    setTimeout(nextSequence(), 1000);
  }
}

//if pattern is different from one of the other end game
function gameOverHandler() {
  playSound("wrong");
  $("h1").text(gameOverText);
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

//resets the variables to initial state
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
  $("h1").text(introText);
}
