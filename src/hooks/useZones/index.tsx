import { createNewZone, getAllZones, updateZoneById, uploadMultipleZonesFromExel } from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import { Zone, ZoneForm } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useZones = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Zone[]>({
    queryKey: [apiPaths.ZONE],
    queryFn: getAllZones,
  });
  const { mutate } = useMutation({
    mutationKey: ["createZone"],
    mutationFn: (data: ZoneForm) => createNewZone(data),
    onError: () => {
      toast.error("Invalid Zone Data");
    },
    onSuccess: () => {
      toast.success("Zone created successfully");
      refetch();
    },
  });
  const { mutate: updateZone } = useMutation({
    mutationKey: ["createZone"],
    mutationFn: (data: { data: ZoneForm; id: string }) =>
      updateZoneById(data.id, data.data),
    onError: () => {
      toast.error("Invalid Zone Data");
    },
    onSuccess: () => {
      toast.success("Zone updated successfully");
      refetch();
    },
  });

  const { mutate: uploadZonesFromExel, isPending: isUploading } = useMutation({
    mutationKey: ["uploadMultipleZones"],
    mutationFn: (file: File) =>
      uploadMultipleZonesFromExel(file),
    onError: () => {
      toast.error("Invalid Exel File");
    },
    onSuccess: () => {
      toast.success("Zone uploaded successfully");
      refetch();
    },
  });


  return {
    zones: data,
    isLoading: isLoading || isUploading,
    isRefetching,
    refetch,
    createZone: mutate,
    updateZone,
    uploadZonesFromExel,
  };
};

export default useZones;
