import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const resData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(resData.message);
        }
        setIsLoading(false);
        return resData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const currentRequest = activeHttpRequests.current;

    return () => {
      currentRequest.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
