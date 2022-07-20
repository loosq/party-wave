import React, {useMemo} from 'react';
import './Leaderboard.scss';
import {data, header, title} from 'components/pages/config';

export const Leaderboard: React.FC<unknown> = React.memo(() => (
    <div className='leaderboard'>
        <h1 className='leaderboard__title'>{title}</h1>
        <div className='leaderboard__table table'>
            <div className='table__row'>
                {
                    useMemo(() => header.map((line, i) => (
                        <span
                            className={`table__row-col--${i + 1}`}
                            key={line}
                        >
                            {line}
                        </span>
                    )), [])
                }
            </div>
            <div>
                {
                    useMemo(() => data.map((row) => (
                        <div
                            className='table__row  table__row-col--data'
                            key={row[0]}
                        >
                            {row.map((line, i) => (
                                <span
                                    className={`table__row-col--${i + 1}`}
                                    key={line}
                                >
                                    {line}
                                </span>
                            ))}
                        </div>
                    )), [])
                }
            </div>
        </div>
    </div>
));
