import api from "../config/axios";
import { toast } from "react-toastify";
export const getAnswers = async () => {
  try {
    const response = await api.get("answer");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getAnswerById = async (id) => {
  try {
    const response = await api.get(`answer/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createAnswer = async (answer) => {
  try {
    const response = await api.post("answer", answer);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateAnswer = async (id, answer) => {
  try {
    const response = await api.put(`answer/${id}`, answer);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteAnswer = async (id) => {
  try {
    const response = await api.delete(`answer/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
