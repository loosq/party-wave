import React from 'react';
import {
    Forum,
    Leaderboard,
    Login,
    Main,
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

function PrivateRoute() {
    const auth = null;

    return auth ? <Outlet /> : <Navigate to='/login' />;
}

function App() {
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
                </Routes>
            </Router>
        </div>
    );
}

export default App;
