import { getPoints } from "./main.js";

export let scoreElement = document.getElementById("score");

let bestScoreElement = document.getElementById("best_score");
let save_best_score =  parseInt(localStorage.getItem("bestScore"));

bestScoreElement.innerHTML = checkBestScore();

function max(a, b){
    if(a > b){
        return a;
    }
    else{
        return b;
    }
}

export function checkBestScore(){
    return max(save_best_score, parseInt(bestScoreElement.innerHTML));
}

export function increase(){
    const actual_score = parseInt(scoreElement.innerHTML)
    if(scoreElement.innerHTML == 0){
        scoreElement.innerHTML = getPoints();
    }else{
        scoreElement.innerHTML = getPoints() + actual_score ;
    }
}//Fonction qui augmente le score

export function restartScore(){
    scoreElement.innerHTML = 0;
}// Fonction qui reinitialise le score

export function saveBestScore(score_game){
    if(parseInt(bestScoreElement.innerHTML) <= parseInt(score_game.innerHTML) ){
        bestScoreElement.innerHTML = score_game.innerHTML;
        localStorage.setItem("bestScore",bestScoreElement.innerHTML);
    }
}// Fonction qui verifie et definie le meilleur score atteint