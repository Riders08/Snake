export const GRID_SIZE = 20;
export const TILE_SIZE = 20;

export const Images = [
    {src:"normal",point: 1},
    {src:"second",point: 2},
    {src:"quadruple",point: 4},
    {src:"gold",point: 10},
]

export const IMAGES = {
    "normal": new Image(),
    "second": new Image(),
    "quadruple": new Image(),
    "gold": new Image(),
}

IMAGES.normal.src = "../Image/apple.png";
IMAGES.second.src = "../Image/second_apple.png";
IMAGES.quadruple.src = "../Image/quadruple_apple.png";
IMAGES.gold.src = "../Image/golden_apple.png";


export function getRandomInt(min, max){
    return Math.floor(Math.random() * ((max -min)+1))+ min;
}// Fonction qui génére un entier aléatoire
