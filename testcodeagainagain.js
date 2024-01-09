let numRipples = 20;   // Number of ripples
let ripples = [];      // Array to store ripple objects

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  // Display and update all ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];
    ripple.update();
    ripple.display();
    
    // Remove completed ripples
    if (!ripple.isExpanding()) {
      ripples.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < numRipples; i++) {
    // Generate random colors for each ripple
    let randomRed = random(255);
    let randomGreen = random(255);
    let randomBlue = random(255);
    let randomColor = color(randomRed, randomGreen, randomBlue);
    
    ripples.push(new Ripple(mouseX, mouseY, randomColor));
  }
}

class Ripple {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.diameter = 10;
    this.maxDiameter = 600; // Triple the maximum diameter
    this.expanding = true;
    this.rippleColor = c;
  }
  
  isExpanding() {
    return this.expanding;
  }
  
  update() {
    if (this.expanding) {
      this.diameter += 5;
      if (this.diameter >= this.maxDiameter) {
        this.expanding = false;
        this.diameter = 0;
      }
    }
  }
  
  display() {
    if (this.expanding) {
      noFill();
      stroke(this.rippleColor);
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }
}
