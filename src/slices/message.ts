import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  message?: string
}

const initialState: InitialState = {};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => ({ message: action.payload }),
        clearMessage: () => ({ message: '' }),
    },
});

const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;
