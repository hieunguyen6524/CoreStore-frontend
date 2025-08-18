import type { Brand } from "./brand";
import type { Category } from "./category";

export interface Product {
  _id: string;
  id: string;
  name: string;
  category: Category;
  brand: Brand;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  attributes: Attribute[];
  stock: number;
  thumbnail: string;
  images: string[];
  description: string;
  ratingsAvergage: number;
  ratingsQuantity: number;
  status: string; // hoặc bạn có thể thay bằng union: "active" | "inactive" | "out-of-stock"
  slug: string;
}

interface Attribute {
  key: string;
  value: string;
  _id: string;
  id: string;
}
