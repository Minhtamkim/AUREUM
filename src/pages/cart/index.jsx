import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/features/cartSlice";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        🛒 Giỏ hàng ({cart.length} sản phẩm)
      </h2>

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
          <a
            href="/"
            className="mt-4 px-6 py-2 bg-[#caa485] text-white rounded-lg hover:bg-[#cea861]"
          >
            Tiếp tục mua sắm
          </a>
        </div>
      ) : (
        // Hiển thị nếu có sản phẩm

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2  bg-gray-100 p-4 rounded-lg">
            {cart.cart?.map((item) => (
              <div
                key={item?.id}
                className="flex items-center justify-between p-4 border-b"
              >
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item?.name}</h3>

                  <div className="flex gap-[100px] items-center">
                    <p className="text-gray-500">
                      {item.price.toLocaleString("vi-VN")}.000đ
                    </p>
                    {/* Số lượng sản phẩm */}
                    <div className="flex items-center border rounded-md px-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-md"
                      >
                        ➖
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="w-12 text-center border-none outline-none bg-transparent"
                        readOnly
                      />
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-md"
                      >
                        ➕
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item?.id))}
                      className=" 
                        flex gap-1.5 items-center text-red-500"
                    >
                      <MdDelete />
                      <h3>Xóa Sản Phẩm</h3>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg h-[200px]">
            <h3 className="text-xl font-semibold">🧾 Hóa đơn của bạn</h3>

            <span>Tổng cộng:</span>
            <span className="text-orange-600">
              {"  " + cart?.totalPrice.toLocaleString("vi-VN")}.000đ
            </span>
            {/* </p> */}
            <button className="w-full bg-[#494946] text-white py-2 mt-4 rounded-lg font-semibold hover:bg-[#333331]">
              Thanh Toán
            </button>
            <button
              onClick={() => {
                dispatch(clearCart());
              }}
              type="primary"
              className="w-full bg-[#494946] text-white py-2 mt-4 rounded-lg font-semibold hover:bg-[#333331]"
            >
              Xóa Giỏ Hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
