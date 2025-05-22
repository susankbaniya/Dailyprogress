import React, { useState } from 'react';
import WeatherApp from './Components/Weather';
import Front from './Components/front.jsx';
import Prajwal from './Components/Prajwal';
import { ThemeProvider } from './CustomHooks/ThemeContext';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store.jsx'; 

function App() {
  // const [activeApps, setActiveApps] = useState({
  //   susank: false,
  //   prajwal: false,
  // });

  // const toggleApp = (app) => {
  //   setActiveApps((prev) => ({
  //     ...prev,
  //     [app]: !prev[app],
  //   }));
  // };
   const [isFirstVisible, setIsFirstVisible] = useState(true);

  // return (
  //   <Provider store={store}>
  //     <ThemeProvider>
  //       <div className="app-container">
  //         <div className="header">
  //           <h1 className="title">Weather Apps Collection</h1>
  //           <div className="button-group">
  //             <button className="buttonapp" onClick={() => toggleApp('susank')}>
  //               {activeApps.susank ? 'Hide Susank\'s App' : 'Show Susank\'s App'}
  //             </button>
  //             <button className="buttonapp" onClick={() => toggleApp('prajwal')}>
  //               {activeApps.prajwal ? 'Hide Prajwal\'s App' : 'Show Prajwal\'s App'}
  //             </button>
  //           </div>
  //         </div>

  //         <div className="app-grid">
  //           {activeApps.susank && (
  //             <div className="app-card">
  //               <div className="app-header"></div>
                
  //                 <Front />
  //             </div>
  //           )}

  //           {activeApps.prajwal && (
  //             <div className="app-card">
  //               <div className="app-header"></div>
  //               <WeatherApp />
  //             </div>
  //           )}
  //         </div>

  //         {!activeApps.susank && !activeApps.prajwal && (
  //           <div className="placeholder">
  //             <p>Select an app to get started...</p>
  //           </div>
  //         )}
  //       </div>
  //     </ThemeProvider>
  //   </Provider>
  // );
 return (
    <Provider store={store}>
      <ThemeProvider>
        {isFirstVisible ? (
          <Front onToggle={() => setIsFirstVisible(false)} />
        ) : (
          <WeatherApp onToggle={() => setIsFirstVisible(true)} />
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default App;