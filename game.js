const buttonColours = ["red", "blue", "green", "yellow" ];
var gamePattern = [];
var userClickedPattern = [];
var gameIsStart = false;
var level = 0;


$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  
});


function nextSequence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(document).keypress(function(){
    if (gameIsStart == false) {
        nextSequence();
        gameIsStart = true;
        $("#level-title").text("Level " + level);
    }
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } 
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    gameIsStart = false
    level = 0;
    gamePattern = []
}

