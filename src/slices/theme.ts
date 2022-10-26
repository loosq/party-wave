import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = 'light' | 'dark';

const initialState: {
    current: ThemeType
} = {
    current: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeType>) => ({current: action.payload}),
    },
});

const { reducer, actions } = themeSlice;
export const { setTheme } = actions;
export default reducer;
