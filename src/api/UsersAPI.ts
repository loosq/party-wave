import {AxiosPromise} from 'axios';
import {UserFullData} from 'types';
import { API } from './API';

export interface UserProfileData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
}

export interface UserPasswordData {
    oldPassword: string,
    newPassword: string,
}

const changeProfile = (data: UserProfileData): AxiosPromise<UserFullData> => API.put('/user/profile', data);

const changeAvatar = (data: FormData): AxiosPromise<UserFullData> => API.put('/user/profile/avatar', data);

const changePassword = (data: UserPasswordData): AxiosPromise<void> => API.put('/user/password', data);

const UsersService = {
    changeProfile,
    changeAvatar,
    changePassword,
};

export default UsersService;
