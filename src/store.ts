import { configureStore } from '@reduxjs/toolkit'
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