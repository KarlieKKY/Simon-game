let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

    level++
    $("h1").text("Level " + level)
}


$(".btn").click(function (event) {
    if (started) {
        var userChosenColour = event.target.id
        userClickedPattern.push(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer(userClickedPattern.length - 1, userChosenColour)
    }
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}


$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level 0")
        started = true;
        nextSequence();
    }
})

function checkAnswer(currentLevel, userChosenColour) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        playSound(userChosenColour);
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence()
                userClickedPattern = []
            }, 1000)
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}