import React from 'react';
import {
    Forum, Game, Leaderboard, Login, Main, NotFoundPage, Registration, Settings,
} from 'components/pages';
import {
    Navigate, Outlet, Route, Routes,
} from 'react-router-dom';
import {useAppSelector} from 'store';
import {ErrorBoundary} from 'components/base';
import {Navigation} from 'components/complex';
import './App.scss';

const PrivateRoute = ({isLoggedIn}: {isLoggedIn: boolean }) => (isLoggedIn ? <Outlet /> : <Navigate to='/login' />);

export default function App() {
    const { user: currentUser, isLoggedIn } = useAppSelector((state) => state.base);

    return (
        <ErrorBoundary>
            <Navigation
                {...{
                    ...currentUser, isLoggedIn,
                }}
            />
            <Routes>
                <Route
                    path='/'
                    element={<Main />}
                />
                <Route path='/' element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
                    <Route
                        path='/game'
                        element={<Game />}
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
        </ErrorBoundary>
    );
}
