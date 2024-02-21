import { createShop, getAllShops } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Shop, ShopRequestBody } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useShop = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Shop[]>({
    queryKey: [apiPaths.ALL_SHOPS],
    queryFn: getAllShops,
  });

  const { mutate: addNewShop } = useMutation({
    mutationKey: ["addNewTag", apiPaths.ALL_SHOPS],
    mutationFn: (shop: ShopRequestBody) => createShop(shop),
    onSuccess: () => {
      toast.success("Shop Added");
      refetch();
    },
  });

  return { shops: data, isLoading, isRefetching, addNewShop };
};

export default useShop;
