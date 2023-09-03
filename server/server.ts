import express from 'express';
import path from 'path';
import {configureApi} from './api/api';
import serverRenderMiddleware from './middlewares/server-render-middleware';

const API = '/api/v1';

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(API, configureApi());

app.use(serverRenderMiddleware);

app.listen(
    app.get('port'),
    () => console.log(`App listening on port ${app.get('port')}!`),
);
