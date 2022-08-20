import React, {FC, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form } from 'components/complex';
import './Login.scss';
import { FormikValues, useFormik } from 'formik';
import { object } from 'yup';
import { useNavigate } from 'react-router-dom';
import { commonSchema } from 'utils/validation';
import { loginFields } from 'components/pages/config';
import { LoginFormData } from 'api/AuthAPI'
import { login, StateType } from "slices/base";
import { clearMessage } from "slices/message";
import { ReactComponent as Loading } from 'images/loading.svg';
import { ReactComponent as Oauth } from 'images/yoauth.svg';

export const Login: FC = () => {
    const [loading, setLoading] = useState(false);
    const { message } = useSelector((state: StateType<any>) => state.message);
    const dispatch = useDispatch<any>();
    
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const {login: loginSchema, password: passwordSchema} = commonSchema;

    const validationSchema = object().shape({
        login: loginSchema,
        password: passwordSchema,
    });

    const formik = useFormik<FormikValues>({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema,
        onSubmit: data => {
            setLoading(true);
            dispatch(login(data as LoginFormData))
                .unwrap()
                .then(() => {
                    setTimeout(() => navigate('/'), 1000);
                })
                .catch(() => {
                    setLoading(false);
                });
        },
    });

    const OAuthEl = () => {
        const CLIENT_ID = '953cad724caf4fc28c183ff9ab6adb8a';
        const REDIRECT_URI = 'http://localhost:3000/';
        return (
            <div className="login__oauth">
                <a className="login__oauth-link" href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}>
                    <Oauth />
                </a>
            </div>
        );
    }

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
                        children: message ? message : loading ? (
                            <span className='button-loading'>
                                <Loading />
                            </span>
                        ) : 'Вход',
                        type: 'submit',
                        disabled: loading ? true : false
                    }}
                    custom={OAuthEl}
                    altUrlProps={{
                        children: 'Ещё не зарегистрированы?',
                        onClick: () => navigate('/registration'),
                    }}
                />
            </div>
        </div>
    );
};
