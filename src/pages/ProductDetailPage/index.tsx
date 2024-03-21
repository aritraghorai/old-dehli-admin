import {
  addProductItemImageById,
  addProductTag,
  createProductItem,
  deleteProductItemImageById,
  deleteProductTag,
  getProductByDetail,
  updateProductItem,
} from "@/axios/api";
import apiPaths from "@/axios/apiPaths";
import FlowTemplate from "@/component/templates/FlowTeamplete";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Product,
  ProductItem,
  ProductItemForm,
  ProductTag,
  UpdateProductItemRequestBody,
} from "@/utils/types";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AddProductTagModal from "@/component/organisms/CreateTagModal";
import useProductTags from "@/hooks/useProductTag";
import CreateNewProductItemModal from "@/component/organisms/CreateProductItemModal";
import { uploadMultipleImages } from "@/utils/function";
import EditIcon from "@mui/icons-material/Edit";
import ProductItemUpdateForm from "@/component/organisms/ProductItemUpdateForm";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageEditorModal from "@/component/organisms/ImageEditorModal";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showProductTag, setShowProductTag] = useState(false);
  const [showCreateProductItemValue, setShowCreateProductItem] =
    useState(false);

  const [imageEditorModalOpen, setImageEditorModalOpen] = useState(false);

  const { productTags } = useProductTags();
  const navigate = useNavigate();
  const {
    data: productDetail,
    error,
    refetch,
  } = useQuery<Product>({
    queryKey: [apiPaths.PRODUCT, id],
    queryFn: () => getProductByDetail(id!),
  });

  const [selelectedProductItem, setSelectedProductItem] =
    useState<ProductItem>();

  const [showProductItemUpdateForm, setShowProductItemUpdateForm] =
    useState(false);

  const { mutate: deleteTag } = useMutation({
    mutationKey: ["deleteProductTag"],
    mutationFn: (productTagId: string) => deleteProductTag(id!, productTagId),
    onSuccess: () => {
      toast.success("Tag deleted");
      refetch();
    },
  });

  const { mutate: addNewTag } = useMutation({
    mutationKey: ["addNewTagProductDetail"],
    mutationFn: (productTagId: string) => addProductTag(id!, productTagId),
    onSuccess: () => {
      toast.success("Tag Added");
      refetch();
    },
  });

  const toogleImageEditorModal = () => {
    setImageEditorModalOpen((prev) => !prev);
  };

  const { mutate: addProductItem } = useMutation({
    mutationKey: ["createProductItem"],
    mutationFn: (data: ProductItemForm) => createProductItem(id!, data),
    onSuccess: () => {
      toast.success("Product Item Added Successfully");
      refetch();
    },
  });

  const { mutate: updateProductItemById } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: (data: UpdateProductItemRequestBody) =>
      updateProductItem(selelectedProductItem?.id as string, data),
    onSuccess: () => {
      toast.success("Product Item Updated Successfully");
      refetch();
    },
  });

  const { mutate: deleteProductItemImage } = useMutation({
    mutationKey: [apiPaths.PRODUCT_ITEM, "deletePorductItemImage"],
    mutationFn: ({ id, images }: { id: string; images: string[] }) =>
      deleteProductItemImageById(id, {
        images,
      }),
    onSuccess: () => {
      toast.success("Image Deleted Successfully");
      refetch();
    },
  });

  const { mutate: addProductItemImage } = useMutation({
    mutationKey: [apiPaths.PRODUCT_ITEM, "addProductItemImage"],
    mutationFn: ({ id, images }: { id: string; images: string[] }) =>
      addProductItemImageById(id, {
        images,
      }),
    onSuccess: () => {
      toast.success("Image Added Successfully");
      refetch();
    },
  });

  const toogleAddProductTagModal = () => {
    setShowProductTag(!showProductTag);
  };

  const toogleProductItemUpdateForm = () => {
    setShowProductItemUpdateForm((val) => !val);
  };

  const toogleCreateProductItemModal = () => {
    setShowCreateProductItem((val) => !val);
  };

  const handleProductTag = (productTag: ProductTag) => {
    deleteTag(productTag.id);
  };

  const productItemColumn = useMemo<MRT_ColumnDef<ProductItem>[]>(
    () => [
      {
        accessorKey: "sku",
        header: "Sku",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "stock",
        header: "Stock",
      },
      {
        accessorKey: "weight",
        header: "Weight(Gram)",
      },
      {
        accessorFn: (row) => new Date(row.createdAt).toLocaleString(),
        header: "Created At",
      },
      {
        header: "Options",
        accessorFn: (row) => (
          <Stack>
            {row.productConfig.length === 0 ? (
              <Chip label="default" color="secondary" size="small" />
            ) : (
              row.productConfig.map((con) => (
                <Chip
                  color="secondary"
                  key={con.id}
                  size="small"
                  label={
                    con.optionValue.option.value + " " + con.optionValue.value
                  }
                />
              ))
            )}
          </Stack>
        ),
      },
    ],
    [],
  );

  const productTagColumn = useMemo<MRT_ColumnDef<ProductTag>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
    ],
    [],
  );

  const productItemTable = useMaterialReactTable({
    data: productDetail?.productItems ?? [],
    columns: productItemColumn,
    enableRowActions: true,
    enableExpandAll: true,
    enableEditing: false,
    initialState: {
      density: "compact",
    },
    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,210,244,0.1)"
            : "rgba(0,0,0,0.1)",
      }),
    }),
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={toogleCreateProductItemModal}>
        Add New Product Item
      </Button>
    ),
    renderRowActions: (props) => (
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() => {
            setSelectedProductItem(props.row.original);
            toogleProductItemUpdateForm();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setSelectedProductItem(props.row.original);
            toogleImageEditorModal();
          }}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </Stack>
    ),
    renderDetailPanel: ({ row }) =>
      row.original ? (
        <Box
          sx={{
            display: "grid",
            margin: "auto",
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
          }}
        >
          {row.original.images.map((img) => (
            <Stack direction="row" gap={2}>
              <img
                key={img.id}
                src={img.url}
                alt="product"
                style={{ width: "100px", height: "100px" }}
              />
            </Stack>
          ))}
        </Box>
      ) : null,
  });

  const productTagTable = useMaterialReactTable({
    data: productDetail?.productTag ?? [],
    columns: productTagColumn,
    enableRowActions: true,
    initialState: {
      density: "compact",
    },
    renderRowActions: (props) => (
      <IconButton onClick={() => handleProductTag(props.row.original)}>
        <DeleteIcon />
      </IconButton>
    ),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={toogleAddProductTagModal}>
        Add New Tag
      </Button>
    ),
  });

  useEffect(() => {
    if (error) {
      toast.error(`${id} not found`);
      navigate("/dashboard");
    }
  }, [error, id, navigate]);

  return (
    <FlowTemplate>
      <Stack p={2} gap={2}>
        <Typography variant="heading2">Name: {productDetail?.name}</Typography>
        <Typography variant="heading2">
          Description: {productDetail?.description}
        </Typography>
        <Typography variant="heading2">Product Items</Typography>
        <MaterialReactTable table={productItemTable} />
        <Typography variant="heading2">Product Tags</Typography>
        <MaterialReactTable table={productTagTable} />
      </Stack>
      <AddProductTagModal
        open={showProductTag}
        onClose={toogleAddProductTagModal}
        tags={
          productTags?.filter(
            (tag) => !productDetail?.productTag?.some((t) => t.id === tag.id),
          ) ?? []
        }
        onSubmit={(tag) => addNewTag(tag.id)}
      />
      <CreateNewProductItemModal
        open={showCreateProductItemValue}
        onClose={toogleCreateProductItemModal}
        onSubmit={async (data) => {
          //check product item already exist
          const images = await uploadMultipleImages(data.images);
          addProductItem({
            ...data,
            images,
          });
        }}
      />
      <ProductItemUpdateForm
        open={showProductItemUpdateForm}
        onClose={toogleProductItemUpdateForm}
        productItem={selelectedProductItem}
        onSubmit={(val) => {
          updateProductItemById(val);
        }}
      />
      <ImageEditorModal
        open={imageEditorModalOpen}
        onClose={toogleImageEditorModal}
        images={selelectedProductItem?.images ?? []}
        submit={async (newImages, deletedImages) => {
          if (deletedImages.length > 0) {
            deleteProductItemImage({
              id: selelectedProductItem?.id as string,
              images: deletedImages,
            });
          }
          if (newImages.length > 0) {
            const images = await uploadMultipleImages(newImages);
            addProductItemImage({
              id: selelectedProductItem?.id as string,
              images,
            });
          }
        }}
      />
    </FlowTemplate>
  );
};

export default ProductDetailPage;
