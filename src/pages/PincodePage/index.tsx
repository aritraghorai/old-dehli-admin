/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import {
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
import { Pincode } from "@/utils/types";
import usePinCode from "@/hooks/usePinCode";

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

export const PinCodePage = () => {
  const { pinCodes, isLoading, isRefetching } = usePinCode();

  const columns = useMemo<MRT_ColumnDef<Pincode>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
      },
      {
        accessorKey: "pincode",
        header: "Pin Code",
        enableEditing: false,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: pinCodes ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    editDisplayMode: "row",
    enableEditing: false,
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
    renderDetailPanel: (props) => {
      return (
        <Stack>
          <Typography variant="h6">Post Offices </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Block</StyledTableCell>
                  <StyledTableCell align="right">State</StyledTableCell>
                  <StyledTableCell align="right">District</StyledTableCell>
                  <StyledTableCell align="right">Division</StyledTableCell>
                  <StyledTableCell align="right">Circle</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.row.original.postOffices.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.block}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.state}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.district}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.division}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.circle}
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
        <Typography variant="h4">Pin Codes</Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </FlowTemplate>
  );
};

export default PinCodePage;
