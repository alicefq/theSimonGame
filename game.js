const gamePattern = [];

//array storing colors of buttons
const buttonNumbers = ["red", "blue", "green", "yellow"];

//generate a random number between 0 and 3
const nextSequence = () => {
   var randomNumber = Math.floor(Math.random() * 3);
   console.log(randomNumber);
}
//use the random number to select a color from the buttonNumbers array
var randomChosenColor = buttonNumbers[randomNumber];

//push the selected random color to the end of gamePattern array
gamePattern.push(randomChosenColor);

//select button with same ID as randomChosenColor
$('#' + randomChosenColor).animate({ backgroundColor: "#FFFFFF"}, 1500);