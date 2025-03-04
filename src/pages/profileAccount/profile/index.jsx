import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaCalendar, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AccountInfo() {
  const [activeTab, setActiveTab] = useState("account");
  const [customer, setCustomer] = useState({
    email: "",
    password: "",
    name: "",
    birthDate: "",
    phone: "",
    gender: "Nam",
  });
  const [originalCustomer] = useState({ ...customer });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
    // Kiểm tra lỗi ngay khi nhập
    validateField(name, value);
  };

  // Hàm đặt lại dữ liệu về trạng thái ban đầu
  const handleReset = () => {
    setCustomer(originalCustomer);
    setErrors({});
  };

  // Hàm kiểm tra lỗi của từng field
  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "email":
        if (!value.trim()) {
          errorMsg = "Email không được để trống.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = "Email không hợp lệ.";
        }
        break;
      case "password":
        if (!value.trim()) {
          errorMsg = "Mật khẩu không được để trống.";
        } else if (value.length < 8) {
          errorMsg = "Mật khẩu phải có ít nhất 8 ký tự.";
        }
        break;
      case "name":
        if (!value.trim()) {
          errorMsg = "Họ và tên không được để trống.";
        }
        break;
      case "phone":
        if (!value.trim()) {
          errorMsg = "Số điện thoại không được để trống.";
        } else if (!/^\d{10,11}$/.test(value)) {
          errorMsg = "Số điện thoại không hợp lệ.";
        }
        break;
      case "birthDate":
        if (!value) {
          errorMsg = "Vui lòng chọn ngày sinh.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };
  // Hàm kiểm tra toàn bộ form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(customer).forEach((key) => {
      validateField(key, customer[key]);
      if (errors[key]) newErrors[key] = errors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý khi nhấn "Lưu thông tin mới"
  const handleSubmit = () => {
    if (validateForm()) {
      alert("Thông tin đã được lưu thành công!");
      // Thêm logic để lưu dữ liệu nếu cần
    }
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
          onClick={() => navigate(`/historyOrders`)}
        >
          ⏳ Lịch sử mua hàng
        </button>
      </div>

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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
            <button onClick={handleSubmit} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
              LƯU THÔNG TIN MỚI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
