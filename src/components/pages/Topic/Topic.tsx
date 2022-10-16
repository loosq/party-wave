import React from 'react';
import bemCn from 'libs/bemCn';
import {useParams} from 'react-router-dom';
import {useAppSelector} from 'store';
import {selectTopicById} from 'slices/forum';
import {NotFoundPage} from 'components/pages';
import {Post} from './Post/Post';

import './Topic.scss';

const bemBlock = bemCn('topic-page');

export const Topic = () => {
    const {id} = useParams();

    const topic = useAppSelector((state) => selectTopicById(state, id));

    if (!topic) {
        return <NotFoundPage />;
    }

    return (
        <div className='container'>
            <section className={bemBlock()}>
                <h1 className={bemBlock('page-title')}>Просмотр темы</h1>
                <div className={bemBlock('topic-header')}>
                    <p className={bemBlock('topic-title')}>{topic?.title}</p>
                    <button className={bemBlock('new-message-button')}>Новое сообщение</button>
                </div>
                <ul className={bemBlock('posts')}>
                    {topic.posts.map((post) => (
                        <li key={post.id}>
                            <Post post={post} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};
