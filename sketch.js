//const Engine = Matter.Engine;
//const World= Matter.World;
//const Bodies = Matter.Bodies;
//var engine, world;
var ground,bg;
var candyGirl;
var invisibleGround, edges;
var blockGroup, stars1Group, stars2Group, enemiesGroup;
var score, lives, livesNo;
var gameState, gameOver, restart;
var PLAY = 1;
var END = 0 ;

function preload(){
   bg = loadImage("background1.jpg");
   candygirl_running = loadAnimation("images/copy1.png","images/copy2.png","images/copy3.png","images/copy4.png","images/copy5.png","images/copy6.png");
   chocblock = loadImage("images/block1.png");
   strawblock = loadImage("images/block2.png");
   groundy = loadImage("Ground2.png");
   star1 = loadImage("images/star.png");
   donut = loadImage("images/Donut.png");
   donut2 = loadImage("images/Donut2.png");
   pudding = loadImage("images/pudding.png");
   jelly = loadImage("images/Jelly bean.png");
   jelly2 = loadImage("images/jelly monster.png")
   heart = loadImage("images/heart.png");
   game_over = loadImage("images/gameover.png");
   restart1 = loadImage("images/restart.png");
   collect = loadSound("sounds/collect_gold.mp3");
   end = loadSound("sounds/lose_life.mp3");
}

function setup(){
  var canvas = createCanvas(1500,800);
  //engine = Engine.create();
  //world = engine.world;

  //create gamestate and set it to play mode
  gameState = PLAY;

  //create a Ground
  ground = createSprite(750,650,3000,20);
  ground.addImage(groundy);
  ground.scale = 1.7;

  //create invisible ground
  invisibleGround = createSprite(750,650,3000,20);
  invisibleGround.visible = false;

  candyGirl = createSprite(100,600);
  candyGirl.addAnimation("running",candygirl_running);
  //candyGirl.debug = true;
  candyGirl.setCollider("rectangle",0,0,50,140)
  

  //create lives
 /* lives = createSprite(100,50);
  lives.addImage(heart);
  lives.scale = 0.1;*/

  //place game over and restart icons on screen
      gameOver = createSprite(700,500);
      gameOver.addImage(game_over);
      gameOver.scale = 0.5;

    /*  restart = createSprite(700,600);
      restart.addImage(restart1);
      restart.scale = 2;*/

      gameOver.visible = false;
     // restart.visible = false;

  //create groups
  blockGroup = new Group();
  stars1Group = new Group();
  stars2Group = new Group();
  enemiesGroup = new Group();

  

  edges = createEdgeSprites();
  score = 0;
  livesNo = 3;
  textSize(18);
  textFont("Georgia");
}
function draw(){
    background(bg);
    //scoring
    text("SCORE:"+score,1300,50);

    //text("LIVES:"+livesNo,150,50);
    
  
   if(gameState===PLAY){
     //set ground velocity  
    ground.velocityX = -3;
    //reset the ground
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    if(keyDown(UP_ARROW )&& candyGirl.y>480){
      candyGirl.velocityY = -10;
      console.log(candyGirl.y);
    }
    candyGirl.velocityY = candyGirl.velocityY +0.5;

    if(keyDown("SPACE")&& candyGirl.y>200){
      candyGirl.velocityY = -15;

    }

    if(keyDown(DOWN_ARROW)){
      candyGirl.velocityY = 8;

    }

    if(keyDown(RIGHT_ARROW)){
      candyGirl.velocityX = 6;

    }

    if(keyDown(LEFT_ARROW)){
      candyGirl.velocityX = -6;

    }

     //collect stars
     if(stars1Group.isTouching(candyGirl)){
      stars1Group.destroyEach();
      score++;
      collect.play();
      
    }

    if(stars2Group.isTouching(candyGirl)){
      stars2Group.destroyEach();
      score+=1;
    }

    spawnBlocks();
    candyGirl.bounceOff(edges[0]);
    candyGirl.bounceOff(edges[1]);
    spawnEnemies();
    spawnyStars();
    spawnStarsy();
    candyGirl.collide(blockGroup);
    candyGirl.collide(invisibleGround);

    if(enemiesGroup.isTouching(candyGirl)){
      gameState=END;
    }
    
    
  }
    
  
   
   
    if(gameState===END){
      ground.velocityX = 0;
      candyGirl.velocityX = 0;
      candyGirl.velocity = 0;
      end.play();

      enemiesGroup.setVelocityXEach(0);
      blockGroup.setVelocityXEach(0);
      stars1Group.setVelocityXEach(0);
      stars2Group.setVelocityXEach(0);

      gameOver.visible = true;
      //restart.visible = true;
    }

    if(keyCode===80){
      reset();
    }
    

    
    drawSprites();
}


//function to reset the game
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
 // restart.visible  = false;
  enemiesGroup.destroyEach();
  blockGroup.destroyEach();
  stars1Group.destroyEach();
  stars2Group.destroyEach();
  candyGirl.addAnimation("running", candygirl_running);
  score = 0;
}

//fundtion to spawn blocks
function spawnBlocks(){
  if(frameCount%150===0){
    var r = Math.round(random(400,300));
    var block = createSprite(1500,r,200,160);
    block.scale = 0.4;
    block.setCollider("rectangle",0,-80,470,180);
    block.velocityX = -3;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: block.addImage(chocblock);
              break;
      case 2: block.addImage(strawblock);
              break;
      default:break;
    }
   blockGroup.add(block);
   //block.debug = true;
  }
}

//spawn enemies
function spawnEnemies(){
  if(frameCount%250===0){
    var r = Math.round(random(400,500));
    var enemy = createSprite(1500,r,80,80);
    enemy.scale = 0.1;
    enemy.velocityX =  -(4+3*score/100);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: enemy.addImage(donut);
              break;
      case 2: enemy.addImage(jelly2);
              break;
      case 3: enemy.addImage(jelly);
              break;
      default:break;
    }
    enemiesGroup.add(enemy);
  }
}

//spawning stars
function spawnyStars(){
  if(frameCount%150===0){
      var star = createSprite(1500,500,40,40);
      star.addImage(star1);
      star.velocityX = -3;
      star.scale = 0.03;

      stars1Group.add(star);

  }
}

function spawnStarsy(){
  if(frameCount%180===0){
      var star = createSprite(1500,500,40,40);
      star.addImage(star1);
      star.velocityX = -3;
      star.scale = 0.03;

      stars2Group.add(star);

  }
}
/*function keyPressed(){
  if(keyCode===RIGHT_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:5,y:0});
  }

  if(keyCode===LEFT_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:-5,y:0});
  }

  if(keyCode===UP_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:0,y:-5});
  }

  if(keyCode===DOWN_ARROW){
    Matter.Body.setVelocity(candyGirl.body,{x:0,y:5});
  }
}*/