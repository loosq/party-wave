import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type themeType = 'light' | 'dark';

const initialState: {
    current: themeType
} = {
    current: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<themeType>) => ({current: action.payload}),
    },
});

const { reducer, actions } = themeSlice;
export const { setTheme } = actions;
export default reducer;
