import React from 'react';
import {
    Forum,
    Leaderboard,
    Login,
    Main,
    NotFoundPage,
    Registration,
    Settings,
} from 'components/pages';
import {
    BrowserRouter as Router,
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';
import './App.scss';
import {Navigation} from 'components/complex';
import { Game } from 'components/pages'

function PrivateRoute() {
    const auth = true;

    return auth ? <Outlet /> : <Navigate to='/login' />;
}

export default function App() {
    return (
        <div className='container'>
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route
                            path='/'
                            element={<Main />}
                        />
                        <Route path="/game" element={<Game />} />
                    </Route>
                    <Route
                        path='/statistics'
                        element={<Leaderboard />}
                    />
                    <Route
                        path='/forum'
                        element={<Forum />}
                    />
                    <Route
                        path='/login'
                        element={<Login />}
                    />
                    <Route
                        path='/registration'
                        element={<Registration />}
                    />
                    <Route
                        path='/settings'
                        element={<Settings />}
                    />
                    <Route
                        path='*'
                        element={<NotFoundPage />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

