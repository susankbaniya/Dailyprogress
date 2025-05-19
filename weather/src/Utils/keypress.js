export const handleKeyPress = (event, city, fetchData) => {
  if (event.key === "Enter" && city.trim() !== "") {
    fetchData(city);
  }
};
