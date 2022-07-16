import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.scss';
import pages from './config';
import {Props} from './types';

const Navigation: Props = ({haveUser = false}) => (
    <nav>
        <ul className={'navigation'}>
            {Array.isArray(pages) && pages.map(({
                to,
                name,
            }) => (
                <li key={to}>
                    <NavLink
                        className={({isActive}) => `navigation__link ${isActive ? 'navigation__link--active' : 'navigation__link'}`}
                        title={name}
                        to={to}
                    >
                        {name}
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation;
