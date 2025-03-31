import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get orderId from URL
import { getAllOrders } from "../../../services/api.order";
import { Card, Col, Row, Table } from "antd";
import dayjs from "dayjs";

function ManageOrderDetails() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams(); // Get orderId from URL

  // Fetch all orders
  const fetchOrders = async () => {
    const data = await getAllOrders();
    const orderDetail = data.find((order) => order.id === parseInt(orderId)); // Filter order by orderId
    setOrder(orderDetail);
  };

  useEffect(() => {
    fetchOrders();
  }, [orderId]); // Reload when orderId changes

  if (!order) return <div className="text-center text-xl mt-10">Loading...</div>; // Show loading when data is not loaded

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (product) => (
        <div className="flex items-center">
          <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover mr-4" />
          <span className="text-sm font-medium text-gray-800">{product.name}</span>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      className: "text-sm text-center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + " VND",
      className: "text-sm text-center",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      render: (subtotal) => new Intl.NumberFormat("vi-VN").format(subtotal) + " VND",
      className: "text-sm text-center",
    },
    {
      title: "Created Date",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => {
        // Sử dụng dayjs để xử lý ngày tháng
        const formattedDate = dayjs(createAt).format("YYYY-MM-DD HH:mm:ss"); // Định dạng theo nhu cầu
        return dayjs(createAt).isValid() ? formattedDate : "Invalid Date";
      },
    },
  ];

  // Add calculated subtotal for each order item
  const orderItems = order.orderDetails.map((item) => ({
    ...item,
    subtotal: item.quantity * item.price, // Calculate subtotal
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card
          title={<h2 className="text-2xl font-semibold">{`Order #${order.id}`}</h2>}
          bordered={false}
          className="shadow-lg"
        >
          <h3 className=" text-gray-900 mb-4">{`CreateAt: ${dayjs(order.createAt).format("YYYY-MM-DD HH:mm:ss")}`}</h3>{" "}
          <Row gutter={16}>
            {/* Customer Information Section */}
            <Col span={12} className="border-r border-gray-200 pr-6 flex-wrap">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h3>
              <p className="text-sm font-medium text-gray-700 mt-4">
                <strong>Name:</strong> {order.account.fullName}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-4">
                <strong>Email:</strong> {order.account.email}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-4">
                <strong>Phone:</strong> {order.account.phone}
              </p>
            </Col>

            {/* Order Status and Total Section */}
            <Col span={12} className="pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 ml-4">Order Status</h3>
              <p className="text-sm font-medium text-gray-700 ml-4">
                <strong>Status:</strong>{" "}
                {order.status === "PAID"
                  ? "Đã Thanh Toán"
                  : order.status === "CANCELLED"
                  ? "Đã Hủy"
                  : order.status === "REFUNDED"
                  ? "Đã Hoàn Tiền"
                  : order.status === "COMPLETED"
                  ? "Đã Hoàn Thành"
                  : order.status === "IN_PROCESS"
                  ? "Chưa Thanh Toán"
                  : order.status}
              </p>
            </Col>
          </Row>
          {/* Order Items Section */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-9 ">Order Items</h3>
          <Table
            columns={columns}
            dataSource={orderItems} // Pass the modified orderItems with subtotal
            rowKey="id"
            pagination={false}
            bordered
            className="rounded-lg shadow-sm"
          />
          <Col className="pl-6 max-w-auto flex-wrap ">
            {/* Subtotal Calculation */}
            <p className="text-sm font-medium text-gray-700 text-right mt-9">
              <strong>Subtotal:</strong>
              {new Intl.NumberFormat("vi-VN").format(
                order.orderDetails.reduce((total, item) => total + item.quantity * item.price, 0)
              )}{" "}
              VND
            </p>
            <p className="text-sm font-medium text-gray-700 text-right mt-4">
              <strong>Discount:</strong>{" "}
              {order.discountAmount ? new Intl.NumberFormat("vi-VN").format(order.discountAmount) + "VND" : "None"}
            </p>
            <p className="text-sm font-medium text-gray-700 text-right mt-4">
              <strong>Voucher:</strong> {order.voucher && order.voucher.code ? order.voucher.code : "None"}
            </p>

            <p className="text-sm font-medium text-gray-700 text-right mt-4">
              <strong>Total:</strong> {new Intl.NumberFormat("vi-VN").format(order.finalTotal)} VND
            </p>
          </Col>
        </Card>
      </div>
    </div>
  );
}

export default ManageOrderDetails;
