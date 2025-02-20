import DashboardTemplates from "../../../components/manageDashboard";
import { Image } from "antd";

function ManageProduct() {
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

  return (
    <div>
      <DashboardTemplates title={"Product"} columns={columns} uri={"products"} />
    </div>
  );
}

export default ManageProduct;
