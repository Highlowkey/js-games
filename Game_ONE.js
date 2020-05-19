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
	this.img = loadImage("ship.jpg");
};

shipObj.prototype.draw = function()
{
	imageMode(CENTER);
	image(this.img, this.x, this.y);
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

  addAsteroid();
  asteroids.forEach(drawAsteroids);
  asteroids.forEach(asteroidUpdate);
};

}};
