import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../constants/api';
import { useGet } from '../hooks/useGet';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (query, { rejectWithValue }) => {
    const { data, error } = await useGet(WEATHER_API_URL, {
      key: WEATHER_API_KEY,
      q: query,
      days: 1,
    });
    if (data) return data;
    return rejectWithValue(error || 'Failed to fetch weather');
  }
);

const initialState = {
  weatherData: null,
  error: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.error = '';
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.error = action.payload;
        state.weatherData = null;
      });
  },
});

export const { setError } = weatherSlice.actions;
export default weatherSlice.reducer;