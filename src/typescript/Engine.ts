import {Logic} from "./Logic.js";
import {Canvas} from "./Canvas.js";
import {Entity} from "./Entity.js";

export class Engine {

    private readonly TARGET_FPS = 60;
    private logic: Logic;
    private canvas: Canvas;
    private entities: Array<Entity>;

    public constructor() {
        this.entities = new Array();
        this.entities.push(new Entity(200, 200, 4, 3, 190));
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
        })(this), 1000/this.TARGET_FPS);
    }
    
    private gameLoop(): void {

        // handle input here gameLogic.input()

        // update game logic gameLogic.update()
        this.logic.update();

        // render here canvas.render()
        this.canvas.render();

    
    }

}