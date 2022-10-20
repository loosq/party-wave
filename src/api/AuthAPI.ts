import axios, {AxiosPromise} from 'axios';
import {UserFullData} from 'types';
import {API} from './API';

export interface RegisterFormData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
}

export interface LoginFormData {
    login: string,
    password: string,
}

const signUp = (data: RegisterFormData): AxiosPromise<{id: number}> => API.post('/auth/signup', data);

const signIn = (data: LoginFormData): AxiosPromise<void> => API.post('/auth/signin', data);

const getUserInfo = (): AxiosPromise<UserFullData> => API.get('/auth/user');

const logout = (): AxiosPromise<void> => API.post('/auth/logout');

const SERVER_API = 'https://localhost:3000/api/v1'; // TODO убрать при отладке на конечной платформе

const setForumAuth = (params: UserFullData): AxiosPromise<void> => axios.post(
    `${SERVER_API}/auth`,
    params,
    {
        headers: {
            accept: 'application/json',
            'Content-type': 'application/json',
        },
        withCredentials: true,
    },
);

const logoutOnForum = (): AxiosPromise<void> => axios.get(
    `${SERVER_API}/logout`,
    {
        headers: {
            accept: 'application/json',
            'Content-type': 'application/json',
        },
        withCredentials: true,
    },
);

const AuthService = {
    signUp,
    signIn,
    getUserInfo,
    logout,
    setForumAuth,
    logoutOnForum,
};

export default AuthService;
