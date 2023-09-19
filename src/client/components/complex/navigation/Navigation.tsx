import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';
import { SvgIcon } from '../../basic/svgIcon/SvgIcon';
import {useAppSelector, useAppDispatch} from '../../../../store/store';
import { setTheme, ThemeType } from '../../../../store/slices/theme';

const pages = [
  {
    name: 'Главная',
    to: '/',
  },
  {
    name: 'Тренеры',
    to: 'coaches',
  },
  {
    name: 'Расписание',
    to: 'schedule',
  },
  {
    name: 'Галерея',
    to: 'gallery',
  },
  {
    name: 'Новости',
    to: 'news',
  },
  {
    name: 'Записаться на занятие',
    to: 'get-lesson',
  },

];

export const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  
  useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as ThemeType;
        if (savedTheme) {
            dispatch(setTheme(savedTheme));
        }
    }, [dispatch]);

  return (
    <nav className={`${styles.navigationWrapper} ${theme === 'light' ? styles.light : styles.dark}`}>
      <ul className={styles.navigation}>
        <SvgIcon className={styles.logo} name={`logo-header-${theme}`} sizes={[54]} />
        {pages.map((page) => (
          <li key={page.to}>
            <NavLink className={page.to === 'get-lesson' ? styles.actionButton : styles.item} to={page.to}>{page.name}</NavLink>
          </li>
        ))}
        <button onClick={() => {
          const themeToSave = theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', themeToSave);
          dispatch(setTheme(themeToSave))
        }}>
        <SvgIcon className={styles.themeIcon} name={ theme === 'light' ? 'moon' : 'sun'} sizes={[45]}/>
      </button>
      </ul>
    </nav>
  )
};
