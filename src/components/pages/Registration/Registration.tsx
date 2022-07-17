import React from 'react';
import {Form} from 'components/complex';
import './Registration.scss';
import {FormikValues, useFormik} from 'formik';
import {object, ref, string} from 'yup';
import {useNavigate} from 'react-router-dom';
import {regexValidation} from 'utils/validation';

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

    const validationSchema = object().shape({
        first_name: string()
            .trim()
            .matches(regexValidation.rules.first_name, 'Некорректный формат')
            .required('Обязательное поле'),
        second_name: string()
            .trim()
            .matches(regexValidation.rules.second_name, 'Некорректный формат')
            .required('Обязательное поле'),
        login: string()
            .trim()
            .matches(regexValidation.rules.login, 'Некорректный формат')
            .required('Обязательное поле'),
        email: string()
            .trim()
            .matches(regexValidation.rules.email, 'Некорректный формат')
            .required('Обязательное поле'),
        phone: string()
            .trim()
            .matches(regexValidation.rules.phone, 'Некорректный формат')
            .required('Обязательное поле'),
        password: string()
            .trim()
            .matches(regexValidation.rules.password, 'Некорректный формат')
            .required('Обязательное поле'),
        password_again: string()
            .trim()
            .matches(regexValidation.rules.password_again, 'Некорректный формат')
            .oneOf([ref('password'), null], 'Пароли не совпадают')
            .required('Обязательное поле'),
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
