import React from 'react';
import {ForumTopicItem} from './ForumTopicItem';
import './Forum.scss';

export const Forum: React.FC<unknown> = () => (
    <div className='container'>
        <div className='forum'>
            <h1 className='leaderboard__title'>Форум</h1>
            <div className='forum__head head'>
                <span className='head__theme'>Тема</span>
                <span className='head__messages'>Сообщений</span>
                <span className='head__last-message'>Последнее сообщение</span>
            </div>
            <ul className='forum__topics-list'>
                <ForumTopicItem />
                <ForumTopicItem />
            </ul>
        </div>
    </div>
);
