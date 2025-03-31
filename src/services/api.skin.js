import { toast } from "react-toastify";
import api from "../config/axios";

export const getSkinType = async () => {
  try {
    const response = await api.get("skin");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getSkinById = async (id) => {
  try {
    const response = await api.get(`skin/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createSkinType = async () => {
  try {
    const response = await api.post("skin");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateSkinType = async ({id, skin}) => {
  try {
    const response = await api.put(`skin/${id}`, skin);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteSkinType = async (id) => {
  try {
    const response = await api.delete(`skin/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const determineSkinType = async (answerIds, userId) => {
  try {
    const response = await api.post(`skin/submit`, {
      answerIds: answerIds,
      userId: userId || null,
    });
    return response.data; // Kết quả loại da trả về
  } catch (error) {
    console.error("Error determining skin type:", error);
    throw error;
  }
};
