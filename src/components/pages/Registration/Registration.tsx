import React from 'react';
import {Form} from 'components/complex';
import './Registration.scss';
import {FormikValues, useFormik} from 'formik';
import {object, ref} from 'yup';
import {useNavigate} from 'react-router-dom';
import {commonSchema} from 'utils/validation';
import {registrationFields} from 'components/pages/config';

export const Registration: React.FC<unknown> = React.memo(() => {
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
                    fields={registrationFields}
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
