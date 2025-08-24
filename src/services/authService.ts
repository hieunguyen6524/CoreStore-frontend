import axios from "axios";
import { store } from "../store/store";
import { clearUser, setUser } from "../store/authSlice";
import toast from "react-hot-toast";
import axiosClient from "../utils/axiosClient";
import type { SuccessResponse } from "../types/response";
import type { User } from "../types/user";

export const signup = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    // console.log(name, email, password, passwordConfirm);
    const res = await axiosClient.post(
      "/api/users/signup",
      {
        name,
        email,
        password,
        passwordConfirm,
      },
      { withCredentials: true }
    );
    if (res.data.status === "success") {
      toast.success("Đăng ký thành công");
      setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại");
    } else {
      toast.error("Đăng ký thất bại");
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axiosClient.post<SuccessResponse<{ user: User }>>(
      "/api/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if (res.data.status === "success") {
      const user = res.data.data.user;

      if (user) {
        setUser(user);
        toast.success("Đăng nhập thành công");
        setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    } else {
      toast.error("Đăng nhập thất bại");
    }
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await axiosClient.get("/api/users/me", {
      withCredentials: true,
    });
    store.dispatch(setUser(res.data.data.data));
  } catch {
    store.dispatch(clearUser());
  }
};

export const logout = async () => {
  try {
    const res = await axiosClient.get<SuccessResponse<{ user: User }>>(
      "/api/users/logout",
      {
        withCredentials: true,
      }
    );

    if (res.data.status === "success") {
      store.dispatch(clearUser());
      setUser(null);

      location.assign("/");
      toast.success("Đăng xuất thành công");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Đăng xuất thất bại");
    } else {
      toast.error("Đăng xuất thất bại");
    }
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await axiosClient.post("/api/users/forgotpassword", {
      email,
    });

    if (res.data.status === "success") {
      toast.success("Vui lòng kiểm tra email");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ||
          "Không thể gửi link reset password qua email"
      );
    } else {
      toast.error("Không thể gửi link reset password qua email");
    }
  }
};

export const resetPassword = async (
  token: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const res = await axiosClient.patch(
      `/api/users/resetpassword/${token}`,
      {
        password,
        passwordConfirm,
      },
      { withCredentials: true }
    );

    if (res.data.status === "success") {
      toast.success("Thay đổi mật khẩu thành công");
      setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "Thay đổi mật khẩu thất bại"
      );
    } else {
      toast.error("Thay đổi mật khẩu thất bại");
    }
  }
};
