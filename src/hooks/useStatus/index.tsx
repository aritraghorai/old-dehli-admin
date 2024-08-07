import {
  createNewStatus,
  deleteStatusById,
  getAllStatus,
  updateStatusById,
} from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Status, StatusRequestBody } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useStatus = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Status[]>({
    queryKey: [apiPaths.STATUS],
    queryFn: getAllStatus,
  });

  const { mutate: addStatus, isPending: isAdding } = useMutation({
    mutationKey: ["addStatus", apiPaths.STATUS],
    mutationFn: (data: StatusRequestBody) => createNewStatus(data),
    onSuccess: () => {
      toast.success("New Status Added");
      refetch();
    },
  });

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationKey: ["updateStatus", apiPaths.STATUS],
    mutationFn: ({ data, id }: { data: StatusRequestBody; id: string }) =>
      updateStatusById(id, data),
    onSuccess: () => {
      toast.success("Status Updated");
      refetch();
    },
  });

  const { mutate: deleteStatus, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteStatus", apiPaths.STATUS],
    mutationFn: (id: string) => deleteStatusById(id),
    onSuccess: () => {
      toast.success("Status Deleted");
      refetch();
    },
  });

  return {
    status: data,
    isLoading: isLoading || isAdding || isUpdating || isDeleting,
    isRefetching,
    addStatus,
    updateStatus,
    deleteStatus,
  };
};

export default useStatus;
