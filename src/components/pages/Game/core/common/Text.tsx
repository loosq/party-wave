export class Text {
    constructor(public a: CanvasTextAlign, public c: string, public s: string) {
        this.a = a;
        this.c = c;
        this.s = s;
    }

    public draw(
        ctx: CanvasRenderingContext2D,
        text: number | string,
        x: number,
        y: number
    ): void {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = `bold ${this.s}px Open Sans`;
        ctx.textAlign = this.a;
        ctx.fillText(text.toString(), x, y);
        ctx.closePath();
    }
}

