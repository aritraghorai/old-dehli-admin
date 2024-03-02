import {
  UpdateShop,
  addShopImage,
  createShop,
  deleteShopImageById,
  getAllShops,
} from "@/axios/api";
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

  const { mutate: deleteShopImage } = useMutation({
    mutationKey: [apiPaths.SHOP, "updateShopById"],
    mutationFn: ({ shopId, images }: { shopId: string; images: string[] }) =>
      deleteShopImageById(shopId, {
        images,
      }),
    onSuccess: () => {
      toast.success("Image Deleted Successfully");
      refetch();
    },
  });

  const { mutate: addShopImages } = useMutation({
    mutationKey: [apiPaths.SHOP, "updateShopById"],
    mutationFn: ({ shopId, images }: { shopId: string; images: string[] }) =>
      addShopImage(shopId, {
        images,
      }),
    onSuccess: () => {
      toast.success("Image Added Successfully");
      refetch();
    },
  });

  return {
    shops: data,
    isLoading,
    isRefetching,
    addNewShop,
    UpdateShopbyId,
    deleteShopImage,
    addShopImages,
  };
};

export default useShop;
