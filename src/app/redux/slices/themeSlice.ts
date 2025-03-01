import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native"; // Import Appearance API

const initialThemeState = { mode: Appearance.getColorScheme() || "light" }; // Get system theme

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
