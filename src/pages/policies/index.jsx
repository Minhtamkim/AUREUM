import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-1/3 border-r pr-4 text-gray-700 px-10">
      <ul className="space-y-2 text-lg">
        <li>
          <Link to="/accountPolicy" className="hover:text-black">
            Tài khoản
          </Link>
        </li>
        <li>
          <Link to="/policiesShipping" className="hover:text-black">
            Phương thức vận chuyển
          </Link>
        </li>
        <li>
          <Link to="/deliveryPolicy" className="hover:text-black">
            Chính sách đặt và giao hàng
          </Link>
        </li>
        <li>
          <Link to="/returnPolicy" className="hover:text-black">
            Chính sách đổi trả
          </Link>
        </li>
        <li>
          <Link to="/privacyPolicy" className="hover:text-black">
            Chính sách bảo mật
          </Link>
        </li>
        <li>
          <Link to="/termsOfUse" className="hover:text-black">
            Điều khoản sử dụng
          </Link>
        </li>
        <li>
          <Link to="/frequentlyAskedQuestions" className="hover:text-black">
            Các câu hỏi thường gặp
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-black">
            Liên hệ
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
