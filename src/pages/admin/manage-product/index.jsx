import DashboardTemplates from "../../../components/manageDashboard";
import { useEffect, useState } from "react";
import { Image, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

const columns = [
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
];

function ManageProduct() {
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

  const formItems = (
    <>
      <FormItem
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Name can not be empty!",
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
        ]}
      >
        <Input />
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
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Category name can not be empty!",
          },
        ]}
      >
        <Input />
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
    </>
  );

  return (
    <div>
      <DashboardTemplates title={"Product"} columns={columns} uri={"product"} formItems={formItems} />
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
