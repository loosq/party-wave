import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import serverRenderMiddleware from './server-render-middleware';

const distPath = path.resolve(__dirname, '../dist');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(distPath));
app.get('/*', serverRenderMiddleware);

export { app };
