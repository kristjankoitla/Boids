import {Entity} from "./Entity.js";

export class Canvas {

    private canvas: any;
    private ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    private entities: Array<Entity>;

    public constructor(entities: Array<Entity>) {
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