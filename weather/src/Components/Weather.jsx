import React from "react";
import "./Weather.css";
import { handlekeypress } from "../Utils/handlekeypresss";
import useGet from "../CustomHooks/UseGet";
import { useTheme } from "../CustomHooks/ThemeContext";
import {
  getEmptyCityError,
  getCityNotFoundError,
  getApiError,
  getHourlyError,
} from "../Utils/errorUtils";
import { kelvinToCelsius } from "../Utils/temprature";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setWeather,
  setHourlyForecast,
  setErrorMsg,
} from "../Redux/weatherSlice";
import ToggleSwitch from "./common/ToggleSwitch";

const Weather = ({ onToggle }) => {
  const apiKey = "5469227a3914b20e27b9c0e78c601adf";
  const { get, error } = useGet();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { city, weather, hourlyForecast, errorMsg } = useSelector(
    (state) => state.weather
  );

  const fetchWeather = async () => {
    if (!city.trim()) {
      const err = getEmptyCityError();
      alert(err);
      dispatch(setErrorMsg(err));
      return;
    }

    try {
      const weatherData = await get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}`
      );
      dispatch(setWeather(weatherData));

      try {
        const forecastData = await get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&appid=${apiKey}`
        );
        const hourlyData = forecastData.list.slice(0, 8);
        dispatch(setHourlyForecast(hourlyData));
      } catch (forecastErr) {
        console.error("Forecast error:", forecastErr);
        dispatch(setErrorMsg(getHourlyError()));
      }
    } catch (err) {
      console.error("Weather error:", err);
      if (err?.response?.status === 404) {
        dispatch(setErrorMsg(getCityNotFoundError()));
      } else {
        dispatch(setErrorMsg(getApiError()));
      }
    }
  };

  return (
    
      <div
        className="flex flex-col relative"
        style={{
          backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
          color: theme === "light" ? "#333" : "white",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "3rem",
        }}
      >
        {/* <ToggleSwitch isChecked={theme === "light"} onToggle={toggleTheme} /> */}
        <div className="absolute top-20 right-150 z-50">

        <ToggleSwitch
          isChecked={theme === "light"}
          onToggle={() => {
            toggleTheme();
            onToggle();
          }}
          />
          </div>

        <div className="Weather absolute top-60">
          <div
            className={`Weatherwrapper ${theme}`}
            style={{
              backgroundColor: theme === "light" ? "dark" : "light",
            }}
          >
            <div className="h1div">
              <h1>S-Weather App</h1>
            </div>
            <div className="inputbox">
              <input
                type="text"
                placeholder="Search here..."
                className="inputfield"
                value={city}
                onChange={(e) => dispatch(setCity(e.target.value))}
                onKeyDown={(e) => handlekeypress(e, fetchWeather)}
              />
              <button onClick={fetchWeather}>Search</button>
              {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
            </div>

            {errorMsg && <p className="error">{errorMsg}</p>}

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
                          hour: "2-digit",
                          minute: "2-digit",
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
      </div>
    
  );
};

export default Weather;
