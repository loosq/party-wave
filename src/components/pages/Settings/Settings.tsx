import React, {useState} from 'react';
import './Settings.scss';
import {useNavigate} from 'react-router-dom';
import {Avatar, Button} from 'components/base';
import {Form} from 'components/complex';
import {commonSchema} from 'utils/validation';
import {object, ref} from 'yup';
import {FormikValues, useFormik} from 'formik';
import emptyAvatar from '../../../../static/images/emptyAvatar.png';

type FieldType = {
    id: string
    label: string
    name: string
    value?: string
    type: string
}

const infoFields = [
    {
        id: 'profile-email',
        label: 'Почта',
        name: 'email',
        value: 'sdfgdsfg',
        type: 'email',
    },
    {
        id: 'profile-login',
        label: 'Логин',
        name: 'login',
        value: 'asdfasdf',
        type: 'text',
    },
    {
        id: 'profile-first_name',
        label: 'Имя',
        name: 'first_name',
        value: 'tewrtwerg',
        type: 'text',
    },
    {
        id: 'profile-second_name',
        label: 'Фамилия',
        name: 'second_name',
        value: 'dfgsdfgsdf',
        type: 'text',
    },
    {
        id: 'profile-display_name',
        label: 'Имя в чате',
        name: 'display_name',
        value: 'djhdfghs',
        type: 'text',
    },
    {
        id: 'profile-phone',
        label: 'Телефон',
        name: 'phone',
        value: 'qwfasdfasdf',
        type: 'tel',
    },
];

const passwordFields = [
    {
        id: 'profile-oldPassword',
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
    },
    {
        id: 'profile-newPassword',
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
    },
    {
        id: 'profile-newPassword_again',
        label: 'Повторите новый пароль',
        name: 'newPassword_again',
        type: 'password',
    },
];

export const Settings: React.FC<unknown> = React.memo(() => {
    const [readMode, setReadMode] = useState(true);

    const [fields, setFields] = useState<Array<FieldType>>(infoFields);

    const navigate = useNavigate();

    const links = [
        {
            children: 'Изменить данные',
            onClick: () => {
                setReadMode(false);
            },
        },
        {
            children: 'Изменить пароль',
            onClick: () => {
                setFields(passwordFields);
                setReadMode(false);
            },
        },
        {
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
                            setFields(infoFields);
                        },
                    }}
                />
            </div>
        </div>
    );
});
