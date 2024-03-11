import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import apiPaths from "@/axios/apiPaths";
import { Category, CategoryForm, FormType } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, getAllCategories, updateCategory } from "@/axios/api";
import CreateCategoryModal from "@/component/organisms/CreateCategoryModal";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";

export const CategoryPage = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [formType, setFormType] = useState<FormType>("Create");
  const [slectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  const selectedCategoryForm = useMemo<CategoryForm>(
    () => ({
      name: slectedCategory?.name as string,
      slug: slectedCategory?.slug as string,
      description: slectedCategory?.description as string,
      parent: slectedCategory?.parent?.id as string,
    }),
    [slectedCategory],
  );

  const toggleShowCreateCategoryModal = () =>
    setShowCreateCategoryModal((prev) => !prev);

  const { data, isLoading, isRefetching, refetch } = useQuery<Category[]>({
    queryKey: [apiPaths.CATEGORY],
    queryFn: getAllCategories,
  });

  const { mutate } = useMutation({
    mutationKey: [apiPaths.CATEGORY, "createCategory"],
    mutationFn: (data: CategoryForm) => createCategory(data),
    onSuccess: () => {
      toast.success("Category created successfully");
      refetch();
    },
  });

  const { mutate: updateCateoryById } = useMutation({
    mutationKey: [apiPaths.CATEGORY, "updateCategory"],
    mutationFn: (data: CategoryForm) =>
      updateCategory(slectedCategory?.id as string, data),
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
        enableEditing: false,
      },
      {
        header: "Sub Category",
        accessorFn: (row) =>
          row.subCategories.map((subCategory) => subCategory.name).join(", "),
        enableEditing: false,
      },
      {
        header: "Parent Category",
        accessorFn: (row) => row.parent?.name,
        enableEditing: false,
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
    enableRowActions: true,
    getSubRows: (row) => row.subCategories ?? [],
    enableExpanding: true,
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={toggleShowCreateCategoryModal}>
        Create New Category
      </Button>
    ),
    renderRowActions: (props) => (
      <Stack direction="row">
        <IconButton
          onClick={() => {
            setFormType("Update");
            setSelectedCategory(props.row.original);
            toggleShowCreateCategoryModal();
          }}
        >
          <EditIcon />
        </IconButton>
      </Stack>
    ),
  });

  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Category</Typography>
        <MaterialReactTable table={table} />
        <CreateCategoryModal
          formType={formType}
          open={showCreateCategoryModal}
          onClose={toggleShowCreateCategoryModal}
          onSubmit={(data) => {
            if (formType === "Create") {
              mutate(data);
            } else {
              updateCateoryById(data);
            }
          }}
          initialValues={selectedCategoryForm}
        />
      </Stack>
    </FlowTemplate>
  );
};

export default CategoryPage;
