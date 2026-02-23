export let scoreElement = document.getElementById("score");
export let bestScoreElement = document.getElementById("best_score");

export function increase(combo){
    const actual_score = parseInt(scoreElement.innerHTML)
    if(scoreElement.innerHTML == 0){
        scoreElement.innerHTML = combo;
    }else{
        scoreElement.innerHTML = combo + actual_score ;
    }
    console.log(scoreElement.innerHTML);
}

export function saveBestScore(score_game){
    if(bestScoreElement.innerHTML <= score_game.innerHTML ){
        bestScoreElement.innerHTML = score_game.innerHTML;
    }else{
        console.log("Le records n'a pas été battu.");
    }
}