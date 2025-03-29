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

export const getAllOrders = async () => {
  try {
    const response = await api.get("order");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const cancelOrder = async (id) => {
  try {
    const response = await api.put(`order/cancel/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const completedOrder = async (id) => {
  try {
    const response = await api.put(`order/completed/${id}`);
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

export const refundOrder = async (id) => {
  try {
    const response = await api.patch(`order/${id}?statusEnum=REFUNDED`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchOrderHistory = async () => {
  try {
    const response = await api.get("order/user");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
