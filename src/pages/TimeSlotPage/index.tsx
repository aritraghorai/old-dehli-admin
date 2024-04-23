import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { FormType, TimeSlot } from "@/utils/types";
import useTimeSlots from "@/hooks/useTimeSlot";
import TimeSlotForm from "@/component/organisms/TimeSlotForm";
import EditIcon from "@mui/icons-material/Edit";
import { convertTimeToDate } from "@/utils/function";

export const TimeSlotPage = () => {
  const [timeSlotFormType, setTimeSlotFormType] = useState<FormType>("Create");

  const { timeSlots, addTimeSlot, updateTimeSlot, isLoading, isRefetching } =
    useTimeSlots();

  const [showTimeSlotModal, sertShowTimeSlotModal] = useState(false);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<
    TimeSlot | undefined
  >();

  const tooogleTimeSlotModel = () => {
    sertShowTimeSlotModal((pre) => !pre);
  };

  const columns = useMemo<MRT_ColumnDef<TimeSlot>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "slot",
        header: "Name",
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
      },
      {
        accessorKey: "endTime",
        header: "End Time",
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: timeSlots ?? [],
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
            setSelectedTimeSlot(() => props.row.original);
            setTimeSlotFormType("Update");
            tooogleTimeSlotModel();
          }}
        >
          <EditIcon />
        </IconButton>
      </Stack>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          setSelectedTimeSlot(() => undefined);
          setTimeSlotFormType("Create");
          tooogleTimeSlotModel();
        }}
      >
        Create Time Slot
      </Button>
    ),
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">TimeSlot Page</Typography>
        <MaterialReactTable table={table} />
        <TimeSlotForm
          open={showTimeSlotModal}
          onClose={tooogleTimeSlotModel}
          formType={timeSlotFormType}
          onSubmit={(data) => {
            if (timeSlotFormType === "Create") {
              addTimeSlot(data);
            } else {
              updateTimeSlot({
                id: selectedTimeSlot?.id as string,
                data,
              });
              setSelectedTimeSlot(() => undefined);
              setTimeSlotFormType("Create");
            }
          }}
          initialTimeSlot={{
            startTime: convertTimeToDate(selectedTimeSlot?.startTime),
            endTime: convertTimeToDate(selectedTimeSlot?.endTime),
          }}
        />
      </Stack>
    </FlowTemplate>
  );
};

export default TimeSlotPage;
