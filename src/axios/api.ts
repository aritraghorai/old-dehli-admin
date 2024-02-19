import {
  Category,
  LoginFormBody,
  ProductForm,
  ProductItemForm,
  ProductTag,
  Shop,
  User,
} from "@/utils/types";
import apiClient from "./apiClient";
import apiPaths from "./apiPaths";

export const getAllCategories = async () => {
  const response = await apiClient.get(apiPaths.CATEGORY);
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
  data: ProductItemForm,
) => {
  const response = await apiClient.post(apiPaths.PRODUCT_ITEM(productId), data);
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
