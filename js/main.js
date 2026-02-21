import { grow, changeDirection, move, snake, biteTail } from "./snake.js";
import { apple, generateApple, isEaten } from "./food.js";
import { GRID_SIZE, TILE_SIZE } from "./data.js";
import { saveBestScore, scoreElement } from "./point.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.height = GRID_SIZE * TILE_SIZE;
canvas.width = GRID_SIZE * TILE_SIZE;

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
    const img = new Image();
    img.src = "../Image/apple.png";

    img.onload = function(){
        const pattern = ctx.createPattern(img, "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(apple.x * TILE_SIZE, apple.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
}

setInterval(() =>{
    move();
    draw();
    if(isEaten()){
        grow();
        generateApple();
    }
    if(biteTail()){
        console.log("YOU LOSE");
        saveBestScore(scoreElement);
    }
},50);
