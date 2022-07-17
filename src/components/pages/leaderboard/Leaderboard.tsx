import React from 'react';
import './Leaderboard.scss';
import {title, header, data} from './config';

const Leaderboard = () => (
    <div className={'leaderboard'}>
        <h1 className={'leaderboard__title'}>{title}</h1>
        <div className={'leaderboard__table table'}>
            <div className={'table__row'}>
                {Array.isArray(header) && header.map((line, i) => <span
                    className={`table__row-col--${i + 1}`}
                    key={line}>{line}</span>)}</div>
            <div>
                {Array.isArray(data) && data.map((row) => <div
                    className={'table__row  table__row-col--data'}
                    key={row[0]}>{row.map((line, i) => <span
                        className={`table__row-col--${i + 1}`}
                        key={line}
                    >{line}</span>)}</div>)}
            </div>
        </div>
    </div>
);

export default Leaderboard;
