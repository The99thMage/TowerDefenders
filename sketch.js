//define variables for buttons
var startButton, start_img;
var helpButton, help_img;
var playButton, play_img;
var enemyAlert, enemyAlert_img;

//track pieces
var part0, part1, part2, part3, part4, part5, part6, part7, pary8, part9, part10, parts;
var img1, img2, img3, img4, img5, img6, img7, img8, img9;

//define variables tower images
var normal1_img, normal2_img, normal3_img, normalIcon;
var rapid1_img, rapid2_img, rapid3_img, rapidIcon;
var sniper1_img, sniper2_img, sniper3_img, sniperIcon;

//UI elements
var backdrop, backdrops, backdrop_img;
var xButton, xButtons, xButton_img; 
var upgradeButton, upgradeButtons, upgradeButton_img, maxUpgradeButton_img;

//define variables for stats
var money, moneyIcon, money_img;
var lives, livesIcon, lives_img;

//define fonts
var helpFont;
var UIFont;

//towers
var choice;
var normalTower, normalWorkingTower;
var rapidTower, rapidWorkingTower;
var sniperTower, sniperWorkingTower;
var rangeDisplay, realRangeDisplay, range_img;
var towers;
var bullet, bullets;

//other variables
var placing;
var itemPlaced;
var gameState;
var getNewTower;

//variables concerning waves/enemies
var wave;
var enemies;
var spawning;
var counter;

var normalEnemy, normalEnemy_img;
var speedyEnemy, speedyEnemy_img;
var tankEnemy, tankEnemy_img;
var miniEnemy, miniEnemy_img;
var splitterEnemy, splitterEnemy_img;

function preload() {
  //buttons
  start_img = loadImage("otherImages/startButton.png");
  help_img = loadImage("otherImages/helpButton.png");
  play_img = loadImage("otherImages/startWave.png");
  enemyAlert_img = loadImage("otherImages/newEnemyAlert.png");
  
  //track parts
  img1 = loadImage("otherImages/trackParts/part1.png");
  img2 = loadImage("otherImages/trackParts/part2.png");
  img3 = loadImage("otherImages/trackParts/part3.png");
  img4 = loadImage("otherImages/trackParts/part4.png");
  img5 = loadImage("otherImages/trackParts/part5.png");
  img6 = loadImage("otherImages/trackParts/part6.png");
  img7 = loadImage("otherImages/trackParts/part7.png");
  img8 = loadImage("otherImages/trackParts/part8.png");
  img9 = loadImage("otherImages/trackParts/part9.png");

  //stats
  money_img = loadImage("otherImages/money.png");
  lives_img = loadImage("otherImages/heart.png");

  //towers
  normal1_img = loadImage("gameTowers/Normal_Tier_1.png");
  normal2_img = loadImage("gameTowers/Normal_Tier_2.png");
  normal3_img = loadImage("gameTowers/Normal_Tier_3.png");

  rapid1_img = loadImage("gameTowers/Rapidfire_Tier_1.png");
  rapid2_img = loadImage("gameTowers/Rapidfire_Tier_2.png");
  rapid3_img = loadImage("gameTowers/Rapidfire_Tier_3.png");

  sniper1_img = loadImage("gameTowers/Sniper_Tier_1.png");
  sniper2_img = loadImage("gameTowers/Sniper_Tier_2.png");
  sniper3_img = loadImage("gameTowers/Sniper_Tier_3.png");

  //enemies
  normalEnemy_img = loadImage("enemies/regular.png");
  speedyEnemy_img = loadImage("enemies/speedy.png");
  tankEnemy_img = loadImage("enemies/tank.png");
  miniEnemy_img = loadImage("enemies/mini.png");
  splitterEnemy_img = loadImage("enemies/splitter.png");

  //range
  range_img = loadImage("otherImages/range.png");

  //UI
  backdrop_img = loadImage("otherImages/rect.png");
  xButton_img = loadImage("otherImages/X.png");
  upgradeButton_img = loadImage("otherImages/upgradeButton.png");
  maxUpgradeButton_img = loadImage("otherImages/maxed.png");

  //fonts
  helpFont = loadFont("fonts/HelpFont.ttf");
  UIFont = loadFont("fonts/UIFont.ttf");
}

function setup() {
  //create canvas
  var cnv = createCanvas(700, 500);
  cnv.style('display', 'block');

  //set variables
  gameState = "waiting";
  placing = false;
  money = 600;
  lives = 200;

  //create arrays
  towers = [];
  xButtons = [];
  backdrops = [];
  enemies = [];
  bullets = [];
  upgradeButtons = [];

  //wave number
  wave = 0;

  //create a group
  parts = new Group();

  //create buttons
  startButton = createSprite(350, 200);
  startButton.addImage("startButton", start_img);
  startButton.scale = 0.25;

  helpButton = createSprite(350, 300);
  helpButton.addImage("helpButton", help_img);
  helpButton.scale = 0.25;
}

