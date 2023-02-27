import axios from "./axios";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) =>
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      )
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading, error };
};
