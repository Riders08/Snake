import { getRandomInt, GRID_SIZE } from "./data.js";
import { snake } from "./snake.js";

export let apple = {
    x: getRandomInt(0, GRID_SIZE-1),
    y: getRandomInt(0, GRID_SIZE-1)
}

snake.forEach(element =>{
    if(element.x == apple.x && element.y == apple.y){
        generateApple();
    }
})

export function isEaten(){
    return snake[0].x == apple.x && snake[0].y == apple.y;
}

export function generateApple(){
    let ready = false;
    while(!ready){
        apple = {
            x: getRandomInt(0, GRID_SIZE-1),
            y: getRandomInt(0, GRID_SIZE-1)
        }
        snake.forEach(element =>{
            if(element.x == apple.x && element.y == apple.y){
                return false;
            }
        });
        return true;
    }
}
