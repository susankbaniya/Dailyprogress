import React, { useState } from "react";
import { FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import HourlyForecast from "./HourleyForecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../constants/api";
import { useGet } from "../hooks/useGet";
import { getCurrentLocation } from "../Utils/location";
import { handleKeyPress } from "../Utils/keypress";

const Prajwal = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  //fetch data from the API
  //change
  const fetchData = async (query) => {
    const { data, error } = await useGet(WEATHER_API_URL, {
      key: WEATHER_API_KEY,
      q: query,
      days: 1,
    });

    if (data) {
      setWeatherData(data);
      setError("");
    } else {
      setWeatherData(null);
      setError("There was an error or the city was not found.");
    }
  };

  //fetches weather data
  const handleLocationClick = () => {
    getCurrentLocation(fetchData, setError);
  };

  return (
    <>
      <div className="w-full bg-green-100 min-h-screen flex items-center justify-center">
        <div className=" bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm">
          <div className=" flex">
            <div className="flex border rounded items-center px-2 py-2 w-full">
              <FaSearch   className="h-5 w-5 new" />
              <input
                type="text"
                placeholder="Enter the City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyUp={(e) => handleKeyPress(e, city, fetchData)}
                className=" pl-2 border-none focus:outline-none w-full"
              />
            </div>
            <button
              onClick={handleLocationClick}
              className="px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-blue-600"
            >
              <FaMapMarkedAlt className="w-15 h-5" />
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {weatherData && (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">
                {weatherData.location.name}
              </h2>
              <img
                src={weatherData.current.condition.icon}
                className="mx-auto h-40"
                alt="weather icon"
              />
              <p className="text-lg font-semibold">
                {weatherData.current.temp_c}°C
              </p>
              <p className="text-sm capitalize font-semibold">
                {weatherData.current.condition.text}
              </p>
              <HourlyForecast
                hourlyData={weatherData.forecast.forecastday[0].hour}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Prajwal;
