import Sidebar from "..";

function PoliciesShipping() {
  return (
    <div>
      <div className="bg-[#f8f6f3] min-h-screen py-10 px-10">
        <div className="  w-full flex ">
          <Sidebar />

          <div className="w-full pl-20  gap-x-4 ">
            <nav className="text-lg text-gray-600 mb-4">
              <span className="text-gray-500">
                {" "}
                <a href="/" className="text-xl">
                  Trang chủ
                </a>{" "}
                &gt;{" "}
              </span>
              <span className="font-semibold">Phương thức vận chuyển</span>
            </nav>

            <h2 className="text-2xl font-bold mb-3">Phí vận chuyển tại Aureum</h2>
            <hr className="my-4 border-black -300" />

            <p className="text-gray-700 leading-relaxed mb-3">
              Aureum miễn phí vận chuyển tại các tỉnh/thành phố có cửa hàng của Aureum cho các đơn hàng từ
              <strong> 90.000đ</strong> trở lên. Các đơn hàng dưới 90.000đ quý khách chỉ mất
              <strong> 10.000đ</strong> phí vận chuyển.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Đối với những khách hàng thuộc các tỉnh/thành phố không có cửa hàng Aureum sẽ miễn phí vận chuyển đối với
              đơn hàng từ <strong>249.000đ</strong> trở lên. Đơn hàng dưới 249.000đ có cước phí vận chuyển là{" "}
              <strong>25.000đ</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoliciesShipping;
