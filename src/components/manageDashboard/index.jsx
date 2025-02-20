import { Button, Form, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";

function DashboardTemplates({ title, columns, uri }) {
  const [newColumns, setNewColumns] = useState(columns);
  const [isOpen, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const tableColumns = [
      ...columns,
      [
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
                    // form.setFieldValue(product);
                    // if (product.avatar) {
                    //   setFileList([
                    //     {
                    //       uid: "-1",
                    //       name: "image.png",
                    //       status: "done",
                    //       url: product.avatar,
                    //     },
                    //   ]);
                    // }
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title={`Delete the ${title}`}
                  description={`Are you sure to delete this ${title}?`}
                  onConfirm={() => console.log("delete")}
                >
                  <Button danger type="primary">
                    Delete
                  </Button>
                </Popconfirm>
              </>
            );
          },
        },
      ],
    ];
    setNewColumns(tableColumns);
  }, [newColumns]);

  const fetchData = async () => {
    const response = await api.get(`${uri}`);
    setData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button type="primary"> Create {title}</Button>
      <Table columns={newColumns} dataSource={data} />;
    </div>
  );
}

export default DashboardTemplates;
