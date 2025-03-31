import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Image, Input, Menu, Modal, Popconfirm, Select, Table, Tag, Upload } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../../../services/api.product";
import { getCategory } from "../../../services/api.category";
import uploadFile from "../../../utils/upload";
import { getBrand } from "../../../services/api.brand";
import { getIngredient } from "../../../services/api.ingredient";
import { getSkinType } from "../../../services/api.skin";
import { showMessage } from "../../../utils/message";

function ManageProduct() {
  const [searchText, setSearchText] = useState(""); // Lưu từ khóa tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState([]); // Lưu danh sách sản phẩm sau khi lọc
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
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

  const fetchProducts = async () => {
    const data = await getProduct();
    setProducts(data);
    setFilteredProducts(data); // Cập nhật danh sách hiển thị ban đầu
  };

  const fetchCategories = async () => {
    const data = await getCategory();
    setCategories(data);
  };

  const fetchBrands = async () => {
    const data = await getBrand();
    setBrands(data);
  };

  const fetchIngredients = async () => {
    const data = await getIngredient();
    setIngredients(data);
  };

  const fetchSkinTypes = async () => {
    const data = await getSkinType();
    setSkinTypes(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    fetchIngredients();
    fetchSkinTypes();
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
            categoryId: record?.category?.id, // Lấy ID category
            ingredientId: record?.ingredient?.map((item) => item.id), // Lấy ID ingredient
            brandId: record?.brand?.id, // Lấy ID brand
            skinId: record?.skin?.id, // Lấy ID skin
          });
          if (record?.image) {
            // Kiểm tra xem có ảnh không
            setFileList([
              // Nếu có ảnh, thêm vào fileList
              {
                uid: "-1", // ID duy nhất
                name: "Uploaded Image",
                status: "done", // Đánh dấu là upload thành công
                url: record.image, // URL ảnh từ Firebase
              },
            ]);
          } else {
            setFileList([]); // Nếu không có ảnh, đặt lại fileList rỗng
          }
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
          onConfirm={() => handleDeleteProduct(id)}
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand?.name,
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
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + "VND",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name,
    },
    {
      title: "Ingredient",
      dataIndex: "ingredient",
      key: "ingredient",
      render: (ingredients) => ingredients?.map((ing) => ing.name).join(", ") || "No ingredient",
    },
    {
      title: "SkinType",
      dataIndex: "skin",
      key: "skin",
      render: (skin) => skin?.name,
      filters: [
        { text: "Da Thường", value: "Da Thường" },
        { text: "Da Dầu", value: "Da Dầu" },
        { text: "Da Khô", value: "Da Khô" },
        { text: "Da Hỗn Hợp", value: "Da Hỗn Hợp" },
        { text: "Da Nhạy Cảm", value: "Da Nhạy Cảm" },
      ],
      onFilter: (value, record) => record.skin.name.includes(value),
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

    const filtered = products.filter(
      (product) =>
        removeDiacritics(product.name.toLowerCase()).includes(normalizedValue) ||
        removeDiacritics(product.brand?.name?.toLowerCase() || "").includes(normalizedValue) ||
        removeDiacritics(product.category?.name?.toLowerCase() || "").includes(normalizedValue) ||
        removeDiacritics(product.skin?.name?.toLowerCase() || "").includes(normalizedValue) ||
        product.ingredient?.some((item) => removeDiacritics(item.name.toLowerCase()).includes(normalizedValue))
    );
    setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm sau khi lọc
  };

  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id);

    if (response) {
      fetchProducts();
    }
  };

  const handleSubmit = async (formValues) => {
    // if (formValues.image) {
    //   // nếu có image thì upload lên server
    //   const url = await uploadFile(formValues.image.file.originFileObj); // upload file
    //   formValues.image = url; //  gán url vào formValues.image
    // }

    if (fileList.length > 0) {
      // kiểm tra xem có file mới không
      if (fileList[0].originFileObj) {
        // Nếu có file mới, upload lên Firebase
        const url = await uploadFile(fileList[0].originFileObj); // upload file
        formValues.image = url; // gán url vào formValues.image
      } else {
        // Nếu không có file mới, giữ nguyên URL cũ
        formValues.image = fileList[0].url; // gán url vào formValues.image
      }
    }

    if (formValues.id) {
      // nếu có id thì là update
      const response = await updateProduct({ id: formValues.id, product: formValues }); // goi api update
      console.log(response); // log response
      showMessage({ content: "Cập nhật sản phẩm thành công!" });
    }

    // khong co id thi la create
    else {
      const response = await createProduct(formValues); // goi api create
      console.log(response); // log response
      showMessage({ content: "Tạo mới sản phẩm thành công!" });
    }

    setOpen(false); // dong modal
    form.resetFields(); // reset form
    fetchProducts(); // cập nhật lại danh sách product
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
          form.resetFields();
          setFileList([]); // Reset danh sách ảnh
        }}
      >
        Create New Product
      </Button>
      <Input
        placeholder="Tìm kiếm theo name, category, brand, skin..."
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 350, marginLeft: 12 }}
      />

      <Table dataSource={filteredProducts.filter((product) => !product.deleted)} columns={columns} rowKey="id" />
      {/* <Table dataSource={products.filter((product) => !product.deleted)} columns={columns} rowKey="id" /> */}

      <Modal title="Create New Product" open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
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
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brandId"
            rules={[
              {
                required: true,
                message: "One brand must be selected!",
              },
            ]}
          >
            <Select
              placeholder="Chọn thương hiệu"
              showSearch // Cho phép tìm kiếm
              optionFilterProp="children" // Lọc theo nội dung hiển thị
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} // Hàm lọc danh sách theo input
            >
              {brands?.map((brand) => (
                <Select.Option value={brand.id} key={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description can not be empty!",
              },
              {
                min: 5,
                message: "Description must be at least 5 characters!",
              },
            ]}
          >
            <Input.TextArea placeholder="Nhập miêu tả sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Quantity can not be empty!",
              },
            ]}
          >
            <Input placeholder="Nhập số lượng" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price can not be empty!",
              },
            ]}
          >
            <Input placeholder="Nhập giá" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "One category must be selected!",
              },
            ]}
          >
            <Select
              placeholder="Chọn danh mục"
              showSearch // Cho phép tìm kiếm
              optionFilterProp="children" // Lọc theo nội dung hiển thị
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} // Hàm lọc danh sách theo input
            >
              {categories?.map((category) => (
                <Select.Option value={category.id} key={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Ingredient"
            name="ingredientId"
            rules={[{ required: true, message: "At least one ingredient must be selected!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn thành phần"
              showSearch // Cho phép tìm kiếm
              optionFilterProp="children" // Lọc theo nội dung hiển thị
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} // Hàm lọc danh sách theo input
            >
              {ingredients?.map((ingredient) => (
                <Select.Option value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="SkinType"
            name="skinId"
            rules={[
              {
                required: true,
                message: "One Skin Type must be selected!",
              },
            ]}
          >
            <Select
              placeholder="Chọn loại da"
              showSearch // Cho phép tìm kiếm
              optionFilterProp="children" // Lọc theo nội dung hiển thị
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} // Hàm lọc danh sách theo input
            >
              {skinTypes?.map((skin) => (
                <Select.Option value={skin.id} key={skin.id}>
                  {skin.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Code can not be empty!",
              },
              {
                pattern: /^PD\d{5}$/,
                message: "Code must be in the format PDxxxxx!",
              },
            ]}
          >
            <Input placeholder="Nhập mã sản phẩm" />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
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
