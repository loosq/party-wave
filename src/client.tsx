import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {hydrateRoot} from 'react-dom/client';
import store from './store';
import App from './App';
import './App.scss';

const container = document.getElementById('root') as HTMLElement;
hydrateRoot(
    container,
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
);
