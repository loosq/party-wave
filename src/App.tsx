import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ErrorBoundary} from 'components/base';
import './App.scss';
import {useAppSelector} from 'store';
import { Main } from 'components/pages/Main';

export default function App() {
    const {current} = useAppSelector((state) => state.theme);
    useEffect(() => {
        document.body.setAttribute('class', '');
        document.body.classList.add(`theme--${current}`);
    });
    return (
        <ErrorBoundary>
            <Routes>
                <Route path='/' element={<Main />}>
                </Route>
            </Routes>
        </ErrorBoundary>
    );
}
