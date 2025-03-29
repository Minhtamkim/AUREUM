import { toast } from "react-toastify";
import api from "../config/axios";

export const getAllReports = async () => {
  try {
    const response = await api.get("report");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getReportById = async (id) => {
  try {
    const response = await api.get(`report/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createReport = async (report) => {
  try {
    const response = await api.post("report", report);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateReport = async ({ id, report }) => {
  try {
    const response = await api.put(`report/${id}`, report);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteReport = async (id) => {
  try {
    const response = await api.delete(`report/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
