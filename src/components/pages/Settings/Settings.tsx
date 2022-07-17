import React from 'react';
import './Settings.scss';
import {useNavigate} from 'react-router-dom';
import {Avatar, Button} from 'components/base';
import emptyAvatar from '../../../../static/images/emptyAvatar.png';

export const Settings: React.FC<unknown> = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className='settings__window'>
            <Button
                className='to-game'
                onClick={() => navigate('/')}
            >
                ➜
            </Button>
            <div className='settings__container'>
                <Avatar
                    className='settings__photo'
                    src={emptyAvatar}
                    alt='avatar'
                />
                <div className='settings__title'>
                    Tony
                </div>
            </div>
        </div>
    );
});
