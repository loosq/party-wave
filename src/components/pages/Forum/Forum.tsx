import React, {useEffect, useState} from 'react';
import {Loader} from 'components/base/Loader';
import {useAppDispatch, useAppSelector} from 'store';
import {getTopics, selectIsTopicsLoading, selectTopics} from 'slices/forum';
import {ForumModal} from 'components/pages/Forum/ForumModal/ForumModal';
import {ForumTopicItem} from './ForumTopicItem';
import './Forum.scss';

export const Forum = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const topics = useAppSelector(selectTopics);
    const isLoading = useAppSelector(selectIsTopicsLoading);

    useEffect(() => {
        if (!topics) {
            dispatch(getTopics());
        }
    }, [topics]);

    return (
        <div className='container'>
            <div className='forum'>
                <h1 className='leaderboard__title'>Форум</h1>
                <div className='forum__head head'>
                    <span className='head__theme'>Тема</span>
                    <span className='head__messages'>Сообщений</span>
                    <span className='head__last-message'>Последнее сообщение</span>
                </div>
                {(isLoading || !topics) && <div className='forum__container'><Loader /></div>}
                {topics && !topics.length && <p className='forum__no-topics'>Список тем пуст</p> }
                {topics && Boolean(topics.length) && (
                    <ul className='forum__topics-list'>
                        {topics.map((topic) => (
                            <li key={topic.id}>
                                <ForumTopicItem topic={topic} />
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    onClick={() => setIsOpen(true)}
                    className='forum__add-topic-button'
                >
                    Создать тему
                </button>
            </div>
            <ForumModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
