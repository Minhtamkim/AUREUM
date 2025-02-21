import { useState } from "react";
import { FaFacebook, FaInstagram, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#2d2d2b] text-gray-300 pt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Cập Nhật Tin Tức Cùng AREUM
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="Email của bạn"
                      className="focus:outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2d2d2b] text-white rounded-md p-2 transition-colors duration-300"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <img
              src="/public/images/aureum.png"
              alt="Company Logo"
              className="h-16 w-auto mb-4 mt-4"
              onError={(e) => {
                e.target.src = "/public/images/aureum.png";
                e.target.onerror = null;
              }}
            />
            <p className="text-sm leading-7">
              CÔNG TY TNHH AUREUM SKINCARE Địa chỉ : Lô E2a-7, Đường D1, Đ. D1,
              Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000,
              Việt Nam
            </p>
            <p>Hotline: 02835359973</p>
            <p>Email: support@aureum.com</p>
          </div>

          {/* Về Aureum */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Về AUREUM</h3>
            <ul className="space-y-4">
              <span>Câu Chuyện Thương Hiệu</span>
            </ul>
          </div>

          {/* Hổ Trợ*/}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Hổ Trợ</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span>Câu Hỏi Thường Gặp</span>
              </li>
              <li className="flex items-center">
                <span>Đổi Trả Khách Hàng</span>
              </li>
            </ul>
          </div>

          {/* Thông Tin */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Thông Tin</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span>Chính Sách Bảo Mật</span>
              </li>
              <li className="flex items-center">
                <span>Điều Khoản Sử Dụng</span>
              </li>
              <li className="flex items-center">
                <span>Liên Hệ</span>
              </li>
            </ul>
            <div className="mt-10">
              <img src="/public/images/image 9.png" alt="Logo" />
            </div>
            <div className="mt-10">
              <h3 className="text-white text-lg font-semibold mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebook, label: "Facebook" },
                  { icon: FaInstagram, label: "Instagram" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-gray-800">
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Aureum Vietnam. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
