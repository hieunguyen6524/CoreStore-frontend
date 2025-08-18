import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

type ProfileData = FormData | { name: string; email: string };

type PasswordData = {
  currenthPassword: string;
  password: string;
  passwordConfirm: string;
};

export const updateSetting = async (
  mode: "profile" | "password",
  data: ProfileData | PasswordData,
  isFormData = false
): Promise<void> => {
  try {
    const url =
      mode === "password"
        ? "http://127.0.0.1:3000/api/users/updateMyPassword"
        : "http://127.0.0.1:3000/api/users/updateMe";

    const config: AxiosRequestConfig = {
      withCredentials: true,
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    };

    const res = await axios.patch(url, data, config);

    if (res.data.status === "success") {
      toast.success(`${mode.toUpperCase()} cập nhật thành công`);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Cập nhật thất bại");
    } else {
      toast.error("Cập nhật thất bại");
    }
  }
};
