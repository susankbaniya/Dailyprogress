//If this function is used inside a React component, it would typically be attached to an input field

 const handleKeyPress = (event, fetch, city) => {  //function is exported it can be used in other modules
  if (event.key === "Enter" && typeof fetch === 'function') {
    fetch(city);
  }
};

export default handleKeyPress;