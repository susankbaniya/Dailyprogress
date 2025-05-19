import React from 'react';
import './Weather.css';
import { handlekeypress } from '../Utils/handlekeypresss';
import useWeather from '../CustomHooks/UseWeather';
import { kelvinToCelsius } from '../Utils/temprature';
const Weather = () => {
  const apiKey = '5469227a3914b20e27b9c0e78c601adf';
  const {
    city,
    setCity,
    weather,
    hourlyForecast,
    error,
    fetchWeather,
  
  } = useWeather(apiKey);

  return (
    <div className="Weather">
      <div className="Weatherwrapper">
        <div className="h1div">
          <h1>Weather App</h1>
        </div>
        <div className="inputbox">
          <input
            type="text"
            placeholder="Search here..."
            className="input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
             onKeyDown={(e)=>handlekeypress(e,fetchWeather)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <p>City: {weather.name}</p>
            <p>Country: {weather.sys.country}</p>
            <img
              src={`https://flagcdn.com/48x36/${weather.sys.country.toLowerCase()}.png`}
              alt="Country Flag"
            />
            <p>Temperature: {kelvinToCelsius(weather.main.temp)} °C</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Description: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </div>
        )}
        {hourlyForecast.length > 0 && (
          <div className="hourly-forecast">
            <h2>Hourly Forecast (Next 24 Hours)</h2>
            <div className="hourly-list">
              {hourlyForecast.map((hour, index) => (
                <div key={index} className="hourly-item">
                  <p>
                    {new Date(hour.dt * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                  <p>{kelvinToCelsius(hour.main.temp)} °C</p>
                  <p>{hour.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;