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
        point: defaultType.point,
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

export function isEatenBonus(){
    return snake[0].x == bonus_apple.x && snake[0].y == bonus_apple.y;
}// Fonction qui check si le serpent a mangé la pomme bonus

export let eatAnimation = {
    active : false,
    frame : 0,
    maxFrame : 6,
    x : null,
    y : null
}

export function activeAnimationEat(apple_eat){
    eatAnimation = {
        active : true,
        frame : 0,
        maxFrame : 6,
        x : apple_eat.x,
        y : apple_eat.y
    }
}

export function deleteAnimationEat(){
    eatAnimation = {
        active : false,
        frame : 0,
        maxFrame : 6,
        x : null,
        y : null
    }
}

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
            if(points < 10){
                appleType = Images[0];
            }else if(points <= 50){
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


export function dropAppleBonus(){
    let points = parseInt(scoreElement.innerHTML);
    let random = Math.random();
    if(points >= 10 && random > 0.66 && bonus_apple.actual === false){
        generateAppleBonus();
    }
}

export function deleteAppleBonus(){
    bonus_apple = {
        x: null,
        y: null,
        src: null,
        point: null,
        actual: false,
        timeLeft: 0,
    }
}

function generateAppleBonus(){
    let ready = false;
    while(!ready){
        let newAppleBonus = {
            x: getRandomInt(0, GRID_SIZE-1),
            y: getRandomInt(0, GRID_SIZE-1),
        };
        const collision = snake.some(element => 
            (element.x == newAppleBonus.x && element.y == newAppleBonus.y) ||
            (apple.x == newAppleBonus.x && apple.y == newAppleBonus.y)
        );
        if(!collision){
            ready = true;
            let appleBonusType;
            let points = parseInt(scoreElement.innerHTML);
            if(points < 10){
                appleBonusType = Images[0];
            }else if(points <= 50){
                appleBonusType = Images[getRandomInt(0,(Images.length -2))];
            }else{
                let random = Math.random();
                if(random < 0.40){
                    appleBonusType = Images[0];
                }else if(random < 0.90){
                    appleBonusType = Images[getRandomInt(0,(Images.length -2))];
                }else if(random < 0.95){
                    appleBonusType = Images[3];
                }else{
                    appleBonusType = Images[getRandomInt(0,(Images.length -1))];
                }
            }
            bonus_apple = {
                x: newAppleBonus.x,
                y: newAppleBonus.y,
                src: appleBonusType.src,
                point: appleBonusType.point,
                actual: true,
                timeLeft: 50,
            }
        }
    }
}

export let bonus_apple = {
    x: null,
    y: null,
    src: null,
    point: null,
    actual: false,
    timeLeft: 0,
}
