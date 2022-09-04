import { API } from "./API";

export interface UserProfileData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
};

export interface UserPasswordData {
    oldPassword: string,
    newPassword: string,
};

const changeProfile = async (data: UserProfileData) => {
    return await API.put('/user/profile', data).then(res => res.data);
};

const changeAvatar = async (data: FormData) => {
    return await API.put('/user/profile/avatar', data).then(res => res.data);
};

const changePassword = async (data: UserPasswordData) => {
    return await API.put('/user/password', data).then(res => res.data);
};

const UsersService = {
    changeProfile,
    changeAvatar,
    changePassword,
};

export default UsersService;