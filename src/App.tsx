import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Navigation from './components/navigation/index';
import './App.scss';

const App = () => (
    <Router>
        <Navigation/>
        <Routes>
            <Route path="/" element={<div>123</div>}/>
        </Routes>
    </Router>
);

export default App;
