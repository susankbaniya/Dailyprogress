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
      <div className=" bg-black-100 max-w-full mt-[10px] flex items-center justify-end">
        <div className=" bg-white shadow-lg w-[500px] rounded">
          <div className=" flex border-gray-200">
            <div className="flex border rounded items-center px-2 py-2 w-full outline-none border-none">
              <FaSearch className="h-5 w-5 mx-1" />
              <input
                type="text"
                placeholder="Enter the City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyUp={(e) => handleKeyPress(e, city, fetchData)}
                className="border-none focus:outline-none w-full"
              />
       
            <button
              onClick={handleLocationClick}
              className="px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-blue-600"
            >
              <FaMapMarkedAlt className="w-15 h-5" />
            </button>
            </div>
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
