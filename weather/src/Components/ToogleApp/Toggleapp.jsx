import React, { useState } from 'react';
import './Toggle.css';
import Weather from '../Weather/Weather';
import Front from '../Front';
import { useTheme } from '../../CustomHooks/ThemeContext';

const Toggleapp = () => {
  const [toggled, setToggled] = useState(false);
  const [weather, setWeather] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    setToggled(!toggled);
    setWeather(!weather); // Toggle weather state explicitly
    toggleTheme();
  };

  return (
    <div
      className="Toggleapp"
     
    >
      <button
        className={`Tooglebutton ${toggled ? 'toggled' : ''}`}
        onClick={handleToggle}
        style={{ display: 'block' }}
      >
        <div className="thumb"></div>
      </button>
      {weather ? <Weather /> : <Front />}
    </div>
  );
};

export default Toggleapp;