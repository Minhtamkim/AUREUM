import { Button, DatePicker, Form, Input, Modal, Popconfirm, Radio, Select, Table, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { getUser, toggleUserActive, updateRole, updateSkinType, updateUser } from "../../../services/api.user";
import { toast } from "react-toastify";
import viVN from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";

function ManageAccount() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const fetchUsers = async () => {
    // Call API here
    const data = await getUser();
    setUsers(data);
    setFilteredUsers(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "SkinType",
      dataIndex: "skinTypeEnum",
      key: "skinTypeEnum",
    },
    {
      title: "Role",
      dataIndex: "roleEnum",
      key: "roleEnum",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => <Tag color={active ? "green" : "red"}>{active ? "Active" : "Inactive"}</Tag>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                form.setFieldsValue({
                  ...record,
                  dateOfBirth: record.dateOfBirth ? dayjs(record.dateOfBirth) : null, // Chuyển đổi thành dayjs
                });
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title="Ban user"
              description="Are you sure want to ban user?"
              onConfirm={() => handleToggleUserActive(id)}
            >
              <Button danger={!record.active} type="primary">
                {record.active ? "Ban" : "Unban"}
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleToggleUserActive = async (id) => {
    const response = await toggleUserActive(id);
    console.log(response);

    if (response) {
      fetchUsers();
    }
  };

  const handleSearch = (value) => {
    setSearchText(value); // Lưu từ khóa tìm kiếm
    const filtered = users.filter(
      // Lọc danh sách danh mục
      (user) =>
        user.fullName?.toLowerCase().includes(value.toLowerCase()) ||
        user.email?.toLowerCase().includes(value.toLowerCase()) ||
        user.phone?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered); // Cập nhật danh sách danh mục sau khi lọc
  };

  const handleSubmit = async (formValues) => {
    const formattedValues = {
      ...formValues,
      dateOfBirth: formValues.dateOfBirth ? formValues.dateOfBirth.format("YYYY-MM-DD") : null,
    };

    if (formValues.id) {
      // nếu có id thì là update
      const response = await updateUser({ id: formValues.id, user: formattedValues }); // goi api update
      console.log(response); // log response
      toast.success("Successfully update user!"); // thong bao thanh cong
    }
    setOpen(false); // dong modal
    form.resetFields(); // reset form
    fetchUsers(); // cập nhật lại danh sách product
  };

  const disableFutureDate = (current) => {
    // hàm disable ngày sau ngày hiện tại
    return current && current > new Date(); // nếu ngày hiện tại lớn hơn ngày hiện tại thì disable
  };

  return (
    <div>
      <Input
        placeholder="Tìm kiếm người dùng..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 250, marginLeft: 12 }}
      />
      <Table dataSource={filteredUsers.filter((user) => user)} columns={columns} rowKey="id" />
      <Modal title="Edit User" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
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
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Name can not be empty!",
              },
              {
                min: 3,
                message: "Name must be at least 3 characters!",
              },
            ]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email can not be empty!",
              },
              {
                type: "email",
                message: "Email is not valid!",
              },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone can not be empty!",
              },
              {
                pattern: /^[0-9\b]+$/,
                message: "Phone is not valid!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dateOfBirth">
            <DatePicker
              format="DD/MM/YYYY"
              locale={viVN}
              style={{ width: "100%" }}
              placeholder="Chọn ngày sinh"
              disabledDate={disableFutureDate}
              allowClear
            />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input.TextArea placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageAccount;
