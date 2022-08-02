import React, { useState } from 'react';
import './Settings.scss';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from 'components/base';
import { Form } from 'components/complex';
import { commonSchema } from 'utils/validation';
import { object, ref } from 'yup';
import { FormikValues, useFormik } from 'formik';
import {
    settingsInfoFields,
    settingsPasswordFields,
} from 'components/pages/config';
import emptyAvatar from '../../../../static/images/empty-avatar.png';

export const Settings: React.FC<unknown> = React.memo(() => {
    const [readMode, setReadMode] = useState(true);

    const [fields, setFields] = useState(settingsInfoFields);

    const navigate = useNavigate();

    const links = [
        {
            id: '1',
            children: 'Изменить данные',
            onClick: () => {
                setReadMode(false);
            },
        },
        {
            id: '2',
            children: 'Изменить пароль',
            onClick: () => {
                setFields(settingsPasswordFields);
                setReadMode(false);
            },
        },
        {
            id: '3',
            children: 'Выйти',
            onClick: () => {
                console.log('logout');
                navigate('/login');
            },
        },
    ];

    const {
        name, phone, email, login, password,
    } = commonSchema;

    const validationSchema = object().shape({
        email,
        login,
        first_name: name,
        second_name: name,
        display_name: name,
        phone,
        oldPassword: password,
        newPassword: password,
        newPassword_again: password
            .oneOf([ref('newPassword'), null], 'Пароли не совпадают'),
    });

    const formik = useFormik<FormikValues>({
        initialValues: {
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            phone: '',
            password: '',
            password_again: '',
        },
        validationSchema,
        onSubmit: () => {
            console.log('submitted');
        },
    });

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
                <h3 className='settings__title'>
                    Tony
                </h3>
                <Form
                    className='form-info'
                    readMode={readMode}
                    fields={fields}
                    links={links}
                    formik={formik}
                    buttonProps={{
                        children: 'Сохранить',
                        type: 'submit',
                    }}
                    altUrlProps={{
                        children: 'Назад',
                        onClick: () => {
                            setReadMode(true);
                            setFields(settingsInfoFields);
                        },
                    }}
                />
            </div>
        </div>
    );
});
