import { MenuScene } from '.';
import { CoreType } from '../utils/types';

export class IntroScene {
    readonly logoRevealTime: number;

    public textTypingTime: number;

    readonly sceneDisplayTime: number;

    private elapsedTime: number;

    readonly bigText: string;

    readonly dt: number;

    constructor(protected game: CoreType) {
        this.game = game;
        this.logoRevealTime = 2;
        this.textTypingTime = 2;
        this.sceneDisplayTime = 5;

        this.elapsedTime = 0;
        this.bigText = 'FiveTeam presents';
        this.dt = 0.04;
    }

    public update(): void {
        this.elapsedTime += this.dt;

        if (
            this.elapsedTime >= this.sceneDisplayTime
            || this.game.checkKeyPress('Enter')
        ) {
            this.game.setScene(MenuScene);
            this.game.lastKeyState[0] = false;
            this.game.keys[0] = false;
        }
    }

    public render(): void {
        this.game.ctx.fillStyle = '#000';
        this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);

        this.game.ctx.globalAlpha = Math.min(
            1,
            this.elapsedTime / this.logoRevealTime,
        );
        this.game.ctx.font = 'bold 80px Open Sans';
        this.game.ctx.fillStyle = '#fff';
        this.game.ctx.fillText(
            this.bigText,
            (this.game.width - this.game.ctx.measureText(this.bigText).width)
            / 2,
            this.game.height / 2,
        );
    }
}
