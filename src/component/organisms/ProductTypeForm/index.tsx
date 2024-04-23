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
import Dropzone from "../Dropzone";
import { ProductTypeForm, ProductTypeFormSchema } from "@/utils/types";

interface ProductTypeFormType extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: ProductTypeForm) => void;
  onClose: () => void;
}

const NewProductTypeForm: React.FC<ProductTypeFormType> = ({
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
  } = useForm<ProductTypeForm>({
    resolver: zodResolver(ProductTypeFormSchema),
    mode: "all",
  });

  const handleSubmitAndClose = (val: ProductTypeForm) => {
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
      <DialogTitle>Create New Product Type</DialogTitle>
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
              setValue("image", file[0], {
                shouldValidate: true,
              });
            }}
            multiple={false}
            error={errors.image?.message as string}
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

export default NewProductTypeForm;
