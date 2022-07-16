import React from 'react';
import './Leaderboard.scss';
import {title, header, data} from './config';

const Leaderboard = () => (
    <div className={'leaderboard'}>
        <h1 className={'leaderboard__title'}>{title}</h1>
        <table>
            <thead>
                <tr>
                    {Array.isArray(header) && header.map((line) => <td
                        key={line}>{line}</td>)}</tr>
            </thead>
            <tbody>
                {Array.isArray(data) && data.map((row) => <tr key={row[0]}>{row.map((line) => <td
                    key={line}>{line}</td>)}</tr>)}
            </tbody>
        </table>
    </div>
);

export default Leaderboard;
