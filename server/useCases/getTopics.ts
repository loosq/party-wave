import {Response, Request, NextFunction} from 'express';
import {Post, Topic, User} from '../../db/models';

const attributes = ['firstName', 'displayName', 'secondName', 'avatar'];
const exclude = ['userId'];

export const getTopics = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const topics = await Topic.findAll({
            include: [
                {
                    model: Post,
                    include: [{
                        model: User,
                        required: false,
                        attributes,
                    }],
                    attributes: {
                        exclude,
                    },
                },
                {
                    model: User,
                    required: false,
                    attributes,
                },
            ],
            attributes: {
                exclude,
            },
        });

        res.status(200).send(topics);
    } catch (err) {
        next(err);
    }
};
