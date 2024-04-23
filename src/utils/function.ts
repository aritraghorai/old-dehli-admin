import { uploadImage } from "@/axios/api";

export const uploadMultipleImages = async (file: File[]) => {
  const uploadImages = file.map((image) => {
    return uploadImage(image);
  });
  const res = await Promise.all(uploadImages);
  return res.map((image) => image.id);
};

export const convertTimeToDate = (timeString?: string) => {
  // Creating a new Date object
  const date = new Date();
  if (timeString) {
    const [hours, minutes, seconds] = timeString.split(":");

    date.setHours(+hours);
    date.setMinutes(+minutes);
    date.setSeconds(+seconds);
  }
  return date;
};
