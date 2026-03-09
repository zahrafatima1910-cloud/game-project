// Global variables
var isLeft = false;
var isRight = false;
var isPlummeting = false;
var isFalling = false;
var isJumping = false;
var isPaused = false;

var Canyon;
var collectable;
var jumpingVelocity;
var trees_x;
var clouds;
var mountains;
var character;
var gravity = 2;
var cameraPosx = 0;
var groundLevel = 800;
var gameWorldWidth = 5000;
var game_score;
var flagpole;
var lives;
var jumpSound;
var platforms;
var isContact = false;
var spin;
var coinY;
var enemies;
var legMove;
var coinSound;
var cameraSpeed = 0;
let scrollSpeed = 2;
var gameStarted = false;
// preload function for sounds
function preload() {
  soundFormats("mp3", "wav");
  coinSound = loadSound("assets/coin.wav");
  jumpSound = loadSound("assets/jump.wav");
  jumpSound.setVolume(0.4);
}
// setup function
function setup() {
  createCanvas(1024, 576);
  groundLevel = (height * 3) / 4;
  initialiseGameObjects();
  game_score = 0;
  flagpole = { isReached: false, x_pos: gameWorldWidth - 200 };
  lives = 3;
  startGame();
  
}
// arrays for objects
function initialiseGameObjects() {
  trees_x = [
    440, 800, 1200, 1600, 2000, 2400, 2800, 3200, 3600, 4000, 4400, 5000,
  ];

  clouds = [
    { x: 150, y: 80 },
    { x: 200, y: 100 },
    { x: 600, y: 120 },
    { x: 650, y: 140 },
    { x: 1100, y: 100 },
    { x: 1200, y: 120 },
    { x: 1600, y: 90 },
    { x: 2200, y: 110 },
    { x: 2800, y: 90 },
    { x: 3400, y: 85 },
    { x: 4000, y: 105 },
    { x: 4600, y: 100 },
    { x: 4800, y: 85 },
    { x: 150, y: 80 },
    { x: 200, y: 100 },
  ];
  mountains = [
    { x: 0, y: groundLevel },
    { x: 500, y: groundLevel },
    { x: 1000, y: groundLevel },
    { x: 1500, y: groundLevel },
    { x: 2000, y: groundLevel },
    { x: 3000, y: groundLevel },
    { x: 4000, y: groundLevel },
    { x: 5000, y: groundLevel },
  ];
  character = {
    x: 250, 
    y: groundLevel,
    jumpingVelocity: 0,
  };
  collectable = [
    { x: 450, y: groundLevel, size: 50, isFound: false },
    { x: 800, y: groundLevel, size: 50, isFound: false },
    { x: 950, y: groundLevel, size: 50, isFound: false },
    { x: 1300, y: groundLevel, size: 50, isFound: false },
    { x: 1600, y: groundLevel, size: 50, isFound: false },
    { x: 2000, y: groundLevel, size: 50, isFound: false },
    { x: 2300, y: groundLevel, size: 50, isFound: false },
    { x: 2500, y: groundLevel, size: 50, isFound: false },
    { x: 3000, y: groundLevel, size: 50, isFound: false },
    { x: 3500, y: groundLevel, size: 50, isFound: false },
    { x: 4000, y: groundLevel, size: 50, isFound: false },
  ];
  Canyon = [
    { x: 500, width: 120, hidden: true },
    { x: 750, width: 120 },
    { x: 1500, width: 120, hidden: true },
    { x: 2150, width: 120 },
    { x: 2500, width: 120, hidden: true },
    { x: 2900, width: 120, hidden: true },
    { x: 3650, width: 120 },
    { x: 4350, width: 120, hidden: true },
    { x: 4600, width: 120 },
  ];
  platforms = [];
  platforms.push(createPlatforms(400, groundLevel - 100, 100));
  platforms.push(createPlatforms(900, groundLevel - 100, 120));
  platforms.push(createPlatforms(1600, groundLevel - 100, 120));
  platforms.push(createPlatforms(2300, groundLevel - 100, 120));
  platforms.push(createPlatforms(3100, groundLevel - 100, 120));
  platforms.push(createPlatforms(3800, groundLevel - 100, 120));

  enemies = [];
  enemies.push(new Enemy(500, groundLevel - 10, 100));
  enemies.push(new Enemy(1000, groundLevel - 10, 100));
  enemies.push(new Enemy(1500, groundLevel - 10, 100));
  enemies.push(new Enemy(2500, groundLevel - 10, 100));
  enemies.push(new Enemy(3500, groundLevel - 10, 100));
}
// draw function for objects
function draw()
{
  // background
  background(135, 206, 235);
  if(!gameStarted)
    {
        textSize(40);
        fill(255);
        textAlign(CENTER);
        text("Press SPACE to Start", width/2, height/2);
        return;
    }

  // game logic
  if (lives > 0 && !flagpole.isReached)
  {
    updateCharacter();
    checkPlayerDie();
    updateCamera();
  }

  // camera rolling
    push();
  translate(-cameraPosx, 0);

  // Ground 
  noStroke();
  fill(0, 155, 0);
  rect(0, groundLevel, gameWorldWidth, height - groundLevel);

  // Clouds 
  for (let c of clouds)
  {
    recurseClouds(c.x, c.y, 100);
    c.x += 0.3;
      if (c.x > gameWorldWidth) {
    c.x = -200;
  }
  }
  

  //  Mountains 
  drawMountains();

  //  Trees 
  drawTrees();

  //  Canyons 
  for (let i = 0; i < Canyon.length; i++)
  {
    if (Canyon[i].hidden)
    {
      let d = abs(character.x - Canyon[i].x);
      if (d < 200)
      {
        drawCanyon(Canyon[i]);
      }
    }
    else
    {
      drawCanyon(Canyon[i]);
    }
  }

  // Platforms 
  for (let p of platforms)
  {
    p.draw();
  }

  // Collectables 
  for (let i = 0; i < collectable.length; i++)
  {
    drawCollectable(collectable[i]);
    checkCollectable(collectable[i]);
  }

  //  Enemies 
  for (let e of enemies)
  {
    e.draw();

    let isContact = e.checkContact(character.x, character.y);

    if (isContact && lives > 0)
    {
      lives--;
      startGame();
      break;
    }
  }

  // Character 
   drawCharacter();

  //Flagpole
  renderFlagpole();

  pop();


  // Score
  fill(255);
  noStroke();
  textSize(40);
  textAlign(LEFT);
  text("Score: " + game_score, 20, 50);

  // Lives
  for (let i = 0; i < lives; i++)
  {
    drawHeart(40 + i * 50, 60, 30);
  }

  // flag not reached
  if (!flagpole.isReached)
  {
    checkFlagpole();
  }

  // Level complete
  if (flagpole.isReached)
  {
    fill(0);
    textSize(40);
    textAlign(CENTER);
    text("Level 1 Complete", width / 2, height / 2);
    return;
  }

  // Game over
  if (lives < 1)
  {
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Game Over... Press R to Restart", width / 2, height / 2);
    return;
  }
}
// clouds drawing
function recurseClouds(x, y, scale) {
  if (scale < 5) {
    return;
  }

 fill(255,255,255);
  noStroke();
  ellipse(x, y, scale, scale * 0.6);
  recurseClouds(x + scale / 2, y, scale * 0.6);
  recurseClouds(x - scale / 2, y, scale * 0.6);
}
// mountain drawing
function drawMountains() {
  for (let m of mountains) {
    // large mountains
    let bigBase = 350;
    let bigHeight = 320;
    fill(90);
    triangle(m.x, m.y, m.x + bigBase / 2, m.y - bigHeight, m.x + bigBase, m.y);

    // Snow cap (large)
    fill(255);
    triangle(
      m.x + bigBase / 2 - 30,
      m.y - bigHeight + 60,
      m.x + bigBase / 2,
      m.y - bigHeight,
      m.x + bigBase / 2 + 30,
      m.y - bigHeight + 60,
    );

    //small mountain
    let smallBase = 200;
    let smallHeight = 200;
    fill(120);
    triangle(
      m.x + 180,
      m.y,
      m.x + 180 + smallBase / 2,
      m.y - smallHeight,
      m.x + 180 + smallBase,
      m.y,
    );
    // Snow cap (small)
    fill(255);
    triangle(
      m.x + 180 + smallBase / 2 - 20,
      m.y - smallHeight + 40,
      m.x + 180 + smallBase / 2,
      m.y - smallHeight,
      m.x + 180 + smallBase / 2 + 20,
      m.y - smallHeight + 40,
    );
    let tinyBase = 150;
    let tinyHeight = 150;
    fill(150);
    triangle(
      m.x + 100,
      m.y,
      m.x + 100 + tinyBase / 2,
      m.y - tinyHeight,
      m.x + 100 + tinyBase,
      m.y,
    );

    // Snow cap (tiny)
    fill(255);
    triangle(
      m.x + 100 + tinyBase / 2 - 15,
      m.y - tinyHeight + 25,
      m.x + 100 + tinyBase / 2,
      m.y - tinyHeight,
      m.x + 100 + tinyBase / 2 + 15,
      m.y - tinyHeight + 25,
    );
  }
}
// tree drawing
function drawTrees() {
  for (let treeX of trees_x) {
    // Trunk
    fill(139, 69, 19); // Brown
    rect(treeX - 15, groundLevel - 80, 30, 80);

    fill(0, 155, 0);

fill(0, 155, 0);

triangle(
  treeX - 120,
  groundLevel - 60,
  treeX + 120,
  groundLevel - 60,
  treeX,
  groundLevel - 340
);

triangle(
  treeX - 100,
  groundLevel - 180,
  treeX,
  groundLevel - 360,
  treeX + 100,
  groundLevel - 180
);

triangle(
  treeX - 80,
  groundLevel - 240,
  treeX,
  groundLevel - 420,
  treeX + 80,
  groundLevel - 240
);
  }
}


