import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import {Request, Response} from 'express';
import store from 'store';
import {Provider} from 'react-redux';
import App from 'App';

export default (req: Request, res: Response) => {
    const reduxState = store.getState();
    const reactHtml = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </Provider>,
    );
    res.status(200)
        .send(getHtml(reactHtml, reduxState));
};

function getHtml(reactHtml: string, reduxState = {}) {
    return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="icon" type="image/png" href="/images/favicon.png" />
            <title>Cosmobot | Runner</title>
        </head>
        <body>
            <div id="root">${reactHtml}</div>
        </body>
        <script src="./client.js"></script>
        <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        </html>
    `;
}
