import {
  createProductType,
  getAllProductTypes,
  updateProductTypeById,
} from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import {
  ProductType,
  ProductTypeRequestBody,
  UpdateProductTypeBody,
} from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useProductType = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<ProductType[]>({
    queryKey: [apiPaths.PRODUCT_TYPE],
    queryFn: getAllProductTypes,
  });

  const { mutate } = useMutation({
    mutationKey: ["createProductType"],
    mutationFn: (data: ProductTypeRequestBody) => createProductType(data),
    onError: () => {
      toast.error("Invalid Data");
    },
    onSuccess: () => {
      toast.success("Product Type Added");
      refetch();
    },
  });

  const { mutate: updateProductType } = useMutation({
    mutationKey: ["updateProductType"],
    mutationFn: ({ data, id }: { data: UpdateProductTypeBody; id: string }) =>
      updateProductTypeById(id, data),
    onError: () => {
      toast.error("Invalid Data");
    },
    onSuccess: () => {
      toast.success("Product Type Updated");
      refetch();
    },
  });

  return {
    productTypes: data,
    isLoading,
    isRefetching,
    refetch,
    addProductType: mutate,
    updateProductType,
  };
};

export default useProductType;
