export class Entity {
    
    protected xPos;
    protected yPos;
    protected size;

    public constructor(xPos: number, yPos: number, size: number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#558cf4";
        ctx.fillRect(this.xPos, this.yPos, this.size, this.size);
    }

    protected renderTriangle(ctx: CanvasRenderingContext2D, angle: number): void {
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