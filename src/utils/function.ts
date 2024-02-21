import { uploadImage } from "@/axios/api";

export const uploadMultipleImages = async (file: File[]) => {
  const uploadImages = file.map((image) => {
    return uploadImage(image);
  });
  const res = await Promise.all(uploadImages);
  return res.map((image) => image.id);
};
