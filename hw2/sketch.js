var edgar; // this is our text
var thefont; // this is our font
var documentfrequency = {}; // this will hold the DF
var thechapter; // variable to hold one chapter
var currentchapter = 0; // what chapter are we on
var termfrequency = {}; // this will hold the current chapter's TF
var arr=['agony','ghastly','grotesque','hideous','quiver','abyss','afflicted','aghast','appalling','demonical','desolate'];
var arrfrequency=0;
var img;

function preload() {
  edgar = loadStrings('./data/edgar_cooked.txt');
  thefont = loadFont('./data/font.otf');
  img=loadImage('edgar.jpg');
}

function setup() {
  createCanvas(800, 600);
  doTF(edgar[currentchapter]); // do the term frequency for the current chapter
  
}


function draw() { 
  var counter=doTF(edgar[currentchapter]); // do the term frequency for the current chapter
  background(0);
  fill(255);
  stroke(255);
  //ellipse(100,100,counter,counter);
  noStroke();
  fill(255);
  text('BOOK ' + currentchapter + ": GHASTLY WORDS", 50, 50);
  image(img,random(0,100),(0,100),counter*2,counter*2);

}


// do the term frequency for the whole damn book:
function doTF(tf)
{
  termfrequency = {};
  var word = tf.split(' '); // individual words
  var count=0;
  
  for(var i = 0;i<tf.length;i++)
  {
    if(termfrequency.hasOwnProperty(word[i]))
    {
      // the word is already in the database:
      termfrequency[word[i]]++;
      arrfrequency++;
    }
    else
    {
      // the word is new:
      termfrequency[word[i]]=1;
      arrfrequency++;
    
    }
    for (var j = 0; j < arr.length; j++) {
        if (arr[j] == word[i]) {
            count++;
        }    }
}
  
    
   
  console.log(termfrequency);
  console.log(arrfrequency);
  console.log(word);
  console.log(count); 
  return count;
    }

function keyReleased()
{
  currentchapter = (currentchapter+1)%edgar.length;
  doTF(edgar[currentchapter]); // do the term frequency for the current chapter
}