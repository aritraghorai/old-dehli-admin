import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import apiPaths from "@/axios/apiPaths";
import {
  Category,
  CategoryForm,
  CreateCategoryRequestBody,
  FormType,
  UpdateCategoryRequestBody,
} from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, getAllCategories, updateCategory } from "@/axios/api";
import CreateCategoryModal from "@/component/organisms/CreateCategoryModal";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import { uploadMultipleImages } from "@/utils/function";
import ImageEditorModal from "@/component/organisms/ImageEditorModal";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export const CategoryPage = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [formType, setFormType] = useState<FormType>("Create");
  const [slectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  const [imageEditorModalOpen, setImageEditorModalOpen] = useState(false);

  const toogleImageEditorModal = () => {
    setImageEditorModalOpen((prev) => !prev);
  };

  const selectedCategoryForm = useMemo<CategoryForm>(
    () => ({
      name: slectedCategory?.name as string,
      slug: slectedCategory?.slug as string,
      description: slectedCategory?.description as string,
      parentCategoryId: slectedCategory?.parent?.id as string,
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
    mutationFn: (data: CreateCategoryRequestBody) => createCategory(data),
    onSuccess: () => {
      toast.success("Category created successfully");
      refetch();
    },
  });

  const { mutate: updateCateoryById } = useMutation({
    mutationKey: [apiPaths.CATEGORY, "updateCategory"],
    mutationFn: (data: UpdateCategoryRequestBody) =>
      updateCategory(slectedCategory?.id as string, data),
    onSuccess: () => {
      toast.success("Category updated successfully");
      setFormType("Create");
      setSelectedCategory(undefined);
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
      <Button
        variant="contained"
        onClick={() => {
          setFormType("Create");
          setSelectedCategory(undefined);
          toggleShowCreateCategoryModal();
        }}
      >
        Create New Category
      </Button>
    ),
    renderRowActions: (props) => (
      <Stack direction="row">
        <IconButton
          onClick={() => {
            setFormType("Update");
            setSelectedCategory(() => props.row.original);
            toggleShowCreateCategoryModal();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedCategory(props.row.original);
            toogleImageEditorModal();
          }}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </Stack>
    ),
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: "grid",
          margin: "auto",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
        }}
      >
        {row.original.image ? (
          <Stack direction="column">
            <img
              key={row.original.image.id}
              src={row.original.image.url}
              alt="product"
              style={{ width: "100px", height: "100px" }}
            />
          </Stack>
        ) : null}
      </Box>
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
          onSubmit={async (data) => {
            if (formType === "Create") {
              console.log(data);
              const images = await uploadMultipleImages(data.image as File[]);
              mutate({
                ...data,
                image: images[0],
              });
            } else {
              updateCateoryById(data);
            }
          }}
          initialValues={selectedCategoryForm}
        />
        <ImageEditorModal
          open={imageEditorModalOpen}
          multiple={false}
          onClose={toogleImageEditorModal}
          images={
            selectedCategoryForm?.image ? [selectedCategoryForm.image] : []
          }
          submit={async (newImages) => {
            if (newImages.length > 0) {
              const images = await uploadMultipleImages(newImages);
              updateCateoryById({
                image: images[0],
              });
            }
          }}
        />
      </Stack>
    </FlowTemplate>
  );
};

export default CategoryPage;
