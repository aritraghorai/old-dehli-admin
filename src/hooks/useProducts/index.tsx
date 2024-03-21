import { getAllProducts } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Product } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Product[]>({
    queryKey: [apiPaths.PRODUCT_ALL],
    queryFn: getAllProducts,
  });

  return { products: data, isLoading, isRefetching, refetch };
};

export default useProducts;
