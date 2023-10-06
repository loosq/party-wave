import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import compression from 'compression';
import path from 'path';
import sprite from '../../build/sprite.svg';
import { store } from '../store/store';
import App from '../client/App';
import { client } from '../../webpack/webpack.config.client';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const isDev: boolean = process.env.NODE_ENV === 'development';
const compiler = webpack(client);
const app = express();
const port = 4000;

if (isDev) {
  app.use(webpackDevMiddleware(compiler, {
    // @ts-ignore
    publicPath: client.output.publicPath,
    serverSideRender: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(compression()).use(express.static(path.resolve(__dirname, './')));
app.get('/*', (req, res) => {
  const reduxState = store.getState();
  const appString = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const html = `
    <!doctype html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="description" content="party wave russian surf community in Haifa">
      <link rel="stylesheet" type="text/css" href="styles.css" />
      <title>Party wave</title>
    </head>
    <body>
      ${sprite}
      <div id="root">${appString}</div>
      <script src="client.js"></script>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}</script>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
