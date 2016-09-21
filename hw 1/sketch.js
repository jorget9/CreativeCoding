

function setup() {
  createCanvas(800, 600);
  background(0,10);
}

function draw() {
    val1=random(256);
    val2=random(256);
    val3=random(256);
    val4=random(256);
    val5=random(256);
    val6=random(256);
    var size = (mouseX, mouseY);
    strokeWeight(size);
    stroke(val1, val2, val3);
    triangle(mouseX,mouseY, pmouseX,pmouseY,mouseX,mouseY);
    strokeWeight(100);
    stroke(val4, val5, val6);
    triangle(mouseX,mouseY,mouseX,mouseY,pmouseX,pmouseY);
    
    

}



function keyPressed()
{
  randomBackground1=random(256);
  randomBackground2=random(256)
  randomBackground3=random(256)

  background(randomBackground1,randomBackground2,randomBackground3);

}