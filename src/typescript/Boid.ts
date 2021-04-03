import { Entity } from "./Entity.js";
import {Util} from "./Util.js";

export class Boid extends Entity {

    private speed: number;
    private direction: number;
    private dx: number;
    private dy: number;

    public constructor(xPos: number, yPos: number, size: number, speed: number, direction: number) {
        super(xPos, yPos, size);
        this.speed = speed;
        this.direction = direction;
    }

    public move(): void {
        this.xPos = (this.xPos + this.dx) % 490;
        this.yPos = (this.yPos + this.dy) % 490;

        if (this.xPos < 0) this.xPos = 490;
        if (this.yPos < 0) this.yPos = 490;
    }

    public update(entities: Array<Boid>): void {
        this.dx = this.speed * Math.cos(this.direction * Math.PI / 180);
        this.dy = this.speed * Math.sin(this.direction * Math.PI / 180);

        let nearbyMid = this.findNearby(entities);
        let angle = Math.atan(((nearbyMid[0] - this.xPos) / (nearbyMid[1] - this.yPos))) * 180 / Math.PI;
        angle += 90;
        if (nearbyMid[1] - this.yPos > 0) {
            angle += 180;
        }

        let turnSide = this.findTurnSide(this.direction, angle);

        if (nearbyMid[2] >= 1) {
            this.direction = (this.direction + 1 * turnSide) % 360;
        }
        this.direction = this.direction <= 0 ? 360 : this.direction;

        // todo the average angle is still not quite right
    }

    public render(ctx: CanvasRenderingContext2D): void {
        let dx = this.speed * Math.cos(this.direction * Math.PI / 180);
        let dy = this.speed * Math.sin(this.direction * Math.PI / 180);
        const angle = Math.atan2(dy, dx);
        this.renderTriangle(ctx, angle);
    }

    // private findAverageAngle(entities: Array<Boid>): number {
    //     let angles = [];
    //     for (let i = 0; i < entities.length; i++) {
    //         const entity = entities[i];
    //         // don't account for self when finding the average angle
    //         if (this == entity) {
    //             continue;
    //         }
    //         angles.push(entity.direction);    
    //     }

    //     return Util.findMeanAngleDeg(angles);
    // }

    private findNearby(entities: Array<Boid>): Array<number> {
        let pointX = 0;
        let pointY = 0;
        let count = 0;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            // don't account for self when finding the average position
            if (entity == this) {
                continue;
            }
            if (Util.distance([entity.xPos, entity.yPos], [this.xPos, this.yPos]) <= 70) {
                pointX += entity.xPos;
                pointY += entity.yPos;
                count += 1;
            }
        }

        return [pointX/count, pointY/count, count];
    }

    private findTurnSide(current: number, target: number): number {
        let diff = target - current;
        if (diff < 0) {
            diff += 360;
        }
        if (diff > 180) {
            return -1;
        } else {
            return 1;
        }
    }
}