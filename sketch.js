var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameOver, gameOverImg, restart, restartImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")
gameOverImg = loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")
jumpSound = loadSound("assets/jump.mp3");
dieSound = loadSound("assets/die.mp3");
}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3;


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug = true;

topObstacleGroup = new Group();
bottomObstacleGroup = new Group();
barGroup = new Group();


gameOver = createSprite(220,200);
restart = createSprite(220,240);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false


}

function draw() {
  
  background("black");
        if(gameState===PLAY){

        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            jumpSound.play();
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;

           
          Bar();
          spawnObstaclesTop();
          spawnObstaclesBottom();

          if(topObstacleGroup.isTouching(balloon) || balloon.isTouching(topGround)||balloon.isTouching(bottomGround)||bottomObstacleGroup.isTouching(balloon)){
            gameState = END;
            dieSound.play;
          }
        }

        if(gameState===END){
          gameOver.visible = true;
          gameOver.depth = gameOver.depth+1;
          restart.visible = true;
          restart.depth = restart.depth+1;
          balloon.velocityX = 0;
          balloon.velocityY = 0;
          topObstacleGroup.setVelocityXEach(0);
          bottomObstacleGroup.setVelocityXEach(0);
          barGroup.setVelocityXEach(0);

          topObstacleGroup.setLifetimeEach(-1);
          bottomObstacleGroup.setLifetimeEach(-1);
          balloon.y = 200;

          if(mousePressedOver(restart)){
            reset();
          }

        }

        drawSprites();
        Score();
       
        //spawning top obstacles
      

      
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   topObstacleGroup.add(obstacleTop);

      }
}
function spawnObstaclesBottom() 
{
      if(World.frameCount % 60 === 0) {
        obstacleBottom = createSprite(400,350,40,50);
    
    obstacleBottom.addImage(obsBottom1);
    obstacleBottom.debug = true;

    obstacleBottom.scale = 0.07;
    obstacleBottom.velocityX = -4;

    //random y positions for top obstacles
    //obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleBottom.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   bottomObstacleGroup.add(obstacleBottom);

      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
          barGroup.add(bar);
         }
}

function Score(){
  if(balloon.isTouching(barGroup) ){
    score = score+1;
  }
  textFont("algerian");
  textSize(30);
  fill("yellow");
  text("Score: " +score, 250, 50)

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstacleGroup.destroyEach();
  bottomObstacleGroup.destroyEach();
  score = 0;
}
  
