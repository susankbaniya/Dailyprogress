import React from "react";
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
import { FaSearch } from "react-icons/fa";
import Toggleapp from "./ToogleApp/Toggleapp";

const front = ({ onToggle }) => {
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
      className="flex-col"
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
        color: theme === "dark" ? "white" : "#333",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => {
          onToggle();
          toggleTheme();
        }}
      >
        <Toggleapp />
      </button>

      <div className="Weather">
        <div
          className={`Weatherwrapper ${theme}`}
          style={{
            backgroundColor: theme === "light" ? "dark" : "light",
          }}
        >
          <div className="h1div">
            <h1>P-Weather App</h1>
          </div>
          <div className="inputbox relative w-full flex justify-center items-center  h-20">
            <input
              type="text"
              placeholder="Search here..."
              className="inputfield"
              value={city}
              onChange={(e) => dispatch(setCity(e.target.value))}
              onKeyDown={(e) => handlekeypress(e, fetchWeather)}
            />
            <button
              className="absolute right-1  text-gray-500"
              onClick={fetchWeather}
            >
              <FaSearch size={14} className="w-full  h-10 " />
            </button>
            {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
          </div>

          {errorMsg && <p className="error">{errorMsg}</p>}

          {weather && (
            <div className="text-center">
              <div className="flex justify-center items-center gap-1">
                <h2 className="text-lg font-semibold">{weather.name}</h2>
                <img
                  src={`https://flagcdn.com/24x18/${weather.sys.country.toLowerCase()}.png`}
                  alt="flag"
                  className="w-6 h-4 object-cover rounded"
                />
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="weather-icon"
                  className="mx-auto w-24 h-24"
                />
              </div>

              <p className="text-3xl font-bold mt-2">
                {kelvinToCelsius(weather.main.temp)}°
              </p>
              <p className="capitalize text-gray-500">
                {weather.weather[0].description}
              </p>
            </div>
          )}

          {/* {hourlyForecast.length > 0 && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default front;
