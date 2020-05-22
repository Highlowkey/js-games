var sketchProc=function(processingInstance){ with (processingInstance){
size(800, 500);
frameRate(60);
/*----------------------------------------------------------------------------------------------------------------------------GAME STATES
0 = START
1 = LEVEL ONE
*/

var $ = 0;

//----------------------------------------------------------------------------------------------------------------------------VAR DEFINITION
var wPress = false;
var sPress = false;
var aPress = false;
var dPress = false;

var mouseLeftPress = false;
var mouseRightPress = true;

var topBound = 0;
var bottomBound = 500;
var leftBound = 0;
var rightBound = 800;
//-------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------BUTTON OBJECTS
var buttonObj = function(x, y, w, h)  {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.click = false;
};

var startBT = new buttonObj (200, 200, 100, 50);



//-------------------------------------------------------------------------------------------BUTTON FUNCTIONS
buttonObj.prototype.draw = function() {
	fill(255, 0, 0);
	rectMode(CENTER);
	rect(this.x, this.y, this.w, this.h);
};

buttonObj.prototype.press = function() {
	if (mouseLeftPress === true && mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY < this.y + this.h/2 && mouseY > this.y -this.h/2) {
		this.click = true;
		println(this.click);
	}
};



//----------------------------------------------------------------------------------------------------------------------------SHIP OBJECTS
var shipObj = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
 	this.angle = 0;
	this.img = loadImage("ship.jpg");
};

var ship = new shipObj(200, 200, 2);



//-------------------------------------------------------------------------------------------SHIP FUNCTIONS
shipObj.prototype.draw = function() {
	pushMatrix();
	translate(this.x, this.y);
	rotate(this.angle);
	imageMode(CENTER);
	image(this.img, 0, 0);
	popMatrix();
};

shipObj.prototype.move = function() {
	if (wPress === true) {
		this.y += this.speed * sin(this.angle-3.14/2);
    	this.x += this.speed * cos(this.angle-3.14/2);
	}

	if (sPress === true) {
		this.y -= this.speed * sin(this.angle-3.14/2);
    	this.x -= this.speed * cos(this.angle-3.14/2);
	}

	if (aPress === true) {
		this.angle -= .1;
	}

	if (dPress === true) {
    	this.angle += .1;
	}
};



//----------------------------------------------------------------------------------------------------------------------------ASTEROID OBJECTS
var asteroidObj = function(x, y, xSpeed, ySpeed, rad) {
	this.x = x;
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.rad = rad;
};

var asteroids = [];



//-------------------------------------------------------------------------------------------ASTEROID FUNCTIONS
var drawAsteroid = function(asteroid) {
	fill(255, 255, 255);
	ellipse(asteroid.x, asteroid.y, asteroid.rad, asteroid.rad);
};

var asteroidUpdate = function(asteroid) {
	asteroid.x += asteroid.xSpeed;
	asteroid.y += asteroid.ySpeed;
};

var createAsteroid = function() {
	if (frameCount%120 == 0) {
		asteroids.push(new asteroidObj(random(100,300), random(100, 300), 0, 0, random(20, 60)));
	}
};

var destroyAsteroid = function() {
	if (asteroids.length > 6) {
		asteroids.shift();
	}
};

var countAsteroid = function()
{
	println(asteroids.length);
};



//----------------------------------------------------------------------------------------------------------------------------KEY CHECKS
var keyPressed = function()
{
	if (key.toString() === "w") {
		wPress = true;
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

var mousePressed = function()
{
	if (mouseButton === LEFT) {
		mouseLeftPress = true;
	}

	if (mouseButton === RIGHT) {
		mouseRightPress = true;
	}
};

var mouseReleased = function()
{
	if (mouseButton === LEFT) {
		mouseLeftPress = false;
	}

	if (mouseButton === RIGHT) {
		mouseRightPress = false;
	}
};



//----------------------------------------------------------------------------------------------------------------------------0 CASE FUNCTIONS
var buttonState0 = function()
{
	startBT.draw();
	startBT.press();

	if (startBT.click === true) {
		$ = 1;
	}
};



//----------------------------------------------------------------------------------------------------------------------------1 CASE FUNCTIONS
var shipState1 = function()
{
	ship.draw();
	ship.move();
};

var asteroidState1 = function()
{
	createAsteroid();

	asteroids.forEach(drawAsteroid);
	asteroids.forEach(asteroidUpdate);

	destroyAsteroid();
	countAsteroid();
};



//----------------------------------------------------------------------------------------------------------------------------DRAW FUNCTION
var draw = function()
{
	switch($)
	{
		case 0:
			buttonState0();
			break;

		case 1:
			background(0, 0, 0);

			shipState1();
			asteroidState1();
			
			break;
	}
};

}};
