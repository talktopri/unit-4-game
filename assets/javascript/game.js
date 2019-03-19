// creates objects for each character as an array

var character = [{

    name: "Mario",
    healthPoints: 350,
    attackPoints: 10,
    counterAttack: 15,
},
{
    name: "Peach",
    healthPoints: 375,
    attackPoints: 15,
    counterAttack: 10,
},
{
    name: "Goomba",
    healthPoints: 290,
    attackPoints: 10,
    counterAttack: 50,
},
{
    name: "Bowser",
    healthPoints: 295,
    attackPoints: 30,
    counterAttack: 10,
}]

// these variables will be used to show messages during the attack phase

var player1 = "";
var player2 = "";
var player1Name = "";
var player1Health = "";
var player1Attack = "";
var player2Name = "";
var player2Health = "";
var player2CounterAttack = "";
var wins = 0;
var marioAudio = new Audio("./assets/audio/mario-audio.mp3");
var peachAudio = new Audio("./assets/audio/peach-audio.mov");
var goombaAudio = new Audio("./assets/audio/goomba-audio.mp3");
var bowserAudio = new Audio("./assets/audio/bowser-audio.mov");
var gameOver = new Audio("./assets/audio/game-over.mp3");
var youWin = new Audio("./assets/audio/winning-audio.mp3");

// to use later during the character-choosing phase and also hide all during document load
$("#player2-Mario,#player2-Peach,#player2-Goomba,#player2-Bowser").hide();
$("#battleMario,#battlePeach,#battleGoomba,#battleBowser").hide();
$("#attackBtn,#reset").hide();

// these functions will update the HTML with messages when attacks happen

function player1DOMUpdate() {
    $("#infoOne").text (character[i].name + " Health: " + character[i].healthPoints);
    player1Name = character[i].name;
    player1Attack = character[i].attackPoints;
    player1Health = character[i].healthPoints;
}

function player2DOMUpdate() {
    $("#infoTwo").text (character[i].name + " Health: " + character[i].healthPoints);
    $("#attackBtn").show();
    player2Name = character[i].name;
    player2CounterAttack = character[i].counterAttack;
    player2Health = character[i].healthPoints;
 
}

// this is what happens when you choose your player:

$("#player1-Mario").click(function() { //if you choose player1-Mario...
    marioAudio.play();
    i=0; player1DOMUpdate(); // the i=0 part will be useful later. Call the function that will update the display with the player's name, attack and health
    $("#player1-Peach,#player1-Goomba,#player1-Bowser").animate({opacity: "0.3"}); // let's hide the other players, so the user will know that player1-Mario is selected
    $("#player2-Peach,#player2-Goomba,#player2-Bowser").show(); // here we show the options to be picked as player2
    $("#battlePeach,#battleGoomba,#battleBowser").hide(); //hides all battle players
    $("#player1-Mario").animate({opacity: "0.3"});
    $("#battleMario").show(); //shows only the character selected
    $("#player1-placeholder").append($("#battleMario"));
    
}); 
   
$("#player1-Peach").click(function() {
    peachAudio.play();
    i=1; player1DOMUpdate();
    $("#player1-Peach").animate({opacity: "0.3"});
    $("#player1-Mario,#player1-Goomba,#player1-Bowser").animate({opacity: "0.3"});
    $("#player2-Mario,#player2-Goomba,#player2-Bowser").show();
    $("#battleMario,#battleGoomba,#battleBowser").hide();
    $("#battlePeach").show();
    $("#player1-placeholder").append($("#battlePeach"));
    
});

$("#player1-Goomba").click(function() {
    goombaAudio.play();
    i=2; player1DOMUpdate();
    $("#player1-Goomba").animate({opacity: "0.3"});
    $("#player1-Mario,#player1-Peach,#player1-Bowser").animate({opacity: "0.3"});
    $("#player2-Mario,#player2-Peach,#player2-Bowser").show();
    $("#battleMario,#battlePeach,#battleBowser").hide();
    $("#battleGoomba").show();
    $("#player1-placeholder").append($("#battleGoomba"));
    
});

