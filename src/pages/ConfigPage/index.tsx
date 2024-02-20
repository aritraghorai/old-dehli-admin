import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Stack, Typography } from "@mui/material";
import { Option } from "@/utils/types";
import useOptions from "@/hooks/useOptions";

export const ProductOptionPage = () => {
  const { productOption, isLoading, isRefetching } = useOptions();

  const columns = useMemo<MRT_ColumnDef<Option>[]>(
    () => [
      {
        accessorKey: "value",
        header: "Name",
      },
      {
        accessorFn: (row) =>
          row.Options.map((option) => option.value).join(", "),
        header: "options",
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: productOption ?? [],
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
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Product Options</Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </FlowTemplate>
  );
};

export default ProductOptionPage;
