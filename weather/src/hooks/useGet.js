// api calls and privedes built in error handling
import axios from "axios";

//async Function to handle asynchronous api requests
export const useGet = async (url, params = {}) => {
  try {
    const response = await axios.get(url, { params }); //sends a get request to the url
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message || "An error occurred" };
  }
};
