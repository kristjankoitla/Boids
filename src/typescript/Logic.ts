import { Canvas } from "./Canvas.js";
import {Entity} from "./Entity.js";

export class Logic {

    private entities: Array<Entity>;

    public constructor(entities: Array<Entity>) {
        this.entities = entities;
    }

    public update(entities: Array<Entity>, canvas: Canvas): void {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.update(entities, canvas);
        }
    }

}