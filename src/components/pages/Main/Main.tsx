import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Main.scss';

export const Main: React.FC<unknown> = () => {
    useEffect(() => {
        document.body.classList.add('app-main');
        return () => {
            document.body.classList.remove('app-main');
        };
    }, []);

    return (
        <div className='main'>
            <div className='main__grid'>
                <div className='main__grid-1'>
                    <h1 className='main__title'>Cosmo bot</h1>
                    <p className='main__text'>
                            Пройди множество препятствий, чтобы помочь космоботу вернуться домой.
                        <br />
                            Его корабль потерпел крушение и теперь
                            придётся выбираться. Ты - его главный помощник.
                            Но будь осторожен! На неизвестной планете вас ждут опасные существа.
                            Уклоняйся, перепрыгивай и ускоряйся, чтобы выжить.
                    </p>
                    <Link to='/game' className='main__call'>НАЧАТЬ ИГРУ</Link>
                </div>
                <div className='main__grid-2'>
                    <div className='main__video'>
                        <div className='main__video-inner'>
                            <video loop muted autoPlay playsInline preload='metadata' poster='/video/poster.png'>
                                <source src='/video/main.mp4' type='video/mp4' />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
