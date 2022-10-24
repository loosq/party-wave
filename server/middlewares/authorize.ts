import axios from 'axios';
import {Request, NextFunction, Response} from 'express';
import {ErrorInstance} from '../utils';
// eslint-disable-next-line import/extensions
import {User} from '../session';

export const authorizeMiddleware = async (
    req: Request<unknown, unknown, unknown>,
    res: Response,
    next: NextFunction,
) => {
    if (req.session.user) {
        return next();
    }

    if (!req.headers.cookie) {
        return next(new ErrorInstance('User not authorized', 403));
    }

    try {
        const response = await axios.get<User>('https://ya-praktikum.tech/api/v2/auth/user', { // TODO удалить, если будет не нужен
            headers: {
                accept: 'application/json',
                cookie: req.headers.cookie,
            },
            withCredentials: true,
        });

        req.session.user = response.data;

        next();
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return next(new ErrorInstance(err.response?.statusText, err.response?.status));
        }
        return next(err);
    }
};
