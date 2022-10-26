import axios from 'axios';
import {CreateNewPostParams, CreateNewTopicParams} from 'types';
import {API} from './API';

const SERVER_API = `${process.env.HOST}/api/v1`; // TODO убрать при конечной отладке

const getTopics = () => API.get(`${SERVER_API}/forum/topics`, {
    headers: {
        accept: 'application/json',
    },
    withCredentials: true,
});

const createTopic = (params: CreateNewTopicParams) => axios.post(
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

const createPost = (params: CreateNewPostParams) => axios.post(
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

export const forumApi = {
    getTopics,
    createTopic,
    createPost,
};
