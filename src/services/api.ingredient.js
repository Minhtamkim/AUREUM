import { toast } from "react-toastify";
import api from "../config/axios";

export const getIngredient = async () => {
  try {
    const response = await api.get("ingredient");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createIngredient = async (ingredient) => {
  try {
    const response = await api.post("ingredient", ingredient);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateIngredient = async ({ id, ingredient }) => {
  try {
    const response = await api.put(`ingredient/${id}`, ingredient);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteIngredient = async (id) => {
  try {
    const response = await api.delete(`ingredient/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
    return null;
  }
};
