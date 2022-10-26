import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store';
import {getUserInfo} from '../../../slices/base';
import {REQUEST_STATUS} from '../../../slices/constants';
import {Loader} from '../Loader';

export const PrivateRoutes = () => {
    const dispatch = useAppDispatch();
    const {isLoggedIn, user, status} = useAppSelector((state) => state.base);

    useEffect(() => {
        if (!user && status !== REQUEST_STATUS.LOADING) {
            dispatch(getUserInfo());
        }
    }, []);

    if (status === REQUEST_STATUS.LOADING) {
        return <Loader />;
    }

    return (isLoggedIn ? <Outlet /> : <Navigate to='/login' />);
};
