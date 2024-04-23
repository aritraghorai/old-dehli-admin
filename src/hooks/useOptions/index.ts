import {
  createProductOption,
  createProductOptionValue,
  getAllProductOption,
} from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Option, ProductOptionForm } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useOptions = () => {
  const {
    data: productOption,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Option[]>({
    queryKey: [apiPaths.PRODUCT_OPTION],
    queryFn: getAllProductOption,
  });

  const { mutate: addNewOption } = useMutation({
    mutationKey: ["addNewOption", apiPaths.PRODUCT_OPTION],
    mutationFn: (body: ProductOptionForm) => createProductOption(body),
    onSuccess: () => {
      toast.success("Option Added");
      refetch();
    },
  });

  const { mutate: addNewOptionValue } = useMutation({
    mutationKey: ["addNewOptionValue", apiPaths.PRODUCT_OPTION],
    mutationFn: (res: { id: string; body: ProductOptionForm }) =>
      createProductOptionValue(res.id, res.body),
    onSuccess: () => {
      toast.success("Option value Added");
      refetch();
    },
  });

  return {
    productOption,
    isLoading,
    isRefetching,
    addNewOption,
    addNewOptionValue,
  };
};
export default useOptions;
