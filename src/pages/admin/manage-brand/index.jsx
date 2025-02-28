import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createBrand, deleteBrand, getBrand, updateBrand } from "../../../services/api.brand";

function ManageBrand() {
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const fetchBrands = async () => {
    const data = await getBrand();
    setBrands(data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

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
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                form.setFieldsValue({
                  ...record, // chấm hỏi ? đằng sau chữ "record?" là để không hiện bảng báo lỗi (tránh crack webweb)
                  //lệnh kiểm tra (?. là optional chaining). Nếu record.categories tồn tại,
                  // nó sẽ lấy tất cả các id từ danh sách categories của record và
                  // lưu vào trường categoryID. Nếu không có categories, nó sẽ gán
                  // một mảng rỗng ([]). Việc sử dụng optional chaining giúp tránh
                  // lỗi khi record.categories không tồn tại.
                  BrandID: record?.brands ? record?.brands?.map((item) => item.id) : [],
                });
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete the brand"
              description="Are you sure want to delete the brand ?"
              onConfirm={() => handleDelete(id)}
            >
              <Button danger type="primary">
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    // Gọi API xóa sản phẩm
    const response = await deleteBrand(id);
    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm
    if (response) {
      fetchBrands();
    }
  };

  const handleSubmit = async (formValues) => {
    if (formValues.id) {
      const response = await updateBrand({ id: formValues.id, brand: formValues });
      console.log(response);
      toast.success("Successfully update brand!");
    }

    // khong co id thi la create
    else {
      const response = await createBrand(formValues);
      console.log(response);
      toast.success("Successfully create new brand!");
    }

    setOpen(false);
    form.resetFields();
    fetchBrands();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create New Brand
      </Button>
      <Table dataSource={brands.filter((brand) => !brand.deleted)} columns={columns} />
      <Modal title="Create New Brand" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageBrand;
