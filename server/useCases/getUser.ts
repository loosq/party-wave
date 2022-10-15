import {NextFunction, Request, Response} from 'express';
import axios from 'axios';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {
                accept: 'application/json',
                cookie: req.session.userCookie as string,
            },
            withCredentials: true,
        });

        req.session.user = response.data;

        res.status(200).send(response.data);
    } catch (err) {
        next(err);
    }
};
