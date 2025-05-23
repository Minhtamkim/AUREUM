import Sidebar from "..";

function ReturnPolicyPage() {
  return (
    <div>
      <div className="bg-[#f8f6f3] min-h-screen py-10 px-10">
        <div className="  w-full flex ">
          <Sidebar />

          <div className="w-full pl-20 gap-x-4">
            <nav className="text-lg text-gray-600 mb-4">
              <span className="text-gray-500">
                {" "}
                <a href="/" className="text-xl">
                  Trang chủ
                </a>{" "}
                &gt;{" "}
              </span>
              <span className="font-semibold">Chính Sách Đổi Trả</span>
            </nav>

            <h2 className="text-2xl font-bold mb-3">Chính Sách Đổi Trả</h2>
            <hr className="my-4 border-black -300" />

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              1. Điều kiện đổi trả
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM chấp nhận đổi trả trong vòng 7 ngày nếu sản phẩm gặp lỗi từ nhà sản xuất, hư hỏng do vận chuyển
              hoặc sai sót trong đơn hàng. Sản phẩm phải còn nguyên vỏ hộp, tem nhãn và chưa qua sử dụng.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              2. Trường hợp không áp dụng
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM không hỗ trợ đổi trả nếu sản phẩm đã quá 7 ngày, đã qua sử dụng, mất tem nhãn hoặc không mua từ hệ
              thống của AUREUM.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              3. Quy trình đổi trả
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Khách hàng liên hệ với AUREUM qua hotline hoặc email để được hướng dẫn. Đối với khách tại TP.HCM, có thể
              đến trực tiếp showroom. Với khách ở tỉnh, vui lòng gửi sản phẩm qua bưu điện và cung cấp thông tin đơn
              hàng để được xử lý nhanh nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicyPage;
