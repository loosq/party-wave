import React, {FC, useEffect, useMemo, useState} from 'react';
import './Leaderboard.scss';
import { header, title } from 'components/pages/config';
import LeaderBoardService from 'api/Leaderboard'

export const Leaderboard: FC = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        LeaderBoardService.getAll({
            ratingFieldName: "score",
            cursor: 0,
            limit: 10
        }).then(res => setList(res))
    }, []);

    return (<div className="container">
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
                        list.length && list.map((item: Record<string, {[key in string]: string}>, i) => (
                            <div
                                className='table__row  table__row-col--data'
                                key={i}
                            >
                                <span className={`table__row-col--1`}>
                                    {i+1}
                                </span>
                                <span className={`table__row-col--2`}>
                                    {item.data.username}
                                </span>
                                <span className={`table__row-col--3`}>
                                    {item.data.score}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
)};
