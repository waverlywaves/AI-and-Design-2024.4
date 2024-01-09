let numRipples = 20;   // Number of ripples
let ripples = [];      // Array to store ripple objects
let seaCreatures = ['🐙', '🦀', '🐠', '🐟', '🐡', '🦈', '🐬', '🐳', '🐋', '🦐', '🦑']; // Array of sea creature emojis
let emojis = [];       // Array to store emojis and their positions

function setup() {
  createCanvas(800, 800);
  textSize(32); // Set text size for emojis
  textAlign(CENTER, CENTER); // Align text for proper placement
}

function draw() {
  background(0);
  
  // Display all ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];
    ripple.update();
    ripple.display();
    
    // Remove completed ripples
    if (!ripple.isExpanding()) {
      ripples.splice(i, 1);
    }
  }

  // Update and display stored emojis and the word 'drip'
  for (let emoji of emojis) {
    // Update position
    emoji.x += emoji.vx;
    emoji.y += emoji.vy;

    // Collision with edges
    if (emoji.x > width || emoji.x < 0) {
      emoji.vx *= -1;
    }
    if (emoji.y > height || emoji.y < 0) {
      emoji.vy *= -1;
    }

    // Display emoji
    text(emoji.symbol, emoji.x, emoji.y);

    // Display 'drip' text near the emoji
    textSize(16); // Smaller text size for 'drip'
    text('drip', emoji.x, emoji.y + 35); // Position 'drip' below the emoji
    textSize(32); // Reset text size for next emoji
  }
}

function mousePressed() {
  // Clear existing emojis
  emojis = [];

  // Generate new ripples
  for (let i = 0; i < numRipples; i++) {
    let randomRed = random(255);
    let randomGreen = random(255);
    let randomBlue = random(255);
    let randomColor = color(randomRed, randomGreen, randomBlue);
    
    ripples.push(new Ripple(mouseX, mouseY, randomColor));
  }

  // Add random sea creature emojis at random positions with random velocities
  for (let i = 0; i < 100; i++) {
    let randomEmoji = random(seaCreatures);
    let emojiX = random(width);
    let emojiY = random(height);
    let emojiVx = random(-2, 2); // Random horizontal velocity
    let emojiVy = random(-2, 2); // Random vertical velocity
    emojis.push({ symbol: randomEmoji, x: emojiX, y: emojiY, vx: emojiVx, vy: emojiVy });
  }
}

class Ripple {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.diameter = 10;
    this.maxDiameter = 600;
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
