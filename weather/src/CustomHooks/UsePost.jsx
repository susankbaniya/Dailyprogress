
import { useState } from 'react';
import axios from 'axios';

const usePost = () => {
  const [error, setError] = useState(null);

  const post = async (url, data = {}, config = {}) => {
    try {
      const response = await axios.post(url, data, config);
      setError(null); 
      return response.data;
    } catch (err) {
      setError(err); 
      throw err;   
    }
  };

  return { post, error };
};

export default usePost;
