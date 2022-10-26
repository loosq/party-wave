import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import forumReducer from './slices/forum';
import baseReducer from './slices/base';
import messageReducer from './slices/message';
import themeReducer from './slices/theme';

export const rootReducer = combineReducers({
    base: baseReducer,
    message: messageReducer,
    forum: forumReducer,
    theme: themeReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
