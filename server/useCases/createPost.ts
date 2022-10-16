import {NextFunction, Request, Response} from 'express';
import {SessionData} from 'express-session';
import {Post} from '../../db/models';
import {saveOrUpdateUser} from './upsertUser';
import {sequelize} from '../../db/init';

type PostReq = {
    text: string;
};

export const createPost = async (
    req: Request<{id: string}, unknown, PostReq>,
    res: Response,
    next: NextFunction,
) => {
    const post = req.body;
    const {user} = req.session as SessionData;
    const {id} = req.params;
    const t = await sequelize.transaction();
    try {
        const [savedUser] = await saveOrUpdateUser(user, t);

        await Post.create({
            userId: savedUser.id,
            text: post.text,
            date: new Date().getTime(),
            topicId: parseInt(id, 10),
        }, {transaction: t});

        await t.commit();

        res.status(200).send();
    } catch (err) {
        await t.rollback();

        res.status(500).send({
            message: 'Cannot create new post',
        });
    }
};
