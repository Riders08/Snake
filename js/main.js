import { grow, changeDirection, move, snake, biteTail, restartSnake } from "./snake.js";
import { apple, bonus_apple, dropAppleBonus, generateApple, deleteAppleBonus, isEaten, restartApple, isEatenBonus } from "./food.js";
import { GRID_SIZE, TILE_SIZE, restartSpeed, speed, pause, stopGame, reloadGame } from "./data.js";
import { restartScore, saveBestScore, scoreElement } from "./point.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.height = GRID_SIZE * TILE_SIZE;
canvas.width = GRID_SIZE * TILE_SIZE;

const Images = {
    "normal": new Image(),
    "second": new Image(),
    "quadruple": new Image(),
    "gold": new Image(),
}

Images.normal.src = "../Image/apple.png";
Images.second.src = "../Image/second_apple.png";
Images.quadruple.src = "../Image/quadruple_apple.png";
Images.gold.src = "../Image/golden_apple.png";

// View
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    if(bonus_apple.actual){
        drawAppleBonus();
    }
} // Affichage du jeu

function drawSnake(){
ctx.shadowBlur = 15;
    ctx.shadowColor = "#00FF00";

    snake.forEach((element, head) => {
        const radius = TILE_SIZE / 2;
        
        const centerX = element.x * TILE_SIZE + radius;
        const centerY = element.y * TILE_SIZE + radius;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        
        const intensity = 255 - (10 * head);
        const green = Math.max(0,intensity);
        if(head === 0){
            ctx.fillStyle = "lightgreen"; // tête
        } else {
            ctx.fillStyle = `rgb(0,${green},0)`; // corps
        }
        
        ctx.fill();
    });
    ctx.shadowBlur = 0;
} // Affichage du serpent

function drawApple(){
    ctx.drawImage(Images[apple.src], apple.x * TILE_SIZE, apple.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
} // Affichage de la pomme

function drawAppleBonus(){
    ctx.drawImage(Images[bonus_apple.src], bonus_apple.x * TILE_SIZE, bonus_apple.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
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
    if(pause){
        return;
    }
    move();
    if(isEaten()){
        grow(apple);
        generateApple();
        dropAppleBonus();
        updateSpeed();
    }
    if(isEatenBonus()){
        grow(bonus_apple);
        deleteAppleBonus();
        updateSpeed();
    }
    if(biteTail()){
        gameOver();
        saveBestScore(scoreElement);
        return;
    }
    if(bonus_apple.actual){
        bonus_apple.timeLeft--;
        if(bonus_apple.timeLeft <= 0){
            deleteAppleBonus();
        }
    }
    draw();
} // Fonction qui sert la boucle du jeu (le main)

function gameOver(){
    clearInterval(game_interval);
    document.getElementById("lose").classList.remove("game_over");
        
} // Cas de défaite

document.addEventListener("keydown",(e) =>{
    if(e.key == "p" && pause){
        reloadGame();
    }else if(e.key == "p"){
        stopGame();
    }
}); // Evenement qui gére la pause du jeu'(version clavier)
document.querySelector(".pause_game").addEventListener("click",(e) =>{
    if(pause){
        reloadGame();
    }else{
        stopGame();
    }
}); // Evenement qui gére la pause du jeu 

function restartGame(){
    restartSnake();
    restartApple();
    restartScore();
    restartSpeed();
    startGame();
    document.getElementById("lose").classList.add("game_over");
} // Fonction qui reset la partie  
document.querySelector(".restart").addEventListener("click", restartGame);
// Evenement du relancement d'une partie

startGame(); // Lancement du jeu
