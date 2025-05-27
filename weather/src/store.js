import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/weatherSlice';
import themeReducer from './Redux/themeSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    theme: themeReducer
  },
});