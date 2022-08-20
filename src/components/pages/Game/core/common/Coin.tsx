import {getImage} from '../utils';
import {GameElement} from './GameElement';
import {Hero} from '.';
import {CoreType} from '../utils/types';
import coinSprite from '../../sprites/coin.png';
import {groundHeight} from '../config/gameConfig';

export class Coin {
    public gameSpeed: number;

    private coins: GameElement[];

    private spawnTimer: number;

    readonly initialSpawnTimer: number;

    constructor(
        protected game: CoreType,
        protected hero: Hero,
        public x: number,
        public y: number,
        public w: number,
        public h: number,
    ) {
        this.game = game;
        this.hero = hero;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.gameSpeed = 3;
        this.coins = [];
        // eslint-disable-next-line no-multi-assign
        this.spawnTimer = this.initialSpawnTimer = 180;

        this.spawn();
    }

    protected spawn(): void {
        const size = 50;
        const sprite = getImage(coinSprite);
        const coin = new GameElement(
            this.game.width + size - 300,
            this.game.height - size - groundHeight - 100,
            size,
            size,
            this.gameSpeed,
            sprite,
        );
        this.coins.push(coin);
    }

    public update(cb: Function = () => {
    }): void {
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawn();
            this.spawnTimer = this.initialSpawnTimer - this.gameSpeed * 8;

            if (this.spawnTimer < 50) {
                this.spawnTimer = 50;
            }
        }

        for (let i = 0; i < this.coins.length; i++) {
            const c = this.coins[i];

            if (c.x + c.w < 0) {
                this.coins.splice(i, 1);
            }

            const haveCollision = this.hero.x < c.x + c.w
                && this.hero.x + this.hero.w > c.x
                && this.hero.y < c.y + c.h
                && this.hero.y + this.hero.h > c.y;

            if (haveCollision) {
                this.coins.splice(i, 1);
                cb();
            }

            c.update();
        }

        this.gameSpeed += 0.003;
    }

    public draw(): void {
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].draw(this.game.ctx);
        }
    }
}
