import axios from "axios";

export const usePost = async (url, body = {}, headers = {}) => {  //send request default is {}
  try {
    const response = await axios.post(url, body, { headers });  //send post request to url
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message || "An error occurred" };
  }
};
