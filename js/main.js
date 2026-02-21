import { grow, changeDirection, move, snake } from "./snake.js";
import { GRID_SIZE, TILE_SIZE } from "./data.js";
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.height = GRID_SIZE * TILE_SIZE;
canvas.width = GRID_SIZE * TILE_SIZE;

document.addEventListener("keydown", (e) =>{
    console.log(e.key);
    changeDirection(e.key);
})

function drawSnake(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(element => {
        ctx.fillStyle = "green",
        ctx.fillRect(element.x * TILE_SIZE, element.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
    ctx.fillStyle = "lightgreen",
    ctx.fillRect(snake[0].x * TILE_SIZE, snake[0].y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

setInterval(() =>{
    move();
    drawSnake();
}, 500);
