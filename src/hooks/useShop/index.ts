import { getAllShops } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Shop } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useShop = () => {
  const { data, isLoading, isRefetching } = useQuery<Shop[]>({
    queryKey: [apiPaths.ALL_SHOPS],
    queryFn: getAllShops,
  });
  return { shops: data, isLoading, isRefetching };
};

export default useShop;
