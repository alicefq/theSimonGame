//array storing buttons selected by users
var userClickedPattern = [];

//array storing colors of buttons
var buttonColors = ["red", "blue", "green", "yellow"];

//array to push randomly selected color into
var gamePattern = [];

//variable to track  if the game has started
var started = false;

//give level and initial value of 0
var level = 0;

function nextSequence () {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random() * 4);
   //use the random number to select a color from the buttonColors array
   var randomChosenColor = buttonColors[randomNumber];
   //push the selected random color to the end of gamePattern array
   gamePattern.push(randomChosenColor);
   //select button with same ID as randomChosenColor
   $('#' + randomChosenColor).fadeIn(300).fadeOut(300).fadeIn(300);
   //play sound 
  playSound(randomChosenColor);
  setTimeout(function() {
    checkAnswer(userClickedPattern.length-1);
  }, gamePattern.length * 600);
};

//handler function
$('.btn').click(function () {
  var userChosenColor = $(this).attr("id");
  
  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  userClickedPattern.push(userChosenColor); 
  //check if arrays are storing data properly
  console.log("gamePattern: " + gamePattern);
  console.log("userClickedPattern: " + userClickedPattern);
});

//function to cause sound to play on button click
function playSound(name) {
  //play sound in nextSequence()
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  //play sound when user clicks a button
  $('.btn').click(function () {
    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor); // move playSound call inside click handler
  });
};

//animate buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 300);
  };

//find out if a keyboard key has been pressed, and if it has, run nextSequence()
$(document).on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//change text to 'Level 0' if key pressed
$(document).on("keydown", function() {
  if (level === 0) {
    $("#level-title").text("Level 0");
  }
});

//function checkAnswer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function() {
      nextSequence();
    }, 1000);
    };
   // else {
      //setTimeout(function() {
        //nextSequence();
      //}, 1000);
    //}
  }
  else {
    // check if data is being stored correctly
    console.log("wrong");
    console.log("wrong");
    console.log("gamePattern: " + gamePattern);
    console.log("userClickedPattern: " + userClickedPattern);
    var audio = new Audio("Sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    //$(document).off("keydown");
}
};

//restart the game
function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
  $(document).on("keydown", function() {
    startOver();
    });
}


