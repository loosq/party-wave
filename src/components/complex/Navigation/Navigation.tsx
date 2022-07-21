import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.scss';
import {pages} from '../config';

type Props = {
    haveUser?: boolean
}

export const Navigation: React.FC<Props> = React.memo(() => (
    <nav>
        <ul className='navigation'>
            {
                useMemo(() => pages.map(({to, name}) => (
                    <li key={to}>
                        <NavLink
                            className={({isActive}) => `navigation__link ${isActive
                                ? 'navigation__link--active'
                                : ''}`}
                            title={name}
                            to={to}
                        >
                            {name}
                        </NavLink>
                    </li>
                )), [])
            }
        </ul>
    </nav>
));
