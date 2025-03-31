import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { createVoucher, deleteVoucher, getAllVouchers, updateVoucher } from "../../../services/api.voucher";
import { Button, DatePicker, Dropdown, Form, Input, Menu, Modal, Popconfirm, Radio, Select, Table, Tag } from "antd";
import viVN from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import { CheckCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import { showMessage } from "../../../utils/message";

function ManageVoucher() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredVouchers, setFilteredVouchers] = useState([]); // Lưu danh sách sản phẩm sau khi lọc
  const [vouchers, setVouchers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const fetchVouchers = async () => {
    const data = await getAllVouchers();
    setVouchers(data);
    setFilteredVouchers(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const voucherStatusOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "EXPIRED", label: "Expired" },
    { value: "USED", label: "Used" },
  ];

  const actionMenu = (id, record) => (
    <Menu>
      <Menu.Item
        key="1"
        type="primary"
        onClick={() => {
          setOpen(true);
          form.setFieldsValue({
            ...record,
            expiryDate: record?.expiryDate ? dayjs(record.expiryDate) : null, // Chuyển đổi thành dayjs
          });
        }}
      >
        <Tag color="green" icon={<CheckCircleOutlined />}>
          Edit
        </Tag>
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm
          title="Delete the product"
          description="Are you sure want to delete the product?"
          onConfirm={() => handleDelete(id)}
          okText="Yes"
          cancelText="No"
        >
          <Tag color="red" icon={<CloseCircleOutlined />} style={{ cursor: "pointer" }}>
            Delete
          </Tag>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => b.id - a.id,
    },
    {
      title: "Voucher Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + "VND",
    },
    {
      title: "Discount Type",
      dataIndex: "discountTypeEnum",
      key: "discountTypeEnum",
    },
    {
      title: "Min Order Price",
      dataIndex: "minOrderValue",
      key: "minOrderValue",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price),
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "voucherStatusEnum",
      key: "voucherStatusEnum",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <Dropdown overlay={actionMenu(id, record)} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />}></Button>
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

    const filtered = vouchers.filter((voucher) =>
      removeDiacritics(voucher.code.toLowerCase()).includes(normalizedValue)
    );

    setFilteredVouchers(filtered);
  };

  const handleDelete = async (id) => {
    // Gọi API xóa sản phẩm
    const response = await deleteVoucher(id);
    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm
    if (response) {
      fetchVouchers();
    }
  };

  const handleSubmit = async (formValues) => {
    const formattedValues = {
      ...formValues,
      expiryDate: formValues.expiryDate ? formValues.expiryDate.format("YYYY-MM-DD") : null,
    };

    if (formValues.id) {
      const response = await updateVoucher({ id: formValues.id, voucher: formattedValues });
      console.log(response);
      showMessage({ content: "Cập nhật mã giảm giá thành công!" });
    }

    // khong co id thi la create
    else {
      const response = await createVoucher(formValues);
      console.log(response);
      showMessage({ content: "Tạo mới mã giảm giá thành công!" });
    }

    setOpen(false);
    form.resetFields();
    fetchVouchers();
  };

  const disablePastDate = (current) => {
    // hàm disable ngày trước ngày hiện tại
    return current && current < new Date(); // nếu ngày hiện tại nhỏ hơn ngày hiện tại thì disable
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
          form.resetFields();
        }}
      >
        Create New Voucher
      </Button>
      <Input
        placeholder="Tìm kiếm mã giảm giá theo code..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300, marginLeft: 12 }}
      />
      <Table dataSource={filteredVouchers.filter((voucher) => !voucher.deleted)} columns={columns} rowKey="id" />
      <Modal title="Create New Voucher" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Voucher Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Code can not be empty!",
              },
              {
                min: 3,
                message: "Code must be at least 3 characters!",
              },
            ]}
          >
            <Input placeholder="Nhập mã khuyến mãi" />
          </Form.Item>
          <Form.Item
            label="Discount Price"
            name="discountPrice"
            rules={[
              {
                required: true,
                message: "Discount Price can not be empty!",
              },
            ]}
          >
            <Input placeholder="Nhập giá chiết khấu" />
          </Form.Item>
          <Form.Item
            label="Discount Type"
            name="discountTypeEnum"
            rules={[
              {
                required: true,
                message: "Discount Type can not be empty!",
              },
            ]}
          >
            {/* <Select
              placeholder="Chọn loại giảm giá"
              showSearch // Cho phép tìm kiếm
              optionFilterProp="children" // Lọc theo nội dung hiển thị
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} // Hàm lọc danh sách theo input
            >
              {discountTypes?.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select> */}
            <Radio.Group>
              <Radio value="FIXED">Giảm giá cố định (FIXED)</Radio>
              <Radio value="PERCENT">Giảm giá phần trăm (PERCENT)</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Min Order Price" name="minOrderValue">
            <Input placeholder="Nhập giá trị đơn hàng tối thiểu" />
          </Form.Item>
          <Form.Item
            label="Voucher Status"
            name="voucherStatusEnum"
            rules={[
              {
                required: true,
                message: "Voucher status cannot be empty!",
              },
            ]}
          >
            <Select placeholder="Chọn Voucher Status">
              {voucherStatusOptions.map((status) => (
                <Select.Option key={status.value} value={status.value}>
                  {status.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Expiry Date"
            name="expiryDate"
            rules={[
              {
                required: true,
                message: "Expiry Date must be selected!",
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              locale={viVN}
              style={{ width: "100%" }}
              placeholder="Chọn ngày hết hạn"
              disabledDate={disablePastDate}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageVoucher;
