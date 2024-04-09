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

const SHOP_BY_ID = (id: string) => `shop/${id}`;
const PRODUCT_ALL = "product/all";
const CATEGORY_BY_ID = (id: string) => `category/${id}`;
const PRODUCT_ITEM_BY_ID = (id: string) => `product/item/${id}`;
const SHOP_IMAGE_BY_ID = (shopId: string) => `shop/${shopId}/image`;
const PRODUCT_ITEM_BY_ID_IMAGE = (id: string) => `product/item/${id}/image`;
const ORDER_ALL = "order/all";
const USER = "user";
const ORDER_BY_ID = (id: string) => `order/${id}`;
const PIN_CODE = "pin-code";
const GET_PIN_CODE = (pinCode: string) => `pin-code/${pinCode}`;
const ZONE = "zones";
const ZONE_BY_ID = (id: string) => `zones/${id}`;
const PRODUCT_TYPE = "product-type";
const PRODUCT_TYPE_BY_ID = (id: string) => `${PRODUCT_TYPE}/${id}`;
const TIME_SLOTS = "timeslot";
const TIME_SLOT_BY_ID = (id: string) => `${TIME_SLOTS}/${id}`;
const STATUS = "/status"
const STATUS_BY_ID = (id: string) => `${STATUS}/${id}`

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
  SHOP_BY_ID,
  PRODUCT_ALL,
  CATEGORY_BY_ID,
  PRODUCT_ITEM_BY_ID,
  SHOP_IMAGE_BY_ID,
  PRODUCT_ITEM_BY_ID_IMAGE,
  ORDER_ALL,
  USER,
  ORDER_BY_ID,
  PIN_CODE,
  ZONE,
  GET_PIN_CODE,
  ZONE_BY_ID,
  PRODUCT_TYPE,
  PRODUCT_TYPE_BY_ID,
  TIME_SHOTS: TIME_SLOTS,
  TIME_SHOT_BY_ID: TIME_SLOT_BY_ID,
  STATUS,
  STATUS_BY_ID
};