function createBackgroundElements(){
  //create certain elements during playmode
  if(gameState === "playing"){
    //background of tower selection
    fill(166, 124, 80);
    strokeWeight(5);
    stroke(133, 97, 0);
    rect(600, -15, 200, 600);
  }
}

function createUI(){
  //display text based on gamestate
  if(gameState === "learning"){
    //set the text font, alignment, and color
    fill(0, 0, 0);
    textFont(helpFont);
    textAlign(CENTER);

    //objective of the game
    textSize(20);
    text("Objective: Defend your home from the bad guys!", 350, 30);

    //set text size
    textSize(15);
    //wave start text
    text("Wave Start:\nClick to start a wave.\nWaves can be started\nonce all enemies of the\nlast wave have spawned.", playButton.x, playButton.y + 75);
    //enemy alert text
    text("Enemy Alert:\nAppears when you \nencounter a new\nenemy. Click it for\n details on the enemy.", enemyAlert.x, enemyAlert.y + 75);
    //money text
    text("Money:\nMoney can buy towers.\nKilling enemies\nor by finishing waves\ngives money", moneyIcon.x, moneyIcon.y + 75);
    //heart text
    text("Lives:\nIf an enemy gets past\nyou will lose lives\nequal to the enemy's\nremaining HP.", livesIcon.x, livesIcon.y + 75);
    //towers text
    text("Towers:\nTowers will defend you\nfrom the enemies\nEach tower has its own\nweakness so pick carefully!", normalIcon.x, normalIcon.y + 75);
  }
  
  //display several different UI elements during gameplay
  if(gameState === "playing"){
    //set the text up
    fill(0, 0, 0);
    noStroke();
    textSize(25);
    textFont(UIFont);

    //draw the text for money & lives
    text(lives, 30, livesIcon.y + 7.5);
    text(money, 30, moneyIcon.y + 7.5);

    //waves text
    textAlign(CENTER);
    textSize(30);
    text("wave: " + wave + "/50", 300, 30);
    textSize(25);
    textAlign(LEFT);
  }
}

function switchGameStates(){
  //show helpscreen if in "waiting"
  if(mousePressedOver(helpButton) && gameState === "waiting"){
    //set up the space
    helpButton.visible = false;
    startButton.y = 450;

    //switch the gamestate
    gameState = "learning";

    //show the wave start button
    playButton = createSprite(115, 100);
    playButton.addImage("playImg", play_img);
    playButton.scale = 0.2;

    //show the enemy alert
    enemyAlert = createSprite(350, 100);
    enemyAlert.addImage("enemyAlertImg", enemyAlert_img);
    enemyAlert.scale = 0.3;

    //show money
    moneyIcon = createSprite(585, 100);
    moneyIcon.addImage("moneyImg", money_img);
    moneyIcon.scale = 0.3;

    //show lives
    livesIcon = createSprite (160, 300);
    livesIcon.addImage("livesImg", lives_img);
    livesIcon.scale = 0.27;

    //show tower
    normalIcon = createSprite(570, 300);
    normalIcon.addImage("normal1Img", normal1_img);
    normalIcon.rotation = 50;
    normalIcon.scale = 0.3;
  }
  //proceed to the game once begin has been pressed
  if(mousePressedOver(startButton) && (gameState === "waiting" || gameState === "learning")){
    //delete the extra sprites if we were previously on the help page
    if(gameState === "learning"){
      enemyAlert.destroy();
      normalIcon.destroy();
      playButton.destroy();
      livesIcon.destroy();
      moneyIcon.destroy();
    }
    //set the next gamestate
    gameState = "playing";

    //make the buttons invisible
    startButton.visible = false;
    helpButton.visible = false;

    //create the wave start button
    playButton = createSprite(655, 465);
    playButton.addImage(play_img);
    playButton.scale = 0.1;

    //create the icons for money & lives
    livesIcon = createSprite(15, 15);
    livesIcon.addImage(lives_img);
    livesIcon.scale = 0.075;
    moneyIcon = createSprite(15, 40);
    moneyIcon.addImage(money_img);
    moneyIcon.scale = 0.075;

    //create the tower icons
    normalIcon = createSprite(650, 35);
    normalIcon.rotation = 90;
    normalIcon.addImage("normal1", normal1_img);
    normalIcon.scale = 0.2;
    normalIcon.setCollider("rectangle", 0, -100, 300, 300);

    rapidIcon = createSprite(650, 100);
    rapidIcon.rotation = 90;
    rapidIcon.addImage("rapid1", rapid1_img);
    rapidIcon.scale = 0.175;
    rapidIcon.setCollider("rectangle", 0, -100, 350, 350);

    sniperIcon = createSprite(650, 165);
    sniperIcon.rotation = 90;
    sniperIcon.addImage("sniper1", sniper1_img);
    sniperIcon.scale = 0.2;
    sniperIcon.setCollider("rectangle", 0, -100, 300, 300);

    //create the track out of several sprites
    part0 = createSprite(-500, 100, 1000, 10);

    part1 = createSprite(50, 100);
    part1.addImage("part1", img1);
    part1.scale = 0.55;

    part2 = createSprite(102.5, 210);
    part2.addImage("part2", img2);
    part2.scale = 0.55;

    part3 = createSprite(140, 315);
    part3.addImage("part3", img3);
    part3.scale = 0.55;
  
    part4 = createSprite(175, 255);
    part4.addImage("part4", img4);
    part4.scale = 0.55;

    part5 = createSprite(245, 205);
    part5.addImage("part5", img5);
    part5.scale = 0.55;

    part6 = createSprite(313.5, 310);
    part6.addImage("part6", img6);
    part6.scale = 0.55;

    part7 = createSprite(390, 415);
    part7.addImage("part7", img7);
    part7.scale = 0.5;

    part8 = createSprite(460, 235);
    part8.addImage("part8", img8);
    part8.scale = 0.55;

    part9 = createSprite(510, 60);
    part9.addImage("part9", img9);
    part9.scale = 0.5;

    part10 = createSprite(555, 15);
    part10.addImage("part10", img4);
    part10.scale = 0.5;
  }
}

