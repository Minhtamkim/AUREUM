// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../../../config/axios";

// const QuizResult = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const answers = location.state?.answers || [];

//   const [skinType, setSkinType] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Điểm cho từng lựa chọn
//   const scoreMap = { A: 2, B: 4, C: 6, D: 8, E: 10 };

//   // Xác định loại da dựa trên điểm số
//   const determineSkinType = (score) => {
//     if (score <= 40) return "Da khô";
//     if (score > 40 && score <= 60) return "Da dầu";
//     if (score > 60 && score <= 75) return "Da hỗn hợp";
//     if (score > 75 && score <= 85) return "Da nhạy cảm";
//     return "Da thường";
//   };

//   // Tính tổng điểm và cập nhật loại da khi answers thay đổi
//   useEffect(() => {
//     const totalScore = answers.reduce((sum, answer) => sum + (scoreMap[answer?.value] || 0), 0);
//     setSkinType(determineSkinType(totalScore));
//   }, [answers]);

//   // Gọi API lấy sản phẩm khi skinType thay đổi
//   useEffect(() => {
//     if (!skinType) return;

//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const { data } = await api.get("product");
//         const filteredProducts = data.filter(
//           (product) => product.skin?.name?.trim().toLowerCase() === skinType.trim().toLowerCase()
//         );
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error("Lỗi khi lấy sản phẩm:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [skinType]);

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-[#FAF0E8] py-10">
//       {/* Kết quả kiểm tra */}
//       <div className="w-100 h-90 max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center">
//         <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
//           Cảm ơn bạn đã hoàn thành bài kiểm tra!
//         </p>
//         <h1 className="text-3xl font-bold text-green-600 mt-2">Kết Quả</h1>

//         <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold">Loại da của bạn là:</h2>
//           <p className="text-gray-700 mt-2 text-2xl font-bold">{skinType}</p>
//         </div>

//         <a
//           href="/quiz"
//           className="mt-5 px-6 py-3 text-white rounded-full font-semibold bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
//         >
//           Làm bài lại
//         </a>
//       </div>

//       {/* Danh sách sản phẩm phù hợp */}
//       <div className="w-full max-w-5xl mt-10">
//         <h2 className="text-2xl font-bold text-green-600 text-center">
//           {loading ? "Đang tìm sản phẩm phù hợp..." : `Sản phẩm phù hợp với ${skinType}`}
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-500 mt-4">Đang tải sản phẩm...</p>
//         ) : products.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white shadow-md rounded-lg p-4 text-center transform hover:scale-105 hover:shadow-lg transition duration-300 cursor-pointer"
//                 onClick={() => navigate(`/products/details/${product.id}`)}
//               >
//                 <img src={product.image} alt={product.name} className="bg-[#FAF0E8] w-full h-77 object-cover rounded-md" />
//                 <h3 className="text-sm font-semibold mt-3">{product.name}</h3>
//                 <span className="block mt-2 text-pink-600 font-bold">
//                   {new Intl.NumberFormat("vi-VN").format(product.price)} VND
//                 </span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500 mt-4">Không có sản phẩm phù hợp</p>
//         )}
//       </div>
//     </div>
//   );
// };


// export default QuizResult;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { motion } from "framer-motion";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];

  const [skinType, setSkinType] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const scoreMap = { A: 2, B: 4, C: 6, D: 8, E: 10 };

  const determineSkinType = (score) => {
    if (score <= 40) return "Da khô";
    if (score > 40 && score <= 60) return "Da dầu";
    if (score > 60 && score <= 75) return "Da hỗn hợp";
    if (score > 75 && score <= 85) return "Da nhạy cảm";
    return "Da thường";
  };

  useEffect(() => {
    const totalScore = answers.reduce((sum, answer) => sum + (scoreMap[answer?.value] || 0), 0);
    setSkinType(determineSkinType(totalScore));
  }, [answers]);

  useEffect(() => {
    if (!skinType) return;

    const fetchProducts = async () => {
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
    <div className="min-h-screen flex flex-col items-center bg-[#FAF0E8] py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 text-center border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-gray-900">Kết Quả Phân Tích Da</h1>
        <p className="text-lg text-gray-500 mt-2">Loại da của bạn:</p>
        <p className="text-2xl font-semibold text-[#D4AF37] mt-3">{skinType}</p>
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

