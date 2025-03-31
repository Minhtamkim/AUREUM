import { Button, Dropdown, Image, Input, Menu, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { BellOutlined, CheckCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getAllReports } from "../../../services/api.report";
import { refundOrder } from "../../../services/api.order";
import { showMessage } from "../../../utils/message";
import { useNavigate } from "react-router-dom";

function ManageReport() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredReports, setFilteredReports] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const fetchReports = async () => {
    const data = await getAllReports(); // Lấy danh sách đơn hàng từ API
    const sortedDate = data.sort((a, b) => b.id - a.id); // Sắp xếp theo ID giảm dần
    setReports(sortedDate);
    setFilteredReports(sortedDate); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Tạo menu dropdown cho Action
  const menu = (id, status) => (
    <Menu>
      {/* Reject button chỉ hiển thị khi status không phải là CANCELLED hoặc COMPLETED */}
      <Menu.Item
        onClick={() => handleRefundOrder(id)} // Gọi hàm handleCancel
        style={{
          opacity: status === "REFUNDED" ? 0.5 : 1, // Làm mờ nút khi trạng thái là CANCELLED hoặc COMPLETED
          cursor: status === "REFUNDED" ? "not-allowed" : "pointer", // Đổi con trỏ khi không thể click
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
      render: (order) => `#${order.id}`, // Thêm dấu "#" trước ID
      sorter: (a, b) => a.order.id - b.order.id, // Sắp xếp theo ID của order
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },
    {
      title: "Status",
      dataIndex: "order", // Dữ liệu trong "order"
      key: "status",
      render: (order) => {
        let color;
        let icon;

        switch (order.status) {
          case "PAID":
            color = "blue";
            icon = <BellOutlined />;
            break;
          case "COMPLETED":
            color = "green";
            icon = <CheckCircleOutlined />;
            break;

          default:
            color = "default";
            icon = null;
        }

        return (
          <Tag color={color} icon={icon}>
            {order.status} {/* Hiển thị status của order */}
          </Tag>
        );
      },
      filters: [
        { text: "PAID", value: "PAID" },
        { text: "COMPLETED", value: "COMPLETED" },
        { text: "REFUNDED", value: "REFUNDED" },
      ],
      onFilter: (value, record) => record.order.status.includes(value), // Kiểm tra theo status trong order
      sorter: (a, b) => a.order.status.localeCompare(b.order.status), // Sắp xếp theo status trong order
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
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
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },

    {
      title: "Customer", // Tiêu đề của cột
      dataIndex: "order", // Truy cập vào fullName của account
      key: "accountName",
      render: (order) => <span>{order.account.fullName}</span>, // Hiển thị tên đầy đủ của khách hàng
      sorter: (a, b) => a.order.account.fullName.localeCompare(b.order.account.fullName),
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },
    {
      title: "Phone", // Tiêu đề của cột
      dataIndex: "order", // Truy cập vào fullName của account
      key: "phone",
      render: (order) => <span>{order.account.phone}</span>, // Hiển thị tên đầy đủ của khách hàng
      sorter: (a, b) => a.order.account.phone.localeCompare(b.order.account.phone),
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },
    {
      title: "Report Date",
      dataIndex: "reportAt",
      key: "reportAt",
      render: (reportAt) => {
        // Ensure the 'reportAt' field contains only the date part and set time to 00:00:00
        const formattedDate = dayjs(reportAt).startOf("day").format("YYYY-MM-DD ");
        return dayjs(reportAt).isValid() ? formattedDate : "Invalid Date";
      },
      sorter: (a, b) => (dayjs(a.reportAt).isBefore(dayjs(b.reportAt)) ? -1 : 1),
      sortDirections: ["ascend", "descend"],
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },
    // {
    //   title: "Report Id",
    //   dataIndex: "id",
    //   key: "id",
    //   sorter: (a, b) => a.id - b.id, // Sắp xếp theo giá trị số
    // },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      sorter: (a, b) => a.reason.localeCompare(b.reason),
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={100} />,
      onCell: (record) => ({
        onClick: () => navigate(`/dashboard/orders/${record.order.id}`), // Navigate to the order detail page
      }),
    },
    {
      title: "Action",
      dataIndex: "order",
      key: "id",
      render: (order, record) => {
        return (
          <Dropdown overlay={menu(order.id, record.order.status)} trigger={["click"]}>
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

    try {
      const response = await refundOrder(id);
      console.log(response);
      showMessage({
        content: "Hoàn tiền đơn hàng thành công!",
      });
    } catch (error) {
      showMessage({ content: error.response.data, type: "error" }); // Hiển thị thông báo lỗi
    }
    fetchReports(); // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
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
