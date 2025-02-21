import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../config/axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      try {
        const response = await api.post("login", formData);
        const { token, data } = response;
        const { roleEnum } = data;
        console.log(roleEnum);
        localStorage.setItem("token", token);
        toast.success("Successfully login!");
        if (roleEnum === "ADMIN") {
          navigate("/dashboard");
        } else if (roleEnum === "CUSTOMER") {
          navigate("/");
        }
      } catch (err) {
        toast.error(err.response);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f2ea]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">AUREUM chào bạn</h2>
        <p className="text-center text-gray-600 mb-6">
          Bạn chưa có tài khoản?{" "}
          <a href="#" className="text-yellow-600">
            Tạo tài khoản
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ToastContainer />

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
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập email của bạn"
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
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập mật khẩu của bạn"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-yellow-600 focus:ring-black border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Ghi nhớ mật khẩu cho lần sau
              </label>
            </div>
            <a href="#" className="text-sm text-yellow-600">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            ) : null}
            {isLoading ? "Đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-gray-600">Hoặc đăng nhập bằng</div>
          <div className="flex gap-4">
            <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100">
              <SiFacebook className="text-blue-600 text-2xl" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100"
              onClick={() => console.log("Google sign in clicked")}
            >
              <FcGoogle className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
