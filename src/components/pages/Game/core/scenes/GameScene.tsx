import {
    Hero,
    Obstacle,
    UI,
    Coin,
} from '../common';
import {
    groundHeight, defaultScore, heroHeight,
    heroWidth, coinWidth, coinHeight, obstacleHeight,
    obstacleWidth, coinValue,
} from '../config/gameConfig';
import {ExitScene, MenuScene} from '.';
import {checkOnBtn} from '../utils';
import {CoreType} from '../utils/types';

import audio from '../../audio/music.mp3'
import jump from '../../audio/jump.mp3'
import down from '../../audio/down.mp3'

export class GameScene {
    protected imageOpacity: number;

    private pause: boolean;

    private UI: UI;

    readonly HERO: Hero;

    private OBSTACLE: Obstacle;

    private COIN: Coin;

    constructor(protected game: CoreType) {
        this.game = game;
        this.pause = false;
        this.game.score = defaultScore;

        this.imageOpacity = 1;
        this.UI = new UI();
        this.HERO = new Hero(
            this.game,
            100,
            this.game.height / 2 - groundHeight,
            heroWidth,
            heroHeight,
        );
        this.OBSTACLE = new Obstacle(
            this.game,
            this.HERO,
            400,
            this.game.height / 2 - groundHeight,
            obstacleWidth,
            obstacleHeight,
        );
        this.COIN = new Coin(
            this.game,
            this.HERO,
            100,
            100,
            coinWidth,
            coinHeight,
        );

        this.game.music = new Audio();
        this.game.soundJump = new Audio();
        this.game.down = new Audio();

        this.game.music.src = audio
        this.game.soundJump.src = jump
        this.game.down.src = down

        this.game.music.volume = 0.5
        this.game.down.volume = 0.7
    }

    protected checkPause(): void {
        const {
            x,
            y,
            w,
            h,
        } = this.UI.pauseBtnPosition;

        if (this.game.checkKeyPress(0)) {
            const {
                x: cX,
                y: cY,
            } = this.game.keys[0];
            if (checkOnBtn(cX, cY, x, y, w, h)) {
                this.UI.isPauseChange();
                // eslint-disable-next-line no-return-assign
                setTimeout(() => (this.pause = !this.pause), 0);
            }
            this.game.lastKeyState[0] = false;
            this.game.keys[0] = false;
        }

        if (this.game.keys.move !== undefined) {
            const {
                x: mX,
                y: mY,
            } = this.game.keys.move;
            if (checkOnBtn(mX, mY, x, y, w, h)) {
                this.UI.imageOpacity = 0.5;
                this.game.canvas.style.cursor = 'pointer';
            } else {
                this.UI.imageOpacity = 1;
                this.game.canvas.style.cursor = 'default';
            }
        }
    }

    public update(): void {
        this.checkPause();

        if (this.game.keys.Escape) {
            this.game.setScene(MenuScene);
        }

        if (!this.pause) {
            this.HERO.update();
            this.OBSTACLE.update(() => {
                this.game.setScene(ExitScene);
                this.game.scoreSet(this.game.score);
            });
            this.COIN.update(() => {
                this.game.score += coinValue;
            });
        }
    }

    public render(): void {
        if (!this.pause) {
            this.game.music.play()
            this.game.ctx.clearRect(0, 0, this.game.width, this.game.height);

            this.UI.draw(
                this.game.ctx,
                this.game.width,
                this.game.height,
                this.game.score,
            );
            this.HERO.draw();
            this.OBSTACLE.draw();
            this.COIN.draw();
        } else { 
            this.game.music.pause()
        }
    }
}
