import {NextFunction, Request, Response} from 'express';
// eslint-disable-next-line import/extensions
import {User} from '../session';
import {saveOrUpdateUser} from './upsertUser';

export const auth = async (
    req: Request<unknown, unknown, User>,
    res: Response,
    next: NextFunction,
) => {
    try {
        req.session.user = req.body;

        await saveOrUpdateUser(req.body);

        res.status(200).send();
    } catch (err) {
        next(err);
    }
};
