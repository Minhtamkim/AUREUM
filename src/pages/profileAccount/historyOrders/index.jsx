import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HistoryOrders() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("history");
  const [orderHistory] = useState([
    {
      orderId: "12345",
      orderDate: "2025-02-20",
      address: "Hà Nội, Việt Nam",
      totalAmount: "500,000 VND",
      status: "Đang giao",
      trackingCode: "VN123456789",
    },
    {
      orderId: "67890",
      orderDate: "2025-02-18",
      address: "Hồ Chí Minh, Việt Nam",
      totalAmount: "300,000 VND",
      status: "Đã giao",
      trackingCode: "VN987654321",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#FEFBF4] px-25 py-10">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-10">TÀI KHOẢN</h1>

      {/* Tabs */}
      <div className="flex space-x-6">
        <button
          className={`py-4 px-6 ${
            activeTab === "account" ? "bg-[#F7F0E4] font-semibold" : "text-gray-500"
          } rounded-t-lg`}
          onClick={() => navigate(`/profile`)}
        >
          👤 Thông tin tài khoản
        </button>

        <button
          className={`py-4 px-6 ${
            activeTab === "history" ? "bg-[#F7F0E4] font-semibold" : "text-gray-500"
          } rounded-t-lg`}
          onClick={() => setActiveTab("history")}
        >
          ⏳ Lịch sử mua hàng
        </button>
      </div>

      {/* Nội dung tab Lịch sử mua hàng */}
      {activeTab === "history" && (
        <div className="bg-[#F7F0E4] p-6 rounded-b-lg text-gray-800">
          <h2 className="text-lg py-3 font-semibold mb-4">Lịch sử mua hàng</h2>

          {orderHistory.length === 0 ? (
            <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
          ) : (
            <div className="space-y-6">
              {orderHistory.map((order) => (
                <div key={order.orderId} className="p-4 bg-white shadow-md rounded-lg">
                  {/* Mã đơn hàng và trạng thái */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-900">Mã đơn: {order.orderId}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Đã giao" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Ngày đặt và mã vận chuyển */}
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <span>📅 Ngày đặt hàng:</span>
                    <span>{order.orderDate}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <span>📦 Mã vận chuyển:</span>
                    <span>{order.trackingCode}</span>
                  </div>

                  {/* Địa chỉ */}
                  <div className="flex items-center space-x-2 text-gray-700 mt-2">
                    <span>
                      📍 <strong>Địa chỉ:</strong>
                    </span>
                    <span>{order.address}</span>
                  </div>

                  {/* Tổng tiền */}
                  <div className="text-lg font-semibold text-red-500 mt-2">💰 Tổng tiền: {order.totalAmount}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
