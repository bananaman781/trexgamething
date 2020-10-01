var trex, trex_running, trex_collided, cloud, gameEnd, restartb;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, invisibleGround, groundImage, cloudimage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, gameOver, restart;
var cloudGroup, obstacleGroup
var jump, die, checkpoint

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  cloudimage = loadImage("cloud.png");
  
  groundImage = loadImage("ground2.png");
  
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(600, 200);
  
  gameEnd = createSprite(300,50,10,10);
  gameEnd.addImage("gameover", gameOver);
  gameEnd.scale = 0.5
  gameEnd.visible = false;
  
  restartb = createSprite(300,100,10,10);
  restartb.addImage("restartbutton",restart);
  restartb.scale = 0.5;
  restartb.visible = false;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collide", trex_collided);
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(255);
  
  trex.velocityY = trex.velocityY + 0.8
  
   text("Score is:" + score,500,50);
 
  
  if(gameState == PLAY){
    
    if(keyDown("space")&& trex.y > 150) {
      trex.velocityY = -10;
      jump.play()
    }
     
    if (score % 50 == 0){
      checkpoint.play();
    }
    
  score = score + Math.round(getFrameRate()/30);
  
    
  spawnClouds();
  
  spawnObstacles();
  
    ground.velocityX = -(7 + score/50);
     if (ground.x < 0){
       ground.x = ground.width/2;
    }
    
   if(obstacleGroup.isTouching(trex)){
     gameState = END;
     die.play();
   }
    
   }
  else if(gameState == END){
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    trex.changeAnimation("collide", trex_collided);
   
    gameEnd.visible = true;
    restartb.visible = true;
    
    if (mousePressedOver(restartb)){
      reset();
    }
  }
  
 
  trex.collide(invisibleGround);
  drawSprites();
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,320,40,10);
    cloud.y = random(100,30);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -(7 + score/50);
    cloudGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 150;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -(7 + score/50);
    
    
    obstacleGroup.add(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1: obstacle.addImage(obstacle1)
        ;break
      case 2: obstacle.addImage(obstacle2)
        ;break
      case 3: obstacle.addImage(obstacle3)
        ;break
      case 4: obstacle.addImage(obstacle4)
        ;break
      case 5: obstacle.addImage(obstacle5)
        ;break
      case 6: obstacle.addImage(obstacle6)
        ;break
    }
    
      
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
  }
}
  function reset() {
    gameState = PLAY;
    score = 0;
    
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    
    restartb.visible = false;
    gameEnd.visible = false;
    
    trex.changeAnimation("running", trex_running)
}