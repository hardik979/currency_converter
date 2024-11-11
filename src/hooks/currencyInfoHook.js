import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/98953cf71cd54c23c5534fea/latest/${currency}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }

        const result = await response.json();
        console.log("API Response:", result); // Log entire response for debugging

        if (result && result.conversion_rates) {
          setData(result.conversion_rates); // Set conversion rates if available
        } else {
          setData({}); // Fallback to empty object
          console.warn("Conversion rates not found in the API response");
        }
      } catch (err) {
        console.error("Error fetching currency data:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [currency]);

  return data;
}
export default useCurrencyInfo;
