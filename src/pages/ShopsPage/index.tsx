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
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Shop,
  UpdateShopRequestBody,
  updateShopValidatorSchema,
} from "@/utils/types";
import useShop from "@/hooks/useShop";
import CreateShopModal from "@/component/organisms/CreateShopModal";
import { uploadMultipleImages } from "@/utils/function";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import { ZodError } from "zod";
import toast from "react-hot-toast";

export const ShopsPage = () => {
  const { shops, isLoading, isRefetching, addNewShop, UpdateShopbyId } =
    useShop();

  const [shopValidationErrors, setShopValidationErrors] = useState<
    UpdateShopRequestBody | undefined
  >();

  const [showCreateShopModal, setShowCreateShopModal] = useState(false);

  const toogleCreateShopModal = () => {
    setShowCreateShopModal((prev) => !prev);
  };

  const handleSaveShop: MRT_TableOptions<Shop>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    try {
      const parseValues = await updateShopValidatorSchema.parseAsync(
        values,
        {},
      );

      console.log("parseValues", parseValues);

      UpdateShopbyId({
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

  const columns = useMemo<MRT_ColumnDef<Shop>[]>(
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
    ],
    [shopValidationErrors],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: shops ?? [],
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
        Create New Shop
      </Button>
    ),
    renderRowActions: (props) => (
      <Stack direction="row" alignItems="center">
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={props.row.original.isActive}
          onChange={(_e, checked) => {
            UpdateShopbyId({
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

    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: "grid",
          margin: "auto",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
        }}
      >
        {row.original.images.map((img) => (
          <Stack direction="row" gap={2}>
            <img
              key={img.id}
              src={img.url}
              alt="product"
              style={{ width: "100px", height: "100px" }}
            />
          </Stack>
        ))}
      </Box>
    ),
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Shops</Typography>
        <MaterialReactTable table={table} />
      </Stack>
      <CreateShopModal
        open={showCreateShopModal}
        onClose={toogleCreateShopModal}
        onSubmit={async (data) => {
          //check product item already exist
          const images = await uploadMultipleImages(data.images as File[]);
          addNewShop({
            ...data,
            images,
          });
        }}
      />
    </FlowTemplate>
  );
};

export default ShopsPage;
