import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setLoading(true);
    axiosPrivate
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
