import { useState, useEffect } from 'react';
import axios from 'axios';
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


  const fetchWeather = async () => {
    if (!city.trim()) {
      alert(getEmptyCityError());
      setError(getEmptyCityError());
      console.log("Error: Please write the city");
      return;
    }

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}`
      );
      console.log(weatherResponse.data);
      setWeather(weatherResponse.data);
      setError('');

      try {
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&appid=${apiKey}`
        );
        const hourlyData = forecastResponse.data.list.slice(0, 8);
        console.log(forecastResponse.data);
        setHourlyForecast(hourlyData);
      } catch (forecastErr) {
        console.error('Error fetching hourly forecast:', forecastErr);
        setError(getHourlyError());
        setHourlyForecast([]);
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(getApiError());
      setError(getCityNotFoundError());
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
