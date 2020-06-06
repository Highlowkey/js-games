var sketchProc=function(processingInstance){ with (processingInstance){
frameRate(60);
size(800, 500);

//----------------------------------------------------------------------------------------------------------------------------IMAGE LOADING
var backgroundImg = loadImage('Game_ONE_background.png');

var titleImg = loadImage('Game_ONE_title.png');
var startBTImg = loadImage('Game_ONE_start.png');

var shipImg = loadImage('Game_ONE_ship.png');
var rockets1Img = loadImage('Game_ONE_rockets1.png');
var rockets2Img = loadImage('Game_ONE_rockets2.png');
var rockets3Img = loadImage('Game_ONE_rockets3.png');
var rocketsBoost1Img = loadImage('Game_ONE_rocketsBoost1.png');
var rocketsBoost2Img = loadImage('Game_ONE_rocketsBoost2.png');
var rocketsBoost3Img = loadImage('Game_ONE_rocketsBoost3.png');

var asteroid31Img = loadImage('Game_ONE_asteroid31x31.png');
var asteroid41Img = loadImage('Game_ONE_asteroid41x41.png');
var asteroid51Img = loadImage('Game_ONE_asteroid51x51.png');
var asteroid71Img = loadImage('Game_ONE_asteroid71x71.png');



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
var rPress = false;
var xPress = false;
var fired = false;

var mouseLeftPress = false;
var mouseRightPress = true;

var topBound = 0;
var bottomBound = 500;
var leftBound = 0;
var rightBound = 800;

var numAsteroids = 0;

var totalWidth = rightBound * 2;
var totalHeight = bottomBound * 2;

var spawnLocation = 0; //used for asteroid spawning quadrant (0 - up, 1 - left, 2 - down, 3 - right)

var framesUntilFirstSpawn = 60;
var spawnAcceleration = 0;

var score = 0;
//-------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------------BUTTON OBJECTS
var buttonObj = function(x, y, w, h)  {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.click = false;
};

var startBT = new buttonObj (rightBound/2, bottomBound/2, 100, 50);



//-------------------------------------------------------------------------------------------BUTTON FUNCTIONS
buttonObj.prototype.draw = function() {
	fill(255, 0, 0);
	rectMode(CENTER);
	rect(this.x, this.y, this.w, this.h);
};

buttonObj.prototype.press = function() {
	if (mouseLeftPress === true && mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY < this.y + this.h/2 && mouseY > this.y -this.h/2) {
		this.click = true;
	}
};

//-------------------------------------------------------------------------------------------LASER FUNCTIONS
var lasers = [];

var laserObj = function(x, y, speed, angle) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.angle = angle;
};

var drawLaser = function(laser) {
	fill(255, 0, 0);
	ellipse(laser.x, laser.y, 10, 10);
};

var updateLaser = function(laser) {
	laser.y += laser.speed * sin(laser.angle-3.14/2);
	laser.x += laser.speed * cos(laser.angle-3.14/2);
};

var checkLaserCollisions = function(laser) {
	for (var i = 0; i < numAsteroids; i++) {
		if (dist(laser.x, laser.y, asteroids[i].x, asteroids[i].y) < (asteroids[i].rad + 10)/2) {
			lasers.splice(lasers.indexOf(laser), 1);
			asteroids.splice(asteroids.indexOf(asteroids[i]), 1);
			numAsteroids--;
		}
	}
};

//----------------------------------------------------------------------------------------------------------------------------SHIP OBJECTS
var shipObj = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
 	this.angle = 0;
	this.img = shipImg;
	this.health = 100;
	this.fuel = 100;
};

var ship = new shipObj(totalWidth/2, totalHeight/2, 2);

