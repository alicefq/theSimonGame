//array storing buttons selected by users
var userClickedPattern = [];

//array storing colors of buttons
var buttonNumbers = ["red", "blue", "green", "yellow"];

//array to push randomly selected color into
var gamePattern = [];

//generate a random number between 0 and 3
function nextSequence () {
   var randomNumber = Math.floor(Math.random() * 4);
   //use the random number to select a color from the buttonNumbers array
   var randomChosenColor = buttonNumbers[randomNumber];
   //push the selected random color to the end of gamePattern array
   gamePattern.push(randomChosenColor);
   //select button with same ID as randomChosenColor
   $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   //play sound associated with the selected color

   var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
   audio.play();
};

//handler function
$('.btn').click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
});




