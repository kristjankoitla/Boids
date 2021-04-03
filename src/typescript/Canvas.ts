// import {Entity} from "./Entity.js";
import {Boid} from "./Boid.js";

export class Canvas {

    private canvas: any;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private entities: Array<Boid>;

    public constructor(entities: Array<Boid>) {
        this.entities = entities;
    }

    public init(): void {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.render(this.ctx);
        }
    }

}