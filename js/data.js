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

export function stopGame(affichage_pause){
    affichage_pause.innerHTML = `<i class="fa-solid fa-play"></i>`;
    pause = true;
}// Fonction qui met le jeu en pause

export function reloadGame(affichage_pause){
    affichage_pause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    pause = false;
}// Fonction qui relance le jeu qui était en pause
