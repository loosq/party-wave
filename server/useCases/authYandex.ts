import axios from 'axios';
import {NextFunction, Request, Response} from 'express';
// eslint-disable-next-line import/extensions
import {User} from '../session';
// import {saveOrUpdateUser} from './upsertUser';

export const authYandex = async (
    req: Request<unknown, unknown, User>,
    res: Response,
    next: NextFunction,
) => {
    try {
        if(req.query.code){
            const response = await axios.post<void>('https://ya-praktikum.tech/api/v2/oauth/yandex', {
                    "code": req.query.code,
                    "redirect_uri": "https://teamfive-cosmobot-15.ya-praktikum.tech"
                },{ // TODO удалить, если будет не нужен
                headers: {
                    accept: 'application/json',
                },
                withCredentials: true,
            });
            console.log(response)
            
        }
        // req.session.user = req.body;

        // await saveOrUpdateUser(req.body);

        // res.status(200).send();
    } catch (err) {
        next(err);
    }
};
