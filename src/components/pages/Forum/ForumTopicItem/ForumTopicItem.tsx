import React from 'react';
import bemCn from 'libs/bemCn';

import './ForumTopicItem.scss';

const bemBlock = bemCn('forum-topic-item');

export const ForumTopicItem = () => (
    <li>
        <div className={bemBlock()}>
            <div className={bemBlock('wrapper')}>
                <span
                    className={bemBlock('title')}
                >
                        Помогите разобраться что делать
                </span>
                <span className={bemBlock('message-preview')}>
                        Всем привет, я медведь, как то шёл по лесу и увидел горящую машину...
                </span>
            </div>
            <div className={bemBlock('messages-count')}>88</div>
            <div className={bemBlock('last-message')}>
                <span
                    className={bemBlock('last-message-date')}
                >
                        17.07.2022 в 17:02
                </span>
                <span className={bemBlock('last-message-user')}>Заяц ☛</span>
            </div>
        </div>
    </li>
);
