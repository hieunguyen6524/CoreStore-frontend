import type { Product } from "./product";

export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "failed";
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}

