import axios from "axios";

export const useGet = async (url, params = {}) => {
  try {
    const response = await axios.get(url, { params });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message || "An error occurred" };
  }
};
