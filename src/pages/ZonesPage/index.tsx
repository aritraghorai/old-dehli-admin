/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { FormType, Zone } from "@/utils/types";
import useZones from "@/hooks/useZones";
import ZoneForm from "@/component/organisms/ZoneForm";
import EditIcon from "@mui/icons-material/Edit";
import UploadZonesForm from "@/component/organisms/UploadZonesForm";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ZonesPage = () => {
  const {
    zones,
    isLoading,
    isRefetching,
    createZone,
    updateZone,
    uploadZonesFromExel,
    deleteZone,
  } = useZones();

  const [selectedZone, setSelectedZone] = useState<Zone | undefined>();

  const [uploadZonesFormOpen, setUploadZonesFormOpen] = useState(false);

  const [showZones, setShowZones] = useState(false);
  const [formType, setFormType] = useState<FormType>("Create");

  const toogleShowZones = () => setShowZones((prev) => !prev);

  const toogleUploadZonesForm = () => setUploadZonesFormOpen((prev) => !prev);

  const columns = useMemo<MRT_ColumnDef<Zone>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableEditing: false,
      },
      {
        accessorKey: "deliveryCharges",
        header: "Delivery Charges",
        enableEditing: false,
      },
      {
        accessorKey: "minOrderValue",
        header: "Min Order Value",
        enableEditing: false,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: zones ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    editDisplayMode: "row",
    enableEditing: false,
    enableSorting: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableRowActions: true,
    initialState: {
      density: "compact",
    },
    renderTopToolbar: () => (
      <Stack direction="row" p={3} gap={3}>
        <Button
          variant="contained"
          onClick={() => {
            setFormType("Create");
            setSelectedZone(() => undefined);
            toogleShowZones();
          }}
        >
          Create New Zone
        </Button>
        <Button variant="contained" onClick={toogleUploadZonesForm}>
          Upload Zones
        </Button>
      </Stack>
    ),
    renderRowActions: (props) => (
      <Stack direction="row">
        <IconButton
          onClick={() => {
            setFormType("Update");
            setSelectedZone(() => props.row.original);
            toogleShowZones();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteZone(props.row.original.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    renderDetailPanel: (props) => {
      return (
        <Stack>
          <Typography variant="h6">Pin Codes </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Codes</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.row.original.pincodes.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.pincode}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6">Products </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Slug</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.row.original.products.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.slug}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      );
    },
  });

  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Zones</Typography>
        <MaterialReactTable table={table} />
        <ZoneForm
          open={showZones}
          onClose={() => {
            setSelectedZone(undefined);
            toogleShowZones();
          }}
          formType={formType}
          onSubmit={(data) => {
            if (formType === "Create") {
              createZone(data);
            } else {
              updateZone({
                id: selectedZone?.id ?? "",
                data: data,
              });
            }
          }}
          initialValues={selectedZone}
        />
        <UploadZonesForm
          open={uploadZonesFormOpen}
          onClose={toogleUploadZonesForm}
          onSubmit={(data) => {
            uploadZonesFromExel(data.file);
          }}
        />
      </Stack>
    </FlowTemplate>
  );
};

export default ZonesPage;
