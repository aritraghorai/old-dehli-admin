import Button from "@/component/atoms/Button";
import useCategory from "@/hooks/useCategory";
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
import { CategoryForm, FormType, categorySchema } from "@/utils/types";
import { useEffect } from "react";

interface CreateCategoryModalProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: CategoryForm) => void;
  onClose: () => void;
  initialValues?: CategoryForm;
  formType: FormType;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  onSubmit,
  onClose,
  initialValues,
  formType = "Create",
  ...props
}) => {
  const { data: categories = [] } = useCategory();

  const {
    register,
    setValue,
    handleSubmit,
    setValues,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    mode: "all",
    defaultValues: initialValues,
  });

  const handleSubmitAndClose = (val: CategoryForm) => {
    onSubmit(val);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    Object.keys(initialValues || {}).forEach((key) => {
      setValue(key as any, initialValues?.[key]);
    });
  }, [initialValues, setValues]);

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>{formType} New Category</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="CreateNewProductModal"
          onSubmit={handleSubmit(handleSubmitAndClose)}
        >
          <TextField
            label="Name"
            variant="outlined"
            {...register("name")}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
          <TextField
            label="Slug"
            variant="outlined"
            error={!!errors.slug?.message}
            helperText={errors.slug?.message}
            {...register("slug")}
          />
          <TextField
            label="Description"
            variant="outlined"
            error={!!errors.description?.message}
            helperText={errors.description?.message}
            {...register("description")}
          />
          <Autocomplete
            id="tags-standard"
            options={categories}
            onChange={(_, value) =>
              setValue("parentCategoryId", value?.id, { shouldValidate: true })
            }
            getOptionLabel={(data) => data.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Patent Category"
                placeholder="Select Category"
                error={!!errors.parentCategoryId?.message}
                helperText={errors.parentCategoryId?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="CreateNewProductModal" value="update">
          {formType}
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategoryModal;
