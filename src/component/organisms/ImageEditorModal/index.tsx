import Button from "@/component/atoms/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Image } from "@/utils/types";
import ImageWithDelete from "@/component/molecules/ImageWithDelete";
import Dropzone from "../Dropzone";
import { useState } from "react";

interface AddProductTagModalProps extends Omit<DialogProps, "onSubmit"> {
  onClose: () => void;
  images: Image[];
  submit: (newImages: File[], deletedImages: string[]) => void;
}

const ImageEditorModal: React.FC<AddProductTagModalProps> = ({
  onClose,
  images,
  submit,
  ...props
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const handleSubmitAndClose = () => {
    submit(imageFiles, deletedImages);
    setImageFiles([]);
    onClose();
  };

  const handleClose = () => {
    setDeletedImages([]);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>Image Editor</DialogTitle>
      <DialogContent dividers>
        <Stack gap={3} width="400px" component="form">
          <Stack>
            {images.map((image, index) => (
              <ImageWithDelete
                key={index}
                src={image.url}
                alt={image.id}
                isDelete={deletedImages.some((id) => id === image.id)}
                onDelete={() => setDeletedImages([...deletedImages, image.id])}
                onAdd={() =>
                  setDeletedImages(
                    deletedImages.filter((id) => id !== image.id),
                  )
                }
              />
            ))}
          </Stack>
          <Dropzone onChange={(file) => setImageFiles(file)} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitAndClose}>Update</Button>
        <Button color="error" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageEditorModal;
