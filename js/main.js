import { grow, changeDirection, move, snake, biteTail } from "./snake.js";
import { apple, generateApple, isEaten } from "./food.js";
import { GRID_SIZE, TILE_SIZE } from "./data.js";
import { saveBestScore, scoreElement } from "./point.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.height = GRID_SIZE * TILE_SIZE;
canvas.width = GRID_SIZE * TILE_SIZE;

const img = new Image();
img.src = "../Image/apple.png";

const speed = 200;

document.addEventListener("keydown", (e) =>{
    changeDirection(e.key);
})

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
}

function drawSnake(){
    snake.forEach(element => {
        ctx.fillStyle = "green",
        ctx.fillRect(element.x * TILE_SIZE, element.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
    ctx.fillStyle = "lightgreen",
    ctx.fillRect(snake[0].x * TILE_SIZE, snake[0].y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawApple(){
    ctx.drawImage(img, apple.x * TILE_SIZE, apple.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
}

let game_interval = setInterval(gameLoop,speed);

function gameLoop(){
    move();
    if(isEaten()){
        grow();
        generateApple();
    }
    if(biteTail()){
        gameOver();
        saveBestScore(scoreElement);
        return;
    }
    draw();
}

function gameOver(){
    clearInterval(game_interval);
    console.log("YOU LOSE!");
}

