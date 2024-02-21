import Button from "@/component/atoms/Button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShopForm, ShopFormScham } from "@/utils/types";
import Dropzone from "../Dropzone";

interface CreateShopModalProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: ShopForm) => void;
  onClose: () => void;
}

const CreateShopModal: React.FC<CreateShopModalProps> = ({
  onSubmit,
  onClose,
  ...props
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<ShopForm>({
    resolver: zodResolver(ShopFormScham),
    mode: "all",
  });

  const handleSubmitAndClose = (val: ShopForm) => {
    if (isValid) {
      onSubmit(val);
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="ShopForm"
          onSubmit={handleSubmit(handleSubmitAndClose)}
        >
          <TextField
            label="Name"
            variant="outlined"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Description"
            variant="outlined"
            error={!!errors.description?.message}
            helperText={errors.description?.message}
            {...register("description")}
          />
          <Dropzone
            onChange={(file) => {
              setValue("images", file);
            }}
            error={errors.images?.message}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="ShopForm" disabled={!isValid}>
          Create
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateShopModal;
