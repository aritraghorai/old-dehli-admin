import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Stack, Typography } from "@mui/material";
import { ProductTag } from "@/utils/types";
import useProductTags from "@/hooks/useProductTag";

export const ProductTagPage = () => {
  const { productTags, isLoading, isRefetching } = useProductTags();

  const columns = useMemo<MRT_ColumnDef<ProductTag>[]>(
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
    data: productTags ?? [],
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
        <Typography variant="h4">Product Tag</Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </FlowTemplate>
  );
};

export default ProductTagPage;
