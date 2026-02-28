export class Score{
    constructor(combo, actual_score){
        this.combo = combo;
        this.actual_score = actual_score;
        this.best_score = (parseInt(localStorage.getItem("bestScore")) || 0);
    }

    restartScore(){
        this.combo = 0;
        this.actual_score = 0;
    }

    increase(easyMode, point){
        let total_point = 0;
        if(easyMode){
            total_point = 2*point;
        }else{
            total_point = point;
        }
        this.actual_score += total_point;
        this.combo++;
    }

    saveBestScore(){
        return localStorage.setItem("bestScore",this.best_score);
    }

    update(){
        if(this.actual_score > this.best_score){
            this.best_score = this.actual_score;
        }
    }
}