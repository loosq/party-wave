import {NextFunction, Response, Request} from 'express';

export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.session.user = undefined;
    req.session.userCookie = undefined;
    req.session.save((err) => {
        if (err) {
            next(err);
        }

        req.session.regenerate((er) => {
            if (er) {
                next(er);
            }

            res.status(200).send();
        });
    });
};
