export class Entity {

    private xPos: number;
    private yPos: number;
    private size: number;
    private speed: number;
    private direction: number;
    private dx: number;
    private dy: number;

    public constructor(xPos: number, yPos: number, size: number, speed: number, direction: number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.speed = speed;
        this.direction = direction;
    }

    public move(): void {
        this.xPos += this.dx;
        this.yPos += this.dy;

        if (this.xPos > 490) {
            this.xPos = 0;
        } else if (this.xPos < 0) {
            this.xPos = 490;
        }
        if (this.yPos > 490) {
            this.yPos = 0;
        } else if (this.yPos < 0) {
            this.yPos = 490;
        }
    }

    public update(entities: Array<Entity>): void {
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

    }

    public render(ctx: CanvasRenderingContext2D): void {
        let dx = this.speed * Math.cos(this.direction * Math.PI / 180);
        let dy = this.speed * Math.sin(this.direction * Math.PI / 180);
        const angle = Math.atan2(dy, dx);
        ctx.translate(this.xPos, this.yPos);
        ctx.rotate(angle);
        ctx.translate(-this.xPos, -this.yPos);
        ctx.beginPath();

        ctx.fillStyle = "#558cf4";

        ctx.moveTo(this.xPos, this.yPos);
        ctx.lineTo(this.xPos - 3 * this.size, this.yPos + this.size);
        ctx.lineTo(this.xPos - 3 * this.size, this.yPos - this.size);
        ctx.lineTo(this.xPos, this.yPos);

        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    private findNearby(entities: Array<Entity>): Array<number> {
        let pointX = 0;
        let pointY = 0;
        let count = 0;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (entity == this) {
                continue;
            }
            if (this.findDistance(entity.xPos, entity.yPos, this.xPos, this.yPos) <= 70) {
                pointX += entity.xPos;
                pointY += entity.yPos;
                count += 1;
            }
        }

        return [pointX/count, pointY/count, count];
    }

    private findDistance(x1, y1, x2, y2): number {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx**2 + dy**2);
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