function displayPrice(icon, price, name){
  if(mouseIsOver(icon) && placing === false){
    //filled green if you have enough money, red if not
    if(money >= price){
      fill(0, 255, 0);
    }else{
      fill(255, 0, 0);
    }
    //rect behind the price text
    rectMode(CENTER);
    stroke(0, 0, 0);
    strokeWeight(2);
    rect(mouseX - 15, mouseY - 27.5, 35, 25);

    //show the price text
    textFont(UIFont);
    fill(0, 0, 0)
    noStroke();
    text("$" + price, mouseX - 30, mouseY - 20);

    //rect behind the name text
    fill(174, 0, 255);
    stroke(0, 0, 0);
    strokeWeight(2);
    rect(mouseX - 15, mouseY - 50, name.length * 10.5, 25);

    //show the name text
    textAlign(CENTER);
    textFont(UIFont);
    fill(0, 0, 0)
    noStroke();
    text(name, mouseX - 15, mouseY - 42);
    textAlign(RIGHT);
  }
}

function placeTowers(){
  //update the variable
  getNewTower = true;

  //place the tower
  if(mouseWentDown() && placing === true && mouseX < 570){
    placing = false;

    if(choice === "normal"){
      normalTower.destroy();
      normalWorkingTower = createSprite(mouseX - 20, mouseY - 20)
      normalWorkingTower.addImage(normal1_img);
      normalWorkingTower.scale = 0.2;
      normalWorkingTower.setCollider("circle", -10, -30, 150);

      rangeDisplay.destroy();
      rangeDisplay = createSprite(mouseX - 12.5, mouseY - 20)
      rangeDisplay.addImage(range_img);
      rangeDisplay.visible = false;
      rangeDisplay.scale = 4;

      normalWorkingTower.rotation = 90;
      money -= 150;

      towers.push([normalWorkingTower, "normal", false, 1, 25, false, null, rangeDisplay, null]);
    }

    if(choice === "rapid"){
      rapidTower.destroy();
      rapidWorkingTower = createSprite(mouseX - 20, mouseY - 20)
      rapidWorkingTower.addImage(rapid1_img);
      rapidWorkingTower.scale = 0.175;
      rapidWorkingTower.setCollider("rectangle", 0, -100, 350, 350);

      rangeDisplay.destroy();
      rangeDisplay = createSprite(mouseX - 12.5, mouseY - 20)
      rangeDisplay.addImage(range_img);
      rangeDisplay.visible = false;
      rangeDisplay.scale = 3;

      rapidWorkingTower.rotation = 90;
      money -= 250;

      towers.push([rapidWorkingTower, "rapid", false, 1, 8, false, null, rangeDisplay, null]);
    }

    if(choice === "sniper"){
      sniperTower.destroy();
      sniperWorkingTower = createSprite(mouseX - 20, mouseY - 20)
      sniperWorkingTower.addImage(sniper1_img);
      sniperWorkingTower.scale = 0.2;
      sniperWorkingTower.setCollider("rectangle", 0, -100, 350, 350);

      rangeDisplay.destroy();
      rangeDisplay = createSprite(mouseX - 12.5, mouseY - 20)
      rangeDisplay.addImage(range_img);
      rangeDisplay.visible = false;
      rangeDisplay.scale = 7;

      sniperWorkingTower.rotation = 85;
      money -= 200;

      towers.push([sniperWorkingTower, "sniper", false, 1, 75, false, null, rangeDisplay, null]);
    }

    backdrop = createSprite(200, 200);
    backdrop.visible = false;
    backdrop.addImage(backdrop_img);

    xButton = createSprite(200, 200);
    xButton.visible = false;
    xButton.addImage(xButton_img);

    upgradeButton = createSprite(200, 200);
    upgradeButton.visible = false;
    upgradeButton.addImage(upgradeButton_img);

    rangeDisplay.setCollider("circle");
    xButtons.push(xButton);
    backdrops.push(backdrop);
    upgradeButtons.push(upgradeButton);
  }

   //delete tower if wanted
   if(mouseWentDown() && placing === true && mouseX >= 570){
    placing = false;
    getNewTower = false;
    if(choice === "normal"){
      normalTower.destroy();
    }
    if(choice === "rapid"){
      rapidTower.destroy();
    }
    if(choice === "sniper"){
      sniperTower.destroy();
    }
    rangeDisplay.destroy();
  }

  //display the price when touching the sprite
  displayPrice(normalIcon, 150, "normal");
  displayPrice(rapidIcon, 250, "rapid");
  displayPrice(sniperIcon, 200, "sniper");

  //create a placeable tower
  if(mousePressedOver(normalIcon) && mouseWentDown() && money >= 150 && getNewTower === true){

    choice = "normal";
    normalTower = createSprite(200, 200, 100, 100);
    placing = true;
    normalTower.addImage(normal1_img);
    normalTower.scale = 0.2;
    normalTower.rotation = 90;

    //tower range
    rangeDisplay = createSprite(mouseX, mouseY);
    rangeDisplay.addImage(range_img);
    rangeDisplay.scale = 4;
  }

  if(mousePressedOver(rapidIcon) && mouseWentDown() && money >= 250 && getNewTower === true){
    //tower
    choice = "rapid";
    rapidTower = createSprite(200, 200, 100, 100);
    placing = true;
    rapidTower.addImage(rapid1_img);
    rapidTower.scale = 0.175;
    rapidTower.rotation = 90;

    //tower range
    rangeDisplay = createSprite(mouseX, mouseY);
    rangeDisplay.addImage(range_img);
    rangeDisplay.scale = 3;
  }

  if(mousePressedOver(sniperIcon) && mouseWentDown() && money >= 200 && getNewTower === true){
    //tower
    choice = "sniper";
    sniperTower = createSprite(200, 200, 100, 100);
    placing = true;
    sniperTower.addImage(sniper1_img);
    sniperTower.scale = 0.2;
    sniperTower.rotation = 90;

    //tower range
    rangeDisplay = createSprite(mouseX, mouseY);
    rangeDisplay.addImage(range_img);
    rangeDisplay.scale = 7;
  }

  //move the tower
  if(placing === true){
    if(choice === "normal"){
      normalTower.x = mouseX - 20;
      normalTower.y = mouseY - 20;
    }
    if(choice === "rapid"){
      rapidTower.x = mouseX - 20;
      rapidTower.y = mouseY - 20;
    }
    if(choice === "sniper"){
      sniperTower.x = mouseX - 20;
      sniperTower.y = mouseY - 20;
    }
    rangeDisplay.x = mouseX - 12.5;
    rangeDisplay.y = mouseY - 20;
  }
}

