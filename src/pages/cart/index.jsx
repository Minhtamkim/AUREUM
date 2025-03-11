import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../../redux/features/cartSlice";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white ">
      <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng ({cart?.length} sản phẩm)</h2>

      {!cart.cart?.length ? (
        // Hiển thị nếu giỏ hàng trống
        <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-8 flex justify-center"
            >
              <FaShoppingCart className="w-24 h-24 text-gray-300" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">Giỏ Hàng Trống</h1>

            <p className="text-gray-600 mb-8 text-lg">Hãy Mua Những Gì Bạn Thích</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShopNow}
              className="cursor-pointer bg-[#454542] hover:bg-[#2d2d2b] text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tìm Kiếm Sản Phẩm
            </motion.button>
          </motion.div>
        </div>
      ) : (
        // Hiển thị nếu có sản phẩm

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2  bg-gray-100 p-4 rounded-lg">
            {cart.cart?.map((item) => (
              <div key={item?.id} className="flex items-center justify-between p-4 border-b">
                <img src={item?.image} alt={item?.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item?.name}</h3>

                  <div className="flex gap-[100px] items-center">
                    <p className="text-gray-500">{item.price.toLocaleString("vi-VN")}.000đ</p>
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
            <span className="text-orange-600">{"  " + cart?.totalPrice.toLocaleString("vi-VN")}.000đ</span>
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
