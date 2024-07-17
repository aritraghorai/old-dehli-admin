/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
  MRT_TableOptions,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import apiPaths from "@/axios/apiPaths";
import {
  Order,
  UpdateOrderFormSchema,
  UpdateOrderRequestBody,
} from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllOrders, updateOrder } from "@/axios/api";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import { ORDER_STATUS_ENUM, PAYMENT_STATUS } from "@/utils/constant";
import { ZodError } from "zod";

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

export const OrderPage = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<Order[]>({
    queryKey: [apiPaths.ORDER_ALL],
    queryFn: getAllOrders,
  });

  const [shopValidationErrors, setShopValidationErrors] = useState<
    UpdateOrderRequestBody | undefined
  >();

  const { mutate: updateOrderById } = useMutation({
    mutationKey: [apiPaths.CATEGORY, "updateOrder"],
    mutationFn: ({ id, data }: { data: UpdateOrderRequestBody; id: string }) =>
      updateOrder(id, data),
    onSuccess: () => {
      toast.success("Category created successfully");
      refetch();
    },
  });

  const handleSaveOrder: MRT_TableOptions<Order>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    try {
      const parseValues = await UpdateOrderFormSchema.parseAsync(values, {});
      console.log(values);
      updateOrderById({
        id: values.Id,
        data: parseValues,
      });
      setShopValidationErrors(undefined);
      table.setEditingRow(null);
    } catch (error: unknown) {
      const zodError = error as ZodError;

      const errors = zodError.errors.map((err) => {
        const path = err.path.join(".");
        return {
          [path]: err.message,
        };
      });
      toast.error(errors[0][Object.keys(errors[0])[0]] as string);
      setShopValidationErrors(errors as any);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        header: "Id",
        enableEditing: false,
      },
      {
        accessorKey: "user.name",
        header: "User Name",
      },
      {
        accessorKey: "status",
        header: "Status",
        editVariant: "select",
        enableEditing(row) {
          return (
            row.original.status !== ORDER_STATUS_ENUM.DELIVERED &&
            row.original.status !== ORDER_STATUS_ENUM.CANCELLED
          );
        },
        editSelectOptions: [
          ORDER_STATUS_ENUM.PENDING,
          ORDER_STATUS_ENUM.SHIPPED,
          ORDER_STATUS_ENUM.DELIVERED,
          ORDER_STATUS_ENUM.CANCELLED,
          ORDER_STATUS_ENUM.PROCESSING,
        ],
        muiEditTextFieldProps: {
          error: !!shopValidationErrors?.status,
          helperText: shopValidationErrors?.status,
        },
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        editVariant: "select",
        enableEditing: (row) =>
          row.original.paymentStatus === PAYMENT_STATUS.PENDING &&
          row.original.paymentGateway === "CASH_ON_DELIVERY",
        editSelectOptions: [
          {
            label: PAYMENT_STATUS.SUCCESS,
            value: PAYMENT_STATUS.SUCCESS,
          },
          {
            label: PAYMENT_STATUS.FAILED,
            value: PAYMENT_STATUS.FAILED,
          },
          {
            label: PAYMENT_STATUS.PENDING,
            value: PAYMENT_STATUS.PENDING,
          },
        ],
        muiEditTextFieldProps: {
          error: !!shopValidationErrors?.paymentStatus,
          helperText: shopValidationErrors?.paymentStatus,
        },
      },
      {
        accessorKey: "paymentGateway",
        header: "Payment Gateway",
        enableEditing: false,
      },
      {
        accessorKey: "grandTotal",
        header: "Grand Total",
        enableEditing: false,
      },
      {
        accessorFn: (row) => row.razorpayPayment?.paymentId,
        header: "Payment Id",
        enableEditing: false,
      },
    ],
    [shopValidationErrors],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: data ?? [],
    enablePagination: true,
    enableColumnFilters: false,
    editDisplayMode: "row",
    enableEditing: true,
    enableSorting: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    onEditingRowSave: handleSaveOrder,
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    enableRowActions: true,
    renderRowActions: (props) => (
      <Stack direction="row">
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              props.table.setEditingRow(props.row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
    renderDetailPanel: (props) => {
      return (
        <Stack gap={2}>
          <Stack direction="row" gap={2}>
            <Typography variant="h6">
              Order Id: {props.row.original.id}
            </Typography>
            <Typography variant="h6">
              Order Date: {props.row.original.createdAt}
            </Typography>
          </Stack>
          <Card sx={{ width: "fit-content" }}>
            <CardHeader title="User Details" />
            <CardContent>
              <Stack direction="column" gap={2}>
                <Typography variant="h6">
                  User Name: {props.row.original.user.name}
                </Typography>
                <Typography variant="h6">
                  Phone: {props.row.original.user.phoneNumber}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ width: "fit-content" }}>
            <CardHeader title="Shipping Details" />
            <CardContent>
              <Stack direction="column" gap={2}>
                <Typography variant="h6">
                  Address: {props.row.original.orderAddress.address}
                </Typography>
                <Typography variant="h6">
                  City: {props.row.original.orderAddress.city}
                </Typography>
                <Typography variant="h6">
                  State: {props.row.original.orderAddress.state}
                </Typography>
                <Typography variant="h6">
                  Pin Code: {props.row.original.orderAddress.pincode.pincode}
                </Typography>
                <Typography variant="h6">
                  Time Slot:
                  {props.row.original.orderAddress.startTime}
                  {"-"}
                  {props.row.original.orderAddress.endTime}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          <Typography variant="h6">Order Items</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product Id</StyledTableCell>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell align="right">Slug</StyledTableCell>
                  <StyledTableCell align="right">Sku</StyledTableCell>
                  <StyledTableCell align="right">Count</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Images</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.row.original.orderItems.map((row) => (
                  <StyledTableRow key={row.productItem.product.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.productItem.product.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.productItem.product.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.productItem.product.slug}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.productItem.sku}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Stack direction="row" gap={2}>
                        {row.productItem.images.map((image) => (
                          <img
                            src={image.url}
                            alt={image.id}
                            width="100"
                            height="100"
                          />
                        ))}
                      </Stack>
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
        <Typography variant="h4">Orders</Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </FlowTemplate>
  );
};

export default OrderPage;
