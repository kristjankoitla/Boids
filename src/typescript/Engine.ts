import {Logic} from "./Logic.js";
import {Canvas} from "./Canvas.js";
import {Entity} from "./Entity.js";
import {Boid} from "./Boid.js";

export class Engine {

    private readonly TARGET_FPS = 60;
    private logic: Logic;
    private canvas: Canvas;
    private entities: Array<Entity>;

    public constructor() {
        this.entities = new Array();
        // for (let i = 0; i < 100; i++) {
        //     this.entities.push(new Boid(Math.random() * 490, Math.random() * 490, 4, 2, Math.random() * 360));   
        // }
        this.entities.push(new Boid(210, 300, 4, 3, 270));
        this.entities.push(new Boid(200, 310, 4, 3, 250));
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
    }
    
    private gameLoop(): void {

        // handle input here gameLogic.input()

        // update game logic gameLogic.update()
        this.logic.update(this.entities);

        // render here canvas.render()
        this.canvas.render();
    
    }

}