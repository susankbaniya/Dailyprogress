// weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '', 
    weather: null, 
    hourlyForecast: [], 
    errorMsg: '', //
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
      state.errorMsg = '';
    },
    setHourlyForecast: (state, action) => {
      state.hourlyForecast = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      state.weather = null;
      state.hourlyForecast = [];
    },
  },
});

export const { setCity, setWeather, setHourlyForecast, setErrorMsg } = weatherSlice.actions;
export default weatherSlice.reducer;