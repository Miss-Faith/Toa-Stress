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
  