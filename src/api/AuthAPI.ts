import { API } from "./API";

export interface RegisterFormData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
};

export interface LoginFormData {
    login: string,
    password: string,
};

export interface UserInfoData {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
};

const signUp = async (data: RegisterFormData) => {
    return await API.post('/auth/signup', data).then(res => res.data);
};

const signIn = async (data: LoginFormData) => {
    return await API.post('/auth/signin', data).then(res => res.data);
};

// const authYandex = async (data: Object) => {
//     return await API.post('/oauth/yandex', data).then(res => res.data);
// };

const authYandex = async (data: Object) => {
    return await API.postCustom('https://oauth.yandex.ru/token', data).then(res => res.data);
};

const yandexGetInfo = async (data: Object) => {
    return await API.postCustom('https://login.yandex.ru/info', data).then(res => res.data);
};

const authYandexServiceId = async (redirect_uri: string) => {
    return await API.get(`/oauth/yandex/service-id?redirect_uri=${redirect_uri}`).then(res => res.data);
};

const getUserInfo = async () => {
    return await API.get('/auth/user');
};

const logout = async () => {
    return await API.post('/auth/logout').then(res => res.data);
};

const AuthService =  {
    signUp,
    signIn,
    getUserInfo,
    logout,
    authYandex,
    yandexGetInfo,
    authYandexServiceId
};

export default AuthService;