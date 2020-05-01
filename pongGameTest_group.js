var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);

//PROGRAM CODE GOES BELOW =======================================================================================================================================================================================================

//Could not remember how to use enum to define GameState
//var $ controls the GameStates
//$ = 0 = start
//$ = 1 = play
//$ = 2 = end

var $ = 0;





//==============================VARIABLE DEFINITIONS=================================
var monospace = createFont("monospace");

var startRectColor = fill(255, 255, 0);
var playerColor = fill(255, 0, 0);
var oppColor = fill(255, 255, 0);

var startRectX = 125;
var startRectY = 175;
var startRectW = 150;
var startRectH = 50;

var playerX = 10;
var playerY = 10;
var playerW = 10;
var playerH = 100;

var oppX = 380;
var oppY = 10;
var oppW = 10;
var oppH = 100;

var ballX = 200;
var ballY = 200;
var ballW = 20;
var ballH = 20;

var playerSpeed = 4;
var ballSpeed = 4;





//=============================GAME OBJECTS=========================================
// Define a ball object type
var ballObj = function(x, y, speed) 
{
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = 10;
};

ballObj.prototype.draw = function() 
{
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.radius, this.radius);
};

ballObj.prototype.collisionCheck = function()
{
    return(this.x + this.radius >= oppX && this.y > oppY && this.y < oppY + oppH);
};

var ball = new ballObj(200, 200, 2);
var ball1 = new ballObj(100, 100, 1);





var paddleObj = function(x, y, speed)
{
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 10;
    this.height = 100;
};

paddleObj.prototype.draw = function() 
{
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
};

var paddleLeft = new paddleObj(10, 10, 4);
var paddleRight = new paddleObj(380, 10, 4);





//==============================BUTTON FUNCTIONS======================================
var startButtonPressed = function()
{
    return (mouseX > startRectX && mouseX < startRectX + startRectW && mouseY > startRectY && mouseY < startRectY + startRectH && __mousePressed && mouseButton === LEFT);
};



var rightUpControl = function()
{
    return (keyIsPressed && keyCode === UP);
};

var rightDownControl = function()
{
    return (keyIsPressed && keyCode === DOWN);
};

var paddleRightMove = function()
{
    if(rightUpControl() === true && paddleRight.y > 10)
    {
        paddleRight.y -= paddleRight.speed;
    }
    
    if(rightDownControl() === true && paddleRight.y < 310)
    {
        paddleRight.y += paddleRight.speed;
    }
};

var leftUpControl = function()
{
    return(keyIsPressed && key.toString() === "w");
};

var leftDownControl = function()
{
    return(keyIsPressed && key.toString() === "s");
};

var paddleLeftMove = function()
{
    if(leftUpControl() === true && paddleLeft.y > 10)
    {
        paddleLeft.y -= paddleLeft.speed;
    }
    
    if(leftDownControl() === true && paddleLeft.y < 310)
    {
        paddleLeft.y += paddleLeft.speed;
    }
};



//===============================BALL FUNCTIONS======================================
var collisionDetection = function()
{
    return(ballY > playerY && ballY < playerY + playerH && ballX + ballW/2 === playerX + playerW);
};





//============================GAMESTATE START SCREEN=================================
var Start = function()
{
    background(255, 255, 255);
    
    fill(255, 0, 0);
    rect(startRectX, startRectY, startRectW, startRectH);
    
    fill(0, 0, 0);
    textFont(monospace);
    text("START", 181, 205);
    
    
    
    if(startButtonPressed() === true)
    {
        $ = 1;
        println($);
    }
};





//=============================GAMESTATE PLAY SCREEN=================================
var Play = function()
{
    background(0, 0, 0);
    
    paddleLeftMove();
    paddleRightMove();
    
    ball.x += ball.speed;
    ball.y -= ball.speed;
    
    ball1.x += ball1.speed;
    ball1.y -= ball1.speed;
};



//==============================GAMESTATE END SCREEN=================================
var End = function()
{
    
};



//========================DRAW FUNCTION (CALLED EVERY FRAME)=========================
var draw = function() 
{
    switch($)
    {
        case 0:
            println($);
            Start();
            break;
        
        case 1:
            println($);
            
            Play();
            
            paddleLeft.draw();
            paddleRight.draw();
            
            ball.draw();
            ball1.draw();
            
            break;
            
        case 2:
            print($);
            End();
            break;
            
        default:
            
            break;
            
    }
};



}};
