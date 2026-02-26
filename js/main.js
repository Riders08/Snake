import { grow, changeDirection, move, snake, biteTail, restartSnake } from "./snake.js";
import { apple, bonus_apple, dropAppleBonus, generateApple, deleteAppleBonus, isEaten, restartApple, isEatenBonus, eatAnimation, deleteAnimationEat, activeAnimationEat } from "./food.js";
import { GRID_SIZE, TILE_SIZE, restartSpeed, speed, pause, stopGame, reloadGame } from "./data.js";
import { restartScore, saveBestScore, scoreElement } from "./point.js";

export let affichage_pause = document.getElementById("affichage");


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
    if(eatAnimation.active){
        drawEatAnimation();
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
        if(darkMode){
            const intensity = 0 + (10 * head);
            const green = Math.max(0,intensity);
            if(head === 0){
                ctx.fillStyle = "rgb(0, 139, 35)"; // tête
            } else{
                ctx.fillStyle = `rgb(0,${green},0)`; // corps
            }
        }else{
            const intensity = 255 - (10 * head);
            const green = Math.max(0,intensity);
            if(head === 0){
                ctx.fillStyle = "lightgreen"; // tête
            } else {
                ctx.fillStyle = `rgb(0,${green},0)`; // corps
            }
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

function drawEatAnimation(){
    let radius = TILE_SIZE/2 + eatAnimation.frame * 2;
    let opacity = 1 - (eatAnimation.frame / eatAnimation.maxFrame);
    const centerX = eatAnimation.x * TILE_SIZE + TILE_SIZE/2;
    const centerY = eatAnimation.y * TILE_SIZE + TILE_SIZE/2;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,0,${opacity})`;
    ctx.fill();
}// Affichage de l'animation de la pomme mangé

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
        activeAnimationEat(apple);
        generateApple();
        dropAppleBonus();
        updateSpeed();
    }
    if(isEatenBonus()){
        grow(bonus_apple);
        activeAnimationEat(bonus_apple);
        deleteAppleBonus();
        updateSpeed();
    }
    if(eatAnimation.active){
        eatAnimation.frame++;
        if(eatAnimation.frame > eatAnimation.maxFrame){
            deleteAnimationEat();
        }
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


function restartGame(){
    clearInterval(game_interval)
    restartSnake();
    restartApple();
    deleteAppleBonus();
    restartScore();
    restartSpeed();
    reloadGame(affichage_pause);
    startGame();
    document.getElementById("lose").classList.add("game_over");
} // Fonction qui reset la partie  

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown",(e) =>{
        if(e.key == "p" && pause){
            reloadGame(affichage_pause);
        }else if(e.key == "p"){
            stopGame(affichage_pause);
        }
    }); // Evenement qui gére la pause du jeu'(version clavier)
    document.querySelector(".pause_game").addEventListener("click",(e) =>{
        if(pause){
            reloadGame(affichage_pause);
        }else{
            stopGame(affichage_pause);
        }
    }); // Evenement qui gére la pause du jeu 

    document.querySelector(".restart").addEventListener("click", restartGame);
    document.querySelector(".new_game").addEventListener("click", restartGame);
    // Evenement du relancement d'une partie
});

startGame(); // Lancement du jeu

let darkMode = localStorage.getItem("darkmode") === "false";
let theme = document.querySelector(".switch_input");
theme.checked = darkMode;
applyTheme(darkMode);

theme.addEventListener("change", (e)=>{
    const is_dark = theme.checked  ;
    darkMode = is_dark;
    localStorage.setItem("darkmode",is_dark);
    applyTheme(is_dark);
})

function applyTheme(isDark){
    if(isDark){
        document.documentElement.style.setProperty('--background','black');
        document.documentElement.style.setProperty('--ecriture','hsla(0, 0%, 0%, 1)');
        document.documentElement.style.setProperty('--ecriture-score','white');
        document.documentElement.style.setProperty('--background-score','black');
        document.documentElement.style.setProperty('--game-contour','white');  
        document.documentElement.style.setProperty('--game-shadow','white');
        document.documentElement.style.setProperty('--background-game','#e6e3e3');
        document.documentElement.style.setProperty('--background-header-primary','rgb(28, 250, 28)');
        document.documentElement.style.setProperty('--background-header-second','rgb(18, 119, 9)');
        document.documentElement.style.setProperty('--new_game','black');
        document.documentElement.style.setProperty('--background-pause','rgb(17,19,19)');
        document.documentElement.style.setProperty('--color-pause','white');
        document.documentElement.style.setProperty('--theme-logo','-8px 8px 3px -1px rgb(5, 7, 116)');
    }else{
        document.documentElement.style.setProperty('--background','white');
        document.documentElement.style.setProperty('--ecriture','rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--ecriture-score','black');
        document.documentElement.style.setProperty('--background-score','white');
        document.documentElement.style.setProperty('--game-contour','black');
        document.documentElement.style.setProperty('--game-shadow','black');
        document.documentElement.style.setProperty('--background-game','#222');
        document.documentElement.style.setProperty('--background-header-primary','rgb(18, 119, 9)');
        document.documentElement.style.setProperty('--background-header-second','rgb(28, 250, 28)');
        document.documentElement.style.setProperty('--new_game','white');
        document.documentElement.style.setProperty('--background-pause','rgb(238,236,236)');
        document.documentElement.style.setProperty('--color-pause','black');
        document.documentElement.style.setProperty('--theme-logo','8px 8px 3px -1px rgb(216, 147, 19)');
    }
}