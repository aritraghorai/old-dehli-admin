import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { FormType, Status } from "@/utils/types";
// import EditIcon from "@mui/icons-material/Edit";
import useStatus from "@/hooks/useStatus";
import StatusForm from "@/component/organisms/StatusForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadLoadVideo } from "@/axios/api";

export const StatusPage = () => {
  const {
    status,
    addStatus,
    updateStatus,
    deleteStatus,
    isLoading,
    isRefetching,
  } = useStatus();

  const [statusFormType, setStatusFormType] = useState<FormType>("Create");

  const [showStatusFormModal, setStatusFormModal] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>();

  const tooogleTimeSlotModel = () => {
    setStatusFormModal((pre) => !pre);
  };

  const columns = useMemo<MRT_ColumnDef<Status>[]>(
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
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorFn: (row) => (
          <Stack direction="row" gap={2}>
            <video width="320" height="240" controls src={row.video_url}></video>
          </Stack>
        ),
        header: "Video",
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: status ?? [],
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
        {/* <IconButton */}
        {/*   onClick={() => { */}
        {/*     setSelectedStatus(() => props.row.original); */}
        {/*     setStatusFormType("Update"); */}
        {/*     tooogleTimeSlotModel(); */}
        {/*   }} */}
        {/* > */}
        {/*   <EditIcon /> */}
        {/* </IconButton> */}
        <IconButton
          onClick={() => {
            deleteStatus(props.row.original.id);
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
          setSelectedStatus(() => undefined);
          setStatusFormType("Create");
          tooogleTimeSlotModel();
        }}
      >
        Create New Status
      </Button>
    ),
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Status Page</Typography>
        <MaterialReactTable table={table} />
      </Stack>
      <StatusForm
        open={showStatusFormModal}
        onClose={tooogleTimeSlotModel}
        formType={statusFormType}
        onSubmit={async (data) => {
          if (statusFormType === "Create") {
            const video = await uploadLoadVideo(data.video)
            addStatus({
              video_url: video.url,
              ...data
            });
          } else {
            const video = await uploadLoadVideo(data.video)
            updateStatus({
              id: selectedStatus?.id as string,
              data: {
                ...data,
                video_url: video.url
              }
            });
            setSelectedStatus(undefined);
            setStatusFormType("Create");
          }
        }}
        initialStatus={selectedStatus}
      />
    </FlowTemplate>
  );
};

export default StatusPage;