function upgradeTowers(){
  //start looping
  for(var x = 0; x < towers.length; x++){
    //check if a tower is clicked 
    if(mousePressedOver(towers[x][0]) && mouseWentDown()){
      towers[x][2] = true;
    }

    //display upgrade screen
    xButtons[x].x = towers[x][0].x + 38; 
    backdrops[x].x = towers[x][0].x + 5; 
    upgradeButtons[x].x = towers[x][0].x - 2; 


    if(towers[x][2] === true){
      //background
      fill("white");
      stroke("black");
      strokeWeight(3);
      xButtons[x].visible = true;
      backdrops[x].visible = true;
      upgradeButtons[x].visible = true;

      backdrops[x].scale = 0.1;
      xButtons[x].scale = 0.6;
      upgradeButtons[x].scale = 0.1;

      fill("black");
      textAlign(CENTER);
      noStroke();
      textSize(20);

      if(towers[x][0].y > 50){
        xButtons[x].y = towers[x][0].y - 60.5; 
        backdrops[x].y = towers[x][0].y - 50; 
        upgradeButtons[x].y = towers[x][0].y - 40; 

        if(towers[x][1] === "normal" && towers[x][3] === 1){
          text("$250", towers[x][0].x, towers[x][0].y - 53);
        }

        if(towers[x][1] === "normal" && towers[x][3] === 2){
          text("$750", towers[x][0].x, towers[x][0].y - 53);
        }

        if(towers[x][1] === "rapid" && towers[x][3] === 1){
          text("$400", towers[x][0].x, towers[x][0].y - 53);
        }

        if(towers[x][1] === "rapid" && towers[x][3] === 2){
          text("$1200", towers[x][0].x, towers[x][0].y - 53);
        }

        if(towers[x][1] === "sniper" && towers[x][3] === 1){
          text("$600", towers[x][0].x, towers[x][0].y - 53);
        }

        if(towers[x][1] === "sniper" && towers[x][3] === 2){
          text("$1600", towers[x][0].x, towers[x][0].y - 53);
        }

        if(towers[x][3] === 3){
          text("max", towers[x][0].x, towers[x][0].y - 53);
        }
      }else{
        xButtons[x].y = towers[x][0].y + 60.5; 
        backdrops[x].y = towers[x][0].y + 50; 
        upgradeButtons[x].y = towers[x][0].y + 40; 

        if(towers[x][1] === "normal" && towers[x][3] === 1){
          text("$250", towers[x][0].x, towers[x][0].y + 63);
        }

        if(towers[x][1] === "normal" && towers[x][3] === 2){
          text("$750", towers[x][0].x, towers[x][0].y + 63);
        }

        if(towers[x][1] === "rapid" && towers[x][3] === 1){
          text("$400", towers[x][0].x, towers[x][0].y + 63);
        }

        if(towers[x][1] === "rapid" && towers[x][3] === 2){
          text("$1200", towers[x][0].x, towers[x][0].y + 63);
        }

        if(towers[x][1] === "sniper" && towers[x][3] === 1){
          text("$600", towers[x][0].x, towers[x][0].y + 63);
        }

        if(towers[x][1] === "sniper" && towers[x][3] === 2){
          text("$1600", towers[x][0].x, towers[x][0].y + 63);
        }

        if(towers[x][3] === 3){
          text("max", towers[x][0].x, towers[x][0].y + 63);
        }
      }

      textAlign(LEFT);

      //upgrade the tower
      if(mouseWentDown() && mouseX > upgradeButtons[x].x - 20 && 
      mouseX < upgradeButtons[x].x + 40 && mouseY > upgradeButtons[x].y &&
      mouseY < upgradeButtons[x].y + 20){
        if(towers[x][1] === "normal" && towers[x][3] === 2 && money >= 750){
          money -= 750;
          towers[x][0].addImage(normal3_img);
          towers[x][3] += 1;
          towers[x][4] = 15;
          towers[x][7].scale = 5;
          upgradeButtons[x].addImage(maxUpgradeButton_img);
        }

        if(towers[x][1] === "normal" && towers[x][3] === 1 && money >= 250){
          money -= 250;
          towers[x][0].addImage(normal2_img);
          towers[x][3] += 1;
          towers[x][4] = 20;
          towers[x][7].scale = 4.5;
        }

        if(towers[x][1] === "rapid" && towers[x][3] === 2 && money >= 1200){
          money -= 1200;
          towers[x][0].addImage(rapid3_img);
          towers[x][3] += 1;
          towers[x][4] = 4;
          towers[x][7].scale = 4;
          upgradeButtons[x].addImage(maxUpgradeButton_img);
        }

        if(towers[x][1] === "rapid" && towers[x][3] === 1 && money >= 400){
          money -= 400;
          towers[x][0].addImage(rapid2_img);
          towers[x][3] += 1;
          towers[x][4] = 6;
          towers[x][7].scale = 3.5;
        }

        if(towers[x][1] === "sniper" && towers[x][3] === 2 && money >= 1600){
          money -= 1600;
          towers[x][0].addImage(sniper3_img);
          towers[x][3] += 1;
          towers[x][4] = 50;
          towers[x][7].scale = 9;
          upgradeButtons[x].addImage(maxUpgradeButton_img);
        }

        if(towers[x][1] === "sniper" && towers[x][3] === 1 && money >= 600){
          money -= 600;
          towers[x][0].addImage(sniper2_img);
          towers[x][3] += 1;
          towers[x][4] = 65;
          towers[x][7].scale = 8;
        }
        
      }
    }else{
      xButtons[x].visible = false;
      backdrops[x].visible = false;
      upgradeButtons[x].visible = false;
    }

    //close the screen
    if(mouseX > xButtons[x].x + 2 && mouseX < xButtons[x].x + 20 &&
      mouseY > xButtons[x].y + 2 && mouseY < xButtons[x].y + 20 &&
      mouseWentDown() && towers[x][2] === true){
      towers[x][2] = false;
    }

    //display range when hovered over
    if(mouseIsOver(towers[x][0])){
      towers[x][7].visible = true;
    }else{
      towers[x][7].visible = false;
    }

    textSize(25);
  }
}