function updateCharacter() {

    character.x += scrollSpeed;

    if(isLeft)
    {
        character.x -= 2;
    }

    if(isRight)
    {
        character.x += 2;
    }
  // check platform contact
  isContact = false;

  for (var i = 0; i < platforms.length; i++) {
    if (
      platforms[i].checkContact(character.x, character.y) &&
      character.jumpingVelocity >= 0
    ) {
      character.y = platforms[i].y;
      character.jumpingVelocity = 0;
      isContact = true;
      break;
    }
  }

  // gravity
  if (!isContact) {
    if (isPlummeting) {
      character.jumpingVelocity += 1.5;
    } else if (character.y < groundLevel) {
      character.jumpingVelocity += 0.8;
    }

    character.y += character.jumpingVelocity;
  }

  // stop on ground
  if (character.y >= groundLevel && !isPlummeting) {
    character.y = groundLevel;
    character.jumpingVelocity = 0;
  }

  // falling state
  isFalling = character.y < groundLevel && !isContact;

  // canyon check
  for (let i = 0; i < Canyon.length; i++) {
    if (Canyon[i].hidden) {
      let d = abs(character.x - Canyon[i].x);

      if (d > 200) continue;
    }

    if (
      character.x > Canyon[i].x &&
      character.x < Canyon[i].x + Canyon[i].width &&
      character.y >= groundLevel &&
      !isPlummeting
    ) {
      isPlummeting = true;
    }
  }
}

