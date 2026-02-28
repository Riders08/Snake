import { Snake } from "./snake.js";
import { Apple } from "./apple.js";
import { AppleBonus } from "./appleBonus.js";
import { Score } from "./score.js";
import { Speed } from "./speed.js";
import { GRID_SIZE, TILE_SIZE, getRandomInt, Images, IMAGES } from "./tools.js";

export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.snake = new Snake();
        this.apple = new Apple();
        this.appleBonus = null;
        this.score = new Score(0,0);
        this.speed = new Speed(200);
        this.collision = false;
        this.pause = false;
        this.easyMode = false;
        this.darkMode = "false";
        this.lose = false;
    }

    isEaten(){
        return this.snake.body[0].x == this.apple.x && this.snake.body[0].y == this.apple.y;
    }
    
    isEatenBonus(){
        return this.snake.body[0].x == this.appleBonus.apple.x && this.snake.body[0].y == this.appleBonus.apple.y;
    }

    isValidatePositionApple(){
        return this.snake.body.some(element => 
            element.x == this.apple.x && element.y == this.apple.y
        );
    }

    isValidatePositionAppleBonus(){
        return this.snake.body.some(element => 
            element.x == this.appleBonus.x && element.y == this.appleBonus.y
        );
    }

    generateApple(){
        let ready = false;
        while(!ready){
            this.apple.x = getRandomInt(0, GRID_SIZE-1);
            this.apple.y = getRandomInt(0, GRID_SIZE-1);
            if(!this.isValidatePositionApple()){
                ready = true;
                let appleType;
                let combo = this.score.combo;
                if(combo < 5){
                    appleType = Images[0];
                }else if(combo <= 30){
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
                this.apple.src = appleType.src;
                this.apple.point = appleType.point;
            }
        }
    }

    dropAppleBonus(){
        let points = this.score.actual_score;
        let random = Math.random();
        if(points >= 10 && random > 0.66 && this.appleBonus == null){
            this.generateAppleBonus();
        }
    }

    generateAppleBonus(){
        let time = this.easyMode ? 80 : 30;
        let ready = false;
        while(!ready){
            this.appleBonus = new AppleBonus(new Apple(), time);
            if(!this.isValidatePositionAppleBonus()){
                ready = true;
                let appleType;
                let combo = this.score.combo;
                if(combo < 5){
                    appleType = Images[0];
                }else if(combo <= 30){
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
                this.appleBonus.apple.src = appleType.src;
                this.appleBonus.apple.point = appleType.point;
            }
        }
    }

    restartCollision(){
        this.collision = false;
    }

    restartGame(){
        this.restartCollision();
        this.snake.restartSnake();
        this.apple.restartApple();
        this.appleBonus = null;
        this.score.restartScore();
        this.speed.restartSpeed();
    } 

    update(){
        if(this.pause){
            return;
        }
        this.snake.move(this.easyMode, this.collision);
        if(this.isEaten()){
            this.snake.grow();
            this.score.increase(this.easyMode, this.apple.point);
            this.score.update();
            if(!this.easyMode){
                this.speed.speedBoost();
            }
            this.generateApple();
            this.dropAppleBonus();
        }
        if(this.appleBonus != null){
            if(this.isEatenBonus()){
                this.snake.grow();
                this.score.increase(this.easyMode, this.appleBonus.point);
                if(!this.easyMode){
                    this.speed.speedBoost();
                }
                this.appleBonus = null;
            }
        }
        if(this.snake.biteTail() || this.collision){
            if(!this.easyMode){
                this.score.saveBestScore();
            }
            this.lose = true;
            return;
        }
        if(this.appleBonus != null){
            this.appleBonus.timeLeft--;
            if(this.appleBonus.timeLeft <= 0){
                this.appleBonus = null;
            }
        }
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.width, this.height);
        this.drawSnake(ctx);
        this.drawApple(ctx);
        if(this.appleBonus!=null){
            this.drawAppleBonus(ctx);
        }
        /*if(eatAnimation.active){
            drawEatAnimation(ctx);
        }*/
    } // Affichage du jeu
    
    drawSnake(ctx){
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00FF00";
    
        this.snake.body.forEach((element, head) => {
            const radius = TILE_SIZE / 2;
            
            const centerX = element.x * TILE_SIZE + radius;
            const centerY = element.y * TILE_SIZE + radius;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            if(this.darkMode){
                const intensity = 0 + (10 * head);
                const green = Math.max(0,intensity);
                if(head === 0){
                    ctx.fillStyle = "rgb(0, 139, 35)"; // tête
                } else{
                    ctx.fillStyle = `rgb(0,${green},0)`; // corps
                }
            }else{
                const intensity = 255 - (10 * head);
                const green = Math.max(0,intensity);
                if(head === 0){
                    ctx.fillStyle = "lightgreen"; // tête
                } else {
                    ctx.fillStyle = `rgb(0,${green},0)`; // corps
                }
            }
            
            ctx.fill();
        });
        ctx.shadowBlur = 0;
    } // Affichage du serpent
    
    drawApple(ctx){
        ctx.drawImage(IMAGES[this.apple.src], this.apple.x * TILE_SIZE, this.apple.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    } // Affichage de la pomme
    
    drawAppleBonus(ctx){
        ctx.drawImage(IMAGES[this.appleBonus.apple.src], this.appleBonus.apple.x * TILE_SIZE, this.appleBonus.apple.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    } // Affichage de la pomme
    
    
    /*drawEatAnimation(ctx){
        let radius = TILE_SIZE/2 + eatAnimation.frame * 2;
        let opacity = 1 - (eatAnimation.frame / eatAnimation.maxFrame);
        const centerX = eatAnimation.x * TILE_SIZE + TILE_SIZE/2;
        const centerY = eatAnimation.y * TILE_SIZE + TILE_SIZE/2;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,0,${opacity})`;
        ctx.fill();
    }*/
}
