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

export const updateUser = async ({ id, user }) => {
  try {
    const response = await api.put(`user/${id}`, user);
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
