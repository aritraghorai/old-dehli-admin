import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { IconButton, Stack, Typography } from "@mui/material";
import apiPaths from "@/axios/apiPaths";
import usePagination from "@/hooks/usePagination";
import { Product, ProductForm } from "@/utils/types";
import Button from "@/component/atoms/Button";
import CreateNewProductModal from "@/component/organisms/CreateNewProductModal";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/axios/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export const DashBoardPage = () => {
  const {
    data,
    pagination,
    setPagination,
    isLoading,
    isRefetching,
    setQueryParams,
  } = usePagination<Product>(apiPaths.PRODUCT);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: [apiPaths.PRODUCT, "createProduct"],
    mutationFn: (data: ProductForm) => createProduct(data),
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
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "slug",
        header: "Slug",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "category.name",
        header: "Category",
      },
    ],
    [],
    //end
  );

  const handleRowClick = (row: Product) => {
    navigate(`/product/${row.id}`);
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
    rowCount: pagination.pageSize,
    enableGlobalFilter: true,
    manualFiltering: true,
    enableRowActions: true,
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
      <IconButton onClick={() => handleRowClick(props.row.original)}>
        <VisibilityIcon />
      </IconButton>
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
