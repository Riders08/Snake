import { GRID_SIZE } from "./main";

head = {
    x: getRandomInt(GRID_SIZE/4,GRID_SIZE-5), 
    y: getRandomInt(GRID_SIZE/4,GRID_SIZE-5)
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

function getRandomInt(min, max){
    return Math.floor(Math.random() * ((max -min)+1))+ min;
}

export function changeDirection(key){
    switch(key){
        case "ArrowLeft":
            direction = {x: -1, y: 0};
            break;
        case "ArrowRight":
            direction = {x: 1, y: 0};
            break;
        case "ArrowUp":
            direction = {x: 0, y: 1};
            break;
        case "ArrowDown":
            direction = {x: 0, y: -1};
            break;
        default: 
            direction; 
    }
}