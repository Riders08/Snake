export const GRID_SIZE = 20;
export const TILE_SIZE = 20;
export let speed = 200;


export function getRandomInt(min, max){
    return Math.floor(Math.random() * ((max -min)+1))+ min;
}


export function speedBoost(){
    const actual_speed = speed;
    speed = actual_speed - 5;
}

export function restartSpeed(){
    speed = 200;
}