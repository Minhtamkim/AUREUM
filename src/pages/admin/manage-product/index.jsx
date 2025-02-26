import { useEffect, useState } from "react";
import { Button, Form, Image, Input, Modal, Popconfirm, Select, Table, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../../../services/api.product";
import { getCategory } from "../../../services/api.category";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/upload";

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // CRUD

  const fetchProduct = async () => {
    const data = await getProduct();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const data = await getCategory();
    setCategories(data);
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={100} />,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
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
                  categoryID: record?.categories ? record?.categories?.map((item) => item.id) : [],
                });
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete the product"
              description="Are you sure want to delete the product ?"
              onConfirm={() => handleDeleteProduct(id)}
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

  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id);

    if (response) {
      fetchProduct();
    }
  };

  const handleSubmit = async (formValues) => {
    if (formValues.image) {
      const url = await uploadFile(formValues.image.file.originFileObj);
      formValues.image = url;
    }

    if (formValues.id) {
      const response = await updateProduct({ id: formValues.id, product: formValues });
      console.log(response);
      toast.success("Successfully update product!");
    }

    // khong co id thi la create
    else {
      const response = await createProduct(formValues);
      console.log(response);
      toast.success("Successfully create new product!");
    }

    setOpen(false);
    form.resetFields();
    fetchProduct();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create new product
      </Button>
      <Table dataSource={products.filter((product) => !product.deleted)} columns={columns} />

      <Modal title="Product" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
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
          <FormItem
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
          </FormItem>
          <FormItem
            label="Brand"
            name="brand"
            rules={[
              {
                required: true,
                message: "Brand name can not be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description name can not be empty!",
              },
              {
                min: 5,
                message: "Description must be at least 5 characters!",
              },
            ]}
          >
            <Input.TextArea />
          </FormItem>
          <FormItem
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Quantity name can not be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price name can not be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="CategoryID"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "At least one category must be selected!",
              },
            ]}
          >
            <Select>
              {categories?.map((category) => (
                <Select.Option value={category.id} key={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Code name can not be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem label="Image" name="image">
            <Upload
              action="https://14.225.211.152:8081/api"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </FormItem>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default ManageProduct;