function createNormalEnemy(){
  var normalEnemy = createSprite(-50 , 100, 25, 25);
  normalEnemy.addImage("normal enemy", normalEnemy_img);
  normalEnemy.scale = 0.15;
  enemies.push([normalEnemy, 4, 20, false, false, "normal"]);
}

function createSpeedyEnemy(){
  var speedyEnemy = createSprite(-50 , 100, 25, 25);
  speedyEnemy.addImage("speedy enemy", speedyEnemy_img);
  speedyEnemy.scale = 0.15;
  enemies.push([speedyEnemy, 6, 10, false, false, "speedy"]);
}

function createTankEnemy(){
  var tankEnemy = createSprite(-50 , 100, 25, 25);
  tankEnemy.addImage("tank enemy", tankEnemy_img);
  tankEnemy.scale = 0.15;
  enemies.push([tankEnemy, 2, 500, false, false, "tank"]);
}

function createMiniEnemy(){
  var miniEnemy = createSprite(-50 , 100, 25, 25);
  miniEnemy.addImage("mini enemy", miniEnemy_img);
  miniEnemy.scale = 0.15;
  enemies.push([miniEnemy, 4.5, 5, false, false, "mini"]);
}

function spawnMiniEnemy(x, y){
  var miniEnemy = createSprite(x , y, 25, 25);
  miniEnemy.addImage("mini enemy", miniEnemy_img);
  miniEnemy.scale = 0.15;
  enemies.push([miniEnemy, 4.5, 5, false, false, "mini"]);
}