function updateCamera()
{
    let screenX = character.x - cameraPosx;

    // start scrolling when player reaches 80% of screen
    if (screenX > width * 0.5)
    {
        cameraPosx = character.x - width * 0.5;
    }

    cameraPosx = constrain(cameraPosx, 0, gameWorldWidth - width);}


function keyPressed() {
  isPaused = false;

  if (keyCode == 65 || key == "a") {
    isLeft = true;
  }
  if (keyCode == 68 || key == "d") {
    isRight = true;
  }
  if(keyCode == 32)
    {
        gameStarted = true;
    }
  if ((keyCode == 87 || key == "w") && !isFalling && !isPlummeting) {
    character.jumpingVelocity = -17; // negative to move up
    isFalling = true;
    jumpSound.play();
  }

  if (key == "r" || key == "R") {
    lives = 3;
    startGame();
  }
}

function keyReleased() {
  if (!isLeft && !isRight) {
    isPaused = true;
  }
  if (keyCode == 65 || key == "a") {
    isLeft = false;
  }
  if (keyCode == 68 || key == "d") {
    isRight = false;
  }
  if (keyCode == 87 || key == "w") {
    isJumping = false;
  }
}
function drawCollectable(t_collectable) {
  if (!t_collectable.isFound) {
    var coinY = t_collectable.y - 130 + sin(frameCount * 0.05) * 10;
    var spin = abs(sin(frameCount * 0.1)) * t_collectable.size;

    stroke(31, 10, 10);
    fill(205, 127, 50);

    ellipse(t_collectable.x, coinY, spin, t_collectable.size);

    fill(212, 175, 55);

    ellipse(t_collectable.x, coinY, spin - 20, t_collectable.size - 20);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("$", t_collectable.x, coinY);
  }
}

