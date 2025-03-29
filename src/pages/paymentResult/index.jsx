import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaHome, FaHistory } from "react-icons/fa";
import useGetParams from "../../hooks/useGetParams";
import { changeStatusOrder } from "../../services/api.order";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
// import useGetParams from "../../hooks/useGetParams";
// import { format } from "date-fns";

const PaymentResult = () => {
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "",
    amount: 0,
    paymentMethod: "VNPAY",
    transactionDate: new Date(),
  });
  const formatVNPayDate = (dateString) => {
    if (!dateString) return "";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hours = dateString.substring(8, 10);
    const minutes = dateString.substring(10, 12);
    const seconds = dateString.substring(12, 14);

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  const getParams = useGetParams();
  const status = getParams("vnp_TransactionStatus");
  const orderId = getParams("orderId") || "";

  useEffect(() => {
    const amount = getParams("vnp_Amount") / 100;
    const bank = getParams("vnp_BankCode");
    const date = getParams("vnp_PayDate");

    setOrderDetails({ orderId, amount, bank, date });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const changeStatus = async () => {
    let statusEnums;
    if (status == "00") {
      setPaymentStatus(true);
      statusEnums = "PAID";
    } else {
      setPaymentStatus(false);
      statusEnums = "IN_PROCESS";
    }

    const response = await changeStatusOrder(orderId, statusEnums);
    if (response?.status == "PAID") {
      dispatch(clearCart());
    }
    setOrder(response);
    console.log(response);
  };

  useEffect(() => {
    changeStatus();
  }, []);

  const failureReasons = [
    "Insufficient funds in the account",
    "Card has been declined",
    "Network connection error occurred",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className={`p-8 ${paymentStatus ? "bg-green-50" : "bg-red-50"}`}>
          {paymentStatus ? (
            <div className="text-center">
              <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 animate-bounce" />
              <h2 className="mt-4 text-3xl font-bold text-green-800">Payment Successful!</h2>
              <div className="mt-6 space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-semibold">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">{`${orderDetails.amount.toLocaleString("vi-VN")} VND`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-semibold">{orderDetails.bank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-semibold">{formatVNPayDate(orderDetails.date)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <FaTimesCircle className="mx-auto h-16 w-16 text-red-500 animate-bounce" />
              <h2 className="mt-4 text-3xl font-bold text-red-800">Payment Failed!</h2>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-red-700 mb-4">Possible Reasons:</h3>
                <ul className="text-left space-y-2">
                  {failureReasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-gray-600">Please try again or contact support if the issue persists.</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 space-y-4">
          <button
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={() => (window.location.href = "/")}
          >
            <FaHome className="mr-2" /> Return to Home
          </button>
          <button
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={() => navigate("/historyOrders")}
          >
            <FaHistory className="mr-2" /> View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
