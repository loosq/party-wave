import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.scss';
import pages from './config';

type Props = FC<{
    haveUser?: boolean
}>

const Navigation: Props = React.memo(({haveUser = false}) => (
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
));

export default Navigation;
