/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { HiMiniPlusSmall, HiMiniMinusSmall } from "react-icons/hi2"; // Icon xổ xuống
import { Button, Popconfirm } from "antd";
import FeedbackPopup from "../../../components/feedbackPopup";
import { createRating, createReport } from "../../../services/api.feedback";
import api from "../../../config/axios";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { cancelOrder } from "../../../services/api.order";
import { showMessage } from "../../../utils/message";

const OrdersHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null); // Đơn hàng đang mở rộng
  const [popupMode, setPopupModel] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpenPopup = (mode) => {
    setPopupModel(mode);
  };
  const handleClosePopup = () => {
    setPopupModel(null);
  };

  const handleSubmit = async (data) => {
    if (popupMode === "rating") {
      const newData = {
        ...data,
        orderDetailId: selectedOrderDetail?.id,
        image: data.image,
      };
      const response = await createRating(newData);
      console.log(response);
      // Hiển thị thông báo
      showMessage({ content: "Đánh giá thành công!" });
      console.log("Thông báo hiển thị:", successMessage);

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage("");
        console.log("Thông báo ẩn");
      }, 3000);
      fetchOrders();
    } else {
      const newData = {
        ...data,
        orderId: selectedOrder?.id,
        image: data.image,
      };
      const response = await createReport(newData);
      // Hiển thị thông báo
      showMessage({ content: "Báo cáo thành công!" });
      console.log("Thông báo hiển thị:", successMessage);

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage("");
        console.log("Thông báo ẩn");
      }, 3000);

      fetchOrders();
    }
    handleClosePopup();
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);

      // Hiển thị thông báo
      showMessage({ content: "Đơn hàng đã hủy thành công!" });

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // Cập nhật trạng thái đơn hàng sau khi hủy
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELED" } : order
        )
      );
      fetchOrders();
    } catch (error) {
      // Hiển thị thông báo
      showMessage({
        content: "Hủy đơn hàng thất bại, Vui lòng thử lại!",
        type: "error",
      });

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage("");
        console.log("Thông báo ẩn");
      }, 3000);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get("order/user");
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  console.log(selectedOrder);
  console.log(selectedOrderDetail);
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-10 py-5">
      <h2 className="text-lg py-3 font-semibold ">Đơn Đặt Hàng</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : orders.length > 0 ? (
        <div className="max-w-4xl mx-auto p-4">
          {/* <h1 className="text-2xl font-bold">Đơn Đặt Hàng</h1> */}
          {orders.map((order) => (
            <div key={order?.id} className="border-b py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    {new Date(order?.createAt).toLocaleDateString()}
                  </p>
                  <p className=" text-gray-600 text-xs mt-2">
                    Mã đơn hàng #<span>{order?.id}</span>
                  </p>
                  <p
                    className={`font-sans font-bold flex mt-2 ${
                      order?.status === "CANCELLED"
                        ? "text-red-500"
                        : order?.status === "COMPLETED"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {order?.status === "COMPLETED"
                      ? "Đã Hoàn Thành"
                      : order?.status === "PAID"
                      ? "Đã Thanh Toán"
                      : order?.status === "IN_PROCESS"
                      ? "Chưa Thanh Toán"
                      : order?.status === "REFUNDED"
                      ? "Đã Hoàn Tiền"
                      : order?.status === "CANCELLED"
                      ? "Đã Hủy"
                      : ""}
                  </p>
                </div>

                <button
                  onClick={() => toggleOrderDetails(order?.id, order?.status)}
                >
                  {expandedOrder === order?.id ? (
                    <HiMiniMinusSmall />
                  ) : (
                    <HiMiniPlusSmall />
                  )}
                </button>
              </div>
              {expandedOrder === order.id && (
                <div className="mt-4">
                  {order.orderDetails?.map((orderDetails) => (
                    <div
                      key={orderDetails?.id}
                      className="flex justify-between gap-4 mb-4 "
                    >
                      <div
                        className="flex items-center gap-4 flex-1 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/products/details/${orderDetails.product.id}`
                          )
                        }
                      >
                        <img
                          src={orderDetails.product.image}
                          alt={orderDetails.product.name}
                          className="w-16 h-16 object-cover"
                        />
                        <div>
                          <p className="font-bold">
                            {orderDetails.product.name}
                          </p>
                          <p>
                            {orderDetails?.quantity} x{" "}
                            {orderDetails?.price.toLocaleString()}₫
                          </p>
                        </div>
                      </div>
                      {order?.status === "COMPLETED" &&
                        !orderDetails?.isRated && (
                          <Button
                            type="default"
                            className="!bg-transparent !border-[#EDE0D4] !text-black px-4 py-2 rounded-md transition-all duration-300 
                          hover:!bg-[#EDE0D4] hover:!text-black"
                            onClick={() => {
                              handleOpenPopup("rating");
                              setSelectedOrderDetail(orderDetails);
                            }}
                          >
                            Đánh Giá
                          </Button>
                        )}
                    </div>
                  ))}
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="flex justify-end gap-4 mt-4">
                    <p className="font-bold">
                      Tổng: {order.total.toLocaleString()} VNĐ
                    </p>
                  </div>

                  <div className="flex justify-end mt-4 gap-4">
                    {order?.status === "PAID" ? (
                      order?.isReported ? (
                        <span className="text-gray-500">Đã gửi yêu cầu</span>
                      ) : (
                        <Button
                          type="default"
                          className="!bg-transparent !border-[#EDE0D4] !text-black px-4 py-2 rounded-md transition-all duration-300 
                        hover:!bg-[#EDE0D4] hover:!text-black"
                          onClick={() => {
                            handleOpenPopup("report");
                            setSelectedOrder(order);
                          }}
                        >
                          Yêu Cầu Hoàn Tiền
                        </Button>
                      )
                    ) : null}

                    {order?.status === "IN_PROCESS" && (
                      <Popconfirm
                        title="Hủy đơn hàng"
                        description="Bạn có chắc chắn muốn hủy đơn hàng này không?"
                        okText="Hoàn thành"
                        cancelText="Hủy"
                        onConfirm={() => handleCancelOrder(order.id)}
                        okButtonProps={{
                          className:
                            "!bg-transparent !border-[#EDE0D4] !text-black px-4 py-2 rounded-md transition-all duration-300 hover:!bg-[#EDE0D4] hover:!text-black",
                        }}
                      >
                        <Button
                          type="default"
                          className="!bg-transparent !border-[#EDE0D4] !text-black px-4 py-2 rounded-md transition-all duration-300 
                        hover:!bg-[#EDE0D4] hover:!text-black"
                        >
                          Hủy đơn hàng
                        </Button>
                      </Popconfirm>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF6EE]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-8 flex justify-center"
            >
              <FaShoppingCart className="w-24 h-24 text-gray-300" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Bạn chưa có đơn hàng nào!
            </h1>
            <p className="text-gray-600 mb-8 text-lg">Hãy mua sắm ngay nào!</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="cursor-pointer bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200"
            >
              VỀ TRANG CHỦ
            </motion.button>
          </motion.div>
        </div>
      )}

      {popupMode && ( // nếu có giá trị thì show ra
        <FeedbackPopup
          visible={popupMode !== null} // khác null thì mới show popup
          onClose={handleClosePopup}
          mode={popupMode}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default OrdersHistory;
