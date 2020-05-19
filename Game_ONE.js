var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(60);

//-------------------------------------------------------------------------------------------VAR DEFINITION
var wPress = false;
var sPress = false;
var aPress = false;
var dPress = false;
//-------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------SHIP OBJECTS
var shipObj = function(x, y, speed) 
{
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.w = 15;
	this.h = 15;
};

shipObj.prototype.draw = function()
{
	fill(255, 0, 0);
	ellipse(this.x, this.y, this.w, this.h);
};

shipObj.prototype.move = function()
{
	if (wPress === true) {
		this.y -= this.speed;
	}

	if (sPress === true) {
		this.y += this.speed;
	}
	
	if (aPress === true) {
		this.x -= this.speed;
	}

	if (dPress === true) {
		this.x += this.speed;
	}
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



//-------------------------------------------------------------------------------------------DRAW FUNCTION
var draw = function() 
{
	background(0, 0, 0);

	ship.draw();
	ship.move();
};

}};
