import { UI } from '../common';
import { checkOnBtn, getImage } from '../utils';
import { GameScene } from './GameScene';
import btnStart from '../../sprites/btn_start.png';
import { CoreType, TypeBtnPos } from '../utils/types';

export class MenuScene {
    readonly btnStart: CanvasImageSource;

    private imageOpacity: number;

    private UI: UI;

    constructor(protected game: CoreType) {
        this.game = game;
        this.btnStart = getImage(btnStart);

        this.imageOpacity = 1;

        this.UI = new UI(true);
    }

    public update(): void {
        const {
            x, y, w, h,
        } = this.btnPosition;
        if (this.game.checkKeyPress(0)) {
            const {x: cX, y: cY} = this.game.keys[0];
            if (checkOnBtn(cX, cY, x, y, w, h)) {
                this.game.setScene(GameScene);
            }
            this.game.lastKeyState[0] = false;
            this.game.keys[0] = false;
        }

        if (this.game.keys.move !== undefined) {
            const {x: mX, y: mY} = this.game.keys.move;
            if (checkOnBtn(mX, mY, x, y, w, h)) {
                this.imageOpacity = 0.5;
                this.game.canvas.style.cursor = 'pointer';
            } else {
                this.imageOpacity = 1;
                this.game.canvas.style.cursor = 'default';
            }
        }
    }

    private get btnPosition(): TypeBtnPos {
        return {
            x: this.game.width / 2 - 110,
            y: this.game.height / 2 - 40,
            w: 220,
            h: 80,
        };
    }

    public render(): void {
        this.game.ctx.clearRect(0, 0, this.game.width, this.game.height);

        this.UI.draw(this.game.ctx, this.game.width, this.game.height, 0);
        this.game.ctx.globalAlpha = this.imageOpacity;
        this.game.ctx.drawImage(
            this.btnStart,
            this.game.width / 2 - 110,
            this.game.height / 2 - 40,
            220,
            80,
        );
    }
}
