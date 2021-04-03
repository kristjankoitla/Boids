// import {Entity} from "./Entity.js";
import {Boid} from "./Boid.js";

export class Logic {

    private entities: Array<Boid>;

    public constructor(entities: Array<Boid>) {
        this.entities = entities;
    }

    public update(entities: Array<Boid>): void {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.update(entities);
        }
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.move();
        }
    }

}