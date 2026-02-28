export class EatAnimation{
    constructor(x, y, frame, maxFrame){
        this.x = x;
        this.y = y;
        this.frame = frame;
        this.maxFrame = maxFrame; 
    }

    update(){
        this.frame++;
    }

    isTime(){
        return this.frame > this.maxFrame;
    }
}