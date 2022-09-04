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
        to: '/statistics',
        name: 'Лидерборд',
    },
    {
        to: '/forum',
        name: 'Форум',
    },
];