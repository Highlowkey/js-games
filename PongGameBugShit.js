var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(60);

//============================================================================================================================ GAME STATES
//$ = 0 = start
//$ = 1 = play
//$ = 2 = end
var $ = 0;

//=================================================== SWITCH VARIABLES
var ballMVMT = 0;

//=================================================== UNIVERSAL VARIABLES
var highBound = 10;
var lowBound = 390;

//========================================================================================================================== BUTTON OBJECTS

var buttonObj = function(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
};

var startBT = new buttonObj(125, 175, 150, 50);



//========================================================================================================================== PADDLE OBJECTS

var paddleObj = function(x, y, speed)
{
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.w = 10;
	this.h = 100;
};

var paddleL = new paddleObj(10, 10, 2);
var paddleR = new paddleObj(380, 10, 2);



//=========================================================================================================================== BALL OBJECTS

var ballObj = function(x, y, speedX, speedY)
{
	this.x = x;
	this.y = y;
	this.speedX = speedX;
	this.speedY = speedY;
	this.w = 15;
	this.h = 15;
};

var ball = new ballObj(50, 200, 2, 2);



//========================================================================================================================== START FUNCTION

var startBTPressed = function()
{
	return (mouseX > startBT.x && mouseX < startBT.x + startBT.w && mouseY > startBT.y && mouseY < startBT.y + startBT.h && __mousePressed);
};

var start = function()
{
	fill(255, 0, 0);
	rect(startBT.x, startBT.y, startBT.w, startBT.h);

	if(startBTPressed())
	{
		$ = 1;
	}
};



//========================================================================================================================== PLAY FUNCTION
//================================================================================================ KEY CHECKS
var UPPress = false;
var DOWNPress = false;
var wPress = false;
var sPress = false;

var keyPressed = function()
{
	if (keyCode === UP) {
		UPPress = true;
	}

	if (keyCode === DOWN) {
		DOWNPress = true;
	}

	if (key.toString() === "w") {
		wPress = true;
	}

	if (key.toString() === "s") {
		sPress = true;
	}
};

var keyReleased = function()
{
	if (keyCode === UP) {
		UPPress = false;
	}

	if (keyCode === DOWN) {
		DOWNPress = false;
	}

	if (key.toString() === "w") {
		wPress = false;
	}

	if (key.toString() === "s") {
		sPress = false;
	}
};

/*
var checkKeyUP = function() {
	return (__keyPressed && keyCode === UP);
};

var checkKeyDOWN = function() {
	return (__keyPressed && keyCode === DOWN);
};

var checkKeyW = function() {
	return (__keyPressed && key.toString() === "w");
};

var checkKeyS = function() {
	return (__keyPressed && key.toString() === "s");
};
*/


//================================================================================================ CONTROLS
var rightUpControl = function() {
	// println("right up speed function");
	if(UPPress === true)
	{
		paddleR.y -= paddleR.speed;
		// println("up speed");
	}
};

var rightDownControl = function() {
	if(DOWNPress === true)
	{
		paddleR.y += paddleR.speed;
	}
};

var leftUpControl = function() {
	if(wPress === true)
	{
		paddleL.y -= paddleL.speed;
	}
};

var leftDownControl = function() {
	if(sPress === true)
	{
		paddleL.y += paddleL.speed;
	}
};




/*
var rightUpControl = function() {
	if(checkKeyUP() && paddleR.y > 10)
	{
		paddleR.y -= paddleR.speed;
	}
};

var rightDownControl = function() {
	if(checkKeyDOWN() && paddleR.y + paddleL.h < 390)
	{
		paddleR.y += paddleR.speed;
	}
};

var leftUpControl = function() {
	if(checkKeyW() && paddleL.y > 10)
	{
		paddleL.y -= paddleL.speed;
	}
};

var leftDownControl = function() {
	if(checkKeyS() && paddleL.y + paddleL.h < 390)
	{
		paddleL.y += paddleL.speed;
	}
};
*/


//================================================================================================ SPAWN OBJ
var spawnObjects = function()
{
	fill(255, 0, 0);
	rect(paddleL.x, paddleL.y, paddleL.w, paddleL.h);

	fill(0, 0, 255);
	rect(paddleR.x, paddleR.y, paddleR.w, paddleR.h);

	fill(255, 255, 255);
	ellipse(ball.x, ball.y, ball.w, ball.h);
};



//================================================================================================ BALL MVMT
var initiateBallMove = function()
{
	if (UPPress || DOWNPress || wPress || sPress)
	{
		ballMVMT = 1;
	}
};

var playBallMove = function()
{
	ball.x += ball.speedX;
	ball.y -= ball.speedY;
};

var ballCollision = function()
{
	if (ball.y < highBound || ball.y > lowBound)
	{
		ball.speedY = ball.speedY * -1;
		println("HIT!");
	}

	if (ball.x - ball.w/2 < paddleL.x + paddleL.w && ball.y > paddleL.y && ball.y < paddleL.y + paddleL.h)
	{
		ball.speedX = ball.speedX * -1;
		println("HIT LEFT PADDLE!");
	}

	if (ball.x + ball.w/2 > paddleR.x && ball.y > paddleR.y && ball.y < paddleR.y + paddleR.h)
	{
		ball.speedX = ball.speedX * -1;
		println("HIT RIGHT PADDLE!")
	}
};



var ballMove = function()
{
	switch(ballMVMT)
	{
		case 0:
			initiateBallMove();
			break;

		case 1:
			ballCollision();
			playBallMove();
			break;
	}
};



//================================================================================================ PLAY DRAW FCN
var play = function()
{
	spawnObjects();

	ballMove();

	rightUpControl();
	rightDownControl();
	leftUpControl();
	leftDownControl();
};



//=========================================================================================================================== END FUNCTION
//=========================================================================================================================== DRAW FUNCTION

var draw = function()
{
	switch($)
	{
		case 0:
			background(0, 0, 0);
			start();
			break;

		case 1:
			background(0, 0, 0);
			play();
			break;

		case 2:
			background(0, 0, 0);
			break;
	}
};



//============================================================================================================================ STOP PROGRAM

}};
