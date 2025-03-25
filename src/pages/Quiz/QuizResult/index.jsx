import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { motion } from "framer-motion";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận skinId và skinType từ QuizDetail
  const skinType = location.state?.skinType || "Không xác định"; // Sửa lại để nhận đúng skinType
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách sản phẩm phù hợp với loại da
  useEffect(() => {
    const fetchProducts = async () => {
      if (!skinType || skinType === "Không xác định") return;
      setLoading(true);
      try {
        const { data } = await api.get("product");
        const filteredProducts = data.filter(
          (product) => product.skin?.name?.trim().toLowerCase() === skinType.trim().toLowerCase()
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [skinType]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FAF0E8] py-10 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 text-center border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-gray-900">Kết Quả Phân Tích Da</h1>
        <p className="text-lg text-gray-500 mt-2">Loại da của bạn là:</p>
        <p className="text-2xl font-semibold text-[#D4AF37] mt-3 mb-4">{skinType}</p>
        <Link to="/redirecttoskinPage" className="text-blue-500 underline">Lộ trình chăm sóc da dành cho bạn</Link>

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
