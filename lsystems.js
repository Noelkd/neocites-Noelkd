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

function rewrite(word, rules) {
    
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

    for (var i = 1; i<= iterations; i++) {
        word = rewrite(word, rules)
    }
    return word
}


turtle.lset = function (iterations) {
    clearCanvas();
    
    //var iterations = document.getElementById('iters').value;
    if (iterations < 1){
      iterations = 0
    }
    else{
      turtle.right(90)
    }
    turtle.x = 500;
    turtle.y = 400;
    turtle.penDown = true;
    var distance = 15;
    var angle = 90;
    var rules = { "X":",X,+,Y,F,", "Y":",F,X,-,Y,"}
    var world = createword(iterations, "F,X", rules);
    var finalworld = world.split(",");

    for(var i = 0; i<= finalworld.length; i++) {

        var curChar = finalworld[i]
        if (curChar == "F"){
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

function main (iters){

    if (iters >= 15){
      turtle.lset(0)
      setTimeout(function(){main(1)},600)
    }
    else{
    turtle.lset(iters)
    setTimeout(function(){main(iters+1)},600);
    }
  }    

var clearCanvas = function() {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

main(0);