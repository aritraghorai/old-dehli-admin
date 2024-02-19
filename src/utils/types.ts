import { z } from "zod";

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
  role: Array<string>;
};

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
};

export type Shop = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: Array<Image>;
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
    .positive()
    .transform((val) => +val),
  price: z.coerce
    .number()
    .positive()
    .transform((val) => +val),
  images: z.array(z.string().uuid()).optional(),
  optionValues: z.array(z.string().uuid()).optional(),
});
export type ProductItemForm = z.infer<typeof ProductItemSchema>;
