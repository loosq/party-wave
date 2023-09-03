import { string } from 'yup';

const validationRules = {
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*#?&-]{8,40}$/,
    name: /^[A-ZА-Я][A-zА-я-]+$/u,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
    phone: /^[+]?[0-9]{10,15}$/,
};

export const commonSchema = {
    login: string()
        .trim()
        .matches(validationRules.login, 'Некорректный формат')
        .required('Обязательное поле'),
    password: string()
        .trim()
        .matches(validationRules.password, 'Некорректный формат')
        .required('Обязательное поле'),
    name: string()
        .trim()
        .matches(validationRules.name, 'Некорректный формат')
        .required('Обязательное поле'),
    email: string()
        .trim()
        .matches(validationRules.email, 'Некорректный формат')
        .required('Обязательное поле'),
    phone: string()
        .trim()
        .matches(validationRules.phone, 'Некорректный формат')
        .required('Обязательное поле'),
};
