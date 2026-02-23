export let scoreElement = document.getElementById("score");
const bestScore = localStorage.getItem("bestScore");
export let bestScoreElement = bestScore;

export function increase(combo){
    const actual_score = parseInt(scoreElement.innerHTML)
    if(scoreElement.innerHTML == 0){
        scoreElement.innerHTML = combo;
    }else{
        scoreElement.innerHTML = combo + actual_score ;
    }
}//Fonction qui augmente le score

export function restartScore(){
    scoreElement.innerHTML = 0;
}// Fonction qui reinitialise le score

export function saveBestScore(score_game){
    if(bestScoreElement.innerHTML <= score_game.innerHTML ){
        bestScoreElement.innerHTML = score_game.innerHTML;
        bestScore = localStorage.setItem("bestScore",bestScoreElement.innerHTML);
    }else{
        console.log("Le records n'a pas été battu.");
    }
}// Fonction qui verifie et definie le meilleur score atteint