import Button from "@/component/atoms/Button";
import { useForm } from "react-hook-form";
import {
  Autocomplete,
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
import useCategory from "@/hooks/useCategory";
import { NewBannerFormSchema, NewBannerFormType } from "@/utils/types";





interface PromotionFormType extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: NewBannerFormType) => void;
  onClose: () => void;
}

const PromotionForm: React.FC<PromotionFormType> = ({
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
  } = useForm<NewBannerFormType>({
    resolver: zodResolver(NewBannerFormSchema),
    mode: "all",
  });

  const { data } = useCategory()

  const handleSubmitAndClose = (val: NewBannerFormType) => {
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
      <DialogTitle>Create New Promotion Form</DialogTitle>
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
            label="Position"
            variant="outlined"
            type="number"
            error={!!errors.position?.message}
            helperText={errors.position?.message}
            {...register("position")}
          />
          <Autocomplete
            id="tags-standard"
            options={data ?? []}
            getOptionLabel={(data) => data.slug}
            onChange={(_, value) =>
              setValue("category", value?.id as string, {
                shouldValidate: true,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Category"
                placeholder="Select Category"
                error={!!errors.category?.message}
                helperText={errors.category?.message}
              />
            )}
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

export default PromotionForm;

