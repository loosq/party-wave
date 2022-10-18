import React from 'react';
import bemCn from 'libs/bemCn';
import dayjs from 'dayjs';
import {PostType} from 'types';
import AvatarDefault from '../../../../images/avatar.svg';

import './Post.scss';

type Props = {
    post: PostType;
};

const bemBlock = bemCn('post');

export const Post = ({post}: Props) => (
    <div className={bemBlock()}>
        <div className={bemBlock('user-info')}>
            <AvatarDefault />
            <p className={bemBlock('author-name')}>
                {post.author.displayName ?? post.author.firstName}
            </p>
        </div>
        <div className={bemBlock('text-info')}>
            <p className={bemBlock('text')}>
                {post.text}
            </p>
            <time className={bemBlock('post-time')}>
                {dayjs(post.date).format('DD.MM.YYYY HH.mm')}
            </time>
        </div>
    </div>
);
