export const GRID_SIZE = 20;
export const TILE_SIZE = 20;
export let speed = 200;
export let pause = false;


export function getRandomInt(min, max){
    return Math.floor(Math.random() * ((max -min)+1))+ min;
}// Fonction qui génére un entier aléatoire


export function speedBoost(){
    const actual_speed = speed;
    speed = actual_speed - 5;
}// Fonction qui boost la vitesse

export function restartSpeed(){
    speed = 200;
}// Fonction qui remet la vitesse par défaut

export function setStatePause(){
    if(pause){
        pause = false;
    }else{
        pause = true;
    }
}