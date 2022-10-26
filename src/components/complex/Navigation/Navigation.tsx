import React, {useCallback, useEffect, useMemo} from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { logout } from 'slices/base';
import { API_URL } from 'api/API';
import {useAppDispatch, useAppSelector} from 'store';
import {setTheme, themeType} from 'slices/theme';
import AvatarDefault from '../../../images/avatar.svg';
import Logo from '../../../images/logo.svg';
import { pages } from '../config';

export const Navigation: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        base: {
            user,
            isLoggedIn,
        },
        theme,
    } = useAppSelector((state) => state);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as themeType;
        if (savedTheme) {
            dispatch(setTheme(savedTheme));
        }
    }, [dispatch]);

    const handleChange = () => {
        let themeToSave: themeType;
        // eslint-disable-next-line default-case
        switch (theme.current) {
            case 'dark':
                themeToSave = 'light';
                break;
            case 'light':
                themeToSave = 'dark';
                break;
        }
        dispatch(setTheme(themeToSave));
        localStorage.setItem('theme', themeToSave);
    };
    return (
        <div className='container'>
            <nav>
                <ul className='navigation'>
                    <li>
                        <NavLink to='/' className='navigation__logo'>
                            <div className='navigation__logo-inner'>
                                <img src={Logo} alt='Logo' />
                            </div>
                            <span>
                                cosmobot
                            </span>
                        </NavLink>
                    </li>
                    <li className='navigation__menu'>
                        <ul>
                            {
                                useMemo(() => pages.map(({
                                    to,
                                    name,
                                }) => (
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
                    <li>
                        <label className='navigation__theme-switch switch'>
                            <input type='checkbox' onChange={handleChange} checked={theme.current === 'dark'} />
                            <span className='slider round' />
                        </label>
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <div className="profile">
                                <div className="profile__name">{user?.login}</div>
                                <div className="profile__thumb">
                                    {user?.avatar ? (<img src={`${API_URL}/resources${user.avatar}`} alt='' />) : <img src={AvatarDefault} alt='' />}
                                </div>
                                <div className='dropdown'>
                                    <div className='dropdown__list'>
                                        <div className='dropdown__item'>
                                            <NavLink
                                                to='/settings'
                                                className='dropdown__link'
                                            >
                                                Профиль
                                            </NavLink>
                                        </div>
                                        <div className='dropdown__item'>
                                            <button
                                                className='dropdown__link'
                                                onClick={logOut}
                                            >
                                                Выход
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <li>
                            <NavLink
                                className={({isActive}) => `navigation__link navigation__link-signin ${isActive ? 'navigation__link--active' : ''}`}
                                to='/login'
                            >
                                Вход
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};
