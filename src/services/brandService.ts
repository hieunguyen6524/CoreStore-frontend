import axiosClient from "../utils/axiosClient";
import type { Brand } from "../types/brand";

export const getAllBrands = async (): Promise<Brand[]> => {
  try {
    const res = await axiosClient.get("/api/brands");
    return res.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

