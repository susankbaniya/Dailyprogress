import { useState } from 'react';
import useGet from './UseGet'; 
import {
  getEmptyCityError,
  getCityNotFoundError,
  getApiError,
  getHourlyError
} from '../Utils/errorUtils';

const apiKey = '5469227a3914b20e27b9c0e78c601adf';

const UseWeather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState('');

  const { get } = useGet(); // custom GET hook

  const fetchWeather = async () => {
    if (!city.trim()) {
      const err = getEmptyCityError();
      alert(err);
      setError(err);
      return;
    }

    try {
      const weatherData = await get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}`
      );
      setWeather(weatherData);
      setError('');

      try {
        const forecastData = await get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&appid=${apiKey}`
        );
        const hourlyData = forecastData.list.slice(0, 8);
        setHourlyForecast(hourlyData);
      } catch (forecastErr) {
        console.error('Forecast fetch error:', forecastErr);
        setError(getHourlyError());
        setHourlyForecast([]);
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      if (err?.response?.status === 404) {
        setError(getCityNotFoundError());
      } else {
        setError(getApiError());
      }
      setWeather(null);
      setHourlyForecast([]);
    }
  };

  return {
    city,
    setCity,
    weather,
    hourlyForecast,
    error,
    fetchWeather,
  };
};

export default UseWeather;
