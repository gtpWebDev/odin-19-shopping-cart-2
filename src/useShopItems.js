import { useEffect, useState } from "react";

// custom hook to collect api data with control over error and loading

const useShopItems = () => {
  const [shopItems, setShopItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiRequest = "https://fakestoreapi.com/products?limit=18";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiRequest, {
          // signal: signal,
          mode: "cors",
        });
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const shopItems = await response.json();
        console.log("shopItems", shopItems);
        setShopItems(shopItems);
      } catch (error) {
        setError(error);
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { shopItems, error, loading };
};

export default useShopItems;
