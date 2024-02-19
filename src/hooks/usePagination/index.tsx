import apiClient from "@/axios/apiClient";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MRT_PaginationState } from "material-react-table";

interface QueryResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

function usePagination<T>(url: string, initialPage = 1, initialLimit = 10) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: initialPage,
    pageSize: initialLimit,
  });

  const [queryParams, setQueryParams] = useState<
    Array<{ key: string; value: string }>
  >([]);

  const { data, refetch, error, isLoading, isRefetching } = useQuery({
    queryKey: [
      url,
      pagination.pageSize,
      pagination.pageIndex,
      queryParams?.map((param) => param.key + "" + param.value),
    ],
    queryFn: () => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("page", (pagination.pageIndex + 1).toString());
      urlSearchParams.append("limit", pagination.pageSize.toString());
      queryParams?.forEach((param) => {
        urlSearchParams.append(param.key, param.value);
      });
      return apiClient.get(url, {
        params: urlSearchParams,
      });
    },
    select: (res) => {
      return {
        data: res.data.data,
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
        totalPage: res.data.totalPage,
      } as QueryResponse<T>;
    },
  });

  const fetchParticularPage = (pageNumber: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: pageNumber }));
  };

  const changeLimit = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, pageSize: newLimit, pageIndex: 1 }));
  };

  return {
    fetch: refetch,
    pagination,
    setPagination,
    changeLimit,
    isLoading,
    error,
    isRefetching,
    data,
    fetchParticularPage,
    setQueryParams,
    coveredItems: Math.min(
      pagination.pageSize * pagination.pageIndex,
      data?.total || 0,
    ),
  };
}

export default usePagination;
