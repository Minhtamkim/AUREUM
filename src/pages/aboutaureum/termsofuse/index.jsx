function TermsofusePage() {
  return (
    <div>
      <div className="bg-[#f8f6f3] min-h-screen py-10 px-10">
        <div className="  w-full flex ">
          <div className="w-1/3 border-r pr-4 text-gray-700 px-10">
            <ul className="space-y-2 text-lg">
              <li>
                <a href="/account" className="hover:text-black -500">
                  Tài khoản
                </a>
              </li>
              <li>
                <a href="/policies" className="hover:text-black -500">
                  Phương thức vận chuyển
                </a>
              </li>
              <li>
                <a href="/deliverypolicy" className="hover:text-black -500">
                  Chính sách đặt và giao hàng
                </a>
              </li>
              <li>
                <a href="/returnpolicy" className="hover:text-black -500">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="/privacypolicy" className="hover:text-black -500">
                  Chính sách bảo mật
                </a>
              </li>
              <li className="font-semibold">Điều khoản sử dụng </li>

              <li>
                <a href="/frequentlyaskedquestions" className="hover:text-black -500">
                  Các câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full pl-20 gap-x-4">
            <nav className="text-lg text-gray-600 mb-4">
              <span className="text-gray-500">Trang chủ &gt; </span>
              <span className="font-semibold">Điều khoản sử dụng</span>
            </nav>

            <h2 className="text-2xl font-bold mb-3">Điều Khoản Sử Dụng</h2>
            <hr className="my-4 border-black -300" />

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              1. Giới thiệu
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Chúng tôi là Công ty AUREUM, vận hành sàn giao dịch thương mại điện tử qua website chính thức và tuân thủ
              các quy định của pháp luật Việt Nam.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              2. Quy định sử dụng
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Khi truy cập website AUREUM, khách hàng đồng ý tuân thủ các điều khoản sử dụng. AUREUM có quyền thay đổi,
              bổ sung nội dung bất kỳ lúc nào mà không cần báo trước. Khách hàng có trách nhiệm cập nhật thông tin để
              đảm bảo quyền lợi.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              3. Tài khoản và bảo mật
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Khách hàng phải đảm bảo thông tin đăng ký chính xác và bảo mật tài khoản cá nhân. AUREUM không chịu trách
              nhiệm đối với các tổn thất phát sinh từ việc lộ thông tin đăng nhập.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              4. Chấp nhận đơn hàng và giá cả
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM có quyền từ chối hoặc hủy đơn hàng nếu phát hiện sai sót về giá cả hoặc lỗi hệ thống. Nếu khách
              hàng đã thanh toán nhưng đơn hàng bị hủy, AUREUM sẽ hoàn lại tiền trong thời gian quy định.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              5. Điều kiện đổi trả và bảo hành
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM chỉ chấp nhận đổi trả với sản phẩm lỗi do nhà sản xuất hoặc hư hỏng trong quá trình vận chuyển theo
              chính sách đổi trả của công ty.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              6. Giải quyết tranh chấp
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Mọi tranh chấp phát sinh sẽ được giải quyết trên tinh thần hợp tác, thương lượng. Nếu không đạt được thỏa
              thuận, tranh chấp sẽ được giải quyết theo quy định của pháp luật Việt Nam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsofusePage;
