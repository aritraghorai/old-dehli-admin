export const TOKEN = "token";
export const USER = "user";

export const ROLES = {
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  USER: "user",
} as const;

export enum ORDER_STATUS_ENUM {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export enum PAYMENT_GATEWAY {
  RAZORPAY = "RAZORPAY",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}
export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
