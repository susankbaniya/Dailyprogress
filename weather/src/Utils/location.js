export const getCurrentLocation = (callback, onError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        callback(`${latitude},${longitude}`);
      },
      (err) => onError(err.message)
    );
  } else {
    onError("Geolocation is not supported by this browser!");
  }
};
