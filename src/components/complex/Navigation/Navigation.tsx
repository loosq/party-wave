import React, { useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { logout } from 'slices/base';
import { ReactComponent as AvatarDefault } from 'images/avatar.svg';
import { ReactComponent as Logo } from 'images/logo.svg';
import { API_URL } from 'api/API';
import { useAppDispatch } from 'store';
import { pages } from '../config';

export const Navigation: React.FC = React.memo(({
    isLoggedIn, avatar, login, score,
}: any) => {
    const dispatch = useAppDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <div className='container'>
            <nav>
                <ul className='navigation'>
                    <li>
                        <NavLink to='/' className='navigation__logo'>
                            <div className='navigation__logo-inner'>
                                <Logo />
                            </div>
                            <span>
                                cosmobot
                            </span>
                        </NavLink>
                    </li>
                    <li className='navigation__menu'>
                        <ul>
                            {
                                useMemo(() => pages.map(({to, name}) => (
                                    <li key={to}>
                                        <NavLink
                                            className={({isActive}) => `navigation__link ${isActive
                                                ? 'navigation__link--active'
                                                : ''}`}
                                            to={to}
                                        >
                                            <span>
                                                {name}
                                                <i />
                                            </span>
                                        </NavLink>
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
                                    {avatar
                                        ? <img src={`${API_URL}/resources${avatar}`} alt='' />
                                        : <AvatarDefault />}
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
                                            <NavLink to='/settings' className='dropdown__link'>Профиль</NavLink>
                                        </div>
                                        <div className='dropdown__item'>
                                            <button className='dropdown__link' onClick={logOut}>Выход</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <li>
                            <NavLink className={({isActive}) => `navigation__link navigation__link-signin ${isActive ? 'navigation__link--active' : ''}`} to='/login'>
                                Вход
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
});
