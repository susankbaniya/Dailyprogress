import axios from "axios";

export const usePost = async (url, body = {}, headers = {}) => {
  try {
    const response = await axios.post(url, body, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message || "An error occurred" };
  }
};
