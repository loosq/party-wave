import { UI } from '../common';
import { checkOnBtn, getImage } from '../utils';
import { GameScene } from './GameScene';
import btnStart from '../../sprites/btn_start.png';
import btnExit from '../../sprites/btn_exit.png';
import { CoreType, TypeBtnPos } from '../utils/types';

export class MenuScene {
    readonly btnStart: CanvasImageSource;
    readonly btnExit: CanvasImageSource;

    private imageOpacity: { start: number; exit: number };

    private UI: UI;

    constructor(protected game: CoreType) {
        this.game = game;
        this.btnStart = getImage(btnStart);
        this.btnExit = getImage(btnExit);

        if(this.game.music){
            this.game.music.pause()
        }

        this.imageOpacity = {
            start: 1,
            exit: 1,
        };

        this.UI = new UI(true);
    }

    public update(): void {
        const {
            x, y: startY, w, h,
        } = this.btnPosition.start;
        const {y: exitY} = this.btnPosition.exit;
        if (this.game.checkKeyPress(0)) {
            const {x: cX, y: cY} = this.game.keys[0];
            if (checkOnBtn(cX, cY, x, startY, w, h)) {
                this.game.setScene(GameScene);
            } else if (checkOnBtn(cX, cY, x, exitY, w, h)) {
                window.location.href = '/'
            }
            this.game.lastKeyState[0] = false;
            this.game.keys[0] = false;
        }

        if (this.game.keys.move !== undefined) {
            const {x: mX, y: mY} = this.game.keys.move;
            if (checkOnBtn(mX, mY, x, startY, w, h)) {
                this.imageOpacity.start = 0.5;
                this.game.canvas.style.cursor = 'pointer';
            } else if (checkOnBtn(mX, mY, x, exitY, w, h)) {
                this.imageOpacity.exit = 0.5;
                this.game.canvas.style.cursor = 'pointer';
            }else {
                this.imageOpacity = {
                    start: 1,
                    exit: 1,
                };
                this.game.canvas.style.cursor = 'default';
            }
        }
    }

    private get btnPosition(): TypeBtnPos {
        return {
            start: {
                x: this.game.width / 2 - 110,
                y: this.game.height / 2.6,
                w: 220,
                h: 80,
            },
            exit: {
                y: this.game.height / 2,
            },
        };
    }

    public render(): void {
        this.game.ctx.clearRect(0, 0, this.game.width, this.game.height);

        this.UI.draw(this.game.ctx, this.game.width, this.game.height, 0);

        this.game.ctx.save();
        this.game.ctx.globalAlpha = this.imageOpacity.start;
        this.game.ctx.drawImage(
            this.btnStart,
            this.game.width / 2 - 110,
            this.game.height / 2.6,
            220,
            80,
        );
        this.game.ctx.restore();

        this.game.ctx.save();
        this.game.ctx.globalAlpha = this.imageOpacity.exit;
        this.game.ctx.drawImage(
            this.btnExit,
            this.game.width / 2 - 110,
            this.game.height / 2,
            220,
            80,
        );
        this.game.ctx.restore();
    }
}
