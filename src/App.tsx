import React from 'react';
import {Login, Registration, Settings} from 'components/pages';
import {
    Navigate, Outlet, Route, Routes,
} from 'react-router-dom';

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
                element={<Settings/>}
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
