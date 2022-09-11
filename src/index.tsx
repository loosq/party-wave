import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {startServiceWorker} from './service-worker/serviceWorker';
import store from './store';
import App from './App';
import './App.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

startServiceWorker();
