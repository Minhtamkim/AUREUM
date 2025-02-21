import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaCalendar, FaEdit, FaSave, FaMapMarkerAlt } from "react-icons/fa";

export default function AccountInfo() {
  const [activeTab, setActiveTab] = useState("account");
  const [customer, setCustomer] = useState({});
  const [originalCustomer, setOriginalCustomer] = useState({});

  const [orderHistory, setOrderHistory] = useState([
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

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Hàm đặt lại dữ liệu về trạng thái ban đầu
  const handleReset = () => {
    setCustomer(originalCustomer);
  };

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
          onClick={() => setActiveTab("account")}
        >
          👤 Thông tin tài khoản
        </button>

        <button
          className={`py-3 px-6 ${
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

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Mã đơn hàng</th>
                <th className="border-b py-2 px-4">Ngày đặt hàng</th>
                <th className="border-b py-2 px-4">Địa chỉ</th>
                <th className="border-b py-2 px-4">Tổng tiền</th>
                <th className="border-b py-2 px-4">Trạng thái</th>
                <th className="border-b py-2 px-4">Mã vận chuyển</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.orderId}>
                  <td className="border-b py-2 px-4">{order.orderId}</td>
                  <td className="border-b py-2 px-4">{order.orderDate}</td>
                  <td className="border-b py-2 px-4">{order.address}</td>
                  <td className="border-b py-2 px-4">{order.totalAmount}</td>
                  <td className="border-b py-2 px-4">{order.status}</td>
                  <td className="border-b py-2 px-4">{order.trackingCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Nội dung tab Thông tin tài khoản */}
      {activeTab === "account" && (
        <div className="bg-[#F7F0E4] p-6 rounded-b-lg text-gray-800">
          <h2 className="text-lg py-3 font-semibold mb-4">Thông tin tài khoản</h2>

          {/* Email */}
          <div className="flex items-center space-x-4 mb-4 py-3">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
              placeholder="Nhập email"
            />
          </div>

          {/* Mật khẩu */}
          <div className="flex items-center space-x-4 mb-4 py-3 pb-4">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              name="password"
              value={customer.password}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Nút đổi mật khẩu */}
          <button className="flex items-center text-sm text-yellow-600 hover:text-yellow-800 mb-6">
            <FaEdit className="mr-2" />
            ĐỔI MẬT KHẨU
          </button>

          <h2 className="text-lg font-semibold mb-4 py-4">Thông tin cá nhân</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Họ tên */}
            <div className="flex items-center space-x-4 pb-4">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
                placeholder="Nhập họ và tên"
              />
            </div>

            {/* Ngày sinh */}
            <div className="flex items-center space-x-4 pb-4">
              <FaCalendar className="text-gray-500" />
              <input
                type="date"
                name="birthDate"
                value={customer.birthDate}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
              />
            </div>

            {/* Số điện thoại */}
            <div className="flex items-center space-x-4 pb-4">
              <FaPhone className="text-gray-500" />
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
                placeholder="Nhập số điện thoại"
              />
            </div>

            {/* Giới tính */}
            <div className="flex items-center space-x-4 pb-4">
              <FaUser className="text-gray-500" />
              <select
                name="gender"
                value={customer.gender}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* Nút Hủy Bỏ và Lưu Thông Tin Mới */}
          <div className="flex items-center space-x-6 mt-6">
            <button
              onClick={handleReset}
              className="text-gray-700 hover:text-black px-6 py-2 rounded-md border border-gray-400"
            >
              HỦY BỎ
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">LƯU THÔNG TIN MỚI</button>
          </div>
        </div>
      )}
    </div>
  );
}
