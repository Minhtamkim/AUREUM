import { toast } from "react-toastify";
import api from "../config/axios";

export const getAllVouchers = async () => {
  try {
    const response = await api.get("voucher");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createVoucher = async (voucher) => {
  try {
    const response = await api.post("voucher", voucher);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getVoucherById = async (id) => {
  try {
    const response = await api.get(`voucher/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const changeVoucherStatus = async (id, status) => {
  try {
    const response = await api.patch(`voucher/${id}?statusEnum=${status}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateVoucher = async ({ id, voucher }) => {
  try {
    const response = await api.put(`voucher/${id}`, voucher);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteVoucher = async (id) => {
  try {
    const response = await api.delete(`voucher/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
