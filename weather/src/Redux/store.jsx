import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    weather: weatherReducer,
  },
});
