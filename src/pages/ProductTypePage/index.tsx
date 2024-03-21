/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ProductType,
  UpdateProductTypeBodySchema,
  UpdateShopRequestBody,
} from "@/utils/types";
import { uploadMultipleImages } from "@/utils/function";
import EditIcon from "@mui/icons-material/Edit";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import ImageEditorModal from "@/component/organisms/ImageEditorModal";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import NewProductTypeForm from "@/component/organisms/ProductTypeForm";
import useProductType from "@/hooks/useProductType";

export const ProductTypePage = () => {
  const {
    productTypes,
    addProductType,
    isRefetching,
    isLoading,
    updateProductType,
  } = useProductType();

  const [shopValidationErrors, setShopValidationErrors] = useState<
    UpdateShopRequestBody | undefined
  >();

  const [selectedProductType, setProductType] = useState<
    ProductType | undefined
  >();

  const [imageEditorModalOpen, setImageEditorModalOpen] = useState(false);

  const [showCreateShopModal, setShowCreateShopModal] = useState(false);

  const toogleCreateShopModal = () => {
    setShowCreateShopModal((prev) => !prev);
  };

  const toogleImageEditorModal = () => {
    setImageEditorModalOpen((prev) => !prev);
  };

  const handleSaveShop: MRT_TableOptions<ProductType>["onEditingRowSave"] =
    async ({ values, table }) => {
      try {
        const parseValues = await UpdateProductTypeBodySchema.parseAsync(
          values,
          {},
        );

        updateProductType({
          id: values.id,
          data: parseValues,
        });
        setShopValidationErrors(undefined);
        table.setEditingRow(null);
      } catch (error: unknown) {
        const zodError = error as ZodError;

        const errors = zodError.errors.map((err) => {
          const path = err.path.join(".");
          return {
            [path]: err.message,
          };
        });
        toast.error(errors[0][Object.keys(errors[0])[0]] as string);
        setShopValidationErrors(errors as any);
      }
    };

  const columns = useMemo<MRT_ColumnDef<ProductType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!shopValidationErrors?.name,
          helperText: shopValidationErrors?.name,
        },
      },
      {
        accessorKey: "slug",
        header: "Slug",
        enableEditing: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        muiEditTextFieldProps: {
          required: true,
          error: !!shopValidationErrors?.description,
          helperText: shopValidationErrors?.description,
        },
      },
      {
        header: "Image",
        enableEditing: false,
        accessorFn: (row) => (
          <img
            src={row?.image?.url}
            alt={row.name}
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
    ],
    [shopValidationErrors],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: productTypes ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    enableRowActions: true,
    enableSorting: false,
    paginationDisplayMode: "pages",
    onEditingRowCancel: () => setShopValidationErrors(undefined),
    onEditingRowSave: handleSaveShop,
    positionToolbarAlertBanner: "bottom",
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={toogleCreateShopModal}>
        Create New Product Type
      </Button>
    ),
    renderRowActions: (props) => (
      <Stack direction="row" alignItems="center">
        <IconButton onClick={() => props.table.setEditingRow(props.row)}>
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setProductType(props.row.original);
            toogleImageEditorModal();
          }}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </Stack>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="body2">Edit Shop</DialogTitle>
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
        <Typography variant="h4">Product Types</Typography>
        <MaterialReactTable table={table} />
      </Stack>
      <NewProductTypeForm
        open={showCreateShopModal}
        onClose={toogleCreateShopModal}
        onSubmit={async (data) => {
          //check product item already exist
          const images = await uploadMultipleImages([data.image] as File[]);
          addProductType({
            name: data.name,
            description: data.description,
            image: images[0],
          });
        }}
      />
      <ImageEditorModal
        open={imageEditorModalOpen}
        onClose={toogleImageEditorModal}
        isEditable={false}
        multiple={false}
        images={selectedProductType?.image ? [selectedProductType.image] : []}
        submit={async (newImages) => {
          if (newImages.length > 0) {
            const images = await uploadMultipleImages(newImages);
            updateProductType({
              id: selectedProductType?.id as string,
              data: {
                image: images[0],
              },
            });
          }
        }}
      />
    </FlowTemplate>
  );
};

export default ProductTypePage;
