var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var bullet
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup,bulletGroup;

//Write code to declare variable for bullets & assign number of bullets
var bullets = 70;
//Declare variable for gamestate
var gameState = "fight"

function preload()
{
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

  player = createSprite(displayWidth-1350, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle",0,0,300,300)
  
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4
   
  zombieGroup = new Group()
  //Create group for bullets
  bulletGroup = new Group()

}

function draw() 
{
  background(0); 
  //Write code to add GameState
  if (gameState === "fight"){
    if(keyDown("UP_ARROW")||touches.length>0)
  {
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0)
  {
    player.y = player.y+30
  }
  
  if(keyWentDown("p"))
  {
    //Write code create bullet sprite
  bullet = createSprite(displayWidth-1150,player.y-30,20,10);
    //Add velocity to bullet
    bullet.velocityX = 20
    //Add bullet intothe group
    bulletGroup.add(bullet);
    //change the depth of player
    player.depth = bullet.depth;
    player.depth = player.depth +2
    player.addImage(shooter_shooting)
    //Decrease the count of bullet
    bullets = bullets -1
  }

  else if(keyWentUp("space"))
  {
    player.addImage(shooterImg)
  }
    //Write code to change the gamestate when number of bullet=0
    if(bullets === 0){
      gameState = "bullet"
    }
  //write code to destroy the zombie when bullet touches it
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0;i<zombieGroup.length;i++){
      if (zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();

      }
    }
    
  }


  }
  

  

  



  //refer the code we wrote for destroying player
  

  
  if(zombieGroup.isTouching(player))
  {
    for(var i=0;i<zombieGroup.length;i++)
    {     
      if(zombieGroup[i].isTouching(player))
      {
        zombieGroup[i].destroy()
      } 
    }
  }
  enemy();


drawSprites();

//write code destroy zombie and player and display a message in gameState "lost"
if(gameState === "lost"){
  zombieGroup.destroyEach()
  player.destroy()
  textSize(100)
  fill("red")
  text("You Lost",400,400)
  
}

//write code destroy zombie and player and display a message in gameState "won"
else if ( gameState === "won"){
  zombieGroup.destroyEach()
  player.destroy()
  textSize(100)
  fill("turquoise")
  text("You Won",400,400)
  
}
//write code destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState === "bullet"){
  zombieGroup.destroyEach()
  player.destroy()
  textSize(50)
  fill("white")
  text("You Ran out of Bullets",470,410)
  
}

}
function enemy()
{
  if(frameCount%50===0)
  {
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }
}
