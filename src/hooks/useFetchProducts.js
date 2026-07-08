import { useState, useEffect } from "react";

// Custom hook to fetch data from any URL
// Returns: data, loading state, and error message
function useFetchProducts(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        // Handle HTTP errors (like 404, 500)
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        // Handle network errors or JSON parse errors
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]); // Re-fetch if URL changes

  return { data, loading, error };
}

export default useFetchProducts;
