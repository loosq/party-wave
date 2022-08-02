import React, {FC} from 'react';
import { Form } from 'components/complex';
import './Login.scss';
import { FormikValues, useFormik } from 'formik';
import { object } from 'yup';
import { useNavigate } from 'react-router-dom';
import { commonSchema } from 'utils/validation';
import { loginFields } from 'components/pages/config';

export const Login: FC = () => {
    const {login, password} = commonSchema;

    const validationSchema = object().shape({
        login,
        password,
    });

    const formik = useFormik<FormikValues>({
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
        <div className='login__window'>
            <div className='login__container'>
                <div className='login__title'>
                    Авторизация
                </div>
                <Form
                    className='form-info'
                    fields={loginFields}
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
};
