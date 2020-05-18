var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(60);

//---DRAW FUNCTION---
var draw=function() {

  //---ASTEROID SPAWNING---
  var asteroid_x = random(1,400);
  var asteroid_y = random(1,400);
  var asteroid_rad = random(10,20);
  ellipse(asteroid_x, asteroid_y, asteroid_rad, asteroid_rad);
  //-----------------------

}
//-------------------

}};
