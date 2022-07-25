import React from 'react';
import { Link } from 'react-router-dom';
import bemCn from 'libs/bemCn';

import './NotFound.scss';

const bemBlock = bemCn('not-found-page');

export const NotFoundPage = () => (
    <section className={bemBlock()}>
        <h1 className='visually-hidden'>Страница не найдена</h1>
        <p className={bemBlock('code')}>404</p>
        <p className={bemBlock('description')}>Ой, не туда попали</p>
        <Link to='/' className={bemBlock('link')}>Вернуться на главную</Link>
    </section>
);
