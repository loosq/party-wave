import React from 'react';
import {Form} from 'components/complex';
import './Registration.scss';
import {FormikValues, useFormik} from 'formik';
import {object, ref} from 'yup';
import {useNavigate} from 'react-router-dom';
import {commonSchema} from 'utils/validation';

export const Registration: React.FC<unknown> = React.memo(() => {
    const fields = [
        {
            id: 'registration-first_name',
            name: 'first_name',
            label: 'Имя',
            type: 'text',
        },
        {
            id: 'registration-second_name',
            name: 'second_name',
            label: 'Фамилия',
            type: 'text',
        },
        {
            id: 'registration-login',
            name: 'login',
            label: 'Логин',
            type: 'text',
        },
        {
            id: 'registration-email',
            name: 'email',
            label: 'Почта',
            type: 'email',
        },
        {
            id: 'registration-phone',
            name: 'phone',
            label: 'Телефон',
            type: 'tel',
        },
        {
            id: 'registration-password',
            name: 'password',
            label: 'Пароль',
            type: 'password',
        },
        {
            id: 'registration-password_again',
            name: 'password_again',
            label: 'Пароль ещё раз',
            type: 'password',
        },
    ];

    const {
        name, phone, email, login, password,
    } = commonSchema;

    const validationSchema = object().shape({
        first_name: name,
        second_name: name,
        login,
        email,
        phone,
        password,
        password_again: password
            .oneOf([ref('password'), null], 'Пароли не совпадают'),
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

    const navigate = useNavigate();

    return (
        <div className='registration__window'>
            <div className='registration__container'>
                <div className='registration__title'>
                    Регистрация
                </div>
                <Form
                    className='form-info'
                    fields={fields}
                    formik={formik}
                    buttonProps={{
                        children: 'Зарегистрироваться',
                        type: 'submit',
                    }}
                    altUrlProps={{
                        children: 'Войти',
                        onClick: () => navigate('/login'),
                    }}
                />
            </div>
        </div>
    );
});
