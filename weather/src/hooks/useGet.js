// api calls and privedes built in error handling
import axios from "axios";
import { useState } from "react";

const useGet = () => {
  const [error, setError] = useState(null);

  const get = async (url, config = {}) => {
    try {
      const response = await axios.get(url, config);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { get, error };
};

export default useGet;
