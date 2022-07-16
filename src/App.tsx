import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Navigation from './components/navigation/index';
import Main from './components/pages/main/index';
import Leaderboard from './components/pages/leaderboard/index';
import './App.scss';

const App = () => (
    <div className="container">
        <Router>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/statistics" element={<Leaderboard/>}/>
            </Routes>
        </Router>
    </div>
);

export default App;
