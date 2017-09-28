/**
 * index.js
 -All our useful JS goes here, awesome!
 */

console.log("JavaScript is amazing!");
function Random(n, m, tag = false) {
  if (tag) {
    if (Math.random() < 0.5) {
      return Math.random() * (m - n) + n;
    } else {
      return -(Math.random() * (m - n) + n);
    }
  } else {
    return Math.random() * (m - n) + n;
  }
}
function ranColor() {
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}
var RanR = 0,
  RanG = 0,
  RanB = 0;
var ballList = [];
var ballIndex = 0;
var ballNum = 0;
var Canvas = document.getElementById("test");
var canvas = Canvas.getContext("2d");
var running = false;
var sswitch;
var ballSwitch;
function balls(x, y, r, st = 0, de = Math.PI * 2) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.MaxRadius = Random(25, 50);
  this.color = ranColor();
  this.Snum = Random(0.5, 1.5);
  ballIndex++;
  ballNum++;
  ballList[ballIndex] = this;
  this.id = ballIndex;
  balls.prototype.draw = function() {
    if (this.radius < this.MaxRadius) {
      canvas.beginPath();
      canvas.arc(this.x, this.y, this.radius, st, de, true);
      canvas.fillStyle = this.color;
      canvas.fill();
    } else {
      delete ballList[this.id];
      ballNum--;
    }
    this.shrink(this.Snum);
  };
  balls.prototype.shrink = function(rat) {
    this.radius += rat;
  };
  balls.prototype.resetRadius = function() {
    this.radius = r;
  };
}
var Point = {
  x: 75,
  y: 75
};
var TPoint = {
  x: 0,
  y: 0
};
function CamparePoint(P1, P2, dis) {
  if (Math.abs(P1.x - P2.x) + Math.abs(P1.y - P2.y) > dis) {
    return true;
  } else {
    return false;
  }
}
function clear() {
  unNum = Random(0.1, 0.5);
  /*		function RandRGB(){
			if(RanR!=255&&RanG!=255&&RanB!=255){
				return (RanR++).toString+','+RanG.toString()+','+RanB.toString()
			}
			if(RanR==255&&RanG!=255&&RanB!=255){
				return RanR.toString+','+(RanG++).toString()+','+RanB.toString()
			}
			if(RanR==255&&RanG==255&&RanB!=255){
				return RanR.toString+','+RanG.toString()+','+(RanB++).toString()
			}
			if(RanR==255&&RanG==255&&RanB==255){
				RanR=0;
				RanG=0;
				RanB=0;
				return RanR.toString+','+RanG.toString()+','+RanB.toString()
			}
		}*/
  canvas.fillStyle = "rgba(255,255,255," + unNum.toString() + ")";
  canvas.fillRect(0, 0, Canvas.width, Canvas.height);
}
function init() {
  clear();
  if (ballNum <= 0) {
    console.log("kongkongkong");
    window.cancelAnimationFrame(ballSwitch);
  }
  for (var i in ballList) {
    ballList[i].draw();
  }
  ballSwitch = window.requestAnimationFrame(init);
  console.log("int the init " + ballSwitch);
}
Canvas.addEventListener("mousemove", function(e) {
  TPoint.x = e.clientX;
  TPoint.y = e.clientY;
  if (CamparePoint(TPoint, Point, Random(30, 50))) {
    if (running) {
      window.cancelAnimationFrame(ballSwitch);
    }
    for (var i = 0; i < Random(0, 7); i++) {
      new balls(
        Point.x + Random(10, 20, true),
        Point.y + Random(10, 20, true),
        0
      );
    }
    sswitch = window.requestAnimationFrame(init);
    console.log("in the eventlistener" + ballSwitch);
    Point.x = TPoint.x;
    Point.y = TPoint.y;
    running = true;
  }
  //	window.cancelAnimationFrame(ballSwitch)
});
Canvas.addEventListener("mouseout", function(e) {
  //			window.cancelAnimationFrame(sswitch)
  //		sswitch = window.requestAnimationFrame(init)
  console.log("mouseout" + ballSwitch);
  window.cancelAnimationFrame(ballSwitch);
  ballSwitch = window.requestAnimationFrame(init);
  running = false;
});
