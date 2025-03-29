import { Button, Dropdown, Input, Menu, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { cancelOrder, completedOrder, getAllOrders } from "../../../services/api.order";
import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function ManageOrder() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredOrders, setFilteredOrders] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getAllOrders();
    setOrders(data);
    setFilteredOrders(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Tạo menu dropdown cho Action
  const menu = (id, status) => (
    <Menu>
      {/* Accept button chỉ hiển thị khi status là PAID và ẩn mờ khi status là CANCELLED hoặc IN_PROCESS */}
      <Menu.Item
        key="1"
        onClick={() => handleCompleteOrder(id, status)} // Gọi hàm handleComplete
        style={{
          opacity: status === "PAID" ? 1 : 0.5, // Làm mờ nút khi không phải trạng thái PAID
          cursor: status === "PAID" ? "pointer" : "not-allowed", // Đổi con trỏ khi không thể click
        }}
      >
        <Tag color="green" icon={<CheckCircleOutlined />}>
          Accept
        </Tag>
      </Menu.Item>

      {/* Reject button chỉ hiển thị khi status không phải là CANCELLED hoặc COMPLETED */}
      <Menu.Item
        key="2"
        onClick={() => handleCancelOrder(id, status)} // Gọi hàm handleCancel
        style={{
          opacity: status === "CANCELLED" || status === "COMPLETED" ? 0.5 : 1, // Làm mờ nút khi trạng thái là CANCELLED hoặc COMPLETED
          cursor: status === "CANCELLED" || status === "COMPLETED" ? "not-allowed" : "pointer", // Đổi con trỏ khi không thể click
        }}
      >
        <Tag color="red" icon={<CloseCircleOutlined />}>
          Reject
        </Tag>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, // Sắp xếp theo giá trị số
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let icon;

        switch (status) {
          case "IN_PROCESS":
            color = "orange";
            icon = <ClockCircleOutlined />;
            break;
          case "PAID":
            color = "blue";
            icon = <BellOutlined />;
            icon;
            break;
          case "COMPLETED":
            color = "green";
            icon = <CheckCircleOutlined />;
            break;
          case "CANCELLED":
            color = "red";
            icon = <CloseCircleOutlined />;
            break;
          default:
            color = "default";
            icon = null;
        }
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
      filters: [
        { text: "In Process", value: "IN_PROCESS" },
        { text: "Paid", value: "PAID" },
        { text: "Completed", value: "COMPLETED" },
        { text: "Cancelled", value: "CANCELLED" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Products",
      dataIndex: "orderDetails",
      key: "image",
      render: (orderDetails) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {orderDetails.map((item, index) => (
            <img
              key={index}
              src={item.product.image}
              alt={item.product.name}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "finalTotal",
      key: "finalTotal",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + ".VND",
      sorter: (a, b) => a.finalTotal - b.finalTotal, // Sắp xếp theo giá trị số
    },
    {
      title: "Customer",
      dataIndex: "account",
      key: "accountName",
      render: (account) => account?.fullName, // Hiển thị tên tài khoản
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
      sorter: (a, b) => (dayjs(a.CreateAt).isBefore(dayjs(b.CreateAt)) ? -1 : 1), // Sắp xếp theo thời gian
      sortDirections: ["ascend", "descend"], // Chỉ sắp xếp theo 2 hướng
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <Dropdown overlay={menu(id, record.status)} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const normalizedValue = removeDiacritics(value.toLowerCase()); // Chuẩn hóa từ khóa tìm kiếm

    const filtered = orders.filter(
      (order) =>
        removeDiacritics(order.account?.fullName.toLowerCase()).includes(normalizedValue) ||
        order.id.toString().includes(normalizedValue)
    );

    setFilteredOrders(filtered);
  };

  const handleCompleteOrder = async (id, status) => {
    if (status === "PAID") {
      try {
        const response = await completedOrder(id); // Sử dụng API completedOrder
        console.log(response);
        toast.success("Order status updated to COMPLETED");
      } catch (error) {
        toast.error(error.response.data);
      }
    } else {
      toast.error("Cannot complete an order that is not paid.");
    }
    fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
  };

  const handleCancelOrder = async (id, status) => {
    if (status === "COMPLETED" || status === "CANCELLED") {
      toast.error("Cannot cancel a completed order.");
    } else {
      try {
        const response = await cancelOrder(id); // Sử dụng API cancelOrder
        console.log(response);
        toast.success("Order status updated to CANCELLED");
      } catch (error) {
        toast.error(error.response.data);
      }
    }
    fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
  };

  return (
    <div>
      <Input
        placeholder="Tìm kiếm đơn hàng theo id, customer..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 350, marginLeft: 12 }}
      />

      <Table dataSource={filteredOrders.filter((order) => !order.deleted)} columns={columns} rowKey="id" />
    </div>
  );
}

export default ManageOrder;
