var level=0;
var gamePattern=[];
var userClickedPattern=[]

var buttonColours=["red", "blue", "green", "yellow"]
var started=false;

$("body").keydown(function(){
    if(!started){
        nextSequence();
    
        $("#level-title").html("Level="+level);
        started=true;
    }
})

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer((userClickedPattern.length)-1)
})


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }

    else{
        var wrongSound= new Audio('sounds/wrong.mp3')
        wrongSound.play()
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").html("Game Over, Press Any Key to Restart")
        startOver();
    }
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)

    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
    
}




function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed") 
    },100)
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}
