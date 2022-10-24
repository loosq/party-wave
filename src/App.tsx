import React from 'react';
import {
    Forum,
    Game,
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
import { Navigation } from 'components/complex';
import { useSelector } from 'react-redux';

export default function App() {
    const { user: currentUser, isLoggedIn } = useSelector((state: any) => state.base);

    const PrivateRoute = () => isLoggedIn ? <Outlet /> : <Navigate to='/login' />;

    return (
            <Router>
                <Navigation {...{
                    ...currentUser, isLoggedIn: isLoggedIn
                }} />
                <Routes>
                    <Route
                        path='/'
                        element={<Main />}
                    />
                    <Route path='/' element={<PrivateRoute />}>
                        <Route
                            path='/game'
                            element={<Game username={currentUser} />}
                        />
                        <Route
                            path='/settings'
                            element={<Settings />}
                        />
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
                        path='*'
                        element={<NotFoundPage />}
                    />
                </Routes>
            </Router>
    );
}
