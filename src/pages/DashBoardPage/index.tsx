import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
  MRT_EditActionButtons,
  MRT_TableOptions,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import apiPaths from "@/axios/apiPaths";
import {
  Product,
  ProductForm,
  UpdateProductRequestBody,
  UpdateProductRequestBodySchema,
} from "@/utils/types";
import Button from "@/component/atoms/Button";
import CreateNewProductModal from "@/component/organisms/CreateNewProductModal";
import { useMutation } from "@tanstack/react-query";
import { createProduct, updateProduct } from "@/axios/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategory from "@/hooks/useCategory";
import toast from "react-hot-toast";
import useProducts from "@/hooks/useProducts";
import useProductType from "@/hooks/useProductType";
import useTimeSlots from "@/hooks/useTimeSlot";
import useShop from "@/hooks/useShop";

export const DashBoardPage = () => {
  const { products, isRefetching, isLoading, refetch: fetch } = useProducts();
  const navigate = useNavigate();
  const { data: categories } = useCategory();
  const { productTypes } = useProductType();
  const { shops } = useShop();
  const { timeSlots = [] } = useTimeSlots();

  const {
    setValue,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<UpdateProductRequestBody>({
    resolver: zodResolver(UpdateProductRequestBodySchema),
    mode: "all",
  });

  const { mutate } = useMutation({
    mutationKey: [apiPaths.PRODUCT_ALL, "createProduct"],
    mutationFn: (data: ProductForm) => createProduct(data),
    onSuccess: () => {
      fetch();
    },
  });

  const { mutate: updateProductById } = useMutation({
    mutationKey: [apiPaths.PRODUCT_ALL, "updateProduct"],
    onSuccess: () => {
      fetch();
    },
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductRequestBody;
    }) => updateProduct(id, data),
    onSettled: () => {
      toast.success("Product Updated Successfully");
    },
  });

  const [showCreateProductModal, setShowCreateProductModal] = useState(false);

  const toogleCreateProductModal = () => {
    setShowCreateProductModal((prev) => !prev);
  };
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableFilterMatchHighlighting: true,
        muiEditTextFieldProps: {
          error: !!errors.name?.message,
          helperText: errors.name?.message,
          required: true,
        },
      },
      {
        accessorKey: "slug",
        header: "Slug",
        muiEditTextFieldProps: {
          error: !!errors.slug?.message,
          helperText: errors.slug?.message,
          required: true,
        },
      },
      {
        accessorKey: "shop.name",
        header: "Shop Name",
        enableEditing: true,
        editVariant: "select",
        muiEditTextFieldProps: (row) => ({
          required: true,
          value: getValues("shopId") ?? row.row.original.shop.id ?? null,
          name: "shopId",
          onChange: (e) => {
            setValue("shopId", e.target.value, {
              shouldValidate: true,
            });
          },
        }),
        editSelectOptions:
          shops?.map((shop) => ({
            label: shop.slug,
            value: shop.id,
          })) ?? [],
      },
      {
        accessorKey: "minOrderQuantity",
        header: "Min Order Quantity",
        enableEditing: true,
        muiEditTextFieldProps: {
          error: !!errors.minOrderQuantity?.message,
          helperText: errors.minOrderQuantity?.message,
          required: true,
        },
      },
      {
        accessorKey: "priority",
        header: "Priority",
        enableEditing: true,
        muiEditTextFieldProps: {
          error: !!errors.priority?.message,
          helperText: errors.priority?.message,
          required: true,
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        muiEditTextFieldProps: {
          error: !!errors.price?.message,
          helperText: errors.price?.message,
          required: true,
        },
      },
      {
        accessorFn: (row) => row.category.slug,
        header: "Category",
        enableEditing: true,
        editVariant: "select",
        muiEditTextFieldProps: (row) => ({
          required: true,
          value:
            getValues("categoryId") ?? row.row.original.category.id ?? null,
          name: "categoryId",
          onChange: (e) => {
            console.log(e.target.value);
            setValue("categoryId", e.target.value, {
              shouldValidate: true,
            });
          },
        }),
        editSelectOptions:
          categories?.map((category) => ({
            label: category.slug,
            value: category.id,
          })) ?? [],
      },
      {
        accessorFn: (row) => row.type.slug,
        header: "Product Type",
        enableEditing: true,
        editVariant: "select",
        muiEditTextFieldProps: (row) => ({
          required: true,
          value: getValues("productType") ?? row.row.original.type.id,
          name: "productType",
          onChange: (e) => {
            setValue("productType", e.target.value, {
              shouldValidate: true,
            });
          },
        }),
        editSelectOptions:
          productTypes?.map((type) => ({
            label: type.slug,
            value: type.id,
          })) ?? [],
      },
      {
        accessorFn: (row) => row.timeSlot?.slot,
        header: "Time Slot",
        enableEditing: true,
        editVariant: "select",
        muiEditTextFieldProps: (row) => ({
          required: true,
          value: getValues("timeSlot") ?? row.row.original.timeSlot?.id ?? null,
          name: "timeSlot",
          onChange: (e) => {
            setValue("timeSlot", e.target.value, {
              shouldValidate: true,
            });
          },
        }),
        editSelectOptions:
          timeSlots?.map((slot) => ({
            label: slot.slot,
            value: slot.id,
          })) ?? [],
      },
      // {
      //   accessorFn: (row) => <Stack>
      //     {
      //       row.allowZones.map((zone) => (
      //         <Typography key={zone.id}>{zone.name}</Typography>
      //       ))
      //     }
      //   </Stack>,
      //   header: "Allow Zones",
      //   enableEditing: false,
      // }
    ],
    [errors, categories, setValue, getValues, productTypes, timeSlots],
    //end
  );

  const handleRowClick = (row: Product) => {
    navigate(`/product/${row.id}`);
  };

  const handleSaveProduct: MRT_TableOptions<Product>["onEditingRowSave"] =
    async ({ values, table }) => {
      Object.keys(values).forEach((key) => {
        if (
          key === "name" ||
          key === "slug" ||
          key === "price" ||
          key === "minOrderQuantity" ||
          key === "priority"
        ) {
          setValue(key as keyof UpdateProductRequestBody, values[key], {
            shouldValidate: true,
          });
        }
      });
      if (isValid) {
        updateProductById({
          id: values.id,
          data: getValues(),
        });
        table.setEditingRow(null);
      } else {
        table.setEditingRow(null);
      }
    };

  const table = useMaterialReactTable({
    columns,
    data: products ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowSelection: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableEditing: true,
    editDisplayMode: "modal",
    enableGlobalFilter: true,
    enableRowActions: true,
    onEditingRowCancel: () => reset(),
    onEditingRowSave: handleSaveProduct,
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    enableTableHead: true,
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={toogleCreateProductModal}>
        Create New Product
      </Button>
    ),
    renderRowActions: (props) => (
      <Stack direction="row">
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={props.row.original.isActive}
          onChange={(_e, checked) => {
            updateProductById({
              id: props.row.original.id,
              data: {
                isActive: checked,
              },
            });
          }}
        />
        <IconButton onClick={() => props.table.setEditingRow(props.row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleRowClick(props.row.original)}>
          <VisibilityIcon />
        </IconButton>
      </Stack>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="body2">Edit Product</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          dividers
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Products</Typography>
        <MaterialReactTable table={table} />
      </Stack>
      <CreateNewProductModal
        open={showCreateProductModal}
        onClose={toogleCreateProductModal}
        onSubmit={mutate}
      />
    </FlowTemplate>
  );
};

export default DashBoardPage;
