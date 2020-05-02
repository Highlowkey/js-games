// created by Patrick McElroy 2020
var sketchProc=function(processingInstance){ with (processingInstance){

  // create environment variables
  var screenHeight = 400;
  var screenWidth = 400;
  var cookieX = 400;
  var cookieY = 400;
  var cookieHeight = 300;
  var cookieWidth = 300;
  var numCookies = 0;
  var setup=function() {
    size(screenHeight, screenWidth);
  }

  var mouseClicked=function() {
    println(dist(mouseX, mouseY, cookieX, cookieY));
    if (dist(mouseX, mouseY, cookieX, cookieY) < cookieWidth/2) {
      numCookies++;
    }
  }

  var draw=function() {
    background(225, 225, 225);
    fill(0, 0, 0);
    textSize(32);
    text("Cookie Clicker", 30, 40, 100);
    textSize(15);
    text("Number of Cookies: " + numCookies.toString(), 250, 40, 1090);
    fill(255, 200, 0);
    noStroke();
    ellipse(cookieX, cookieY, cookieWidth, cookieHeight);
  }
}};
