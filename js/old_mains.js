function gameLoop(){
    if(isEaten()){
        activeAnimationEat(apple);
        
    }
    if(isEatenBonus()){
        activeAnimationEat(bonus_apple);
        
    }
    if(eatAnimation.active){
        eatAnimation.frame++;
        if(eatAnimation.frame > eatAnimation.maxFrame){
            deleteAnimationEat();
        }
    }

    
} 


export function activeAnimationEat(apple_eat){
    eatAnimation = {
        active : true,
        frame : 0,
        maxFrame : 6,
        x : apple_eat.x,
        y : apple_eat.y
    }
}// OK


export function deleteAnimationEat(){
    eatAnimation = {
        active : false,
        frame : 0,
        maxFrame : 6,
        x : null,
        y : null
    }
}// OK
