import React from "react";
// import { useSelector } from 'react-redux';
import { handleKeyPress } from "../Utils/handleKeyPress";
import useGet from "../hooks/useGet";
import { kelvinToCelsius } from "../Utils/temprature";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setWeather,
  setHourlyForecast,
  setErrorMsg,
} from "../Redux/weatherSlice";
import { FaSearch } from "react-icons/fa";
import ToggleSwitch from "./common/ToggleSwitch";
import {
  getEmptyCityError,
  getCityNotFoundError,
  getApiError,
  getHourlyError,
} from "../Utils/error";

const Front = ({ onToggle }) => {
  const apiKey = "05016ee12b542724dfab9e2d113a601a";
  const { get } = useGet();
  const dispatch = useDispatch();
  const { city, weather, hourlyForecast, errorMsg } = useSelector(
    (state) => state.weather
  );
  const theme = useSelector((state) => state.theme.mode);

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
    <div className="app-container">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
        <ToggleSwitch onToggle={onToggle} />
      </div>

      <div className="Weather absolute top-60">
        <div className="Weatherwrapper">
          <div className="h1div">
            <h1>P-Weather App</h1>
          </div>

          <div className="inputbox relative w-full flex justify-center items-center h-20">
            <input
              type="text"
              placeholder="Search here..."
              className="inputfield"
              value={city}
              onChange={(e) => dispatch(setCity(e.target.value))}
              onKeyDown={(e) => handleKeyPress(e, fetchWeather)}
            />
            <button
              className="absolute right-9 text-gray-500"
              onClick={fetchWeather}
            >
              <FaSearch size={14} className="w-full h-10" />
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default Front;
