import axios from "axios";
import toast from "react-hot-toast";
import axiosClient from "../utils/axiosClient";

export const checkout = async () => {
  try {
    const res = await axiosClient.get("/api/order/checkout", {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Lỗi trong quá trình tạo thanh toán"
      );
    } else {
      toast.error("Lỗi trong quá trình tạo thanh toán");
    }
    return null;
  }
};

export const webhookSepay = async () => {};

export const getOrdersByUser = async (status?: string) => {
  try {
    const url = status
      ? `/api/order/my-orders?status=${status}`
      : `/api/order/my-orders`;
    const res = await axiosClient.get(url, {
      withCredentials: true,
    });

    if (res.data.status === "success") {
      return res.data.data.orders;
    }
    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách đơn hàng"
      );
    } else {
      toast.error("Lỗi khi lấy danh sách đơn hàng");
    }
    return [];
  }
};