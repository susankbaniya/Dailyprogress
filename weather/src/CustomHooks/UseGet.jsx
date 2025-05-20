
import { useState } from 'react';
import axios from 'axios';

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
