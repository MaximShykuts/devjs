pic       = new Image();
pic.src    = 'images/first-trooper.png';
pic2       = new Image();
pic2.src    = 'images/third-trooper.png';
picPlatform = new Image();
picPlatform.src = 'images/platform.png';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10; //радиус мячика
var x = canvas.width/2; //
var y = canvas.height-30; //
var dx = 5; //скорость мячика по X
var dy = -5; //скорость мячика по Y
var paddleHeight = 9; //высота игрового бокса
var paddleWidth = 104; //ширина игрового бокса
var paddleX = (canvas.width-paddleWidth)/2; //
var rightPressed = false; //
var leftPressed = false; //
var brickRowCount = 7; //Кол-во строк голов
var brickColumnCount = 5; //кол-во колонок голов
var brickWidth = 90; //ширина головы штурмовика
var brickHeight = 53; //высота головы штурмовика
var brickPadding = 10; //отступы у  голов
var brickOffsetTop = 50; //отступ сверху
var brickOffsetLeft = 30; //отступ слева
var score = 0; //отображение очков
var lives = 3; //отображение жизней

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
    if(c === 2 || c === 0) {
      bricks[c][r] = { x: 0, y: 0, status: 2 };
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if(e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {

      var b = bricks[c][r];
      if(b.status === 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score === brickRowCount*brickColumnCount + 14) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
      else if(b.status === 2) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          b.status = 1;
          if(score === brickRowCount*brickColumnCount + 14) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#45e0fe";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(picPlatform) {
  ctx.beginPath();
 // ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
 // ctx.fillStyle = "#45e0fe";
  ctx.drawImage(picPlatform, paddleX, canvas.height-paddleHeight);
  ctx.fill();
  ctx.closePath();
}

function drawBricks(pic, pic2) {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status === 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.beginPath();
        ctx.drawImage(pic, brickX, brickY);
        ctx.fill();
        ctx.closePath();
      }
      else if (bricks[c][r].status === 2) {
        var brickX2 = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY2 = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX2;
        bricks[c][r].y = brickY2;

        ctx.beginPath();
        ctx.drawImage(pic2, brickX2, brickY2);
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#45e0fe";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#45e0fe";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle(picPlatform);
  drawBricks(pic, pic2);
  drawScore();
  drawLives();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        //alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 4;
        dy = -4;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
