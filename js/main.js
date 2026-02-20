import { grow, changeDirection, move, snake } from "./snake";
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

export const GRID_SIZE = 20;
const TILE_SIZE = 20;

canvas.height = GRID_SIZE * TILE_SIZE;
canvas.width = GRID_SIZE * TILE_SIZE;

snake.forEach(element => {
    ctx.fillStyle = "green",
    ctx.fillRect(element.x * TILE_SIZE, element.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
});