
pic       = new Image();
pic.src    = 'img/1.png';
pic2       = new Image();
pic2.src    = 'img/3.png';
picPlatform = new Image();
picPlatform.src = 'img/platform.png';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 5;
var dy = -5;
var paddleHeight = 9;
var paddleWidth = 104;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 7;
var brickColumnCount = 5;
var brickWidth = 90;
var brickHeight = 53;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

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
        alert("GAME OVER");
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
< ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
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

//////////////////////////////////

const PupType = {
  EXTENSION: {color: "dodgerblue", symbol: "="},
  LIFE: {color: "hotpink", symbol: "+"},
  STICKY: {color: "forestgreen", symbol: "~"},
  SUPER: {color: "magenta", symbol: "s"}
}

function Powerup(x,y,size,type) {
    this.x = x,
    this.y = y,
    this.w = size,
    this.h = size,
    this.type = type,
    this.yv = 0.15 * height;
}

function drawPups() {
   // ctx.lineWidth = wall * 0.35;
    //for (let pup of pups) {
       // ctx.fillStyle = pup.type.color;
       // ctx.strokeStyle = pup.type.color;
        //ctx.strokeRect(pup.x - pup.w * 0.5, pup.y - pup.h * 0.5, pup.w, pup.h);
      ctx.strokeRect(20,20,20,20);
       // ctx.font = "bold " + pup.h + "px " ;//+ TEXT_FONT;
       // ctx.textAlign = "center";
       // ctx.fillText(pup.type.symbol, pup.x, pup.y);
    //}
}

function updateBricks(c, r) {
 // if (bricks[c][r] != null && bricks[c][r].intersectionRect(ball)){
    //ball.setSpeed();
 // }
  //pups[3];
  if (0 <= PUP_CHANCE) {
    let px =  bricks[c][r].x ;//+ width / 2;
    let py = bricks[c][r].y;// + height / 2;
    let pSize = 16;//width / 2;
    let pKeys = Object.keys(PupType);
    let pKey = pKeys[Math.floor(Math.random() * pKeys.length)];
    pups.push(new Powerup(px, py, pSize, PupType[pKey]));
  }

}
/*
function updatePaddle(delta) {

    // handle touch
    if (touchX != null) {
        if (touchX > paddle.x + wall) {
            movePaddle(Direction.RIGHT);
        } else if (touchX < paddle.x - wall) {
            movePaddle(Direction.LEFT);
        } else {
            movePaddle(Direction.STOP);
        }
    }

    // move the paddle
    let lastPaddleX = paddle.x;
    paddle.x += paddle.xv * delta;

    // stop paddle at walls
    if (paddle.x < wall + paddle.w * 0.5) {
        paddle.x = wall + paddle.w * 0.5;
    } else if (paddle.x > width - wall - paddle.w * 0.5) {
        paddle.x = width - wall - paddle.w * 0.5;
    }

    // move the stationary ball with the paddle
    if (ball.yv === 0) {
        ball.x += paddle.x - lastPaddleX;
    }

    // collect powerups
    for (let i = pups.length - 1; i >= 0; i--) {
        if (
            pups[i].x + pups[i].w * 0.5 > paddle.x - paddle.w * 0.5
            && pups[i].x - pups[i].w * 0.5 < paddle.x + paddle.w * 0.5
            && pups[i].y + pups[i].h * 0.5 > paddle.y - paddle.h * 0.5
            && pups[i].y - pups[i].h * 0.5 < paddle.y + paddle.h * 0.5
        ) {
            switch(pups[i].type) {
                case PupType.EXTENSION:
                    // double the width of the paddle
                    if (pupExtension) {
                        score += PUP_BONUS;
                    } else {
                        pupExtension = true;
                        paddle.w *= 2;
                    }
                    break;
                case PupType.LIFE:
                    // add a life
                    lives++;
                    break;
                case PupType.STICKY:
                    if (pupSticky) {
                        score += PUP_BONUS;
                    } else {
                        pupSticky = true;
                    }
                    break;
                case PupType.SUPER:
                    if (pupSuper) {
                        score += PUP_BONUS;
                    } else {
                        pupSuper = true;
                    }
                    break;
            }
            pups.splice(i, 1);
            fxPowerup.play();
        }
    }
}

function updatePups() {
    for (let i = pups.length - 1; i >= 0; i--) {
        pups[i].y += pups[i].speed;

        // delete off-screen pups
        if (pups[i].y - pups[i].h * 0.5 > height) {
            pups.splice(i, 1);
        }
    }
}







*/
////////////////////////////////
var heightPrizes = 16;

function drawPrize(prize, c, r) {
  var x = bricks[c][r],
      y = bricks[c][r],
      width = 32,
      height = 16,
      color = 'yellow',
      speed = 0.15 * height;
  ctx.save();
  ctx.translate(x,y);
  ctx.beginPath();
  var grad = ctx.createLinearGradient(0,0,0, height);
  grad.addColorStop(0, 'red');
  grad.addColorStop(0.2, 'white');
  grad.addColorStop(0.4, 'grey');
  grad.addColorStop(1, 'black');
  ctx.fillStyle = color;
  ctx.arc(height / 2, height / 2, height / 2, Math.PI / 2, Math.PI * 3 / 2);
  ctx.lineTo(width - height / 2, 0);
  ctx.arc(width - height / 2, height / 2, height / 2, Math.PI *3 / 2, Math.PI / 2);
  ctx.lineTo(height / 2, height);
  ctx.fill();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.translate(x,  y + 5);
  ctx.fillStyle = 'yellow';
  ctx.restore();
  //levitate();
  //x -= dx;
 // y -= dy;
  //requestAnimationFrame(drawPrize);


}
/*
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

function bounce(timeFraction) {
  for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

function levitate(progress) {

  var heightLev = -10; //alert(paddleHeight - heightPrizes);
  var width = 100;

  //animate({
  // duration: 2000,
    timing: makeEaseOut(bounce),
 //   function drawLevitate(progress) {
      prizes.style.top = height   progress + 'px'
   // }
  //})
 }

function move() {
  y += dy;
  if (bottom >= this.game.bate.y &&
      this.y <= this.game.bate.bottom &&
      this.right > this.game.bate.x && this.x < this.game.bate.right) {
    if (this.game.activePowerup != this.constructor) {
      this.activate();
    }
    this.die();
  }
  if (this.y > this.game.height) {
    this.die();
  }
activate();
}
*/