//-------------------------------------------------------------------------------------------SHIP FUNCTIONS
shipObj.prototype.draw = function() {
	pushMatrix();
	translate(ship.x, ship.y);
	rotate(this.angle);
	imageMode(CENTER);
	image(this.img, 0, 0);
	// ellipse(0, -10, 12, 12);
	// ellipse(0, 6, 20, 20);
	// ellipses used for collision detection

	if (wPress === true && (xPress === !true || ship.fuel <= 1) && (frameCount%12 === 0 || frameCount%12 === 1 || frameCount%12 === 2 || frameCount%12 === 3 )) {
	image(rockets1Img, 0, 22);
	}
	if (wPress === true && (xPress === !true || ship.fuel <= 1) && (frameCount%12 === 4 || frameCount%12 === 5 || frameCount%12 === 6 || frameCount%12 === 7 )) {
	image(rockets2Img, 0, 22);
	}
	if (wPress === true && (xPress === !true || ship.fuel <= 1) && (frameCount%12 === 8 || frameCount%12 === 9 || frameCount%12 === 10 || frameCount%12 === 11 )) {
	image(rockets3Img, 0, 22);
	}

	if (ship.fuel > 1 && wPress === true  && xPress === true && (frameCount%12 === 0 || frameCount%12 === 1 || frameCount%12 === 2 || frameCount%12 === 3 )) {
	image(rocketsBoost1Img, 0, 22);
	}
	if (ship.fuel > 1 && wPress === true  && xPress === true && (frameCount%12 === 4 || frameCount%12 === 5 || frameCount%12 === 6 || frameCount%12 === 7 )) {
	image(rocketsBoost2Img, 0, 22);
	}
	if (ship.fuel > 1 && wPress === true  && xPress === true && (frameCount%12 === 8 || frameCount%12 === 9 || frameCount%12 === 10 || frameCount%12 === 11 )) {
	image(rocketsBoost3Img, 0, 22);
	}

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
		this.angle -= .05;
	}

	if (dPress === true) {
    this.angle += .05;
	}

	if (rPress === true) {
		if (fired === false) {
			lasers.push(new laserObj(this.x, this.y, this.speed + 2, this.angle));
		}
		fired = true;
	}
	if (xPress === true) {
		if (this.fuel > 0) {
			this.speed = 5;
			this.fuel -= .5;
		}
		else {
			this.speed = 2;
		}
	}
	if (frameCount % 10 === 0 && this.fuel < 100) {
		this.fuel += .5;
	}
};

//----------------------------------------------------------------------------------------------------------------------------ASTEROID OBJECTS
var asteroidObj = function(x, y, xSpeed, ySpeed, size, isLoot) {
	this.x = x;
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.size = size;
	this.isLoot = isLoot;
	this.numHits = 0;

	switch(size) {
		case 1:
			this.rad = 31;
			this.img = asteroid31Img;
			break;
		case 2:
			this.rad = 41;
			this.img = asteroid41Img;
			break;
		case 3:
			this.rad = 51;
			this.img = asteroid51Img;
			break;
		case 4:
			this.rad = 71;
			this.img = asteroid71Img;
			break;
		default:
			println("shouldn't be here")
			break;
	}

	if (isLoot) {
		this.rad = 11;
		this.img = loadImage("loot_asteroid.png");
	}
	this.mass = 3.14 * pow(this.rad/2, 3);
};

var asteroids = [];


//-------------------------------------------------------------------------------------------ASTEROID FUNCTIONS
var drawAsteroid = function(asteroid) {
	fill(255, 255, 255);
	if (asteroid.isLoot) {
		fill(255, 255, 0);
	}
	imageMode(CENTER);
	image(asteroid.img, asteroid.x, asteroid.y);
};

var asteroidUpdate = function(asteroid) {
	asteroid.x += asteroid.xSpeed;
	asteroid.y += asteroid.ySpeed;
};

var countAsteroid = function()
{
	println(asteroids.length);
};

var addAsteroid = function() {
	var willBeLoot = false;
	var zeroOne = round(random(0,4));
	if (zeroOne == 0) {
		willBeLoot = true;
	}
	var size = round(random(1, 4));
	var fastSpeed = random(0, 3/size);
	var slowSpeed = random(-.5, .5);
	switch(spawnLocation) {
		case 0: //top of screen
			asteroids.push(new asteroidObj(random(ship.x - rightBound/2, ship.x + rightBound/2), ship.y - bottomBound/2 - 71, slowSpeed, fastSpeed, size, willBeLoot));
			break;
		case 1: //left of screen
			asteroids.push(new asteroidObj(ship.x - rightBound/2 - 71, random(ship.y - bottomBound/2, ship.y + bottomBound/2), fastSpeed, slowSpeed, size, willBeLoot));
			break;
		case 2: //bottom of screen
			asteroids.push(new asteroidObj(random(ship.x - rightBound/2, ship.x + rightBound/2), ship.y + bottomBound/2 + 71, slowSpeed, -fastSpeed, size, willBeLoot));
			break; //right of screen
		case 3:
			asteroids.push(new asteroidObj(ship.x + rightBound/2 + 71, random(ship.y - bottomBound/2, ship.y + bottomBound/2), -fastSpeed, slowSpeed, size, willBeLoot));
			spawnLocation = 0;
			break;
	}
	numAsteroids++;
	spawnLocation++;
};

