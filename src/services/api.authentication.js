import { toast } from "react-toastify";
import api from "../config/axios";

export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(
      "reset-password",
      { password }, // Gửi mật khẩu mới trong body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
    throw error;
  }
};
