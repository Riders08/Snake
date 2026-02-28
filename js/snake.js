import { getRandomInt, GRID_SIZE } from "./tools.js";

export class Snake{
    constructor(){
        this.defaultSnake();
    }

    defaultSnake(){
        const New_head = {
            x: getRandomInt(5,15), 
            y: getRandomInt(5,15)
        };
        this.body = [New_head,
            {x: (New_head.x - 1), y: New_head.y},
            {x: (New_head.x - 2), y: New_head.y}
        ];
        this.direction = {x: 1, y: 0};
    }

    restartSnake(){
        this.defaultSnake();
    }

    getHead(){
        return this.body[0];
    }

    move(mode, collision){
        const newHead ={
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        }
        if(mode){
            if(this.body[0].x < 0){
                this.body[0].x = GRID_SIZE-1;
            }else if(this.snake.body[0].x >= GRID_SIZE){
                this.body[0].x = 0;
            }else if(this.snake.body[0].y < 0){
                this.body[0].y = GRID_SIZE-1;
            }else if(this.snake.body[0].y >= GRID_SIZE){
                this.body[0].y = 0;
            }
        }else {
            if(this.body[0].x < 0 || this.body[0].x >= GRID_SIZE || this.body[0].y < 0 || this.body[0].y >= GRID_SIZE){
                collision = true;
            }
        }
        this.body.unshift(newHead);
        this.body.pop();
    }

    grow(){
        const newHead ={
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        }
        this.body.unshift(newHead);
    }

    changeDirection(key){
        let actual_direction = this.direction;
        switch(key){
            case "ArrowLeft":
                if(actual_direction.x == 1 &&  actual_direction.y == 0){
                    break;
                }
                this.direction = {x: -1, y: 0};
                break;
            case "ArrowRight":
                if(actual_direction.x == -1 &&  actual_direction.y == 0){
                    break;
                }
                this.direction = {x: 1, y: 0};
                break;
            case "ArrowUp":
                if(actual_direction.x == 0 &&  actual_direction.y == 1){
                    break;
                }
                this.direction = {x: 0, y: -1};
                break;
            case "ArrowDown":
                if(actual_direction.x == 0 &&  actual_direction.y == -1){
                    break;
                }
                this.direction = {x: 0, y: 1};
                break;
            default: 
                this.direction; 
        }
    }

    biteTail(){
        let head = this.body[0];
        return this.body.slice(1).some(element =>
            element.x == head.x && element.y == head.y
        );
    }
}