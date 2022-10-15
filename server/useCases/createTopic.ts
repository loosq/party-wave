import {Response, Request, NextFunction} from 'express';
import {SessionData} from 'express-session';
import {Transaction} from 'sequelize';
import {Post, Topic} from '../../db/models';
import {sequelize} from '../../db/init';
import {saveOrUpdateUser} from './upsertUser';

type TopicReq = {
    title: string;
    text: string;
};

const saveTopic = async (topic: TopicReq, userId: number, t: Transaction) => {
    const date = new Date().getTime();

    const {id} = await Topic.create({
        title: topic.title,
        date,
        posts: [],
        userId,
    }, {transaction: t});

    await Post.create({
        userId,
        text: topic.text,
        date,
        topicId: id,
    }, {transaction: t});
};

export const createTopic = async (
    req: Request<unknown, unknown, TopicReq>,
    res: Response,
    next: NextFunction,
) => {
    const topic = req.body;
    const {user} = req.session as SessionData;

    const t = await sequelize.transaction();

    try {
        const [savedUser] = await saveOrUpdateUser(user, t);

        await saveTopic(topic, savedUser.id, t);

        await t.commit();

        res.status(200).send();
    } catch (err) {
        await t.rollback();

        next(err);
    }
};
