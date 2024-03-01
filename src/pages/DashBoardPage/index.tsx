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
import usePagination from "@/hooks/usePagination";
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

export const DashBoardPage = () => {
  const {
    data,
    pagination,
    setPagination,
    isLoading,
    isRefetching,
    setQueryParams,
    fetch,
  } = usePagination<Product>(apiPaths.PRODUCT_ALL);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

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
  });

  const handleGlobalFilterChange = (filter: string) => {
    setGlobalFilter(filter);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    if (filter && filter !== "")
      setQueryParams([{ key: "search", value: filter }]);
  };

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
        enableEditing: false,
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
        accessorKey: "category.name",
        header: "Category",
        enableEditing: false,
      },
    ],
    [errors],
    //end
  );

  const handleRowClick = (row: Product) => {
    navigate(`/product/${row.id}`);
  };

  const handleSaveProduct: MRT_TableOptions<Product>["onEditingRowSave"] =
    async ({ values, table }) => {
      console.log("values", values);
      Object.keys(values).forEach((key) => {
        if (key === "name" || key === "slug" || key === "price") {
          setValue(key as keyof UpdateProductRequestBody, values[key], {
            shouldValidate: true,
          });
        }
      });
      console.log("values", values);
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
    data: data?.data ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowSelection: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    manualPagination: true,
    onPaginationChange: setPagination,
    enableEditing: true,
    editDisplayMode: "modal",
    rowCount: pagination.pageSize,
    enableGlobalFilter: true,
    manualFiltering: true,
    enableRowActions: true,
    onEditingRowCancel: () => reset(),
    onEditingRowSave: handleSaveProduct,
    muiPaginationProps: {
      count: data?.totalPage ?? 0,
    },
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      pagination,
      showProgressBars: isRefetching,
      globalFilter: globalFilter,
    },
    enableTableHead: true,
    onGlobalFilterChange: handleGlobalFilterChange,
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
