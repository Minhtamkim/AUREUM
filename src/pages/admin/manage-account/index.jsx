/* eslint-disable no-unused-vars */
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Radio, Select, Table, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { getUser, toggleUserActive } from "../../../services/api.user";
import viVN from "antd/es/date-picker/locale/vi_VN";
import { getSkinType } from "../../../services/api.skin";

function ManageAccount() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Lưu danh sách danh mục sau khi lọc
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [skinTypes, setSkinTypes] = useState([]);
  const [form] = useForm();

  const fetchUsers = async () => {
    // Call API here
    const data = await getUser();
    setUsers(data);
    setFilteredUsers(data); // Sao chép danh sách gốc để lọc
  };

  const fetchSkinTypes = async () => {
    const data = await getSkinType();
    setSkinTypes(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchSkinTypes();
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
      title: "SkinType",
      dataIndex: "skin",
      key: "skin",
      render: (skin) => skin?.name,
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

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const normalizedValue = removeDiacritics(value.toLowerCase()); // Chuẩn hóa từ khóa tìm kiếm

    const filtered = users.filter(
      (user) =>
        removeDiacritics(user.fullName?.toLowerCase() || "").includes(normalizedValue) ||
        removeDiacritics(user.email?.toLowerCase() || "").includes(normalizedValue) ||
        removeDiacritics(user.phone?.toLowerCase() || "").includes(normalizedValue)
    );

    setFilteredUsers(filtered);
  };

  return (
    <div>
      <h1>Manage Account</h1>
      <Input
        placeholder="Tìm kiếm người dùng theo fullName, email, phone..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 400, marginLeft: 12 }}
      />
      <Table dataSource={filteredUsers.filter((user) => user)} columns={columns} rowKey="id" />
    </div>
  );
}

export default ManageAccount;
