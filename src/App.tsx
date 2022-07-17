import React from 'react';
import {Login} from 'components/pages';
import {
    Navigate, Outlet, Route, Routes,
} from 'react-router-dom';
import {Registration} from 'components/pages/Registration/Registration';

const PrivateRoute = () => {
    const auth = null;

    return auth ? <Outlet/> : <Navigate to='/login'/>;
};

const App = () => (
    <div className='app'>
        <Routes>
            <Route path='/' element={<PrivateRoute/>}>
                <Route
                    path='/'
                    element={<div>Game</div>}
                />
            </Route>
            <Route
                path='/settings'
                element={<div>Profile</div>}
            />
            <Route
                path='/registration'
                element={<Registration/>}
            />
            <Route
                path='/login'
                element={<Login/>}
            />
        </Routes>
    </div>
);

export default App;
