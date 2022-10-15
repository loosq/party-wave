import { Response, Request, NextFunction } from 'express';
import {AxiosResponse} from 'axios';
import {Nullable} from 'types';

export class ErrorInstance extends Error {
    public readonly code: number;

    constructor(message?: string, code?: number) {
        super(message);
        this.code = code ?? 500;
    }
}

export const onApiError = (err: ErrorInstance, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code).send({
        message: err.message,
    });
};

export const getAuthCookie = (
    response: AxiosResponse,
): Nullable<Record<string, string | boolean>> => {
    const responseCookie = response.headers['set-cookie'];

    if (responseCookie) {
        const buffer: Record<string, string | boolean> = {};

        responseCookie.forEach((str) => {
            const arr = str.split(';');

            arr.forEach((item) => {
                const inner = item.trim().split('=');
                const [key, value] = inner;
                if (value) {
                    buffer[key] = value;
                } else {
                    buffer[key] = true;
                }
            });
        });

        return buffer;
    }

    return null;
};

export const getCookieString = (cookie?: Record<string, string | boolean>): string => {
    const keys = ['authCookie', 'uuid'];
    const result: string[] = [];

    keys.forEach((key) => {
        const item = cookie?.[key];

        result.push(`${key}=${item}`);
    });

    return result.join('; ');
};
