import {
  Category,
  CategoryForm,
  Image,
  LoginFormBody,
  NewProductTagForm,
  ProductForm,
  ProductItemRequestBody,
  ProductOptionForm,
  ProductTag,
  Shop,
  ShopRequestBody,
  UpdateProductItemRequestBody,
  UpdateProductRequestBody,
  UpdateShopType,
  User,
} from "@/utils/types";
import apiClient from "./apiClient";
import apiPaths from "./apiPaths";

export const getAllCategories = async () => {
  const response = await apiClient.get(apiPaths.CATEGORY_ALL);
  return response.data.data as Category[];
};
export const getAllCategoriesAll = async () => {
  const response = await apiClient.get(apiPaths.CATEGORY_ALL);
  return response.data.data as Category[];
};

export const getAllShops = async () => {
  const response = await apiClient.get(apiPaths.ALL_SHOPS);
  return response.data.data as Shop[];
};
export const getAllProductTag = async () => {
  const response = await apiClient.get(apiPaths.PRODUCT_TAG);
  return response.data.data as ProductTag[];
};

export const createProduct = async (data: ProductForm) => {
  const response = await apiClient.post(apiPaths.PRODUCT, data);
  return response.data;
};

export const createProductItem = async (
  productId: string,
  data: ProductItemRequestBody,
) => {
  const response = await apiClient.post(apiPaths.PRODUCT_ITEM(productId), data);
  return response.data.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post(apiPaths.UPLOAD_IMAGE, formData);
  return response.data.data as Image;
};

export const createCategory = async (data: CategoryForm) => {
  const response = await apiClient.post(apiPaths.CATEGORY, data);
  return response.data.data;
};
export const updateCategory = async (id: string, data: CategoryForm) => {
  const response = await apiClient.patch(apiPaths.CATEGORY_BY_ID(id), data);
  return response.data.data;
};

export const createShop = async (data: ShopRequestBody) => {
  const response = await apiClient.post(apiPaths.SHOP, data);
  return response.data.data;
};

export const getProductByDetail = async (id: string) => {
  const response = await apiClient.get(apiPaths.PRODUCT_BY_ID(id));
  return response.data.data;
};
export const deleteProductTag = async (
  productId: string,
  productTagId: string,
) => {
  const response = await apiClient.delete(
    apiPaths.PRODUCT_TAG_ID_AND_PRODUCT_ID(productId, productTagId),
  );
  return response.data;
};

export const addProductTag = async (
  productId: string,
  productTagId: string,
) => {
  const response = await apiClient.post(
    apiPaths.PRODUCT_TAG_ID_AND_PRODUCT_ID(productId, productTagId),
  );
  return response.data;
};

export const getAllProductOption = async () => {
  const response = await apiClient.get(apiPaths.PRODUCT_OPTION);
  return response.data.data;
};

export const createProductOption = async (data: ProductOptionForm) => {
  const response = await apiClient.post(apiPaths.PRODUCT_OPTION, data);
  return response.data.data;
};

export const UpdateShop = async (id: string, data: Partial<UpdateShopType>) => {
  const response = await apiClient.put(apiPaths.SHOP_BY_ID(id), data);
  return response.data.data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProductRequestBody,
) => {
  const response = await apiClient.patch(apiPaths.PRODUCT_BY_ID(id), data);
  return response.data.data;
};

export const createNewProductTag = async (data: NewProductTagForm) => {
  const response = await apiClient.post(apiPaths.PRODUCT_TAG, data);
  return response.data;
};

export const createProductOptionValue = async (
  id: string,
  data: ProductOptionForm,
) => {
  const response = await apiClient.post(
    apiPaths.PRODUCT_OPTION_BY_VALUE(id),
    data,
  );
  return response.data.data;
};

export const Login = async (data: LoginFormBody) => {
  const response = await apiClient.post(apiPaths.LOIGN, data);
  return response.data;
};
export const ME = async () => {
  const response = await apiClient.get(apiPaths.ME);
  return {
    user: response.data.data.user as User,
    token: response.data.token as string,
  };
};

export const updateProductItem = async (
  productItemId: string,
  data: UpdateProductItemRequestBody,
) => {
  const response = await apiClient.patch(
    apiPaths.PRODUCT_ITEM_BY_ID(productItemId),
    data,
  );
  return response.data.data;
};

export const deleteShopImageById = async (
  shopId: string,
  data: { images: string[] },
) => {
  const response = await apiClient.delete(apiPaths.SHOP_IMAGE_BY_ID(shopId), {
    data: data,
  });
  return response.data.data;
};

export const addShopImage = async (
  shopId: string,
  data: { images: string[] },
) => {
  const response = await apiClient.post(
    apiPaths.SHOP_IMAGE_BY_ID(shopId),
    data,
  );
  return response.data.data;
};
