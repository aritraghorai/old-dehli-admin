import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Banner } from "@/utils/types";
import DeleteIcon from "@mui/icons-material/Delete";
import usePromotion from "@/hooks/usePromotion";
import PromotionForm from "@/component/organisms/PromotionFrom";
import { uploadImage } from "@/axios/api";

export const PromotionPage = () => {
  const {
    promotions,
    addNewBanner,
    deletePromotion,
    isLoading,
    isRefetching,
  } = usePromotion();


  const [showStatusFormModal, setStatusFormModal] = useState(false);


  const tooogleTimeSlotModel = () => {
    setStatusFormModal((pre) => !pre);
  };

  const columns = useMemo<MRT_ColumnDef<Banner>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "category.name",
        header: "Category",
      },
      {
        accessorKey: "position",
        header: "Position",
      },
      {
        header: "Image",
        accessorFn: (data) => <img
          src={data.image.url}
          width={200}
          height={200}
        />
      }

    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: promotions ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    enableSorting: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableRowActions: true,
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    renderRowActions: (props) => (
      <Stack direction="row">
        <IconButton
          onClick={() => {
            deletePromotion(props.row.original.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          tooogleTimeSlotModel();
        }}
      >
        Create New Promotion
      </Button>
    ),
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Promotion Page</Typography>
        <MaterialReactTable table={table} />
      </Stack>
      <PromotionForm
        open={showStatusFormModal}
        onClose={tooogleTimeSlotModel}
        onSubmit={async (data) => {
          const image = await uploadImage(data.image)
          addNewBanner({
            ...data,
            image: image.id
          })
        }}
      />
    </FlowTemplate>
  );
};

export default PromotionPage;

