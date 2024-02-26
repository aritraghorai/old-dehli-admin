import { createNewProductTag, getAllProductTag } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { NewProductTagForm, ProductTag } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useProductTags = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<ProductTag[]>({
    queryKey: [apiPaths.PRODUCT_TAG],
    queryFn: getAllProductTag,
  });

  const { mutate: addNewProductTag } = useMutation({
    mutationKey: ["addNewShop", apiPaths.ALL_SHOPS],
    mutationFn: (data: NewProductTagForm) => createNewProductTag(data),
    onSuccess: () => {
      toast.success("Product Tag Added");
      refetch();
    },
  });

  return { productTags: data, isLoading, isRefetching, addNewProductTag };
};

export default useProductTags;
