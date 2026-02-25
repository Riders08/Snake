import { GRID_SIZE, getRandomInt, speedBoost } from "./data.js";
import { increase } from "./point.js";

export let snake = newSnake();

let direction = {
    x: 1, 
    y: 0
};

function newSnake(){
    let New_head = {
        x: getRandomInt(GRID_SIZE/4,(GRID_SIZE-5)-1), 
        y: getRandomInt(GRID_SIZE/4,(GRID_SIZE-5)-1)
    }
    
    return [
    New_head,
        {x: (New_head.x - 1), y: New_head.y},
        {x: (New_head.x - 2), y: New_head.y}
    ];
}

export function restartSnake(){
    direction = {
        x: 1, 
        y: 0
    };
    snake = newSnake();
}// Réinitialise la taille du serpent + sa direction

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
}// Déplacement du serpent

export function grow(apple){
    const newHead ={
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    }
    snake.unshift(newHead);
    increase(apple.point);
    speedBoost();
} // Fonction qui fait grandir le serpent + sa vitesse

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
}// Fonction qui permet de changer la direction du serpent

export function biteTail(){
    let head = snake[0];
    return snake.slice(1).some(element =>
        element.x == head.x && element.y == head.y
    );
}// Fonction qui verifie si le serpent s'est mordue la queue