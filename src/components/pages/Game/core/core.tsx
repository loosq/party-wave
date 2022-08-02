import { IntroScene } from './scenes';
import { getCursorPosition } from './utils';
import { CoreType, KeysType } from './utils/types';

export class Core {
    public readonly ctx: CanvasRenderingContext2D;

    public keys: KeysType = {};

    public lastKeyState: KeysType = {};

    public score: number;

    public scoreSet: Function;

    public width: number;

    public height: number;

    protected activeScene: CoreType;

    constructor(private readonly canvas: HTMLCanvasElement, cb: Function) {
        this.canvas = canvas;
        this.canvas.oncontextmenu = (e) => e.preventDefault();

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.score = 0;
        this.scoreSet = cb;

        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.setScene(IntroScene);
        this.initInput();
        this.start();
    }

    private initInput(): void {
        window.addEventListener(
            'keydown',
            (e: KeyboardEvent) => { this.keys[e.code] = true; },
        );
        // eslint-disable-next-line no-restricted-globals
        window.addEventListener(
            'keyup',
            (e: KeyboardEvent) => { this.keys[e.code] = false; },
        );
        window.addEventListener(
            'mousedown',
            (e: MouseEvent) => {
                this.keys[e.button] = getCursorPosition(e, true);
            },
        );
        window.addEventListener(
            'mousemove',
            (e: MouseEvent) => {
                this.keys.move = getCursorPosition(e);
            },
        );
    }

    public checkKeyPress(keyCode: string | number): boolean {
        const isKeyPressed = !!this.keys[keyCode];

        this.lastKeyState = this.lastKeyState || {};

        if (this.lastKeyState[keyCode] === undefined) {
            this.lastKeyState[keyCode] = isKeyPressed;
            return false;
        }

        if (this.lastKeyState[keyCode] !== isKeyPressed) {
            this.lastKeyState[keyCode] = isKeyPressed;
            return isKeyPressed;
        }
        return false;
    }

    public setScene(Scene: any) {
        this.activeScene = new Scene(this);
    }

    public update(): void {
        this.activeScene.update();
    }

    public render(): void {
        this.ctx.save();
        this.activeScene.render();
        this.ctx.restore();
    }

    protected start(): void {
        let last = performance.now();
        const step = 1 / 60;
        let dt = 0;
        let now;

        const frame = () => {
            now = performance.now();
            dt += (now - last) / 1000;
            while (dt > step) {
                dt -= step;
                this.update();
            }
            last = now;

            this.render();

            requestAnimationFrame(frame);
        };

        requestAnimationFrame(frame);
    }
}

// FPS
let z: number;
window.requestAnimationFrame = (func: FrameRequestCallback): any => {
    clearTimeout(z);
    z = setTimeout(func, 1000 / 60);
};
