import {NextFunction, Request, Response} from 'express';
import axios from 'axios';
import {ErrorInstance, getAuthCookie, getCookieString} from '../utils';

interface Auth {
    login: string;
    password: string;
}

export const auth = async (
    req: Request<unknown, unknown, Auth>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await axios.post('https://ya-praktikum.tech/api/v2/auth/signin', req.body, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        const cookie = getAuthCookie(response);

        if (cookie) {
            req.session.userCookie = getCookieString(cookie);

            res.status(200).send(response.data);
        } else {
            next(new ErrorInstance('User not authorized', 403));
        }
    } catch (err) {
        next(err);
    }
};
