import {
  createTimeSlot,
  getAllTimeShots,
  updateTimeSlotById,
} from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { TimeSlot, TimeSlotRequestForm } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useTimeSlots = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<TimeSlot[]>({
    queryKey: [apiPaths.TIME_SHOTS],
    queryFn: getAllTimeShots,
  });

  const { mutate: addTimeSlot } = useMutation({
    mutationKey: ["addTimeSlot", apiPaths.TIME_SHOTS],
    mutationFn: (data: TimeSlotRequestForm) => createTimeSlot(data),
    onSuccess: () => {
      toast.success("Time Slot Tag Added");
      refetch();
    },
  });

  const { mutate: updateTimeSlot } = useMutation({
    mutationKey: ["updateTimeSlot", apiPaths.TIME_SHOTS],
    mutationFn: ({ data, id }: { data: TimeSlotRequestForm; id: string }) =>
      updateTimeSlotById(id, data),
    onSuccess: () => {
      toast.success("Time Slot Tag Updated");
      refetch();
    },
  });

  return {
    timeSlots: data,
    isLoading,
    isRefetching,
    addTimeSlot,
    updateTimeSlot,
  };
};

export default useTimeSlots;
