import {Response, Request, NextFunction} from 'express';
import {Post, Topic, User} from '../../db/models';

export const getTopics = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const topics = await Topic.findAll({
            include: [
                {
                    model: Post,
                    include: [{
                        model: User,
                        required: false,
                        attributes: ['firstName', 'displayName', 'secondName', 'avatar'],
                    }],
                    attributes: {
                        exclude: ['userId'],
                    },
                },
                {
                    model: User,
                    required: false,
                    attributes: ['firstName', 'displayName', 'secondName', 'avatar'],
                },
            ],
            attributes: {
                exclude: ['userId'],
            },
        });

        res.status(200).send(topics);
    } catch (err) {
        next(err);
    }
};
