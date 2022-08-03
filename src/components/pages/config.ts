export type FieldType = {
    id: string
    label: string
    name: string
    value?: string
    type: string
}

const title = 'Таблица лучших результатов';
const header: Array<string> = ['Место', 'Имя', 'Лучший результат'];
const data: Array<Array<number | string>> = [
    [1, 'Vasya Pupkin', 14],
    [2, 'Pupkin Pupkin', 66],
    [3, 'Vasya Vasya', 0],
];
const loginFields: Array<FieldType> = [
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
const registrationFields = [
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
const settingsInfoFields: Array<FieldType> = [
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
const settingsPasswordFields: Array<FieldType> = [
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

export {
    title,
    data,
    header,
    loginFields,
    registrationFields,
    settingsInfoFields,
    settingsPasswordFields,
};
