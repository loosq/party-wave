import axios from 'axios';
import {createNewPostParams, createNewTopicParams} from 'types';
import {API} from 'api/API';

const SERVER_API = 'https://localhost:3000/api/v1'; // TODO убрать localhost

const getTopics = () => API.get(`${SERVER_API}/forum/topics`, {
    headers: {
        accept: 'application/json',
    },
    withCredentials: true,
});

const createTopic = (params: createNewTopicParams) => axios.post(
    `${SERVER_API}/forum/topics`,
    params,
    {
        headers: {
            accept: 'application/json',
            'Content-type': 'application/json',
        },
        withCredentials: true,
    },
);

const createPost = (params: createNewPostParams) => axios.post(
    `${SERVER_API}/forum/topics/${params.topicId}/posts`,
    params,
    {
        headers: {
            accept: 'application/json',
            'Content-type': 'application/json',
        },
        withCredentials: true,
    },
);

// TODO authHandler и userHandler перенести в AuthApi или удалить

const auth = (params: {login: string; password: string}) => axios.post(
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

const getUser = () => API.get(`${SERVER_API}/user`, {
    headers: {
        accept: 'application/json',
    },
    withCredentials: true,
});

export const forumApi = {
    getTopics,
    createTopic,
    createPost,
    /**
     * @deprecated перенести в AuthApi или удалить
     */
    auth,
    /**
     * @deprecated перенести в AuthApi или удалить
     */
    getUser,
};
