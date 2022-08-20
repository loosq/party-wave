export type FieldType = {
    id: string
    label: string
    name: string
    value?: string
    type: string
    required?: boolean
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
        required: true
    },
    {
        id: 'login-password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true
    },
];
const registrationFields = [
    {
        id: 'registration-first_name',
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        required: true
    },
    {
        id: 'registration-second_name',
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        required: true
    },
    {
        id: 'registration-login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true
    },
    {
        id: 'registration-email',
        name: 'email',
        label: 'Почта',
        type: 'email',
        required: true
    },
    {
        id: 'registration-phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        required: true
    },
    {
        id: 'registration-password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true
    },
];
const settingsInfoFields: Array<FieldType> = [
    {
        id: 'profile-email',
        label: 'Почта',
        name: 'email',
        type: 'email',
    },
    {
        id: 'profile-login',
        label: 'Логин',
        name: 'login',
        type: 'text',
    },
    {
        id: 'profile-first_name',
        label: 'Имя',
        name: 'first_name',
        type: 'text',
    },
    {
        id: 'profile-second_name',
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
    },
    {
        id: 'profile-display_name',
        label: 'Имя в чате',
        name: 'display_name',
        type: 'text',
    },
    {
        id: 'profile-phone',
        label: 'Телефон',
        name: 'phone',
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
