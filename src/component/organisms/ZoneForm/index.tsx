/* eslint-disable @typescript-eslint/no-explicit-any */
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
  createFilterOptions,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormType,
  Pincode,
  Zone,
  type ZoneForm,
  ZoneFormSchema,
} from "@/utils/types";
import { useEffect } from "react";
import usePinCode from "@/hooks/usePinCode";
import useProducts from "@/hooks/useProducts";

const filter = createFilterOptions<Pincode>();

interface CreateCategoryModalProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: ZoneForm) => void;
  onClose: () => void;
  initialValues?: Zone;
  formType: FormType;
}

const ZoneForm: React.FC<CreateCategoryModalProps> = ({
  onSubmit,
  onClose,
  initialValues,
  formType = "Create",
  ...props
}) => {
  const { pinCodes = [], addPinCode } = usePinCode();
  const { products = [] } = useProducts();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<ZoneForm>({
    resolver: zodResolver(ZoneFormSchema),
    mode: "all",
    // defaultValues: initialValues,
  });

  const handleSubmitAndClose = (val: ZoneForm) => {
    onSubmit(val);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (initialValues) {
      setValue("name", initialValues.name, { shouldValidate: true });
      setValue("deliveryCharges", initialValues.deliveryCharges, {
        shouldValidate: true,
      });
      setValue(
        "pincodes",
        initialValues.pincodes.map((a) => a.id),
        { shouldValidate: true },
      );
      setValue(
        "products",
        initialValues.products.map((a) => a.id),
        { shouldValidate: true },
      );
    }
  }, [initialValues, setValue]);

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>{formType} New Zone</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="crateZone"
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
            label="Delivery Charges"
            variant="outlined"
            error={!!errors.deliveryCharges?.message}
            helperText={errors.deliveryCharges?.message}
            {...register("deliveryCharges")}
          />
          <Autocomplete
            id="tags-standard"
            options={pinCodes ?? []}
            onChange={async (_, value) => {
              const isNew = value.find((val) => val.id === "new-pin");
              if (isNew) {
                try {
                  const res = (await addPinCode(isNew.createdAt)) as Pincode;
                  setValue(
                    "pincodes",
                    value.map((val) =>
                      val.id === "new-pin" ? res.id : val.id,
                    ),
                    { shouldValidate: true },
                  );
                  return;
                } catch (error) {
                  return;
                }
              }
              setValue(
                "pincodes",
                value.map((val) => val.id),
                { shouldValidate: true },
              );
            }}
            multiple
            value={
              pinCodes.filter((cat) =>
                watch("pincodes")?.some((s) => s === cat.id),
              ) ??
              pinCodes.filter((cat) =>
                initialValues?.pincodes?.some((s) => s.id === cat.id),
              ) ??
              null
            }
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.pincode,
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  pincode: `Add "${inputValue}"`,
                  id: "new-pin",
                  postOffices: [],
                  createdAt: inputValue,
                  updatedAt: new Date().toISOString(),
                });
              }

              return filtered;
            }}
            getOptionLabel={(data) => data.pincode}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Pin Codes"
                placeholder="Select Pin Codes"
                error={!!errors.pincodes?.message}
                helperText={errors.pincodes?.message}
              />
            )}
          />
          <Autocomplete
            id="tags-standard"
            options={products ?? []}
            filterOptions={(options, params) => {
              const filter = createFilterOptions()
              const filtered = filter(options, params as any)
              const allProduct = { name: 'Select All...', all: true } as any
              return [allProduct, ...filtered]
            }}
            multiple
            onChange={(_, value: any) => {
              if (value.find((val: any) => val.all)) {
                setValue(
                  "products",
                  getValues("products")?.length === products.length ? [] : products.map((a) => a.id),
                  { shouldValidate: true },
                )
                return
              }
              setValue(
                "products",
                value.map((a: any) => a.id),
                { shouldValidate: true },
              )

            }
            }
            value={
              products?.filter((cat) =>
                watch("products")?.some((a) => a === cat.id),
              ) ??
              products?.filter((cat) =>
                initialValues?.products?.some((a) => a.id === cat.id),
              ) ??
              null
            }
            getOptionLabel={(data) => data.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Products"
                placeholder="Select Products"
                error={!!errors.products?.message}
                helperText={errors.products?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="crateZone"
          value="update"
          disabled={!isValid}
        >
          {formType}
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ZoneForm;