var checkToRemoveAsteroid = function(asteroid) {
	if (asteroid.x > ship.x + rightBound || asteroid.x < ship.x - rightBound || asteroid.y > ship.y + bottomBound || asteroid.y < ship.y - bottomBound) {
		asteroids.splice(asteroids.indexOf(asteroid), 1);
		numAsteroids -= 1;
	}
};

var checkAllCollisions = function() {
	for(var i = 0; i < numAsteroids; i++) {
		for(var j = 0; j < numAsteroids; j++) {
			if (j != i) {
				checkAsteroidCollision(asteroids[i], asteroids[j]);
			}
		}
		noCollisions = true;
		checkShipCollision(asteroids[i]);
	}
};

var checkShipCollision = function(asteroid) {
	if ((dist(asteroid.x, asteroid.y, ship.x, ship.y - 10) < (asteroid.rad + 12)/2) ||
			 (dist(asteroid.x, asteroid.y, ship.x, ship.y + 6) < (asteroid.rad + 20)/2)) {
		if (!asteroid.isLoot) {
			ship.health -= asteroid.rad;
			asteroids.splice(asteroids.indexOf(asteroid), 1);
			numAsteroids--;
			if (ship.health < 0) {
				$ = 2;
			}
		}
		else {
			score +=1 ;
			asteroids.splice(asteroids.indexOf(asteroid), 1);
			numAsteroids--;
		}
	}
};

var checkAsteroidCollision = function(asteroid1, asteroid2) {
	if (dist(asteroid1.x, asteroid1.y, asteroid2.x, asteroid2.y) < (asteroid1.rad + asteroid2.rad)/2) {
		var tempX = asteroid2.xSpeed * (asteroid2.mass - asteroid1.mass)/(asteroid1.mass + asteroid2.mass) + asteroid1.xSpeed * (2 * asteroid1.mass)/(asteroid1.mass + asteroid2.mass);
		var tempY = asteroid2.ySpeed * (asteroid2.mass - asteroid1.mass)/(asteroid1.mass + asteroid2.mass) + asteroid1.ySpeed * (2 * asteroid1.mass)/(asteroid1.mass + asteroid2.mass);
		asteroid1.xSpeed = asteroid1.xSpeed * (asteroid1.mass - asteroid2.mass)/(asteroid1.mass + asteroid2.mass) + asteroid2.xSpeed * (2 * asteroid2.mass)/(asteroid1.mass + asteroid2.mass);
		asteroid1.ySpeed = asteroid1.ySpeed * (asteroid1.mass - asteroid2.mass)/(asteroid1.mass + asteroid2.mass) + asteroid2.ySpeed * (2 * asteroid2.mass)/(asteroid1.mass + asteroid2.mass);
		asteroid2.xSpeed = tempX;
		asteroid2.ySpeed = tempY;
		asteroidUpdate(asteroid1);
		asteroidUpdate(asteroid2);
	}
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

	if (key.toString() === "r") {
		rPress = true;
	}

	if (key.toString() === "x") {
		xPress = true;
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

	if (key.toString() === "r") {
		rPress = false;
		fired = false;
	}
	if (key.toString() === "x") {
		xPress = false;
		ship.speed = 2;
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

var laserState1 = function() {
	lasers.forEach(drawLaser);
	lasers.forEach(updateLaser);
	lasers.forEach(checkLaserCollisions);
}

var asteroidState1 = function()
{
	if (frameCount%round(framesUntilFirstSpawn) == 0) {
		addAsteroid();
		if(framesUntilFirstSpawn > 30) {
			framesUntilFirstSpawn -= spawnAcceleration;
			spawnAcceleration += .01;
		}
	}

	checkAllCollisions();

	asteroids.forEach(drawAsteroid);
	asteroids.forEach(asteroidUpdate);
	asteroids.forEach(checkToRemoveAsteroid);

	// countAsteroid();
};

var UIState1 = function() {
	fill(255, 0, 0);
	textSize(20);
	text("Score: " + score, 4, 20);
	rectMode(CORNER);
	rect(30, bottomBound - 30, ship.health, 20);
	fill(0, 0, 0);
	stroke(255, 255, 255);
	strokeWeight(4);
	rect(160, bottomBound - 30, 104, 20);
	fill(0, 180, 255);
	noStroke();
	rect(162, bottomBound - 28, ship.fuel, 16);
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

			UIState1();
			pushMatrix();
			translate(400-ship.x, 250-ship.y);
			asteroidState1();
			laserState1();
			shipState1();
			popMatrix();

			break;
		case 2:
			background(255, 255, 255);
	}
};

}};
