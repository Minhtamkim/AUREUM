import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AccountInfoPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Họ và tên là bắt buộc";
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!formData.dob) newErrors.dob = "Vui lòng nhập ngày tháng năm sinh";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }
    if (!formData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Thông tin đã được lưu thành công!");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f2ea]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Thông tin tài khoản</h2>
        <ToastContainer />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              name="fullName"
              type="text"
              className="w-full p-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
            <select
              name="gender"
              className="w-full p-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              name="dob"
              type="date"
              className="w-full p-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              name="phoneNumber"
              type="text"
              className="w-full p-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              name="address"
              type="text"
              className="w-full p-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountInfoPage;
