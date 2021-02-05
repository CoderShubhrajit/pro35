var balloon,balloonImage,backgroundImg,balloon_Position,database,position;

function preload()
{
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImage = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}

function setup() 
{
  createCanvas(500,500);

    database = firebase.database();
    balloon_Position = database.ref("balloon/position");
    balloon_Position.on("value",read,error);

  balloon = createSprite(100, 350, 50, 50);
  balloon.addAnimation("flying",balloonImage);
  balloon.scale = 0.45;
}

function draw() 
{
  background(backgroundImg);
  
  if(keyDown(LEFT_ARROW)){
    changePosition(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    changePosition(5,0);
  }
  else if(keyDown(UP_ARROW)){
    changePosition(0,-5);
  }
  else if(keyDown(DOWN_ARROW)){
    changePosition(0,5);
  }

  drawSprites();
}

function read(data)
{
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function changePosition(x,y)
{
    database.ref("balloon/position").set({x: balloon.x + x, y: balloon.y + y});
    console.log("hello");
}

function error()
{
  console.log("show the errors");
}