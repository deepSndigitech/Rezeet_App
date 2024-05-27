// flightSlice.js
import { createSlice } from '@reduxjs/toolkit';


Dark = {
   // "primary": "rgb(155,122,255,0.5)",
   "primary": "#170B3B",
   "primaryButt": "#FFF",
   "onPrimary": "#353434",
   "primaryContainer": "rgb(240, 219, 255)",
   "onPrimaryContainer": "#FFF",
   "secondary": "#9B7AFF",
   "fix": "#9B7AFF",
   "onSecondary": "rgb(255, 255, 255)",
   "secondaryContainer": "rgb(237, 221, 246)",
   "onSecondaryContainer": "rgb(33, 24, 42)",
   "tertiary": "#111111",
   "onTertiary": "#353434",
   "tertiaryContainer": "rgb(255, 217, 221)",
   "onTertiaryContainer": "#1111",
   "error": "rgb(186, 26, 26)",
   "onError": "rgb(255, 255, 255)",
   "errorContainer": "rgb(255, 218, 214)",
   "contect":'Dark'
}
Light = {

   "primary": "#170B3B",
   "primaryButt": "#170B3B",
   "onPrimary": "rgb(255, 255, 255)",
   "primaryContainer": "rgb(240, 219, 255)",
   "onPrimaryContainer": "#170B3B",
   "secondary": "rgb(102, 90, 111)",
   "fix": "#9B7AFF",

   "onSecondary": "rgb(0,0, 0)",
   "secondaryContainer": "rgb(237, 221, 246)",
   "onSecondaryContainer": "rgb(33, 24, 42)",
   "tertiary": "#FFF",
   "onTertiary": "rgb(255, 255, 255)",
   "tertiaryContainer": "rgb(255, 217, 221)",
   "onTertiaryContainer": "#DDD",
   "error": "rgb(186, 26, 26)",
   "onError": "rgb(255, 255, 255)",
   "errorContainer": "rgb(255, 218, 214)",
   "contect":'Light'
}

const initialState = {
   isDarkMode: true,
   Color: Light
};

const ThemeSlice = createSlice({
   name: 'buses',
   initialState,
   reducers: {
      changeTheme(state, action) {
         state.isDarkMode = !state.isDarkMode;
         if (state.isDarkMode) {
            state.Color = { ...Light };
         } else {
            state.Color = { ...Dark };
         }
      }
   },
});

export const {
   changeTheme,
} = ThemeSlice.actions;
export default ThemeSlice.reducer;
