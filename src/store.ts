import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import forumReducer from './slices/forum';
import baseReducer from './slices/base';
import messageReducer from './slices/message';

const reducer = {
    base: baseReducer,
    message: messageReducer,
    forum: forumReducer,
};

const store = configureStore({
    reducer,
    devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
