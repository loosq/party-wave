type PageType = {
    to: string,
    name: string
}

export const pages: Array<PageType> = [
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
