import React, { useCallback, useMemo } from 'react';
import './Navigation.scss';
import { logout } from 'slices/base';
import Logo from 'images/logo.svg';
import { API_URL } from 'api/API';
import { useAppDispatch } from 'store';
import { pages } from '../config';

export const Navigation: React.FC = React.memo(({
    isLoggedIn, avatar, score, login,
}: any) => {
    const dispatch = useAppDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);
    const isActive = false;
    return (
        <div className='container'>
            <nav>
                <ul className='navigation'>
                    <li>
                        <a href='/' className='navigation__logo'>
                            <div className='navigation__logo-inner'>
                                <img src={Logo} alt='Logo' />
                            </div>
                            <span>
                                cosmobot
                            </span>
                        </a>
                    </li>
                    <li className='navigation__menu'>
                        <ul>
                            {
                                useMemo(() => pages.map(({to, name}) => (
                                    <li key={to}>
                                        <a
                                            className={`navigation__link ${isActive
                                                ? 'navigation__link--active'
                                                : ''}`}
                                            href={to}
                                        >
                                            <span>
                                                {name}
                                                <i />
                                            </span>
                                        </a>
                                    </li>
                                )), [])
                            }

                        </ul>
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <div className='profile'>
                                <div className='profile__name'>{login}</div>
                                <div className='profile__thumb'>
                                    {avatar ? (<img src={`${API_URL}/resources${avatar}`} />) : ''}
                                </div>
                                <div className='dropdown'>
                                    <div className='dropdown__list'>
                                        <div className='dropdown__item'>
                                            <div className='dropdown__score'>
Счет:
                                                {score || 0}
                                            </div>
                                        </div>
                                        <div className='dropdown__item'>
                                            <a href='/settings' className='dropdown__link'>Профиль</a>
                                        </div>
                                        <div className='dropdown__item'>
                                            <a className='dropdown__link' onClick={logOut}>Выход</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <li>
                            <a className={`navigation__link navigation__link-signin ${isActive ? 'navigation__link--active' : ''}`} href='/login'>
                                Вход
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
});
