import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { Shop } from "@/utils/types";
import useShop from "@/hooks/useShop";
import CreateShopModal from "@/component/organisms/CreateShopModal";
import { uploadMultipleImages } from "@/utils/function";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const ShopsPage = () => {
  const { shops, isLoading, isRefetching, addNewShop, UpdateShopbyId } =
    useShop();

  const [showCreateShopModal, setShowCreateShopModal] = useState(false);

  const toogleCreateShopModal = () => {
    setShowCreateShopModal((prev) => !prev);
  };

  const columns = useMemo<MRT_ColumnDef<Shop>[]>(
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
    ],
    [],
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
      <Stack>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={props.row.original.isActive}
          onChange={(e, checked) => {
            UpdateShopbyId({
              id: props.row.original.id,
              data: {
                isActive: checked,
              },
            });
          }}
        />
      </Stack>
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
