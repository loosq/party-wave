import React, { useEffect, useState } from 'react';
import './Settings.scss';
import { Avatar } from 'components/base';
import { Form } from 'components/complex';
import { commonSchema } from 'utils/validation';
import { object } from 'yup';
import { FormikValues, useFormik } from 'formik';
import {
    settingsInfoFields,
    settingsPasswordFields,
} from 'components/pages/config';
import { useSelector } from 'react-redux';
import { UserProfileData, UserPasswordData } from 'api/UsersAPI'
import { changeProfile, changePassword } from "slices/base";
import { clearMessage } from "slices/message";
import { ReactComponent as Loading } from 'images/loading.svg';
import { RootState, useAppDispach } from 'store';


export const Settings: React.FC<UserProfileData | {}> = React.memo(() => {
    const [readMode, setReadMode] = useState(true);
    const [stateForm, setStateForm] = useState(true);
    const [fields, setFields] = useState(settingsInfoFields);
    const [loading, setLoading] = useState(false);
    
    const { user: currentUser } = useSelector((state: RootState) => state.base);

    const { message } = useSelector((state: RootState) => state.message);
    const dispatch = useAppDispach();

    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

    const cb = () => {
        setTimeout(() => {
            setFields(settingsInfoFields);
            setReadMode(true);
            setLoading(false);
            dispatch(clearMessage());
        }, 2000);
    }

    const links = [
        {
            id: '1',
            children: 'Изменить данные',
            onClick: () => {
                setStateForm(true)
                setReadMode(false);
            },
        },
        {
            id: '2',
            children: 'Изменить пароль',
            onClick: () => {
                setFields(settingsPasswordFields);
                setStateForm(false)
                setReadMode(false);
            },
        }
    ];

    const {
        name, phone, email, login, 
        password,
    } = commonSchema;

    const validationSchema = object().shape(stateForm ? {
        email,
        login,
        first_name: name,
        second_name: name,
        display_name: name,
        phone
    } : {
        oldPassword: password,
        newPassword: password
    });

    const formik = useFormik<FormikValues>({
        initialValues: {
            first_name: currentUser.first_name ? currentUser.first_name : '',
            second_name: currentUser.second_name ? currentUser.second_name : '',
            login: currentUser.login ? currentUser.login : '',
            email: currentUser.email ? currentUser.email : '',
            phone: currentUser.phone ? currentUser.phone : '',
            display_name: currentUser.display_name ? currentUser.display_name : '',
        },
        validationSchema,
        onSubmit: (data) => {
            setLoading(true);

            if(stateForm){
                dispatch(changeProfile(data as UserProfileData))
                    .unwrap()
                    .then(cb)
                    .catch(() => {
                        setLoading(false);
                    });
            } else {
                dispatch(changePassword(data as UserPasswordData))
                    .unwrap()
                    .then(cb)
                    .catch(() => {
                        setLoading(false);
                    });
            }
        },
    });

    return (
        <div className='settings__window'>
            <div className='settings__container'>
                {readMode && (
                    <>
                        <Avatar
                            className='settings__photo'
                            src={currentUser.avatar}
                            alt='avatar'
                        />
                        <h3 className='settings__title'>
                            {`${currentUser.first_name} ${currentUser.second_name}`}
                        </h3>
                        <h2 className='settings__score'>
                            {`Счет: ${currentUser.score ? currentUser.score : 0}`}
                        </h2>
                    </>
                )}
                <Form
                    className='form-info'
                    readMode={readMode}
                    fields={fields}
                    links={currentUser.auth ? [] : links}
                    formik={formik}
                    buttonProps={{
                        children: message ? message : loading ? (
                            <span className='button-loading'>
                                <Loading />
                            </span>
                        ) : 'Сохранить',
                        type: 'submit',
                        disabled: loading ? true : false,
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
