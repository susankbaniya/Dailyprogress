// export const getCurrentLocation = (callback, onError) => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(  //navigator.geolocation is built in API
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         //console.log(latitude, longitude)
//         callback(`${latitude},${longitude}`);
//         fetchData(query);
//       },
//       (err) => onError(err.message)
//     );
//   } else {
//     onError("Geolocation is not supported by this browser!");
//   }
// };

export const getCurrentLocation = (callback, onError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const query = `${latitude},${longitude}`; // ✅ Define query
        callback(query);
        fetchData(query); // ✅ Now it works
      },
      (err) => onError(err.message)
    );
  } else {
    onError("Geolocation is not supported by this browser!");
  }
};
