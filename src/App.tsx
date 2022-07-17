import React from 'react';
import {
    Navigate, Outlet,
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import {Login} from './components/pages';
import Navigation from './components/navigation/index';
import Main from './components/pages/main/index';
import Leaderboard from './components/pages/leaderboard/index';
import Forum from './components/pages/forum/index';
import './App.scss';

const PrivateRoute = () => {
    const auth = null;

    return auth ? <Outlet/> : <Navigate to='/login'/>;
};

const App = () => (
    <div className="app">
        <Router>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/statistics" element={<Leaderboard/>}/>
                <Route path="/forum" element={<Forum/>}/>
                <Route path='/' element={<PrivateRoute/>}>
                    <Route
                        path='/'
                        element={<div>Game</div>}
                    />
                </Route>
                <Route
                    path='/login'
                    element={<Login/>}
                />
            </Routes>
        </Router>
    </div>
);

export default App;