function createSplitterEnemy(){
  var splitterEnemy = createSprite(-50 , 100, 25, 25);
  splitterEnemy.addImage("splitter enemy", splitterEnemy_img);
  splitterEnemy.scale = 0.15;
  enemies.push([splitterEnemy, 4, 75, false, false, "splitter"]);
}

function summonEnemies(){
  //when summon button is pressed summon a wave
  if(mousePressedOver(playButton) && spawning !== true){
    //spawning time
    spawning = true;
    counter = 0;
    wave++;
  }

  //summon stuff
  if(spawning === true){
   //wave 9
   if(wave === 9){
    if(counter < 100){
      if(counter % 25 === 0){
        createSplitterEnemy();
      }

      if(counter % 50 === 0){
        createTankEnemy();
      }

      counter++;
      if(counter === 150){
        spawning = false;
        counter = 0
      }
    }
  }

  //wave 8
  if(wave === 8){
    if(counter < 120){
      if(counter % 20 === 0){
        createSplitterEnemy();
      }

      if(counter % 12 === 0 && counter !== 0){
        createNormalEnemy();
      }
  
      counter++;
      if(counter === 120){
        spawning = false;
        counter = 0
      }
    }
  }

   //wave 7
   if(wave === 7){
    if(counter < 200){
      if(counter % 15 === 0){
        createMiniEnemy();
      }

      if(counter % 5 === 0 && counter >= 75 && counter <= 125){
        createNormalEnemy();
      }

      counter++;
      if(counter === 150){
        spawning = false;
        counter = 0
      }
    }
  }
    
   //wave 6
   if(wave === 6){
    if(counter < 150){
      if(counter === 75){
        createTankEnemy();
      }

      if(counter % 20 === 0){
        createNormalEnemy();
      }

      if(counter % 40 === 0){
        createSpeedyEnemy();
      }

      counter++;
      if(counter === 150){
        spawning = false;
        counter = 0
      }
    }
  }

   //wave 5
   if(wave === 5){
    if(counter < 200){
      if(counter < 1){
        createTankEnemy();
      }
      if(counter % 5 === 0){
        createMiniEnemy();
      }
      counter++;
      if(counter === 150){
        spawning = false;
        counter = 0
      }
    }
  }

   //wave 4
   if(wave === 4){
    if(counter < 150){
      if(counter % 20 === 0){
        createSpeedyEnemy();
      }
      if(counter % 7 === 0 && counter < 50){
        createNormalEnemy();
      }
      counter++;
      if(counter === 150){
        spawning = false;
        counter = 0
      }
    }
  }

    //wave 3
    if(wave === 3){
      if(counter < 150){
        if(counter % 20 === 0){
          createNormalEnemy();
        }
        if(counter % 40 === 0){
          createSpeedyEnemy();
        }
        counter++;
        if(counter === 150){
          spawning = false;
          counter = 0
        }
      }
    }

    //wave 2
    if(wave === 2){
      if(counter < 110){
        if((counter % 5 === 0 && counter < 15) || (counter % 5 === 0 && counter > 40 && counter < 70) || (counter % 5 === 0 && counter > 90)){
          createNormalEnemy();
        }
        counter++;
        if(counter === 110){
          spawning = false;
          counter = 0
        }
      }
    }

    //wave 1
    if(wave === 1){
      if(counter < 150){
        if(counter % 15 === 0){
          createNormalEnemy();
        }
        counter++;
        if(counter === 150){
          spawning = false;
          counter = 0
        }
      }
    }
  }
}

