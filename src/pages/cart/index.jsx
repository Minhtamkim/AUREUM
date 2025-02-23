import { useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]); // Bắt đầu với giỏ hàng trống

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng ({cart.length} sản phẩm)</h2>

      {cart.length === 0 ? (
        // Hiển thị nếu giỏ hàng trống
        <div className="flex flex-col items-center justify-center py-10">
          <svg
            className="w-20 h-20 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2 0h-.4m1 0L5 21h14"
            ></path>
          </svg>
          <p className="text-gray-500 mt-4">Bạn chưa chọn sản phẩm.</p>
          <a href="/" className="mt-4 px-6 py-2 bg-[#caa485] text-white rounded-lg hover:bg-[#cea861]">
            Tiếp tục mua sắm
          </a>
        </div>
      ) : (
        // Hiển thị nếu có sản phẩm
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500 line-through">{item.price.toLocaleString()} đ</p>
                  <p className="text-orange-600 font-bold">{item.discountPrice.toLocaleString()} đ</p>
                </div>
                <button onClick={() => handleRemove(item.id)} className="text-red-500">
                  ❌ Xóa
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">🧾 Hóa đơn của bạn</h3>
            <p className="flex justify-between text-lg mt-4">
              <span>Tạm tính:</span>
              <span>{cart.reduce((total, item) => total + item.discountPrice, 0).toLocaleString()} đ</span>
            </p>
            <p className="flex justify-between text-gray-500">
              <span>Giảm giá:</span>
              <span>-0 đ</span>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between text-xl font-bold">
              <span>Tổng cộng:</span>
              <span className="text-orange-600">
                {cart.reduce((total, item) => total + item.discountPrice, 0).toLocaleString()} đ
              </span>
            </p>
            <button className="w-full bg-orange-500 text-white py-2 mt-4 rounded-lg font-semibold hover:bg-orange-600">
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
