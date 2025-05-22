import React, { useState } from 'react';
import WeatherApp from './Components/Weather';
import Prajwal from './Components/Prajwal';
import { ThemeProvider } from './CustomHooks/ThemeContext';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store.jsx';

function App() {
  const [state, setState] = useState(true);

  const toggleApp = () => {
    setState((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="app-container">
          <div className="header">
            <h1 className="title">Weather Apps Collection</h1>
          </div>

          <div className="app-grid">
            {state ? (
              <div className="app-card">
                <div className="app-header"></div>
                <button className="buttonapp" onClick={toggleApp}>
                  Susank
                </button>
                 <Prajwal />
              
              </div>
            ) : (
              <div className="app-card">
                <div className="app-headers"></div>
                <button className="buttonapp" onClick={toggleApp}>
                Prajwal
                </button>
  <WeatherApp />              </div>
            )}
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;