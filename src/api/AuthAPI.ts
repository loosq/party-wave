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
export interface AuthData {
    code: string,
    redirect_uri: string,
}

const SERVER_API = `${process.env.HOST}/api/v1`;

const signUp = (data: RegisterFormData): AxiosPromise<{id: number}> => API.post('/auth/signup', data);

const signIn = (data: LoginFormData): AxiosPromise<void> => API.post('/auth/signin', data);

const getUserInfo = (): AxiosPromise<UserFullData> => API.get('/auth/user');

const authYandexServiceId = async (redirect_uri: string) => {
    return await API.get(`/oauth/yandex/service-id?redirect_uri=${redirect_uri}`).then(res => res.data);
};

const authYandex = (data: AuthData): AxiosPromise<void> => API.post('/oauth/yandex', data)

const logout = (): AxiosPromise<void> => API.post('/auth/logout');




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
    authYandexServiceId,
    authYandex
};

export default AuthService;
