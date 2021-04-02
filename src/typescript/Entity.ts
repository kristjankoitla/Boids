export class Entity {

    private xPos: number;
    private yPos: number;
    private size: number;
    private speed: number;
    private direction: number;

    public constructor(xPos: number, yPos: number, size: number, speed: number, direction: number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.speed = speed;
        this.direction = direction;
    }

    public update(): void {
        let dx = this.speed * Math.cos(this.direction * Math.PI / 180);
        let dy = this.speed * Math.sin(this.direction * Math.PI / 180);

        this.xPos += dx;
        this.yPos += dy;

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

        this.direction = (this.direction - 1) % 360;
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

}