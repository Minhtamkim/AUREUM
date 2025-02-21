function FrequentlyaskedquestionsPage() {
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

              <li>
                <a href="/termsofuse" className="hover:text-black -500">
                  Điều khoản sử dụng
                </a>
                <li className="font-semibold">Các câu hỏi thường gặp </li>
              </li>
            </ul>
          </div>

          <div className="w-full pl-20 gap-x-4">Updating.....</div>
        </div>
      </div>
    </div>
  );
}

export default FrequentlyaskedquestionsPage;
