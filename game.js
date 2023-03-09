//array storing buttons selected by users
var userClickedPattern = [];

//array storing colors of buttons
var buttonNumbers = ["red", "blue", "green", "yellow"];

//array to push randomly selected color into
var gamePattern = [];

//variable to track  if the game has started
var started = false;

//give level and initial value of 0
var level = 0;

//generate a random number between 0 and 3
function nextSequence () {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random() * 4);
   //use the random number to select a color from the buttonNumbers array
   var randomChosenColor = buttonNumbers[randomNumber];
   //push the selected random color to the end of gamePattern array
   gamePattern.push(randomChosenColor);
   //select button with same ID as randomChosenColor
   $('#' + randomChosenColor).fadeIn(300).fadeOut(300).fadeIn(300);
   //play sound 
   var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  playSound(randomChosenColor);
};

//handler function
$('.btn').click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1); 
});

//function to cause sound to play on button click
function playSound(name) {
  //play sound in nextSequence()
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  //play sound when user clicks a button
  $('.btn').click(function () {
  var userChosenColor = $(this).attr("id");
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
  }
  else console.log("wrong");
};




