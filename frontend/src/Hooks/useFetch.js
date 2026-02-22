import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseURL = process.env.REACT_APP_API_URL || "";
        const fullURL = url.startsWith("http") ? url : `${baseURL}${url}`;
        const res = await axios.get(fullURL);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      
      const baseURL = process.env.REACT_APP_API_URL || "";
      const fullURL = url.startsWith("http") ? url : `${baseURL}${url}`;
      const res = await axios.get(fullURL);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
