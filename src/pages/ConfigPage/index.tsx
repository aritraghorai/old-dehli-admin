import { useMemo, useState } from "react";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { IconButton, Stack, Typography } from "@mui/material";
import { Option } from "@/utils/types";
import useOptions from "@/hooks/useOptions";
import CrateProductOptionModal from "@/component/organisms/CreateProductOption";
import Button from "@/component/atoms/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CrateProductOptionValueModal from "@/component/organisms/CreateProductOptionValueModal";

export const ProductOptionPage = () => {
  const {
    productOption,
    isLoading,
    isRefetching,
    addNewOption,
    addNewOptionValue,
  } = useOptions();

  const [showCreateProductOption, setShowProductOptionModel] = useState(false);

  const [currentOption, setCurrentOption] = useState<Option | null>(null);

  const [
    showCreateProductOptionValueModal,
    setShowProductOptionModelValueModal,
  ] = useState(false);

  const toogleShowCreateProductOptionModal = () => {
    setShowProductOptionModel((pre) => !pre);
  };

  const toogleShowCreateProductOptionValueModal = () => {
    setShowProductOptionModelValueModal((pre) => !pre);
  };

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
    enableRowActions: true,
    initialState: {
      density: "compact",
    },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={toogleShowCreateProductOptionModal}>
        Create New Option
      </Button>
    ),
    renderRowActions: (props) => (
      <IconButton
        onClick={() => {
          setCurrentOption(props.row.original);
          toogleShowCreateProductOptionValueModal();
        }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    ),
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="h4">Product Options</Typography>
        <MaterialReactTable table={table} />
      </Stack>
      <CrateProductOptionModal
        open={showCreateProductOption}
        onClose={toogleShowCreateProductOptionModal}
        onSubmit={(val) => {
          addNewOption({
            value: val,
          });
        }}
      />
      <CrateProductOptionValueModal
        open={showCreateProductOptionValueModal}
        option={currentOption}
        onClose={toogleShowCreateProductOptionValueModal}
        onSubmit={(val) => {
          console.log(val)
          addNewOptionValue({
            id: currentOption?.id as string,
            body: {
              value: val,
            },
          });
        }}
      />
    </FlowTemplate>
  );
};

export default ProductOptionPage;
