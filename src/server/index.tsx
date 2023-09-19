import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from '../client/components/complex/app/App';
import { StaticRouter } from 'react-router-dom/server';
import sprite from '../../build/static/sprite.svg';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack.config.client.js');

const compiler = webpack(webpackConfig);
const app = express();
const port = 4000;

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true,
}));
app.use(webpackHotMiddleware(compiler));
app.use('/static', express.static(__dirname + '../../build/static'));

app.get('/', (req, res) => {
  const reduxState = store.getState();
  const appString = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const html = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <title>Party wave</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="party wave russian surf community in Haifa">
    </head>
    <body>
      ${sprite}
      <div id="root">${appString}</div>
      <script src="/client.js"></script>
       <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
