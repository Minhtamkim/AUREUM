import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services/api.authentication";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    passwordsMatch: false,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const validationResults = validatePassword(formData.password);
    setValidations((prev) => ({
      ...validationResults,
      passwordsMatch: formData.password === formData.confirmPassword && formData.password !== "",
    }));
  }, [formData]);

  const isFormValid = () => {
    return Object.values(validations).every((v) => v === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    try {
      const response = await resetPassword(token, formData.password);
      console.log(response);

      const { data } = response;
      console.log(data);

      toast.success("Mật khẩu đã được đặt lại thành công");
      navigate("/login");
    } catch (error) {
      toast.error("Lỗi kết nối đến server.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-sm text-gray-600">Please enter your new password below</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
              <ul className="space-y-1">
                {[
                  { key: "minLength", text: "At least 8 characters" },
                  { key: "hasUpper", text: "One uppercase letter" },
                  { key: "hasLower", text: "One lowercase letter" },
                  { key: "hasNumber", text: "One number" },
                  { key: "hasSpecial", text: "One special character" },
                  { key: "passwordsMatch", text: "Passwords match" },
                ].map(({ key, text }) => (
                  <li key={key} className="flex items-center text-sm">
                    {validations[key] ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <FaTimes className="text-red-500 mr-2" />
                    )}
                    <span className={validations[key] ? "text-green-500" : "text-red-500"}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              isFormValid() && !isLoading ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out`}
          >
            {isLoading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
