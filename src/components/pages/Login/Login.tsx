import React from 'react';
import {Form} from 'components/complex';
import './Login.scss';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import {useNavigate} from 'react-router-dom';
import {regexValidation} from 'utils/validation';

export const Login: React.FC<unknown> = React.memo(() => {
    const fields = [
        {
            id: 'login-login',
            name: 'login',
            label: 'Логин',
            type: 'text',
        },
        {
            id: 'login-password',
            name: 'password',
            label: 'Пароль',
            type: 'password',
        },
    ];

    const validationSchema = object().shape({
        login: string()
            .trim()
            .matches(regexValidation.rules.login, 'Некорректный формат')
            .required('Обязательное поле'),
        password: string()
            .trim()
            .matches(regexValidation.rules.password, 'Некорректный формат')
            .required('Обязательное поле'),
    });

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema,
        onSubmit: () => {
            console.log('submitted');
        },
    });

    const navigate = useNavigate();

    return (
        <div className='login-window'>
            <div className='login-container'>
                <div className='login-title'>
                    Авторизация
                </div>
                <Form
                    className='form-info'
                    fields={fields}
                    formik={formik}
                    buttonProps={{
                        children: 'Вход',
                        type: 'submit',
                    }}
                    altUrlProps={{
                        children: 'Ещё не зарегистрированы?',
                        onClick: () => navigate('/registration'),
                    }}
                />
            </div>
        </div>
    );
});
