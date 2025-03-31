import { Button, Dropdown, Form, Input, Menu, Modal, Popconfirm, Table, Tag } from "antd";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../../../services/api.category";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { CheckCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import { showMessage } from "../../../utils/message";

function ManageCategory() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredCategories, setFilteredCategories] = useState([]); // Lưu danh sách danh mục sau khi lọc

  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const fetchCategories = async () => {
    const data = await getCategory();
    setCategories(data);
    setFilteredCategories(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const actionMenu = (id, record) => (
    <Menu>
      <Menu.Item
        key="1"
        type="primary"
        onClick={() => {
          setOpen(true);
          form.setFieldsValue({
            ...record,
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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

    const filtered = categories.filter((category) =>
      removeDiacritics(category.name.toLowerCase()).includes(normalizedValue)
    );
    setFilteredCategories(filtered);
  };

  const handleDelete = async (id) => {
    const response = await deleteCategory(id);

    if (response) {
      fetchCategories();
    }
  };

  const handleSubmit = async (formValues) => {
    // có id thì update, không có thì tạo mới
    if (formValues.id) {
      const response = await updateCategory({ id: formValues.id, category: formValues });
      console.log(response);
      showMessage({ content: "Cập nhật danh mục thành công!" });
    }

    // tạo mới
    else {
      const response = await createCategory(formValues);
      console.log(response);
      showMessage({ content: "Tạo mới danh mục thành công!" });
    }

    setOpen(false);
    form.resetFields();
    fetchCategories();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
          form.resetFields(); // Reset form khi mở modal
        }}
      >
        Create New Category
      </Button>
      <Input
        placeholder="Tìm kiếm danh mục theo name..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300, marginLeft: 12 }}
      />

      <Table columns={columns} dataSource={filteredCategories.filter((category) => !category.deleted)} rowKey="id" />

      <Modal title="Create New Category" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
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
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageCategory;
