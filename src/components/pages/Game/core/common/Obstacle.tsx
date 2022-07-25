import { randomRange } from '../utils';
import { Stone } from './Stone';
import { Hero } from './';
import { CoreType } from '../utils/types';

export class Obstacle {
    public gameSpeed: number;
    private obstacles: Stone[];
    private spawnTimer: number;
    private initialSpawnTimer: number;

    constructor(
        protected game: CoreType,
        protected hero: Hero,
        public x: number,
        public y: number,
        public w: number,
        public h: number
    ) {
        this.game = game;
        this.hero = hero;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.gameSpeed = 3;
        this.obstacles = [];
        this.spawnTimer = this.initialSpawnTimer = 180;

        this.spawn();
    }

    protected spawn(): void {
        const size = randomRange(40, 70);
        const type = randomRange(0, 1);
        const obstacle = new Stone(
            this.game.width + size,
            this.game.height - size - 70,
            size,
            size,
            this.gameSpeed,
            type
        );
        if (type == 1) {
            obstacle.y -= this.hero.originalHeight - 10;
        }
        this.obstacles.push(obstacle);
    }

    public update(end: Function): void {
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawn();
            this.spawnTimer = this.initialSpawnTimer - this.gameSpeed * 8;

            if (this.spawnTimer < 50) {
                this.spawnTimer = 50;
            }
        }

        for (let i = 0; i < this.obstacles.length; i++) {
            let o = this.obstacles[i];

            if (o.x + o.w < 0) {
                this.obstacles.splice(i, 1);
            }

            if (
                this.hero.x < o.x + o.w &&
                this.hero.x + this.hero.w > o.x &&
                this.hero.y < o.y + o.h &&
                this.hero.y + this.hero.h > o.y
            ) {
                this.obstacles = [];
                this.spawnTimer = this.initialSpawnTimer;
                this.gameSpeed = 3;
                end();
            }

            o.update();
        }

        this.gameSpeed += 0.003;
        this.game.score = Math.floor(this.game.score + 0.25 * this.gameSpeed);
    }

    public draw(): void {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw(this.game.ctx);
        }
    }
}

