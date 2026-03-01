import Game from "./Game.js";
import { GRID_SIZE, TILE_SIZE } from "./tools.js";


let mode_difficult = document.getElementById("mode");
let affichage_pause = document.getElementById("affichage");

export let scoreElement = document.getElementById("score");// Game
export let bestScoreElement = document.getElementById("best_score");// Game
export let comboElement = document.getElementById("combo");// Main


let pause = false;
function stopGame(affichage_pause){
    affichage_pause.innerHTML = `<i class="fa-solid fa-play"></i>`;
    pause = true;
    game.pause = true;
}

function reloadGame(affichage_pause){
    affichage_pause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    pause = false;
    game.pause = false;
}

let easyMode = false;
function setModeEasy(){
    mode_difficult.innerHTML = `Mode Normal`;
    easyMode = true;
    game.easyMode = true;
}

function setModeNormal(){
    mode_difficult.innerHTML = `Mode Facile`;
    easyMode = false;
    game.easyMode = false;
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (e) =>{
        game.snake.changeDirection(e.key);
    });
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

    document.querySelector(".restart").addEventListener("click", restart);
    document.querySelector(".new_game").addEventListener("click", restart);
    document.querySelector(".mode_difficult").addEventListener("click", (e) =>{
        if(easyMode){
            setModeNormal();
        }else{
            setModeEasy();
        }
        restart();
    })
});

function restart(){
    clearInterval(game_interval);
    game.restartGame();
    reloadGame(affichage_pause);
    document.getElementById("lose").classList.add("game_over");
    game_interval = setInterval(gameLoop, game.speed.defaultSpeed);
}

function updateSpeed(){
    clearInterval(game_interval);
    game_interval = setInterval(gameLoop, game.speed.speed);
}


const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.height = GRID_SIZE * TILE_SIZE;
canvas.width = GRID_SIZE * TILE_SIZE;



//Partie Theme Switch 
let darkMode = localStorage.getItem("darkmode") === "false";
let theme = document.querySelector(".switch_input");
theme.checked = darkMode;
applyTheme(darkMode);

theme.addEventListener("change", (e)=>{
    const is_dark = theme.checked  ;
    darkMode = is_dark;
    game.darkMode = is_dark;
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

const game = new Game(canvas.width, canvas.height);

game.easyMode = easyMode;
game.darkMode = darkMode;
game.pause = pause;

let actual_speed = game.speed.speed

function gameLoop(){
    game.update();
    if(actual_speed != game.speed.speed){
        updateSpeed();
    }
    if(game.lose){
        clearInterval(game_interval);
        reloadGame(affichage_pause);
        document.getElementById("lose").classList.remove("game_over");
    }
    game.draw(ctx);
}

let game_interval = setInterval(gameLoop, game.speed.speed);
