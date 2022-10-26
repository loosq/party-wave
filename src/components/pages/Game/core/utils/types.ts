export type TypeBtnPos = {
    [key: string]: number | any;
};

export type KeysType = {
    [key: string]: any;
};

export declare class CoreType {
    public readonly ctx: CanvasRenderingContext2D;

    public readonly keys: KeysType;

    public lastKeyState: KeysType;

    public score: number;

    public gameSpeed: number;

    public music: HTMLAudioElement;
    public soundJump: HTMLAudioElement;
    public down: HTMLAudioElement;

    public scoreSet: Function;

    public width: number;

    public height: number;

    protected activeScene: any;

    public readonly canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, cb: Function);

    private initInput(): void;

    public checkKeyPress(keyCode: string | number): boolean;

    public setScene(Scene: any): void;

    public update(): void;

    public render(): void;

    protected start(): void;
}
