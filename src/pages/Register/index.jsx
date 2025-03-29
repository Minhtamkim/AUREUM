import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FaUser, FaPhone, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../config/axios";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên.";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại.";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Định dạng email không hợp lệ.";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordStrength(validateForm(value));
    }

    validateField(name, type === "checkbox" ? checked : value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value) newErrors.fullName = "Full name is required";
        else if (value.length < 2) newErrors.fullName = "Name must be at least 2 characters";
        else if (!/^[\p{L}\s]+$/u.test(value)) newErrors.fullName = "Only alphabets and spaces allowed";
        else delete newErrors.fullName;
        break;

      case "email":
        if (!value) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = "Invalid email format";
        else delete newErrors.email;
        break;

      case "username":
        if (!value) newErrors.username = "Username is required";
        else if (value.length < 4) newErrors.username = "Username must be at least 4 characters";
        else if (value.length > 20) newErrors.username = "Username must not exceed 20 characters";
        else if (!/^[a-zA-Z0-9]+$/.test(value)) newErrors.username = "Only alphanumeric characters allowed";
        else delete newErrors.username;
        break;

      case "password":
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 8) newErrors.password = "Password must be at least 8 characters";
        else if (!/(?=.*[A-Z])/.test(value)) newErrors.password = "Include at least one uppercase letter";
        else if (!/(?=.*[a-z])/.test(value)) newErrors.password = "Include at least one lowercase letter";
        else if (!/(?=.*[0-9])/.test(value)) newErrors.password = "Include at least one number";
        else if (!/(?=.*[!@#$%^&*])/.test(value)) newErrors.password = "Include at least one special character";
        else delete newErrors.password;
        break;

      case "terms":
        if (!value) newErrors.terms = "You must accept the terms and conditions";
        else delete newErrors.terms;
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      // promise
      const response = await api.post("register", formData);
      toast.success("Successfully create new account!");
      navigate("/login");
    } catch (err) {
      // bị lỗi => showw message lỗi
      toast.error(err.response.data);
      console.log(err.response.data);
    }
  };
  const dispatch = useDispatch();

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.accessToken; // Lấy idToken để gửi lên backend

      console.log("Thông tin người dùng:", user);

      // Gửi token lên backend để đăng ký hoặc đăng nhập
      const response = await api.post("loginGoogle", { token: idToken });
      console.log(response.data);
      const { data } = response;
      const { roleEnum, active, skin } = data; // Trích xuất token và roleEnum
      console.log("Active Status:", active); // Kiểm tra dữ liệu trả về từ API

      if (active === false) {
        toast.error("Tài khoản của bạn bị cấm truy cập!");
        setIsLoading(false);
        return; // Ngăn không cho tiếp tục đăng nhập
      }

      console.log(roleEnum);

      // Lưu thông tin vào Redux
      dispatch(login(data));

      // Lưu token vào localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("roleEnum", data.roleEnum);
      if (skin && skin.name) {
        localStorage.setItem("skinType", skin.name);
      }

      // Chuyển hướng dựa vào vai trò
      if (roleEnum === "ADMIN" || roleEnum === "MANAGER" || roleEnum === "STAFF") {
        navigate("/dashboard");
      } else if (roleEnum === "CUSTOMER") {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập bằng Google:", error.message);
      toast.error("Đăng nhập bằng Google thất bại!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        className="fixed inset-0 min-h-screen bg-[url('/images/backgroundLogin.jpg')] bg-cover bg-center bg-no-repeat"
        style={{
          filter: "blur(5px)", // Giảm độ mờ nếu cần
          zIndex: "-1", // Đảm bảo lớp nền nằm phía sau
        }}
      ></div>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Xin chào thành viên mới</h2>
        <p className="text-center text-gray-600 mb-6">Để tạo tài khoản, xin hãy nhập thông tin dưới đây:</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ToastContainer />
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`block w-full pl-10 py-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black ${
                  errors.fullName ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Nhập tên của bạn"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <div className="relative mt-1">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                id="phone"
                name="phone"
                type="text"
                className={`block w-full pl-10 py-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black ${
                  errors.phone ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                className={`block w-full pl-10 py-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black ${
                  errors.email ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`block w-full pl-10 py-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black ${
                  errors.password ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                className={`block w-full pl-10 py-2 border-b-2 focus:outline-none focus:ring-0 focus:border-black ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-400"
                }`}
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className={`w-full flex justify-center py-2 px-4 border border-black shadow-sm text-sm font-medium text-white ${
                isLoading || Object.keys(errors).length > 0
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Đăng ký tài khoản"
              )}
            </button>
          </div>

          <div
            onClick={handleLoginGoogle}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="text-2xl" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
