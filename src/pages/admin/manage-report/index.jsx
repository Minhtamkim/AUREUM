import { Button, Dropdown, Input, Menu, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { CloseCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getAllReports } from "../../../services/api.report";
import { refundOrder } from "../../../services/api.order";

function ManageReport() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredReports, setFilteredReports] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const data = await getAllReports(); // Lấy danh sách đơn hàng từ API
    setReports(data);
    setFilteredReports(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Tạo menu dropdown cho Action
  const menu = (id, status) => (
    <Menu>
      {/* Reject button chỉ hiển thị khi status không phải là CANCELLED hoặc COMPLETED */}
      <Menu.Item
        key="2"
        onClick={() => handleRefundOrder(id)} // Gọi hàm handleCancel
        style={{
          opacity: status === "CANCELLED" || status === "COMPLETED" ? 0.5 : 1, // Làm mờ nút khi trạng thái là CANCELLED hoặc COMPLETED
          cursor: status === "CANCELLED" || status === "COMPLETED" ? "not-allowed" : "pointer", // Đổi con trỏ khi không thể click
        }}
      >
        <Tag color="red" icon={<CloseCircleOutlined />}>
          Refund
        </Tag>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "OrderID",
      dataIndex: "order", // Dùng "order.id" để truy cập id của order
      key: "orderId",
      render: (order) => <span>{order.id}</span>, // Hiển thị ID của order
      //   sorter: (a, b) => a.order.id - b.order.id, // Sắp xếp theo ID của order
    },
    {
      title: "Status",
      dataIndex: "order",
      key: "status",
      render: (order) => <span>{order.status}</span>,
      //   render: (status) => {
      //     let color;
      //     let icon;

      //     switch (status) {
      //       case "IN_PROCESS":
      //         color = "orange";
      //         icon = <ClockCircleOutlined />;
      //         break;
      //       case "PAID":
      //         color = "blue";
      //         icon = <BellOutlined />;
      //         icon;
      //         break;
      //       case "COMPLETED":
      //         color = "green";
      //         icon = <CheckCircleOutlined />;
      //         break;
      //       case "CANCELLED":
      //         color = "red";
      //         icon = <CloseCircleOutlined />;
      //         break;
      //       default:
      //         color = "default";
      //         icon = null;
      //     }
      //     return (
      //       <Tag color={color} icon={icon}>
      //         {status}
      //       </Tag>
      //     );
      //   },
      //   filters: [
      //     { text: "In Process", value: "IN_PROCESS" },
      //     { text: "Paid", value: "PAID" },
      //     { text: "Completed", value: "COMPLETED" },
      //     { text: "Cancelled", value: "CANCELLED" },
      //   ],
      //   onFilter: (value, record) => record.status.includes(value),
      //   sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Products",
      dataIndex: "order", // Truy cập vào mảng orderDetails
      key: "image",
      render: (order) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {order.orderDetails.map((item, index) => (
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
      title: "Customer", // Tiêu đề của cột
      dataIndex: "order", // Truy cập vào fullName của account
      key: "accountName",
      render: (order) => <span>{order.account.fullName}</span>, // Hiển thị tên đầy đủ của khách hàng
      sorter: (a, b) => a.order.account.fullName.localeCompare(b.order.account.fullName),
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
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, // Sắp xếp theo giá trị số
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      sorter: (a, b) => a.reason.localeCompare(b.reason),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Action",
      dataIndex: "order",
      key: "id",
      render: (order, record) => {
        return (
          <Dropdown overlay={menu(order.id, record.status)} trigger={["click"]}>
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

    const filtered = reports.filter(
      (report) =>
        removeDiacritics(report.account?.fullName.toLowerCase()).includes(normalizedValue) ||
        report.id.toString().includes(normalizedValue)
    );

    setFilteredReports(filtered);
  };

  const handleRefundOrder = async (id) => {
    // Gọi API cập nhật trạng thái đơn hàng
    console.log("dd");
    const response = await refundOrder(id);
    // Sau khi cập nhật thành công, cập nhật lại danh sách đơn hàng
  };

  return (
    <div>
      <Input
        placeholder="Tìm kiếm đơn hàng theo id, customer..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 350, marginLeft: 12 }}
      />

      <Table dataSource={filteredReports.filter((report) => !report.deleted)} columns={columns} rowKey="id" />
    </div>
  );
}

export default ManageReport;
