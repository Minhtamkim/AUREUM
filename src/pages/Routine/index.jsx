import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/api.user";

const RedirectToSkinPage = () => {
  const userId = useSelector((state) => state.user?.id);
  const [userSkin, setUserSkin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return; // Nếu chưa có userId, không fetch dữ liệu

    const fetchUserSkin = async () => {
      try {
        const userRes = await getUserById(userId);
        const skinType = userRes?.skin?.name || null;
        setUserSkin(skinType);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSkin();
  }, [userId]);

  useEffect(() => {
    if (loading) return; // Chờ dữ liệu được load xong

    console.log("User skin type:", userSkin);

    if (!userSkin) {
      navigate("/quiz");
      return;
    }

    const normalizedSkin = userSkin?.trim().toLowerCase(); // Chuẩn hóa chuỗi

    const skinRoutes = {
      "da thường": "/normalskinPage",
      "da dầu": "/oilyskinPage",
      "da khô": "/dryskinPage",
      "da hỗn hợp": "/combinationskinPage",
      "da nhạy cảm": "/sensitiveskinPage",
    };

    const path = skinRoutes[normalizedSkin] || "/quiz";
    console.log("Redirecting to:", path);
    navigate(path);
  }, [userSkin, loading, navigate]);

  return null;
};

export default RedirectToSkinPage;
