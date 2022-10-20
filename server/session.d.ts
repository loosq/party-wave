import {Nullable} from 'types';

export type User = {
    avatar: Nullable<string>;
    display_name: Nullable<string>;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
};

declare module 'express-session' {

    interface SessionData {
        user: User;
    }
}
