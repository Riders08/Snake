export class Speed{
    constructor(speed){
        this.speed = speed;
        this.defaultSpeed = speed;
    }

    speedBoost(){
        const actual_speed = this.speed;
        if(!(this.speed - 3 < 0)){
            this.speed = actual_speed - 3;
        }
    }
    
    restartSpeed(){
        this.speed = this.defaultSpeed;
    }
}