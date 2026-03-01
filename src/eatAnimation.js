export class EatAnimation{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.maxFrame = 6; 
    }

    update(){
        this.frame++;
    }

    isTime(){
        return this.frame > this.maxFrame;
    }
}