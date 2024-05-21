import Button from "@/component/atoms/Button";
import useCategory from "@/hooks/useCategory";
import useProductTags from "@/hooks/useProductTag";
import useShop from "@/hooks/useShop";
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
import { ProductForm, productFormSchema } from "@/utils/types";
import useProductType from "@/hooks/useProductType";
import useTimeSlots from "@/hooks/useTimeSlot";
import useZones from "@/hooks/useZones";

interface CreateNewProductModalProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: ProductForm) => void;
  onClose: () => void;
}

const CreateNewProductModal: React.FC<CreateNewProductModalProps> = ({
  onSubmit,
  onClose,
  ...props
}) => {
  const { data = [] } = useCategory();
  const { shops = [] } = useShop();
  const { productTags = [] } = useProductTags();
  const { productTypes = [] } = useProductType();
  const { timeSlots = [] } = useTimeSlots();
  const { zones = [] } = useZones()

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
    shouldFocusError: true,
    mode: "all",
  });

  const handleSubmitAndClose = (val: ProductForm) => {
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
            label="Description"
            variant="outlined"
            error={!!errors.description?.message}
            helperText={errors.description?.message}
            {...register("description")}
          />
          <TextField
            label="Avg Price"
            variant="outlined"
            error={!!errors.price?.message}
            helperText={errors.price?.message}
            {...register("price")}
          />
          <TextField
            label="Min Quantity Order"
            variant="outlined"
            error={!!errors.minOrderQuantity?.message}
            helperText={errors.minOrderQuantity?.message}
            {...register("minOrderQuantity")}
          />
          <Autocomplete
            id="tags-standard"
            options={data}
            getOptionLabel={(data) => data.slug}
            onChange={(_, value) =>
              setValue("categoryId", value?.id as string, {
                shouldValidate: true,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Category"
                placeholder="Select Category"
                error={!!errors.categoryId?.message}
                helperText={errors.categoryId?.message}
              />
            )}
          />
          <Autocomplete
            id="tags-standard"
            options={shops}
            getOptionLabel={(data) => data.name}
            onChange={(_, value) =>
              setValue("shopId", value?.id as string, {
                shouldValidate: true,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Shop"
                placeholder="Select Shop"
                error={!!errors.shopId?.message}
                helperText={errors.shopId?.message}
              />
            )}
          />
          <Autocomplete
            id="tags-standard"
            options={productTypes}
            getOptionLabel={(data) => data.name}
            onChange={(_, value) =>
              setValue("productType", value?.id as string, {
                shouldValidate: true,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Product Type"
                placeholder="Select Product Type"
                error={!!errors.productType?.message}
                helperText={errors.productType?.message}
              />
            )}
          />
          <Autocomplete
            id="tags-standard"
            options={timeSlots}
            getOptionLabel={(data) => data.slot}
            onChange={(_, value) =>
              setValue("timeSlot", value?.id as string, {
                shouldValidate: true,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Time Slot"
                placeholder="Select Time Slot"
                error={!!errors.timeSlot?.message}
                helperText={errors.timeSlot?.message}
              />
            )}
          />

          <Autocomplete
            id="Zones"
            multiple
            options={zones}
            onChange={(_, value) =>
              setValue(
                "allowZones",
                value.map((v) => v.id),
                {
                  shouldValidate: true,
                },
              )
            }
            getOptionLabel={(data) => data.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Zones"
                placeholder="Select Zones"
                error={!!errors.allowZones?.message}
                helperText={errors.allowZones?.message}
              />
            )}
          />




          <Autocomplete
            id="tags-standard"
            multiple
            options={productTags}
            onChange={(_, value) =>
              setValue(
                "productTags",
                value.map((v) => v.id),
                {
                  shouldValidate: true,
                },
              )
            }
            getOptionLabel={(data) => data.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Product Tag"
                placeholder="Select Product Tag"
                error={!!errors.productTags?.message}
                helperText={errors.productTags?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="CreateNewProductModal" disabled={!isValid}>
          Create
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewProductModal;
