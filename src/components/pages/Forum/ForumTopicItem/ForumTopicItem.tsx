import React, { FC } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import {Topic} from 'types';
import bemCn from 'libs/bemCn';

import './ForumTopicItem.scss';

interface Props {
    topic: Topic;
}

const bemBlock = bemCn('forum-topic-item');

export const ForumTopicItem: FC<Props> = ({topic}) => {
    const lastPostInTopic = topic.posts.at(-1);

    return (
        <div className={bemBlock()}>
            <div className={bemBlock('wrapper')}>
                <Link
                    className={bemBlock('title')}
                    to={`/forum/topic/${topic.id}`}
                >
                    {topic.title}
                </Link>
                <span className={bemBlock('last-message-preview')}>
                    {lastPostInTopic?.text}
                </span>
            </div>
            <div className={bemBlock('messages-count')}>{topic.posts.length}</div>
            <div className={bemBlock('last-message')}>
                <span
                    className={bemBlock('last-message-date')}
                >
                    {dayjs(lastPostInTopic?.date ?? '')
                        .format('DD.MM.YYYY HH:mm')}
                </span>
                <span className={bemBlock('last-message-user')}>
                    {lastPostInTopic?.author.firstName}
                    <span>☛</span>
                </span>
            </div>
        </div>
    );
};
