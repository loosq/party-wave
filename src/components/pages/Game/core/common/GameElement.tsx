export class GameElement {
    private dx: number;

    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number,
        public gameSpeed: number,
        public sprite: CanvasImageSource,
    ) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.gameSpeed = gameSpeed;
        this.dx = -this.gameSpeed;
        this.sprite = sprite;
    }

    public update(): void {
        this.x += this.dx;
        this.dx = -this.gameSpeed;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}
