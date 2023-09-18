import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark";

const initialState: {
  theme: ThemeType;
} = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => ({
      theme: action.payload,
      }),
  },
});

const { reducer, actions } = themeSlice;
export const { setTheme } = actions;
export default reducer;
