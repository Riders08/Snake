import { GRID_SIZE } from "./data.js";
import { getRandomInt } from "./data.js";

let head = {
    x: getRandomInt(GRID_SIZE/4,(GRID_SIZE-5)-1), 
    y: getRandomInt(GRID_SIZE/4,(GRID_SIZE-5)-1)
}

export const snake = [
    head,
    {x: (head.x - 1), y: head.y},
    {x: (head.x - 2), y: head.y}
];

let direction = {
    x: 1, 
    y: 0
};

export function move(){
    const newHead ={
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    }
    if(newHead.x < 0){
        newHead.x = GRID_SIZE-1;
    }else if(newHead.x >= GRID_SIZE){
        newHead.x = 0;
    }else if(newHead.y < 0){
        newHead.y = GRID_SIZE-1;
    }else if(newHead.y >= GRID_SIZE){
        newHead.y = 0;
    }
    snake.unshift(newHead);
    snake.pop();
}

export function grow(){
    const newHead ={
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    }
    snake.unshift(newHead);
}

export function changeDirection(key){
    let actual_direction = direction;
    switch(key){
        case "ArrowLeft":
            if(actual_direction.x == 1 &&  actual_direction.y == 0){
                break;
            }
            direction = {x: -1, y: 0};
            break;
        case "ArrowRight":
            if(actual_direction.x == -1 &&  actual_direction.y == 0){
                break;
            }
            direction = {x: 1, y: 0};
            break;
        case "ArrowUp":
            if(actual_direction.x == 0 &&  actual_direction.y == 1){
                break;
            }
            direction = {x: 0, y: -1};
            break;
        case "ArrowDown":
            if(actual_direction.x == 0 &&  actual_direction.y == -1){
                break;
            }
            direction = {x: 0, y: 1};
            break;
        default: 
            direction; 
    }
}