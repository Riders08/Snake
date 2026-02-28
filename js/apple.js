import { getRandomInt, GRID_SIZE, Images } from "./tools.js";

export class Apple{
    constructor(){
        this.defaultApple();
    }

    defaultApple(){
        this.x = getRandomInt(0, GRID_SIZE-1);
        this.y = getRandomInt(0, GRID_SIZE-1);
        this.src = Images[0].src;
        this.point = Images[0].point;
    }

    isValidPosition(PositionX, PositionY){
        return !(PositionX== this.x && PositionY == this.y);
    }

    restartApple(){
        this.defaultApple();        
    }

}