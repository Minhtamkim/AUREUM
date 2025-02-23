function DeliveryPolicyPage() {
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
              <li className="font-semibold">Chính sách đặt và giao hàng</li>
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
              </li>
              <li>
                <a
                  href="/frequentlyaskedquestions"
                  className="hover:text-black -500"
                >
                  Các câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full pl-20 gap-x-4">
            <nav className="text-lg text-gray-600 mb-4">
              <span className="text-gray-500">
                {" "}
                <a href="/" className="text-xl">
                  Trang chủ
                </a>{" "}
                &gt;{" "}
              </span>
              <span className="font-semibold">Hướng dẫn đặt hàng</span>
            </nav>

            <h2 className="text-2xl font-bold mb-3">Hướng Dẫn Đặt Hàng</h2>
            <hr className="my-4 border-black -300" />

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              1. Tìm kiếm sản phẩm
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Quý khách có thể tìm sản phẩm bằng cách nhập tên vào thanh tìm
              kiếm hoặc duyệt qua danh mục sản phẩm, thương hiệu, hoặc các sản
              phẩm bán chạy nhất.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              2. Đặt hàng
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Khi tìm thấy sản phẩm mong muốn, bấm vào hình hoặc tên sản phẩm để
              xem chi tiết. Chọn Mua ngay hoặc Thêm vào giỏ hàng để tiếp tục.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              3. Đăng nhập hoặc đăng ký tài khoản
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Quý khách cầncần đăng nhập để đặt hàng để AUREUM có thông tin nhận
              hàng chính xác.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              4. Điền địa chỉ nhận hàng
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Quý khách nhập địa chỉ nhận hàng chính xác để đảm bảo giao hàng
              đúng địa điểm.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              5. Chọn phương thức thanh toán
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Quý khách có thể chọn thanh toán khi nhận hàng (COD), thanh toán
              online qua ngân hàng, ví điện tử.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              6. Kiểm tra và xác nhận đơn hàng
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Sau khi hoàn tất đặt hàng, hệ thống sẽ gửi mã số đơn hàng để quý
              khách theo dõi tình trạng đơn hàng.
            </p>

            <h2 className="text-2xl font-bold mb-3">Quy Trình Giao Hàng</h2>
            <hr className="my-4 border-black -300" />

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              Thời gian và quy trình giao hàng
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM sẽ liên lạc để thống nhất thời gian giao hàng trong vòng
              24-48 giờ. Trường hợp chậm trễ do nguyên nhân khách quan, chúng
              tôi sẽ thông báo sớm nhất.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              Điều kiện đổi trả
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Chỉ nhận đổi trả sản phẩm bị lỗi từ nhà sản xuất hoặc hư hỏng
              trong quá trình vận chuyển trong vòng 7 ngày.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryPolicyPage;
