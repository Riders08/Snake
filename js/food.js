import { getRandomInt, GRID_SIZE } from "./data.js";
import { snake } from "./snake.js";
import { scoreElement } from "./point.js";

const Images = [
    {src:"normal",point: 1},
    {src:"second",point: 2},
    {src:"quadruple",point: 4},
    {src:"gold",point: 10},
]

const defaultType = Images[0];

export let apple = defaultApple();

function defaultApple(){
    return {
        x: getRandomInt(0, GRID_SIZE-1),
        y: getRandomInt(0, GRID_SIZE-1),
        src: defaultType.src,
        point: defaultType.point
    };
}


snake.forEach(element =>{
    if(element.x == apple.x && element.y == apple.y){
        generateApple();
    }
})

export function isEaten(){
    return snake[0].x == apple.x && snake[0].y == apple.y;
}// Fonction qui check si le serpent a mangé la pomme

export function generateApple(){
    let ready = false;
    while(!ready){
        let newApple = {
            x: getRandomInt(0, GRID_SIZE-1),
            y: getRandomInt(0, GRID_SIZE-1),
        };
        const collision = snake.some(element => 
            element.x == newApple.x && element.y == newApple.y
        );
        if(!collision){
            ready = true;
            let appleType;
            let points = parseInt(scoreElement.innerHTML);
            console.log(points);
            if(points < 10){
                appleType = Images[0];
            }else if(points <= 100){
                appleType = Images[getRandomInt(0,(Images.length -2))];
            }else{
                let random = Math.random();
                if(random < 0.40){
                    appleType = Images[0];
                }else if(random < 0.90){
                    appleType = Images[getRandomInt(0,(Images.length -2))];
                }else if(random < 0.95){
                    appleType = Images[3];
                }else{
                    appleType = Images[getRandomInt(0,(Images.length -1))];
                }
            }
            apple = {
                x: newApple.x,
                y: newApple.y,
                src: appleType.src,
                point: appleType.point
            }
        }
    }
} // Fonction qui genere une pomme

export function restartApple(){
    apple = defaultApple();
}// Réinitialise la pomme par défaut
