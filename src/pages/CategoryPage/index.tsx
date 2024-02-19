import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Stack, Typography } from "@mui/material";
import apiPaths from "@/axios/apiPaths";
import { Category } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/axios/api";

export const CategoryPage = () => {
  const { data, isLoading, isRefetching } = useQuery<Category[]>({
    queryKey: [apiPaths.CATEGORY],
    queryFn: getAllCategories,
  });

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
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
    data: data ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowSelection: true,
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
        <Typography variant="h4">Category</Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </FlowTemplate>
  );
};

export default CategoryPage;
