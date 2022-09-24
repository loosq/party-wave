import React from 'react';
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
            <div className='forum__topic topic'>
                <div className='topic__wrapper'>
                    <span
                        className='topic__title'
                    >
                        Помогите рабобраться что делать
                    </span>
                    <span className='topic__message-preview'>
                        Всем привет, я медведь, как то шёл по лесу и увидел горящую машину...
                    </span>
                </div>
                <div className='topic__messages-count'>88</div>
                <div className='topic__last-message last-message'>
                    <span
                        className='last-message__date'
                    >
                        17.07.2022 в 17:02
                    </span>
                    <span className='last-message__user'>Заяц ☛</span>
                </div>
            </div>
            <div className='forum__topic topic'>
                <div className='topic__wrapper'>
                    <span
                        className='topic__title'
                    >
                        Помогите рабобраться что делать
                    </span>
                    <span className='topic__message-preview'>
                        Всем привет, я медведь, как то шёл по лесу и увидел горящую машину...
                    </span>
                </div>
                <div className='topic__messages-count'>41</div>
                <div className='topic__last-message last-message'>
                    <span
                        className='last-message__date'
                    >
                        17.07.2022 в 17:02
                    </span>
                    <span className='last-message__user'>Заяц ☛</span>
                </div>
            </div>
        </div>
    </div>
);
