import { toast } from "react-toastify";
import api from "../config/axios";

export const getCategory = async () => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createCategory = async (category) => {
  try {
    const response = await api.post("/category", category);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateCategory = async ({ id, category }) => {
  try {
    const response = await api.put(`/category/${id}`, category);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
    return null;
  }
};
