import { Entity } from "./Entity.js";
import {Util} from "./Util.js";

export class Boid extends Entity {

    private speed: number;
    private direction: number;

    public constructor(xPos: number, yPos: number, size: number, speed: number, direction: number) {
        super(xPos, yPos, size);
        this.speed = speed;
        this.direction = direction;
    }

    public update(entities: Array<Entity>): void {
        let boids: Array<Boid> = [];
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (entity instanceof Boid) {
                boids.push(entity);
            }
        }

        let boidsInView = this.findBoidsInView(boids);
        let middleOfBoidsInView = this.findAveragePoint(boidsInView);
        
        let angleToMidOfBoids = Math.atan(((middleOfBoidsInView[0] - this.xPos) / (middleOfBoidsInView[1] - this.yPos))) * 180 / Math.PI;
        angleToMidOfBoids += 90;
        if (middleOfBoidsInView[1] - this.yPos > 0) {
            angleToMidOfBoids += 180;
        }
        angleToMidOfBoids = 360 - angleToMidOfBoids;

        if (!isNaN(angleToMidOfBoids)) {
            let turnSide = this.findTurnSide(this.direction, angleToMidOfBoids)
            this.direction = (this.direction + 3 * turnSide) % 360;
            this.direction = this.direction <= 0 ? 360 : this.direction;
        }

        let dx = this.speed * Math.cos(this.direction * Math.PI / 180);
        let dy = this.speed * Math.sin(this.direction * Math.PI / 180);

        // teleport clamp the boids
        this.xPos = (this.xPos + dx) % 490;
        this.yPos = (this.yPos + dy) % 490;

        if (this.xPos < 0) this.xPos = 490;
        if (this.yPos < 0) this.yPos = 490;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        let dx = this.speed * Math.cos(this.direction * Math.PI / 180);
        let dy = this.speed * Math.sin(this.direction * Math.PI / 180);
        const angle = Math.atan2(dy, dx);
        this.renderTriangle(ctx, angle);
    }

    // Finds the average point of boids.
    private findAveragePoint(boids: Array<Boid>): Array<number> {
        let pointX = 0;
        let pointY = 0;
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            const boid = boids[i];
            // don't account for self when finding the average position
            if (boid == this) {
                continue;
            }
            pointX += boid.xPos;
            pointY += boid.yPos;
            count += 1
        }

        return [pointX/count, pointY/count];
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

    private findBoidsInView(boids: Array<Boid>): Array<Boid> {

        let inView = [];

        for (let i = 0; i < boids.length; i++) {
            const boid = boids[i];

            if (boid == this) {
                continue;
            }

            // if the boid is too far away, skip
            if (Util.distance([boid.xPos, boid.yPos], [this.xPos, this.yPos]) > 70) {
                continue;
            }

            // find the angle of the boid, with 0, 0 being this boid
            let angle = Math.atan(((boid.yPos - this.yPos) / (boid.xPos - this.xPos))) * 180 / Math.PI;
            
            if (boid.xPos - this.xPos < 0) {
                angle += 180;
            }
            if (boid.xPos - this.xPos > 0 && boid.yPos - this.yPos < 0) {
                angle += 360
            }

            // their angle relative to this angle
            let relativeAngle = Math.abs(this.direction - angle);

            // if not in field of view, skip
            if (relativeAngle < 225 && relativeAngle > 135) {
                continue
            }

            inView.push(boid)
        }

        return inView;
    }
}