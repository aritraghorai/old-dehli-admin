import { getAllCategoriesAll } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Category } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const { data, isLoading, isRefetching } = useQuery<Category[]>({
    queryKey: [apiPaths.CATEGORY_ALL],
    queryFn: getAllCategoriesAll,
  });
  return { data, isLoading, isRefetching };
};
export default useCategory;
