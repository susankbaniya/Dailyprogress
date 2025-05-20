//If this function is used inside a React component, it would typically be attached to an input field

export const handleKeyPress = (event, city, fetchData) => {  //function is exported it can be used in other modules
  if (event.key === "Enter" && city.trim() !== "") {
    fetchData(city);
  }
};
