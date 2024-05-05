import {
  createNewPromotion,
  deletePromotionById,
  getAllPromotion,
} from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Banner, NewBannerFormRequestBody } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const usePromotion = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Banner[]>({
    queryKey: [apiPaths.PROMOTION],
    queryFn: getAllPromotion,
  });

  const { mutate: addNewBanner } = useMutation({
    mutationKey: ["addPromotion", apiPaths.PROMOTION],
    mutationFn: (data: NewBannerFormRequestBody) => createNewPromotion(data),
    onSuccess: () => {
      toast.success("New Banner Added");
      refetch();
    },
  });

  const { mutate: deletePromotion } = useMutation({
    mutationKey: ["deletePromotion", apiPaths.PROMOTION],
    mutationFn: (id: string) => deletePromotionById(id),
    onSuccess: () => {
      toast.success("Promotion Deleted");
      refetch();
    },
  });

  return {
    promotions: data,
    isLoading,
    isRefetching,
    addNewBanner,
    deletePromotion,
  };
};

export default usePromotion;

