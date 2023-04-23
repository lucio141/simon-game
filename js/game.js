var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var playing = false;
var level = 0;
var waiting = true;


function NextSequence(){
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    level++;
    $('#level-title').text("Level " + level);


    
    gamePattern.push(randomChosenColor);

    for(var i = 0; i < gamePattern.length; i++){
        playPattern(i);
    }

    waiting=false;
};

function playSound(name){
    var audio = new Audio('sounds/'+ name +'.mp3');
    audio.play();
}

$('.btn').click(function () {
    if(!waiting){
            
    var userSelectedColor = this.id;
    userClickedPattern.push(userSelectedColor);

    playSound(userSelectedColor);
    animatePress(this.id)

    if(userClickedPattern[userClickedPattern.length -1] !== gamePattern[userClickedPattern.length -1]){
        gameOver();
    }else{
        if(userClickedPattern.length == gamePattern.length){
            waiting = true;
            userClickedPattern = [];
            setTimeout(function(){
                NextSequence();
            },1000);
        }
    }
    }
})

function animatePress(currentColor){
    $('#' +  currentColor).addClass('pressed');
    setTimeout(function(){
        $('#' +  currentColor).removeClass('pressed');
    },100);
}

$('body').keypress(function () { 
    if(!playing){
        gamePattern = [];
        userClickedPattern = [];
        playing = true;
        $('#level-title').text("Level " + level);
        NextSequence();
    }
});

$('#level-title').click(function () { 
    if(!playing){
        gamePattern = [];
        userClickedPattern = [];
        playing = true;
        $('#level-title').text("Level " + level);
        NextSequence();
    }
});

function playPattern(index){
    setTimeout(function(){
        playSound(gamePattern[index]);
        $("#"+ gamePattern[index]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    },500*index);
}

function gameOver(){
    $('#level-title').text("Game Over, Press Any Key to Restart");
    waiting = true;
    gamePattern = [];
    userClickedPattern = [];
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)

    level = 0;
    playing = false;
}