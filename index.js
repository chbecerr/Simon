const buttonColors = ["red", "blue", "yellow", "green"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;

$(document).keypress(function () {
    if (!level) {
        $("#level-title").text("Level " + level);
        nextSequence()
    }
})

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);
}

function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function animateGameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver() {
    level = 0;
    gamePattern = [];
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log(true);
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        animateGameOver();
        console.log(false);
        startOver();
    }
}

$(".btn").click(function () {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})