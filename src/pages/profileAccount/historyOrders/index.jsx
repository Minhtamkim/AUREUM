import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HistoryOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    try {
      const response = await api.get("order/user");
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShopNow = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Đang tải...</p>
      ) : orders.length > 0 ? (
        <ul className="max-w-2xl mx-auto space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col space-y-2"
            >
              <p className="text-xl font-semibold text-blue-600">🛒 Đơn hàng</p>
              <p className="text-gray-600 text-lg">📅 Ngày đặt: {new Date(order.createAt).toLocaleDateString()}</p>
              <p className="text-green-600 text-lg font-bold">💰 Tổng tiền: {order.total.toLocaleString()} VNĐ</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-8 flex justify-center"
            >
              <FaShoppingCart className="w-24 h-24 text-gray-300" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">Chưa có đơn hàng nào</h1>

            <p className="text-gray-600 mb-8 text-lg">Hãy khám phá và bắt đầu mua sắm ngay!</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShopNow}
              className="cursor-pointer bg-[#454542] hover:bg-[#2d2d2b] text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Bắt Đầu Mua Sắm Ngay
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
