export class AppleBonus{
    constructor(apple, timeLeft){
        this.apple = apple;
        this.timeLeft = timeLeft;
    }

    update(){
        this.timeLeft--;
    }

    isExpired(){
        return this.timeLeft <= 0;
    }
}