function moveEnemies(){
  //move enemies
  for(var x = 0; x < enemies.length; x++){
    if(enemies[x][0].isTouching(part0)){
      enemies[x][0].x += enemies[x][1];
      enemies[x][0].rotation = 90;
    }

    if(enemies[x][0].isTouching(part1)){
      enemies[x][0].x += enemies[x][1];
      enemies[x][0].rotation = 90;
    }

    if(enemies[x][0].isTouching(part2)){
      enemies[x][0].y += enemies[x][1];
      enemies[x][0].rotation = 180;
    }

    if(enemies[x][0].isTouching(part3)){
      enemies[x][0].x += enemies[x][1];
      enemies[x][0].rotation = 90;
    }

    if(enemies[x][0].isTouching(part4)){
      enemies[x][0].y -= enemies[x][1];
      enemies[x][0].rotation = 0;
    }

    if(enemies[x][0].isTouching(part5)){
      enemies[x][0].x += enemies[x][1];
      enemies[x][0].rotation = 90;
    }

    if(enemies[x][0].isTouching(part6)){
      enemies[x][0].y += enemies[x][1];
      enemies[x][0].rotation = 180;
    }

    if(enemies[x][0].isTouching(part7)){
      enemies[x][0].x += enemies[x][1];
      enemies[x][0].rotation = 90;
    }

    if(enemies[x][0].isTouching(part8)){
      enemies[x][0].y -= enemies[x][1];
      enemies[x][0].rotation = 0;
    }

    if(enemies[x][0].isTouching(part9)){
      enemies[x][0].x += enemies[x][1];
      enemies[x][0].rotation = 90;
    }

    if(enemies[x][0].isTouching(part10)){
      enemies[x][0].y -= enemies[x][1];
      enemies[x][0].rotation = 0;
    }

    if(enemies[x][0].y < -50){
      lives -= enemies[x][2];
      enemies[x][0].y = 7000;
      enemies[x][0].destroy();
    }else{
      enemies[x][6] += enemies[x][1];
    }

    //additionally, display enemy HP when hovering over them
    if(mouseIsOver(enemies[x][0])){
      //filled green 
      fill(0, 255, 0);

      //rect behind the text
      rectMode(CENTER);
      stroke(0, 0, 0);
      strokeWeight(2);
      if(enemies[x][2] <= 0){

      }else if(enemies[x][2] < 10){
        rect(mouseX - 15, mouseY - 27.5, 50, 25);
      }else if(enemies[x][2] < 100){
        rect(mouseX - 12.5, mouseY - 27.5, 45, 25);
      }else if(enemies[x][2] < 1000){
        rect(mouseX - 7.5, mouseY - 27.5, 55, 25);
      }else{
        rect(mouseX - 2.5, mouseY - 27.5, 65, 25);
      }

      //show the text
      fill(0, 0, 0)
      noStroke();
      textFont(UIFont);
      if(enemies[x][2] > 0){
        text(enemies[x][2] + " hp", mouseX - 30, mouseY - 20);
      }
    }
  }
}

