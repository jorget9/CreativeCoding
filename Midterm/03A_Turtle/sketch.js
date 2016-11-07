// TURTLE GRAPHICS
// https://en.wikipedia.org/wiki/Turtle_graphics
// 
// this p5 sketch does a simple implementation of Seymour Papert's
// 'turtle graphics' package for LOGO.  using key commands, you can
// drive a turtle as it draws on the screen.
// 
// your tasks:
// (1) make the drawing system that the turtle drives around
// more interesting.  you can change the way lines work; you
// can have it plop down images instead of shapes; you can 
// have it set vertex points for shapes.
// (2) expand the turtle's vocabulary so it understands more 
// symbols than +, -, and F.  for example, a standard turtle
// typically will use lowercase 'f' for a move that *doesn't*
// draw (e.g. to leave a space).  it will also allow for branching
// symbols such as '[' and ']' so that the turtle can go on an
// expedition and 'teleport' back when a branch closes.  a simple
// thought would be to have the 'C' key change the turtle's drawing
// color.
// (3) find a way to make the turtle draw *automatically*, using
// the same system.  see the next sketch for an example of how that
// might be done.  :)

// TURTLE STUFF:
var x, y; // the current position of the turtle
var currentangle = 0; // which way the turtle is pointing
var step = 20; // how much the turtle moves with each 'F'
var angle = 90; // how much the turtle turns with a '-' or '+'

// LINDENMAYER STUFF (L-SYSTEMS)
var thestring = 'XYXYXYX+XYXYXYX+XYXYXYX+XYXYXYX'; // "axiom" or start of the string
var numloops = 3; // how many iterations of the L-system to pre-compute
var therules = []; // array for rules
therules[0] = ['F', '']; // first rule
therules[1] = ['X', 'FX+FX+FXFY-FY-']; // second rule
therules[2] = ['Y', '+FX+FXFY-FY-FY']; // second rule
var whereinstring = 0; // where in the L-system are we drawing right now?


function preload(){
  turtle=loadImage("turtle.png");
}
function setup()
{
  createCanvas(2000, 2000);
  background(255);
  stroke(0, 0, 0, 255);
  
  // start our turtle in the middle of the screen
  x = width/2;
  y = height/2;
  for(var i = 0;i<numloops;i++) {
    thestring = lindenmayer(thestring); // do the stuff to make the string
 
}
}
function draw()
{
  
  // give me some random color values:
  var r = random(128, 255);
  var g = random(0, 192);
  var b = random(0, 50);
  var a = random(50, 100);

  // pick a gaussian (D&D) distribution for the radius:
  var radius = 0;
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius = radius/3;
  
  // draw the stuff:
  //fill(r, g, b, a); // interior fill color
  image(turtle, x, y, radius, radius); // circle that chases the mouse
  // draw the current character in the string:
  drawIt(thestring.charAt(whereinstring)); 
  
  // increment the point for where we're reading the string.
  // wrap around at the end.
  whereinstring++;
  if(whereinstring>thestring.length-1) whereinstring = 0;


}
function lindenmayer(s)
{
  var outputstring = ''; // start a blank output string
  
  // go through the string, doing rewriting as we go
  
  // iterate through 'therules' looking for symbol matches:
  for(var i=0;i<s.length;i++) // every symbol in 's'
  {
    var ismatch = 0; // by default, no match
    for(var j = 0;j<therules.length;j++) // every rule in 'therules'
    {
      if(s.charAt(i)==therules[j][0]) // MATCH!
      {
        outputstring+=therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches in 'therules' array, just copy the symbol over.
    if(ismatch===0) outputstring+= s.charAt(i); 
  }
  
  return(outputstring); // send out the modified string
}
function drawIt(k)
{
  if(k=='F') // draw forward
  {
    // polar to cartesian transformation based on step and currentangle:
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
    line(x, y, x1, y1); // connect the old and the new
    // update the turtle's position:
    x = x1;
    y = y1;
  }
  else if(k=='+')
  {
   currentangle+=angle; // turn left
  }
  else if(k=='-')
  {
   currentangle-=angle; // turn right   
  }
   
  // DRAW EVERYTHING:

  // give me some random color values:
  var r = random(128, 255);
  var g = random(0, 192);
  var b = random(0, 50);
  var a = random(50, 100);

  // pick a gaussian (D&D) distribution for the radius:
  var radius = 0;
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius = radius/3;

}


function keyTyped()
{
  console.log(key); // what key did we type?
  
  if(key=='f') // draw forward
  {
    // polar to cartesian transformation based on step and currentangle:
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
    line(x, y, x1, y1); // connect the old and the new
    // update the turtle's position:
    x = x1;
    y = y1;
  }
  else if(key=='c'){
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
    // update the turtle's position:
    x = x1;
    y = y1;
  }
  else if(key=='+')
  {
   currentangle+=angle; // turn left
  }
  else if(key=='-')
  {
   currentangle-=angle; // turn right   
  }
  else if(key=='t'){
    tint(random(255),random(255),random(255),random(255));
    
  }
  
}
