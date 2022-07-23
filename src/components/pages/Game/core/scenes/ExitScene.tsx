import { UI } from '../common';
import { getImage, checkOnBtn } from '../utils';
import { GameScene, MenuScene } from '.';
import { Text } from '../common/Text';
import { TypeBtnPos, CoreType } from '../utils/types';
import btnRestart from '../../sprites/btn_restart.png';
import btnMenu from '../../sprites/btn_menu.png';

export class ExitScene {
    private btnRestart: CanvasImageSource;
    private btnMenu: CanvasImageSource;
    private imageOpacity: { restart: number; menu: number };
    private scoreText: Text;
    private UI: UI;

    constructor(protected game: CoreType) {
        this.game = game;
        this.btnRestart = getImage(btnRestart);
        this.btnMenu = getImage(btnMenu);

        this.imageOpacity = {
            restart: 1,
            menu: 1,
        };

        this.scoreText = new Text('center', '#000', '60');
        this.UI = new UI(true);
    }

    protected get btnPosition(): TypeBtnPos {
        return {
            restart: {
                x: this.game.width / 2 - 110,
                y: this.game.height / 2 - 40,
                w: 220,
                h: 80,
            },
            menu: {
                y: this.game.height / 1.7,
            },
        };
    }

    public update(): void {
        const { x, y: restartY, w, h } = this.btnPosition.restart;
        const { y: menuY } = this.btnPosition.menu;
        if (this.game.checkKeyPress(0)) {
            const { x: cX, y: cY } = this.game.keys[0];
            if (checkOnBtn(cX, cY, x, restartY, w, h)) {
                this.game.setScene(GameScene);
            } else if (checkOnBtn(cX, cY, x, menuY, w, h)) {
                this.game.setScene(MenuScene);
            }
            this.game.lastKeyState[0] = false;
            this.game.keys[0] = false;
        }

        if (this.game.keys.move !== undefined) {
            const { x: mX, y: mY } = this.game.keys.move;
            if (checkOnBtn(mX, mY, x, restartY, w, h)) {
                this.imageOpacity.restart = 0.5;
                this.game.canvas.style.cursor = 'pointer';
            } else if (checkOnBtn(mX, mY, x, menuY, w, h)) {
                this.imageOpacity.menu = 0.5;
                this.game.canvas.style.cursor = 'pointer';
            } else {
                this.imageOpacity = {
                    restart: 1,
                    menu: 1,
                };
                this.game.canvas.style.cursor = 'default';
            }
        }
    }

    public render(): void {
        this.game.ctx.clearRect(0, 0, this.game.width, this.game.height);

        this.UI.draw(this.game.ctx, this.game.width, this.game.height, 0);

        this.game.ctx.save();
        this.game.ctx.globalAlpha = this.imageOpacity.restart;
        this.game.ctx.drawImage(
            this.btnRestart,
            this.game.width / 2 - 140,
            this.game.height / 2 - 40,
            280,
            80
        );
        this.game.ctx.restore();

        this.game.ctx.save();
        this.game.ctx.globalAlpha = this.imageOpacity.menu;
        this.game.ctx.drawImage(
            this.btnMenu,
            this.game.width / 2 - 140,
            this.game.height / 1.7,
            280,
            80
        );
        this.game.ctx.restore();

        this.scoreText.draw(
            this.game.ctx,
            `Ваш счет: ${this.game.score}`,
            this.game.width / 2,
            this.game.height / 3
        );
    }
}

