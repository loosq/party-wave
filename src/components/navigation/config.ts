type pageType = {
    to: string,
    name: string
}

const pages: pageType[] = [
    {
        to: '/',
        name: 'Главная',
    },
    {
        to: '/registration',
        name: 'Регистрация',
    },
    {
        to: '/login',
        name: 'Вход',
    },
    {
        to: '/statistics',
        name: 'Статистика',
    },
    {
        to: '/settings',
        name: 'Настройки',
    },
    {
        to: '/forum',
        name: 'Форум',
    },
    // {
    //     to: '/search',
    //     name: 'Поиск',
    // },
];

export default pages;
