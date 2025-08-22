import axiosClient from "../utils/axiosClient";

export const getAllCategories = async () => {
  const res = await axiosClient.get("/api/categories");
  return res.data.data.data;
};
