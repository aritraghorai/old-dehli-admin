import { getAllProductTag } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { ProductTag } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useProductTags = () => {
  const { data, isLoading, isRefetching } = useQuery<ProductTag[]>({
    queryKey: [apiPaths.PRODUCT_TAG],
    queryFn: getAllProductTag,
  });
  return { productTags: data, isLoading, isRefetching };
};

export default useProductTags;
