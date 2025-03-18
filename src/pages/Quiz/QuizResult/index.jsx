import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { motion } from "framer-motion";
import { getUser, updateUser } from "../../../services/api.user";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const skinType = location.state?.skinType || "Không xác định";
  const userId = 1; // Lấy từ context hoặc localStorage nếu có

  const initialSkinType = location.state?.skinType || "";
  const [skinTypes, setSkinTypes] = useState(initialSkinType);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const skinMapping = {
    1: "Da Thường",
    2: "Da Dầu",
    3: "Da Khô",
    4: "Da Hỗn Hợp",
    5: "Da Nhạy Cảm",
  };

  // Hàm lấy tên loại da từ ID
  const getSkinTypeFromId = (id) => skinMapping[id] || "Không xác định";

  // Hàm lấy ID từ tên loại da
  const getSkinIdFromType = (type) => {
    return Object.keys(skinMapping).find((key) => skinMapping[key] === type);
  };

  useEffect(() => {
    if (skinType !== "Không xác định") {
      updateUserSkinType(userId, skinType)
        .then(() => console.log("Cập nhật loại da thành công"))
        .catch((err) => console.error("Lỗi cập nhật loại da:", err));
    }
    localStorage.setItem("skinType", skinType);
  }, [skinType, userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        console.log(" Dữ liệu user từ API:", userData);

        if (!userData || !userData.id) {
          console.error(" Lỗi: Không tìm thấy ID người dùng!");
          return;
        }

        setUser(userData);

        if (!initialSkinType && userData?.skinType) {
          setSkinTypes(userData.skinType);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
  }, []);

  useEffect(() => {
    if (skinType && user && user.id && !user.skinId) {
      updateUserSkinType(skinType);
      fetchProducts(skinType);
    }
  }, [skinType, user]);

  const updateUserSkinType = async (newSkinType) => {
    if (!user) return;

    const newSkinId = getSkinIdFromType(newSkinType);
    if (!newSkinId) {
      console.error(" Không tìm thấy ID cho loại da:", newSkinType);
      return;
    }

    try {
      const updatedUser = { ...user, skinId: Number(newSkinId) };
      const updateUserSkinType = async (newSkinType) => {
        if (!user || !user.id) {
          console.error(" Không thể cập nhật, user hoặc user.id bị thiếu!");
          return;
        }

        const newSkinId = getSkinIdFromType(newSkinType);
        if (!newSkinId) {
          console.error(" Không tìm thấy ID cho loại da:", newSkinType);
          return;
        }

        try {
          const updatedUser = { ...user, skinId: Number(newSkinId) };
          await updateUser({ id: user.id, user: updatedUser });

          setUser(updatedUser);
          console.log(" Cập nhật skinId thành công:", newSkinId);
        } catch (error) {
          console.error("Lỗi khi cập nhật skinId:", error);
        }
      };

      setUser(updatedUser);
      console.log(" Cập nhật skinId thành công:", newSkinId);
    } catch (error) {
      console.error("Lỗi khi cập nhật skinId:", error);
    }
  };

  const fetchProducts = async (skinType) => {
    setLoading(true);
    try {
      const { data } = await api.get("product");
      const filteredProducts = data.filter(
        (product) => product.skin?.name?.trim().toLowerCase() === skinType.trim().toLowerCase()
      );

      console.log("Sản phẩm phù hợp:", filteredProducts); // Kiểm tra sản phẩm đã lọc
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skinType) {
      fetchProducts(skinType);
    }
  }, [skinType]); // Chỉ chạy khi skinType thay đổi

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FAF0E8] py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 text-center border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-gray-900">Kết Quả Phân Tích Da</h1>
        <p className="text-lg text-gray-500 mt-2">Loại da của bạn là:</p>
        <p className="text-2xl font-semibold text-[#D4AF37] mt-3">{skinType || "Không xác định"}</p>
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-gradient-to-r from-[#C8A45D] to-black text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Làm lại bài kiểm tra
          </button>
        </div>
      </motion.div>
      <div className="w-full max-w-6xl mt-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {loading ? "Đang tìm sản phẩm phù hợp..." : `Sản phẩm dành cho ${skinType}`}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 mt-4">Đang tải sản phẩm...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-md rounded-xl p-5 text-center border border-gray-300 hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => navigate(`/products/details/${product.id}`)}
              >
                <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md" />
                <h3 className="text-lg font-semibold mt-4 text-gray-900">{product.name}</h3>
                <span className="block mt-2 text-[#D4AF37] font-bold">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} VND
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">Không có sản phẩm phù hợp</p>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
