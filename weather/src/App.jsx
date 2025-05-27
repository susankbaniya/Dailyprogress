import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Front from "./Components/front";
import Weather from "./Components/Weather";

const App = () => {
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {isFirstVisible ? (
        <Front onToggle={() => setIsFirstVisible(false)} />
      ) : (
        <Weather onToggle={() => setIsFirstVisible(true)} />
      )}
    </>
  );
};

export default App;
