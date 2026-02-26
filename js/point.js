export let scoreElement = document.getElementById("score");

let bestScoreElement = document.getElementById("best_score");
let save_best_score =  parseInt(localStorage.getItem("bestScore"));

let comboElement = document.getElementById("combo");
bestScoreElement.innerHTML = checkBestScore();

function max(a, b){
    if(a > b){
        return a;
    }
    else{
        return b;
    }
}//Renvoie le plus grand nombre entre deux nombres placées en argument

export function checkBestScore(){
    return max(save_best_score, parseInt(bestScoreElement.innerHTML));
}//Renvoi le max entre le score atteint par le joueur et le meilleur score enregistrer

export function increase(point){
    const actual_score = parseInt(scoreElement.innerHTML)
    if(scoreElement.innerHTML == 0){
        scoreElement.innerHTML = point;
        comboElement.innerHTML++;
    }else{
        scoreElement.innerHTML = point + actual_score ;
        comboElement.innerHTML++;
    }
}//Fonction qui augmente le score

export function restartScore(){
    scoreElement.innerHTML = 0;
    comboElement.innerHTML = 0;
}// Fonction qui reinitialise le score

export function saveBestScore(score_game){
    if(parseInt(bestScoreElement.innerHTML) <= parseInt(score_game.innerHTML) ){
        bestScoreElement.innerHTML = score_game.innerHTML;
        localStorage.setItem("bestScore",bestScoreElement.innerHTML);
    }
}// Fonction qui verifie et definie le meilleur score atteint