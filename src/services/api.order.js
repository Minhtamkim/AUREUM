import { toast } from "react-toastify";
import api from "../config/axios";

export const createOrder = async (data) => {
  try {
    const response = await api.post("order", data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const changeStatusOrder = async (id, status) => {
  try {
    const response = await api.patch(`order/${id}?statusEnum=${status}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
