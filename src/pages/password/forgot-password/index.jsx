import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../../config/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
    if (!value) {
      setError("Vui lòng nhập email của bạn");
    } else if (!validateEmail(value)) {
      setError("Email không hợp lệ");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Vui lòng nhập email của bạn");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("forgot-password", { email });

      if (response.status === 200) {
        setShowModal(true);
      } else {
        setError(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Khôi phục mật khẩu</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    error ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={handleEmailChange}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "email-error" : undefined}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {error}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !!error || !email}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <BiLoaderAlt className="animate-spin h-5 w-5" /> : "Khôi phục mật khẩu"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Quay lại đăng nhập
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <AiOutlineClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Đã gửi email khôi phục
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Hướng dẫn khôi phục đã được gửi tới email của bạn</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  onClick={() => (window.location.href = "/resetPassword")}
                >
                  Đặt lại mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
