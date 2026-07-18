const road = document.getElementById("road");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");

let keys = {
  ArrowLeft: false,
  ArrowRight: false
};

let playerX = 175;
let speed = 6;
let score = 0;
let running = false;
let enemyCars = [];
let roadOffset = 0;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !running) {
    startGame();
  }

  if (e.key in keys) {
    keys[e.key] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key in keys) {
    keys[e.key] = false;
  }
});

function startGame() {
  running = true;
  score = 0;
  speed = 6;
  playerX = 175;

  scoreEl.innerText = 0;
  startScreen.classList.add("hide");
  gameOver.classList.add("hide");

  enemyCars.forEach(c => c.remove());
  enemyCars = [];

  player.style.left = playerX + "px";

  for (let i = 0; i < 4; i++) {
    createEnemy(-i * 180);
  }

  requestAnimationFrame(gameLoop);
}

function createEnemy(y) {

  const car = document.createElement("div");

  car.className = "enemy";

  const lanes = [70, 130, 190, 250];

  car.x = lanes[Math.floor(Math.random() * lanes.length)];

  car.y = y;

  car.style.left = car.x + "px";

  car.style.top = car.y + "px";

  road.appendChild(car);

  enemyCars.push(car);

}

function moveEnemies() {

  enemyCars.forEach(car => {

    car.y += speed;

    if (car.y > 720) {

      car.y = -150;

      const lanes = [70,130,190,250];

      car.x = lanes[Math.floor(Math.random()*lanes.length)];

      car.style.left = car.x + "px";

      score++;

      scoreEl.innerText = score;

      if(score%10===0){

        speed+=0.5;

      }

    }

    car.style.top = car.y + "px";

    if(checkCollision(player,car)){

      running=false;

      gameOver.classList.remove("hide");

    }

  });

}

function checkCollision(a,b){

const r1=a.getBoundingClientRect();

const r2=b.getBoundingClientRect();

return !(

r1.bottom<r2.top ||

r1.top>r2.bottom ||

r1.right<r2.left ||

r1.left>r2.right

);

}

function movePlayer(){

if(keys.ArrowLeft){

playerX-=speed;

}

if(keys.ArrowRight){

playerX+=speed;

}

if(playerX<60) playerX=60;

if(playerX>290) playerX=290;

player.style.left=playerX+"px";

}

function moveRoad(){

roadOffset+=speed;

road.style.backgroundPositionY=roadOffset+"px";

}

function gameLoop(){

if(!running) return;

moveRoad();

movePlayer();

moveEnemies();

requestAnimationFrame(gameLoop);

}
