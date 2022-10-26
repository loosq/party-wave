import session from 'express-session';
import express from 'express';
// import morgan from 'morgan';
import path from 'path';
import {configureApi} from './api/api';
import {connectToDb} from '../db/init';
import {onApiError} from './utils';
import serverRenderMiddleware from './middlewares/server-render-middleware';
import { authYandex } from './useCases/authYandex'

const API = '/api/v1';

const options = {
    name: 'forumCookie',
    secret: process.env.COOKIE_SECRET ?? 'sugar',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
    },
};

const app = express();

(async () => {
    await connectToDb();
}
)();

app.set('port', (process.env.PORT || 3000));

app.use(session(options));
app.use(express.json());
// app.use(morgan('combined'));
app.use(express.static(path.resolve(__dirname, '../dist')));


app.use(API, configureApi(), [onApiError]);
app.use('*', authYandex)
app.use(serverRenderMiddleware);

app.listen(
    app.get('port'),
    () => console.log(`App listening on port ${app.get('port')}!`),
);