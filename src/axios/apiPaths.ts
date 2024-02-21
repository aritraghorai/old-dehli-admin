const PRODUCT = "product";
const CATEGORY = "category";
const LOIGN = "auth/login";
const ME = "auth/me";
const ALL_SHOPS = "shop/all";
const SHOP = "shop";
const PRODUCT_TAG = "product-tag";
const PRODUCT_BY_ID = (id: string) => `product/${id}`;
const PRODUCT_TAG_BY_PRODUCT_ID = (productId: string) => `product/${productId}`;
const PRODUCT_TAG_ID_AND_PRODUCT_ID = (
  productId: string,
  productTagId: string,
) => `product/${productId}/tag/${productTagId}`;
const PRODUCT_OPTION = "product-option";
const PRODUCT_ITEM = (productId: string) => `${PRODUCT}/${productId}/item`;
const CATEGORY_ALL = "category/all";
const UPLOAD_IMAGE = "upload/image";

const PRODUCT_OPTION_BY_VALUE = (id: string) => `${PRODUCT_OPTION}/${id}/value`;

export default {
  PRODUCT,
  CATEGORY,
  LOIGN,
  ME,
  ALL_SHOPS,
  SHOP,
  PRODUCT_TAG,
  PRODUCT_BY_ID,
  PRODUCT_TAG_BY_PRODUCT_ID,
  PRODUCT_TAG_ID_AND_PRODUCT_ID,
  PRODUCT_OPTION,
  PRODUCT_ITEM,
  CATEGORY_ALL,
  UPLOAD_IMAGE,
  PRODUCT_OPTION_BY_VALUE,
};
