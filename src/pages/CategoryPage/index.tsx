import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Button, Stack, Typography } from "@mui/material";
import apiPaths from "@/axios/apiPaths";
import { Category, CategoryForm } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, getAllCategories } from "@/axios/api";
import CreateCategoryModal from "@/component/organisms/CreateCategoryModal";
import toast from "react-hot-toast";

export const CategoryPage = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const toggleShowCreateCategoryModal = () =>
    setShowCreateCategoryModal((prev) => !prev);

  const { data, isLoading, isRefetching, refetch } = useQuery<Category[]>({
    queryKey: [apiPaths.CATEGORY],
    queryFn: getAllCategories,
  });

  const { mutate } = useMutation({
    mutationKey: [apiPaths.CATEGORY, "createProduct"],
    mutationFn: (data: CategoryForm) => createCategory(data),
    onSuccess: () => {
      toast.success("Category created successfully");
      refetch();
    },
  });

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
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
        accessorKey: "description",
        header: "Description",
      },
      {
        subCategory: "Actions",
        header: "Actions",
      },
      {
        header: "Sub Category",
        accessorFn: (row) =>
          row.subCategories.map((subCategory) => subCategory.name).join(", "),
      },
      {
        header: "Parent Category",
        accessorFn: (row) => row.parent?.name,
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: data ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    enableSorting: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={toggleShowCreateCategoryModal}>
        Create New Category
      </Button>
    ),
  });

  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Category</Typography>
        <MaterialReactTable table={table} />
        <CreateCategoryModal
          open={showCreateCategoryModal}
          onClose={toggleShowCreateCategoryModal}
          onSubmit={mutate}
        />
      </Stack>
    </FlowTemplate>
  );
};

export default CategoryPage;
