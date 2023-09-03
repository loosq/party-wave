import axios from 'axios';

export const API_URL = '';

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    baseURL: API_URL,
});

export const API = {
    get: (url: string, options?: Object) => instance.get(url, options),

    post: (url: string, options?: Object) => instance.post(url, options),

    postCustom: (url: string, data: Object, options?: Object) => axios.post(url, data, options),

    postMethod: (url: string, data: any, options?: Object) => instance.post(url, data, options),

    put: (url: string, options?: Object) => instance.put(url, options),

    delete: (url: string, options?: Object) => instance.delete(url, options),
};
