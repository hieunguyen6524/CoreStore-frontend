import axios from "axios";
import toast from "react-hot-toast";
import axiosClient from "../utils/axiosClient";

export const addCart = async (product: string, quantity: number) => {
  try {
    const res = await axiosClient.patch(
      "/api/cart",
      {
        product,
        quantity,
      },
      { withCredentials: true }
    );

    if (res.data.status === "success") {
      toast.success("Đã thêm vào giỏ hàng!");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Thêm vào giỏ hàng thất bại"
      );
    } else {
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  }
};

export const getCart = async () => {
  try {
    const res = await axiosClient.get("/api/cart", {
      withCredentials: true,
    });

    if (res.data.status === "success") {
      return res.data.data.cart;
    }
    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Giỏ hàng lỗi");
    } else {
      toast.error("Giỏ hàng lỗi");
    }
    return [];
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/api/cart/${id}`, {
      withCredentials: true,
    });

    if (res.data.status === "success") {
      toast.success("Đã xóa sản phẩm!");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Xóa thất bại");
    } else {
      toast.error("Xóa thất bại");
    }
  }
};

export const updateQuantityItem = async (id: string, quantity: number) => {
  try {
    await axiosClient.patch(
      `/api/cart/${id}`,
      {
        quantity,
      },
      { withCredentials: true }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Xóa thất bại");
    } else {
      toast.error("Xóa thất bại");
    }
  }
};
