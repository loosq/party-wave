import React from 'react';
import {
    Login, Registration, Settings,
} from 'components/pages';
import {
    Navigate, Outlet, Route, Routes, BrowserRouter as Router,
} from 'react-router-dom';
import Login from 'components/pages/Login';
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
    <div className='container'>
        <Router>
            <Navigation/>
            <Routes>
                <Route path='/' element={<PrivateRoute/>}>
                    <Route
                        path='/'
                        element={<Main/>}
                    />
                </Route>
                <Route
                    path='/statistics'
                    element={<Leaderboard/>}
                />
                <Route
                    path='/forum'
                    element={<Forum/>}
                />
                <Route
                    path='/login'
                    element={<Login/>}
                />
                <Route
                    path='/registration'
                    element={<Registration/>}
                />
                <Route
                    path='/settings'
                    element={<Settings/>}
                />
            </Routes>
        </Router>
    </div>
);

export default App;
