import { z } from "zod";
import { ORDER_STATUS_ENUM, PAYMENT_GATEWAY, PAYMENT_STATUS } from "./constant";
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
export type User = {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  password: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role: Array<Role>;
};

interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

export type TypographyVarient =
  | "heading1"
  | "heading2"
  | "heading3"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption1"
  | "caption2"
  | "overline1"
  | "overline2"
  | "tableheader";

export type Image = {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};
export type ProductTag = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  image: Image;
  subCategories: Array<Category>;
  parent?: Category;
};

export type Shop = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: Array<Image>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
export type ProductConfig = {
  id: string;
  optionValue: OptionValue;
};

export type ProductItem = {
  id: string;
  sku: string;
  stock: string;
  price: number;
  productConfig: Array<ProductConfig>;
  images: Array<Image>;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  status: string;
  description: string;
  shop: Shop;
  price: number;
  productTag: Array<ProductTag>;
  productItems: Array<ProductItem>;
  category: Category;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type Option = {
  id: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  Options: Array<OptionValue>;
};
export type OptionValue = {
  id: string;
  value: string;
  option: Option;
  createdAt: string;
  updatedAt: string;
};

export type LoginFormBody = {
  phoneNumber: string;
  password: string;
};

export const productFormSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  productTags: z.array(z.string().uuid()).optional(),
  categoryId: z.string().uuid(),
  shopId: z.string().uuid(),
  price: z.coerce.number().positive(),
});
export type ProductForm = z.infer<typeof productFormSchema>;

export const ProductItemSchema = z.object({
  sku: z.string().min(3).max(20),
  stock: z.coerce
    .number()
    .positive("Stock must be a positive number")
    .transform((val) => +val),
  price: z.coerce
    .number()
    .positive("Price Must Be Positive Number")
    .transform((val) => +val),
  images: z.array(z.any()).min(1, "Minimum 1 Image").max(5, "Maximun 5 Image"),
  optionValues: z.array(z.string().uuid()).optional(),
});
export type ProductItemForm = z.infer<typeof ProductItemSchema>;

export interface ProductItemRequestBody
  extends Omit<ProductItemForm, "images"> {
  images: Array<string>;
}

export const categorySchema = z.object({
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  parentCategoryId: z.string().uuid().optional(),
  description: z.string().min(3).max(255).optional(),
});

export type CategoryForm = z.infer<typeof categorySchema>;

export const ShopFormScham = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name Should minimum 3 character",
    })
    .max(255),
  description: z
    .string()
    .min(3, {
      message: "description should minimum 3 character",
    })
    .max(255),
  images: z
    .array(z.any(), {
      required_error: "Minimum 1 Image",
    })
    .min(1, {
      message: "Minimum 1 Image",
    })
    .max(5, {
      message: "Maximum 5 Image",
    }),
});

export const NewProductTagFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name Should minimum 3 character",
    })
    .max(255),
  description: z
    .string()
    .min(3, {
      message: "description should minimum 3 character",
    })
    .max(255),
});

export type NewProductTagForm = z.infer<typeof NewProductTagFormSchema>;

export type ShopForm = z.infer<typeof ShopFormScham>;

export interface ShopRequestBody extends Omit<ShopForm, "images"> {
  images: Array<string>;
}

export interface ProductOptionForm {
  value: string;
}
export const updateShopValidatorSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name Should minimum 3 character",
    })
    .max(255)
    .optional(),
  description: z
    .string()
    .min(3, {
      message: "description should minimum 3 character",
    })
    .max(255)
    .optional(),
});

export type UpdateShopRequestBody = z.infer<typeof updateShopValidatorSchema>;

export interface UpdateShopType extends UpdateShopRequestBody {
  isActive: boolean;
}
export const UpdateProductRequestBodySchema = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  slug: z.string().min(3).max(255).optional(),
  price: z.number().positive().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateProductRequestBody = z.infer<
  typeof UpdateProductRequestBodySchema
>;
export type FormType = "Create" | "Update";

export const UpdateProductItemRequestBodySchema = z.object({
  sku: z.string().min(3).max(20),
  stock: z.coerce
    .number()
    .positive()
    .transform((val) => +val),
  price: z.coerce
    .number()
    .positive()
    .transform((val) => +val),
  optionValues: z.array(z.string().uuid()).optional(),
});

export type UpdateProductItemRequestBody = z.infer<
  typeof UpdateProductItemRequestBodySchema
>;

export type UserAddress = {
  id: string;
  name: string;
  mobile: string;
  alternatePhone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  landmark: string;
  state: string;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  discount: number;
  grandTotal: number;
  orderItems: Array<{
    id: string;
    productItem: ProductItem;
    quantity: number;
    price: number;
  }>;
  status: keyof typeof ORDER_STATUS_ENUM;
  paymentId?: string;
  paymentGateway: keyof typeof PAYMENT_GATEWAY;
  paymentStatus: keyof typeof PAYMENT_STATUS;
  createdAt: string;
  updatedAt: string;
};

export const UpdateOrderFormSchema = z.object({
  status: z
    .enum(
      [
        ORDER_STATUS_ENUM.SHIPPED,
        ORDER_STATUS_ENUM.DELIVERED,
        ORDER_STATUS_ENUM.CANCELLED,
        ORDER_STATUS_ENUM.PROCESSING,
      ],
      {
        errorMap: () => ({
          message:
            "Status must be one of these: Shipped, Delivered, Cancelled, Processing",
        }),
      },
    )
    .optional(),
  paymentStatus: z
    .enum([PAYMENT_STATUS.SUCCESS, PAYMENT_STATUS.PENDING], {
      errorMap: () => ({
        message: "Payment Status must be one of these: Success, Pending",
      }),
    })
    .optional(),
});

export type UpdateOrderRequestBody = z.infer<typeof UpdateOrderFormSchema>;
