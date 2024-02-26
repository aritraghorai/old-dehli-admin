import { UpdateShop, createShop, getAllShops } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Shop, ShopRequestBody, UpdateShopType } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useShop = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Shop[]>({
    queryKey: [apiPaths.ALL_SHOPS],
    queryFn: getAllShops,
  });

  const { mutate: addNewShop } = useMutation({
    mutationKey: ["addNewShop", apiPaths.ALL_SHOPS],
    mutationFn: (shop: ShopRequestBody) => createShop(shop),
    onSuccess: () => {
      toast.success("Shop Added");
      refetch();
    },
  });

  const { mutate: UpdateShopbyId } = useMutation({
    mutationKey: [apiPaths.SHOP, "updateShopById"],
    mutationFn: (data: { data: Partial<UpdateShopType>; id: string }) =>
      UpdateShop(data.id, data.data),
    onSuccess: () => {
      toast.success("Update Shop Successfully");
      refetch();
    },
  });

  return { shops: data, isLoading, isRefetching, addNewShop, UpdateShopbyId };
};

export default useShop;
