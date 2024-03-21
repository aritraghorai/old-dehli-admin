import { getAllPinCodes, getPinCode } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Pincode } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const usePinCode = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Pincode[]>({
    queryKey: [apiPaths.PIN_CODE],
    queryFn: getAllPinCodes,
  });

  const { mutateAsync, data: newPin } = useMutation({
    mutationKey: ["createPinCode"],
    mutationFn: (data: string) => getPinCode(data),
    onError: () => {
      toast.error("Invalid Pincode");
    },
    onSuccess: () => {
      refetch();
    }
  });

  return { pinCodes: data, isLoading, isRefetching, refetch, addPinCode: mutateAsync, newPin };
};

export default usePinCode;
