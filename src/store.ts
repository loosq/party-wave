import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import themeReducer from './slices/theme';

export const rootReducer = combineReducers({
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
