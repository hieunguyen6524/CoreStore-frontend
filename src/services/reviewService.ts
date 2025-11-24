import axios from "axios";
import toast from "react-hot-toast";
import axiosClient from "../utils/axiosClient";

interface SubmitReviewPayload {
  rating: number;
  comment?: string;
}

export const submitReview = async (
  productId: string,
  payload: SubmitReviewPayload
) => {
  try {
    const res = await axiosClient.post(`/api/reviews/${productId}`, payload, {
      withCredentials: true,
    });
    return res.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Gửi đánh giá thất bại, thử lại nhé";
      toast.error(message);
      throw new Error(message);
    }
    toast.error("Gửi đánh giá thất bại, thử lại nhé");
    throw error;
  }
};

