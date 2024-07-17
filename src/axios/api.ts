import {
  Category,
  CategoryForm,
  CreateCategoryRequestBody,
  Image,
  LoginFormBody,
  NewBannerFormRequestBody,
  NewProductTagForm,
  Pincode,
  ProductForm,
  ProductItemRequestBody,
  ProductOptionForm,
  ProductTag,
  ProductTypeRequestBody,
  Shop,
  ShopRequestBody,
  StatusRequestBody,
  TimeSlotRequestForm,
  UpdateCategoryRequestBody,
  UpdateOrderRequestBody,
  UpdateProductItemRequestBody,
  UpdateProductRequestBody,
  UpdateProductTypeBody,
  UpdateShopType,
  User,
  ZoneForm,
} from "@/utils/types";
import apiClient from "./apiClient";
import apiPaths from "./apiPaths";

export const getAllCategories = async () => {
  const response = await apiClient.get(apiPaths.CATEGORY);
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

export const createCategory = async (data: CreateCategoryRequestBody) => {
  const response = await apiClient.post(apiPaths.CATEGORY, data);
  return response.data.data;
};
export const updateCategory = async (
  id: string,
  data: UpdateCategoryRequestBody,
) => {
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

export const deleteProductItemImageById = async (
  id: string,
  data: { images: string[] },
) => {
  const response = await apiClient.delete(
    apiPaths.PRODUCT_ITEM_BY_ID_IMAGE(id),
    {
      data: data,
    },
  );
  return response.data.data;
};

export const addProductItemImageById = async (
  id: string,
  data: { images: string[] },
) => {
  const response = await apiClient.post(
    apiPaths.PRODUCT_ITEM_BY_ID_IMAGE(id),
    data,
  );
  return response.data.data;
};

export const getAllOrders = async () => {
  const response = await apiClient.get(apiPaths.ORDER_ALL);
  return response.data.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get(apiPaths.USER);
  return response.data.data as User[];
};

export const updateOrder = async (id: string, data: UpdateOrderRequestBody) => {
  const response = await apiClient.patch(apiPaths.ORDER_BY_ID(id), data);
  return response.data.data;
};

export const getAllPinCodes = async () => {
  const response = await apiClient.get(apiPaths.PIN_CODE);
  return response.data.data as Pincode[];
};
export const getAllZones = async () => {
  const response = await apiClient.get(apiPaths.ZONE);
  return response.data.data;
};
export const getPinCode = async (pinCode: string) => {
  const response = await apiClient.get(apiPaths.GET_PIN_CODE(pinCode));
  return response.data.data;
};

export const getAllProducts = async () => {
  const response = await apiClient.get(apiPaths.PRODUCT_ALL);
  return response.data.data;
};

export const createNewZone = async (data: ZoneForm) => {
  const response = await apiClient.post(apiPaths.ZONE, data);
  return response.data.data;
};

export const updateZoneById = async (id: string, data: ZoneForm) => {
  const response = await apiClient.put(apiPaths.ZONE_BY_ID(id), data);
  return response.data.data;
};

export const getAllProductTypes = async () => {
  const response = await apiClient.get(apiPaths.PRODUCT_TYPE);
  return response.data.data;
};
export const createProductType = async (data: ProductTypeRequestBody) => {
  const response = await apiClient.post(apiPaths.PRODUCT_TYPE, data);
  return response.data.data;
};

export const updateProductTypeById = async (
  id: string,
  data: UpdateProductTypeBody,
) => {
  const response = await apiClient.patch(apiPaths.PRODUCT_TYPE_BY_ID(id), data);
  return response.data.data;
};

export const getAllTimeShots = async () => {
  const response = await apiClient.get(apiPaths.TIME_SHOTS);
  return response.data.data;
};

export const createTimeSlot = async (data: TimeSlotRequestForm) => {
  const response = await apiClient.post(apiPaths.TIME_SHOTS, data);
  return response.data.data;
};

export const updateTimeSlotById = async (
  id: string,
  data: TimeSlotRequestForm,
) => {
  const response = await apiClient.patch(apiPaths.TIME_SHOT_BY_ID(id), data);
  return response.data.data;
};

export const getAllStatus = async () => {
  const response = await apiClient.get(apiPaths.STATUS);
  return response.data.data;
};

export const createNewStatus = async (data: StatusRequestBody) => {
  const response = await apiClient.post(apiPaths.STATUS, data);
  return response.data.data;
};

export const updateStatusById = async (id: string, data: StatusRequestBody) => {
  const response = await apiClient.patch(apiPaths.STATUS_BY_ID(id), data);
  return response.data.data;
};

export const deleteStatusById = async (id: string) => {
  const response = await apiClient.delete(apiPaths.STATUS_BY_ID(id));
  return response.data.data;
};

export const getAllPromotion = async () => {
  const response = await apiClient.get(apiPaths.PROMOTION);
  return response.data.data;
};

export const createNewPromotion = async (data: NewBannerFormRequestBody) => {
  const response = await apiClient.post(apiPaths.PROMOTION, data);
  return response.data.data;
};

export const deletePromotionById = async (id: string) => {
  const response = await apiClient.delete(apiPaths.PROMOTION_BY_ID(id));
  return response.data;
};

export const uploadLoadVideo = async (file: File) => {
  const formData = new FormData();
  formData.append("video", file);
  const response = await apiClient.post(apiPaths.UPLOAD_VIDEO, formData);
  return response.data.data as Image;
};

export const uploadMultipleZonesFromExel = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post(
    apiPaths.UPLOAD_MULTIPLE_ZONES,
    formData,
  );
  return response.data;
};

export const deleteZoneById = async (id: string) => {
  const response = await apiClient.delete(apiPaths.ZONE_BY_ID(id));
  return response.data;
};
