import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { Chip, IconButton, Stack, Typography } from "@mui/material";
import apiPaths from "@/axios/apiPaths";
import { User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/axios/api";
import EditIcon from "@mui/icons-material/Edit";

export const UsersPage = () => {

  const { data, isLoading, isRefetching } = useQuery<User[]>({
    queryKey: [apiPaths.USER],
    queryFn: getAllUsers,
  });



  // const { mutate: updateCateoryById } = useMutation({
  //   mutationKey: [apiPaths.CATEGORY, "updateCategory"],
  //   mutationFn: (data: CategoryForm) =>
  //     updateCategory(slectedCategory?.id as string, data),
  //   onSuccess: () => {
  //     toast.success("Category created successfully");
  //     refetch();
  //   },
  // });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "isVerified",
        header: "Is Verified",
      },
      {
        accessorFn: (row) =>
          row.role.map((r) => <Chip label={r.name} key={r.id} />),
        header: "Role",
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
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    enableRowActions: true,
    renderRowActions: () => (
      <Stack direction="row">
        <IconButton
          onClick={() => {
          }}
        >
          <EditIcon />
        </IconButton>
      </Stack>
    ),
  });

  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Users</Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </FlowTemplate>
  );
};

export default UsersPage;
