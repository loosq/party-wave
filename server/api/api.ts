import {Router} from 'express';
import {
    auth, createPost, createTopic, getTopics, logout,
} from '../useCases';
import {authorizeMiddleware} from '../middlewares/authorize';

export const configureApi = () => {
    const router = Router();

    router.get('/forum/topics', [authorizeMiddleware], getTopics);
    router.post('/forum/topics', [authorizeMiddleware], createTopic);
    router.post('/forum/topics/:id(\\d+)/posts', [authorizeMiddleware], createPost);

    router.get('/logout', [authorizeMiddleware], logout);
    router.post('/auth', auth);

    return router;
};
