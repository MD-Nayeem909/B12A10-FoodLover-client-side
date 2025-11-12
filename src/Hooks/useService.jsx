import axios from "axios";
import { useEffect, useState } from "react";

const useService = (url, method = "GET") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(url, {
      method,
    })
      .then((data) => setData(data.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
  };
};

export default useService;