function checkCollectable(t_collectable) {
  if (!t_collectable.isFound) {
    // The coin is drawn 150px above its y-coordinate
    var coinY = t_collectable.y - 150 + sin(frameCount * 0.05) * 10;

    let d = dist(character.x, character.y, t_collectable.x, coinY);

    if (d < t_collectable.size / 2) {
      // half the size for better collision
      t_collectable.isFound = true;
      game_score += 1;
       coinSound.play();
    }
  }
}
function drawCanyon(t_canyon) {
  // Outer Canyon
  fill(99, 99, 99);
  quad(
    t_canyon.x,
    groundLevel,
    t_canyon.x + t_canyon.width,
    groundLevel,
    t_canyon.x + t_canyon.width - 20,
    height,
    t_canyon.x + 20,
    height,
  );

  // Inner darker section
  fill(56, 56, 56);
  quad(
    t_canyon.x + 10,
    groundLevel,
    t_canyon.x + 110,
    groundLevel,
    t_canyon.x + 90,
    height,
    t_canyon.x + 30,
    height,
  );
}

function renderFlagpole() {
  stroke(180);
  strokeWeight(5);
  line(flagpole.x_pos, groundLevel, flagpole.x_pos, groundLevel - 250);
  fill(255, 0, 255);
  if (flagpole.isReached) {
    rect(flagpole.x_pos, groundLevel - 250, 50, 50);
  } else {
    rect(flagpole.x_pos, groundLevel - 50, 50, 50);
  }
}
function checkFlagpole() {
  let d = abs(character.x - flagpole.x_pos);

  if (d < 50) {
    flagpole.isReached = true;
    isPaused = true; // stop game movement
  }
}
function startGame() {
  cameraPosx = 0;
  cameraSpeed = 0;
  character.x = 250;
  character.y = groundLevel;
  character.jumpingVelocity = 0;

  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;

  flagpole.isReached = false;

  for (let c of collectable) {
    c.isFound = false;
  }
  game_score = 0;
}
function checkPlayerDie() {
  if (character.y > height) {
    lives -= 1;

    if (lives > 0) {
      startGame();
    }
  }
}

function drawHeart(x, y, size) {
  fill(255, 0, 0);
  noStroke();

  beginShape();
  vertex(x, y + size / 4);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(
    x + size,
    y + size / 3,
    x + size / 2,
    y - size / 2,
    x,
    y + size / 4,
  );
  endShape(CLOSE);
}

