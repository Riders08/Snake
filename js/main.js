import { grow, changeDirection, move, snake, biteTail, restartSnake } from "./snake.js";
import { apple, generateApple, isEaten } from "./food.js";
import { GRID_SIZE, TILE_SIZE, restartSpeed, speed, pause, setStatePause } from "./data.js";
import { restartScore, saveBestScore, scoreElement } from "./point.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.height = GRID_SIZE * TILE_SIZE;
canvas.width = GRID_SIZE * TILE_SIZE;

const img = new Image();
img.src = "../Image/apple.png";

// View
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
} // Affichage du jeu

function drawSnake(){
    snake.forEach(element => {
        ctx.fillStyle = "green",
        ctx.fillRect(element.x * TILE_SIZE, element.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
    ctx.fillStyle = "lightgreen",
    ctx.fillRect(snake[0].x * TILE_SIZE, snake[0].y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
} // Affichage du serpent

function drawApple(){
    ctx.drawImage(img, apple.x * TILE_SIZE, apple.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
} // Affichage de la pomme


// Controller

document.addEventListener("keydown", (e) =>{
    changeDirection(e.key);
}) // Commande de contrôle

let game_interval; // Interval du jeu

function startGame(){
    game_interval = setInterval(gameLoop,speed);
} // Création du jeu de base

function updateSpeed(){
    clearInterval(game_interval);
    game_interval = setInterval(gameLoop, speed);
} // Mise a jour de la vitesse

function gameLoop(){
    move();
    if(isEaten()){
        grow();
        generateApple();
        updateSpeed();
    }
    if(biteTail()){
        gameOver();
        saveBestScore(scoreElement);
        return;
    }
    draw();
} // Fonction qui sert la boucle du jeu (le main)

function gameOver(){
    clearInterval(game_interval);
    document.getElementById("lose").classList.remove("game_over");
        
} // Cas de défaite

document.querySelector(".pause_game").addEventListener("click",(e) =>{
    if(pause){
        reloadGame();
    }else{
        stopGame();
    }
}); // Evenement qui gére la pause du jeu 

function stopGame(){
    setStatePause();
    clearInterval(game_interval);
}// Fonction qui met le jeu en pause

function reloadGame(){
    setStatePause();
    setInterval(gameLoop,speed)
}// Fonction qui relance le jeu qui était en pause

function restartGame(){
    restartSnake();
    generateApple();
    restartScore();
    restartSpeed();
    startGame();
    document.getElementById("lose").classList.add("game_over");
} // Fonction qui reset la partie  
document.querySelector(".restart").addEventListener("click", restartGame);
// Evenement du relancement d'une partie

startGame(); // Lancement du jeu
