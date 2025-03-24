import { toast } from "react-toastify";
import api from "../config/axios";

export const getProduct = async () => {
  try {
    const response = await api.get("product");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getProductPageable = async (currentPage, pageSize) => {
  try {
    const response = await api.get(`product/Pageable`, {
      params: { currentPage, pageSize }, // Truyền tham số vào API
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`product/${id}`);
    const product = response.data;

    // Kiểm tra nếu sản phẩm có đánh giá
    if (!product.ratings || product.ratings.length === 0) {
      return { ...product, averageRating: 0, totalReviews: 0 };
    }

    // Tính toán rating trung bình chính xác
    const totalReviews = product.ratings.length;
    const totalRating = product.ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1); // Định dạng số thập phân X.X

    console.log("Dữ liệu sản phẩm:", product);

    return { ...product, averageRating: parseFloat(averageRating), totalReviews };
  } catch (error) {
    toast.error(error.response?.data || "Lỗi khi lấy dữ liệu sản phẩm");
    return null;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post("product", product);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateProduct = async ({ id, product }) => {
  try {
    const response = await api.put(`product/${id}`, product);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`product/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
    return null;
  }
};