function targetEnemies(){
  for(var x = 0; x < towers.length; x++){

    //shooting code
    if(towers[x][5] === true){
      if(frameCount % towers[x][4] === 0){
        if(towers[x][1] === "normal"){
          bullet = createSprite(towers[x][0].x, towers[x][0].y, 10, 10);
          if(towers[x][3] === 1){
            bullets.push([bullet, 10, towers[x][6], towers[x][8], 0]);
          }
          if(towers[x][3] === 2){
            bullets.push([bullet, 15, towers[x][6], towers[x][8], 0]);
          }
          if(towers[x][3] === 3){
            bullets.push([bullet, 20, towers[x][6], towers[x][8], 0]);
          }
        }
        if(towers[x][1] === "rapid"){
          bullet = createSprite(towers[x][0].x, towers[x][0].y, 10, 10);
          if(towers[x][3] === 1){
            bullets.push([bullet, 7, towers[x][6], towers[x][8], 0]);
          }
          if(towers[x][3] === 2){
            bullets.push([bullet, 9, towers[x][6], towers[x][8], 0]);
          }
          if(towers[x][3] === 3){
            bullets.push([bullet, 15, towers[x][6], towers[x][8], 0]);
          }
        }
        if(towers[x][1] === "sniper"){
          bullet = createSprite(towers[x][0].x, towers[x][0].y, 10, 10);
          if(towers[x][3] === 1){
            bullets.push([bullet, 50, towers[x][6], towers[x][8], 0]);
          }
          if(towers[x][3] === 2){
            bullets.push([bullet, 100, towers[x][6], towers[x][8], 0]);
          }
          if(towers[x][3] === 3){
            bullets.push([bullet, 200, towers[x][6], towers[x][8], 0]);
          }        }
      }

      for(var z = 0; z < bullets.length; z++){
        if(bullets[z][2].x === 9000){
          bullets[z][2] = towers[x][6];
        }
      }

    }

    for(var y = 0; y < enemies.length; y++){

      //selects an enemy to fire at

      if(towers[x][7].isTouching(enemies[y][0]) && towers[x][5] === false){
        towers[x][5] = true;
        towers[x][6] = enemies[y][0];
        towers[x][8] = enemies[y];
      }

      //deselects the enemy
      if(towers[x][5] === true){

        towers[x][0].rotation = atan2(towers[x][6].x-towers[x][0].x, towers[x][6].y-towers[x][0].y) * -1;   

        if(towers[x][7].isTouching(towers[x][6]) === false){
          towers[x][5] = false;
          towers[x][6] = null;
        }
      }
    }
  }

  for(var z = 0; z < bullets.length; z++){
    if(bullets[z][0].x < bullets[z][2].x){
      bullets[z][0].x += 10;
    }

    if(bullets[z][0].x > bullets[z][2].x){
      bullets[z][0].x -= 10;
    }

    if(bullets[z][0].y < bullets[z][2].y){
      bullets[z][0].y += 10;
    }

    if(bullets[z][0].y > bullets[z][2].y){
      bullets[z][0].y -= 10;
    }

    if(bullets[z][4] < 60){
      bullets[z][4]++;
    }else{
      bullets[z][0].destroy();
    }

    if(bullets[z][0].isTouching(bullets[z][2])){
      bullets[z][0].destroy();
      bullets[z][3][2] -= bullets[z][1];
      if(bullets[z][3][2] <= 0){
        if(bullets[z][3][5] === "normal"){
          money += 10;
        }else if(bullets[z][3][5] === "speedy"){
          money += 15;
        }else if(bullets[z][3][5] === "tank"){
          money += 75;
        }else if(bullets[z][3][5] === "mini"){
          money += 5;
        }else if(bullets[z][3][5] === "splitter"){
          money += 40;
          spawnMiniEnemy(bullets[z][3][0].x, bullets[z][3][0].y);
          spawnMiniEnemy(bullets[z][3][0].x + random(-6, 6), bullets[z][3][0].y + random(-6, 6));
          spawnMiniEnemy(bullets[z][3][0].x + random(-6, 6), bullets[z][3][0].y + random(-6, 6));
          spawnMiniEnemy(bullets[z][3][0].x + random(-6, 6), bullets[z][3][0].y + random(-6, 6));
        }
        bullets[z][3][0].x = 9000;
        bullets[z][3][0].destroy();
      }
    }
  }

}

function draw() {
  //draw background
  background(210);

  //create background elements
  createBackgroundElements();

  //draw sprites
  drawSprites();
  
  //transition from one gamestate to another
  switchGameStates();

  //displays text and other details
  createUI();

  //things that happen only during gameplay
  if(gameState === "playing"){
    //upgrade the towers
    upgradeTowers();

    //place towers
    placeTowers();

    //summon enemies when needed
    summonEnemies();

    //move visible enemies
    moveEnemies();

    //target enemies
    targetEnemies();
  }
}