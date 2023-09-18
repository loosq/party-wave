import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../client/components/complex/app/App';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './../store/store';

const container = document.getElementById('root');

if (container) {
  hydrateRoot(container,
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>);
}
