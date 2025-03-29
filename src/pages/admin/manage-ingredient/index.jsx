import { Button, Dropdown, Form, Input, Menu, Modal, Popconfirm, Table, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { createIngredient, deleteIngredient, getIngredient, updateIngredient } from "../../../services/api.ingredient";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from "@ant-design/icons";

function ManageIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm
  const [filteredData, setFilteredData] = useState([]); // Lưu danh sách sau khi lọc

  const fetchIngredients = async () => {
    const data = await getIngredient();
    setIngredients(data);
    setFilteredData(data); // Sao chép danh sách gốc để lọc
  };

  useEffect(() => {
    fetchIngredients();
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

    const filtered = ingredients.filter((item) => removeDiacritics(item.name.toLowerCase()).includes(normalizedValue));
    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    // Gọi API xóa sản phẩm
    const response = await deleteIngredient(id);
    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm
    if (response) {
      fetchIngredients();
    }
  };

  const handleSubmit = async (formValues) => {
    if (formValues.id) {
      const response = await updateIngredient({ id: formValues.id, ingredient: formValues });
      console.log(response);
      toast.success("Successfully update ingredient!");
    }

    // khong co id thi la create
    else {
      const response = await createIngredient(formValues);
      console.log(response);
      toast.success("Successfully create new ingredient!");
    }

    setOpen(false);
    form.resetFields();
    fetchIngredients();
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
        Create New Ingredient
      </Button>

      <Input
        placeholder="Tìm kiếm thành phần theo name..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300, marginLeft: 12 }}
      />

      <Table dataSource={filteredData.filter((ingredient) => !ingredient.deleted)} columns={columns} rowKey="id" />

      {/* <Table dataSource={ingredients.filter((ingredient) => !ingredient.deleted)} columns={columns} /> */}
      <Modal title="Create New Ingredient" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
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
            <Input placeholder="Nhập tên thành phần" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageIngredient;
