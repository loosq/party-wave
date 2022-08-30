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
};

export default AuthService;