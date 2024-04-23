import Button from "@/component/atoms/Button";
import { useForm } from "react-hook-form";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Option,
  OptionValue,
  ProductItem,
  UpdateProductItemRequestBody,
  UpdateProductItemRequestBodySchema,
} from "@/utils/types";
import useOptions from "@/hooks/useOptions";
import { useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductItemUpdateFormProps extends Omit<DialogProps, "onSubmit"> {
  onSubmit: (data: UpdateProductItemRequestBody) => void;
  onClose: () => void;
  productItem?: ProductItem;
}

const ProductItemUpdateForm: React.FC<ProductItemUpdateFormProps> = ({
  onSubmit,
  onClose,
  productItem,
  ...props
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<UpdateProductItemRequestBody>({
    resolver: zodResolver(UpdateProductItemRequestBodySchema),
    mode: "all",
  });

  const { productOption = [] } = useOptions();

  const [options, setOptions] = useState<
    { option: Option | null; optionValue: OptionValue | null }[]
  >([]);

  const computeOption = useMemo<Option[]>(() => {
    return productOption.filter(
      (val) => !options.some((a) => a.option?.id === val.id),
    );
  }, [productOption, options]);

  useEffect(() => {
    const newOption: string[] = [];
    for (const val of options) {
      if (val.optionValue !== null) {
        newOption.push(val.optionValue.id);
      }
    }
    setValue("optionValues", newOption, {
      shouldValidate: true,
    });
  }, [productOption, options, setValue]);

  const handleSubmitAndClose = (val: UpdateProductItemRequestBody) => {
    if (isValid) {
      onSubmit(val);
      setOptions([]);
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    setOptions([]);
    onClose();
  };

  useEffect(() => {
    if (productItem) {
      setValue("sku", productItem.sku, {
        shouldValidate: true,
      });
      setValue("stock", +productItem.stock, {
        shouldValidate: true,
      });
      setValue("price", +productItem.price, {
        shouldValidate: true,
      });
      setValue("weight", +productItem.weight, {
        shouldValidate: true,
      });
      setOptions(() =>
        productItem.productConfig.map((val) => ({
          option: val.optionValue.option,
          optionValue: val.optionValue,
        })),
      );
    }
  }, [productItem, setValue]);

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>Update Product Item</DialogTitle>
      <DialogContent dividers>
        <Stack
          gap={3}
          width="400px"
          component="form"
          id="CreateNewProductModal"
          onSubmit={handleSubmit(handleSubmitAndClose)}
        >
          <TextField
            label="Sku"
            variant="outlined"
            {...register("sku")}
            error={!!errors.sku?.message}
            helperText={errors.sku?.message}
          />
          <TextField
            label="Stock"
            variant="outlined"
            error={!!errors.stock?.message}
            helperText={errors.stock?.message}
            {...register("stock")}
          />
          <TextField
            label="Weight"
            variant="outlined"
            error={!!errors.weight?.message}
            helperText={errors.weight?.message}
            {...register("weight")}
          />
          <TextField
            label="Price"
            variant="outlined"
            error={!!errors.price?.message}
            helperText={errors.price?.message}
            {...register("price")}
          />
          {options.map((_val, index) => (
            <>
              <IconButton
                sx={{
                  alignSelf: "flex-end",
                }}
                onClick={() => {
                  setOptions((prev) => {
                    const newOptions = [...prev];
                    newOptions.splice(index, 1);
                    return newOptions;
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Autocomplete
                id="tags-standard"
                options={computeOption}
                getOptionLabel={(data) => data.value}
                value={options[index].option}
                onChange={(_, val) => {
                  setOptions((prev) => {
                    const newOptions = [...prev];
                    newOptions[index].option = val;
                    return newOptions;
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Option"
                    placeholder="Option"
                  />
                )}
              />
              <Autocomplete
                id="tags-standard"
                options={
                  productOption.find((p) => p.id === options[index].option?.id)
                    ?.Options || []
                }
                disabled={options[index].option === null}
                getOptionLabel={(data) => data.value}
                value={options[index].optionValue}
                onChange={(_, val) => {
                  setOptions((prev) => {
                    const newOptions = [...prev];
                    newOptions[index].optionValue = val;
                    return newOptions;
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Option Value"
                    placeholder="Option Value"
                  />
                )}
              />
            </>
          ))}
          <Button
            disabled={computeOption.length === 0}
            onClick={() => {
              setOptions([...options, { option: null, optionValue: null }]);
            }}
          >
            Add Option
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="CreateNewProductModal" disabled={!isValid}>
          Update
        </Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductItemUpdateForm;
