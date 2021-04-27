import {Logic} from "./Logic.js";
import {Canvas} from "./Canvas.js";
import {Entity} from "./Entity.js";
import {Boid} from "./Boid.js";

export class Engine {

    private readonly TARGET_FPS = 60;
    private readonly NUMBER_OF_BOIDS = 300;

    private logic: Logic;
    private canvas: Canvas;
    private entities: Array<Entity>;

    public constructor() {
        this.entities = new Array();
        this.logic = new Logic(this.entities);
        this.canvas = new Canvas(this.entities);
    }

    public run(): void {
        this.init();
    }

    private init(): void {
        // init window etc
        this.canvas.init();
        setInterval((function(self) {
            return function() {
                self.gameLoop();
            }
        })(this), 1000 / this.TARGET_FPS);

        for (let i = 0; i < this.NUMBER_OF_BOIDS; i++) {
            this.entities.push(new Boid(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 4, 2, Math.random() * 180));   
        }
    }
    
    private gameLoop(): void {

        // handle input here gameLogic.input()

        // update game logic gameLogic.update()
        this.logic.update(this.entities, this.canvas);

        // render here canvas.render()
        this.canvas.render();
    
    }

}