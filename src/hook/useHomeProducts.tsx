import { useEffect } from "react";
import { useApi } from "./useApi";
import { getHomeProducts } from "../services/productService";

export function useHomeProducts() {
  const { data, loading, error, callApi } = useApi(getHomeProducts);

  useEffect(() => {
    callApi(undefined); // getHomeProducts không cần tham số
  }, [callApi]);

  return { homeProducts: data, loading, error };
}
