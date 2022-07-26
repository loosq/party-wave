import { useRef } from 'react';

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    return [canvasRef];
};

export const randomRange = (
    min: number,
    max: number,
) => Math.round(Math.random() * (max - min) + min);

export const getImage = (img: string) => {
    const image = new Image();
    image.src = img;
    return image;
};

export const coverImg = (
    img: HTMLImageElement,
    width: number,
    height: number,
) => {
    const imgRatio = img.height / img.width;
    const winRatio = height / width;
    const cip: { [key: string]: number } = {
        sx: 0,
        sy: 0,
        sw: 0,
        sh: 0,
    };

    if (imgRatio > winRatio) {
        const h = width * imgRatio;

        cip.sx = 0;
        cip.sy = height - h;
        cip.sw = width;
        cip.sh = h;
    }

    if (imgRatio < winRatio) {
        const w = (width * winRatio) / imgRatio;

        cip.sx = width - w;
        cip.sy = 0;
        cip.sw = w;
        cip.sh = height;
    }

    return cip;
};

export const getCursorPosition = (
    event: MouseEvent,
    press: boolean = false,
) => {
    const coords = {
        x: event.clientX,
        y: event.clientY,
    };

    if (press) {
        return {
            press,
            ...coords,
        };
    }
    return coords;
};

export const checkOnBtn = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number,
) => x1 > x2 && x1 < x2 + w2 && y1 > y2 && y1 < y2 + h2;
