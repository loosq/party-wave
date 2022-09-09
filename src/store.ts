import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import baseReducer from "./slices/base";
import messageReducer from "./slices/message";

const reducer = {
  base: baseReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispach = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;