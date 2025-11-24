import toast from "react-hot-toast";
import axiosClient from "../utils/axiosClient";
import type { Product } from "../types/product";

export interface ProductQueryParams {
  keyword?: string;
  brand?: string;
  category?: string;
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
}

const buildProductQuery = (params: ProductQueryParams = {}) => {
  const query = new URLSearchParams();

  if (params.keyword) query.set("keyword", params.keyword);
  if (params.brand) query.set("brand", params.brand);
  if (params.category) query.set("category", params.category);
  if (params.sort) query.set("sort", params.sort);
  if (params.fields) query.set("fields", params.fields);
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (typeof params.minPrice === "number") {
    query.set("price[gte]", params.minPrice.toString());
  }
  if (typeof params.maxPrice === "number") {
    query.set("price[lte]", params.maxPrice.toString());
  }
  if (typeof params.minDiscount === "number") {
    query.set("discount[gte]", params.minDiscount.toString());
  }
  if (typeof params.maxDiscount === "number") {
    query.set("discount[lte]", params.maxDiscount.toString());
  }

  return query.toString();
};

const normalizeProduct = (product: Product): Product => {
  const normalizedId =
    (product._id as unknown as { toString: () => string })?.toString?.() ??
    product._id ??
    product.id;

  return {
    ...product,
    _id: normalizedId,
    id: product.id ?? normalizedId,
  };
};

export const getHomeProducts = async () => {
  try {
    const res = await axiosClient.get("/view");
    return res.data.data;
  } catch (error) {
    console.error("Erro get home product:", error);
    return null;
  }
};

export const getAllProducts = async (params?: ProductQueryParams) => {
  try {
    const query = buildProductQuery(params);
    const url = query ? `/api/products?${query}` : "/api/products";
    const res = await axiosClient.get(url);
    const products: Product[] = res.data?.data?.data ?? [];
    return products.map(normalizeProduct);
  } catch (error) {
    toast.error("Không thể tải danh sách sản phẩm");
    console.error("Error get products:", error);
    return [];
  }
};

export const getProductByCategory = async (
  slug: string,
  params?: ProductQueryParams
) => {
  try {
    const query = buildProductQuery(params);
    const url = query
      ? `/api/products/category/${slug}?${query}`
      : `/api/products/category/${slug}`;
    const res = await axiosClient.get(url);
    const products: Product[] = res.data?.data?.data ?? [];
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Error get product by category:", error);
    return [];
  }
};

export const searchProduct = async (keyword: string = "") => {
  return getAllProducts({ keyword });
};

export const getDetailProduct = async (slug: string) => {
  try {
    const res = await axiosClient.get(`/view/${slug}`);
    return res.data.data.product;
  } catch (error) {
    console.error("Erro get product by slug:", error);
    return null;
  }
};
