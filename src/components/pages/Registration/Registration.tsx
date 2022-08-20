import React, {FC, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form } from 'components/complex';
import './Registration.scss';
import { FormikValues, useFormik } from 'formik';
import { object } from 'yup';
import { useNavigate } from 'react-router-dom';
import { commonSchema } from 'utils/validation';
import { registrationFields } from 'components/pages/config';
import { RegisterFormData } from 'api/AuthAPI'
import { register, StateType } from "slices/base";
import { clearMessage } from "slices/message";
import { ReactComponent as Loading } from 'images/loading.svg';

export const Registration: FC = () => {
    const [loading, setLoading] = useState(false);
    const { message } = useSelector((state: StateType<any>) => state.message);
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

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
    });

    const formik = useFormik<FormikValues>({
        initialValues: {
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            phone: '',
            password: '',
        },
        validationSchema,
        onSubmit: data => {
            setLoading(true);
            dispatch(register(data as RegisterFormData))
                .unwrap()
                .then(() => {
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(() => {
                    setLoading(false);
                });
        },
    });

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
                        children: message ? message : loading ? (
                            <span className='button-loading'>
                                <Loading />
                            </span>
                        ) : 'Зарегистрироваться',
                        type: 'submit',
                        disabled: loading ? true : false
                    }}
                    altUrlProps={{
                        children: 'Войти',
                        onClick: () => navigate('/login'),
                    }}
                />
            </div>
        </div>
    );
};
