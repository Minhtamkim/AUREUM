import { toast } from "react-toastify";
import api from "../config/axios";

export const getQuestions = async () => {
  try {
    const response = await api.get("question");

    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getQuestionById = async (id) => {
  try {
    const response = await api.get(`question/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createQuestion = async (question) => {
  try {
    const response = await api.post("question", question);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateQuestion = async ({id, question}) => {
  try {
    const response = await api.put(`question/${id}`, question);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await api.delete(`question/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
