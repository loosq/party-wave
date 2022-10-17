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
    Topic,
} from 'components/pages';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Navigation} from 'components/complex';
import {ErrorBoundary, PrivateRoutes, PublicRoutes} from 'components/base';
import './App.scss';

export default function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/' element={<PrivateRoutes />}>
                        <Route
                            path='/'
                            element={<Main />}
                        />
                        <Route
                            path='/game'
                            element={<Game />}
                        />
                        <Route
                            path='/settings'
                            element={<Settings />}
                        />
                        <Route
                            path='/statistics'
                            element={<Leaderboard />}
                        />
                        <Route
                            path='/forum/topic/:id'
                            element={<Topic />}
                        />
                        <Route
                            path='/forum'
                            element={<Forum />}
                        />
                    </Route>
                    <Route path='/' element={<PublicRoutes />}>
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
                    </Route>
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}
