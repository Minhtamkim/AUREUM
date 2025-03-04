import Sidebar from "..";

function PrivacyPolicyPage() {
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
              <span className="font-semibold">Chính sách bảo mật</span>
            </nav>

            <h2 className="text-2xl font-bold mb-3">Chính Sách Bảo Mật</h2>
            <hr className="my-4 border-black -300" />

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              Mục đích
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM cam kết bảo vệ thông tin khách hàng, đảm bảo an toàn khi truy cập và giao dịch trên website.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              Cập nhật thông tin khách hàng
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Khách hàng cần cung cấp thông tin chính xác khi đăng ký tài khoản hoặc giao dịch. AUREUM không chịu trách
              nhiệm nếu thông tin sai ảnh hưởng đến quyền lợi khách hàng.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              Lưu giữ và bảo mật thông tin
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM cam kết không bán, chia sẻ thông tin cá nhân khách hàng vì mục đích thương mại. Hệ thống bảo mật
              chặt chẽ, phòng chống truy cập trái phép. Khách hàng cần bảo mật tài khoản, không chia sẻ thông tin cá
              nhân.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              Sử dụng thông tin
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AUREUM sử dụng thông tin để cung cấp dịch vụ, hỗ trợ khách hàng, ngăn chặn gian lận.
            </p>

            <h2 className="text-lg font-bold mb-3 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-400 after:mt-1">
              Chia sẻ thông tin
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Chỉ chia sẻ theo quy định pháp luật, phục vụ dịch vụ khách hàng, nghiên cứu thị trường. Khách hàng sẽ được
              thông báo nếu cần chia sẻ với bên thứ ba. AUREUM luôn sẵn sàng bảo vệ quyền lợi khách hàng với các biện
              pháp an toàn cao nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
