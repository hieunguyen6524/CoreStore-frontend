/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
import axiosClient from "../utils/axiosClient";

// Products
export const adminGetAllProducts = async (params?: {
  page?: number;
  limit?: number;
  keyword?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.keyword) queryParams.append("keyword", params.keyword);

    const res = await axiosClient.get(
      `/api/products?${queryParams.toString()}`,
      { withCredentials: true }
    );
    return res.data.data.data || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách sản phẩm"
      );
    }
    return [];
  }
};

export const adminCreateProduct = async (data: FormData | any) => {
  try {
    const isFormData = data instanceof FormData;
    const res = await axiosClient.post("/api/products", data, {
      withCredentials: true,
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {},
    });
    if (res.data.status === "success") {
      toast.success("Tạo sản phẩm thành công!");
      return res.data.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Tạo sản phẩm thất bại");
    }
    return null;
  }
};

export const adminUpdateProduct = async (id: string, data: any) => {
  try {
    const res = await axiosClient.patch(`/api/products/${id}`, data, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Cập nhật sản phẩm thành công!");
      return res.data.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Cập nhật sản phẩm thất bại"
      );
    }
    return null;
  }
};

export const adminDeleteProduct = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/api/products/${id}`, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Xóa sản phẩm thành công!");
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Xóa sản phẩm thất bại");
    }
    return false;
  }
};

// Users
export const adminGetAllUsers = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const res = await axiosClient.get(`/api/users?${queryParams.toString()}`, {
      withCredentials: true,
    });
    return res.data.data.data || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách người dùng"
      );
    }
    return [];
  }
};

export const adminUpdateUser = async (id: string, data: any) => {
  try {
    const res = await axiosClient.patch(`/api/users/${id}`, data, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Cập nhật người dùng thành công!");
      return res.data.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Cập nhật người dùng thất bại"
      );
    }
    return null;
  }
};

export const adminDeleteUser = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/api/users/${id}`, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Xóa người dùng thành công!");
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Xóa người dùng thất bại");
    }
    return false;
  }
};

// Orders
export const adminGetAllOrders = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    const res = await axiosClient.get(`/api/order?${queryParams.toString()}`, {
      withCredentials: true,
    });
    return res.data.data.orders || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách đơn hàng"
      );
    }
    return [];
  }
};

export const adminCancelOrder = async (id: string) => {
  try {
    const res = await axiosClient.patch(
      `/api/order/${id}/cancel`,
      {},
      {
        withCredentials: true,
      }
    );
    if (res.data.status === "success") {
      toast.success("Hủy đơn hàng thành công!");
      return res.data.data.order;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Hủy đơn hàng thất bại");
    }
    return null;
  }
};

// Categories
export const adminGetAllCategories = async () => {
  try {
    const res = await axiosClient.get("/api/categories", {
      withCredentials: true,
    });
    return res.data.data.data || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách danh mục"
      );
    }
    return [];
  }
};

export const adminCreateCategory = async (data: { name: string }) => {
  try {
    const res = await axiosClient.post("/api/categories", data, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Tạo danh mục thành công!");
      return res.data.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Tạo danh mục thất bại");
    }
    return null;
  }
};

export const adminUpdateCategory = async (
  id: string,
  data: { name: string }
) => {
  try {
    const res = await axiosClient.patch(`/api/categories/${id}`, data, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Cập nhật danh mục thành công!");
      return res.data.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Cập nhật danh mục thất bại"
      );
    }
    return null;
  }
};

export const adminDeleteCategory = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/api/categories/${id}`, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Xóa danh mục thành công!");
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Xóa danh mục thất bại");
    }
    return false;
  }
};

// Brands
export const adminGetAllBrands = async () => {
  try {
    const res = await axiosClient.get("/api/brands", {
      withCredentials: true,
    });
    return res.data.data.data || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách thương hiệu"
      );
    }
    return [];
  }
};

export const adminCreateBrand = async (data: { name: string }) => {
  try {
    const res = await axiosClient.post("/api/brands", data, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Tạo thương hiệu thành công!");
      return res.data.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Tạo thương hiệu thất bại");
    }
    return null;
  }
};

export const adminUpdateBrand = async (id: string, data: { name: string }) => {
  try {
    const res = await axiosClient.patch(`/api/brands/${id}`, data, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Cập nhật thương hiệu thành công!");
      return res.data.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Cập nhật thương hiệu thất bại"
      );
    }
    return null;
  }
};

export const adminDeleteBrand = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/api/brands/${id}`, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      toast.success("Xóa thương hiệu thành công!");
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Xóa thương hiệu thất bại");
    }
    return false;
  }
};