$("#player1-Bowser").click(function() {
    bowserAudio.play();
    i=3; player1DOMUpdate();
    $("#player1-Bowser").animate({opacity: "0.3"});
    $("#player1-Mario,#player1-Peach,#player1-Goomba").animate({opacity: "0.3"});
    $("#player2-Mario,#player2-Peach,#player2-Goomba").show();
    $("#battleMario,#battleGoomba,#battlePeach").hide();
    $("#battleBowser").show();
    $("#player1-placeholder").append($("#battleBowser"));
    
});

     // on-click functions for each opponent

$("#player2-Mario").click(function() { //when player2 mario is selected...
    marioAudio.play();
    i=0; player2DOMUpdate(); // call the player2DOMUpdate function
    $("#player2-Mario").animate({opacity: "0.3"}); //hide player2 Mario
    $("#battleMario").show(); //show battleMario
    $("#player2-placeholder").append($("#battleMario"));
    
});
       
$("#player2-Peach").click(function() {
    peachAudio.play();
    i=1; player2DOMUpdate();
    $("#player2-Peach").animate({opacity: "0.3"});
    $("#battlePeach").show();
    $("#player2-placeholder").append($("#battlePeach"));
    
});
    
$("#player2-Goomba").click(function() {
    goombaAudio.play();
    i=2; player2DOMUpdate();
    $("#player2-Goomba").animate({opacity: "0.3"});
    $("#battleGoomba").show();
    $("#player2-placeholder").append($("#battleGoomba"));

});
    
$("#player2-Bowser").click(function() {
    bowserAudio.play();
    i=3; player2DOMUpdate();
    $("#player2-Bowser").animate({opacity: "0.3"});
    $("#battleBowser").show();
    $("#player2-placeholder").append($("#battleBowser"));
    
}); 

//now on to the attack button fun

$("#attackBtn").click(function() { //when the attack button is clicked...

    player2Health = (player2Health - player1Attack);
    player1Health = (player1Health - player2CounterAttack);
        $("#instructBox").text("You've caused " + player1Attack + " damage. " + "Player 2 counter-attacked " + player2CounterAttack + " damage!" );
        $("#infoOne").text ("Name: " + player1Name + " Health: " + player1Health);
        $("#infoTwo").text ("Name: " + player2Name + " Health: " + player2Health);
            
        if (player1Health > 0) {player1Attack = player1Attack + 10} 
        
        if (player1Health <= 0) {
                gameOver.play();
                $("#instructBox").text("Oops, you lost all your health points. Game over!");
                $("#battleMario,#battlePeach,#battleGoomba,#battleBowser").hide();
                $("#infoOne").hide();
                $("#infoTwo").hide();
                $("#attackBtn").hide();
                $("#player1-Mario,#player1-Peach,#player1-Goomba,#player1-Bowser").hide();
                $("#player2-Mario,#player2-Peach,#player2-Goomba,#player2-Bowser").hide();
                $("#reset").show();
                    }

        else if (player2Health <= 0){
                $("#instructBox").text("Choose Another Opponent!")
                $("#attackBtn").hide();
                $("#player2-placeholder").empty();
                wins++;
                
                    }
        
        if (player1Health <= 0 && player2Health <= 0) {
                $("#instructBox").text("You've Both Fainted! Its a tie!")
                $("#attackBtn").hide();
                    }
        // If All Enemies are Defeated             
        if (wins === 3) {
                youWin.play();
                $("#instructBox").text("YOU WIN!");
                $("#infoOne").hide();
                $("#infoTwo").hide();
                $("#battleMario,#battlePeach,#battleGoomba,#battleBowser").hide();
                $("#reset").show();


        }
        
});