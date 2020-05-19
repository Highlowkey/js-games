var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(60);
/*-------------------------------------------------------------------------------------------GAME STATES
0 = START
1 = LEVEL ONE
*/

var $ = 1;

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
  this.angle = 0;
	this.img = loadImage("ship.jpg");
};

shipObj.prototype.draw = function()
{
  pushMatrix();
  translate(this.x, this.y);
  rotate(this.angle);
  imageMode(CENTER);
	image(this.img, 0, 0);
  popMatrix();
};

shipObj.prototype.move = function()
{
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

var ship = new shipObj(200, 200, 2);
fill(0, 0, 0);
//-------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------ASTEROID OBJECTS
var asteroidObj = function(x, y, xSpeed, ySpeed, rad) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.rad = rad;
};

var asteroids = [];

var drawAsteroids = function(asteroid) {
  fill(255, 255, 255);
  ellipse(asteroid.x, asteroid.y, asteroid.rad, asteroid.rad);
};

var asteroidUpdate = function(asteroid) {
  asteroid.x += asteroid.xSpeed;
  asteroid.y += asteroid.ySpeed;
};

var addAsteroid = function() {
  if (frameCount%120 == 0) {
    asteroids.push(new asteroidObj(random(100,300), -50, random(-2, 2), random(-2, 2), random(20, 60)));
  }
};

//-------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------KEY CHECKS
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
//-------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------DRAW FUNCTION
var draw = function()
{
	switch($)
	{
		case 0:

			break;

		case 1:
			background(0, 0, 0);

			ship.draw();
			ship.move();

		  	addAsteroid();
		  	asteroids.forEach(drawAsteroids);
		  	asteroids.forEach(asteroidUpdate);
			
			break;
	}
};

}};
