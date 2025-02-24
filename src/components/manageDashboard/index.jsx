import { Button, Form, Input, Modal, Popconfirm, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import FormItem from "antd/es/form/FormItem";
import uploadFile from "../../utils/upload";
import { toast } from "react-toastify";

function DashboardTemplates({ title, columns, uri, formItems }) {
  const [newColumns, setNewColumns] = useState(columns);
  const [isOpen, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const tableColumns = [
      ...columns,
      ...[
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

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSubmitForm = async (values) => {
    console.log(values);

    // upload tấm ảnh lên Firebase storage
    if (values.image) {
      const url = await uploadFile(values.image.file.originFileObj);
      values.image = url;
    }

    await api.post("product", values);

    toast.success("Successfully create new product!");
    handleCloseModal();
    fetchData();
    form.resetFields();
  };

  return (
    <div>
      <Button onClick={handleOpenModal} type="primary">
        Create {title}
      </Button>
      <Table columns={newColumns} dataSource={data} />;
      <Modal
        title={`Create new ${title}`}
        open={isOpen}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmitForm}
        >
          <FormItem label="Id" name="id" hidden>
            <Input />
          </FormItem>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default DashboardTemplates;
