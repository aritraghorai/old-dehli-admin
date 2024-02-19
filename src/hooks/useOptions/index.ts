import { getAllProductOption } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Option } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useOptions = () => {
  const {
    data: productOption,
    isLoading,
    isRefetching,
  } = useQuery<Option[]>({
    queryKey: [apiPaths.PRODUCT_OPTION],
    queryFn: getAllProductOption,
  });
  return { productOption, isLoading, isRefetching };
};
export default useOptions;
