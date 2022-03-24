const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//the initial score set to zero
let score = 0;

//constants to show the brick row count and the brick column count
const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500;

//creating the ball,the size and visibility
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    visible: true
  };
  //the paddle for the ball to land on
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true
  };

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
  };

//setting an empty array for storing data from the bricks
const bricks = [];
  for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
      const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
      bricks[i][j] = { x, y, ...brickInfo };
    }
  }

  //a function for drawing the ball to the canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
}
//a function for drawing the paddle on the canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
}
//drawing the score on the canvas
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}
//a function to draw the bricks on the canvas
function drawBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        ctx.fill();
        ctx.closePath();
      });
    });
  }

  //moving the paddle on the canvas when played
function movePaddle() {
    paddle.x += paddle.dx;
  
    // detecting the walls of the canvas
    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
    }
    //checking the value of x(the width)
    if (paddle.x < 0) {
      paddle.x = 0;
      }
  }

  //moving the ball on the canvas
function moveBall() {
    ball.x += ball.dx;//the width
    ball.y += ball.dy;//the height
  
    // Wall collision (right/left)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1; // ball.dx = ball.dx * -1
    }
  
    // Wall collision (top/bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }
}

//console.log(ball.x, ball.y) that is the width and the height
//for loop for paddle collision
if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
}

//a function checking the brick collision
bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  //function for when the ball hits the bottom wall -Lose the game
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }

  //increasing the score when the conditions are met
function increaseScore() {
    score++;
  
    if (score % (brickRowCount * brickColumnCount) === 0) {
  
        ball.visible = false;
        paddle.visible = false;
  
        //After 0.5 sec restart the game
        setTimeout(function () {
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        },delay)
    }
  }
  
  //showing all the bricks when the player looses
function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
  }
  
  // Drawing everything back to begin the game
function draw() {
    // clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
  }

  //updating the canvas drawings and animations for the game to begin
function update() {
    movePaddle();
    moveBall();
  
    // Drawing everything
    draw();
  
    requestAnimationFrame(update);
  }
  
  update();
  
//adding a keydown event
function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }
  }
  
  // adding a keyup event
function keyUp(e) {
    if (
      e.key === 'Right' ||
      e.key === 'ArrowRight' ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      paddle.dx = 0;
    }
  }
  
  // Keyboard event handlers
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
  
  // Rules and close event handlers
  rulesBtn.addEventListener('click', () => rules.classList.add('show'));
  closeBtn.addEventListener('click', () => rules.classList.remove('show'));