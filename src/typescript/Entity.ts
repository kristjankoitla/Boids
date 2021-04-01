export class Entity {

    private xPos: number;
    private yPos: number;
    private height: number;
    private width: number;

    private xSpeed: number;
    private ySpeed: number;

    public constructor(xPos: number, yPos: number, height: number, width: number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.height = height;
        this.width = width;

        this.xSpeed = 1;
        this.ySpeed = 1;
    }

    public update(): void {
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

}