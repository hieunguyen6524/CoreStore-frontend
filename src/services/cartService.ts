import axios from "axios";
import toast from "react-hot-toast";

export const addCart = async (product: string, quantity: number) => {
  try {
    const res = await axios.patch(
      "http://127.0.0.1:3000/api/cart",
      {
        product,
        quantity,
      },
      { withCredentials: true }
    );

    if (res.data.status === "success") {
      toast.success("Thêm sản phẩm thành công!");
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
    const res = await axios.get("http://127.0.0.1:3000/api/cart", {
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
