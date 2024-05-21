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
  weight: number;
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
  type: ProductType;
  allowZones: Array<Zone>;
  timeSlot?: TimeSlot;
  category: Category;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  minOrderQuantity: number;
  priority: number;
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
  email: string;
  password: string;
};

export const productFormSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  productTags: z.array(z.string().uuid()).optional(),
  categoryId: z.string().uuid(),
  shopId: z.string().uuid(),
  price: z.coerce.number().positive(),
  productType: z.string().uuid(),
  timeSlot: z.string().uuid(),
  minOrderQuantity: z.coerce.number().positive(),
  allowZones: z.array(z.string().uuid()).optional(),
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
  weight: z.coerce.number().positive("Weight must be a positive number"),
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
  categoryId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
  productType: z.string().uuid().optional(),
  timeSlot: z.string().uuid().optional(),
  minOrderQuantity: z.coerce.number().positive().optional(),
  shopId: z.string().uuid().optional(),
  priority: z.number().optional(),
  allowZones: z.array(z.string().uuid()).optional(),
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
  weight: z.coerce.number().positive(),
});

export type UpdateProductItemRequestBody = z.infer<
  typeof UpdateProductItemRequestBodySchema
>;

export type UserAddress = {
  id: string;
  name: string;
  mobile: string;
  alternatePhone: string;
  pincode: Pincode;
  startTime: string;
  endTime: string;
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
  razorpayPayment?: {
    id: string;
    orderId: string;
    paymentId: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  user: User;
  billingAddress: UserAddress;
  orderAddress: UserAddress;
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

export type Pincode = {
  id: string;
  pincode: string;
  postOffices: PostOffice[];
  createdAt: string;
  updatedAt: string;
};

export type PostOffice = {
  id: string;
  name: string;
  circle: string;
  district: string;
  division: string;
  region: string;
  block: string;
  state: string;
  createdAt: string;
  updatedAt: string;
};

export const ZoneFormSchema = z.object({
  name: z.string().min(3).max(50),
  deliveryCharges: z.coerce.number().min(0),
  pincodes: z.array(z.string().uuid()).optional(),
  products: z.array(z.string().uuid()).optional(),
});

export type ZoneForm = z.infer<typeof ZoneFormSchema>;

export type Zone = {
  id: string;
  name: string;
  deliveryCharges: number;
  pincodes: Array<Pincode>;
  products: Array<Product>;
  createdAt: string;
  updatedAt: string;
};

export const ProductTypeFormSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255).optional(),
  image: z.any().refine((file) => {
    if (file instanceof File) {
      return file.size < 5 * 1024 * 1024;
    }
    return false;
  }, "File size is over 5MB"),
});

export const UpdateProductTypeBodySchema = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  image: z.string().uuid().optional(),
});

export type UpdateProductTypeBody = z.infer<typeof UpdateProductTypeBodySchema>;

export type ProductTypeForm = z.infer<typeof ProductTypeFormSchema>;

export type ProductTypeRequestBody = Omit<ProductTypeForm, "image"> & {
  image: string;
};
export type ProductType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: Image;
  createdAt: string;
  updatedAt: string;
};
export const TimeSlotRequestFormSchema = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});

export type TimeSlotRequestForm = z.infer<typeof TimeSlotRequestFormSchema>;

export type TimeSlot = {
  id: string;
  slot: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export const statusFormSchema = z.object({
  name: z.string(),
  video: z.any(),
  description: z.string(),
});


export type StatusFormRequest = z.infer<typeof statusFormSchema>;

export type StatusRequestBody = Omit<StatusFormRequest, "video"> & {
  video_url: string;
};


export type Status = {
  id: string;
  name: string;
  video_url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const NewBannerFormSchema = z.object({
  image: z.any(),
  name: z.string(),
  category: z.string().uuid(),
  position: z.coerce.number().positive(),
});

export type NewBannerFormType = z.infer<typeof NewBannerFormSchema>;

export type NewBannerFormRequestBody = Omit<NewBannerFormType, "image"> & {
  image: string;
};

export type Banner = {
  id: string;
  name: string;
  category: Category;
  image: Image
  position: number;
}
