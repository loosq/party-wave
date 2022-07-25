import { getImage, coverImg } from '../utils';
import { Text } from './Text';
import { TypeBtnPos } from '../utils/types';
import background from '../../sprites/background.png';
import ground from '../../sprites/ground.png';
import scoreFrame from '../../sprites/scoreFrame.png';
import btnPause from '../../sprites/btn_pause.png';
import btnPlay from '../../sprites/btn_play.png';

export class UI {
    private bg: HTMLImageElement;
    protected width: number;
    protected height: number;
    private isPause: boolean;
    public imageOpacity: number;
    private ground: CanvasImageSource;
    private scoreFrame: CanvasImageSource;
    private btnPause: CanvasImageSource;
    private btnPlay: CanvasImageSource;
    private scoreText: Text;

    constructor(private onlyBG: boolean = false) {
        this.onlyBG = onlyBG;
        this.bg = getImage(background);
        this.width = 0;
        this.height = 0;
        this.isPause = false;

        if (!this.onlyBG) {
            this.imageOpacity = 1;
            this.ground = getImage(ground);
            this.scoreFrame = getImage(scoreFrame);
            this.btnPause = getImage(btnPause);
            this.btnPlay = getImage(btnPlay);

            this.scoreText = new Text('center', '#000', '30');
        }
    }

    public get pauseBtnPosition(): TypeBtnPos {
        return {
            x: this.width - 100,
            y: 20,
            w: 66,
            h: 65,
        };
    }

    public isPauseChange(): void {
        this.isPause = !this.isPause;
    }

    public draw(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        score: number
    ): void {
        this.width = width;
        this.height = height;
        const { sx, sy, sw, sh } = coverImg(this.bg, width, height);
        ctx.drawImage(this.bg, sx, sy, sw, sh);

        if (!this.onlyBG) {
            ctx.drawImage(this.ground, 0, height - 70, width, 70);
            ctx.drawImage(this.scoreFrame, 25, 20, 180, 65);

            ctx.save();
            ctx.globalAlpha = this.imageOpacity;
            !this.isPause
                ? ctx.drawImage(this.btnPause, width - 100, 20, 66, 65)
                : ctx.drawImage(this.btnPlay, width - 100, 20, 66, 65);
            ctx.restore();

            this.scoreText.draw(ctx, score, 115, 63);
        }
    }
}

