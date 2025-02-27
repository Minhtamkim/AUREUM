import { toast } from "react-toastify";
import api from "../config/axios";

export const getBrand = async () => {
  try {
    const response = await api.get("brand");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createBrand = async (brand) => {
  try {
    const response = await api.post("brand", brand);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateBrand = async ({ id, brand }) => {
  try {
    const response = await api.put(`brand/${id}`, brand);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteBrand = async (id) => {
  try {
    const response = await api.delete(`brand/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
    return null;
  }
};
