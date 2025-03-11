import { toast } from "react-toastify";
import api from "../config/axios";

export const getUser = async () => {
  try {
    const response = await api.get("user");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getUserById = async (id) => {
  if (!id) {
    console.error("ID không hợp lệ:", id);
    return null; // Trả về null nếu ID không hợp lệ
  }

  try {
    const response = await api.get(`user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);

    // Kiểm tra nếu API có response cụ thể
    if (error.response) {
      toast.error(error.response.data?.message || "Lỗi từ server");
    } else {
      toast.error("Lỗi kết nối đến server");
    }

    return null; // Trả về null để tránh undefined
  }
};

export const updateUser = async ({ id, user }) => {
  try {
    const response = await api.put(`user/${id}`, user);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateSkinType = async ({ id, skinTypeEnum }) => {
  try {
    const response = await api.patch(`user/updateSkinType/${id}`, null, {
      params: { skinTypeEnum }, // query parameter
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateRole = async ({ id, roleEnum }) => {
  try {
    const response = await api.patch(`user/updateRole/${id}`, null, {
      params: { roleEnum }, // query parameter
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const toggleUserActive = async (id) => {
  try {
    const response = await api.put(`user/${id}/isActive`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
