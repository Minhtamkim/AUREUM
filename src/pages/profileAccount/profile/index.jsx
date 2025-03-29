/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaCalendar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../services/api.user";
import { MdFace4 } from "react-icons/md";
import { updateUserInfo } from "../../../redux/features/userSlice";
import OrdersHistory from "../historyOrders";
import { useLocation } from "react-router-dom";

function AccountInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Lấy user từ Redux
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("account");
  const [customer, setCustomer] = useState({
    email: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    phone: "",
    gender: "",
    skin: {
      name: "",
    },
  });
  const [originalCustomer, setOriginalCustomer] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        console.error("User ID không hợp lệ:", user);
        return;
      }

      const userData = await getUserById(user.id);
      if (userData) {
        setCustomer(userData);
        setOriginalCustomer(userData);
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "history" || tab === "account") {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    console.log("customer state:", customer);
  }, [customer]);
  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: name === "skin" ? { id: value } : value, // Xử lý riêng cho skin
    }));

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
        if (!value.trim()) errorMsg = "Email không được để trống.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errorMsg = "Email không hợp lệ.";
        break;
      case "password":
        if (value && value.length < 8) {
          // Chỉ kiểm tra nếu người dùng nhập mật khẩu
          errorMsg = "Mật khẩu phải có ít nhất 8 ký tự.";
        }
        break;
      case "fullName":
        if (!value.trim()) errorMsg = "Họ và tên không được để trống.";
        break;
      case "phone":
        if (!/^\d{10,11}$/.test(value))
          errorMsg = "Số điện thoại không hợp lệ.";
        break;
      case "birthDate":
        if (!value) errorMsg = "Vui lòng chọn ngày sinh.";
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Kiểm tra form trước khi gửi
  const validateForm = () => {
    const newErrors = {};
    Object.keys(customer).forEach((key) => {
      const errorMsg = validateField(key, customer[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý khi nhấn "Lưu thông tin mới"
  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Vui lòng kiểm tra lại thông tin.");
      return;
    }

    // Tạo bản sao dữ liệu để chỉnh sửa
    const updatedData = { ...customer };

    // Nếu không nhập mật khẩu, xóa khỏi request để tránh cập nhật sai
    if (!updatedData.password) {
      delete updatedData.password;
    }

    // Đảm bảo `skinId` được gửi đi nếu có loại da
    if (updatedData.skin?.id) {
      updatedData.skinId = updatedData.skin.id; // Chuyển đổi `skin.id` thành `skinId`
    }
    delete updatedData.skin; // Xóa `skin` để tránh lỗi API

    console.log("Dữ liệu gửi lên API:", updatedData); // Kiểm tra dữ liệu trước khi gửi

    try {
      const updatedUser = await updateUser({ id: user.id, user: updatedData });

      //  Cập nhật Redux Store đúng cách
      dispatch(updateUserInfo(updatedUser));

      alert("Thông tin đã được cập nhật thành công!");
      setOriginalCustomer(updatedUser); // Cập nhật state nếu cần
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Cập nhật thông tin thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFBF4] px-25 py-10">
      {/* Tiêu đề */}
      <h1 className="tracking-wide font-sans text-2xl font-bold text-gray-900 mb-4 pb-10">
        TÀI KHOẢN
      </h1>

      {/* Tabs */}
      <div className="flex space-x-6">
        <button
          className={`py-4 px-6 ${
            activeTab === "account"
              ? "bg-[#F7F0E4] font-semibold"
              : "text-gray-500"
          } rounded-t-lg`}
          onClick={() => {
            setActiveTab("account");
            window.history.pushState(null, "", "/profile?tab=account");
          }}
        >
          👤 Thông tin tài khoản
        </button>

        <button
          className={`py-3 px-6 ${
            activeTab === "history"
              ? "bg-[#F7F0E4] font-semibold"
              : "text-gray-500"
          } rounded-t-lg`}
          onClick={() => {
            setActiveTab("history");
            window.history.pushState(null, "", "/profile?tab=history");
          }}
        >
          ⏳ Lịch sử mua hàng
        </button>
      </div>

      {/* Nội dung tab Thông tin tài khoản */}
      {activeTab === "account" && (
        <div className="bg-[#F7F0E4] p-6 rounded-b-lg text-gray-800">
          {/* <h2 className="text-lg py-3 font-semibold mb-4">
            Thông tin tài khoản
          </h2> */}

          {/* Email */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 mb-4 py-3">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={customer?.email ?? ""} // Dùng toán tử ??
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="flex items-center space-x-4 pb-4">
              <MdFace4 className="text-gray-500" />
              <select
                name="skin"
                value={customer.skin?.id || ""} // Kiểm tra nếu skin có id thì lấy, nếu không thì để mặc định là ""
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
              >
                <option value="">Chọn loại da</option>
                <option value="1">da thường</option>
                <option value="2">da dầu</option>
                <option value="3">da khô</option>
                <option value="4">da hỗ hợp</option>
                <option value="5">da nhạy cảm</option>
              </select>
            </div>
            {/* Mật khẩu */}
            <div>
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="password"
                value={customer.password || ""} // Tránh lỗi undefined
                onChange={handleChange}
                autoComplete="new-password"
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
                placeholder={customer.password ? "" : "*************"}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4 py-4">Thông tin cá nhân</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Họ tên */}
            <div className="flex items-center space-x-4 pb-4">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="fullName" // Cập nhật name thành fullName
                value={customer.fullName} // Sử dụng customer.fullName thay vì name
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-80 p-1"
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Ngày sinh */}
            <div className="flex items-center space-x-4 pb-4">
              <FaCalendar className="text-gray-500" />
              <input
                type="date"
                name="dateOfBirth"
                value={customer.dateOfBirth}
                onChange={handleChange}
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
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
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
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
            >
              LƯU THÔNG TIN MỚI
            </button>
          </div>
        </div>
      )}

      {/* Nội dung tab Lịch Sử Mua Hàng */}
      {activeTab === "history" && <OrdersHistory />}
    </div>
  );
}
export default AccountInfo;
