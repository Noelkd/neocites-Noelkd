"use strict";

var color = { black : "#ffffff",
              red : "#ff0000",
              green : "#00ff00",
              blue : "#0000ff",
              yellow : "#ffff00",
              fuchsia : "#ff00ff",
              aqua : "#00ffff"
            }

var turtle = { x: 0,
               y: 0,
               angleInRadians: 0,
               penDown: false,
               penColor: "#000000",
               lineWidth: 2
            };

var canvas = document.getElementById('thecanvas');
if (canvas && canvas.getContext)  {     // does the browser support 'canvas'?
  turtle.ct = canvas.getContext("2d");   // get drawing context
  } 
else {
    alert('You need a browser which supports the HTML5 canvas!');
    }  

turtle.logPenStatus = function() {
    console.log('x=' + this.x + "; y=" + this.y + '; angle = ' + this.angle + '; penDown = ' + this.penDown);
}

turtle.forward = function(length) {
  // console.log('forward(' + length + ')');
  // this.logPenStatus();
   var x0 = this.x,
   y0 = this.y;
   this.x += length * Math.sin(this.angleInRadians);
   this.y += length * Math.cos(this.angleInRadians);
    if (this.ct) {
    if (this.penDown) {
      //this.logPenStatus();
    this.ct.beginPath(); 
    this.ct.lineWidth   = this.lineWidth;
    this.ct.strokeStyle = this.penColor;
    this.ct.moveTo(x0, y0);
    this.ct.lineTo(this.x, this.y);
    this.ct.stroke();
    }
  }
   else
    this.ct.moveTo(this.x, this.y);
   return this;
  }    

 turtle.backward = function(length) {
        this.forward(-length);
        return this;
 }

 turtle.left = function(angleInDegrees) {
        // console.log('left(' + angleInDegrees + ')');
        // A complete circle, 360º, is equivalent to 2π radians  
        // angleInDegrees is an angle measure in degrees
  this.angleInRadians += angleInDegrees * Math.PI / 180.0;
  return this;
  }

 turtle.right = function(angleInDegrees) {
        this.left(-angleInDegrees);
        return this;
    }

 turtle.angle = function() {
     // the turtle status is hold in this.angleInRadians;
     // degrees are often more convenient for the display
     return this.angleInRadians * 180.0 / Math.PI; 
 }

turtle.dragoncurve = function (iterations) {
    """ Draws a dragoncurve """
    clearCanvas();
    this.angleInRadians = 0
    this.x = 500;
    this.y = 400;
    this.penDown = true;
    var distance = 15;
    var angle = 90;
    var rules = { "X":",X,+,Y,F,", "Y":",F,X,-,Y,"}
    var world = createword(iterations, "F,X", rules);
    var finalworld = world.split(",");
    draw_lsystem(finalworld, distance, angle)
    
}


turtle.sierpinski = function(iterations){
  """ Draws a sierpinski triangle """
    clearCanvas();
    if (iterations % 2 == 0){
      this.angleInRadians = 0
      this.left(90)
    }
    else{
      this.angleInRadians = 0
      this.left(150)
    }
    this.x = 50;
    this.y = 800;
    this.penDown = true;
    var distance = 100/(iterations*3) 
    var angle = 60;
    var rules = { "F":",G,-,F,-,G,", "G":",F,+,G,+,F,"};
    var world = createword(iterations, "F,", rules);
    var finalworld = world.split(",");
    draw_lsystem(finalworld, distance, angle)
}


function rewrite(word, rules) {
    """ Rerite takes in a word, and a dict of rules
        The word must have a comma between each letter:
        eg 'F,-,G','A,+,B'
        The dict  of rules replaces any letter in the dict
        with the dict value for that key.
        Otherwise the character is returned to the array
        with a comma appended for the next time
    """

    var wordList = word.split(",")
    for (var i = 0; i <= wordList.length-1; i++) { 
        var curChar = wordList[i]
        if (rules[curChar]) {
            wordList[i] = rules[curChar]
        }
        else {
          if (curChar.length > 0){
            wordList[i] = curChar+=","
             }
    }
  }
    return wordList.join("")
}

function createword(iterations, word, rules) {
  """ Create word runs rewrite for as many iterations
      as you want then returns the result
  """

    for (var i = 1; i<= iterations; i++) {
        word = rewrite(word, rules)
    }
    return word
}

function draw_lsystem(word, distance, angle){
  """ Draw lsystem takes a word  splits it and based
      on the character does something 
  """
  for(var i = 0; i<= word.length; i++) {

        var curChar = word[i]
        if (curChar == "F"){
            turtle.forward(distance)
        }
        if (curChar == "G"){
            turtle.forward(distance)
        }
        if (curChar == "+"){
            turtle.left(angle)
        }
        if (curChar == "-"){
            turtle.right(angle)
        }
    }
}

function clearCanvas () {
    """ Clears the canvas """
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function main (iters){

    if (iters >= 10 ){
      
      setTimeout(function(){main1(1)},600)
    }
    else{
    turtle.sierpinski(iters)
    setTimeout(function(){main(iters+1)},600);
    }
  }

function main1 (iters){
if (iters >= 14){
      setTimeout(function(){main(0)},600)
    }
    else{
    turtle.dragoncurve(iters)
    setTimeout(function(){main1(iters+1)},600);
    }
  }




main(0);