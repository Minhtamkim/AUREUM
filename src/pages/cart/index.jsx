import { useDispatch, useSelector } from "react-redux";
import cartSlice, {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  applyVoucher,
  removeSelectedItems,
} from "../../redux/features/cartSlice";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/api.order";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { getAllVouchers, getVoucherById } from "../../services/api.voucher";
import { Store } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { showError, showMessage } from "../../utils/message";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { cart, totalPrice, discountedTotal, appliedVoucher } = useSelector((state) => state.cart);
  const [voucherCode, setVoucherCode] = useState(""); // ✅ State lưu mã voucher
  const [discountAmount, setDiscountAmount] = useState(0); // ✅ Số tiền giảm giá
  const handleShopNow = () => {
    navigate("/products");
  };

  // ✅ Thêm state để lưu ảnh đang xem
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Khi bấm vào ảnh -> Lưu ảnh vào state
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // ✅ Đóng modal xem ảnh
  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      showError({ content: "Cần chọn ít nhất 1 sản phẩm để mua!!" });
      return;
    }

    const selectedProducts = cart.cart.filter((item) => selectedItems.includes(item.id));

    const data = {
      details: selectedProducts.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      voucherCode: voucherCode.trim() ? voucherCode : null,
      discountAmount: voucherCode.trim() ? discountAmount : 0,
      totalAmount: finalPrice,
    };
    console.log(data);

    console.log(finalPrice);
    try {
      const response = await createOrder(data);
      if (response) {
        window.location.href = response;
        // dispatch(removeSelectedItems(selectedItems)); // Xóa các sản phẩm đã chọn
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      showError("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);

  // Xử lý chọn/bỏ chọn sản phẩm
  const handleCheckboxChange = (productId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId) ? prevSelected.filter((id) => id !== productId) : [...prevSelected, productId]
    );
  };

  api.get("voucher").then((res) => console.log(res.data));

  const handleApplyVoucher = async () => {
    let code = voucherCode.trim();

    if (!code) {
      setDiscountAmount(0);
      dispatch(applyVoucher(0));
      return;
    }

    try {
      const vouchers = await getAllVouchers();
      if (!vouchers || vouchers.length === 0) {
        showError({ content: "Không thể lấy danh sách voucher, vui lòng thử lại!" });
        return;
      }
      const foundVoucher = vouchers.find((v) => v.code === code);

      if (foundVoucher) {
        let cartTotal = calculateCartTotal();
        let discount = 0;

        if (foundVoucher.discountTypeEnum === "PERCENT") {
          discount = (cartTotal * foundVoucher.discountPrice) / 100;
        } else {
          discount = foundVoucher.discountPrice;
        }

        // Giảm giá không được lớn hơn tổng tiền
        discount = Math.min(discount, cartTotal);

        setDiscountAmount(discount);
        dispatch(applyVoucher(discount));
        console.log("Discount Amount sau khi dispatch:", discount);

        showMessage({ content: `Áp dụng mã giảm giá thành công! Giảm ${discount.toLocaleString("vi-VN")} VNĐ` });
      } else {
        showError({ content: "Mã giảm giá không hợp lệ hoặc đã hết hạn!" });
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra mã giảm giá:", error);
      showError({ content: "Không thể kiểm tra mã giảm giá, vui lòng thử lại!" });
    }
  };

  const calculateCartTotal = () => {
    return cart.cart
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0);
  };

  const totalPrice = cart.cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  // const finalPrice = totalPrice - discountAmount;

  //nee
  const finalPrice = (totalPrice || 0) - (discountAmount || 0);

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
              <div
                key={item?.id}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
              >
                <input
                  type="checkbox"
                  className="mr-4 cursor-pointer"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                {/* <img src={item?.image} alt={item?.name} className="w-24 h-24 object-cover rounded-lg" /> */}
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(item.image)}
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item?.name}</h3>

                  <div className="flex gap-[100px] items-center">
                    <p className="text-gray-500">{`${item.price.toLocaleString("vi-VN")}`}VND</p>
                    {/* Số lượng sản phẩm */}
                    <div className="flex justify-center items-center bg-white shadow-lg rounded-xl overflow-hidden">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="cursor-pointer px-4 py-2 text-xl bg-gray-200 hover:bg-gray-300 active:scale-90 transition-all duration-200"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className=" w-10 h-10 text-center   font-semibold  border-none outline-none"
                        readOnly
                      />
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="cursor-pointer px-4 py-2 text-xl bg-gray-200 hover:bg-gray-300 active:scale-90 transition-all duration-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item?.id))}
                      className=" flex gap-1.5 items-center text-red-500 hover:scale-115 cursor-pointer transition-transform duration-200"
                    >
                      <RiDeleteBin6Line className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg h-[300px]">
            <h3 className="text-xl font-semibold">🧾 Hóa đơn của bạn</h3>

            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="w-full p-2 mt-2 border rounded-lg"
            />
            <button
              onClick={handleApplyVoucher}
              className="cursor-pointer w-full bg-blue-500 text-white py-2 mt-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Áp Dụng
            </button>
            <p className="mt-2">
              Tổng cộng: <span className="text-orange-600">{finalPrice.toLocaleString("vi-VN")} VND</span>
            </p>
            <button
              onClick={() => handleCheckout()}
              className="cursor-pointer w-full bg-[#494946] text-white py-2 mt-4 rounded-lg font-semibold hover:bg-[#333331]"
            >
              Thanh Toán
            </button>
            <button
              onClick={() => {
                dispatch(clearCart());
              }}
              type="primary"
              className="cursor-pointer w-full bg-[#494946] text-white py-2 mt-4 rounded-lg font-semibold hover:bg-[#333331]"
            >
              Xóa Giỏ Hàng
            </button>
          </div>
        </div>
      )}

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="relative p-4 bg-white rounded-lg shadow-lg"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Hình ảnh phóng to */}
            <img
              src={selectedImage}
              alt="Product Preview"
              className="w-auto h-auto max-w-[80vw] max-h-[90vh] object-contain rounded-lg"
            />

            {/* Nút đóng đẹp hơn */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700-500 transition-all"
            >
              ✖
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
