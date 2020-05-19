var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(60);

//-------------------------------------------------------------------------------------------VAR DEFINITION
var wPress = false;
var sPress = false;
var aPress = false;
var dPress = false;
//-------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------GAME OBJECTS
var shipObj = function(x, y, speed) 
{
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.w = 15;
	this.h = 15;
};

var ship = new shipObj(200, 200, 2);
//-------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------KEY CHECKS
var keyPressed = function()
{
	if (key.toString() === "w") {
		wPress = true;
		println("W");
	}

	if (key.toString() === "s") {
		sPress = true;
	}

	if (key.toString() === "a") {
		aPress = true;
	}

	if (key.toString() === "d") {
		dPress = true;
	}
};


var keyReleased = function()
{
	if (key.toString() === "w") {
		wPress = false;
	}

	if (key.toString() === "s") {
		sPress = false;
	}

	if (key.toString() === "a") {
		aPress = false;
	}

	if (key.toString() === "d") {
		dPress = false;
	}
};
//-------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------SHIP FUNCTIONS
var shipDraw = function() 
{
	fill(255, 0, 0);
	ellipse(ship.x, ship.y, ship.w, ship.h);
};

var shipMove = function() 
{
	if (wPress === true) {
		ship.y -= ship.speed;
	}

	if (sPress === true) {
		ship.y += ship.speed;
	}
	
	if (aPress === true) {
		ship.x -= ship.speed;
	}

	if (dPress === true) {
		ship.x += ship.speed;
	}
};
//-------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------DRAW FUNCTION
var draw = function() 
{
	background(0, 0, 0);

	shipDraw();
	shipMove();

/*  ---ASTEROID SPAWNING---
//patrick's original attempt at spawning asteroids in the draw function

  if (second() == 1) {
    var asteroid_x = random(1,400);
    var asteroid_y = random(1,400);
    var asteroid_rad = random(10,20);
    ellipse(asteroid_x, asteroid_y, asteroid_rad, asteroid_rad);
  }
*/

};

}};
